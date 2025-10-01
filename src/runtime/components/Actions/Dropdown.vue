<template>
  <div
    ref="dropdownRef"
    :class="dropdownClasses"
    @focusout="handleFocusOut"
    @keydown="handleGlobalKeydown"
  >
    <Button
      ref="triggerRef"
      :color="triggerColor"
      :btn-style="triggerStyle"
      :size="size"
      :disabled="disabled"
      :icon-right="isOpen ? 'chevron-up' : 'chevron-down'"
      :aria-haspopup="true"
      :aria-expanded="isOpen"
      :aria-controls="menuId"
      @click="toggle"
      @keydown="handleTriggerKeydown"
    >
      <template #default>
        <slot name="trigger">
          <span>{{ triggerText || 'Dropdown' }}</span> {{ isOpen }}
        </slot>
      </template>
    </Button>

    <ul
      :id="menuId"
      ref="menuRef"
      role="menu"
      :tabindex="isOpen ? 0 : -1"
      :class="menuClasses"
      :aria-hidden="!isOpen"
      @click="handleMenuClick"
      @keydown="handleMenuKeydown"
    >
      <slot>
        <li v-for="(item, index) in items" :key="getItemKey(item)" role="none">
          <a
            v-if="getItemHref(item)"
            :ref="(el) => setItemRef(el, index)"
            :href="getItemHref(item)"
            :class="getItemClasses(item)"
            role="menuitem"
            :tabindex="isOpen ? 0 : -1"
            :aria-disabled="getItemDisabled(item)"
            @click="handleItemClick(item, $event)"
            @keydown="handleItemKeydown"
          >
            {{ getItemLabel(item) }}
          </a>
          <Button
            v-else
            :ref="(el) => setItemRef(el, index)"
            :color="getItemColor(item)"
            :size="size"
            :disabled="getItemDisabled(item)"
            :class="getItemClasses(item)"
            @click="handleItemClick(item, $event)"
            @keydown="handleItemKeydown"
          >
            {{ getItemLabel(item) }}
          </Button>
        </li>
      </slot>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'
import { generateDropdownClasses } from '../../shared/utils/classGenerator'
import type {
  dropdownPlacementMap,
  dropdownModifierMap,
} from '../../shared/componentsMaps/actions/dropdownMap'
import Button from './Button.vue'

// Simple ID generator
let idCounter = 0
const generateId = () => `dropdown-${++idCounter}`

interface DropdownItem {
  label: string
  value?: string | number
  href?: string
  disabled?: boolean
  divider?: boolean
  active?: boolean
}

interface Props {
  items?: DropdownItem[]
  triggerText?: string
  position?: keyof typeof dropdownPlacementMap
  align?: 'start' | 'end'
  hover?: boolean
  forceOpen?: boolean
  disabled?: boolean
  size?: 'xs' | 'sm' | 'md' | 'lg'
  closeOnSelect?: boolean
  autoFocus?: boolean
  // Additional props for dropdownMap integration
  placements?: Array<keyof typeof dropdownPlacementMap>
  modifiers?: Array<keyof typeof dropdownModifierMap>
  // Button component props
  triggerColor?:
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'neutral'
    | 'info'
    | 'success'
    | 'warning'
    | 'error'
  triggerStyle?: 'outline' | 'ghost' | 'link' | 'dash' | 'soft'
  itemColor?:
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'neutral'
    | 'info'
    | 'success'
    | 'warning'
    | 'error'
}

const props = withDefaults(defineProps<Props>(), {
  items: () => [],
  position: 'bottom',
  align: 'start',
  hover: false,
  forceOpen: false,
  disabled: false,
  size: 'md',
  closeOnSelect: true,
  autoFocus: true,
  triggerColor: 'neutral',
})

const emit = defineEmits<{
  'item-click': [item: DropdownItem, event: Event]
  open: []
  close: []
  'update:open': [value: boolean]
}>()

const isOpen = ref(false)
const focusedIndex = ref(-1)
const menuId = generateId()

// Component refs
const dropdownRef = ref<HTMLElement>()
const triggerRef = ref<HTMLElement>()
const menuRef = ref<HTMLElement>()
const itemRefs = ref<(HTMLElement | null)[]>([])

// Using any for ref callback due to Vue's complex component instance types
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const setItemRef = (el: any, index: number) => {
  if (el && '$el' in el) {
    itemRefs.value[index] = el.$el as HTMLElement
  } else if (el instanceof HTMLElement) {
    itemRefs.value[index] = el
  }
}

const dropdownClasses = computed(() => {
  // Build placements array from props
  const placements: Array<keyof typeof dropdownPlacementMap> = []

  // Add position-based placement
  if (props.position && props.position !== 'bottom') {
    placements.push(props.position)
  }

  // Add alignment-based placement
  if (props.align === 'end') {
    placements.push('end')
  } else if (props.align === 'start') {
    placements.push('start')
  }

  // Add custom placements if provided
  if (props.placements) {
    placements.push(...props.placements)
  }

  // Build modifiers array from props
  const modifiers: Array<keyof typeof dropdownModifierMap> = []

  if (props.hover) {
    modifiers.push('hover')
  }

  if (props.forceOpen || isOpen.value) {
    modifiers.push('open')
  }

  // Add custom modifiers if provided
  if (props.modifiers) {
    modifiers.push(...props.modifiers)
  }

  return generateDropdownClasses({
    placements,
    modifiers,
  })
})

// Helper function to get item color for Button component
const getItemColor = (item: DropdownItem | string) => {
  if (typeof item === 'object' && item.active) {
    return 'primary'
  }
  return props.itemColor || 'neutral'
}

const menuClasses = computed(() => {
  const classes = [
    'dropdown-content', // This comes from dropdownPartMap.content
    'menu',
    'bg-base-100',
    'rounded-box',
    'z-[1]',
    'w-52',
    'p-2',
    'shadow',
  ]

  return classes.join(' ')
})

// Navigation helpers
const getEnabledItems = () => props.items.filter((item) => !item.disabled)

const focusItem = (index: number) => {
  const enabledItems = getEnabledItems()
  if (index >= 0 && index < enabledItems.length) {
    focusedIndex.value = index
    const actualIndex = props.items.findIndex((item) => item === enabledItems[index])
    nextTick(() => {
      itemRefs.value[actualIndex]?.focus()
    })
  }
}

const focusFirstItem = () => focusItem(0)
const focusLastItem = () => focusItem(getEnabledItems().length - 1)

const focusNextItem = () => {
  const enabledItems = getEnabledItems()
  const nextIndex = (focusedIndex.value + 1) % enabledItems.length
  focusItem(nextIndex)
}

const focusPreviousItem = () => {
  const enabledItems = getEnabledItems()
  const prevIndex = focusedIndex.value <= 0 ? enabledItems.length - 1 : focusedIndex.value - 1
  focusItem(prevIndex)
}

const open = () => {
  if (props.disabled) return

  isOpen.value = true
  focusedIndex.value = -1
  emit('open')
  emit('update:open', true)

  if (props.autoFocus) {
    nextTick(() => {
      focusFirstItem()
    })
  }
}

const close = () => {
  if (isOpen.value) {
    isOpen.value = false
    focusedIndex.value = -1
    emit('close')
    emit('update:open', false)

    // Return focus to trigger
    nextTick(() => {
      triggerRef.value?.focus()
    })
  }
}

const toggle = () => {
  if (props.disabled) return

  console.log('toggle')

  if (isOpen.value) {
    close()
  } else {
    open()
  }
}

const handleFocusOut = async (event: FocusEvent) => {
  await nextTick()

  const dropdown = event.currentTarget as HTMLElement
  if (!dropdown.contains(document.activeElement)) {
    close()
  }
}

const handleGlobalKeydown = (event: KeyboardEvent) => {
  if (!isOpen.value) return

  switch (event.key) {
    case 'Escape':
      event.preventDefault()
      close()
      break
    case 'ArrowDown':
      event.preventDefault()
      focusNextItem()
      break
    case 'ArrowUp':
      event.preventDefault()
      focusPreviousItem()
      break
    case 'Home':
      event.preventDefault()
      focusFirstItem()
      break
    case 'End':
      event.preventDefault()
      focusLastItem()
      break
  }
}

const handleTriggerKeydown = (event: KeyboardEvent) => {
  switch (event.key) {
    case 'Enter':
    case ' ':
      event.preventDefault()
      toggle()
      break
    case 'ArrowDown':
      event.preventDefault()
      open()
      break
    case 'Escape':
      event.preventDefault()
      close()
      break
  }
}

const handleMenuKeydown = () => {
  // Handled by global keydown
}

const handleItemKeydown = (event: KeyboardEvent) => {
  switch (event.key) {
    case 'Enter':
    case ' ':
      event.preventDefault()
      ;(event.target as HTMLElement).click()
      break
  }
}

const handleMenuClick = (event: Event) => {
  const target = event.target as HTMLElement
  if (target.hasAttribute('disabled') || target.classList.contains('menu-title')) {
    return
  }

  if (props.closeOnSelect) {
    close()
  }
}

const handleItemClick = (item: DropdownItem, event: Event) => {
  if (item.disabled) {
    event.preventDefault()
    return
  }

  emit('item-click', item, event)

  if (props.closeOnSelect) {
    close()
  }
}

// Helper functions for item rendering
const getItemKey = (item: DropdownItem | string): string => {
  if (typeof item === 'string') return item
  return item.value?.toString() || item.label
}

const getItemLabel = (item: DropdownItem | string): string => {
  if (typeof item === 'string') return item
  return item.label
}

const getItemHref = (item: DropdownItem | string): string | undefined => {
  if (typeof item === 'string') return undefined
  return item.href
}

const getItemDisabled = (item: DropdownItem | string): boolean => {
  if (typeof item === 'string') return false
  return item.disabled || false
}

const getItemClasses = (item: DropdownItem | string) => {
  const classes = ['w-full', 'justify-start', 'transition-colors', 'duration-150']

  if (typeof item === 'object') {
    if (item.active) classes.push('active')
    if (item.disabled) classes.push('opacity-50', 'cursor-not-allowed')
  }

  // Focus state for keyboard navigation
  const enabledItems = getEnabledItems()
  const enabledIndex = enabledItems.findIndex((enabledItem) => enabledItem === item)
  if (enabledIndex === focusedIndex.value) {
    classes.push('bg-base-200', 'focus')
  }

  return classes.join(' ')
}

// Expose methods for external access
defineExpose({
  open,
  close,
  toggle,
  focus: () => triggerRef.value?.focus(),
})
</script>

<style scoped lang="postcss">
/* DaisyUI handles most dropdown styling */
</style>

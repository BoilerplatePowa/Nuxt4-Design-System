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
            :icon-left="triggerIconLeftFinal"
            :icon-right="triggerIconRightFinal"
            :aria-haspopup="true"
            :aria-expanded="isOpen"
            :aria-controls="menuId"
            @click="toggle"
            @keydown="handleTriggerKeydown"
        >
            <template v-if="$slots['icon-left']" #icon-left>
                <slot name="trigger-icon-left" />
            </template>
            <template #default>
                <slot name="trigger">
                    <span>{{ triggerText || 'Dropdown' }}</span>
                </slot>
            </template>
            <template v-if="$slots['icon-right']" #icon-right>
                <slot name="trigger-icon-right" />
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
                <li v-for="(item, index) in items" :key="getItemKey(item) || index" role="none">
                    <template v-if="isSeparator(item)">
                        <hr class="my-1" />
                    </template>
                    <a
                        v-else-if="getItemHref(item)"
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
                        :btn-style="getItemStyle(item)"
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
import type { EmitFn, Component } from 'vue'
import { ref, computed, nextTick, useId } from 'vue'
import { generateDropdownClasses } from '../../shared/utils/classGenerator'
import type {
    dropdownPlacementMap,
    dropdownModifierMap,
} from '../../shared/componentsMaps/actions/dropdownMap'
import Button from './Button.vue'
import type { BtnColor, BtnStyle, BtnSize, DropdownItem } from '../../shared/types.d'

// Import chevron icons for default toggle behavior
import { ChevronUp, ChevronDown } from 'lucide-vue-next'

// SSR-safe id generation
const uid = useId()

interface Props {
    items?: DropdownItem[]
    triggerText?: string
    position?: keyof typeof dropdownPlacementMap
    align?: 'start' | 'end'
    hover?: boolean
    forceOpen?: boolean
    disabled?: boolean
    size?: BtnSize
    closeOnSelect?: boolean
    autoFocus?: boolean
    // Additional props for dropdownMap integration
    placements?: Array<keyof typeof dropdownPlacementMap>
    modifiers?: Array<keyof typeof dropdownModifierMap>
    // Button component props
    triggerColor?: BtnColor
    triggerStyle?: BtnStyle
    itemColor?: BtnColor
    itemStyle?: BtnStyle
    // Trigger icon customization
    triggerIconLeft?: Component | null // Vue component (e.g., Lucide icon component)
    triggerIconRight?: Component | null // Vue component (e.g., Lucide icon component)
    // When true (default), shows chevron toggle if right icon not provided/overridden by slot
    toggleChevron?: boolean
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
    triggerColor: 'primary',
    toggleChevron: true,
    itemStyle: 'ghost',
})

const emit = defineEmits<{
    'item-click': [item: DropdownItem, event: Event]
    'item-action': [item: DropdownItem, action: string | undefined, event: Event]
    open: []
    close: []
    'update:open': [value: boolean]
}>()
// Trigger icon resolution (props or slots or default chevrons)
const triggerIconLeftFinal = computed(() => {
    // If a left icon slot is provided, Button will render it; return undefined
    return props.triggerIconLeft === null ? undefined : props.triggerIconLeft
})

const triggerIconRightFinal = computed(() => {
    // If a right icon slot is provided, Button will render it; return undefined
    if (props.triggerIconRight) {
        return props.triggerIconRight
    }
    return props.toggleChevron ? (isOpen.value ? ChevronUp : ChevronDown) : undefined
})

const isOpen = ref(false)
const focusedIndex = ref(-1)
const menuId = `dropdown-${uid}`

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

    if (props.hover && !props.disabled) {
        modifiers.push('hover')
    }

    if ((props.forceOpen || isOpen.value) && !props.disabled) {
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

// Helper to get Button style for items (defaults to ghost)
const getItemStyle = (_item: DropdownItem | string) => {
    return props.itemStyle || 'ghost'
}

const menuClasses = computed(() => {
    const classes = [
        'dropdown-content', // This comes from dropdownPartMap.content
        'menu',
        'bg-base-100',
        'rounded-box',
        'z-1',
        'w-52',
        'p-2',
        'shadow-sm',
    ]

    return classes.join(' ')
})

// Navigation helpers
const isSeparator = (item: DropdownItem | string): boolean => {
    if (typeof item === 'string') return false
    return item.type === 'separator' || item.divider === true
}

const getEnabledItems = () => props.items.filter((item) => !isSeparator(item) && !item.disabled)

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
    console.log('toggle')

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
    if (props.disabled) {
        event.preventDefault()
        return
    }
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
    if (isSeparator(item)) {
        event.preventDefault()
        return
    }
    if (item.disabled) {
        event.preventDefault()
        return
    }

    emit('item-click', item, event)

    // Execute item action if provided
    if (typeof item.action === 'function') {
        try {
            item.action(item, event)
        } catch {
            // swallow errors from user-defined action to avoid breaking UI
        }
    } else if (typeof item.action === 'string') {
        emit('item-action', item, item.action, event)
        ;(emit as EmitFn)(item.action, item, event)
    } else {
        emit('item-action', item, undefined, event)
    }

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

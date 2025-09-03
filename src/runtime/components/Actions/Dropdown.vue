<template>
  <div
    ref="dropdownRef"
    :class="dropdownClasses"
    @focusout="handleFocusOut"
    @keydown="handleGlobalKeydown"
  >
    <div
      ref="triggerRef"
      :tabindex="disabled ? -1 : 0"
      role="button"
      :class="triggerClasses"
      :aria-haspopup="true"
      :aria-expanded="isOpen"
      :aria-controls="menuId"
      :aria-disabled="disabled"
      @click="toggle"
      @keydown="handleTriggerKeydown"
    >
      <slot name="trigger">
        <span>{{ triggerText || 'Dropdown' }}</span>
        <svg
          class="w-2.5 h-2.5 ml-2.5 transition-transform duration-200"
          :class="{ 'rotate-180': isOpen }"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </slot>
    </div>

    <ul
      ref="menuRef"
      :id="menuId"
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
            :ref="el => setItemRef(el, index)"
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
          <button
            v-else
            :ref="el => setItemRef(el, index)"
            type="button"
            :class="getItemClasses(item)"
            role="menuitem"
            :tabindex="isOpen ? 0 : -1"
            :disabled="getItemDisabled(item)"
            :aria-disabled="getItemDisabled(item)"
            @click="handleItemClick(item, $event)"
            @keydown="handleItemKeydown"
          >
            {{ getItemLabel(item) }}
          </button>
        </li>
      </slot>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue';

// Simple ID generator
let idCounter = 0;
const generateId = () => `dropdown-${++idCounter}`;

interface DropdownItem {
  label: string;
  value?: string | number;
  href?: string;
  disabled?: boolean;
  divider?: boolean;
  active?: boolean;
}

interface Props {
  items?: DropdownItem[];
  triggerText?: string;
  position?: 'bottom' | 'top' | 'left' | 'right';
  align?: 'start' | 'end';
  hover?: boolean;
  forceOpen?: boolean;
  disabled?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'outline';
  closeOnSelect?: boolean;
  autoFocus?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  items: () => [],
  position: 'bottom',
  align: 'start',
  hover: false,
  forceOpen: false,
  disabled: false,
  size: 'md',
  variant: 'ghost',
  closeOnSelect: true,
  autoFocus: true,
});

const emit = defineEmits<{
  'item-click': [item: DropdownItem, event: Event];
  open: [];
  close: [];
  'update:open': [value: boolean];
}>();

const isOpen = ref(false);
const focusedIndex = ref(-1);
const menuId = generateId();

// Component refs
const dropdownRef = ref<HTMLElement>();
const triggerRef = ref<HTMLElement>();
const menuRef = ref<HTMLElement>();
const itemRefs = ref<(HTMLElement | null)[]>([]);

const setItemRef = (el: any, index: number) => {
  if (el && '$el' in el) {
    itemRefs.value[index] = el.$el as HTMLElement;
  } else if (el) {
    itemRefs.value[index] = el as HTMLElement;
  }
};

const dropdownClasses = computed(() => {
  const baseClasses = ['dropdown'];

  // Position classes
  if (props.position === 'top') {
    baseClasses.push('dropdown-top');
  } else if (props.position === 'left') {
    baseClasses.push('dropdown-left');
  } else if (props.position === 'right') {
    baseClasses.push('dropdown-right');
  }
  // 'bottom' is default

  // Alignment
  if (props.align === 'end') {
    baseClasses.push('dropdown-end');
  }

  // Hover behavior
  if (props.hover) {
    baseClasses.push('dropdown-hover');
  }

  // Force open
  if (props.forceOpen || isOpen.value) {
    baseClasses.push('dropdown-open');
  }

  return baseClasses.join(' ');
});

const triggerClasses = computed(() => {
  const baseClasses = ['btn', 'flex', 'items-center'];

  // Size classes
  if (props.size === 'xs') {
    baseClasses.push('btn-xs');
  } else if (props.size === 'sm') {
    baseClasses.push('btn-sm');
  } else if (props.size === 'lg') {
    baseClasses.push('btn-lg');
  }

  // Variant classes
  if (props.variant === 'primary') {
    baseClasses.push('btn-primary');
  } else if (props.variant === 'secondary') {
    baseClasses.push('btn-secondary');
  } else if (props.variant === 'accent') {
    baseClasses.push('btn-accent');
  } else if (props.variant === 'ghost') {
    baseClasses.push('btn-ghost');
  } else if (props.variant === 'outline') {
    baseClasses.push('btn-outline');
  }

  if (props.disabled) {
    baseClasses.push('btn-disabled');
  }

  return baseClasses.join(' ');
});

const menuClasses = computed(() => {
  const classes = [
    'dropdown-content',
    'menu',
    'bg-base-100',
    'rounded-box',
    'z-[1]',
    'w-52',
    'p-2',
    'shadow',
  ];

  return classes.join(' ');
});

// Navigation helpers
const getEnabledItems = () => props.items.filter(item => !item.disabled);

const focusItem = (index: number) => {
  const enabledItems = getEnabledItems();
  if (index >= 0 && index < enabledItems.length) {
    focusedIndex.value = index;
    const actualIndex = props.items.findIndex(item => item === enabledItems[index]);
    nextTick(() => {
      itemRefs.value[actualIndex]?.focus();
    });
  }
};

const focusFirstItem = () => focusItem(0);
const focusLastItem = () => focusItem(getEnabledItems().length - 1);

const focusNextItem = () => {
  const enabledItems = getEnabledItems();
  const nextIndex = (focusedIndex.value + 1) % enabledItems.length;
  focusItem(nextIndex);
};

const focusPreviousItem = () => {
  const enabledItems = getEnabledItems();
  const prevIndex = focusedIndex.value <= 0 ? enabledItems.length - 1 : focusedIndex.value - 1;
  focusItem(prevIndex);
};

const open = () => {
  if (props.disabled) return;

  isOpen.value = true;
  focusedIndex.value = -1;
  emit('open');
  emit('update:open', true);

  if (props.autoFocus) {
    nextTick(() => {
      focusFirstItem();
    });
  }
};

const close = () => {
  if (isOpen.value) {
    isOpen.value = false;
    focusedIndex.value = -1;
    emit('close');
    emit('update:open', false);

    // Return focus to trigger
    nextTick(() => {
      triggerRef.value?.focus();
    });
  }
};

const toggle = () => {
  if (props.disabled) return;

  if (isOpen.value) {
    close();
  } else {
    open();
  }
};

const handleFocusOut = async (event: FocusEvent) => {
  await nextTick();

  const dropdown = event.currentTarget as HTMLElement;
  if (!dropdown.contains(document.activeElement)) {
    close();
  }
};

const handleGlobalKeydown = (event: KeyboardEvent) => {
  if (!isOpen.value) return;

  switch (event.key) {
    case 'Escape':
      event.preventDefault();
      close();
      break;
    case 'ArrowDown':
      event.preventDefault();
      focusNextItem();
      break;
    case 'ArrowUp':
      event.preventDefault();
      focusPreviousItem();
      break;
    case 'Home':
      event.preventDefault();
      focusFirstItem();
      break;
    case 'End':
      event.preventDefault();
      focusLastItem();
      break;
  }
};

const handleTriggerKeydown = (event: KeyboardEvent) => {
  switch (event.key) {
    case 'Enter':
    case ' ':
      event.preventDefault();
      toggle();
      break;
    case 'ArrowDown':
      event.preventDefault();
      open();
      break;
    case 'Escape':
      event.preventDefault();
      close();
      break;
  }
};

const handleMenuKeydown = () => {
  // Handled by global keydown
};

const handleItemKeydown = (event: KeyboardEvent) => {
  switch (event.key) {
    case 'Enter':
    case ' ':
      event.preventDefault();
      (event.target as HTMLElement).click();
      break;
  }
};

const handleMenuClick = (event: Event) => {
  const target = event.target as HTMLElement;
  if (target.hasAttribute('disabled') || target.classList.contains('menu-title')) {
    return;
  }

  if (props.closeOnSelect) {
    close();
  }
};

const handleItemClick = (item: DropdownItem, event: Event) => {
  if (item.disabled) {
    event.preventDefault();
    return;
  }

  emit('item-click', item, event);

  if (props.closeOnSelect) {
    close();
  }
};

// Helper functions for item rendering
const getItemKey = (item: DropdownItem | string): string => {
  if (typeof item === 'string') return item;
  return item.value?.toString() || item.label;
};

const getItemLabel = (item: DropdownItem | string): string => {
  if (typeof item === 'string') return item;
  return item.label;
};

const getItemHref = (item: DropdownItem | string): string | undefined => {
  if (typeof item === 'string') return undefined;
  return item.href;
};

const getItemDisabled = (item: DropdownItem | string): boolean => {
  if (typeof item === 'string') return false;
  return item.disabled || false;
};

const getItemClasses = (item: DropdownItem | string) => {
  const classes = ['transition-colors', 'duration-150'];

  if (typeof item === 'object') {
    if (item.active) classes.push('active', 'bg-primary', 'text-primary-content');
    if (item.disabled) classes.push('disabled', 'opacity-50', 'cursor-not-allowed');
  }

  // Focus state for keyboard navigation
  const enabledItems = getEnabledItems();
  const enabledIndex = enabledItems.findIndex(enabledItem => enabledItem === item);
  if (enabledIndex === focusedIndex.value) {
    classes.push('bg-base-200', 'focus');
  }

  return classes.join(' ');
};

// Expose methods for external access
defineExpose({
  open,
  close,
  toggle,
  focus: () => triggerRef.value?.focus(),
});
</script>

<style scoped lang="postcss">
/* DaisyUI handles most dropdown styling */
</style>

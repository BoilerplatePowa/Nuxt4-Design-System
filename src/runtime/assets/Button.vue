<template>
  <button
    ref="buttonRef"
    :disabled="disabled || loading"
    :class="buttonClasses"
    :type="type"
    :aria-label="computedAriaLabel"
    :aria-pressed="ariaPressed"
    :aria-expanded="ariaExpanded"
    :aria-describedby="computedAriaDescribedby"
    :aria-busy="loading"
    :tabindex="disabled ? -1 : 0"
    @click="handleClick"
    @keydown="handleKeydown"
    @focus="handleFocus"
    @blur="handleBlur"
  >
    <span v-if="loading" class="loading loading-spinner loading-sm" aria-hidden="true"></span>
    <slot name="icon-left" v-if="$slots['icon-left']" />
    <Icon v-else-if="iconLeft" :name="iconLeft" :size="iconSize" />
    <span v-if="$slots.default" :class="{ 'sr-only': loading && hideTextOnLoading }">
      <slot />
    </span>
    <span v-if="loading && loadingText" class="ml-1">{{ loadingText }}</span>

    <slot name="icon-right" v-if="$slots['icon-right']" />
    <Icon v-else-if="iconRight" :name="iconRight" :size="iconSize" />
  </button>
</template>

<script setup lang="ts">
import { computed, ref, nextTick, onMounted, onUnmounted } from 'vue';
import type { IconName, Size } from '@/shared/types.d';
import Icon from '../Icons/Icon.vue';

interface Props {
  variant?:
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'neutral'
    | 'ghost'
    | 'outline'
    | 'link'
    | 'info'
    | 'success'
    | 'warning'
    | 'error';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  loadingText?: string;
  hideTextOnLoading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
  circle?: boolean;
  square?: boolean;
  glass?: boolean;
  noAnimation?: boolean;
  ariaLabel?: string;
  ariaPressed?: boolean;
  ariaExpanded?: boolean;
  ariaDescribedby?: string;
  debounceMs?: number;
  confirmAction?: boolean;
  confirmText?: string;
  autoFocus?: boolean;
  iconLeft?: IconName;
  iconRight?: IconName;
  iconSize?: Size | number;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
  loadingText: '',
  hideTextOnLoading: false,
  type: 'button',
  fullWidth: false,
  circle: false,
  square: false,
  glass: false,
  noAnimation: false,
  debounceMs: 0,
  confirmAction: false,
  confirmText: 'Are you sure?',
  autoFocus: false,
  iconSize: 24,
});

const emit = defineEmits<{
  click: [event: MouseEvent];
  keydown: [event: KeyboardEvent];
  focus: [event: FocusEvent];
  blur: [event: FocusEvent];
}>();

const buttonRef = ref<HTMLButtonElement>();
let debounceTimer: ReturnType<typeof setTimeout> | null = null;

const buttonClasses = computed(() => {
  const baseClasses = ['btn', 'flex', 'items-center', 'justify-center'];

  if (props.variant) {
    baseClasses.push(`btn-${props.variant}`);
  }

  if (props.size) {
    baseClasses.push(`btn-${props.size}`);
  }

  // Shape classes
  if (props.circle) {
    baseClasses.push('btn-circle');
  }
  if (props.square) {
    baseClasses.push('btn-square');
  }

  // Style modifiers
  if (props.glass) {
    baseClasses.push('glass');
  }
  if (props.noAnimation) {
    baseClasses.push('no-animation');
  }

  // Full width
  if (props.fullWidth) {
    baseClasses.push('btn-block', 'w-full');
  }

  return baseClasses.join(' ');
});

const computedAriaLabel = computed(() => {
  if (props.ariaLabel) return props.ariaLabel;
  if (props.loading && props.loadingText) return props.loadingText;
  if (props.loading) return 'Loading...';
  return undefined;
});

const computedAriaDescribedby = computed(() => {
  const ids = [];
  if (props.ariaDescribedby) ids.push(props.ariaDescribedby);
  return ids.length > 0 ? ids.join(' ') : undefined;
});

const executeAction = (event: MouseEvent | KeyboardEvent) => {
  if (props.disabled || props.loading) return;

  if (props.confirmAction) {
    if (confirm(props.confirmText)) {
      emit('click', event as MouseEvent);
    }
  } else {
    emit('click', event as MouseEvent);
  }
};

const handleClick = (event: MouseEvent) => {
  if (props.disabled || props.loading) return;

  // Don't interfere with submit buttons - let them handle form submission naturally
  if (props.type === 'submit') {
    return;
  }

  if (props.debounceMs > 0) {
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      executeAction(event);
    }, props.debounceMs);
  } else {
    executeAction(event);
  }
};

const handleKeydown = (event: KeyboardEvent) => {
  emit('keydown', event);

  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    if (!props.disabled && !props.loading) {
      // Trigger click event for keyboard interaction
      executeAction(event);
    }
  }
};

const handleFocus = (event: FocusEvent) => {
  emit('focus', event);
};

const handleBlur = (event: FocusEvent) => {
  emit('blur', event);
};

// Auto focus functionality
onMounted(() => {
  if (props.autoFocus && buttonRef.value) {
    nextTick(() => {
      buttonRef.value?.focus();
    });
  }
});

// Cleanup
onUnmounted(() => {
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }
});

// Expose methods for parent component access
defineExpose({
  focus: () => buttonRef.value?.focus(),
  blur: () => buttonRef.value?.blur(),
  click: () => buttonRef.value?.click(),
});
</script>

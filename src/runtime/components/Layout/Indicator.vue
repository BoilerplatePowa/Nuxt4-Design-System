<template>
  <div class="indicator">
    <span v-if="showIndicator" :class="indicatorClasses">
      <slot name="indicator">
        {{ content }}
      </slot>
    </span>

    <div class="indicator-item">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  content?: string | number;
  position?:
    | 'top-start'
    | 'top-center'
    | 'top-end'
    | 'middle-start'
    | 'middle-center'
    | 'middle-end'
    | 'bottom-start'
    | 'bottom-center'
    | 'bottom-end';
  variant?: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  showIndicator?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  position: 'top-end',
  variant: 'primary',
  size: 'md',
  showIndicator: true,
});

const indicatorClasses = computed(() => {
  const baseClasses = ['indicator-item', 'badge'];

  // Position classes
  if (props.position === 'top-start') {
    baseClasses.push('indicator-top', 'indicator-start');
  } else if (props.position === 'top-center') {
    baseClasses.push('indicator-top', 'indicator-center');
  } else if (props.position === 'top-end') {
    baseClasses.push('indicator-top', 'indicator-end');
  } else if (props.position === 'middle-start') {
    baseClasses.push('indicator-middle', 'indicator-start');
  } else if (props.position === 'middle-center') {
    baseClasses.push('indicator-middle', 'indicator-center');
  } else if (props.position === 'middle-end') {
    baseClasses.push('indicator-middle', 'indicator-end');
  } else if (props.position === 'bottom-start') {
    baseClasses.push('indicator-bottom', 'indicator-start');
  } else if (props.position === 'bottom-center') {
    baseClasses.push('indicator-bottom', 'indicator-center');
  } else if (props.position === 'bottom-end') {
    baseClasses.push('indicator-bottom', 'indicator-end');
  }

  // Variant classes
  if (props.variant === 'primary') {
    baseClasses.push('badge-primary');
  } else if (props.variant === 'secondary') {
    baseClasses.push('badge-secondary');
  } else if (props.variant === 'accent') {
    baseClasses.push('badge-accent');
  } else if (props.variant === 'info') {
    baseClasses.push('badge-info');
  } else if (props.variant === 'success') {
    baseClasses.push('badge-success');
  } else if (props.variant === 'warning') {
    baseClasses.push('badge-warning');
  } else if (props.variant === 'error') {
    baseClasses.push('badge-error');
  }

  // Size classes
  if (props.size === 'xs') {
    baseClasses.push('badge-xs');
  } else if (props.size === 'sm') {
    baseClasses.push('badge-sm');
  } else if (props.size === 'lg') {
    baseClasses.push('badge-lg');
  }

  return baseClasses.join(' ');
});
</script>

<style scoped lang="postcss">
/* DaisyUI handles most indicator styling */
</style>

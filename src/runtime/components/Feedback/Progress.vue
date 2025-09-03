<template>
  <div class="w-full">
    <div v-if="label || showValue" class="flex justify-between text-sm mb-1">
      <span v-if="label" class="text-base-content">{{ label }}</span>
      <span v-if="showValue" class="text-base-content/70">{{ displayValue }}</span>
    </div>

    <progress
      :class="progressClasses"
      :value="value"
      :max="max"
      :aria-label="ariaLabel || label"
    ></progress>

    <p v-if="helpText" class="text-xs text-base-content/70 mt-1">
      {{ helpText }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  value?: number;
  max?: number;
  label?: string;
  helpText?: string;
  showValue?: boolean;
  valueFormat?: 'percentage' | 'fraction' | 'raw';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error';
  ariaLabel?: string;
}

const props = withDefaults(defineProps<Props>(), {
  value: 0,
  max: 100,
  showValue: false,
  valueFormat: 'percentage',
  size: 'md',
  variant: 'primary',
});

const progressClasses = computed(() => {
  const baseClasses = ['progress', 'w-full'];

  // Size classes
  if (props.size === 'xs') {
    baseClasses.push('progress-xs');
  } else if (props.size === 'sm') {
    baseClasses.push('progress-sm');
  } else if (props.size === 'lg') {
    baseClasses.push('progress-lg');
  }
  // 'md' is default, no class needed

  // Variant classes
  if (props.variant === 'primary') {
    baseClasses.push('progress-primary');
  } else if (props.variant === 'secondary') {
    baseClasses.push('progress-secondary');
  } else if (props.variant === 'accent') {
    baseClasses.push('progress-accent');
  } else if (props.variant === 'info') {
    baseClasses.push('progress-info');
  } else if (props.variant === 'success') {
    baseClasses.push('progress-success');
  } else if (props.variant === 'warning') {
    baseClasses.push('progress-warning');
  } else if (props.variant === 'error') {
    baseClasses.push('progress-error');
  }

  return baseClasses.join(' ');
});

const displayValue = computed(() => {
  if (props.valueFormat === 'percentage') {
    const percentage = Math.round((props.value / props.max) * 100);
    return `${percentage}%`;
  } else if (props.valueFormat === 'fraction') {
    return `${props.value}/${props.max}`;
  } else {
    return String(props.value);
  }
});
</script>

<style scoped lang="postcss">
/* DaisyUI handles most progress styling */
</style>

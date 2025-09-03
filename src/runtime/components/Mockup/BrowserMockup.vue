<template>
  <div :class="mockupClasses">
    <div class="mockup-browser-toolbar">
      <div class="input">
        {{ url }}
      </div>
    </div>

    <div :class="contentClasses">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  url?: string;
  variant?: 'default' | 'border' | 'bg';
  size?: 'sm' | 'md' | 'lg';
}

const props = withDefaults(defineProps<Props>(), {
  url: 'https://daisyui.com',
  variant: 'default',
  size: 'md',
});

const mockupClasses = computed(() => {
  const baseClasses = ['mockup-browser'];

  // Variant classes
  if (props.variant === 'border') {
    baseClasses.push('border');
  } else if (props.variant === 'bg') {
    baseClasses.push('bg-base-300');
  }

  // Size classes
  if (props.size === 'sm') {
    baseClasses.push('max-w-md');
  } else if (props.size === 'md') {
    baseClasses.push('max-w-lg');
  } else if (props.size === 'lg') {
    baseClasses.push('max-w-2xl');
  }

  return baseClasses.join(' ');
});

const contentClasses = computed(() => {
  const baseClasses = ['flex', 'justify-center', 'px-4', 'py-16', 'bg-base-200'];
  return baseClasses.join(' ');
});
</script>

<style scoped lang="postcss">
/* DaisyUI handles most mockup styling */
</style>

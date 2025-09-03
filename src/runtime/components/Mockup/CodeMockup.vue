<template>
  <div :class="mockupClasses">
    <pre :class="preClasses"><code><slot>{{ code }}</slot></code></pre>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  code?: string;
  variant?: 'default' | 'border' | 'bg';
  language?: string;
  showLineNumbers?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  code: 'console.log("Hello, World!");',
  variant: 'default',
  showLineNumbers: false,
});

const mockupClasses = computed(() => {
  const baseClasses = ['mockup-code'];

  // Variant classes
  if (props.variant === 'border') {
    baseClasses.push('border');
  } else if (props.variant === 'bg') {
    baseClasses.push('bg-primary');
    baseClasses.push('text-primary-content');
  }

  return baseClasses.join(' ');
});

const preClasses = computed(() => {
  const baseClasses = [];

  if (props.showLineNumbers) {
    baseClasses.push('line-numbers');
  }

  if (props.language) {
    baseClasses.push(`language-${props.language}`);
  }

  return baseClasses.join(' ');
});
</script>

<style scoped lang="postcss">
/* DaisyUI handles most mockup styling */
</style>

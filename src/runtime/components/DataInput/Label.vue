<template>
  <component :is="tag" :class="labelClasses" :for="htmlFor">
    <slot name="start" />
    <span v-if="text" class="label-text">{{ text }}</span>
    <slot />
    <span v-if="altText" class="label-text-alt">{{ altText }}</span>
    <slot name="end" />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  text?: string;
  altText?: string;
  htmlFor?: string;
  tag?: 'label' | 'div' | 'span';
  required?: boolean;
  cursor?: 'default' | 'pointer' | 'not-allowed';
  size?: 'sm' | 'md' | 'lg';
}

const props = withDefaults(defineProps<Props>(), {
  tag: 'label',
  cursor: 'default',
  size: 'md',
});

const labelClasses = computed(() => {
  const baseClasses = ['label'];

  // Cursor
  if (props.cursor === 'pointer') {
    baseClasses.push('cursor-pointer');
  } else if (props.cursor === 'not-allowed') {
    baseClasses.push('cursor-not-allowed');
  }

  // Size classes
  if (props.size === 'sm') {
    baseClasses.push('text-sm');
  } else if (props.size === 'lg') {
    baseClasses.push('text-lg');
  }

  return baseClasses.join(' ');
});
</script>

<style scoped lang="postcss">
/* DaisyUI handles most label styling */
</style>

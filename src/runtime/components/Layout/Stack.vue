<template>
  <div :class="stackClasses">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  direction?: 'horizontal' | 'vertical';
  spacing?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  wrap?: boolean;
  reverse?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  direction: 'vertical',
  spacing: 'md',
  align: 'stretch',
  justify: 'start',
  wrap: false,
  reverse: false,
});

const stackClasses = computed(() => {
  const baseClasses = ['flex'];

  // Direction classes
  if (props.direction === 'horizontal') {
    if (props.reverse) {
      baseClasses.push('flex-row-reverse');
    } else {
      baseClasses.push('flex-row');
    }
  } else {
    if (props.reverse) {
      baseClasses.push('flex-col-reverse');
    } else {
      baseClasses.push('flex-col');
    }
  }

  // Spacing classes
  if (props.spacing === 'none') {
    // No gap
  } else if (props.spacing === 'xs') {
    baseClasses.push('gap-1');
  } else if (props.spacing === 'sm') {
    baseClasses.push('gap-2');
  } else if (props.spacing === 'md') {
    baseClasses.push('gap-4');
  } else if (props.spacing === 'lg') {
    baseClasses.push('gap-6');
  } else if (props.spacing === 'xl') {
    baseClasses.push('gap-8');
  }

  // Alignment classes
  if (props.align === 'start') {
    baseClasses.push('items-start');
  } else if (props.align === 'center') {
    baseClasses.push('items-center');
  } else if (props.align === 'end') {
    baseClasses.push('items-end');
  } else if (props.align === 'stretch') {
    baseClasses.push('items-stretch');
  }

  // Justify classes
  if (props.justify === 'start') {
    baseClasses.push('justify-start');
  } else if (props.justify === 'center') {
    baseClasses.push('justify-center');
  } else if (props.justify === 'end') {
    baseClasses.push('justify-end');
  } else if (props.justify === 'between') {
    baseClasses.push('justify-between');
  } else if (props.justify === 'around') {
    baseClasses.push('justify-around');
  } else if (props.justify === 'evenly') {
    baseClasses.push('justify-evenly');
  }

  // Wrap
  if (props.wrap) {
    baseClasses.push('flex-wrap');
  }

  return baseClasses.join(' ');
});
</script>

<style scoped lang="postcss">
/* This is a utility component using Tailwind classes */
</style>

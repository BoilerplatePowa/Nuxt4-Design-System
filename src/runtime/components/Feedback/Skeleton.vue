<template>
  <div :class="skeletonClasses" :style="customStyle">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: string | number;
  height?: string | number;
  lines?: number;
  animated?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'text',
  lines: 1,
  animated: true,
});

const skeletonClasses = computed(() => {
  const baseClasses = ['skeleton'];

  // Variant classes
  if (props.variant === 'text') {
    baseClasses.push('skeleton-text');
  } else if (props.variant === 'circular') {
    baseClasses.push('skeleton-circular');
  } else if (props.variant === 'rectangular') {
    baseClasses.push('skeleton-rectangular');
  } else if (props.variant === 'rounded') {
    baseClasses.push('skeleton-rounded');
  }

  // Animation
  if (!props.animated) {
    baseClasses.push('skeleton-no-animation');
  }

  return baseClasses.join(' ');
});

const customStyle = computed(() => {
  const style: Record<string, string> = {};

  if (props.width) {
    style.width = typeof props.width === 'number' ? `${props.width}px` : props.width;
  }

  if (props.height) {
    style.height = typeof props.height === 'number' ? `${props.height}px` : props.height;
  }

  return style;
});
</script>

<style scoped lang="postcss">
.skeleton {
  @apply bg-base-300 rounded animate-pulse;
}

.skeleton-text {
  @apply h-4 rounded;
}

.skeleton-circular {
  @apply rounded-full;
  aspect-ratio: 1;
}

.skeleton-rectangular {
  @apply rounded-none;
}

.skeleton-rounded {
  @apply rounded-lg;
}

.skeleton-no-animation {
  @apply animate-none;
}

/* Multiple text lines */
.skeleton-text:not(:last-child) {
  @apply mb-2;
}
</style>

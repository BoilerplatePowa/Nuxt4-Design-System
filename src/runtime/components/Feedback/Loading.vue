<template>
  <div :class="loadingClasses" :aria-label="ariaLabel" role="status">
    <slot>
      <span v-if="text" class="loading-text">{{ text }}</span>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'spinner' | 'dots' | 'ring' | 'ball' | 'bars' | 'infinity'
  size?: 'xs' | 'sm' | 'md' | 'lg'
  text?: string
  ariaLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'spinner',
  size: 'md',
  ariaLabel: 'Loading',
})

const loadingClasses = computed(() => {
  const baseClasses = ['loading']

  // Variant classes
  if (props.variant === 'spinner') {
    baseClasses.push('loading-spinner')
  } else if (props.variant === 'dots') {
    baseClasses.push('loading-dots')
  } else if (props.variant === 'ring') {
    baseClasses.push('loading-ring')
  } else if (props.variant === 'ball') {
    baseClasses.push('loading-ball')
  } else if (props.variant === 'bars') {
    baseClasses.push('loading-bars')
  } else if (props.variant === 'infinity') {
    baseClasses.push('loading-infinity')
  }

  // Size classes
  if (props.size === 'xs') {
    baseClasses.push('loading-xs')
  } else if (props.size === 'sm') {
    baseClasses.push('loading-sm')
  } else if (props.size === 'lg') {
    baseClasses.push('loading-lg')
  }
  // 'md' is default, no additional class needed

  return baseClasses.join(' ')
})
</script>

<style scoped lang="postcss">
.loading-text {
  @apply ml-2 text-sm;
}
</style>

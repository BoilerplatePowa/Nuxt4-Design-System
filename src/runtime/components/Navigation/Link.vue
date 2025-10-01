<template>
  <component
    :is="tag"
    :class="linkClasses"
    :href="href"
    :to="to"
    :target="target"
    :rel="rel"
    :aria-label="ariaLabel"
    :tabindex="disabled ? -1 : undefined"
    @click="handleClick"
  >
    <slot name="icon-left" />
    <slot />
    <slot name="icon-right" />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  href?: string
  to?: string | object
  target?: '_blank' | '_self' | '_parent' | '_top'
  rel?: string
  variant?: 'default' | 'primary' | 'secondary' | 'accent' | 'neutral' | 'hover'
  disabled?: boolean
  external?: boolean
  tag?: string
  ariaLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  disabled: false,
  external: false,
  tag: 'a',
})

const emit = defineEmits<{
  click: [event: Event]
}>()

const linkClasses = computed(() => {
  const baseClasses = ['link']

  // Variant classes
  if (props.variant === 'primary') {
    baseClasses.push('link-primary')
  } else if (props.variant === 'secondary') {
    baseClasses.push('link-secondary')
  } else if (props.variant === 'accent') {
    baseClasses.push('link-accent')
  } else if (props.variant === 'neutral') {
    baseClasses.push('link-neutral')
  } else if (props.variant === 'hover') {
    baseClasses.push('link-hover')
  }

  // Disabled state
  if (props.disabled) {
    baseClasses.push('link-disabled', 'cursor-not-allowed', 'opacity-50')
  }

  return baseClasses.join(' ')
})

const handleClick = (event: Event) => {
  if (props.disabled) {
    event.preventDefault()
    return
  }

  emit('click', event)
}
</script>

<style scoped lang="postcss">
/* DaisyUI handles most link styling */
</style>

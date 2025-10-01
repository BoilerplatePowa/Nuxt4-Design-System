<template>
  <div class="radial-progress-container">
    <div
      :class="progressClasses"
      :style="progressStyle"
      role="progressbar"
      :aria-valuenow="value"
      :aria-valuemin="0"
      :aria-valuemax="max"
      :aria-label="ariaLabel"
    >
      <slot>
        <span v-if="showValue" class="text-content">{{ displayValue }}</span>
      </slot>
    </div>

    <div v-if="label" class="radial-progress-label mt-2 text-center">
      {{ label }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  value: number
  max?: number
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  thickness?: 'thin' | 'medium' | 'thick'
  variant?: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error'
  showValue?: boolean
  valueFormat?: 'percentage' | 'fraction' | 'raw'
  label?: string
  ariaLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  max: 100,
  size: 'md',
  thickness: 'medium',
  variant: 'primary',
  showValue: true,
  valueFormat: 'percentage',
})

const progressClasses = computed(() => {
  const baseClasses = ['radial-progress']

  // Variant classes
  if (props.variant === 'primary') {
    baseClasses.push('text-primary')
  } else if (props.variant === 'secondary') {
    baseClasses.push('text-secondary')
  } else if (props.variant === 'accent') {
    baseClasses.push('text-accent')
  } else if (props.variant === 'info') {
    baseClasses.push('text-info')
  } else if (props.variant === 'success') {
    baseClasses.push('text-success')
  } else if (props.variant === 'warning') {
    baseClasses.push('text-warning')
  } else if (props.variant === 'error') {
    baseClasses.push('text-error')
  }

  return baseClasses.join(' ')
})

const progressStyle = computed(() => {
  const percentage = Math.min(Math.max((props.value / props.max) * 100, 0), 100)

  const style: Record<string, string> = {
    '--value': percentage.toString(),
  }

  // Size styles
  if (props.size === 'xs') {
    style.width = '2rem'
    style.height = '2rem'
    style.fontSize = '0.75rem'
  } else if (props.size === 'sm') {
    style.width = '3rem'
    style.height = '3rem'
    style.fontSize = '0.875rem'
  } else if (props.size === 'md') {
    style.width = '4rem'
    style.height = '4rem'
    style.fontSize = '1rem'
  } else if (props.size === 'lg') {
    style.width = '6rem'
    style.height = '6rem'
    style.fontSize = '1.25rem'
  } else if (props.size === 'xl') {
    style.width = '8rem'
    style.height = '8rem'
    style.fontSize = '1.5rem'
  }

  // Thickness styles
  if (props.thickness === 'thin') {
    style['--thickness'] = '2px'
  } else if (props.thickness === 'medium') {
    style['--thickness'] = '4px'
  } else if (props.thickness === 'thick') {
    style['--thickness'] = '8px'
  }

  return style
})

const displayValue = computed(() => {
  if (props.valueFormat === 'percentage') {
    const percentage = Math.round((props.value / props.max) * 100)
    return `${percentage}%`
  } else if (props.valueFormat === 'fraction') {
    return `${props.value}/${props.max}`
  } else {
    return String(props.value)
  }
})
</script>

<style scoped lang="postcss">
/* DaisyUI handles most radial progress styling */
.radial-progress-container {
  @apply flex flex-col items-center;
}

.radial-progress-label {
  @apply text-sm text-base-content/70;
}

.text-content {
  @apply font-semibold;
}
</style>

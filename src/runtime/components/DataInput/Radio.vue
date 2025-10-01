<template>
  <div class="form-control">
    <label v-if="label" :class="labelClasses">
      <input
        :id="inputId"
        :value="value"
        :checked="isChecked"
        type="radio"
        :name="name"
        :class="radioClasses"
        :disabled="disabled"
        :required="required"
        :aria-describedby="ariaDescribedby"
        @change="handleChange"
      />
      <span class="label-text">{{ label }}</span>
    </label>
    <input
      v-else
      :id="inputId"
      :value="value"
      :checked="isChecked"
      type="radio"
      :name="name"
      :class="radioClasses"
      :disabled="disabled"
      :required="required"
      :aria-describedby="ariaDescribedby"
      @change="handleChange"
    />

    <p
      v-if="helpText && !errorMessage"
      :id="`${inputId}-help`"
      class="text-xs text-base-content/70 mt-1"
    >
      {{ helpText }}
    </p>

    <p v-if="errorMessage" :id="`${inputId}-error`" class="text-xs text-error mt-1" role="alert">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// Simple ID generator
let idCounter = 0
const generateId = () => `radio-${++idCounter}`

interface Props {
  value: string | number | boolean
  name: string
  label?: string
  helpText?: string
  errorMessage?: string
  disabled?: boolean
  required?: boolean
  size?: 'xs' | 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'info' | 'error'
  ariaDescribedby?: string
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  required: false,
  size: 'md',
  variant: 'primary',
})

// Use defineModel for Vue 3.4 best practices
const model = defineModel<string | number | boolean>()

const emit = defineEmits<{
  change: [event: Event]
}>()

const inputId = generateId()

const isChecked = computed(() => model.value === props.value)

const labelClasses = computed(() => ['label', 'cursor-pointer', 'flex', 'items-center', 'gap-2'])

const radioClasses = computed(() => {
  const baseClasses = ['radio']

  // Size classes
  if (props.size === 'xs') {
    baseClasses.push('radio-xs')
  } else if (props.size === 'sm') {
    baseClasses.push('radio-sm')
  } else if (props.size === 'lg') {
    baseClasses.push('radio-lg')
  }
  // 'md' is default, no class needed

  // Variant classes
  if (props.variant === 'primary') {
    baseClasses.push('radio-primary')
  } else if (props.variant === 'secondary') {
    baseClasses.push('radio-secondary')
  } else if (props.variant === 'accent') {
    baseClasses.push('radio-accent')
  } else if (props.variant === 'success') {
    baseClasses.push('radio-success')
  } else if (props.variant === 'warning') {
    baseClasses.push('radio-warning')
  } else if (props.variant === 'info') {
    baseClasses.push('radio-info')
  } else if (props.variant === 'error') {
    baseClasses.push('radio-error')
  }

  // Error state override
  if (props.errorMessage) {
    baseClasses.push('radio-error')
  }

  return baseClasses.join(' ')
})

const ariaDescribedby = computed(() => {
  const ids = []
  if (props.helpText) ids.push(`${inputId}-help`)
  if (props.errorMessage) ids.push(`${inputId}-error`)
  if (props.ariaDescribedby) ids.push(props.ariaDescribedby)
  return ids.length > 0 ? ids.join(' ') : undefined
})

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.checked) {
    model.value = props.value
  }
  emit('change', event)
}
</script>

<style scoped lang="postcss">
/* DaisyUI handles most radio styling */
</style>

<template>
  <div :class="wrapperClasses">
    <label v-if="label" :for="textareaId" class="label">
      <span class="label-text">{{ label }}</span>
      <span v-if="required" class="label-text-alt text-error">*</span>
    </label>

    <textarea
      :id="textareaId"
      v-model="model"
      :class="textareaClasses"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :required="required"
      :rows="rows"
      :maxlength="maxlength"
      :aria-describedby="ariaDescribedby"
      @input="handleInput"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
    />

    <div v-if="showCharCount && maxlength" class="label">
      <span class="label-text-alt" />
      <span class="label-text-alt"> {{ characterCount }}/{{ maxlength }} </span>
    </div>

    <p
      v-if="helpText && !errorMessage"
      :id="`${textareaId}-help`"
      class="text-xs text-base-content/70 mt-1"
    >
      {{ helpText }}
    </p>

    <p v-if="errorMessage" :id="`${textareaId}-error`" class="text-xs text-error mt-1" role="alert">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// Simple ID generator with better uniqueness
let idCounter = 0
const generateId = () => {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substr(2, 9)
  return `textarea-${timestamp}-${++idCounter}-${random}`
}

interface Props {
  label?: string
  placeholder?: string
  helpText?: string
  errorMessage?: string
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  rows?: number
  maxlength?: number
  showCharCount?: boolean
  size?: 'xs' | 'sm' | 'md' | 'lg'
  variant?:
    | 'bordered'
    | 'ghost'
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'info'
    | 'success'
    | 'warning'
    | 'error'
  ariaDescribedby?: string
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  readonly: false,
  required: false,
  rows: 3,
  showCharCount: false,
  size: 'md',
  variant: 'bordered',
})

// Use defineModel for Vue 3.4 best practices
const model = defineModel<string>({ default: '' })

const emit = defineEmits<{
  input: [event: Event]
  change: [event: Event]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}>()

const textareaId = generateId()

const wrapperClasses = computed(() => ['form-control', 'w-full'])

const textareaClasses = computed(() => {
  const baseClasses = ['textarea', 'w-full']

  // Size classes
  if (props.size === 'xs') {
    baseClasses.push('textarea-xs')
  } else if (props.size === 'sm') {
    baseClasses.push('textarea-sm')
  } else if (props.size === 'lg') {
    baseClasses.push('textarea-lg')
  }
  // 'md' is default, no class needed

  // Variant classes
  if (props.variant === 'bordered') {
    baseClasses.push('textarea-bordered')
  } else if (props.variant === 'ghost') {
    baseClasses.push('textarea-ghost')
  } else if (props.variant === 'primary') {
    baseClasses.push('textarea-primary')
  } else if (props.variant === 'secondary') {
    baseClasses.push('textarea-secondary')
  } else if (props.variant === 'accent') {
    baseClasses.push('textarea-accent')
  } else if (props.variant === 'info') {
    baseClasses.push('textarea-info')
  } else if (props.variant === 'success') {
    baseClasses.push('textarea-success')
  } else if (props.variant === 'warning') {
    baseClasses.push('textarea-warning')
  } else if (props.variant === 'error') {
    baseClasses.push('textarea-error')
  }

  // Error state override
  if (props.errorMessage) {
    baseClasses.push('textarea-error')
  }

  return baseClasses.join(' ')
})

const characterCount = computed(() => {
  return model.value?.length || 0
})

const ariaDescribedby = computed(() => {
  const ids = []
  if (props.helpText) ids.push(`${textareaId}-help`)
  if (props.errorMessage) ids.push(`${textareaId}-error`)
  if (props.ariaDescribedby) ids.push(props.ariaDescribedby)
  return ids.length > 0 ? ids.join(' ') : undefined
})

const handleInput = (event: Event) => {
  emit('input', event)
}

const handleChange = (event: Event) => {
  emit('change', event)
}

const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
}
</script>

<style scoped lang="postcss">
/* DaisyUI handles most textarea styling */
</style>

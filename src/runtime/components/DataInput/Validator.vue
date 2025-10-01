<template>
    <div :class="validatorClasses">
        <!-- Input field with validation -->
        <div class="form-control">
            <!-- Label -->
            <label v-if="label" class="label">
                <span :class="labelClasses">
                    {{ label }}
                    <span v-if="required" class="text-error ml-1">*</span>
                </span>
            </label>

            <!-- Input wrapper -->
            <div class="relative">
                <!-- Input field -->
                <input
                    v-if="type !== 'textarea'"
                    v-model="model"
                    :type="type"
                    :class="inputClasses"
                    :placeholder="placeholder"
                    :disabled="disabled"
                    :readonly="readonly"
                    :maxlength="maxLength"
                    @input="handleInput"
                    @blur="handleBlur"
                    @focus="handleFocus"
                />

                <!-- Textarea -->
                <textarea
                    v-else
                    v-model="model"
                    :class="textareaClasses"
                    :placeholder="placeholder"
                    :disabled="disabled"
                    :readonly="readonly"
                    :maxlength="maxLength"
                    :rows="rows"
                    @input="handleInput"
                    @blur="handleBlur"
                    @focus="handleFocus"
                />

                <!-- Validation icon -->
                <div v-if="showValidationIcon" :class="iconClasses">
                    <!-- Success icon -->
                    <svg
                        v-if="isValid && hasBeenValidated"
                        class="w-5 h-5 text-success"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clip-rule="evenodd"
                        />
                    </svg>

                    <!-- Error icon -->
                    <svg
                        v-else-if="!isValid && hasBeenValidated"
                        class="w-5 h-5 text-error"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                        />
                    </svg>
                </div>

                <!-- Character count -->
                <div
                    v-if="showCharCount && maxLength"
                    class="absolute bottom-2 right-2 text-xs opacity-60"
                >
                    {{ model.length }}/{{ maxLength }}
                </div>
            </div>

            <!-- Validation messages -->
            <div v-if="hasBeenValidated" class="label">
                <!-- Success message -->
                <span v-if="isValid && successMessage" class="label-text-alt text-success">
                    {{ successMessage }}
                </span>

                <!-- Error messages -->
                <div v-else-if="!isValid && validationErrors.length > 0" class="space-y-1">
                    <span
                        v-for="error in validationErrors"
                        :key="error"
                        class="label-text-alt text-error block"
                    >
                        {{ error }}
                    </span>
                </div>
            </div>

            <!-- Helper text -->
            <div v-if="helperText" class="label">
                <span class="label-text-alt opacity-70">{{ helperText }}</span>
            </div>
        </div>

        <!-- Validation summary (for complex forms) -->
        <div v-if="showSummary && hasBeenValidated" :class="summaryClasses">
            <div v-if="isValid" class="flex items-center gap-2 text-success">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                    />
                </svg>
                <span class="text-sm font-medium">Valid</span>
            </div>

            <div v-else class="space-y-1">
                <div class="flex items-center gap-2 text-error">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            fill-rule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clip-rule="evenodd"
                        />
                    </svg>
                    <span class="text-sm font-medium"
                        >{{ validationErrors.length }} error{{
                            validationErrors.length > 1 ? 's' : ''
                        }}</span
                    >
                </div>

                <ul class="text-xs space-y-0.5 ml-6">
                    <li v-for="error in validationErrors" :key="error">• {{ error }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

interface ValidationRule {
    name: string
    test: (value: string) => boolean
    message: string
}

interface Props {
    label?: string
    placeholder?: string
    helperText?: string
    successMessage?: string
    type?: 'text' | 'email' | 'password' | 'url' | 'tel' | 'number' | 'textarea'
    size?: 'sm' | 'md' | 'lg'
    variant?: 'default' | 'bordered' | 'ghost' | 'filled'
    disabled?: boolean
    readonly?: boolean
    required?: boolean
    maxLength?: number
    rows?: number
    rules?: ValidationRule[]
    validateOnInput?: boolean
    validateOnBlur?: boolean
    showValidationIcon?: boolean
    showCharCount?: boolean
    showSummary?: boolean
    // Built-in validation types
    email?: boolean
    url?: boolean
    minLength?: number
    pattern?: RegExp
    customValidator?: (value: string) => string | null
}

const props = withDefaults(defineProps<Props>(), {
    type: 'text',
    size: 'md',
    variant: 'default',
    disabled: false,
    readonly: false,
    required: false,
    rows: 4,
    rules: () => [],
    validateOnInput: false,
    validateOnBlur: true,
    showValidationIcon: true,
    showCharCount: false,
    showSummary: false,
})

// Use defineModel for Vue 3.4 v-model implementation
const model = defineModel<string>({ default: '' })

const emit = defineEmits<{
    validate: [isValid: boolean, errors: string[]]
    focus: []
    blur: []
}>()

const hasBeenValidated = ref(false)
const isFocused = ref(false)

// Built-in validation rules
const builtInRules = computed(() => {
    const rules: ValidationRule[] = []

    if (props.required) {
        rules.push({
            name: 'required',
            test: (value) => value.trim().length > 0,
            message: 'This field is required',
        })
    }

    if (props.minLength) {
        rules.push({
            name: 'minLength',
            test: (value) => value.length >= (props.minLength || 0),
            message: `Must be at least ${props.minLength} characters`,
        })
    }

    if (props.maxLength) {
        rules.push({
            name: 'maxLength',
            test: (value) => value.length <= (props.maxLength || Infinity),
            message: `Must be no more than ${props.maxLength} characters`,
        })
    }

    if (props.email || props.type === 'email') {
        rules.push({
            name: 'email',
            test: (value) => !value || /^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/.test(value),
            message: 'Please enter a valid email address',
        })
    }

    if (props.url || props.type === 'url') {
        rules.push({
            name: 'url',
            test: (value) => !value || /^https?:\/\/\S+$/.test(value),
            message: 'Please enter a valid URL',
        })
    }

    if (props.pattern) {
        rules.push({
            name: 'pattern',
            test: (value) => !value || props.pattern!.test(value),
            message: 'Please match the required format',
        })
    }

    if (props.customValidator) {
        rules.push({
            name: 'custom',
            test: (value) => props.customValidator!(value) === null,
            message: props.customValidator!(model.value) || 'Invalid value',
        })
    }

    return rules
})

const allRules = computed(() => [...builtInRules.value, ...props.rules])

const validationErrors = computed(() => {
    const errors: string[] = []
    const inputVal = model.value

    for (const rule of allRules.value) {
        if (!rule.test(inputVal)) {
            errors.push(rule.message)
        }
    }

    return errors
})

const isValid = computed(() => validationErrors.value.length === 0)

const validatorClasses = computed(() => {
    const baseClasses = ['validator']

    if (props.size === 'sm') {
        baseClasses.push('text-sm')
    } else if (props.size === 'lg') {
        baseClasses.push('text-lg')
    }

    return baseClasses.join(' ')
})

const labelClasses = computed(() => {
    const baseClasses = ['label-text']

    if (!isValid.value && hasBeenValidated.value) {
        baseClasses.push('text-error')
    }

    return baseClasses.join(' ')
})

const inputClasses = computed(() => {
    const baseClasses = ['input', 'w-full']

    // Variant
    if (props.variant === 'bordered') {
        baseClasses.push('input-bordered')
    } else if (props.variant === 'ghost') {
        baseClasses.push('input-ghost')
    } else if (props.variant === 'filled') {
        baseClasses.push('input-bordered', 'bg-base-200')
    } else {
        baseClasses.push('input-bordered')
    }

    // Size
    if (props.size === 'sm') {
        baseClasses.push('input-sm')
    } else if (props.size === 'lg') {
        baseClasses.push('input-lg')
    }

    // Validation state
    if (hasBeenValidated.value) {
        if (isValid.value) {
            baseClasses.push('input-success')
        } else {
            baseClasses.push('input-error')
        }
    }

    // Focus state
    if (isFocused.value) {
        baseClasses.push('input-focus')
    }

    return baseClasses.join(' ')
})

const textareaClasses = computed(() => {
    const baseClasses = ['textarea', 'w-full']

    // Variant
    if (props.variant === 'bordered') {
        baseClasses.push('textarea-bordered')
    } else if (props.variant === 'ghost') {
        baseClasses.push('textarea-ghost')
    } else if (props.variant === 'filled') {
        baseClasses.push('textarea-bordered', 'bg-base-200')
    } else {
        baseClasses.push('textarea-bordered')
    }

    // Size
    if (props.size === 'sm') {
        baseClasses.push('textarea-sm')
    } else if (props.size === 'lg') {
        baseClasses.push('textarea-lg')
    }

    // Validation state
    if (hasBeenValidated.value) {
        if (isValid.value) {
            baseClasses.push('textarea-success')
        } else {
            baseClasses.push('textarea-error')
        }
    }

    return baseClasses.join(' ')
})

const iconClasses = computed(() => {
    const baseClasses = [
        'absolute',
        'right-3',
        'top-1/2',
        'transform',
        '-translate-y-1/2',
        'pointer-events-none',
    ]
    return baseClasses.join(' ')
})

const summaryClasses = computed(() => {
    const baseClasses = ['validation-summary', 'mt-2', 'p-3', 'rounded-lg', 'border']

    if (isValid.value) {
        baseClasses.push('border-success', 'bg-success/5')
    } else {
        baseClasses.push('border-error', 'bg-error/5')
    }

    return baseClasses.join(' ')
})

const handleInput = () => {
    if (props.validateOnInput) {
        validate()
    }
}

const handleBlur = () => {
    isFocused.value = false
    emit('blur')

    if (props.validateOnBlur) {
        validate()
    }
}

const handleFocus = () => {
    isFocused.value = true
    emit('focus')
}

const validate = () => {
    hasBeenValidated.value = true
    emit('validate', isValid.value, validationErrors.value)
    return isValid.value
}

// Expose validation method
defineExpose({
    validate,
    isValid: computed(() => isValid.value),
    errors: computed(() => validationErrors.value),
    reset: () => {
        hasBeenValidated.value = false
        model.value = ''
    },
})
</script>

<style scoped lang="postcss">
.validator {
    @apply w-full;
}

/* Custom validation state styles */
.input-success,
.textarea-success {
    @apply border-success focus:border-success;
}

.input-error,
.textarea-error {
    @apply border-error focus:border-error;
}

.input-focus {
    @apply ring-2 ring-primary ring-opacity-20;
}
</style>

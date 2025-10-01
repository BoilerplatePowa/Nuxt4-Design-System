<template>
    <div :class="wrapperClasses">
        <label v-if="label" :for="selectId" :class="labelClasses">
            <span class="label-text">{{ label }}</span>
            <span v-if="required" class="label-text-alt text-error" aria-label="required">*</span>
        </label>

        <div class="relative">
            <select
                :id="selectId"
                ref="selectRef"
                :class="selectClasses"
                :disabled="disabled"
                :required="required"
                :multiple="multiple"
                :aria-describedby="computedAriaDescribedby"
                :aria-invalid="hasError"
                @change="handleChange"
                @focus="handleFocus"
                @blur="handleBlur"
            >
                <option v-if="placeholder && !multiple" value="" disabled>
                    {{ placeholder }}
                </option>
                <template v-if="hasGroups">
                    <optgroup
                        v-for="group in groupedOptions"
                        :key="group.label"
                        :label="group.label"
                    >
                        <option
                            v-for="option in group.options"
                            :key="getOptionValue(option)"
                            :value="getOptionValue(option)"
                            :disabled="getOptionDisabled(option)"
                        >
                            {{ getOptionLabel(option) }}
                        </option>
                    </optgroup>
                </template>
                <template v-if="!hasGroups">
                    <slot>
                        <option
                            v-for="option in options"
                            :key="getOptionValue(option)"
                            :value="getOptionValue(option)"
                            :disabled="getOptionDisabled(option)"
                        >
                            {{ getOptionLabel(option) }}
                        </option>
                    </slot>
                </template>
            </select>

            <!-- Loading indicator -->
            <div v-if="loading" class="absolute right-8 top-1/2 transform -translate-y-1/2">
                <span class="loading loading-spinner loading-xs" />
            </div>
        </div>

        <p
            v-if="helpText && !errorMessage"
            :id="`${selectId}-help`"
            class="text-xs text-base-content/70 mt-1"
        >
            {{ helpText }}
        </p>

        <p
            v-if="errorMessage"
            :id="`${selectId}-error`"
            class="text-xs text-error mt-1"
            role="alert"
        >
            {{ errorMessage }}
        </p>

        <!-- Validation feedback -->
        <div v-if="showValidation && !errorMessage && model" class="mt-1 text-sm text-success">
            ✓ {{ validationMessage || 'Selection valid!' }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, nextTick } from 'vue'

// Simple ID generator
let idCounter = 0
const generateId = () => `select-${++idCounter}`

interface Option {
    label: string
    value: string | number
    disabled?: boolean
    group?: string
}

interface OptionGroup {
    label: string
    options: Option[]
    isGroup: boolean
}

interface Props {
    options?: Option[]
    label?: string
    placeholder?: string
    helpText?: string
    errorMessage?: string
    validationMessage?: string
    disabled?: boolean
    required?: boolean
    multiple?: boolean
    loading?: boolean
    showValidation?: boolean
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
    autoFocus?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    disabled: false,
    required: false,
    multiple: false,
    loading: false,
    showValidation: false,
    size: 'md',
    variant: 'bordered',
    options: () => [],
    autoFocus: false,
})

// Use defineModel() for v-model support
const model = defineModel<string | number | string[] | number[]>()

const emit = defineEmits<{
    change: [event: Event]
    focus: [event: FocusEvent]
    blur: [event: FocusEvent]
    validate: [isValid: boolean]
}>()

const selectId = generateId()
const selectRef = ref<HTMLSelectElement>()

// Computed properties
const hasError = computed(() => !!props.errorMessage)

const hasGroups = computed(() =>
    props.options.some((option) => typeof option === 'object' && option.group)
)

const groupedOptions = computed((): OptionGroup[] => {
    if (!hasGroups.value) return []

    const groups: { [key: string]: Option[] } = {}

    props.options.forEach((option) => {
        if (typeof option === 'object' && option.group) {
            if (!groups[option.group]) {
                groups[option.group] = []
            }
            groups[option.group]?.push(option)
        }
    })

    return Object.entries(groups).map(([label, options]) => ({
        label,
        options,
        isGroup: true,
    }))
})

const wrapperClasses = computed(() => ['form-control', 'w-full'])

const labelClasses = computed(() => ['label', 'text-sm', 'font-medium'])

const selectClasses = computed(() => {
    const baseClasses = ['select', 'w-full', 'transition-all', 'duration-200']

    // Size classes
    if (props.size === 'xs') {
        baseClasses.push('select-xs')
    } else if (props.size === 'sm') {
        baseClasses.push('select-sm')
    } else if (props.size === 'lg') {
        baseClasses.push('select-lg')
    }

    // Variant classes
    if (props.variant === 'bordered') {
        baseClasses.push('select-bordered')
    } else if (props.variant === 'ghost') {
        baseClasses.push('select-ghost')
    } else if (props.variant === 'primary') {
        baseClasses.push('select-primary')
    } else if (props.variant === 'secondary') {
        baseClasses.push('select-secondary')
    } else if (props.variant === 'accent') {
        baseClasses.push('select-accent')
    } else if (props.variant === 'info') {
        baseClasses.push('select-info')
    } else if (props.variant === 'success') {
        baseClasses.push('select-success')
    } else if (props.variant === 'warning') {
        baseClasses.push('select-warning')
    } else if (props.variant === 'error') {
        baseClasses.push('select-error')
    }

    // Error state override
    if (hasError.value) {
        baseClasses.push('select-error')
    }

    // Success state
    if (props.showValidation && !hasError.value && model.value) {
        baseClasses.push('select-success')
    }

    // Loading state
    if (props.loading) {
        baseClasses.push('cursor-wait')
    }

    return baseClasses.join(' ')
})

const computedAriaDescribedby = computed(() => {
    const ids = []
    if (props.helpText) ids.push(`${selectId}-help`)
    if (props.errorMessage) ids.push(`${selectId}-error`)
    if (props.ariaDescribedby) ids.push(props.ariaDescribedby)
    return ids.length > 0 ? ids.join(' ') : undefined
})

// Helper functions
const getOptionValue = (option: Option | string | number): string | number => {
    if (typeof option === 'object') {
        return option.value
    }
    return option
}

const getOptionLabel = (option: Option | string | number): string => {
    if (typeof option === 'object') {
        return option.label
    }
    return String(option)
}

const getOptionDisabled = (option: Option | string | number): boolean => {
    if (typeof option === 'object') {
        return option.disabled || false
    }
    return false
}

// Event handlers
const validateSelection = (value: unknown): boolean => {
    const isValid = !props.required || (value !== '' && value !== null && value !== undefined)
    emit('validate', isValid)
    return isValid
}

const handleChange = (event: Event) => {
    const target = event.target as HTMLSelectElement

    if (props.multiple) {
        const values = Array.from(target.selectedOptions).map((option) => {
            const value = option.value
            return /^\d+$/.test(value) ? Number(value) : value
        })
        model.value = values as string[] | number[]
        validateSelection(values)
    } else {
        const value = target.value
        const parsedValue = /^\d+$/.test(value) ? Number(value) : value
        model.value = parsedValue
        validateSelection(parsedValue)
    }

    emit('change', event)
}

const handleFocus = (event: FocusEvent) => {
    emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
    emit('blur', event)
}

// Auto focus functionality
onMounted(() => {
    if (props.autoFocus && selectRef.value) {
        nextTick(() => {
            selectRef.value?.focus()
        })
    }
})

// Expose methods for parent component access
defineExpose({
    focus: () => selectRef.value?.focus(),
    blur: () => selectRef.value?.blur(),
    validate: () => validateSelection(model.value),
})
</script>

<style scoped lang="postcss">
/* DaisyUI handles most select styling */
</style>

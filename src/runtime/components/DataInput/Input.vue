<template>
    <div :class="wrapperClasses">
        <!-- Label -->
        <label v-if="label" :for="inputId" class="label">
            <span :class="`label-text text-${size}`">{{ label }}</span>
            <span v-if="required" :class="`label-text-alt text-error text-${size}`">*</span>
        </label>

        <!-- VeeValidate Field component -->
        <Field v-slot="{ field, errorMessage, meta }" :name="name" :value="model" :rules="rules">
            <div>
                <div class="relative">
                    <!-- Left icon -->
                    <Icon
                        v-if="leftIcon"
                        :name="leftIcon"
                        :size="size"
                        class="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-50"
                        :aria-hidden="true"
                    />

                    <input
                        :id="inputId"
                        ref="inputRef"
                        v-bind="field"
                        :class="[
                            inputClasses,
                            errorMessage ? 'input-error' : undefined,
                            leftIcon ? 'pl-10' : '',
                            (rightIcon && type !== 'password') || type === 'password'
                                ? 'pr-10'
                                : '',
                        ]"
                        :type="type === 'password' ? (showPassword ? 'text' : 'password') : type"
                        :placeholder="placeholder"
                        :disabled="disabled"
                        :readonly="readonly"
                        :required="required"
                        :maxlength="maxlength"
                        :aria-describedby="ariaDescribedby"
                        :aria-invalid="meta.touched && !meta.valid"
                        @input="handleInput"
                        @change="handleChange"
                        @focus="handleFocus"
                        @blur="handleBlur"
                    />

                    <!-- Password toggle swap button -->
                    <Swap
                        v-if="type === 'password'"
                        v-model="showPassword"
                        variant="rotate"
                        class="absolute right-3 top-1/2 transform -translate-y-1/2"
                        :aria-label="showPassword ? 'Hide password' : 'Show password'"
                    >
                        <template #on>
                            <Icon name="eye" :size="size" class="text-base-content/50" />
                        </template>
                        <template #off>
                            <Icon name="eye-off" :size="size" class="text-base-content/50" />
                        </template>
                    </Swap>

                    <!-- Right icon (only show if not password type or if no swap button) -->
                    <Icon
                        v-if="rightIcon && type !== 'password'"
                        :name="rightIcon"
                        :size="size"
                        class="absolute right-3 top-1/2 transform -translate-y-1/2 opacity-50"
                        :aria-hidden="true"
                    />
                </div>

                <div class="flex">
                    <div>
                        <!-- Error message from VeeValidate -->
                        <p
                            v-if="errorMessage"
                            :id="`${inputId}-error`"
                            class="text-xs text-error mt-1"
                            role="alert"
                        >
                            {{ errorMessage }}
                        </p>

                        <!-- Help text -->
                        <p
                            v-if="helpText"
                            :id="`${inputId}-help`"
                            class="text-xs text-base-content/70 mt-1"
                        >
                            {{ helpText }}
                        </p>
                    </div>

                    <div class="flex-1" />

                    <!-- Character count -->
                    <div v-if="showCharCount && maxlength" class="text-xs text-base-content/60">
                        {{ characterCount }}/{{ maxlength }}
                    </div>
                </div>
            </div>
        </Field>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, watch } from 'vue'
import { Field } from 'vee-validate'
import Icon from '../Icons/Icon.vue'
import Swap from '../Actions/Swap.vue'
import type { InputType, Size, Variant, IconName, MaskType } from '../../shared/types.d'
import IMask from 'imask'

// Unique ID generator with timestamp and random component
const generateId = () => {
    const timestamp = Date.now()
    const random = Math.random().toString(36).substring(2, 8)
    return `input-${timestamp}-${random}`
}

const model = defineModel<string>({ default: '' })

// Password visibility state
const showPassword = ref(false)

// Input element reference
const inputRef = ref<HTMLInputElement>()

// IMask instance - using any due to complex third-party type definitions
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let maskInstance: any = null

// Predefined mask configurations
const maskConfigs = {
    phone: {
        mask: '+{33} 0 00 00 00 00',
        lazy: false,
    },
    'credit-card': {
        mask: '0000 0000 0000 0000',
        lazy: false,
    },
    date: {
        mask: '00/00/0000',
        lazy: false,
    },
    time: {
        mask: '00:00',
        lazy: false,
    },
    currency: {
        mask: Number,
        scale: 2,
        thousandsSeparator: ',',
        radix: '.',
        mapToRadix: ['.'],
        normalizeZeros: true,
        padFractionalZeros: true,
        min: 0,
        lazy: false,
    },
    number: {
        mask: Number,
        scale: 0,
        thousandsSeparator: ',',
        radix: '.',
        mapToRadix: ['.'],
        normalizeZeros: true,
        padFractionalZeros: false,
        min: 0,
        lazy: false,
    },
    email: {
        mask: /^[\w.%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i,
        lazy: false,
    },
    zip: {
        mask: '00000-0000',
        lazy: false,
    },
    ssn: {
        mask: '000-00-0000',
        lazy: false,
    },
}

interface InputProps {
    // Field name for VeeValidate
    name?: string
    // Input label
    label?: string
    // Input placeholder
    placeholder?: string
    // Help text displayed below input
    helpText?: string
    // Input type
    type?: InputType
    // Input size
    size?: Size
    // Input variant/style
    variant?: Variant
    // Left icon name
    leftIcon?: IconName | undefined
    // Right icon name
    rightIcon?: IconName | undefined
    // Whether input is disabled
    disabled?: boolean
    // Whether input is readonly
    readonly?: boolean
    // Whether input is required
    required?: boolean
    // Maximum character length
    maxlength?: number
    // Show character count
    showCharCount?: boolean
    // Additional aria-describedby IDs
    ariaDescribedby?: string
    // Yup validation rules
    rules?: Record<string, unknown>
    // IMask configuration
    mask?: Record<string, unknown>
    // Predefined mask type
    maskType?: MaskType
}

const props = withDefaults(defineProps<InputProps>(), {
    name: '',
    label: '',
    placeholder: '',
    helpText: '',
    type: 'text',
    size: 'md',
    variant: 'bordered',
    leftIcon: undefined,
    rightIcon: undefined,
    disabled: false,
    readonly: false,
    required: false,
    maxlength: undefined,
    showCharCount: false,
    ariaDescribedby: '',
    rules: undefined,
    mask: undefined,
    maskType: undefined,
})

const emit = defineEmits<{
    input: [event: Event]
    change: [event: Event]
    focus: [event: FocusEvent]
    blur: [event: FocusEvent]
}>()

const inputId = generateId()

// Initialize IMask
const initMask = (element: HTMLInputElement) => {
    if (maskInstance) {
        maskInstance.destroy()
    }

    const maskConfig =
        props.maskType && props.maskType in maskConfigs
            ? maskConfigs[props.maskType as MaskType]
            : props.mask

    if (maskConfig && element) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        maskInstance = IMask(element, maskConfig as any)

        // Listen to mask events
        if (maskInstance) {
            maskInstance.on('accept', () => {
                model.value = maskInstance.value
            })
            maskInstance.on('complete', () => {
                model.value = maskInstance.value
            })
        }
    }
}

// Cleanup mask on unmount
onUnmounted(() => {
    if (maskInstance) {
        maskInstance.destroy()
        maskInstance = null
    }
})

// Initialize mask on mount
onMounted(() => {
    if (inputRef.value && (props.mask || props.maskType)) {
        initMask(inputRef.value)
    }
})

// Watch for mask changes
watch(
    () => [props.mask, props.maskType],
    () => {
        if (inputRef.value) {
            initMask(inputRef.value)
        }
    }
)

const wrapperClasses = computed(() => ['form-control', 'w-full'])

const inputClasses = computed(() => {
    const baseClasses = ['input', 'w-full']

    if (props.size) {
        baseClasses.push(`input-${props.size}`)
    }

    if (props.variant) {
        baseClasses.push(`input-${props.variant}`)
    }

    return baseClasses.join(' ')
})

const characterCount = computed(() => {
    return model.value?.length || 0
})

const ariaDescribedby = computed(() => {
    const ids = []
    if (props.helpText) ids.push(`${inputId}-help`)
    if (props.ariaDescribedby) ids.push(props.ariaDescribedby)
    return ids.length > 0 ? ids.join(' ') : undefined
})

const handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement
    model.value = target.value
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
/* DaisyUI handles most input styling */
</style>

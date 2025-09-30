<template>
<div :class="wrapperClasses">
    <!-- Label -->
    <label
        v-if="label"
        :for="inputId"
        class="label"
    >
        <span :class="`label-text text-${size}`">{{ label }}</span>
        <span
            v-if="required"
            :class="`label-text-alt text-error text-${size}`"
        >*</span>
    </label>

    <!-- VeeValidate Field component -->
    <Field
        v-slot="{ field, errorMessage, meta }"
        :name="name"
        :value="model"
        :rules="rules"
    >
        <div>
            <div class="flex">
                <!-- Country Code Selector -->
                <div class="flex-shrink-0">
                    <select
                        :value="selectedCountry"
                        :class="selectClasses"
                        :disabled="disabled"
                        :aria-label="`Select country code for ${label || 'phone number'}`"
                        @change="handleCountryChange"
                    >
                        <option
                            v-for="country in countriesList"
                            :key="country.code"
                            :value="country.code"
                        >
                            {{ country.flag }} {{ country.code }}
                        </option>
                    </select>
                </div>

                <!-- Phone Number Input -->
                <div class="flex-1">
                    <label :class="[inputClasses, errorMessage ? 'input-error' : undefined]">
                        <!-- Country calling code prefix (readonly) -->
                        <span class="text-base-content/70 text-sm pr-1">
                            +{{ selectedCountryCallingCode }}
                        </span>

                        <input
                            :id="inputId"
                            ref="inputRef"
                            v-bind="field"
                            type="tel"
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
                        >
                    </label>
                </div>
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

                    <!-- Example Formatted Number -->
                    <p
                        v-if="showExampleNumber"
                        :id="`${inputId}-example`"
                        class="text-xs text-base-content/70 mt-1"
                    >
                        Example: {{ exampleFormattedNumber?.number }}
                    </p>

                    <!-- Help text -->
                    <p
                        v-if="helpText"
                        :id="`${inputId}-help`"
                        class="text-xs text-base-content/70 mt-1"
                    >
                        {{ helpText }}
                    </p>

                    <!-- Phone number validation feedback -->
                    <p
                        v-if="phoneValidationMessage && !errorMessage"
                        :class="validationClasses"
                        role="status"
                    >
                        {{ phoneValidationMessage }}
                    </p>
                </div>

                <div class="flex-1" />

                <!-- Character count -->
                <div
                    v-if="showCharCount && maxlength"
                    class="text-xs text-base-content/60"
                >
                    {{ characterCount }}/{{ maxlength }}
                </div>
            </div>
        </div>
    </Field>
</div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, watch } from 'vue'
import { Field } from 'vee-validate'
import type {
    CountryCode } from 'libphonenumber-js'
import {
    parsePhoneNumberFromString,
    getCountryCallingCode,
    isValidPhoneNumber,
    getExampleNumber,
} from 'libphonenumber-js'
import examples from 'libphonenumber-js/examples.mobile.json'
import countries from 'i18n-iso-countries'
import enLocale from 'i18n-iso-countries/langs/en.json'

// Register English locale for country names
countries.registerLocale(enLocale)

// Simple ID generator
let idCounter = 0
const generateId = () => `phone-input-${++idCounter}`

const model = defineModel<string>({ default: '' })

// Input element reference
const inputRef = ref<HTMLInputElement>()

// Selected country
const selectedCountry = ref<CountryCode>('FR')

// Phone validation state
const phoneValidationMessage = ref<string>('')
const isPhoneValid = ref<boolean>(false)

// Countries data
const countriesList = computed(() => {
    let countriesArray: CountryCode[] = []

    if (props.countriesCodes && props.countriesCodes.length > 0) {
        countriesArray = props.countriesCodes
    }
    else {
        countriesArray = ['FR', 'US', 'BE']
    }
    return countriesArray
        .map((countryCode: CountryCode) => ({
            code: countryCode,
            flag: getCountryFlag(countryCode),
            dialCode: getCountryCallingCode(countryCode),
            name: countries.getName(countryCode, 'en') || countryCode,
        }))
        .sort((a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name))
})

// Get selected country calling code
const selectedCountryCallingCode = computed(() => {
    return getCountryCallingCode(selectedCountry.value)
})

const exampleFormattedNumber = computed(() => {
    return getExampleNumber(selectedCountry.value, examples)
})

// Convert ISO2 country code to flag emoji
const getCountryFlag = (countryCode: string): string => {
    if (countryCode.length !== 2) return '🌍'

    // Convert ISO2 code to flag emoji using regional indicator symbols
    const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map(
            char => 127397 + char.charCodeAt(0), // Regional Indicator Symbol base + letter offset
        )

    return String.fromCodePoint(...codePoints)
}

interface PhoneInputProps {
    // Field name for VeeValidate
    name?: string
    // Input label
    label?: string
    // Input placeholder
    placeholder?: string
    // Help text displayed below input
    helpText?: string
    // Input size
    size?: 'sm' | 'md' | 'lg'
    // Input variant/style
    variant?: 'bordered' | 'outlined' | 'filled'
    // Default country code
    defaultCountry?: CountryCode
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
    // Whether to show phone validation feedback
    showValidation?: boolean
    // Array of country codes to show in dropdown (if empty, shows all countries)
    countriesCodes?: CountryCode[]
    // Whether to show example number
    showExampleNumber?: boolean
}

const props = withDefaults(defineProps<PhoneInputProps>(), {
    name: '',
    label: '',
    placeholder: 'Enter phone number',
    helpText: '',
    size: 'md',
    variant: 'bordered',
    defaultCountry: 'FR',
    disabled: false,
    readonly: false,
    required: false,
    maxlength: undefined,
    showCharCount: false,
    ariaDescribedby: '',
    rules: undefined,
    showValidation: true,
    countriesCodes: undefined,
    showExampleNumber: false,
})

const emit = defineEmits<{
    'input': [event: Event]
    'change': [event: Event]
    'focus': [event: FocusEvent]
    'blur': [event: FocusEvent]
    'country-change': [countryCode: CountryCode]
    'validation-change': [isValid: boolean, phoneNumber?: string]
}>()

const inputId = generateId()

// Initialize with default country
onMounted(() => {
    selectedCountry.value = props.defaultCountry as CountryCode
})

const wrapperClasses = computed(() => ['form-control', 'w-full'])

const inputClasses = computed(() => {
    const baseClasses = ['input', 'w-full', 'rounded-l-none', 'gap-0']

    if (props.size) {
        baseClasses.push(`input-${props.size}`)
    }

    if (props.variant) {
        baseClasses.push(`input-${props.variant}`)
    }

    return baseClasses.join(' ')
})

const selectClasses = computed(() => {
    const baseClasses = ['select', 'select-bordered', 'rounded-r-none', 'border-r-0']

    if (props.size) {
        baseClasses.push(`select-${props.size}`)
    }

    if (props.variant) {
        baseClasses.push(`select-${props.variant}`)
    }

    return baseClasses.join(' ')
})

const validationClasses = computed(() => {
    const baseClasses = ['text-xs', 'mt-1']

    if (isPhoneValid.value) {
        baseClasses.push('text-success')
    }
    else {
        baseClasses.push('text-warning')
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

// Validate phone number using libphonenumber-js
const validatePhoneNumber = (
    phoneNumber: string,
    countryCode: CountryCode,
): { isValid: boolean, message: string, formattedNumber?: string } => {
    if (!phoneNumber || phoneNumber.trim() === '') {
        return { isValid: false, message: '' }
    }

    try {
        // Remove any non-digit characters except + for parsing
        const cleanNumber = phoneNumber.replace(/[^\d+]/g, '')

        // If the number doesn't start with +, add the country calling code
        const fullNumber = cleanNumber.startsWith('+')
            ? cleanNumber
            : `+${getCountryCallingCode(countryCode)}${cleanNumber}`

        const parsedNumber = parsePhoneNumberFromString(fullNumber, countryCode)

        if (parsedNumber && isValidPhoneNumber(parsedNumber.number, countryCode)) {
            const formattedNumber = parsedNumber.formatNational()
            return {
                isValid: true,
                message: `✓ Valid ${parsedNumber.country} number: ${formattedNumber}`,
                formattedNumber: parsedNumber.number,
            }
        }
        else {
            return {
                isValid: false,
                message: `⚠ Invalid phone number for ${countries.getName(countryCode, 'en')}`,
            }
        }
    }
    catch {
        return {
            isValid: false,
            message: `⚠ Invalid phone number format`,
        }
    }
}

// Handle country change
const handleCountryChange = (event: Event) => {
    const target = event.target as HTMLSelectElement
    const newCountry = target.value as CountryCode
    selectedCountry.value = newCountry
    emit('country-change', newCountry)

    // Revalidate phone number with new country
    if (model.value) {
        const validation = validatePhoneNumber(model.value, newCountry)
        phoneValidationMessage.value = validation.message
        isPhoneValid.value = validation.isValid
        emit('validation-change', validation.isValid, validation.formattedNumber)
    }
}

const handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement
    const phoneNumber = target.value

    // Validate phone number
    if (props.showValidation && phoneNumber) {
        const validation = validatePhoneNumber(phoneNumber, selectedCountry.value)
        phoneValidationMessage.value = validation.message
        isPhoneValid.value = validation.isValid
        emit('validation-change', validation.isValid, validation.formattedNumber)
    }
    else {
        phoneValidationMessage.value = ''
        isPhoneValid.value = false
        emit('validation-change', false)
    }

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

// Watch for country changes to revalidate
watch(selectedCountry, () => {
    if (model.value && props.showValidation) {
        const validation = validatePhoneNumber(model.value, selectedCountry.value)
        phoneValidationMessage.value = validation.message
        isPhoneValid.value = validation.isValid
        emit('validation-change', validation.isValid, validation.formattedNumber)
    }
})

// Watch for model changes to validate
watch(model, (newValue) => {
    if (props.showValidation && newValue) {
        const validation = validatePhoneNumber(newValue, selectedCountry.value)
        phoneValidationMessage.value = validation.message
        isPhoneValid.value = validation.isValid
        emit('validation-change', validation.isValid, validation.formattedNumber)
    }
    else {
        phoneValidationMessage.value = ''
        isPhoneValid.value = false
        emit('validation-change', false)
    }
})
</script>

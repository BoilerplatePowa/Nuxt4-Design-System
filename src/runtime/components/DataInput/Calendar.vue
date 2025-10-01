<template>
    <div ref="calendarRef" :class="containerClasses">
        <!-- Input Mode -->
        <div v-if="mode === 'input'" class="relative">
            <div class="relative">
                <input
                    ref="inputRef"
                    :value="displayValue"
                    :class="inputClasses"
                    :placeholder="placeholder"
                    :disabled="disabled"
                    :readonly="readonly"
                    :aria-label="ariaLabel"
                    :aria-describedby="ariaDescribedby"
                    :aria-invalid="hasError"
                    role="combobox"
                    :aria-expanded="isOpen"
                    :aria-haspopup="true"
                    :aria-controls="popoverId"
                    @input="handleInput"
                    @focus="handleFocus"
                    @blur="handleBlur"
                    @keydown="handleKeydown"
                />

                <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <CalendarIcon class="w-4 h-4 text-base-content opacity-70" />
                </div>

                <button
                    :class="buttonClasses"
                    :disabled="disabled"
                    :aria-label="`${isOpen ? 'Close' : 'Open'} calendar`"
                    type="button"
                    @click="toggleCalendar"
                >
                    <span class="sr-only">Open calendar</span>
                </button>
            </div>

            <!-- Calendar Popover -->
            <div
                v-if="isOpen"
                :id="popoverId"
                :class="popoverClasses"
                role="dialog"
                :aria-label="`Calendar popover`"
                :aria-modal="true"
            >
                <CalendarContent
                    v-model="model"
                    :range="range"
                    :min-date="minDate"
                    :max-date="maxDate"
                    :disabled-dates="disabledDates"
                    :locale="locale"
                    :format="format"
                    :show-time="showTime"
                    :time-step="timeStep"
                    :size="size"
                    :variant="variant"
                    :allow-month-select="allowMonthSelect"
                    :allow-year-select="allowYearSelect"
                    :year-range="yearRange"
                    @close="closeCalendar"
                />
            </div>
        </div>

        <!-- Inline Mode -->
        <div v-else class="calendar-inline">
            <CalendarContent
                v-model="model"
                :range="range"
                :min-date="minDate"
                :max-date="maxDate"
                :disabled-dates="disabledDates"
                :locale="locale"
                :format="format"
                :show-time="showTime"
                :time-step="timeStep"
                :size="size"
                :variant="variant"
                :allow-month-select="allowMonthSelect"
                :allow-year-select="allowYearSelect"
                :year-range="yearRange"
            />
        </div>

        <!-- Error Message -->
        <div v-if="hasError && errorMessage" :class="errorClasses" role="alert">
            {{ errorMessage }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { CalendarIcon } from 'lucide-vue-next'
import CalendarContent from './CalendarContent.vue'

interface Props {
    mode?: 'input' | 'inline'
    range?: boolean
    placeholder?: string
    format?: string
    locale?: string
    size?: 'sm' | 'md' | 'lg'
    variant?: 'default' | 'bordered' | 'filled'
    disabled?: boolean
    readonly?: boolean
    minDate?: Date | string
    maxDate?: Date | string
    disabledDates?: Date[] | string[]
    showTime?: boolean
    timeStep?: number
    allowMonthSelect?: boolean
    allowYearSelect?: boolean
    yearRange?: [number, number]
    errorMessage?: string
}

const props = withDefaults(defineProps<Props>(), {
    mode: 'input',
    range: false,
    placeholder: 'Select date...',
    format: 'YYYY-MM-DD',
    locale: 'en-US',
    size: 'md',
    variant: 'default',
    disabled: false,
    readonly: false,
    showTime: false,
    timeStep: 15,
    allowMonthSelect: true,
    allowYearSelect: true,
    yearRange: () => [new Date().getFullYear() - 10, new Date().getFullYear() + 10],
})

// Use defineModel() for Vue 3.4 best practices
const model = defineModel<Date | Date[] | null>()

const emit = defineEmits<{
    select: [date: Date | Date[]]
    focus: [event: FocusEvent]
    blur: [event: FocusEvent]
    close: []
    error: [error: string]
}>()

// Refs
const calendarRef = ref<HTMLElement>()
const inputRef = ref<HTMLInputElement>()
const isOpen = ref(false)
const selectedDate = ref<Date | Date[] | null>(null)
const hasError = computed(() => !!props.errorMessage)

// Computed
const popoverId = computed(() => `calendar-popover-${Math.random().toString(36).substr(2, 9)}`)

const containerClasses = computed(() => {
    const baseClasses = ['calendar-container', 'relative']

    if (props.disabled) {
        baseClasses.push('opacity-60', 'pointer-events-none')
    }

    return baseClasses.join(' ')
})

const inputClasses = computed(() => {
    const baseClasses = ['input', 'w-full', 'pr-10']

    // Size
    if (props.size === 'sm') {
        baseClasses.push('input-sm')
    } else if (props.size === 'md') {
        baseClasses.push('input-md')
    } else if (props.size === 'lg') {
        baseClasses.push('input-lg')
    }

    // Variant
    if (props.variant === 'bordered') {
        baseClasses.push('input-bordered')
    } else if (props.variant === 'filled') {
        baseClasses.push('bg-base-200')
    }

    // Error state
    if (hasError.value) {
        baseClasses.push('input-error')
    }

    return baseClasses.join(' ')
})

const buttonClasses = computed(() => {
    const baseClasses = [
        'absolute',
        'inset-0',
        'w-full',
        'h-full',
        'bg-transparent',
        'border-0',
        'p-0',
        'cursor-pointer',
    ]

    return baseClasses.join(' ')
})

const popoverClasses = computed(() => {
    return [
        'absolute',
        'top-full',
        'left-0',
        'z-50',
        'mt-1',
        'bg-base-100',
        'border',
        'border-base-300',
        'rounded-lg',
        'shadow-lg',
        'p-4',
        'min-w-[320px]',
    ]
})

const errorClasses = computed(() => {
    return ['text-error', 'text-sm', 'mt-1']
})

const displayValue = computed(() => {
    if (!selectedDate.value) return ''

    if (Array.isArray(selectedDate.value)) {
        if (selectedDate.value.length === 0) return ''
        if (selectedDate.value.length === 1) {
            return selectedDate.value[0] ? formatDate(selectedDate.value[0]) : ''
        }
        return `${selectedDate.value[0] ? formatDate(selectedDate.value[0]) : ''} - ${selectedDate.value[1] ? formatDate(selectedDate.value[1]) : ''}`
    }

    return formatDate(selectedDate.value)
})

const ariaLabel = computed(() => {
    return props.range ? 'Select date range' : 'Select date'
})

const ariaDescribedby = computed(() => {
    return hasError.value ? `${popoverId.value}-error` : undefined
})

// Methods
const formatDate = (date: Date): string => {
    if (!date) return ''

    const formatter = new Intl.DateTimeFormat(props.locale, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        ...(props.showTime && {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        }),
    })

    return formatter.format(date)
}

const parseDate = (value: string): Date | null => {
    if (!value) return null

    const date = new Date(value)
    return Number.isNaN(date.getTime()) ? null : date
}

const handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement
    const value = target.value

    if (props.range) {
        // Handle range input parsing
        const dates = value
            .split('-')
            .map((d) => d.trim())
            .filter((d) => d)
        if (dates.length === 1) {
            const date = dates[0] ? parseDate(dates[0]) : null
            if (date) {
                selectedDate.value = [date]
                model.value = [date]
            }
        } else if (dates.length === 2) {
            const startDate = dates[0] ? parseDate(dates[0]) : null
            const endDate = dates[1] ? parseDate(dates[1]) : null
            if (startDate && endDate) {
                selectedDate.value = [startDate, endDate]
                model.value = [startDate, endDate]
            }
        }
    } else {
        const date = parseDate(value)
        if (date) {
            selectedDate.value = date
            model.value = date
        }
    }
}

const handleFocus = (event: FocusEvent) => {
    emit('focus', event)
    if (props.mode === 'input') {
        nextTick(() => {
            isOpen.value = true
        })
    }
}

const handleBlur = (event: FocusEvent) => {
    emit('blur', event)
    // Delay closing to allow for date selection
    setTimeout(() => {
        if (!calendarRef.value?.contains(event.relatedTarget as Node)) {
            closeCalendar()
        }
    }, 150)
}

const handleKeydown = (event: KeyboardEvent) => {
    switch (event.key) {
        case 'Enter':
            event.preventDefault()
            toggleCalendar()
            break
        case 'Escape':
            event.preventDefault()
            closeCalendar()
            break
        case 'ArrowDown':
            if (!isOpen.value) {
                event.preventDefault()
                toggleCalendar()
            }
            break
    }
}

const toggleCalendar = () => {
    if (props.disabled || props.readonly) return
    isOpen.value = !isOpen.value
    if (isOpen.value) {
        nextTick(() => {
            inputRef.value?.focus()
        })
    }
}

const closeCalendar = () => {
    isOpen.value = false
    emit('close')
}

// Handle date selection from CalendarContent
const handleDateSelect = (date: Date | Date[]) => {
    emit('select', date)

    if (props.mode === 'input' && !props.range) {
        closeCalendar()
    }
}

// Watchers
watch(
    () => model.value,
    (newValue) => {
        if (typeof newValue === 'string') {
            const date = new Date(newValue)
            selectedDate.value = Number.isNaN(date.getTime()) ? null : date
        } else {
            selectedDate.value = newValue || null
        }

        // Handle date selection logic when model changes
        if (newValue && (newValue instanceof Date || Array.isArray(newValue))) {
            handleDateSelect(newValue)
        }
    },
    { immediate: true }
)

// Click outside handler
const handleClickOutside = (event: Event) => {
    if (calendarRef.value && !calendarRef.value.contains(event.target as Node)) {
        closeCalendar()
    }
}

// Lifecycle
onMounted(() => {
    document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
})
</script>

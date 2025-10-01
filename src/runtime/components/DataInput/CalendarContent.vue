<template>
  <div :class="containerClasses">
    <!-- Header with Navigation -->
    <div class="calendar-header flex items-center justify-between mb-4">
      <!-- Month/Year Selectors -->
      <div v-if="allowMonthSelect || allowYearSelect" class="flex items-center gap-2">
        <!-- Month Selector -->
        <select
          v-if="allowMonthSelect"
          :value="currentMonth"
          :class="selectClasses"
          :disabled="disabled"
          :aria-label="`Select month`"
          @change="handleMonthChange"
        >
          <option v-for="(month, index) in monthNames" :key="index" :value="index">
            {{ month }}
          </option>
        </select>

        <!-- Year Selector -->
        <select
          v-if="allowYearSelect"
          :value="currentYear"
          :class="selectClasses"
          :disabled="disabled"
          :aria-label="`Select year`"
          @change="handleYearChange"
        >
          <option v-for="year in availableYears" :key="year" :value="year">
            {{ year }}
          </option>
        </select>
      </div>

      <!-- Navigation Buttons -->
      <div class="flex items-center gap-1">
        <button
          :class="navButtonClasses"
          :disabled="disabled || isPreviousDisabled"
          :aria-label="`Previous month`"
          type="button"
          @click="previousMonth"
        >
          <ChevronLeftIcon class="w-4 h-4" />
        </button>

        <button
          :class="navButtonClasses"
          :disabled="disabled || isNextDisabled"
          :aria-label="`Next month`"
          type="button"
          @click="nextMonth"
        >
          <ChevronRightIcon class="w-4 h-4" />
        </button>
      </div>
    </div>

    <!-- Calendar Grid -->
    <div
      class="calendar-grid"
      role="grid"
      :aria-label="`Calendar for ${currentMonthName} ${currentYear}`"
    >
      <!-- Day Headers -->
      <div class="calendar-weekdays grid grid-cols-7 gap-1 mb-2">
        <div
          v-for="day in weekDays"
          :key="day"
          :class="weekdayClasses"
          role="columnheader"
          :aria-label="day"
        >
          {{ day }}
        </div>
      </div>

      <!-- Calendar Days -->
      <div class="calendar-days grid grid-cols-7 gap-1">
        <button
          v-for="day in calendarDays"
          :key="day.key"
          :class="dayClasses(day)"
          :disabled="day.disabled || disabled"
          :aria-label="day.ariaLabel"
          :aria-selected="day.isSelected"
          :aria-current="day.isToday ? 'date' : undefined"
          role="gridcell"
          type="button"
          tabindex="0"
          @click="selectDate(day.date)"
          @keydown="handleDayKeydown($event, day.date)"
        >
          {{ day.dayNumber }}
        </button>
      </div>
    </div>

    <!-- Time Picker -->
    <div v-if="showTime" class="calendar-time mt-4 pt-4 border-t border-base-300">
      <div class="flex items-center gap-4">
        <div class="flex-1">
          <label class="label">
            <span class="label-text flex items-center gap-2">
              <ClockIcon class="w-4 h-4" />
              Time
            </span>
          </label>
          <input
            :value="timeValue"
            type="time"
            :step="timeStep"
            :class="timeInputClasses"
            :disabled="disabled"
            @input="handleTimeInput"
          />
        </div>
      </div>
    </div>

    <!-- Action Buttons -->
    <div v-if="range" class="calendar-actions mt-4 pt-4 border-t border-base-300">
      <div class="flex items-center justify-between">
        <button
          :class="actionButtonClasses"
          :disabled="disabled"
          type="button"
          @click="clearSelection"
        >
          <XIcon class="w-4 h-4 mr-1" />
          Clear
        </button>

        <button
          :class="actionButtonClasses"
          :disabled="disabled || !isSelectionComplete"
          type="button"
          @click="applySelection"
        >
          <CheckIcon class="w-4 h-4 mr-1" />
          Apply
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { ChevronLeftIcon, ChevronRightIcon, ClockIcon, XIcon, CheckIcon } from 'lucide-vue-next'

interface Props {
  range?: boolean
  minDate?: Date | string
  maxDate?: Date | string
  disabledDates?: Date[] | string[]
  locale?: string
  format?: string
  showTime?: boolean
  timeStep?: number
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'bordered' | 'filled'
  allowMonthSelect?: boolean
  allowYearSelect?: boolean
  yearRange?: [number, number]
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  range: false,
  locale: 'en-US',
  format: 'YYYY-MM-DD',
  showTime: false,
  timeStep: 15,
  size: 'md',
  variant: 'default',
  allowMonthSelect: true,
  allowYearSelect: true,
  yearRange: () => [new Date().getFullYear() - 10, new Date().getFullYear() + 10],
  disabled: false,
})

// Use defineModel() for Vue 3.4 best practices
const model = defineModel<Date | Date[] | null>()

const emit = defineEmits<{
  close: []
}>()

// Refs
const currentMonth = ref(new Date().getMonth())
const currentYear = ref(new Date().getFullYear())
const selectedTime = ref('12:00')

// Computed
const containerClasses = computed(() => {
  const baseClasses = ['calendar-content']

  // Size
  if (props.size === 'sm') {
    baseClasses.push('text-sm')
  } else if (props.size === 'lg') {
    baseClasses.push('text-lg')
  }

  return baseClasses.join(' ')
})

const selectClasses = computed(() => {
  const baseClasses = ['select', 'select-bordered']

  // Size
  if (props.size === 'sm') {
    baseClasses.push('select-sm')
  } else if (props.size === 'lg') {
    baseClasses.push('select-lg')
  }

  return baseClasses.join(' ')
})

const navButtonClasses = computed(() => {
  const baseClasses = ['btn', 'btn-ghost', 'btn-sm', 'p-1']

  return baseClasses.join(' ')
})

const weekdayClasses = computed(() => {
  return ['text-center', 'text-sm', 'font-medium', 'text-base-content', 'opacity-70']
})

const timeInputClasses = computed(() => {
  const baseClasses = ['input', 'input-bordered', 'w-full']

  // Size
  if (props.size === 'sm') {
    baseClasses.push('input-sm')
  } else if (props.size === 'lg') {
    baseClasses.push('input-lg')
  }

  return baseClasses.join(' ')
})

const actionButtonClasses = computed(() => {
  const baseClasses = ['btn', 'btn-sm']

  return baseClasses.join(' ')
})

const currentMonthName = computed(() => {
  const formatter = new Intl.DateTimeFormat(props.locale, { month: 'long' })
  return formatter.format(new Date(currentYear.value, currentMonth.value, 1))
})

const weekDays = computed(() => {
  const formatter = new Intl.DateTimeFormat(props.locale, {
    weekday: 'short',
  })
  const days = []

  // Get the first day of the week for the locale
  const firstDayOfWeek = new Intl.DateTimeFormat(props.locale, {
    weekday: 'short',
  }).format(new Date(2024, 0, 1))
  const startIndex = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(firstDayOfWeek)

  for (let i = 0; i < 7; i++) {
    const dayIndex = (startIndex + i) % 7
    days.push(formatter.format(new Date(2024, 0, dayIndex + 1)))
  }

  return days
})

const monthNames = computed(() => {
  const formatter = new Intl.DateTimeFormat(props.locale, { month: 'long' })
  return Array.from({ length: 12 }, (_, i) => formatter.format(new Date(2024, i, 1)))
})

const availableYears = computed(() => {
  const [start, end] = props.yearRange
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
})

const calendarDays = computed(() => {
  const days = []
  const firstDay = new Date(currentYear.value, currentMonth.value, 1)
  // const lastDay = new Date(currentYear.value, currentMonth.value + 1, 0);
  const startDate = new Date(firstDay)
  startDate.setDate(startDate.getDate() - firstDay.getDay())

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  for (let i = 0; i < 42; i++) {
    const date = new Date(startDate)
    date.setDate(startDate.getDate() + i)

    const dayNumber = date.getDate()
    const isCurrentMonth = date.getMonth() === currentMonth.value
    const isToday = date.getTime() === today.getTime()
    const isSelected = isDateSelected(date)
    const isInRange = isDateInRange(date)
    const disabled = isDateDisabled(date)

    days.push({
      key: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
      date,
      dayNumber,
      isCurrentMonth,
      isToday,
      isSelected,
      isInRange,
      disabled,
      ariaLabel: `${date.toLocaleDateString(props.locale)}${isToday ? ' (Today)' : ''}${isSelected ? ' (Selected)' : ''}`,
    })
  }

  return days
})

const timeValue = computed(() => {
  if (!model.value) return selectedTime.value

  const date = Array.isArray(model.value) ? model.value[0] : model.value
  if (!date) return selectedTime.value

  return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
})

const isPreviousDisabled = computed(() => {
  if (!props.minDate) return false
  const minDate = new Date(props.minDate)
  const currentDate = new Date(currentYear.value, currentMonth.value, 1)
  return currentDate <= minDate
})

const isNextDisabled = computed(() => {
  if (!props.maxDate) return false
  const maxDate = new Date(props.maxDate)
  const currentDate = new Date(currentYear.value, currentMonth.value + 1, 0)
  return currentDate >= maxDate
})

const isSelectionComplete = computed(() => {
  if (!props.range || !Array.isArray(model.value)) return true
  return model.value.length === 2
})

// Methods
const isDateSelected = (date: Date): boolean => {
  if (!model.value) return false

  const dateTime = date.getTime()

  if (Array.isArray(model.value)) {
    return model.value.some((d: Date) => d.getTime() === dateTime)
  }

  return model.value.getTime() === dateTime
}

const isDateInRange = (date: Date): boolean => {
  if (!props.range || !Array.isArray(model.value) || model.value.length !== 2) {
    return false
  }

  const [start, end] = model.value
  const dateTime = date.getTime()
  const startTime = start?.getTime() || 0
  const endTime = end?.getTime() || 0

  return dateTime >= Math.min(startTime, endTime) && dateTime <= Math.max(startTime, endTime)
}

const isDateDisabled = (date: Date): boolean => {
  // Check min/max date constraints
  if (props.minDate && date < new Date(props.minDate)) {
    return true
  }

  if (props.maxDate && date > new Date(props.maxDate)) {
    return true
  }

  // Check disabled dates
  if (props.disabledDates) {
    const dateString = date.toISOString().split('T')[0]
    return props.disabledDates.some((disabledDate) => {
      const disabledDateString = new Date(disabledDate).toISOString().split('T')[0]
      return dateString === disabledDateString
    })
  }

  return false
}

const dayClasses = (day: {
  isCurrentMonth: boolean
  isToday: boolean
  isSelected: boolean
  isInRange: boolean
  disabled: boolean
}) => {
  const baseClasses = ['btn', 'btn-sm', 'h-8', 'w-8', 'p-0', 'text-xs']

  if (!day.isCurrentMonth) {
    baseClasses.push('opacity-40')
  }

  if (day.isToday) {
    baseClasses.push('ring-2', 'ring-primary')
  }

  if (day.isSelected) {
    baseClasses.push('btn-primary')
  } else if (day.isInRange) {
    baseClasses.push('bg-primary', 'text-primary-content', 'opacity-70')
  } else if (day.disabled) {
    baseClasses.push('opacity-50', 'cursor-not-allowed')
  } else {
    baseClasses.push('btn-ghost')
  }

  return baseClasses.join(' ')
}

const selectDate = (date: Date) => {
  if (props.disabled || isDateDisabled(date)) return

  let newValue: Date | Date[] | null

  if (props.range) {
    if (!Array.isArray(model.value) || model.value.length === 0) {
      newValue = [date]
    } else if (model.value.length === 1) {
      const [firstDate] = model.value
      if (firstDate && date < firstDate) {
        newValue = [date, firstDate!]
      } else {
        newValue = [firstDate!, date]
      }
    } else {
      newValue = [date]
    }
  } else {
    newValue = date
  }

  model.value = newValue
}

const handleDayKeydown = (event: KeyboardEvent, date: Date) => {
  switch (event.key) {
    case 'Enter':
    case ' ':
      event.preventDefault()
      selectDate(date)
      break
  }
}

const handleMonthChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  currentMonth.value = Number.parseInt(target.value)
}

const handleYearChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  currentYear.value = Number.parseInt(target.value)
}

const handleTimeInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  selectedTime.value = target.value

  if (model.value) {
    const timeParts = target.value.split(':')
    const hours = Number(timeParts[0] || 0)
    const minutes = Number(timeParts[1] || 0)
    const dateValue = Array.isArray(model.value) ? model.value[0] : model.value
    if (!dateValue) return
    const newDate = new Date(dateValue)
    newDate.setHours(hours, minutes)

    if (props.range && Array.isArray(model.value)) {
      const secondDate = model.value[1]

      if (secondDate) model.value = [newDate, secondDate]
    } else {
      model.value = newDate
    }
  }
}

const previousMonth = () => {
  if (currentMonth.value === 0) {
    currentMonth.value = 11
    currentYear.value--
  } else {
    currentMonth.value--
  }
}

const nextMonth = () => {
  if (currentMonth.value === 11) {
    currentMonth.value = 0
    currentYear.value++
  } else {
    currentMonth.value++
  }
}

const clearSelection = () => {
  model.value = null
}

const applySelection = () => {
  emit('close')
}

// Watchers
watch(
  () => model.value,
  (newValue) => {
    if (newValue) {
      const date = Array.isArray(newValue) ? newValue[0] : newValue
      if (!date) return
      currentMonth.value = date.getMonth()
      currentYear.value = date.getFullYear()
    }
  },
  { immediate: true }
)
</script>

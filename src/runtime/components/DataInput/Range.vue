<template>
    <div class="form-control w-full">
        <label v-if="label" :for="rangeId" class="label">
            <span class="label-text">{{ label }}</span>
            <span v-if="showValue" class="label-text-alt">{{ displayValue }}</span>
        </label>

        <input
            :id="rangeId"
            :value="model"
            type="range"
            :min="min"
            :max="max"
            :step="step"
            :class="rangeClasses"
            :disabled="disabled"
            :aria-describedby="ariaDescribedby"
            @input="handleInput"
            @change="handleChange"
        />

        <div v-if="showTicks && ticks.length > 0" class="w-full flex justify-between text-xs px-2">
            <span v-for="tick in ticks" :key="tick">{{ tick }}</span>
        </div>

        <p
            v-if="helpText && !errorMessage"
            :id="`${rangeId}-help`"
            class="text-xs text-base-content/70 mt-1"
        >
            {{ helpText }}
        </p>

        <p
            v-if="errorMessage"
            :id="`${rangeId}-error`"
            class="text-xs text-error mt-1"
            role="alert"
        >
            {{ errorMessage }}
        </p>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// Simple ID generator
let idCounter = 0
const generateId = () => `range-${++idCounter}`

interface Props {
    min?: number
    max?: number
    step?: number
    label?: string
    helpText?: string
    errorMessage?: string
    disabled?: boolean
    showValue?: boolean
    showTicks?: boolean
    tickCount?: number
    size?: 'xs' | 'sm' | 'md' | 'lg'
    variant?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'info' | 'error'
    ariaDescribedby?: string
}

const props = withDefaults(defineProps<Props>(), {
    min: 0,
    max: 100,
    step: 1,
    disabled: false,
    showValue: false,
    showTicks: false,
    tickCount: 5,
    size: 'md',
    variant: 'primary',
})

// Use defineModel() for Vue 3.4 best practices
const model = defineModel<number>({ default: 0 })

const emit = defineEmits<{
    input: [event: Event]
    change: [event: Event]
}>()

const rangeId = generateId()

const rangeClasses = computed(() => {
    const baseClasses = ['range', 'w-full']

    // Size classes
    if (props.size === 'xs') {
        baseClasses.push('range-xs')
    } else if (props.size === 'sm') {
        baseClasses.push('range-sm')
    } else if (props.size === 'lg') {
        baseClasses.push('range-lg')
    }
    // 'md' is default

    // Variant classes
    if (props.variant === 'primary') {
        baseClasses.push('range-primary')
    } else if (props.variant === 'secondary') {
        baseClasses.push('range-secondary')
    } else if (props.variant === 'accent') {
        baseClasses.push('range-accent')
    } else if (props.variant === 'success') {
        baseClasses.push('range-success')
    } else if (props.variant === 'warning') {
        baseClasses.push('range-warning')
    } else if (props.variant === 'info') {
        baseClasses.push('range-info')
    } else if (props.variant === 'error') {
        baseClasses.push('range-error')
    }

    return baseClasses.join(' ')
})

const displayValue = computed(() => {
    return model.value?.toString() || '0'
})

const ticks = computed(() => {
    if (!props.showTicks) return []

    const tickArray = []
    const range = props.max - props.min
    const stepSize = range / (props.tickCount - 1)

    for (let i = 0; i < props.tickCount; i++) {
        const value = props.min + stepSize * i
        tickArray.push(Math.round(value))
    }

    return tickArray
})

const ariaDescribedby = computed(() => {
    const ids = []
    if (props.helpText) ids.push(`${rangeId}-help`)
    if (props.errorMessage) ids.push(`${rangeId}-error`)
    if (props.ariaDescribedby) ids.push(props.ariaDescribedby)
    return ids.length > 0 ? ids.join(' ') : undefined
})

const handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement
    const value = Number(target.value)
    model.value = value
    emit('input', event)
}

const handleChange = (event: Event) => {
    emit('change', event)
}
</script>

<style scoped lang="postcss">
/* DaisyUI handles most range styling */
</style>

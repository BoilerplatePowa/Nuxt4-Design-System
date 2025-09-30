<template>
<div class="countdown-container">
    <div
        v-if="showLabels"
        class="countdown-labels"
    >
        <span
            v-if="showDays"
            class="countdown-label"
        >days</span>
        <span
            v-if="showHours"
            class="countdown-label"
        >hours</span>
        <span
            v-if="showMinutes"
            class="countdown-label"
        >minutes</span>
        <span
            v-if="showSeconds"
            class="countdown-label"
        >seconds</span>
    </div>

    <div :class="countdownClasses">
        <span
            v-if="showDays"
            :style="{ '--value': timeLeft.days }"
            class="countdown-item"
        />
        <span
            v-if="showHours"
            :style="{ '--value': timeLeft.hours }"
            class="countdown-item"
        />
        <span
            v-if="showMinutes"
            :style="{ '--value': timeLeft.minutes }"
            class="countdown-item"
        />
        <span
            v-if="showSeconds"
            :style="{ '--value': timeLeft.seconds }"
            class="countdown-item"
        />
    </div>

    <div
        v-if="message"
        class="countdown-message mt-4 text-center"
    >
        <slot name="message">
            {{ message }}
        </slot>
    </div>
</div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

interface Props {
    targetDate: Date | string
    message?: string
    showDays?: boolean
    showHours?: boolean
    showMinutes?: boolean
    showSeconds?: boolean
    showLabels?: boolean
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    autoStart?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    showDays: true,
    showHours: true,
    showMinutes: true,
    showSeconds: true,
    showLabels: false,
    size: 'md',
    autoStart: true,
})

const emit = defineEmits<{
    complete: []
    tick: [
        timeLeft: {
            days: number
            hours: number
            minutes: number
            seconds: number
            total: number
        },
    ]
}>()

const timeLeft = ref({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    total: 0,
})

let intervalId: NodeJS.Timeout | null = null

const countdownClasses = computed(() => {
    const baseClasses = ['countdown']

    // Size classes
    if (props.size === 'xs') {
        baseClasses.push('text-xs')
    }
    else if (props.size === 'sm') {
        baseClasses.push('text-sm')
    }
    else if (props.size === 'md') {
        baseClasses.push('text-base')
    }
    else if (props.size === 'lg') {
        baseClasses.push('text-lg')
    }
    else if (props.size === 'xl') {
        baseClasses.push('text-xl')
    }

    // Font styling
    baseClasses.push('font-mono')

    return baseClasses.join(' ')
})

const calculateTimeLeft = () => {
    const target = new Date(props.targetDate)
    const now = new Date()
    const difference = target.getTime() - now.getTime()

    if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
        const minutes = Math.floor((difference / 1000 / 60) % 60)
        const seconds = Math.floor((difference / 1000) % 60)

        timeLeft.value = {
            days,
            hours,
            minutes,
            seconds,
            total: difference,
        }

        emit('tick', { ...timeLeft.value })
    }
    else {
        timeLeft.value = {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            total: 0,
        }

        stop()
        emit('complete')
    }
}

const start = () => {
    if (intervalId) return

    calculateTimeLeft()
    intervalId = setInterval(calculateTimeLeft, 1000)
}

const stop = () => {
    if (intervalId) {
        clearInterval(intervalId)
        intervalId = null
    }
}

const reset = () => {
    stop()
    timeLeft.value = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        total: 0,
    }
}

// Expose methods
defineExpose({
    start,
    stop,
    reset,
})

onMounted(() => {
    if (props.autoStart) {
        start()
    }
})

onUnmounted(() => {
    stop()
})
</script>

<style scoped lang="postcss">
/* DaisyUI handles most countdown styling */
.countdown-container {
  @apply text-center;
}

.countdown-labels {
  @apply flex justify-center gap-8 mb-2;
}

.countdown-label {
  @apply text-xs uppercase tracking-wide opacity-70;
}

.countdown {
  @apply flex justify-center gap-4;
}

.countdown-item {
  @apply countdown;
}

.countdown-message {
  @apply text-base-content/70;
}
</style>

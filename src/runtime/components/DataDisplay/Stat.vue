<template>
<div :class="statClasses">
    <div
        v-if="icon || $slots.icon"
        class="stat-figure"
        :class="figureClasses"
    >
        <slot name="icon">
            <div
                v-if="icon"
                class="text-2xl"
                v-html="icon"
            />
        </slot>
    </div>

    <div
        class="stat-title"
        :class="titleClasses"
    >
        <slot name="title">
            {{ title }}
        </slot>
    </div>

    <div
        class="stat-value"
        :class="valueClasses"
    >
        <slot name="value">
            {{ displayValue }}
        </slot>
    </div>

    <div
        v-if="description || $slots.description"
        class="stat-desc"
        :class="descClasses"
    >
        <slot name="description">
            {{ description }}
        </slot>
    </div>

    <div
        v-if="actions || $slots.actions"
        class="stat-actions"
    >
        <slot name="actions">
            <div
                v-if="actions"
                class="flex gap-2"
            >
                <component
                    :is="action.component || 'button'"
                    v-for="action in actions"
                    :key="action.label"
                    v-bind="action.props"
                    @click="action.onClick"
                >
                    {{ action.label }}
                </component>
            </div>
        </slot>
    </div>
</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface StatAction {
    label: string
    component?: string
    props?: Record<string, unknown>
    onClick?: () => void
}

interface Props {
    title?: string
    value?: string | number
    description?: string
    icon?: string
    trend?: 'up' | 'down' | 'neutral'
    variant?:
        | 'default'
        | 'primary'
        | 'secondary'
        | 'accent'
        | 'info'
        | 'success'
        | 'warning'
        | 'error'
    size?: 'sm' | 'md' | 'lg'
    actions?: StatAction[]
    prefix?: string
    suffix?: string
    formatNumber?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    trend: 'neutral',
    variant: 'default',
    size: 'md',
    formatNumber: false,
})

const statClasses = computed(() => {
    const baseClasses = ['stat']

    // Size classes
    if (props.size === 'sm') {
        baseClasses.push('stat-sm')
    }
    else if (props.size === 'lg') {
        baseClasses.push('stat-lg')
    }

    return baseClasses.join(' ')
})

const titleClasses = computed(() => {
    const classes = []

    if (props.variant === 'primary') {
        classes.push('text-primary')
    }
    else if (props.variant === 'secondary') {
        classes.push('text-secondary')
    }
    else if (props.variant === 'accent') {
        classes.push('text-accent')
    }

    return classes.join(' ')
})

const valueClasses = computed(() => {
    const classes = []

    if (props.variant === 'primary') {
        classes.push('text-primary')
    }
    else if (props.variant === 'secondary') {
        classes.push('text-secondary')
    }
    else if (props.variant === 'accent') {
        classes.push('text-accent')
    }
    else if (props.variant === 'info') {
        classes.push('text-info')
    }
    else if (props.variant === 'success') {
        classes.push('text-success')
    }
    else if (props.variant === 'warning') {
        classes.push('text-warning')
    }
    else if (props.variant === 'error') {
        classes.push('text-error')
    }

    return classes.join(' ')
})

const descClasses = computed(() => {
    const classes = []

    if (props.trend === 'up') {
        classes.push('text-success')
    }
    else if (props.trend === 'down') {
        classes.push('text-error')
    }

    return classes.join(' ')
})

const figureClasses = computed(() => {
    const classes = []

    if (props.variant === 'primary') {
        classes.push('text-primary')
    }
    else if (props.variant === 'secondary') {
        classes.push('text-secondary')
    }
    else if (props.variant === 'accent') {
        classes.push('text-accent')
    }

    return classes.join(' ')
})

const displayValue = computed(() => {
    let value = props.value

    if (props.formatNumber && typeof value === 'number') {
        value = value.toLocaleString()
    }

    return `${props.prefix || ''}${value}${props.suffix || ''}`
})
</script>

<style scoped lang="postcss">
/* DaisyUI handles most stat styling */
</style>

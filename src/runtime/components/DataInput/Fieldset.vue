<template>
    <fieldset :class="fieldsetClasses" :disabled="disabled">
        <!-- Legend -->
        <legend v-if="legend || $slots.legend" :class="legendClasses">
            <slot name="legend">
                {{ legend }}
            </slot>
        </legend>

        <!-- Content -->
        <div :class="contentClasses">
            <slot />
        </div>

        <!-- Description -->
        <div v-if="description || $slots.description" :class="descriptionClasses">
            <slot name="description">
                {{ description }}
            </slot>
        </div>

        <!-- Error message -->
        <div v-if="error || $slots.error" :class="errorClasses">
            <slot name="error">
                {{ error }}
            </slot>
        </div>
    </fieldset>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
    legend?: string
    description?: string
    error?: string
    disabled?: boolean
    variant?: 'default' | 'bordered' | 'outlined' | 'filled'
    size?: 'sm' | 'md' | 'lg'
    required?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    variant: 'default',
    size: 'md',
    disabled: false,
    required: false,
})

const fieldsetClasses = computed(() => {
    const baseClasses = ['fieldset']

    // Variant styling
    if (props.variant === 'bordered') {
        baseClasses.push('border-2', 'border-base-300', 'rounded-lg')
    } else if (props.variant === 'outlined') {
        baseClasses.push('border', 'border-base-300', 'rounded-md')
    } else if (props.variant === 'filled') {
        baseClasses.push('bg-base-200', 'border', 'border-base-300', 'rounded-md')
    }

    // Size-based padding
    if (props.size === 'sm') {
        baseClasses.push('p-3')
    } else if (props.size === 'lg') {
        baseClasses.push('p-6')
    } else {
        baseClasses.push('p-4')
    }

    // Error state
    if (props.error) {
        baseClasses.push('border-error')
    }

    // Disabled state
    if (props.disabled) {
        baseClasses.push('opacity-60', 'cursor-not-allowed')
    }

    return baseClasses.join(' ')
})

const legendClasses = computed(() => {
    const baseClasses = ['fieldset-legend', 'font-semibold', 'text-base-content']

    // Size
    if (props.size === 'sm') {
        baseClasses.push('text-sm', 'px-2')
    } else if (props.size === 'lg') {
        baseClasses.push('text-lg', 'px-3')
    } else {
        baseClasses.push('text-base', 'px-2')
    }

    // Required indicator
    if (props.required) {
        baseClasses.push('after:content-["*"]', 'after:text-error', 'after:ml-1')
    }

    // Error state
    if (props.error) {
        baseClasses.push('text-error')
    }

    return baseClasses.join(' ')
})

const contentClasses = computed(() => {
    const baseClasses = ['fieldset-content']

    // Size-based spacing
    if (props.size === 'sm') {
        baseClasses.push('space-y-2')
    } else if (props.size === 'lg') {
        baseClasses.push('space-y-4')
    } else {
        baseClasses.push('space-y-3')
    }

    return baseClasses.join(' ')
})

const descriptionClasses = computed(() => {
    const baseClasses = ['fieldset-description', 'opacity-70']

    // Size
    if (props.size === 'sm') {
        baseClasses.push('text-xs', 'mt-1')
    } else if (props.size === 'lg') {
        baseClasses.push('text-base', 'mt-3')
    } else {
        baseClasses.push('text-sm', 'mt-2')
    }

    return baseClasses.join(' ')
})

const errorClasses = computed(() => {
    const baseClasses = ['fieldset-error', 'text-error']

    // Size
    if (props.size === 'sm') {
        baseClasses.push('text-xs', 'mt-1')
    } else if (props.size === 'lg') {
        baseClasses.push('text-base', 'mt-3')
    } else {
        baseClasses.push('text-sm', 'mt-2')
    }

    return baseClasses.join(' ')
})
</script>

<style scoped lang="postcss">
.fieldset {
    @apply relative;
}

/* Legend positioning for bordered variants */
.fieldset.border-2 .fieldset-legend,
.fieldset.border .fieldset-legend {
    @apply bg-base-100 relative;
}

/* Disabled state for all child elements */
.fieldset:disabled * {
    @apply pointer-events-none;
}
</style>

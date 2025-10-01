<template>
    <div :class="tooltipClasses" :data-tip="tip">
        <slot />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
    tip: string
    position?: 'top' | 'bottom' | 'left' | 'right'
    variant?: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error'
    open?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    position: 'top',
})

const tooltipClasses = computed(() => {
    const baseClasses = ['tooltip']

    // Position classes
    if (props.position === 'bottom') {
        baseClasses.push('tooltip-bottom')
    } else if (props.position === 'left') {
        baseClasses.push('tooltip-left')
    } else if (props.position === 'right') {
        baseClasses.push('tooltip-right')
    }
    // 'top' is default

    // Variant classes
    if (props.variant === 'primary') {
        baseClasses.push('tooltip-primary')
    } else if (props.variant === 'secondary') {
        baseClasses.push('tooltip-secondary')
    } else if (props.variant === 'accent') {
        baseClasses.push('tooltip-accent')
    } else if (props.variant === 'info') {
        baseClasses.push('tooltip-info')
    } else if (props.variant === 'success') {
        baseClasses.push('tooltip-success')
    } else if (props.variant === 'warning') {
        baseClasses.push('tooltip-warning')
    } else if (props.variant === 'error') {
        baseClasses.push('tooltip-error')
    }

    // Force open
    if (props.open) {
        baseClasses.push('tooltip-open')
    }

    return baseClasses.join(' ')
})
</script>

<style scoped lang="postcss">
/* DaisyUI handles most tooltip styling */
</style>

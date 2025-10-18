<template>
    <div :class="dividerClasses">
        <slot>{{ text }}</slot>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
    text?: string
    orientation?: '' | 'horizontal' | 'vertical'
    variant?:
        | ''
        | 'neutral'
        | 'primary'
        | 'secondary'
        | 'accent'
        | 'success'
        | 'warning'
        | 'info'
        | 'error'
    position?: 'start' | 'center' | 'end'
}

const props = withDefaults(defineProps<Props>(), {
    orientation: '',
    variant: '',
    position: 'center',
})

const dividerClasses = computed(() => {
    const baseClasses = ['divider']

    // Orientation
    if (props.orientation === 'vertical') {
        baseClasses.push('divider-vertical')
    } else if (props.orientation === 'horizontal') {
        baseClasses.push('divider-horizontal')
    }

    // Variant classes
    if (props.variant === 'primary') {
        baseClasses.push('divider-primary')
    } else if (props.variant === 'secondary') {
        baseClasses.push('divider-secondary')
    } else if (props.variant === 'accent') {
        baseClasses.push('divider-accent')
    } else if (props.variant === 'success') {
        baseClasses.push('divider-success')
    } else if (props.variant === 'warning') {
        baseClasses.push('divider-warning')
    } else if (props.variant === 'info') {
        baseClasses.push('divider-info')
    } else if (props.variant === 'error') {
        baseClasses.push('divider-error')
    } else if (props.variant === 'neutral') {
        baseClasses.push('divider-neutral')
    }

    // Position classes for horizontal dividers
    if (props.orientation === 'horizontal') {
        if (props.position === 'start') {
            baseClasses.push('divider-start')
        } else if (props.position === 'end') {
            baseClasses.push('divider-end')
        }
        // 'center' is default
    }

    return baseClasses.join(' ')
})
</script>

<template>
    <div :class="maskClasses">
        <slot />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

/**
 * Mask component props following DaisyUI 5.0.54 specifications
 *
 * @example
 * ```vue
 * <Mask variant="circle" size="lg">
 *   <img src="avatar.jpg" alt="Profile" />
 * </Mask>
 * ```
 */
interface Props {
    /** DaisyUI mask shape variant */
    variant?:
        | 'squircle'
        | 'heart'
        | 'hexagon'
        | 'hexagon-2'
        | 'decagon'
        | 'pentagon'
        | 'diamond'
        | 'square'
        | 'circle'
        | 'star'
        | 'star-2'
        | 'triangle'
        | 'triangle-2'
        | 'triangle-3'
        | 'triangle-4'
    /** Mask size using Tailwind width/height classes */
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    /** Half mask modifier - crops only the first half */
    isHalf1?: boolean
    /** Half mask modifier - crops only the second half */
    isHalf2?: boolean
    /** Custom CSS classes */
    class?: string
}

const props = withDefaults(defineProps<Props>(), {
    variant: 'squircle',
    size: 'md',
    isHalf1: false,
    isHalf2: false,
})

// Computed classes following DaisyUI patterns
const maskClasses = computed(() => {
    const classes = ['mask']

    // Add variant class
    if (props.variant) {
        classes.push(`mask-${props.variant}`)
    }

    // Add half modifiers
    if (props.isHalf1) {
        classes.push('mask-half-1')
    }
    if (props.isHalf2) {
        classes.push('mask-half-2')
    }

    // Add size classes
    const sizeMap = {
        xs: 'w-12 h-12',
        sm: 'w-16 h-16',
        md: 'w-20 h-20',
        lg: 'w-24 h-24',
        xl: 'w-32 h-32',
    }

    if (props.size && sizeMap[props.size]) {
        classes.push(...sizeMap[props.size].split(' '))
    }

    // Add custom classes
    if (props.class) {
        classes.push(props.class)
    }

    return classes
})
</script>

<style scoped lang="postcss">
/* DaisyUI handles mask styling */
</style>

<template>
    <div :class="maskClasses">
        <slot />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
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
        | 'parallelogram'
        | 'parallelogram-2'
        | 'parallelogram-3'
        | 'parallelogram-4'
        | 'star'
        | 'star-2'
        | 'triangle'
        | 'triangle-2'
        | 'triangle-3'
        | 'triangle-4'
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const props = withDefaults(defineProps<Props>(), {
    variant: 'squircle',
    size: 'md',
})

const maskClasses = computed(() => {
    const baseClasses = ['mask']

    // Variant classes
    if (props.variant === 'squircle') {
        baseClasses.push('mask-squircle')
    } else if (props.variant === 'heart') {
        baseClasses.push('mask-heart')
    } else if (props.variant === 'hexagon') {
        baseClasses.push('mask-hexagon')
    } else if (props.variant === 'hexagon-2') {
        baseClasses.push('mask-hexagon-2')
    } else if (props.variant === 'decagon') {
        baseClasses.push('mask-decagon')
    } else if (props.variant === 'pentagon') {
        baseClasses.push('mask-pentagon')
    } else if (props.variant === 'diamond') {
        baseClasses.push('mask-diamond')
    } else if (props.variant === 'square') {
        baseClasses.push('mask-square')
    } else if (props.variant === 'circle') {
        baseClasses.push('mask-circle')
    } else if (props.variant === 'parallelogram') {
        baseClasses.push('mask-parallelogram')
    } else if (props.variant === 'parallelogram-2') {
        baseClasses.push('mask-parallelogram-2')
    } else if (props.variant === 'parallelogram-3') {
        baseClasses.push('mask-parallelogram-3')
    } else if (props.variant === 'parallelogram-4') {
        baseClasses.push('mask-parallelogram-4')
    } else if (props.variant === 'star') {
        baseClasses.push('mask-star')
    } else if (props.variant === 'star-2') {
        baseClasses.push('mask-star-2')
    } else if (props.variant === 'triangle') {
        baseClasses.push('mask-triangle')
    } else if (props.variant === 'triangle-2') {
        baseClasses.push('mask-triangle-2')
    } else if (props.variant === 'triangle-3') {
        baseClasses.push('mask-triangle-3')
    } else if (props.variant === 'triangle-4') {
        baseClasses.push('mask-triangle-4')
    }

    // Size classes
    if (props.size === 'xs') {
        baseClasses.push('w-12', 'h-12')
    } else if (props.size === 'sm') {
        baseClasses.push('w-16', 'h-16')
    } else if (props.size === 'md') {
        baseClasses.push('w-20', 'h-20')
    } else if (props.size === 'lg') {
        baseClasses.push('w-24', 'h-24')
    } else if (props.size === 'xl') {
        baseClasses.push('w-32', 'h-32')
    }

    return baseClasses.join(' ')
})
</script>

<style scoped lang="postcss">
/* DaisyUI handles most mask styling */
</style>

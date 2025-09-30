<template>
<div :class="joinClasses">
    <slot />
</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
    orientation?: 'horizontal' | 'vertical'
    variant?: 'default' | 'rounded'
}

const props = withDefaults(defineProps<Props>(), {
    orientation: 'horizontal',
    variant: 'default',
})

const joinClasses = computed(() => {
    const baseClasses = ['join']

    // Orientation
    if (props.orientation === 'vertical') {
        baseClasses.push('join-vertical')
    }
    // 'horizontal' is default, no additional class needed

    // Variant
    if (props.variant === 'rounded') {
        baseClasses.push('join-rounded')
    }

    return baseClasses.join(' ')
})
</script>

<style scoped lang="postcss">
/* DaisyUI handles join styling */
</style>

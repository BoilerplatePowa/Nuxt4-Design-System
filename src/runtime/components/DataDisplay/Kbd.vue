<template>
    <kbd :class="kbdClasses">
        <slot>{{ keyText }}</slot>
    </kbd>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
    keyText?: string
    size?: 'xs' | 'sm' | 'md' | 'lg'
    variant?: 'default' | 'primary' | 'secondary' | 'accent'
}

const props = withDefaults(defineProps<Props>(), {
    keyText: '',
    size: 'md',
    variant: 'default',
})

const kbdClasses = computed(() => {
    const baseClasses = ['kbd']

    // Size classes
    if (props.size === 'xs') {
        baseClasses.push('kbd-xs')
    } else if (props.size === 'sm') {
        baseClasses.push('kbd-sm')
    } else if (props.size === 'lg') {
        baseClasses.push('kbd-lg')
    }

    // Variant classes - use standard button variants that work with kbd
    if (props.variant === 'primary') {
        baseClasses.push('btn-primary')
    } else if (props.variant === 'secondary') {
        baseClasses.push('btn-secondary')
    } else if (props.variant === 'accent') {
        baseClasses.push('btn-accent')
    }

    return baseClasses.join(' ')
})
</script>

<style scoped lang="postcss">
/* DaisyUI handles most kbd styling */
</style>

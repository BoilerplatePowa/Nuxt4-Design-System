<template>
<div :class="mockupClasses">
    <div class="camera" />
    <div class="display">
        <div :class="contentClasses">
            <slot />
        </div>
    </div>
</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
    variant?: 'default' | 'border' | 'bg'
    color?: 'black' | 'white' | 'gold' | 'silver' | 'primary' | 'secondary' | 'accent'
    size?: 'sm' | 'md' | 'lg' | 'xl'
}

const props = withDefaults(defineProps<Props>(), {
    variant: 'default',
    color: 'black',
    size: 'md',
})

const mockupClasses = computed(() => {
    const baseClasses = ['mockup-phone']

    // Variant classes
    if (props.variant === 'border') {
        baseClasses.push('border')
    }
    else if (props.variant === 'bg') {
        baseClasses.push('bg-base-300')
    }

    // Color classes
    if (props.color === 'black') {
        baseClasses.push('phone-black')
    }
    else if (props.color === 'white') {
        baseClasses.push('phone-white')
    }
    else if (props.color === 'gold') {
        baseClasses.push('phone-gold')
    }
    else if (props.color === 'silver') {
        baseClasses.push('phone-silver')
    }
    else if (props.color === 'primary') {
        baseClasses.push('phone-primary')
    }
    else if (props.color === 'secondary') {
        baseClasses.push('phone-secondary')
    }
    else if (props.color === 'accent') {
        baseClasses.push('phone-accent')
    }

    // Size classes
    if (props.size === 'sm') {
        baseClasses.push('phone-sm')
    }
    else if (props.size === 'lg') {
        baseClasses.push('phone-lg')
    }
    else if (props.size === 'xl') {
        baseClasses.push('phone-xl')
    }

    return baseClasses.join(' ')
})

const contentClasses = computed(() => {
    const baseClasses = ['artboard', 'artboard-demo', 'phone-1']
    return baseClasses.join(' ')
})
</script>

<style scoped lang="postcss">
/* DaisyUI handles most mockup styling */
</style>

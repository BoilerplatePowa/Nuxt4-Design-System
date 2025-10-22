<template>
    <div :class="mockupClasses">
        <div v-if="showToolbar" class="mockup-browser-toolbar">
            <div class="input">
                {{ url }}
            </div>
        </div>

        <div :class="contentClasses">
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
    /** URL to display in the browser address bar */
    url?: string
    /** Browser mockup styling variant */
    variant?: 'default' | 'border' | 'background'
    /** Size of the browser mockup */
    size?: 'sm' | 'md' | 'lg' | 'xl'
    /** Custom CSS classes for the browser container */
    class?: string
    /** Custom CSS classes for the content area */
    contentClass?: string
    /** Whether to show the toolbar */
    showToolbar?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    url: 'https://daisyui.com',
    variant: 'default',
    size: 'md',
    showToolbar: true,
})

const mockupClasses = computed(() => {
    const baseClasses = ['mockup-browser']

    // Variant classes based on DaisyUI documentation
    if (props.variant === 'border') {
        baseClasses.push('border-base-300', 'border', 'w-full')
    } else if (props.variant === 'background') {
        baseClasses.push('border', 'border-base-300', 'w-full')
    } else {
        // Default variant
        baseClasses.push('w-full')
    }

    // Size classes
    switch (props.size) {
        case 'sm':
            baseClasses.push('max-w-sm')
            break
        case 'md':
            baseClasses.push('max-w-lg')
            break
        case 'lg':
            baseClasses.push('max-w-2xl')
            break
        case 'xl':
            baseClasses.push('max-w-4xl')
            break
    }

    // Add custom classes if provided
    if (props.class) {
        baseClasses.push(props.class)
    }

    return baseClasses.join(' ')
})

const contentClasses = computed(() => {
    const baseClasses = []

    // Add border-top for content area when using border variant
    if (props.variant === 'border') {
        baseClasses.push('border-t', 'border-base-300')
    }

    // Default content styling
    baseClasses.push('grid', 'place-content-center')

    // Height based on size
    switch (props.size) {
        case 'sm':
            baseClasses.push('h-48')
            break
        case 'md':
            baseClasses.push('h-80')
            break
        case 'lg':
            baseClasses.push('h-96')
            break
        case 'xl':
            baseClasses.push('h-[32rem]')
            break
    }

    // Add custom content classes if provided
    if (props.contentClass) {
        baseClasses.push(props.contentClass)
    }

    return baseClasses.join(' ')
})
</script>

<style scoped lang="postcss">
/* DaisyUI handles most mockup styling */
/* Additional customizations can be added here if needed */
</style>

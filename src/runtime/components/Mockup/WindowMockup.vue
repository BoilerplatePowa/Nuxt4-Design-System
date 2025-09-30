<template>
<div :class="mockupClasses">
    <div class="mockup-window-toolbar">
        <div class="flex space-x-1">
            <div class="w-3 h-3 bg-red-500 rounded-full" />
            <div class="w-3 h-3 bg-yellow-500 rounded-full" />
            <div class="w-3 h-3 bg-green-500 rounded-full" />
        </div>
        <div
            v-if="title"
            class="mockup-window-title"
        >
            {{ title }}
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
    title?: string
    variant?: 'default' | 'border' | 'bg'
    size?: 'sm' | 'md' | 'lg' | 'xl'
}

const props = withDefaults(defineProps<Props>(), {
    variant: 'default',
    size: 'md',
})

const mockupClasses = computed(() => {
    const baseClasses = ['mockup-window']

    // Variant classes
    if (props.variant === 'border') {
        baseClasses.push('border', 'bg-base-300')
    }
    else if (props.variant === 'bg') {
        baseClasses.push('bg-base-300')
    }

    // Size classes
    if (props.size === 'sm') {
        baseClasses.push('max-w-sm')
    }
    else if (props.size === 'md') {
        baseClasses.push('max-w-md')
    }
    else if (props.size === 'lg') {
        baseClasses.push('max-w-lg')
    }
    else if (props.size === 'xl') {
        baseClasses.push('max-w-xl')
    }

    return baseClasses.join(' ')
})

const contentClasses = computed(() => {
    const baseClasses = ['flex', 'justify-center', 'px-4', 'py-16', 'bg-base-200']
    return baseClasses.join(' ')
})
</script>

<style scoped lang="postcss">
/* DaisyUI handles most mockup styling */
.mockup-window-toolbar {
  @apply flex items-center justify-between px-4 py-2 bg-base-300 border-b border-base-content/10;
}

.mockup-window-title {
  @apply text-sm font-medium text-base-content/70;
}
</style>

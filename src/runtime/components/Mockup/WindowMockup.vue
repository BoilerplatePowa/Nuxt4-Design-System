<template>
    <div :class="mockupClasses">
        <slot />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
    /** Add border styling to the window mockup */
    isBordered?: boolean
    /** Add background color to the window mockup */
    hasBackground?: boolean
    /** Custom CSS classes */
    class?: string
}

const props = withDefaults(defineProps<Props>(), {
    isBordered: false,
    hasBackground: false
})

const mockupClasses = computed(() => {
    const baseClasses = ['mockup-window']
    
    // Add border if specified
    if (props.isBordered) {
        baseClasses.push('border', 'border-base-300')
    }
    
    // Add background if specified
    if (props.hasBackground) {
        baseClasses.push('bg-base-100', 'border', 'border-base-300')
    }
    
    // Add custom classes
    if (props.class) {
        baseClasses.push(props.class)
    }
    
    return baseClasses
})
</script>

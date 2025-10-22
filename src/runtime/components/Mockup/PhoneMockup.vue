<template>
    <div :class="mockupClasses">
        <div class="mockup-phone-camera"></div>
        <div class="mockup-phone-display" :class="displayClasses">
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
    /** Border color for the phone frame */
    borderColor?: string
    /** Custom CSS classes for the display area */
    displayClass?: string
    /** Background color for the display */
    backgroundColor?: string
    /** Text color for the display */
    textColor?: string
}

const props = withDefaults(defineProps<Props>(), {
    borderColor: undefined,
    displayClass: undefined,
    backgroundColor: undefined,
    textColor: undefined,
})

const mockupClasses = computed(() => {
    const classes = ['mockup-phone']

    // Add border color if specified
    if (props.borderColor) {
        classes.push(`border-[${props.borderColor}]`)
    }

    return classes
})

const displayClasses = computed(() => {
    const classes = []

    // Add custom display class if provided
    if (props.displayClass) {
        classes.push(props.displayClass)
    }

    // Add background color if specified
    if (props.backgroundColor) {
        classes.push(`bg-${props.backgroundColor}`)
    }

    // Add text color if specified
    if (props.textColor) {
        classes.push(`text-${props.textColor}`)
    }

    return classes
})
</script>

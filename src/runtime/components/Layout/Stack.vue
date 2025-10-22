<template>
    <div :class="stackClasses">
        <slot />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
    /** DaisyUI stack modifier for alignment */
    modifier?: 'stack-top' | 'stack-bottom' | 'stack-start' | 'stack-end'
    /** Custom CSS classes */
    class?: string
}

const props = withDefaults(defineProps<Props>(), {
    modifier: 'stack-bottom'
})

const stackClasses = computed(() => [
    'stack', // DaisyUI base class
    props.modifier,
    props.class
])
</script>

<style scoped lang="postcss">
/* DaisyUI Stack component - visually puts elements on top of each other */
</style>

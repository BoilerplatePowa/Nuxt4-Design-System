<template>
<component
    :is="tag"
    :class="badgeClasses"
>
    <slot />
</component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Size, Variant } from '../../shared/types.d'

interface Props {
    variant?: Variant
    size?: Size
    outline?: boolean
    tag?: 'span' | 'div' | 'p' | 'label'
}

const props = withDefaults(defineProps<Props>(), {
    variant: 'neutral',
    size: 'md',
    outline: false,
    tag: 'span',
})

const badgeClasses = computed(() => {
    const baseClasses = ['badge']

    // Variant classes
    if (props.variant) {
        baseClasses.push(`badge-${props.variant}`)
    }

    // Size classes
    if (props.size) {
        baseClasses.push(`badge-${props.size}`)
    }

    // Outline
    if (props.outline) {
        baseClasses.push('badge-outline')
    }

    return baseClasses.join(' ')
})
</script>

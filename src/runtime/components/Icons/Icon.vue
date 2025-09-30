<template>
<component
    :is="iconComponent"
    :class="iconClasses"
    :size="computedSize"
    :stroke-width="strokeWidth"
    :aria-label="ariaLabel"
    :aria-hidden="ariaHidden"
/>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { iconMap, sizeMap } from '../../shared/map'
import type { IconName, Size, ThemeColor } from '../../shared/types.d'
import { HelpCircle } from 'lucide-vue-next'

interface Props {
    name: IconName
    size?: Size | number
    strokeWidth?: number
    color?: ThemeColor | string
    class?: string
    ariaLabel?: string
    ariaHidden?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    size: 24,
    strokeWidth: 2,
    fill: 'none',
    ariaHidden: true,
})

const iconComponent = computed(() => {
    return iconMap[props.name] || HelpCircle
})

const computedSize = computed(() => {
    if (typeof props.size === 'number') {
        return props.size
    }

    return sizeMap[props.size as keyof typeof sizeMap] || 24
})

const iconClasses = computed(() => {
    const classes = ['inline-block']

    if (props.color) {
        classes.push(`text-${props.color}`)
    }

    if (props.class) {
        classes.push(props.class)
    }

    return classes.join(' ')
})
</script>

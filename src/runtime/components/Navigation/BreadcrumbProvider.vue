<template>
    <div v-if="breadcrumbs.length > 0" :class="containerClasses">
        <Breadcrumbs
            :items="breadcrumbs"
            :size="size"
            :max-items="maxItems"
            :show-home-icon="showHomeIcon"
            :separator="separator"
            @item-click="handleItemClick"
        />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useBreadcrumbs } from '../../composables/useBreadcrumbs'
import type { BreadcrumbItem } from '../../shared/types.d'
import type { Size } from '../../shared/types'
import Breadcrumbs from './Breadcrumbs.vue'

interface Props {
    /** DaisyUI breadcrumbs size */
    size?: Size
    /** Maximum number of breadcrumbs to show */
    maxItems?: number
    /** Show home icon */
    showHomeIcon?: boolean
    /** Custom separator */
    separator?: string
    /** Container CSS classes */
    class?: string
    /** Position of breadcrumbs */
    position?: 'top' | 'bottom' | 'inline'
}

const props = withDefaults(defineProps<Props>(), {
    size: 'md',
    maxItems: 5,
    showHomeIcon: false,
    position: 'top',
})

const emit = defineEmits<{
    'item-click': [item: BreadcrumbItem, index: number, event: Event]
}>()

const { breadcrumbs } = useBreadcrumbs()

const containerClasses = computed(() => {
    const classes = ['breadcrumb-provider']

    if (props.position === 'top') {
        classes.push('mb-4')
    } else if (props.position === 'bottom') {
        classes.push('mt-4')
    }

    if (props.class) {
        classes.push(props.class)
    }

    return classes.join(' ')
})

const handleItemClick = (item: BreadcrumbItem, index: number, event: Event) => {
    emit('item-click', item, index, event)
}
</script>

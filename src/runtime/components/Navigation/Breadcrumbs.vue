<template>
<div :class="breadcrumbsClasses">
    <ul>
        <slot>
            <li
                v-for="(item, index) in items"
                :key="getItemKey(item, index)"
            >
                <a
                    v-if="item.href && !isLastItem(index)"
                    :href="item.href"
                    :class="getItemClasses(item, index)"
                    @click="handleItemClick(item, index, $event)"
                >
                    <span
                        v-if="item.icon"
                        class="mr-2"
                        v-html="item.icon"
                    />
                    {{ item.label }}
                </a>
                <span
                    v-else
                    :class="getItemClasses(item, index)"
                >
                    <span
                        v-if="item.icon"
                        class="mr-2"
                        v-html="item.icon"
                    />
                    {{ item.label }}
                </span>
            </li>
        </slot>
    </ul>
</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface BreadcrumbItem {
    label: string
    href?: string
    icon?: string
    value?: string | number
    disabled?: boolean
}

interface Props {
    items?: BreadcrumbItem[]
    size?: 'xs' | 'sm' | 'md' | 'lg'
    maxItems?: number
    showHomeIcon?: boolean
    separator?: string
}

const props = withDefaults(defineProps<Props>(), {
    items: () => [],
    size: 'md',
    showHomeIcon: false,
})

const emit = defineEmits<{
    'item-click': [item: BreadcrumbItem, index: number, event: Event]
}>()

const breadcrumbsClasses = computed(() => {
    const baseClasses = ['breadcrumbs']

    // Size classes
    if (props.size === 'xs') {
        baseClasses.push('text-xs')
    }
    else if (props.size === 'sm') {
        baseClasses.push('text-sm')
    }
    else if (props.size === 'lg') {
        baseClasses.push('text-lg')
    }

    return baseClasses.join(' ')
})

const visibleItems = computed(() => {
    if (!props.maxItems || props.items.length <= props.maxItems) {
        return props.items
    }

    const firstItem = props.items[0]
    const lastItems = props.items.slice(-(props.maxItems - 2))
    const ellipsis = { label: '...', disabled: true }

    return [firstItem, ellipsis, ...lastItems]
})

const getItemKey = (item: BreadcrumbItem, index: number): string => {
    return item.value?.toString() || item.label || index.toString()
}

const getItemClasses = (item: BreadcrumbItem, index: number): string => {
    const classes = []

    if (item.disabled) {
        classes.push('opacity-50', 'cursor-not-allowed')
    }
    else if (isLastItem(index)) {
        classes.push('font-medium', 'text-base-content')
    }
    else if (item.href) {
        classes.push('text-primary', 'hover:text-primary-focus', 'transition-colors')
    }

    return classes.join(' ')
}

const isLastItem = (index: number): boolean => {
    return index === visibleItems.value.length - 1
}

const handleItemClick = (item: BreadcrumbItem, index: number, event: Event) => {
    if (item.disabled) {
        event.preventDefault()
        return
    }

    emit('item-click', item, index, event)
}
</script>

<style scoped lang="postcss">
/* DaisyUI handles most breadcrumbs styling */
</style>

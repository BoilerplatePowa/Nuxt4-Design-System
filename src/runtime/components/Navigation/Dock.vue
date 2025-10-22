<template>
    <div :class="dockClasses">
        <button
            v-for="(item, index) in items"
            :key="getItemKey(item, index)"
            :class="getButtonClasses(item)"
            :disabled="item.disabled"
            @click="handleItemClick(item, index, $event)"
        >
            <!-- Icon -->
            <div v-if="item.icon" class="size-[1.2em]">
                <component :is="item.icon" class="w-full h-full" />
            </div>
            
            <!-- Avatar -->
            <img
                v-else-if="item.avatar"
                :src="item.avatar"
                :alt="item.label || ''"
                class="size-[1.2em] rounded-full object-cover"
            />
            
            <!-- SVG Icon (if provided as string) -->
            <div v-else-if="item.svg" class="size-[1.2em]" v-html="item.svg"></div>
            
            <!-- Label -->
            <span v-if="item.label" class="dock-label">{{ item.label }}</span>
        </button>
        
        <!-- Additional content slot -->
        <slot />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface DockItem {
    id?: string | number
    label?: string
    icon?: any
    avatar?: string
    svg?: string
    disabled?: boolean
    active?: boolean
    href?: string
    target?: string
    [key: string]: unknown
}

interface Props {
    /** Array of dock items */
    items: DockItem[]
    /** DaisyUI dock size */
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    /** Active item ID */
    activeItem?: string | number
    /** Custom CSS classes */
    class?: string
}

const props = withDefaults(defineProps<Props>(), {
    size: 'md',
})

const emit = defineEmits<{
    itemClick: [item: DockItem, index: number, event: Event]
}>()

const dockClasses = computed(() => [
    'dock',
    `dock-${props.size}`,
    props.class
])

const getButtonClasses = (item: DockItem) => [
    'dock-item',
    {
        'dock-active': isActive(item)
    }
]

const getItemKey = (item: DockItem, index: number) => {
    return item.id !== undefined ? item.id : index
}

const isActive = (item: DockItem) => {
    if (props.activeItem !== undefined) {
        return item.id === props.activeItem
    }
    return item.active === true
}

const handleItemClick = (item: DockItem, index: number, event: Event) => {
    if (item.disabled) return

    // Handle link items
    if (item.href && !event.defaultPrevented) {
        if (item.target === '_blank') {
            window.open(item.href, '_blank')
        } else {
            window.location.href = item.href
        }
    }

    emit('itemClick', item, index, event)
}
</script>

<style scoped lang="postcss">
/* DaisyUI dock styles are handled by the framework */
</style>

<template>
<div :class="dockClasses">
    <div :class="dockContainerClasses">
        <div
            v-for="(item, index) in items"
            :key="getItemKey(item, index)"
            :class="getItemClasses(item)"
            @click="handleItemClick(item, index, $event)"
            @mouseenter="handleItemHover(item, index)"
            @mouseleave="handleItemLeave(item, index)"
        >
            <slot
                name="item"
                :item="item"
                :index="index"
                :is-active="isActive(item)"
            >
                <!-- Icon -->
                <div
                    v-if="item.icon || item.avatar"
                    :class="iconClasses"
                >
                    <img
                        v-if="item.avatar"
                        :src="item.avatar"
                        :alt="item.label || ''"
                        class="w-full h-full object-cover rounded-full"
                    >
                    <component
                        :is="item.icon"
                        v-else-if="item.icon"
                        class="w-6 h-6"
                    />
                </div>

                <!-- Badge/Notification -->
                <div
                    v-if="item.badge"
                    :class="badgeClasses"
                >
                    {{ item.badge }}
                </div>
            </slot>

            <!-- Tooltip -->
            <div
                v-if="showTooltips && item.label"
                :class="tooltipClasses"
            >
                {{ item.label }}
            </div>
        </div>

        <!-- Divider -->
        <div
            v-if="$slots.divider"
            class="dock-divider"
        >
            <slot name="divider" />
        </div>

        <!-- Additional items slot -->
        <slot name="additional" />
    </div>
</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface DockItem {
    id?: string | number
    label?: string
    icon?: string
    avatar?: string
    badge?: string | number
    disabled?: boolean
    active?: boolean
    href?: string
    target?: string
    [key: string]: unknown
}

interface Props {
    items: DockItem[]
    position?: 'bottom' | 'top' | 'left' | 'right'
    size?: 'sm' | 'md' | 'lg'
    variant?: 'default' | 'floating' | 'glass'
    showTooltips?: boolean
    activeItem?: string | number
    animated?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    position: 'bottom',
    size: 'md',
    variant: 'default',
    showTooltips: true,
    animated: true,
})

const emit = defineEmits<{
    itemClick: [item: DockItem, index: number, event: Event]
    itemHover: [item: DockItem, index: number]
    itemLeave: [item: DockItem, index: number]
}>()

const dockClasses = computed(() => {
    const baseClasses = ['dock']

    // Position
    if (props.position === 'bottom') {
        baseClasses.push('fixed', 'bottom-4', 'left-1/2', 'transform', '-translate-x-1/2')
    }
    else if (props.position === 'top') {
        baseClasses.push('fixed', 'top-4', 'left-1/2', 'transform', '-translate-x-1/2')
    }
    else if (props.position === 'left') {
        baseClasses.push('fixed', 'left-4', 'top-1/2', 'transform', '-translate-y-1/2')
    }
    else if (props.position === 'right') {
        baseClasses.push('fixed', 'right-4', 'top-1/2', 'transform', '-translate-y-1/2')
    }

    // Z-index for floating
    baseClasses.push('z-50')

    return baseClasses.join(' ')
})

const dockContainerClasses = computed(() => {
    const baseClasses = ['dock-container', 'flex', 'items-center', 'gap-2']

    // Orientation based on position
    if (props.position === 'left' || props.position === 'right') {
        baseClasses.push('flex-col')
    }

    // Variant styling
    if (props.variant === 'floating') {
        baseClasses.push('bg-base-100', 'shadow-lg', 'rounded-2xl', 'p-3', 'border', 'border-base-300')
    }
    else if (props.variant === 'glass') {
        baseClasses.push(
            'bg-base-100/80',
            'backdrop-blur-md',
            'shadow-lg',
            'rounded-2xl',
            'p-3',
            'border',
            'border-base-300/50',
        )
    }
    else {
        baseClasses.push('bg-base-200', 'rounded-xl', 'p-2')
    }

    return baseClasses.join(' ')
})

const iconClasses = computed(() => {
    const baseClasses = ['relative', 'flex', 'items-center', 'justify-center']

    // Size
    if (props.size === 'sm') {
        baseClasses.push('w-8', 'h-8')
    }
    else if (props.size === 'lg') {
        baseClasses.push('w-16', 'h-16')
    }
    else {
        baseClasses.push('w-12', 'h-12')
    }

    return baseClasses.join(' ')
})

const badgeClasses = computed(() => {
    const baseClasses = ['absolute', '-top-1', '-right-1', 'badge', 'badge-sm', 'badge-primary']

    if (props.size === 'sm') {
        baseClasses.push('badge-xs')
    }

    return baseClasses.join(' ')
})

const tooltipClasses = computed(() => {
    const baseClasses = [
        'absolute',
        'z-10',
        'px-2',
        'py-1',
        'text-xs',
        'font-medium',
        'text-white',
        'bg-black',
        'rounded',
        'opacity-0',
        'pointer-events-none',
        'transition-opacity',
        'duration-200',
    ]

    // Position tooltip based on dock position
    if (props.position === 'bottom') {
        baseClasses.push('-top-8', 'left-1/2', 'transform', '-translate-x-1/2')
    }
    else if (props.position === 'top') {
        baseClasses.push('-bottom-8', 'left-1/2', 'transform', '-translate-x-1/2')
    }
    else if (props.position === 'left') {
        baseClasses.push('left-full', 'top-1/2', 'transform', '-translate-y-1/2', 'ml-2')
    }
    else if (props.position === 'right') {
        baseClasses.push('right-full', 'top-1/2', 'transform', '-translate-y-1/2', 'mr-2')
    }

    return baseClasses.join(' ')
})

const getItemKey = (item: DockItem, index: number) => {
    return item.id !== undefined ? item.id : index
}

const getItemClasses = (item: DockItem) => {
    const baseClasses = [
        'dock-item',
        'relative',
        'flex',
        'items-center',
        'justify-center',
        'cursor-pointer',
    ]

    // Size and padding
    if (props.size === 'sm') {
        baseClasses.push('p-2')
    }
    else if (props.size === 'lg') {
        baseClasses.push('p-4')
    }
    else {
        baseClasses.push('p-3')
    }

    // Interactive states
    if (!item.disabled) {
        baseClasses.push('hover:bg-base-300', 'active:scale-95')

        if (props.animated) {
            baseClasses.push('transition-all', 'duration-200')
        }
    }
    else {
        baseClasses.push('opacity-50', 'cursor-not-allowed')
    }

    // Active state
    if (isActive(item)) {
        baseClasses.push('bg-primary', 'text-primary-content', 'rounded-lg')
    }
    else {
        baseClasses.push('rounded-lg')
    }

    // Hover effects
    baseClasses.push('group')

    return baseClasses.join(' ')
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
        }
        else {
            window.location.href = item.href
        }
    }

    emit('itemClick', item, index, event)
}

const handleItemHover = (item: DockItem, index: number) => {
    if (item.disabled) return
    emit('itemHover', item, index)
}

const handleItemLeave = (item: DockItem, index: number) => {
    if (item.disabled) return
    emit('itemLeave', item, index)
}
</script>

<style scoped lang="postcss">
.dock {
  /* Ensure dock appears above other content */
}

.dock-item:hover .tooltip {
  @apply opacity-100;
}

.dock-divider {
  @apply w-px h-8 bg-base-300 mx-1;
}

/* Vertical divider for horizontal docks */
.dock-container:not(.flex-col) .dock-divider {
  @apply w-px h-8;
}

/* Horizontal divider for vertical docks */
.dock-container.flex-col .dock-divider {
  @apply w-8 h-px my-1 mx-0;
}

/* Tooltip visibility on hover */
.dock-item:hover .absolute.opacity-0 {
  @apply opacity-100;
}
</style>

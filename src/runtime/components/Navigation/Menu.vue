<template>
    <ul :class="menuClasses">
        <slot>
            <li v-for="item in items" :key="getItemKey(item)">
                <!-- Menu title -->
                <h2 v-if="item.title" class="menu-title">
                    {{ item.title }}
                </h2>

                <!-- Divider -->
                <hr v-else-if="item.divider" />

                <!-- Link item -->
                <a
                    v-else-if="item.href"
                    :href="item.href"
                    :class="getItemClasses(item)"
                    @click="handleItemClick(item, $event)"
                >
                    <span v-if="item.icon" v-html="item.icon" />
                    {{ item.label }}
                    <span v-if="item.badge" class="badge badge-sm">{{ item.badge }}</span>
                </a>

                <!-- Button item -->
                <button
                    v-else
                    type="button"
                    :class="getItemClasses(item)"
                    :disabled="item.disabled"
                    @click="handleItemClick(item, $event)"
                >
                    <span v-if="item.icon" v-html="item.icon" />
                    {{ item.label }}
                    <span v-if="item.badge" class="badge badge-sm">{{ item.badge }}</span>
                </button>

                <!-- Submenu -->
                <ul v-if="item.children && item.children.length > 0" class="menu">
                    <li v-for="child in item.children" :key="getItemKey(child)">
                        <a
                            v-if="child.href"
                            :href="child.href"
                            :class="getItemClasses(child)"
                            @click="handleItemClick(child, $event)"
                        >
                            <span v-if="child.icon" v-html="child.icon" />
                            {{ child.label }}
                            <span v-if="child.badge" class="badge badge-sm">{{ child.badge }}</span>
                        </a>
                        <button
                            v-else
                            type="button"
                            :class="getItemClasses(child)"
                            :disabled="child.disabled"
                            @click="handleItemClick(child, $event)"
                        >
                            <span v-if="child.icon" v-html="child.icon" />
                            {{ child.label }}
                            <span v-if="child.badge" class="badge badge-sm">{{ child.badge }}</span>
                        </button>
                    </li>
                </ul>
            </li>
        </slot>
    </ul>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface MenuItem {
    label?: string
    value?: string | number
    href?: string
    icon?: string
    badge?: string | number
    disabled?: boolean
    active?: boolean
    title?: string // For menu section titles
    divider?: boolean // For dividers
    children?: MenuItem[] // For submenus
}

interface Props {
    items?: MenuItem[]
    size?: 'xs' | 'sm' | 'md' | 'lg'
    variant?: 'default' | 'compact' | 'horizontal'
    rounded?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    items: () => [],
    size: 'md',
    variant: 'default',
    rounded: false,
})

const emit = defineEmits<{
    'item-click': [item: MenuItem, event: Event]
}>()

const menuClasses = computed(() => {
    const baseClasses = ['menu']

    // Size classes
    if (props.size === 'xs') {
        baseClasses.push('menu-xs')
    } else if (props.size === 'sm') {
        baseClasses.push('menu-sm')
    } else if (props.size === 'lg') {
        baseClasses.push('menu-lg')
    }

    // Variant classes
    if (props.variant === 'compact') {
        baseClasses.push('menu-compact')
    } else if (props.variant === 'horizontal') {
        baseClasses.push('menu-horizontal')
    }

    // Background and styling
    baseClasses.push('bg-base-200', 'w-56', 'p-2')

    if (props.rounded) {
        baseClasses.push('rounded-box')
    }

    return baseClasses.join(' ')
})

const getItemKey = (item: MenuItem): string => {
    if (item.value !== undefined) return String(item.value)
    if (item.label) return item.label
    if (item.title) return item.title
    // Fallback to stable string from content to avoid randomness
    return JSON.stringify(item)
}

const getItemClasses = (item: MenuItem): string => {
    const classes = []

    if (item.active) {
        classes.push('active')
    }

    if (item.disabled) {
        classes.push('disabled')
    }

    return classes.join(' ')
}

const handleItemClick = (item: MenuItem, event: Event) => {
    if (item.disabled) {
        event.preventDefault()
        return
    }

    emit('item-click', item, event)
}
</script>

<style scoped lang="postcss">
/* DaisyUI handles most menu styling */
</style>

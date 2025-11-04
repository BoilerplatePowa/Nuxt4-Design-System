<template>
    <ul :class="menuClasses">
        <slot>
            <li v-for="item in items" :key="getItemKey(item)">
                <!-- Menu title -->
                <h2 v-if="item.title && !compact" class="menu-title">
                    {{ item.title }}
                </h2>
                <div v-else-if="item.title && compact" class="divider menu-title" />

                <!-- Link item -->
                <button
                    v-else-if="item.href"
                    type="button"
                    :class="getItemClasses(item)"
                    :data-tip="item.label"
                    @click="handleItemClick(item, $event)"
                >
                    <div v-if="compact && item.icon">
                        <component :is="item.icon" />
                        <Badge
                            v-if="item.badge"
                            :value="item.badge"
                            size="xs"
                            variant="primary"
                            class="absolute -right-2 top-0"
                            >{{ item.badge }}</Badge
                        >
                    </div>

                    <div v-else class="flex items-center gap-2 w-full">
                        <component :is="item.icon" v-if="item.icon" class="" />
                        <span class="">{{ item.label }}</span>
                        <span v-if="item.badge" class="badge badge-sm">{{ item.badge }}</span>
                    </div>
                </button>

                <!-- Button item -->
                <button
                    v-else
                    type="button"
                    :class="getItemClasses(item)"
                    :disabled="item.disabled"
                    @click="handleItemClick(item, $event)"
                >
                    <component :is="item.icon" v-if="compact && item.icon" />

                    <div v-else class="flex items-center gap-2">
                        <component :is="item.icon" v-if="item.icon" />
                        <span>{{ item.label }}</span>
                        <span v-if="item.badge" class="badge badge-sm">{{ item.badge }}</span>
                    </div>
                </button>

                <!-- Submenu -->
                <ul v-if="item.children && item.children.length > 0" class="menu w-full">
                    <li v-for="child in item.children" :key="getItemKey(child)">
                        <button
                            v-if="child.href"
                            type="button"
                            :class="getItemClasses(child)"
                            :data-tip="child.label"
                            @click="handleItemClick(child, $event)"
                        >
                            <component :is="child.icon" v-if="compact && child.icon" />

                            <div v-else class="flex items-center gap-2">
                                <component :is="child.icon" v-if="child.icon" />
                                <span>{{ child.label }}</span>
                                <span v-if="child.badge" class="badge badge-sm">{{
                                    child.badge
                                }}</span>
                            </div>
                        </button>
                        <button
                            v-else
                            type="button"
                            :class="getItemClasses(child)"
                            :disabled="child.disabled"
                            :data-tip="child.label"
                            @click="handleItemClick(child, $event)"
                        >
                            <component :is="child.icon" v-if="compact && child.icon" />

                            <div v-else class="flex items-center gap-2">
                                <component :is="child.icon" v-if="child.icon" />
                                <span>{{ child.label }}</span>
                                <span v-if="child.badge" class="badge badge-sm">{{
                                    child.badge
                                }}</span>
                            </div>
                        </button>
                    </li>
                </ul>
            </li>
        </slot>
    </ul>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { MenuItem, Size } from '../../shared/types.d'
import Badge from '../DataDisplay/Badge.vue'

// navigateTo is auto-imported in Nuxt apps
declare const navigateTo: ((to: string) => Promise<void>) | undefined

interface Props {
    items?: MenuItem[]
    compact?: boolean
    size?: Size
    variant?: 'default' | 'compact' | 'horizontal'
    rounded?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    items: () => [],
    compact: false,
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

    baseClasses.push('h-full')

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
    const classes = ['w-full']

    if (item.active) {
        classes.push('active')
    }

    if (item.disabled) {
        classes.push('disabled')
    }

    if (props.compact) {
        classes.push('tooltip tooltip-right p-2')
    }

    return classes.join(' ')
}

const handleItemClick = async (item: MenuItem, event: Event) => {
    if (item.disabled) {
        event.preventDefault()
        return
    }

    // Navigate if href is provided
    if (item.href) {
        event.preventDefault()
        // navigateTo is auto-imported in Nuxt apps
        if (typeof navigateTo === 'function') {
            await navigateTo(item.href)
        } else {
            // Fallback for non-Nuxt contexts
            window.location.href = item.href
        }
    }

    emit('item-click', item, event)
}
</script>

<template>
<div class="relative">
    <!-- Presence indicator -->
    <Status
        v-if="showPresence && presence !== undefined"
        :variant="presenceStatusVariant"
        :size="['xs', 'sm', 'md', 'lg'].includes(size) ? 'lg' : 'xl'"
        class="absolute top-0 right-0 z-10"
    />

    <Badge
        v-if="badge || count"
        :size="['xs', 'sm', 'md'].includes(size) ? 'xs' : 'md'"
        :variant="badgeVariant"
        class="absolute top-0 -right-2 z-20"
    >
        <span
            v-if="badge"
            class="text-xs font-bold"
        >{{ badge }}</span>
        <span
            v-else-if="count"
            class="text-xs font-bold"
        >
            {{ count > 99 ? '99+' : count }}
        </span>
    </Badge>

    <div :class="avatarClasses">
        <!-- Loading state -->
        <div
            v-if="loading"
            :class="loadingClasses"
        >
            <span class="loading loading-spinner loading-xs align-top" />
        </div>

        <!-- Avatar image with lazy loading support -->
        <img
            v-if="src && !imageError && !loading"
            :src="src"
            :alt="alt || `Avatar for ${name || 'user'}`"
            :loading="lazy ? 'lazy' : 'eager'"
            :class="imageElementClasses"
            @error="handleImageError"
            @load="handleImageLoad"
        >

        <!-- Fallback placeholder -->
        <div
            v-else-if="!loading"
            :class="placeholderClasses"
            :aria-label="alt || `Avatar for ${name || 'user'}`"
        >
            <div class="w-full h-full flex items-center justify-center">
                <slot>
                    <span
                        v-if="initials"
                        class="font-semibold"
                    >{{ initials }}</span>
                    <span
                        v-else-if="name"
                        class="font-semibold"
                    >{{ generateInitials(name) }}</span>
                    <span
                        v-else-if="placeholder"
                        class="opacity-60"
                    >{{ placeholder }}</span>
                    <Icon
                        v-else
                        :name="fallbackIcon"
                        :size="size"
                    />
                </slot>
            </div>
        </div>
    </div>
</div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import Badge from './Badge.vue'
import type { Variant, IconName } from '~/shared/types.d'
import Status from '../DataDisplay/Status.vue'
import Icon from '../Icons/Icon.vue'

interface Props {
    src?: string
    alt?: string
    name?: string
    placeholder?: string
    initials?: string
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
    shape?: 'circle' | 'square' | 'rounded'
    presence?: 'online' | 'offline' | 'away' | 'busy'
    showPresence?: boolean
    ring?: boolean
    ringColor?: Variant
    badge?: string
    badgeVariant?: Variant
    count?: number
    loading?: boolean
    lazy?: boolean
    fallbackColor?: 'primary' | 'secondary' | 'accent' | 'neutral' | 'random'
    fallbackIcon?: IconName
}

const props = withDefaults(defineProps<Props>(), {
    size: 'md',
    shape: 'circle',
    showPresence: true,
    ring: false,
    ringColor: 'primary',
    badgeVariant: 'primary',
    loading: false,
    lazy: true,
    fallbackColor: 'neutral',
    fallbackIcon: 'user',
})

const emit = defineEmits<{
    imageLoad: []
    imageError: []
}>()

const imageError = ref(false)
const imageLoaded = ref(false)

const handleImageError = () => {
    imageError.value = true
    emit('imageError')
}

const handleImageLoad = () => {
    imageLoaded.value = true
    emit('imageLoad')
}

// Utility function to generate initials from name
const generateInitials = (name: string): string => {
    return name
        .split(' ')
        .slice(0, 2)
        .map(part => part.charAt(0).toUpperCase())
        .join('')
}

// Utility function to generate consistent color from string
const getColorFromString = (str: string): string => {
    const colors = ['primary', 'secondary', 'accent', 'info', 'success', 'warning']
    let hash = 0
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash)
    }
    return colors[Math.abs(hash) % colors.length]
}

const avatarClasses = computed(() => {
    const baseClasses = [
        'avatar',
        'relative',
        'overflow-hidden',
        'flex',
        'items-center',
        'justify-center',
        'bg-base-200',
    ]

    // Size classes
    if (props.size === 'xs') {
        baseClasses.push('w-6', 'h-6')
    }
    else if (props.size === 'sm') {
        baseClasses.push('w-8', 'h-8')
    }
    else if (props.size === 'md') {
        baseClasses.push('w-12', 'h-12')
    }
    else if (props.size === 'lg') {
        baseClasses.push('w-16', 'h-16')
    }
    else if (props.size === 'xl') {
        baseClasses.push('w-20', 'h-20')
    }
    else if (props.size === '2xl') {
        baseClasses.push('w-24', 'h-24')
    }

    // Shape
    if (props.shape === 'square') {
        baseClasses.push('rounded-lg')
    }
    else if (props.shape === 'rounded') {
        baseClasses.push('rounded-xl')
    }
    else {
        baseClasses.push('rounded-full')
    }

    // Ring
    if (props.ring) {
        baseClasses.push('ring-4', 'ring-offset-2', 'ring-offset-base-100')
        baseClasses.push(`ring-${props.ringColor}`)
    }

    return baseClasses.join(' ')
})

const loadingClasses = computed(() => ['animate-pulse'])

const imageElementClasses = computed(() => [
    'w-full',
    'h-full',
    'object-cover',
    'transition-opacity',
    'duration-300',
])

const placeholderClasses = computed(() => {
    const baseClasses = ['h-full', 'w-full', 'text-white', 'font-semibold']

    // Background color
    if (props.fallbackColor === 'random' && props.name) {
        const colorClass = getColorFromString(props.name)
        baseClasses.push(`bg-${colorClass}`)
    }
    else {
        baseClasses.push(`bg-${props.fallbackColor}`)
    }

    // Text size based on avatar size
    if (props.size) {
        baseClasses.push('text-xs')
    }

    return baseClasses.join(' ')
})

const presenceStatusVariant = computed(() => {
    if (props.presence === 'online') {
        return 'success'
    }
    else if (props.presence === 'offline') {
        return 'neutral'
    }
    else if (props.presence === 'away') {
        return 'warning'
    }
    else if (props.presence === 'busy') {
        return 'error'
    }

    return 'neutral'
})
</script>

<template>
    <div v-if="visible" :class="statusClasses">
        <!-- Content -->
        <div class="flex-1 min-w-0">
            <!-- Title -->
            <div v-if="title || $slots.title" :class="titleClasses">
                <!-- Icon/indicator -->
                <div v-if="showIndicator" :class="indicatorClasses">
                    <slot name="indicator">
                        <!-- Default indicators using Status component -->
                        <Status
                            v-if="variant === 'success'"
                            variant="success"
                            size="md"
                            aria-label="Success status"
                        />
                        <Status
                            v-else-if="variant === 'error'"
                            variant="error"
                            size="md"
                            aria-label="Error status"
                        />
                        <Status
                            v-else-if="variant === 'warning'"
                            variant="warning"
                            size="md"
                            aria-label="Warning status"
                        />
                        <Status
                            v-else-if="variant === 'info'"
                            variant="info"
                            size="md"
                            aria-label="Info status"
                        />
                        <Status
                            v-else-if="variant === 'pending'"
                            variant="neutral"
                            size="md"
                            animation="pulse"
                            aria-label="Pending status"
                        />
                        <Status v-else variant="neutral" size="md" aria-label="Neutral status" />
                    </slot>
                </div>

                <slot name="title">
                    {{ title }}
                </slot>
            </div>

            <!-- Message/Description -->
            <div v-if="message || $slots.default" :class="messageClasses">
                <slot>{{ message }}</slot>
            </div>

            <!-- Timestamp -->
            <div v-if="timestamp" :class="timestampClasses">
                {{ formatTimestamp(timestamp) }}
            </div>
        </div>

        <!-- Actions and Dismiss -->
        <div
            v-if="actions.length > 0 || $slots.actions || dismissible"
            class="flex items-center gap-2 flex-shrink-0"
        >
            <!-- Actions -->
            <div v-if="actions.length > 0 || $slots.actions" class="flex gap-2">
                <slot name="actions">
                    <button
                        v-for="action in actions"
                        :key="action.label"
                        :class="getActionClasses(action)"
                        :disabled="action.disabled"
                        @click="handleActionClick(action, $event)"
                    >
                        {{ action.label }}
                    </button>
                </slot>
            </div>

            <!-- Dismiss button -->
            <button
                v-if="dismissible"
                class="btn btn-ghost btn-sm btn-circle"
                aria-label="Dismiss"
                @click="handleDismiss"
            >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Status from './Status.vue'

interface StatusAction {
    label: string
    variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'outline'
    size?: 'xs' | 'sm' | 'md'
    disabled?: boolean
    handler?: () => void
}

interface StatusBoxProps {
    variant?: 'success' | 'error' | 'warning' | 'info' | 'pending' | 'neutral'
    title?: string
    message?: string
    timestamp?: Date | string | number
    showIndicator?: boolean
    dismissible?: boolean
    size?: 'sm' | 'md' | 'lg'
    actions?: StatusAction[]
    visible?: boolean
}

const props = withDefaults(defineProps<StatusBoxProps>(), {
    variant: 'neutral',
    showIndicator: true,
    dismissible: false,
    size: 'md',
    actions: () => [],
    visible: true,
})

const emit = defineEmits<{
    dismiss: []
    actionClick: [action: StatusAction, event: Event]
}>()

const statusClasses = computed(() => {
    const baseClasses = ['statusbox', 'flex', 'items-start', 'gap-3', 'w-full']

    baseClasses.push('items-start')

    // Size
    if (props.size === 'sm') {
        baseClasses.push('text-sm', 'p-3')
    } else if (props.size === 'lg') {
        baseClasses.push('text-lg', 'p-6')
    } else {
        baseClasses.push('p-4')
    }

    // Variant styling
    if (props.variant === 'success') {
        baseClasses.push('bg-success/10', 'border', 'border-success/20', 'rounded-lg')
    } else if (props.variant === 'error') {
        baseClasses.push('bg-error/10', 'border', 'border-error/20', 'rounded-lg')
    } else if (props.variant === 'warning') {
        baseClasses.push('bg-warning/10', 'border', 'border-warning/20', 'rounded-lg')
    } else if (props.variant === 'info') {
        baseClasses.push('bg-info/10', 'border', 'border-info/20', 'rounded-lg')
    } else if (props.variant === 'pending') {
        baseClasses.push('bg-base-200', 'border', 'border-base-300', 'rounded-lg')
    } else {
        baseClasses.push('bg-base-100', 'border', 'border-base-300', 'rounded-lg')
    }

    return baseClasses.join(' ')
})

const indicatorClasses = computed(() => {
    const baseClasses = ['flex', 'items-center', 'justify-center', 'flex-shrink-0']

    return baseClasses.join(' ')
})

const titleClasses = computed(() => {
    const baseClasses = ['font-semibold', 'break-words', 'flex', 'gap-2', '']

    // Color based on variant
    if (props.variant === 'success') {
        baseClasses.push('text-success')
    } else if (props.variant === 'error') {
        baseClasses.push('text-error')
    } else if (props.variant === 'warning') {
        baseClasses.push('text-warning')
    } else if (props.variant === 'info') {
        baseClasses.push('text-info')
    }

    // Size
    if (props.size === 'sm') {
        baseClasses.push('text-sm')
    } else if (props.size === 'lg') {
        baseClasses.push('text-lg')
    }

    return baseClasses.join(' ')
})

const messageClasses = computed(() => {
    const baseClasses = ['break-words']

    // Size
    if (props.size === 'sm') {
        baseClasses.push('text-xs')
    } else if (props.size === 'lg') {
        baseClasses.push('text-base')
    } else {
        baseClasses.push('text-sm')
    }

    // Spacing
    if (props.title) {
        baseClasses.push('mt-1')
    }

    return baseClasses.join(' ')
})

const timestampClasses = computed(() => {
    const baseClasses = ['text-xs', 'opacity-60', 'mt-1', 'break-words']
    return baseClasses.join(' ')
})

const getActionClasses = (action: StatusAction) => {
    const baseClasses = ['btn']

    // Size
    if (action.size === 'xs') {
        baseClasses.push('btn-xs')
    } else if (action.size === 'sm') {
        baseClasses.push('btn-sm')
    }

    // Variant
    if (action.variant === 'primary') {
        baseClasses.push('btn-primary')
    } else if (action.variant === 'secondary') {
        baseClasses.push('btn-secondary')
    } else if (action.variant === 'accent') {
        baseClasses.push('btn-accent')
    } else if (action.variant === 'ghost') {
        baseClasses.push('btn-ghost')
    } else if (action.variant === 'outline') {
        baseClasses.push('btn-outline')
    }

    return baseClasses.join(' ')
}

const formatTimestamp = (timestamp: Date | string | number) => {
    const date = new Date(timestamp)

    if (Number.isNaN(date.getTime())) {
        return timestamp.toString()
    }

    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) {
        return 'Just now'
    } else if (diffMins < 60) {
        return `${diffMins}m ago`
    } else if (diffHours < 24) {
        return `${diffHours}h ago`
    } else if (diffDays < 7) {
        return `${diffDays}d ago`
    } else {
        return date.toLocaleDateString()
    }
}

const handleActionClick = (action: StatusAction, event: Event) => {
    if (action.disabled) return

    if (action.handler) {
        action.handler()
    }

    emit('actionClick', action, event)
}

const handleDismiss = () => {
    emit('dismiss')
}
</script>

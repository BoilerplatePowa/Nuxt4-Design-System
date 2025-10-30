<template>
    <div :class="containerClasses">
        <TransitionGroup :name="transitionName" class="flex flex-col gap-2" tag="div">
            <Toast
                v-for="(toast, index) in visibleToasts"
                :id="`toast-${toast.id}`"
                :key="toast.id"
                :type="toast.type"
                :title="toast.title"
                :message="toast.message"
                :duration="toast.duration"
                :closable="toast.closable !== false"
                :persistent="false"
                :fixed="false"
                :show-progress="true"
                :pause-on-hover="true"
                :style="{ zIndex: maxToasts - index }"
                @close="removeToast(toast.id)"
            />
        </TransitionGroup>
    </div>
</template>

<script setup lang="ts">
/**
 * ToastContainer Component
 * 
 * A container component that manages a stack of toast notifications.
 * 
 * Features:
 * - Automatic positioning (6 positions available)
 * - Stacking with max limit
 * - Auto-dismiss with progress bar (handled by Toast component)
 * - Smooth enter/exit animations
 * - Responsive z-index management
 * - Theme-aware using DaisyUI colors
 * 
 * @example
 * ```vue
 * <BpToastContainer 
 *   :toasts="toasts" 
 *   position="top-right"
 *   :max-toasts="5"
 *   @remove-toast="removeToast"
 * />
 * ```
 */
import { computed } from 'vue'
import Toast from './Toast.vue'

/**
 * Toast item interface
 * Represents a single toast notification in the queue
 */
export interface ToastItem {
    /** Unique identifier for the toast */
    id: string | number
    /** Toast type determines color and icon */
    type?: 'success' | 'error' | 'warning' | 'info'
    /** Optional title displayed above the message */
    title?: string
    /** Main message content */
    message: string
    /** Auto-dismiss duration in milliseconds (0 = no auto-dismiss) */
    duration?: number
    /** Whether the toast can be manually closed */
    closable?: boolean
    /** Timestamp when toast was created (for sorting) */
    timestamp: number
}

/**
 * ToastContainer Props
 * Manages a stack of toast notifications with automatic positioning
 */
interface Props {
    /** Array of toast items to display */
    toasts?: ToastItem[]
    /** Position of the toast container on screen */
    position?:
        | 'top-right'
        | 'top-left'
        | 'bottom-right'
        | 'bottom-left'
        | 'top-center'
        | 'bottom-center'
    /** Maximum number of toasts to display simultaneously */
    maxToasts?: number
}

const props = withDefaults(defineProps<Props>(), {
    toasts: () => [],
    position: 'top-right',
    maxToasts: 5,
})

const emit = defineEmits<{
    'remove-toast': [id: string | number]
}>()

/**
 * Sort toasts by timestamp (oldest first) and limit to maxToasts
 * Oldest toasts appear at the top/start of the list
 */
const visibleToasts = computed(() => {
    return [...props.toasts]
        .sort((a, b) => a.timestamp - b.timestamp) // Oldest first (will appear at top)
        .slice(0, props.maxToasts)
})

/**
 * Container positioning classes
 * Uses Tailwind + DaisyUI for responsive positioning
 */
const containerClasses = computed(() => {
    const baseClasses = [
        'toast-container',
        'fixed',
        'z-50',
        'flex',
        'flex-col',
        'pointer-events-none',
        'gap-2', // Spacing between toasts
    ]

    // Position classes
    switch (props.position) {
        case 'top-right':
            baseClasses.push('top-4', 'right-4')
            break
        case 'top-left':
            baseClasses.push('top-4', 'left-4')
            break
        case 'bottom-right':
            baseClasses.push('bottom-4', 'right-4')
            break
        case 'bottom-left':
            baseClasses.push('bottom-4', 'left-4')
            break
        case 'top-center':
            baseClasses.push('top-4', 'left-1/2', 'transform', '-translate-x-1/2')
            break
        case 'bottom-center':
            baseClasses.push('bottom-4', 'left-1/2', 'transform', '-translate-x-1/2')
            break
    }

    // Reverse order for bottom positions (newest at bottom)
    if (props.position.includes('bottom')) {
        baseClasses.push('flex-col-reverse')
    }

    return baseClasses.join(' ')
})

/**
 * Transition animation based on position
 */
const transitionName = computed(() => {
    if (props.position.includes('right')) {
        return 'toast-stack-right'
    } else if (props.position.includes('left')) {
        return 'toast-stack-left'
    } else {
        return 'toast-stack-center'
    }
})

/**
 * Remove toast and emit event
 * Note: Toast component handles its own timer now, no need for external timers
 */
const removeToast = (id: string | number) => {
    emit('remove-toast', id)
}
</script>

<style scoped>
/* Right slide animations for stacked toasts */
.toast-stack-right-enter-active {
    transition: all 0.3s ease-out;
}

.toast-stack-right-leave-active {
    transition: all 0.3s ease-in;
}

.toast-stack-right-enter-from {
    opacity: 0;
    transform: translateX(100%) scale(0.95);
}

.toast-stack-right-leave-to {
    opacity: 0;
    transform: translateX(100%) scale(0.95);
}

.toast-stack-right-move {
    transition: transform 0.3s ease;
}

/* Left slide animations for stacked toasts */
.toast-stack-left-enter-active {
    transition: all 0.3s ease-out;
}

.toast-stack-left-leave-active {
    transition: all 0.3s ease-in;
}

.toast-stack-left-enter-from {
    opacity: 0;
    transform: translateX(-100%) scale(0.95);
}

.toast-stack-left-leave-to {
    opacity: 0;
    transform: translateX(-100%) scale(0.95);
}

.toast-stack-left-move {
    transition: transform 0.3s ease;
}

/* Center animations for stacked toasts */
.toast-stack-center-enter-active {
    transition: all 0.3s ease-out;
}

.toast-stack-center-leave-active {
    transition: all 0.3s ease-in;
}

.toast-stack-center-enter-from {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
}

.toast-stack-center-leave-to {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
}

.toast-stack-center-move {
    transition: transform 0.3s ease;
}

/* Ensure toasts are interactive */
.toast-container :deep(.toast-container) {
    pointer-events: auto;
}
</style>

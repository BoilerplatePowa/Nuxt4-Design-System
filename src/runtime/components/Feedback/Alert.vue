<template>
    <div :class="alertClasses" role="alert" aria-live="assertive">
        <slot name="icon">
            <span v-if="showIcon" class="alert-icon flex-shrink-0">
                <span v-if="icon">{{ icon }}</span>
                <span v-else-if="showDefaultIcon && variant === 'info'">ℹ️</span>
                <span v-else-if="showDefaultIcon && variant === 'success'">✅</span>
                <span v-else-if="showDefaultIcon && variant === 'warning'">⚠️</span>
                <span v-else-if="showDefaultIcon && variant === 'error'">❌</span>
                <span v-else-if="showDefaultIcon">📢</span>
            </span>
        </slot>

        <div class="flex-1">
            <slot name="title">
                <h3 v-if="title" class="alert-title font-bold">
                    {{ title }}
                </h3>
            </slot>
            <div v-if="message">
                {{ message }}
            </div>
            <div v-if="$slots.default">
                <slot />
            </div>
        </div>

        <button
            v-if="dismissible"
            class="btn btn-sm btn-circle btn-ghost"
            aria-label="close"
            @click="$emit('dismiss')"
        >
            ✕
        </button>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
    variant?: 'info' | 'success' | 'warning' | 'error'
    title?: string
    message?: string
    dismissible?: boolean
    showDefaultIcon?: boolean
    icon?: string
}

const props = withDefaults(defineProps<Props>(), {
    variant: 'info',
    dismissible: false,
    showDefaultIcon: true,
})

defineEmits<{
    dismiss: []
}>()

const showIcon = computed(() => {
    // Don't show icon if message is empty and no custom icon provided
    if (!props.message && !props.icon && !props.title) {
        return false
    }
    return props.icon || props.showDefaultIcon
})

const alertClasses = computed(() => {
    const baseClasses = ['alert']

    // Variant classes
    if (props.variant === 'info') {
        baseClasses.push('alert-info')
    } else if (props.variant === 'success') {
        baseClasses.push('alert-success')
    } else if (props.variant === 'warning') {
        baseClasses.push('alert-warning')
    } else if (props.variant === 'error') {
        baseClasses.push('alert-error')
    }

    return baseClasses.join(' ')
})
</script>

<style scoped lang="postcss">
/* DaisyUI handles most alert styling */
</style>

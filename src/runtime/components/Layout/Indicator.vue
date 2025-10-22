<template>
    <div class="indicator">
        <!-- Status indicator -->
        <span 
            v-if="showIndicator && type === 'status'" 
            :class="statusIndicatorClasses"
        >
            <slot name="indicator" />
        </span>

        <!-- Badge indicator -->
        <span 
            v-else-if="showIndicator && type === 'badge'" 
            :class="badgeIndicatorClasses"
        >
            <slot name="indicator">
                {{ content }}
            </slot>
        </span>

        <!-- Custom indicator slot -->
        <slot v-else-if="showIndicator" name="indicator" />

        <!-- Main content -->
        <div class="indicator-content">
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
    /** Indicator content (text or number) */
    content?: string | number
    /** Indicator type */
    type?: 'status' | 'badge' | 'custom'
    /** Horizontal position */
    horizontal?: 'start' | 'center' | 'end'
    /** Vertical position */
    vertical?: 'top' | 'middle' | 'bottom'
    /** Badge variant for badge type */
    variant?: 'primary' | 'secondary' | 'accent' | 'neutral' | 'info' | 'success' | 'warning' | 'error'
    /** Badge size for badge type */
    size?: 'xs' | 'sm' | 'md' | 'lg'
    /** Status variant for status type */
    statusVariant?: 'neutral' | 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error'
    /** Status size for status type */
    statusSize?: 'xs' | 'sm' | 'md' | 'lg'
    /** Show/hide indicator */
    showIndicator?: boolean
    /** Custom CSS classes */
    class?: string
}

const props = withDefaults(defineProps<Props>(), {
    type: 'badge',
    horizontal: 'end',
    vertical: 'top',
    variant: 'primary',
    size: 'md',
    statusVariant: 'success',
    statusSize: 'sm',
    showIndicator: true,
})

// Status indicator classes
const statusIndicatorClasses = computed(() => {
    const baseClasses = ['indicator-item', 'status']
    
    // Position classes
    if (props.vertical === 'top') {
        baseClasses.push('indicator-top')
    } else if (props.vertical === 'middle') {
        baseClasses.push('indicator-middle')
    } else if (props.vertical === 'bottom') {
        baseClasses.push('indicator-bottom')
    }
    
    if (props.horizontal === 'start') {
        baseClasses.push('indicator-start')
    } else if (props.horizontal === 'center') {
        baseClasses.push('indicator-center')
    } else if (props.horizontal === 'end') {
        baseClasses.push('indicator-end')
    }
    
    // Status variant classes
    if (props.statusVariant === 'neutral') {
        baseClasses.push('status-neutral')
    } else if (props.statusVariant === 'primary') {
        baseClasses.push('status-primary')
    } else if (props.statusVariant === 'secondary') {
        baseClasses.push('status-secondary')
    } else if (props.statusVariant === 'accent') {
        baseClasses.push('status-accent')
    } else if (props.statusVariant === 'info') {
        baseClasses.push('status-info')
    } else if (props.statusVariant === 'success') {
        baseClasses.push('status-success')
    } else if (props.statusVariant === 'warning') {
        baseClasses.push('status-warning')
    } else if (props.statusVariant === 'error') {
        baseClasses.push('status-error')
    }
    
    // Status size classes
    if (props.statusSize === 'xs') {
        baseClasses.push('status-xs')
    } else if (props.statusSize === 'sm') {
        baseClasses.push('status-sm')
    } else if (props.statusSize === 'lg') {
        baseClasses.push('status-lg')
    }
    
    return baseClasses.join(' ')
})

// Badge indicator classes
const badgeIndicatorClasses = computed(() => {
    const baseClasses = ['indicator-item', 'badge']
    
    // Position classes
    if (props.vertical === 'top') {
        baseClasses.push('indicator-top')
    } else if (props.vertical === 'middle') {
        baseClasses.push('indicator-middle')
    } else if (props.vertical === 'bottom') {
        baseClasses.push('indicator-bottom')
    }
    
    if (props.horizontal === 'start') {
        baseClasses.push('indicator-start')
    } else if (props.horizontal === 'center') {
        baseClasses.push('indicator-center')
    } else if (props.horizontal === 'end') {
        baseClasses.push('indicator-end')
    }
    
    // Badge variant classes
    if (props.variant === 'primary') {
        baseClasses.push('badge-primary')
    } else if (props.variant === 'secondary') {
        baseClasses.push('badge-secondary')
    } else if (props.variant === 'accent') {
        baseClasses.push('badge-accent')
    } else if (props.variant === 'neutral') {
        baseClasses.push('badge-neutral')
    } else if (props.variant === 'info') {
        baseClasses.push('badge-info')
    } else if (props.variant === 'success') {
        baseClasses.push('badge-success')
    } else if (props.variant === 'warning') {
        baseClasses.push('badge-warning')
    } else if (props.variant === 'error') {
        baseClasses.push('badge-error')
    }
    
    // Badge size classes
    if (props.size === 'xs') {
        baseClasses.push('badge-xs')
    } else if (props.size === 'sm') {
        baseClasses.push('badge-sm')
    } else if (props.size === 'lg') {
        baseClasses.push('badge-lg')
    }
    
    return baseClasses.join(' ')
})
</script>

<style scoped lang="postcss">
/* DaisyUI handles most indicator styling */
.indicator-content {
    /* Ensure content is properly positioned */
}
</style>

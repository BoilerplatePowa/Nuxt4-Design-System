<template>
<component
    :is="tag"
    ref="cardRef"
    :class="cardClasses"
    :tabindex="interactive ? 0 : undefined"
    :role="interactive ? 'button' : undefined"
    :aria-label="ariaLabel"
    :aria-describedby="ariaDescribedby"
    @click="handleClick"
    @keydown="handleKeydown"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
>
    <!-- Loading overlay -->
    <div
        v-if="loading"
        :class="loadingOverlayClasses"
    >
        <span class="loading loading-spinner loading-lg" />
        <span
            v-if="loadingText"
            class="mt-2 text-sm"
        >{{ loadingText }}</span>
    </div>

    <!-- Image slot with lazy loading support -->
    <figure
        v-if="$slots.image"
        :class="imageContainerClasses"
    >
        <slot name="image" />
        <div
            v-if="imageOverlay"
            :class="imageOverlayClasses"
        >
            <slot name="image-overlay" />
        </div>
    </figure>

    <!-- Content wrapper for side variant -->
    <div
        v-if="variant === 'side'"
        :class="contentWrapperClasses"
    >
        <!-- Header section -->
        <div
            v-if="title || subtitle || $slots.header || badge || $slots.badge"
            :class="headerClasses"
        >
            <slot name="header">
                <div class="card-title-wrapper">
                    <div
                        v-if="badge || $slots.badge"
                        :class="badgeContainerClasses"
                    >
                        <slot name="badge">
                            <span
                                v-if="badge"
                                :class="badgeClasses"
                            >{{ badge }}</span>
                        </slot>
                    </div>
                    <h2
                        v-if="title"
                        :class="titleClasses"
                    >
                        {{ title }}
                    </h2>
                    <p
                        v-if="subtitle"
                        :class="subtitleClasses"
                    >
                        {{ subtitle }}
                    </p>
                </div>
                <div class="card-header-actions">
                    <slot name="headerActions" />
                </div>
            </slot>
        </div>

        <!-- Body content -->
        <div :class="bodyClasses">
            <slot />
        </div>

        <!-- Actions section -->
        <div
            v-if="$slots.actions"
            :class="actionsClasses"
        >
            <slot name="actions" />
        </div>

        <!-- Footer section -->
        <div
            v-if="$slots.footer"
            :class="footerClasses"
        >
            <slot name="footer" />
        </div>
    </div>

    <!-- Standard layout for non-side variants -->
    <template v-else>
        <!-- Header section -->
        <div
            v-if="title || subtitle || $slots.header || badge || $slots.badge"
            :class="headerClasses"
        >
            <slot name="header">
                <div class="card-title-wrapper">
                    <div
                        v-if="badge || $slots.badge"
                        :class="badgeContainerClasses"
                    >
                        <slot name="badge">
                            <span
                                v-if="badge"
                                :class="badgeClasses"
                            >{{ badge }}</span>
                        </slot>
                    </div>
                    <h2
                        v-if="title"
                        :class="titleClasses"
                    >
                        {{ title }}
                    </h2>
                    <p
                        v-if="subtitle"
                        :class="subtitleClasses"
                    >
                        {{ subtitle }}
                    </p>
                </div>
                <div class="card-header-actions">
                    <slot name="headerActions" />
                </div>
            </slot>
        </div>

        <!-- Body content -->
        <div :class="bodyClasses">
            <slot />
        </div>

        <!-- Actions section -->
        <div
            v-if="$slots.actions"
            :class="actionsClasses"
        >
            <slot name="actions" />
        </div>

        <!-- Footer section -->
        <div
            v-if="$slots.footer"
            :class="footerClasses"
        >
            <slot name="footer" />
        </div>
    </template>
</component>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

interface Props {
    title?: string
    subtitle?: string
    variant?: 'normal' | 'bordered' | 'compact' | 'side' | 'outline'
    shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
    imageFull?: boolean
    imageOverlay?: boolean
    glass?: boolean
    interactive?: boolean
    loading?: boolean
    loadingText?: string
    disabled?: boolean
    selected?: boolean
    badge?: string
    badgeVariant?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error' | 'info'
    tag?: 'div' | 'article' | 'section'
    ariaLabel?: string
    ariaDescribedby?: string
}

const props = withDefaults(defineProps<Props>(), {
    variant: 'normal',
    shadow: 'md',
    imageFull: false,
    imageOverlay: false,
    glass: false,
    interactive: false,
    loading: false,
    disabled: false,
    selected: false,
    badgeVariant: 'primary',
    tag: 'div',
})

const emit = defineEmits<{
    click: [event: MouseEvent]
    mouseenter: [event: MouseEvent]
    mouseleave: [event: MouseEvent]
    keydown: [event: KeyboardEvent]
}>()

const cardRef = ref<HTMLElement>()
const isHovered = ref(false)

const cardClasses = computed(() => {
    const baseClasses = ['card', 'transition-all', 'duration-200']

    // Background and base styling
    if (props.glass) {
        baseClasses.push('glass')
    }
    else if (props.variant === 'outline') {
        baseClasses.push('bg-transparent')
    }
    else {
        baseClasses.push('bg-base-100')
    }

    // Variant-specific styling
    if (props.variant === 'bordered') {
        baseClasses.push('border', 'border-base-300')
    }
    else if (props.variant === 'compact') {
        baseClasses.push('card-compact')
    }
    else if (props.variant === 'side') {
        baseClasses.push('card-side')
    }
    else if (props.variant === 'outline') {
        baseClasses.push(
            'border-2',
            'border-base-300',
            'bg-transparent',
            'hover:border-primary',
            'hover:shadow-md',
        )
    }

    // Shadow
    if (props.shadow !== 'none') {
        baseClasses.push(`shadow-${props.shadow}`)
    }

    // Image full
    if (props.imageFull) {
        baseClasses.push('image-full')
    }

    // Interactive states
    if (props.interactive && !props.disabled) {
        baseClasses.push(
            'hover:shadow-lg',
            'cursor-pointer',
            'focus:outline-none',
            'focus:ring-2',
            'focus:ring-primary',
            'focus:ring-offset-2',
        )
        if (isHovered.value) {
            baseClasses.push('transform', 'scale-[1.02]')
        }
    }

    // Selected state
    if (props.selected) {
        baseClasses.push('ring-2', 'ring-primary', 'ring-offset-2')
    }

    // Disabled state
    if (props.disabled) {
        baseClasses.push('opacity-60', 'cursor-not-allowed')
    }

    // Loading state
    if (props.loading) {
        baseClasses.push('relative', 'overflow-hidden')
    }

    return baseClasses.join(' ')
})

const loadingOverlayClasses = computed(() => [
    'absolute',
    'inset-0',
    'bg-base-100/80',
    'backdrop-blur-sm',
    'flex',
    'flex-col',
    'items-center',
    'justify-center',
    'z-10',
])

const imageContainerClasses = computed(() => {
    const classes = ['card-image', 'relative']
    if (props.imageFull) {
        classes.push('overflow-hidden')
    }
    return classes
})

const imageOverlayClasses = computed(() => [
    'absolute',
    'inset-0',
    'bg-gradient-to-t',
    'from-black/50',
    'to-transparent',
    'flex',
    'items-end',
    'p-4',
    'text-white',
])

const contentWrapperClasses = computed(() => ['card-content', 'flex-1', 'flex', 'flex-col'])

const headerClasses = computed(() => [
    'card-header',
    'flex',
    'items-start',
    'justify-between',
    'gap-4',
    'p-4',
    'pb-2',
])

const titleClasses = computed(() => {
    const classes = ['card-title', 'text-lg', 'font-semibold']
    if (props.disabled) {
        classes.push('opacity-60')
    }
    return classes
})

const subtitleClasses = computed(() => ['text-sm', 'opacity-70', 'mt-1'])

const bodyClasses = computed(() => {
    const classes = ['card-body', 'px-4']

    // Adjust padding based on variant and presence of header/footer
    if (props.variant === 'compact') {
        classes.push('py-2')
    }
    else {
        classes.push('py-2')
    }

    return classes
})

const actionsClasses = computed(() => ['card-actions', 'justify-end', 'gap-2', 'p-4', 'pt-2'])

const footerClasses = computed(() => {
    const classes = ['card-footer', 'p-4', 'pt-4']

    // Only add border for non-outline variants
    if (props.variant !== 'outline') {
        classes.push('border-t', 'border-base-300')
    }
    else {
        classes.push('border-t', 'border-base-200')
    }

    return classes
})

const badgeContainerClasses = computed(() => ['flex', 'items-center', 'gap-2', 'mb-2'])

const badgeClasses = computed(() => {
    const classes = ['badge']

    if (props.badgeVariant === 'primary') {
        classes.push('badge-primary')
    }
    else if (props.badgeVariant === 'secondary') {
        classes.push('badge-secondary')
    }
    else if (props.badgeVariant === 'accent') {
        classes.push('badge-accent')
    }
    else if (props.badgeVariant === 'success') {
        classes.push('badge-success')
    }
    else if (props.badgeVariant === 'warning') {
        classes.push('badge-warning')
    }
    else if (props.badgeVariant === 'error') {
        classes.push('badge-error')
    }
    else if (props.badgeVariant === 'info') {
        classes.push('badge-info')
    }

    return classes
})

// Event handlers
const handleClick = (event: MouseEvent) => {
    if (!props.disabled && props.interactive) {
        emit('click', event)
    }
}

const handleKeydown = (event: KeyboardEvent) => {
    if (!props.disabled && props.interactive) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            emit('click', event as any)
        }
    }
    emit('keydown', event)
}

const handleMouseEnter = (event: MouseEvent) => {
    if (!props.disabled) {
        isHovered.value = true
        emit('mouseenter', event)
    }
}

const handleMouseLeave = (event: MouseEvent) => {
    isHovered.value = false
    emit('mouseleave', event)
}

// Expose methods for parent component access
defineExpose({
    focus: () => cardRef.value?.focus(),
    blur: () => cardRef.value?.blur(),
})
</script>

<style scoped lang="postcss">
/* DaisyUI handles most card styling */
.card {
  @apply w-full max-w-md;
}

/* Enhanced interactive states */
.card:focus-visible {
  @apply outline-none ring-2 ring-primary ring-offset-2;
}

/* Smooth transform for hover effects */
.card.interactive {
  @apply transition-transform duration-200 ease-in-out;
}

/* Loading overlay improvements */
.card .loading-overlay {
  backdrop-filter: blur(4px);
}

/* Image overlay styling */
.card-image .image-overlay {
  @apply transition-opacity duration-300;
}

.card:not(:hover) .image-overlay {
  @apply opacity-0;
}

.card:hover .image-overlay {
  @apply opacity-100;
}

/* Card header improvements */
.card-title-wrapper {
  @apply flex-1;
}

.card-header-actions {
  @apply flex items-center gap-2;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .card {
    @apply w-full;
  }

  .card-side {
    @apply flex-col;
  }
}

/* Accessibility improvements */
.card[role='button'] {
  @apply cursor-pointer;
}

.card[aria-disabled='true'] {
  @apply pointer-events-none;
}
</style>

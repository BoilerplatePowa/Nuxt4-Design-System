<template>
    <section
        :class="heroClasses"
        :style="heroStyle"
        :aria-label="ariaLabel || 'Hero section'"
        role="banner"
    >
        <!-- Background elements -->
        <div v-if="parallax && backgroundImage" :class="parallaxClasses" :style="parallaxStyle" />
        <div v-if="overlay" :class="overlayClasses" />

        <!-- Optional video background -->
        <video
            v-if="videoSrc"
            :class="videoClasses"
            :src="videoSrc"
            :poster="videoPoster"
            autoplay
            muted
            loop
            playsinline
            :aria-hidden="true"
        />

        <!-- Main hero content -->
        <div :class="contentWrapperClasses">
            <div :class="contentContainerClasses">
                <slot name="content">
                    <div :class="textContainerClasses">
                        <!-- Badge/eyebrow text -->
                        <div v-if="badge || $slots.badge" :class="badgeClasses">
                            <slot name="badge">
                                <span class="badge badge-primary badge-lg">{{ badge }}</span>
                            </slot>
                        </div>

                        <!-- Main title -->
                        <h1 v-if="title" :class="titleClasses">
                            {{ title }}
                        </h1>

                        <!-- Subtitle -->
                        <p v-if="subtitle" :class="subtitleClasses">
                            {{ subtitle }}
                        </p>

                        <!-- Description -->
                        <div v-if="description || $slots.description" :class="descriptionClasses">
                            <slot name="description">
                                <p v-if="description">
                                    {{ description }}
                                </p>
                            </slot>
                        </div>

                        <!-- Action buttons -->
                        <div v-if="$slots.actions" :class="actionsClasses">
                            <slot name="actions" />
                        </div>

                        <!-- Additional features -->
                        <div
                            v-if="showScrollIndicator"
                            :class="scrollIndicatorClasses"
                            @click="scrollDown"
                        >
                            <svg
                                class="w-6 h-6 animate-bounce"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                                />
                            </svg>
                        </div>
                    </div>
                </slot>
            </div>
        </div>

        <!-- Social proof or stats -->
        <div v-if="$slots.footer" :class="footerClasses">
            <slot name="footer" />
        </div>
    </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
    title?: string
    subtitle?: string
    description?: string
    badge?: string
    backgroundImage?: string
    videoSrc?: string
    videoPoster?: string
    minHeight?: 'sm' | 'md' | 'lg' | 'xl' | 'screen' | 'auto'
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
    alignment?: 'left' | 'center' | 'right'
    verticalAlignment?: 'top' | 'center' | 'bottom'
    overlay?: boolean
    overlayOpacity?: 'light' | 'medium' | 'dark'
    overlayColor?: 'black' | 'primary' | 'secondary' | 'accent'
    textColor?: 'default' | 'neutral' | 'primary' | 'white' | 'contrast'
    parallax?: boolean
    showScrollIndicator?: boolean
    responsive?: boolean
    fullWidth?: boolean
    ariaLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
    minHeight: 'lg',
    maxWidth: 'md',
    alignment: 'center',
    verticalAlignment: 'center',
    overlay: false,
    overlayOpacity: 'medium',
    overlayColor: 'black',
    textColor: 'default',
    parallax: false,
    showScrollIndicator: false,
    responsive: true,
    fullWidth: false,
})

// Utility function for smooth scrolling
const scrollDown = () => {
    const nextSection = document.querySelector('section:nth-of-type(2)') as HTMLElement
    if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' })
    } else {
        window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })
    }
}

const heroClasses = computed(() => {
    const baseClasses = ['hero', 'relative', 'overflow-hidden']

    // Min height classes
    if (props.minHeight === 'sm') {
        baseClasses.push('min-h-[32rem]')
    } else if (props.minHeight === 'md') {
        baseClasses.push('min-h-[40rem]')
    } else if (props.minHeight === 'lg') {
        baseClasses.push('min-h-[48rem]')
    } else if (props.minHeight === 'xl') {
        baseClasses.push('min-h-[56rem]')
    } else if (props.minHeight === 'screen') {
        baseClasses.push('min-h-screen')
    } else if (props.minHeight === 'auto') {
        baseClasses.push('min-h-fit')
    }

    // Background styling
    if (!props.backgroundImage && !props.videoSrc) {
        baseClasses.push('bg-gradient-to-br', 'from-base-200', 'to-base-300')
    }

    // Full width
    if (props.fullWidth) {
        baseClasses.push('w-full')
    }

    return baseClasses.join(' ')
})

const overlayClasses = computed(() => {
    if (!props.overlay) return ''

    const classes = ['hero-overlay', 'absolute', 'inset-0', 'z-10']

    // Color
    if (props.overlayColor === 'black') {
        classes.push('bg-black')
    } else if (props.overlayColor === 'primary') {
        classes.push('bg-primary')
    } else if (props.overlayColor === 'secondary') {
        classes.push('bg-secondary')
    } else if (props.overlayColor === 'accent') {
        classes.push('bg-accent')
    }

    // Opacity
    if (props.overlayOpacity === 'light') {
        classes.push('bg-opacity-30')
    } else if (props.overlayOpacity === 'medium') {
        classes.push('bg-opacity-50')
    } else if (props.overlayOpacity === 'dark') {
        classes.push('bg-opacity-70')
    }

    return classes.join(' ')
})

const parallaxClasses = computed(() => [
    'absolute',
    'inset-0',
    'z-0',
    'bg-cover',
    'bg-center',
    'bg-fixed',
])

const parallaxStyle = computed(() => {
    if (props.parallax && props.backgroundImage) {
        return `background-image: url(${props.backgroundImage});`
    }
    return {}
})

const videoClasses = computed(() => [
    'absolute',
    'inset-0',
    'w-full',
    'h-full',
    'object-cover',
    'z-0',
])

const heroStyle = computed(() => {
    if (props.backgroundImage && !props.parallax) {
        return `background-image: url(${props.backgroundImage}); background-size: cover; background-position: center center;`
    }
    return {}
})

const contentWrapperClasses = computed(() => {
    const classes = ['hero-content', 'relative', 'z-20', 'w-full']

    // Alignment
    if (props.alignment === 'left') {
        classes.push('text-left', 'justify-start')
    } else if (props.alignment === 'right') {
        classes.push('text-right', 'justify-end')
    } else {
        classes.push('text-center', 'justify-center')
    }

    // Vertical alignment
    if (props.verticalAlignment === 'top') {
        classes.push('items-start')
    } else if (props.verticalAlignment === 'bottom') {
        classes.push('items-end')
    } else {
        classes.push('items-center')
    }

    // Text color
    if (props.textColor === 'neutral') {
        classes.push('text-neutral-content')
    } else if (props.textColor === 'primary') {
        classes.push('text-primary-content')
    } else if (props.textColor === 'white') {
        classes.push('text-white')
    } else if (props.textColor === 'contrast') {
        classes.push('text-base-content')
    }

    return classes.join(' ')
})

const contentContainerClasses = computed(() => {
    const classes = ['w-full']

    // Max width
    if (props.maxWidth === 'sm') {
        classes.push('max-w-sm')
    } else if (props.maxWidth === 'md') {
        classes.push('max-w-md')
    } else if (props.maxWidth === 'lg') {
        classes.push('max-w-lg')
    } else if (props.maxWidth === 'xl') {
        classes.push('max-w-xl')
    } else if (props.maxWidth === '2xl') {
        classes.push('max-w-2xl')
    } else if (props.maxWidth === 'full') {
        classes.push('max-w-full')
    }

    if (props.alignment === 'center') {
        classes.push('mx-auto')
    }

    return classes.join(' ')
})

const textContainerClasses = computed(() => ['space-y-6', props.responsive ? 'px-4' : ''])

const badgeClasses = computed(() => {
    const classes = ['mb-4', 'flex']

    if (props.alignment === 'center') {
        classes.push('justify-center')
    } else if (props.alignment === 'right') {
        classes.push('justify-end')
    } else {
        classes.push('justify-start')
    }

    return classes
})

const titleClasses = computed(() => {
    const classes = ['font-bold', 'leading-tight']

    if (props.responsive) {
        classes.push('text-3xl', 'sm:text-4xl', 'md:text-5xl', 'lg:text-6xl')
    } else {
        classes.push('text-5xl')
    }

    return classes.join(' ')
})

const subtitleClasses = computed(() => {
    const classes = ['font-medium', 'opacity-90']

    if (props.responsive) {
        classes.push('text-lg', 'sm:text-xl', 'md:text-2xl')
    } else {
        classes.push('text-xl')
    }

    return classes.join(' ')
})

const descriptionClasses = computed(() => {
    const classes = ['opacity-80', 'leading-relaxed']

    if (props.responsive) {
        classes.push('text-base', 'sm:text-lg')
    } else {
        classes.push('text-lg')
    }

    return classes.join(' ')
})

const actionsClasses = computed(() => {
    const classes = ['flex', 'flex-wrap', 'gap-4']

    if (props.alignment === 'center') {
        classes.push('justify-center')
    } else if (props.alignment === 'right') {
        classes.push('justify-end')
    } else {
        classes.push('justify-start')
    }

    if (props.responsive) {
        classes.push('flex-col', 'sm:flex-row')
    }

    return classes.join(' ')
})

const scrollIndicatorClasses = computed(() => [
    'absolute',
    'bottom-8',
    'left-1/2',
    'transform',
    '-translate-x-1/2',
    'text-current',
    'cursor-pointer',
    'opacity-70',
    'hover:opacity-100',
    'transition-opacity',
    'duration-200',
])

const footerClasses = computed(() => [
    'absolute',
    'bottom-0',
    'left-0',
    'right-0',
    'z-20',
    'p-6',
    'bg-gradient-to-t',
    'from-black/50',
    'to-transparent',
])
</script>

<style scoped lang="postcss">
/* DaisyUI handles most hero styling */
</style>

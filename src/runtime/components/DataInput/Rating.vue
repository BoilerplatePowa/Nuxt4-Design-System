<template>
    <div class="form-control">
        <label v-if="label" class="label">
            <span class="label-text">{{ label }}</span>
        </label>

        <div :class="ratingClasses">
            <input
                v-if="allowEmpty"
                type="radio"
                name="rating"
                :value="0"
                :checked="model === 0"
                class="rating-hidden"
                @change="updateRating(0)"
            />

            <input
                v-for="star in maxRating"
                :key="star"
                type="radio"
                :name="name || 'rating'"
                :value="star"
                :checked="model === star"
                :class="starClasses"
                :disabled="disabled || readonly"
                @change="updateRating(star)"
            />
        </div>

        <p v-if="helpText && !errorMessage" class="text-xs text-base-content/70 mt-1">
            {{ helpText }}
        </p>

        <p v-if="errorMessage" class="text-xs text-error mt-1" role="alert">
            {{ errorMessage }}
        </p>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
    maxRating?: number
    label?: string
    helpText?: string
    errorMessage?: string
    disabled?: boolean
    readonly?: boolean
    allowEmpty?: boolean
    size?: 'xs' | 'sm' | 'md' | 'lg'
    variant?: 'star' | 'heart' | 'mask'
    name?: string
}

const props = withDefaults(defineProps<Props>(), {
    maxRating: 5,
    disabled: false,
    readonly: false,
    allowEmpty: true,
    size: 'md',
    variant: 'star',
})

// Use defineModel() for Vue 3.4+ best practices
const model = defineModel<number>({ default: 0 })

const emit = defineEmits<{
    change: [value: number]
}>()

const ratingClasses = computed(() => {
    const baseClasses = ['rating']

    // Size classes
    if (props.size === 'xs') {
        baseClasses.push('rating-xs')
    } else if (props.size === 'sm') {
        baseClasses.push('rating-sm')
    } else if (props.size === 'lg') {
        baseClasses.push('rating-lg')
    }
    // 'md' is default

    // Spacing
    baseClasses.push('gap-1')

    return baseClasses.join(' ')
})

const starClasses = computed(() => {
    const baseClasses = ['mask']

    // Variant classes
    if (props.variant === 'star') {
        baseClasses.push('mask-star-2', 'bg-orange-400')
    } else if (props.variant === 'heart') {
        baseClasses.push('mask-heart', 'bg-red-400')
    } else if (props.variant === 'mask') {
        baseClasses.push('mask-star', 'bg-primary')
    }

    return baseClasses.join(' ')
})

const updateRating = (value: number) => {
    if (props.disabled || props.readonly) return

    model.value = value
    emit('change', value)
}
</script>

<style scoped lang="postcss">
/* DaisyUI handles most rating styling */
.rating-hidden {
    @apply w-0 opacity-0;
}
</style>

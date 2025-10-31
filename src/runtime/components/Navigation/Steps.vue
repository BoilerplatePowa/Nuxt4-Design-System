<template>
    <ul :class="stepsClasses">
        <slot>
            <li
                v-for="(step, index) in steps"
                :key="getStepKey(step, index)"
                :class="getStepClasses(step, index)"
            >
                <span class="step-icon">
                    <component :is="step.icon" v-if="step.icon" />
                    <span v-else-if="props.showNumbers">{{ index + 1 }}</span>
                </span>
                <div>
                    <div v-if="step.title || step.description" class="text-center">
                        <div v-if="step.title" class="font-medium">
                            {{ step.title }}
                        </div>
                        <div v-if="step.description" class="text-sm opacity-70">
                            {{ step.description }}
                        </div>
                    </div>
                    <slot
                        :name="`step-${index}`"
                        :step="step"
                        :index="index"
                        :is-active="isStepActive(index)"
                        :is-completed="isStepCompleted(index)"
                    />
                </div>
            </li>
        </slot>
    </ul>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Component } from 'vue'
import type { Variant } from '../../shared/types.d'

interface Step {
    title?: string
    description?: string
    value?: string | number
    icon?: Component // Vue component (e.g., Lucide icon component)
    content?: string
    completed?: boolean
    disabled?: boolean
}

interface Props {
    steps?: Step[]
    currentStep?: number
    variant?: 'default' | 'vertical'
    showNumbers?: boolean
    color?: Variant
}

const props = withDefaults(defineProps<Props>(), {
    steps: () => [],
    currentStep: 0,
    variant: 'default',
    showNumbers: true,
    color: 'primary',
})

const stepsClasses = computed(() => {
    const baseClasses = ['steps']

    // Variant classes
    if (props.variant === 'vertical') {
        baseClasses.push('steps-vertical')
    } else {
        baseClasses.push('steps-horizontal')
    }

    return baseClasses.join(' ')
})

const getStepClasses = (step: Step, index: number): string => {
    const classes = ['step']

    // Color classes
    if (isStepActive(index) || isStepCompleted(index)) {
        if (props.color) {
            classes.push(`step-${props.color}`)
        }
    }

    // State classes
    if (step.disabled) {
        classes.push('opacity-50', 'cursor-not-allowed')
    } else if (!isStepActive(index) && !isStepCompleted(index)) {
        classes.push('cursor-pointer')
    }

    return classes.join(' ')
}

const getStepKey = (step: Step, index: number): string => {
    return step.value?.toString() || step.title || index.toString()
}

const isStepActive = (index: number): boolean => {
    return index === props.currentStep
}

const isStepCompleted = (index: number): boolean => {
    return index < props.currentStep || props.steps[index]?.completed === true
}
</script>

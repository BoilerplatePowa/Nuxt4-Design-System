<template>
<div
    :class="wrapperClasses"
    :aria-label="ariaLabel"
>
    <!-- Wizard Header with Steps -->
    <div
        v-if="showSteps"
        class="flex justify-center"
    >
        <Steps
            :steps="wizardSteps"
            :current-step="currentStep"
            :variant="stepsVariant"
            :show-numbers="showStepNumbers"
            :color="stepsColor"
        />
    </div>

    <!-- Form Container -->
    <Form
        v-slot="{ errors, meta }"
        :validation-schema="currentStepSchema"
        :validate-on-mount="false"
        @submit="handleStepSubmit"
    >
        <!-- Step Content -->
        <div class="step-content">
            <slot
                :name="`step-${currentStep}`"
                :step="currentStep"
                :step-data="currentStepData"
                :all-step-data="safeStepData"
                :errors="errors || {}"
                :meta="meta || { valid: true, dirty: false, touched: false }"
                :is-first-step="isFirstStep"
                :is-last-step="isLastStep"
                :total-steps="totalSteps"
            >
                <!-- Default step content -->
                <div class="default-step-content">
                    <Avatar
                        name="settings"
                        size="lg"
                    />
                    <h3 class="default-step-title">
                        Step {{ currentStep + 1 }}: {{ currentStepTitle }}
                    </h3>
                    <p class="default-step-description">
                        {{ currentStepDescription }}
                    </p>
                </div>
            </slot>
        </div>

        <!-- Navigation Buttons -->
        <div class="navigation-buttons">
            <!-- Previous Button -->
            <Button
                v-if="!isFirstStep"
                type="button"
                variant="outline"
                size="sm"
                :disabled="isNavigating"
                @click="goToPreviousStep"
            >
                <Icon
                    name="chevron-left"
                    size="sm"
                />
                <span class="hidden sm:inline">{{ previousButtonText }}</span>
            </Button>
            <div
                v-else
                class="flex-1"
            />

            <!-- Next/Submit Button -->
            <Button
                type="submit"
                :variant="isLastStep ? 'success' : 'primary'"
                size="sm"
                :disabled="isNavigating || meta.valid === false"
                :loading="isNavigating"
                :icon-right="isLastStep ? 'check' : 'chevron-right'"
            >
                <span>{{ isLastStep ? submitButtonText : nextButtonText }}</span>
            </Button>
        </div>

        <!-- Step Progress Info -->
        <div
            v-if="showProgress"
            class="progress-info"
        >
            <div class="text-sm text-base-content/60 mb-2">
                Step {{ currentStep + 1 }} of {{ totalSteps }}
            </div>
            <Progress
                :value="progressPercentage"
                :max="100"
                size="sm"
                class="progress-bar"
            />
        </div>
    </Form>

    <!-- Step Summary (Optional) -->
    <div
        v-if="showSummary && !isFirstStep"
        class="step-summary"
    >
        <h4 class="summary-header">
            <Icon
                name="check-circle"
                size="sm"
                class="summary-icon"
            />
            Previous Steps Summary
        </h4>
        <div class="summary-list">
            <div
                v-for="(step, index) in completedSteps"
                :key="index"
                class="summary-item"
            >
                <div class="summary-item-left">
                    <div class="badge badge-success badge-sm">
                        <Icon
                            name="check"
                            size="xs"
                            class="summary-check-icon"
                        />
                    </div>
                    <span class="text-sm font-medium">{{ step.title }}</span>
                </div>
                <Button
                    type="button"
                    variant="ghost"
                    size="xs"
                    @click="goToStep(index)"
                >
                    <Icon
                        name="edit"
                        size="xs"
                    />
                    <span class="hidden sm:inline ml-1">Edit</span>
                </Button>
            </div>
        </div>
    </div>
</div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { Form } from 'vee-validate'
import * as yup from 'yup'
import Steps from '../Navigation/Steps.vue'
import Button from '../Actions/Button.vue'
import Icon from '../Icons/Icon.vue'
import Progress from '../Feedback/Progress.vue'
import type { IconName, Variant } from '../../shared/types.d'
import Avatar from '../DataDisplay/Avatar.vue'

interface WizardStep {
    title: string
    description?: string
    schema?: Record<string, unknown>
    icon?: IconName
    value?: string | number
}

interface FormWizardProps {
    // Steps configuration
    steps: WizardStep[]
    // Step data for each step
    stepData?: Record<string, unknown>
    // Steps display options
    showSteps?: boolean
    stepsVariant?: 'default' | 'vertical'
    stepsColor?: Variant
    showStepNumbers?: boolean
    // Navigation options
    nextButtonText?: string
    previousButtonText?: string
    submitButtonText?: string
    // Progress options
    showProgress?: boolean
    showSummary?: boolean
    // Validation options
    validateOnStepChange?: boolean
    // Accessibility
    ariaLabel?: string
}

const props = withDefaults(defineProps<FormWizardProps>(), {
    stepData: () => ({}),
    showSteps: true,
    stepsVariant: 'default',
    stepsColor: 'primary',
    showStepNumbers: true,
    nextButtonText: 'Next',
    previousButtonText: 'Previous',
    submitButtonText: 'Submit',
    showProgress: true,
    showSummary: true,
    validateOnStepChange: true,
    ariaLabel: 'Multi-step form wizard',
})

// Ensure stepData is always an object
const safeStepData = computed(() => {
    return props.stepData && typeof props.stepData === 'object' ? props.stepData : {}
})

// Get current step data only
const currentStepData = computed(() => {
    const stepKey = `step_${currentStep.value}`
    return safeStepData.value[stepKey] || {}
})

const emit = defineEmits<{
    'step-change': [step: number, previousStep: number]
    'step-complete': [step: number, data: unknown]
    'wizard-complete': [data: Record<string, unknown>]
    'wizard-cancel': []
}>()

// Current step state using defineModel (Vue 3.4+)
const currentStep = defineModel<number>({ default: 0 })

// Navigation state
const isNavigating = ref(false)

// Computed properties
const totalSteps = computed(() => props.steps.length)
const isFirstStep = computed(() => currentStep.value === 0)
const isLastStep = computed(() => currentStep.value === totalSteps.value - 1)
const progressPercentage = computed(() => ((currentStep.value + 1) / totalSteps.value) * 100)

const currentStepTitle = computed(
    () => props.steps[currentStep.value]?.title || `Step ${currentStep.value + 1}`,
)

const currentStepDescription = computed(() => props.steps[currentStep.value]?.description || '')

const currentStepSchema = computed(() => {
    const step = props.steps[currentStep.value]

    if (!step || !step.schema) {
        // Return a schema that allows any data when no validation is needed
        return yup.object().shape({}).noUnknown()
    }

    // Ensure the schema is valid
    try {
        // Validate that the schema is a proper Yup schema
        if (typeof step.schema === 'object' && step.schema && 'validate' in step.schema) {
            return step.schema
        }
        else {
            console.warn(
                'FormWizard: Invalid schema for step',
                currentStep.value,
                'schema is not a valid Yup schema',
            )
            return yup.object().shape({}).noUnknown()
        }
    }
    catch (error) {
        console.warn('FormWizard: Invalid schema for step', currentStep.value, error)
        return yup.object().shape({}).noUnknown()
    }
})

const wizardSteps = computed(() =>
    props.steps.map((step, index) => ({
        title: step.title,
        description: step.description,
        value: step.value || index,
        icon: step.icon,
        completed: index < currentStep.value,
    })),
)

const completedSteps = computed(() => props.steps.slice(0, currentStep.value))

const wrapperClasses = computed(() => [
    'form-wizard',
    'w-full',
    'max-w-4xl',
    'mx-auto',
    'flex',
    'flex-col',
    'gap-12',
])

// Navigation methods
const goToNextStep = async () => {
    if (isLastStep.value) {
        await handleWizardComplete()
        return
    }

    isNavigating.value = true

    try {
        // Move to next step
        const nextStep = currentStep.value + 1
        const previousStep = currentStep.value

        currentStep.value = nextStep
        emit('step-change', nextStep, previousStep)
    }
    finally {
        isNavigating.value = false
    }
}

const goToPreviousStep = () => {
    if (isFirstStep.value) return

    const previousStep = currentStep.value - 1
    const currentStepIndex = currentStep.value

    currentStep.value = previousStep
    emit('step-change', previousStep, currentStepIndex)
}

const goToStep = (stepIndex: number) => {
    if (stepIndex === currentStep.value) return

    const previousStep = currentStep.value
    currentStep.value = stepIndex
    emit('step-change', stepIndex, previousStep)
}

// Form submission handlers
const handleStepSubmit = async (values: unknown) => {
    isNavigating.value = true

    try {
        // Emit step complete event with the current step's form values
        emit('step-complete', currentStep.value, values)

        // Move to next step or complete wizard
        await goToNextStep()
    }
    finally {
        isNavigating.value = false
    }
}

const handleWizardComplete = async () => {
    // Collect all step data
    const allData = {
        ...safeStepData.value,
        completedAt: new Date().toISOString(),
    }

    emit('wizard-complete', allData)
}

// Watch for external step changes
watch(currentStep, (newStep, oldStep) => {
    if (newStep !== oldStep && oldStep !== undefined) {
        emit('step-change', newStep, oldStep)
    }
})

// Expose methods for parent components
defineExpose({
    goToStep,
    goToNextStep,
    goToPreviousStep,
    reset: () => {
        currentStep.value = 0
    },
})
</script>

<!-- Styles are imported from src/assets/css/form-wizard.css -->

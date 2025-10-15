<template>
    <div :class="wrapperClasses">
        <label v-if="label" :for="fileInputId" class="label">
            <span class="label-text">{{ label }}</span>
            <span v-if="required" class="label-text-alt text-error">*</span>
        </label>

        <input
            :id="fileInputId"
            ref="fileInputRef"
            type="file"
            :class="fileInputClasses"
            :accept="accept"
            :multiple="multiple"
            :disabled="disabled"
            :required="required"
            :aria-describedby="ariaDescribedby"
            @change="handleChange"
        />

        <div v-if="showPreview && selectedFiles.length > 0" class="mt-4">
            <h4 class="text-sm font-medium mb-2">Selected Files:</h4>
            <div class="space-y-2">
                <div
                    v-for="(file, index) in selectedFiles"
                    :key="`${file.name}-${index}`"
                    class="flex items-center justify-between p-3 bg-base-200 rounded-lg"
                >
                    <div class="flex items-center space-x-3">
                        <div class="flex-shrink-0">
                            <svg
                                class="w-6 h-6 text-base-content/70"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                            </svg>
                        </div>
                        <div>
                            <p class="text-sm font-medium">
                                {{ file.name }}
                            </p>
                            <p class="text-xs text-base-content/70">
                                {{ formatFileSize(file.size) }}
                            </p>
                        </div>
                    </div>
                    <button
                        v-if="allowRemove"
                        type="button"
                        class="btn btn-sm btn-circle btn-ghost"
                        @click="removeFile(index)"
                    >
                        ✕
                    </button>
                </div>
            </div>
        </div>

        <div v-if="dropZone" class="mt-2">
            <div
                :class="dropZoneClasses"
                @drop="handleDrop"
                @dragover="handleDragOver"
                @dragenter="handleDragEnter"
                @dragleave="handleDragLeave"
            >
                <div class="text-center">
                    <svg
                        class="mx-auto h-12 w-12 text-base-content/40"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                    >
                        <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                    <div class="mt-4">
                        <label :for="fileInputId" class="cursor-pointer">
                            <span class="mt-2 block text-sm font-medium text-base-content">
                                Drop files here or
                                <span class="text-primary"> browse</span>
                            </span>
                        </label>
                        <p class="mt-2 block text-xs text-base-content/70">
                            {{ dropZoneText }}
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <p
            v-if="helpText && !errorMessage"
            :id="`${fileInputId}-help`"
            class="text-xs text-base-content/70 mt-1"
        >
            {{ helpText }}
        </p>

        <p
            v-if="errorMessage"
            :id="`${fileInputId}-error`"
            class="text-xs text-error mt-1"
            role="alert"
        >
            {{ errorMessage }}
        </p>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, useId } from 'vue'

// SSR-safe id generation with optional override via props
const uid = useId()

interface Props {
    id?: string
    label?: string
    helpText?: string
    errorMessage?: string
    accept?: string
    multiple?: boolean
    disabled?: boolean
    required?: boolean
    size?: 'xs' | 'sm' | 'md' | 'lg'
    variant?:
        | 'bordered'
        | 'ghost'
        | 'primary'
        | 'secondary'
        | 'accent'
        | 'info'
        | 'success'
        | 'warning'
        | 'error'
    showPreview?: boolean
    allowRemove?: boolean
    dropZone?: boolean
    dropZoneText?: string
    maxFileSize?: number // in bytes
    ariaDescribedby?: string
}

const props = withDefaults(defineProps<Props>(), {
    id: undefined,
    multiple: false,
    disabled: false,
    required: false,
    size: 'md',
    variant: 'bordered',
    showPreview: true,
    allowRemove: true,
    dropZone: false,
    dropZoneText: 'PNG, JPG, GIF up to 10MB',
})

const model = defineModel<File | File[]>()

const emit = defineEmits<{
    change: [files: File[]]
    error: [message: string]
}>()

const fileInputId = computed(() => props.id ?? `file-input-${uid}`)
const fileInputRef = ref<HTMLInputElement>()
const selectedFiles = ref<File[]>([])
const isDragOver = ref(false)

const wrapperClasses = computed(() => ['form-control', 'w-full'])

const fileInputClasses = computed(() => {
    const baseClasses = ['file-input', 'w-full']

    // Size classes
    if (props.size === 'xs') {
        baseClasses.push('file-input-xs')
    } else if (props.size === 'sm') {
        baseClasses.push('file-input-sm')
    } else if (props.size === 'lg') {
        baseClasses.push('file-input-lg')
    }

    // Variant classes
    if (props.variant === 'bordered') {
        baseClasses.push('file-input-bordered')
    } else if (props.variant === 'ghost') {
        baseClasses.push('file-input-ghost')
    } else if (props.variant === 'primary') {
        baseClasses.push('file-input-primary')
    } else if (props.variant === 'secondary') {
        baseClasses.push('file-input-secondary')
    } else if (props.variant === 'accent') {
        baseClasses.push('file-input-accent')
    } else if (props.variant === 'info') {
        baseClasses.push('file-input-info')
    } else if (props.variant === 'success') {
        baseClasses.push('file-input-success')
    } else if (props.variant === 'warning') {
        baseClasses.push('file-input-warning')
    } else if (props.variant === 'error') {
        baseClasses.push('file-input-error')
    }

    // Error state override
    if (props.errorMessage) {
        baseClasses.push('file-input-error')
    }

    return baseClasses.join(' ')
})

const dropZoneClasses = computed(() => {
    const classes = [
        'mt-2',
        'flex',
        'justify-center',
        'px-6',
        'pt-5',
        'pb-6',
        'border-2',
        'border-dashed',
        'rounded-md',
        'transition-colors',
    ]

    if (isDragOver.value) {
        classes.push('border-primary', 'bg-primary/5')
    } else {
        classes.push('border-base-300', 'hover:border-base-400')
    }

    return classes.join(' ')
})

const ariaDescribedby = computed(() => {
    const ids = []
    if (props.helpText) ids.push(`${fileInputId.value}-help`)
    if (props.errorMessage) ids.push(`${fileInputId.value}-error`)
    if (props.ariaDescribedby) ids.push(props.ariaDescribedby)
    return ids.length > 0 ? ids.join(' ') : undefined
})

const handleChange = (event: Event) => {
    const target = event.target as HTMLInputElement
    processFiles(target.files)
}

const processFiles = (fileList: FileList | null) => {
    if (!fileList) return

    const files = Array.from(fileList)

    // Validate file sizes
    if (props.maxFileSize) {
        const oversizedFiles = files.filter((file) => file.size > props.maxFileSize!)
        if (oversizedFiles.length > 0) {
            emit('error', `File(s) too large: ${oversizedFiles.map((f) => f.name).join(', ')}`)
            return
        }
    }

    if (props.multiple) {
        // Append new files to existing selection
        selectedFiles.value = [...selectedFiles.value, ...files]
        model.value = selectedFiles.value
    } else {
        // Single file mode - replace the selection
        selectedFiles.value = files
        model.value = files[0] || undefined
    }

    emit('change', selectedFiles.value)
}

const removeFile = (index: number) => {
    selectedFiles.value.splice(index, 1)

    if (props.multiple) {
        model.value = selectedFiles.value
    } else {
        model.value = selectedFiles.value[0] || undefined
    }

    emit('change', selectedFiles.value)
}

const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// Drag and drop handlers
const handleDragOver = (event: DragEvent) => {
    event.preventDefault()
    isDragOver.value = true
}

const handleDragEnter = (event: DragEvent) => {
    event.preventDefault()
    isDragOver.value = true
}

const handleDragLeave = (event: DragEvent) => {
    event.preventDefault()
    isDragOver.value = false
}

const handleDrop = (event: DragEvent) => {
    event.preventDefault()
    isDragOver.value = false

    if (props.disabled) return

    const files = event.dataTransfer?.files
    if (files) {
        processFiles(files)
    }
}
</script>

<style scoped lang="postcss">
/* DaisyUI handles most file input styling */
</style>

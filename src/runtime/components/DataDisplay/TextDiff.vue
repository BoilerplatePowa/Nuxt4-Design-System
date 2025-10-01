<template>
    <div :class="textDiffClasses">
        <!-- Header -->
        <div v-if="showHeader" :class="headerClasses">
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-4">
                    <!-- File names -->
                    <div v-if="oldFileName || newFileName" class="flex items-center gap-2 text-sm">
                        <span v-if="oldFileName" class="text-error">{{ oldFileName }}</span>
                        <span v-if="oldFileName && newFileName">↔</span>
                        <span v-if="newFileName" class="text-success">{{ newFileName }}</span>
                    </div>

                    <!-- Stats -->
                    <div v-if="showStats" class="flex items-center gap-3 text-xs">
                        <span class="text-success">+{{ additionsCount }}</span>
                        <span class="text-error">-{{ deletionsCount }}</span>
                        <span class="opacity-60">{{ totalLines }} lines</span>
                    </div>
                </div>

                <!-- Actions -->
                <div v-if="actions.length > 0" class="flex gap-2">
                    <button
                        v-for="action in actions"
                        :key="action.label"
                        :class="getActionClasses(action)"
                        :disabled="action.disabled"
                        @click="handleActionClick(action, $event)"
                    >
                        {{ action.label }}
                    </button>
                </div>
            </div>
        </div>

        <!-- Diff content -->
        <div :class="contentClasses">
            <div v-if="mode === 'split'" class="diff-split">
                <!-- Old/Left side -->
                <table
                    class="diff-old bg-error/5 w-full"
                    role="table"
                    aria-label="Original version"
                >
                    <tbody>
                        <tr
                            v-for="(line, index) in oldLines"
                            :key="index"
                            :class="getLineClasses('old', line)"
                            role="row"
                        >
                            <td class="line-number" role="cell">
                                {{ getOldLineNumber(index) }}
                            </td>
                            <td class="line-content" role="cell">
                                {{ typeof line === 'string' ? line : line.content }}
                            </td>
                        </tr>
                    </tbody>
                </table>

                <!-- New/Right side -->
                <table
                    class="diff-new bg-success/5 w-full"
                    role="table"
                    aria-label="Modified version"
                >
                    <tbody>
                        <tr
                            v-for="(line, index) in newLines"
                            :key="index"
                            :class="getLineClasses('new', line)"
                            role="row"
                        >
                            <td class="line-number" role="cell">
                                {{ getNewLineNumber(index) }}
                            </td>
                            <td class="line-content" role="cell">
                                {{ typeof line === 'string' ? line : line.content }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div v-else class="diff-unified">
                <table class="w-full" role="table" aria-label="Unified diff view">
                    <tbody>
                        <tr
                            v-for="(line, index) in unifiedLines"
                            :key="index"
                            :class="getLineClasses('unified', line)"
                            role="row"
                        >
                            <td class="line-number old" role="cell">
                                {{ line.oldLineNumber || '' }}
                            </td>
                            <td class="line-number new" role="cell">
                                {{ line.newLineNumber || '' }}
                            </td>
                            <td class="line-prefix" role="cell">
                                {{ line.prefix || ' ' }}
                            </td>
                            <td class="line-content" role="cell">
                                {{ line.content }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface DiffAction {
    label: string
    variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'outline'
    size?: 'xs' | 'sm' | 'md'
    disabled?: boolean
    handler?: () => void
}

interface DiffLine {
    content: string
    type?: 'added' | 'removed' | 'context' | 'info'
    oldLineNumber?: number | null
    newLineNumber?: number | null
    prefix?: string
}

interface Props {
    oldText?: string
    newText?: string
    oldLines?: (string | DiffLine)[]
    newLines?: (string | DiffLine)[]
    unifiedLines?: DiffLine[]
    mode?: 'unified' | 'split'
    oldFileName?: string
    newFileName?: string
    showHeader?: boolean
    showStats?: boolean
    showLineNumbers?: boolean
    highlightWords?: boolean
    size?: 'sm' | 'md' | 'lg'
    actions?: DiffAction[]
}

const props = withDefaults(defineProps<Props>(), {
    mode: 'unified',
    showHeader: true,
    showStats: true,
    showLineNumbers: true,
    highlightWords: false,
    size: 'md',
    actions: () => [],
})

const emit = defineEmits<{
    actionClick: [action: DiffAction, event: Event]
}>()

const textDiffClasses = computed(() => {
    const baseClasses = ['diff', 'border', 'border-base-300', 'rounded-lg', 'overflow-hidden']

    // Size
    if (props.size === 'sm') {
        baseClasses.push('text-sm')
    } else if (props.size === 'lg') {
        baseClasses.push('text-lg')
    }

    return baseClasses.join(' ')
})

const headerClasses = computed(() => {
    const baseClasses = [
        'diff-header',
        'bg-base-200',
        'border-b',
        'border-base-300',
        'px-4',
        'py-3',
    ]
    return baseClasses.join(' ')
})

const contentClasses = computed(() => {
    const baseClasses = ['diff-content', 'font-mono', 'text-sm', 'overflow-x-auto']
    return baseClasses.join(' ')
})

// Compute lines from text if not provided
const oldLines = computed(() => {
    if (props.oldLines) return props.oldLines
    if (props.oldText) return props.oldText.split('\n')
    return []
})

const newLines = computed(() => {
    if (props.newLines) return props.newLines
    if (props.newText) return props.newText.split('\n')
    return []
})

const unifiedLines = computed(() => {
    if (props.unifiedLines) return props.unifiedLines

    // Simple unified diff generation from old/new lines
    const result: DiffLine[] = []
    const old = oldLines.value
    const newL = newLines.value

    const maxLength = Math.max(old.length, newL.length)

    for (let i = 0; i < maxLength; i++) {
        const oldLine = old[i]
        const newLine = newL[i]

        if (oldLine && newLine) {
            const oldContent = typeof oldLine === 'string' ? oldLine : oldLine.content
            const newContent = typeof newLine === 'string' ? newLine : newLine.content

            if (oldContent === newContent) {
                // Context line
                result.push({
                    content: oldContent,
                    type: 'context',
                    oldLineNumber: i + 1,
                    newLineNumber: i + 1,
                    prefix: ' ',
                })
            } else {
                // Changed lines
                result.push({
                    content: oldContent,
                    type: 'removed',
                    oldLineNumber: i + 1,
                    newLineNumber: null,
                    prefix: '-',
                })
                result.push({
                    content: newContent,
                    type: 'added',
                    oldLineNumber: null,
                    newLineNumber: i + 1,
                    prefix: '+',
                })
            }
        } else if (oldLine) {
            // Removed line
            const content = typeof oldLine === 'string' ? oldLine : oldLine.content
            result.push({
                content,
                type: 'removed',
                oldLineNumber: i + 1,
                newLineNumber: null,
                prefix: '-',
            })
        } else if (newLine) {
            // Added line
            const content = typeof newLine === 'string' ? newLine : newLine.content
            result.push({
                content,
                type: 'added',
                oldLineNumber: null,
                newLineNumber: i + 1,
                prefix: '+',
            })
        }
    }

    return result
})

const additionsCount = computed(() => {
    return unifiedLines.value.filter((line) => line.type === 'added').length
})

const deletionsCount = computed(() => {
    return unifiedLines.value.filter((line) => line.type === 'removed').length
})

const totalLines = computed(() => {
    return Math.max(oldLines.value.length, newLines.value.length)
})

const getLineClasses = (mode: string, line: string | DiffLine) => {
    const baseClasses = ['diff-line']

    if (mode === 'unified' && typeof line === 'object') {
        if (line.type === 'added') {
            baseClasses.push('bg-success/10', 'text-success-content')
        } else if (line.type === 'removed') {
            baseClasses.push('bg-error/10', 'text-error-content')
        } else if (line.type === 'info') {
            baseClasses.push('bg-info/10', 'text-info-content', 'font-semibold')
        }
    } else if (mode === 'old') {
        baseClasses.push('bg-error/5')
    } else if (mode === 'new') {
        baseClasses.push('bg-success/5')
    }

    return baseClasses.join(' ')
}

const getOldLineNumber = (index: number) => {
    if (!props.showLineNumbers) return ''
    return index + 1
}

const getNewLineNumber = (index: number) => {
    if (!props.showLineNumbers) return ''
    return index + 1
}

const getActionClasses = (action: DiffAction) => {
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

const handleActionClick = (action: DiffAction, event: Event) => {
    if (action.disabled) return

    if (action.handler) {
        action.handler()
    }

    emit('actionClick', action, event)
}
</script>

<template>
    <div :class="mockupClasses">
        <pre
            v-for="(line, index) in codeLines"
            :key="index"
            :data-prefix="line.prefix"
            :class="getLineClasses(line)"
        >
            <code>{{ line.content }}</code>
        </pre>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface CodeLine {
    content: string
    prefix?: string
    highlight?: boolean
    color?: 'warning' | 'success' | 'error' | 'info'
}

interface Props {
    /** Code content as string or array of lines */
    code?: string | CodeLine[]
    /** DaisyUI color variant */
    variant?:
        | 'default'
        | 'primary'
        | 'secondary'
        | 'accent'
        | 'neutral'
        | 'info'
        | 'success'
        | 'warning'
        | 'error'
    /** Language for syntax highlighting */
    language?: string
    /** Show line numbers as prefix */
    showLineNumbers?: boolean
    /** Custom CSS classes */
    class?: string
}

const props = withDefaults(defineProps<Props>(), {
    code: 'console.log("Hello, World!");',
    variant: 'default',
    showLineNumbers: false,
})

// Parse code into lines with proper structure
const codeLines = computed((): CodeLine[] => {
    if (Array.isArray(props.code)) {
        return props.code
    }

    const lines = props.code.split('\n')
    return lines.map((line, index) => ({
        content: line,
        prefix: props.showLineNumbers ? (index + 1).toString() : undefined,
    }))
})

const mockupClasses = computed(() => {
    const baseClasses = ['mockup-code', 'w-full']

    // Add variant classes
    if (props.variant !== 'default') {
        baseClasses.push(`bg-${props.variant}`)
        baseClasses.push(`text-${props.variant}-content`)
    }

    // Add custom classes
    if (props.class) {
        baseClasses.push(props.class)
    }

    return baseClasses.join(' ')
})

function getLineClasses(line: CodeLine): string[] {
    const classes = []

    // Add color classes for highlighted lines
    if (line.color) {
        classes.push(`text-${line.color}`)
        if (line.highlight) {
            classes.push(`bg-${line.color}`)
            classes.push(`text-${line.color}-content`)
        }
    }

    return classes
}
</script>

<style scoped lang="postcss">
/* DaisyUI handles most mockup styling */
.mockup-code {
    @apply font-mono text-sm;
}

/* Ensure proper scrolling for long lines */
.mockup-code pre {
    @apply overflow-x-auto;
}
</style>

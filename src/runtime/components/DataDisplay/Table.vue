<template>
<div class="overflow-x-auto">
    <table :class="tableClasses">
        <thead v-if="showHeader">
            <tr>
                <th
                    v-for="column in columns"
                    :key="column.key"
                    :class="getHeaderClasses(column)"
                    @click="handleSort(column)"
                >
                    <div class="flex items-center gap-2">
                        <span>{{ column.title }}</span>
                        <span
                            v-if="column.sortable"
                            class="text-xs opacity-50"
                        >
                            <span v-if="sortKey === column.key">
                                {{ sortOrder === 'asc' ? '↑' : '↓' }}
                            </span>
                            <span v-else>↕</span>
                        </span>
                    </div>
                </th>
            </tr>
        </thead>
        <tbody>
            <slot>
                <tr
                    v-for="(row, index) in sortedData"
                    :key="getRowKey(row, index)"
                    :class="getRowClasses()"
                    @click="handleRowClick(row, index, $event)"
                >
                    <td
                        v-for="column in columns"
                        :key="column.key"
                        :class="getCellClasses(column)"
                    >
                        <slot
                            :name="`cell-${column.key}`"
                            :row="row"
                            :column="column"
                            :value="getCellValue(row, column)"
                            :index="index"
                        >
                            <component
                                :is="column.component"
                                v-if="column.component"
                                v-bind="column.componentProps"
                                :value="getCellValue(row, column)"
                                :row="row"
                            />
                            <span v-else>{{ formatCellValue(getCellValue(row, column), column) }}</span>
                        </slot>
                    </td>
                </tr>
            </slot>
        </tbody>
    </table>

    <div
        v-if="loading"
        class="flex justify-center items-center p-8"
    >
        <span class="loading loading-spinner loading-lg" />
    </div>

    <div
        v-if="!loading && sortedData.length === 0"
        class="text-center p-8 text-base-content/70"
    >
        <slot name="empty">
            {{ emptyText }}
        </slot>
    </div>
</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface TableColumn {
    key: string
    title: string
    sortable?: boolean
    width?: string
    align?: 'left' | 'center' | 'right'
    format?: 'text' | 'number' | 'currency' | 'date' | 'boolean'
    component?: string
    componentProps?: Record<string, unknown>
}

interface Props {
    columns: TableColumn[]
    data?: Record<string, unknown>[]
    size?: 'xs' | 'sm' | 'md' | 'lg'
    variant?: 'default' | 'zebra' | 'compact' | 'bordered'
    selectable?: boolean
    hoverable?: boolean
    loading?: boolean
    showHeader?: boolean
    emptyText?: string
    rowKey?: string
}

const props = withDefaults(defineProps<Props>(), {
    data: () => [],
    size: 'md',
    variant: 'default',
    selectable: false,
    hoverable: true,
    loading: false,
    showHeader: true,
    emptyText: 'No data available',
    rowKey: 'id',
})

const emit = defineEmits<{
    'row-click': [row: Record<string, unknown>, index: number, event: Event]
    'sort-change': [column: TableColumn, order: 'asc' | 'desc']
}>()

const sortKey = ref<string>('')
const sortOrder = ref<'asc' | 'desc'>('asc')

const tableClasses = computed(() => {
    const baseClasses = ['table', 'w-full']

    // Size classes
    if (props.size === 'xs') {
        baseClasses.push('table-xs')
    }
    else if (props.size === 'sm') {
        baseClasses.push('table-sm')
    }
    else if (props.size === 'lg') {
        baseClasses.push('table-lg')
    }

    // Variant classes
    if (props.variant === 'zebra') {
        baseClasses.push('table-zebra')
    }
    else if (props.variant === 'compact') {
        baseClasses.push('table-compact')
    }
    else if (props.variant === 'bordered') {
        baseClasses.push('table-bordered')
    }

    // Interactive classes
    if (props.hoverable) {
        baseClasses.push('table-hover')
    }

    return baseClasses.join(' ')
})

const sortedData = computed(() => {
    if (!sortKey.value) return props.data

    return [...props.data].sort((a, b) => {
        const aVal = getCellValue(a, { key: sortKey.value } as TableColumn)
        const bVal = getCellValue(b, { key: sortKey.value } as TableColumn)

        let comparison = 0

        if (aVal < bVal) comparison = -1
        if (aVal > bVal) comparison = 1

        return sortOrder.value === 'desc' ? -comparison : comparison
    })
})

const getHeaderClasses = (column: TableColumn): string => {
    const classes = []

    if (column.sortable) {
        classes.push('cursor-pointer', 'hover:bg-base-200', 'transition-colors')
    }

    if (column.align === 'center') {
        classes.push('text-center')
    }
    else if (column.align === 'right') {
        classes.push('text-right')
    }

    return classes.join(' ')
}

const getRowClasses = (): string => {
    const classes = []

    if (props.selectable) {
        classes.push('cursor-pointer')
    }

    return classes.join(' ')
}

const getCellClasses = (column: TableColumn): string => {
    const classes = []

    if (column.align === 'center') {
        classes.push('text-center')
    }
    else if (column.align === 'right') {
        classes.push('text-right')
    }

    return classes.join(' ')
}

const getRowKey = (row: Record<string, unknown>, index: number): string => {
    return row[props.rowKey] || index.toString()
}

const getCellValue = (row: Record<string, unknown>, column: TableColumn): unknown => {
    return row[column.key]
}

const formatCellValue = (value: unknown, column: TableColumn): string => {
    if (value == null) return ''

    switch (column.format) {
        case 'number':
            return typeof value === 'number' ? value.toLocaleString() : String(value)
        case 'currency':
            return typeof value === 'number'
                ? value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
                : String(value)
        case 'date':
            return value instanceof Date ? value.toLocaleDateString() : String(value)
        case 'boolean':
            return value ? 'Yes' : 'No'
        default:
            return String(value)
    }
}

const handleSort = (column: TableColumn) => {
    if (!column.sortable) return

    if (sortKey.value === column.key) {
        sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
    }
    else {
        sortKey.value = column.key
        sortOrder.value = 'asc'
    }

    emit('sort-change', column, sortOrder.value)
}

const handleRowClick = (row: Record<string, unknown>, index: number, event: Event) => {
    if (props.selectable) {
        emit('row-click', row, index, event)
    }
}
</script>

<style scoped lang="postcss">
/* DaisyUI handles most table styling */
</style>

<template>
    <div :class="wrapperClasses" :aria-label="ariaLabel">
        <!-- Header -->
        <div class="migration-header">
            <div class="flex items-center justify-between mb-6">
                <div>
                    <h2 class="text-2xl font-bold text-base-content">{{ title }}</h2>
                    <p v-if="description" class="text-sm text-base-content/70 mt-1">
                        {{ description }}
                    </p>
                </div>
                <div class="flex items-center gap-2">
                    <Badge :color="linkedPairs.length > 0 ? 'success' : 'neutral'">
                        {{ linkedPairs.length }} / {{ oldData.length }} Linked
                    </Badge>
                    <Button
                        v-if="showAutoMatch"
                        variant="primary"
                        size="sm"
                        :icon-left="SparklesIcon"
                        :loading="isAutoMatching"
                        :disabled="isAutoMatching || linkedPairs.length === oldData.length"
                        @click="handleAutoMatch"
                    >
                        Auto-Match
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        :icon-left="RefreshCwIcon"
                        :disabled="linkedPairs.length === 0"
                        @click="handleReset"
                    >
                        Reset
                    </Button>
                </div>
            </div>

            <!-- Progress Bar -->
            <Progress
                :value="progressPercentage"
                :max="100"
                :color="progressPercentage === 100 ? 'success' : 'primary'"
                size="sm"
                class="mb-6"
            />
        </div>

        <!-- Migration Tables -->
        <div class="migration-content" :class="layoutClasses">
            <!-- Old Data Table -->
            <div class="migration-panel old-data-panel">
                <div class="panel-header">
                    <h3 class="text-lg font-semibold flex items-center gap-2">
                        <component :is="DatabaseIcon" :size="20" />
                        Old Data ({{ oldData.length }})
                    </h3>
                    <Input
                        v-model="oldSearchQuery"
                        type="text"
                        placeholder="Search old data..."
                        size="sm"
                        class="mt-2"
                        :icon-left="SearchIcon"
                    />
                </div>

                <div ref="oldTableRef" class="table-container">
                    <div class="overflow-x-auto">
                        <table class="table table-sm table-zebra table-pin-rows">
                            <thead>
                                <tr
                                    v-for="headerGroup in oldTable.getHeaderGroups()"
                                    :key="headerGroup.id"
                                >
                                    <th
                                        v-for="header in headerGroup.headers"
                                        :key="header.id"
                                        :class="header.column.columnDef.meta?.className"
                                        :style="header.column.columnDef.meta?.style"
                                    >
                                        <FlexRender
                                            v-if="!header.isPlaceholder"
                                            :render="header.column.columnDef.header"
                                            :props="header.getContext()"
                                        />
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="row in oldTable.getRowModel().rows"
                                    :key="row.id"
                                    :class="getOldRowClasses(row.original)"
                                    :data-old-id="getItemKey(row.original)"
                                    @click="handleOldItemClick(row.original)"
                                >
                                    <td
                                        v-for="cell in row.getVisibleCells()"
                                        :key="cell.id"
                                        :class="cell.column.columnDef.meta?.className"
                                        :style="cell.column.columnDef.meta?.style"
                                    >
                                        <FlexRender
                                            :render="cell.column.columnDef.cell"
                                            :props="cell.getContext()"
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div
                        v-if="oldTable.getRowModel().rows.length === 0"
                        class="text-center py-8 text-base-content/70"
                    >
                        <component :is="SearchXIcon" :size="48" class="mx-auto mb-2 opacity-30" />
                        <p>No matching old data found</p>
                    </div>
                </div>
            </div>

            <!-- Connection Lines Canvas -->
            <div ref="connectionsRef" class="migration-connections">
                <svg
                    ref="svgRef"
                    class="connections-svg"
                    :width="svgDimensions.width"
                    :height="svgDimensions.height"
                >
                    <g v-for="pair in visibleConnections" :key="`${pair.oldId}-${pair.newId}`">
                        <path
                            :d="getConnectionPath(pair)"
                            :stroke="getConnectionColor(pair)"
                            stroke-width="2"
                            fill="none"
                            :class="getConnectionClasses(pair)"
                            @click="handleConnectionClick(pair)"
                        />
                        <circle
                            v-if="showConnectionDots"
                            :cx="getConnectionStart(pair).x"
                            :cy="getConnectionStart(pair).y"
                            r="4"
                            :fill="getConnectionColor(pair)"
                        />
                        <circle
                            v-if="showConnectionDots"
                            :cx="getConnectionEnd(pair).x"
                            :cy="getConnectionEnd(pair).y"
                            r="4"
                            :fill="getConnectionColor(pair)"
                        />
                    </g>
                </svg>
            </div>

            <!-- New Data Table -->
            <div class="migration-panel new-data-panel">
                <div class="panel-header">
                    <h3 class="text-lg font-semibold flex items-center gap-2">
                        <component :is="DatabaseIcon" :size="20" />
                        New Data ({{ newData.length }})
                    </h3>
                    <Input
                        v-model="newSearchQuery"
                        type="text"
                        placeholder="Search new data..."
                        size="sm"
                        class="mt-2"
                        :icon-left="SearchIcon"
                    />
                </div>

                <div ref="newTableRef" class="table-container">
                    <div class="overflow-x-auto">
                        <table class="table table-sm table-zebra table-pin-rows">
                            <thead>
                                <tr
                                    v-for="headerGroup in newTable.getHeaderGroups()"
                                    :key="headerGroup.id"
                                >
                                    <th
                                        v-for="header in headerGroup.headers"
                                        :key="header.id"
                                        :class="header.column.columnDef.meta?.className"
                                        :style="header.column.columnDef.meta?.style"
                                    >
                                        <FlexRender
                                            v-if="!header.isPlaceholder"
                                            :render="header.column.columnDef.header"
                                            :props="header.getContext()"
                                        />
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="row in newTable.getRowModel().rows"
                                    :key="row.id"
                                    :class="getNewRowClasses(row.original)"
                                    :data-new-id="getItemKey(row.original)"
                                    @click="handleNewItemClick(row.original)"
                                >
                                    <td
                                        v-for="cell in row.getVisibleCells()"
                                        :key="cell.id"
                                        :class="cell.column.columnDef.meta?.className"
                                        :style="cell.column.columnDef.meta?.style"
                                    >
                                        <FlexRender
                                            :render="cell.column.columnDef.cell"
                                            :props="cell.getContext()"
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div
                        v-if="newTable.getRowModel().rows.length === 0"
                        class="text-center py-8 text-base-content/70"
                    >
                        <component :is="SearchXIcon" :size="48" class="mx-auto mb-2 opacity-30" />
                        <p>No matching new data found</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Actions Footer -->
        <div class="migration-footer">
            <div class="flex items-center justify-between">
                <div class="text-sm text-base-content/70">
                    <span v-if="selectedOldItem || selectedNewItem" class="flex items-center gap-2">
                        <component :is="InfoIcon" :size="16" />
                        {{ getLinkingHint() }}
                    </span>
                </div>
                <div class="flex gap-2">
                    <Button variant="ghost" size="sm" :disabled="!canExport" @click="handleExport">
                        Export Mappings
                    </Button>
                    <Button
                        variant="success"
                        size="sm"
                        :disabled="!canComplete"
                        :icon-right="ArrowRightIcon"
                        @click="handleComplete"
                    >
                        Complete Migration
                    </Button>
                </div>
            </div>
        </div>

        <!-- Confirmation Modal -->
        <Modal v-model="showResetModal" title="Reset Migration">
            <p class="text-base-content/70 mb-4">
                Are you sure you want to reset all linked pairs? This action cannot be undone.
            </p>
            <template #actions>
                <Button variant="ghost" @click="showResetModal = false">Cancel</Button>
                <Button variant="error" @click="confirmReset">Reset All</Button>
            </template>
        </Modal>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, nextTick, h } from 'vue'
import Fuse from 'fuse.js'
import {
    createColumnHelper,
    FlexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    useVueTable,
    type ColumnDef,
    type Row,
    type SortingState,
    type ColumnFiltersState,
} from '@tanstack/vue-table'
import Button from '../Actions/Button.vue'
import Badge from '../DataDisplay/Badge.vue'
import Progress from '../Feedback/Progress.vue'
import Input from './Input.vue'
import Status from '../DataDisplay/Status.vue'
import Modal from '../Actions/Modal.vue'
import {
    Database as DatabaseIcon,
    Search as SearchIcon,
    SearchX as SearchXIcon,
    Sparkles as SparklesIcon,
    RefreshCw as RefreshCwIcon,
    Info as InfoIcon,
    ArrowRight as ArrowRightIcon,
    Circle as CircleIcon,
    CheckCircle2 as CheckCircle2Icon,
} from 'lucide-vue-next'

/**
 * DataMigration Component
 *
 * A comprehensive data migration interface that helps users link old data to new data
 * with intelligent auto-matching, visual connections, and progress tracking.
 *
 * @example
 * ```vue
 * <DataMigration
 *   :old-data="legacyUsers"
 *   :new-data="modernUsers"
 *   key-field="id"
 *   display-field="name"
 *   @complete="handleMigrationComplete"
 * />
 * ```
 */

interface MigrationItem {
    [key: string]: unknown
}

interface LinkedPair {
    oldId: string | number
    newId: string | number
    confidence?: number
}

interface Props {
    /** Array of old data items to migrate from */
    oldData: MigrationItem[]
    /** Array of new data items to migrate to */
    newData: MigrationItem[]
    /** Field to use as unique identifier (default: "id") */
    keyField?: string
    /** Field to display in the tables (default: "name") */
    displayField?: string
    /** Title for the migration interface */
    title?: string
    /** Description text */
    description?: string
    /** Show auto-match button */
    showAutoMatch?: boolean
    /** Show match confidence scores */
    showMatchScore?: boolean
    /** Show connection dots on lines */
    showConnectionDots?: boolean
    /** Minimum confidence threshold for auto-matching (0-1) */
    confidenceThreshold?: number
    /** Layout orientation */
    layout?: 'horizontal' | 'vertical'
    /** Allow multiple new items to link to same old item */
    allowMultipleLinks?: boolean
    /** Accessibility label */
    ariaLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
    keyField: 'id',
    displayField: 'name',
    title: 'Data Migration',
    description: 'Link old data entries to their corresponding new data entries',
    showAutoMatch: true,
    showMatchScore: true,
    showConnectionDots: true,
    confidenceThreshold: 0.6,
    layout: 'horizontal',
    allowMultipleLinks: false,
    ariaLabel: 'Data migration interface',
})

const emit = defineEmits<{
    'link-created': [pair: LinkedPair]
    'link-removed': [pair: LinkedPair]
    'auto-match-complete': [pairs: LinkedPair[]]
    complete: [mappings: LinkedPair[]]
    export: [mappings: LinkedPair[]]
}>()

// Local state (no Pinia needed!)
const linkedPairs = ref<LinkedPair[]>([])

// Refs
const oldTableRef = ref<HTMLElement>()
const newTableRef = ref<HTMLElement>()
const connectionsRef = ref<HTMLElement>()
const svgRef = ref<SVGSVGElement>()

// State
const selectedOldItem = ref<MigrationItem | null>(null)
const selectedNewItem = ref<MigrationItem | null>(null)
const oldSearchQuery = ref('')
const newSearchQuery = ref('')
const isAutoMatching = ref(false)
const showResetModal = ref(false)
const svgDimensions = ref({ width: 0, height: 0 })

// TanStack Table state
const oldSorting = ref<SortingState>([])
const newSorting = ref<SortingState>([])
const oldColumnFilters = ref<ColumnFiltersState>([])
const newColumnFilters = ref<ColumnFiltersState>([])

// Column helper
const columnHelper = createColumnHelper<MigrationItem>()

// Column definitions for old data table
const oldColumns = computed<ColumnDef<MigrationItem>[]>(() => [
    columnHelper.display({
        id: 'index',
        header: '#',
        cell: ({ row }: { row: Row<MigrationItem> }) => row.index + 1,
        meta: {
            className: 'w-12',
        },
    }),
    columnHelper.accessor(props.displayField, {
        id: 'display',
        header: props.displayField,
        cell: ({ row }: { row: Row<MigrationItem> }) => {
            const item = row.original
            return h('div', { class: 'flex items-center gap-2' }, [
                h(isLinked(item) ? CheckCircle2Icon : CircleIcon, {
                    size: 16,
                    class: isLinked(item) ? 'text-success' : 'text-base-content/30',
                }),
                h('span', getDisplayValue(item)),
            ])
        },
    }),
    ...(props.showMatchScore
        ? [
              columnHelper.display({
                  id: 'matchScore',
                  header: 'Match',
                  cell: ({ row }: { row: Row<MigrationItem> }) => {
                      const item = row.original
                      const score = getMatchScore(item)
                      return score
                          ? h(
                                Badge,
                                {
                                    color: getMatchScoreColor(score),
                                    size: 'sm',
                                },
                                () => `${Math.round(score * 100)}%`
                            )
                          : null
                  },
                  meta: {
                      className: 'text-center w-24',
                  },
              }),
          ]
        : []),
    columnHelper.display({
        id: 'status',
        header: 'Status',
        cell: ({ row }: { row: Row<MigrationItem> }) => {
            const item = row.original
            return h(Status, {
                color: isLinked(item) ? 'success' : 'neutral',
                size: 'xs',
            })
        },
        meta: {
            className: 'text-center w-24',
        },
    }),
])

// Column definitions for new data table
const newColumns = computed<ColumnDef<MigrationItem>[]>(() => [
    columnHelper.display({
        id: 'index',
        header: '#',
        cell: ({ row }: { row: Row<MigrationItem> }) => row.index + 1,
        meta: {
            className: 'w-12',
        },
    }),
    columnHelper.accessor(props.displayField, {
        id: 'display',
        header: props.displayField,
        cell: ({ row }: { row: Row<MigrationItem> }) => {
            const item = row.original
            return h('div', { class: 'flex items-center gap-2' }, [
                h(isLinkedTarget(item) ? CheckCircle2Icon : CircleIcon, {
                    size: 16,
                    class: isLinkedTarget(item) ? 'text-success' : 'text-base-content/30',
                }),
                h('span', getDisplayValue(item)),
            ])
        },
    }),
    ...(props.showMatchScore
        ? [
              columnHelper.display({
                  id: 'reverseMatchScore',
                  header: 'Match',
                  cell: ({ row }: { row: Row<MigrationItem> }) => {
                      const item = row.original
                      const score = getReverseMatchScore(item)
                      return score
                          ? h(
                                Badge,
                                {
                                    color: getMatchScoreColor(score),
                                    size: 'sm',
                                },
                                () => `${Math.round(score * 100)}%`
                            )
                          : null
                  },
                  meta: {
                      className: 'text-center w-24',
                  },
              }),
          ]
        : []),
    columnHelper.display({
        id: 'status',
        header: 'Status',
        cell: ({ row }: { row: Row<MigrationItem> }) => {
            const item = row.original
            return h(Status, {
                color: isLinkedTarget(item) ? 'success' : 'neutral',
                size: 'xs',
            })
        },
        meta: {
            className: 'text-center w-24',
        },
    }),
])

// Fuse.js instances for fuzzy matching (must be before filtered data)
const oldFuse = computed(
    () =>
        new Fuse(props.oldData, {
            keys: [props.displayField],
            threshold: 0.4,
            includeScore: true,
        })
)

const newFuse = computed(
    () =>
        new Fuse(props.newData, {
            keys: [props.displayField],
            threshold: 0.4,
            includeScore: true,
        })
)

// Filtered data (must be before tables)
const filteredOldData = computed(() => {
    if (!oldSearchQuery.value) return props.oldData

    const results = oldFuse.value.search(oldSearchQuery.value)
    return results.map((result) => result.item)
})

const filteredNewData = computed(() => {
    if (!newSearchQuery.value) return props.newData

    const results = newFuse.value.search(newSearchQuery.value)
    return results.map((result) => result.item)
})

// TanStack Tables
const oldTable = useVueTable({
    get data() {
        return filteredOldData.value
    },
    get columns() {
        return oldColumns.value
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    get state() {
        return {
            sorting: oldSorting.value,
            columnFilters: oldColumnFilters.value,
        }
    },
    onSortingChange: (updaterOrValue: SortingState | ((prev: SortingState) => SortingState)) => {
        oldSorting.value =
            typeof updaterOrValue === 'function' ? updaterOrValue(oldSorting.value) : updaterOrValue
    },
    onColumnFiltersChange: (
        updaterOrValue: ColumnFiltersState | ((prev: ColumnFiltersState) => ColumnFiltersState)
    ) => {
        oldColumnFilters.value =
            typeof updaterOrValue === 'function'
                ? updaterOrValue(oldColumnFilters.value)
                : updaterOrValue
    },
})

const newTable = useVueTable({
    get data() {
        return filteredNewData.value
    },
    get columns() {
        return newColumns.value
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    get state() {
        return {
            sorting: newSorting.value,
            columnFilters: newColumnFilters.value,
        }
    },
    onSortingChange: (updaterOrValue: SortingState | ((prev: SortingState) => SortingState)) => {
        newSorting.value =
            typeof updaterOrValue === 'function' ? updaterOrValue(newSorting.value) : updaterOrValue
    },
    onColumnFiltersChange: (
        updaterOrValue: ColumnFiltersState | ((prev: ColumnFiltersState) => ColumnFiltersState)
    ) => {
        newColumnFilters.value =
            typeof updaterOrValue === 'function'
                ? updaterOrValue(newColumnFilters.value)
                : updaterOrValue
    },
})

// Additional Computed Properties
const wrapperClasses = computed(() => [
    'data-migration',
    'w-full',
    'h-full',
    'flex',
    'flex-col',
    'gap-4',
    'p-6',
    'bg-base-100',
    'rounded-box',
])

const layoutClasses = computed(() => [
    'migration-layout',
    props.layout === 'vertical' ? 'flex-col' : 'flex-row',
    'gap-4',
    'relative',
])

const progressPercentage = computed(() => {
    if (props.oldData.length === 0) return 0
    return (linkedPairs.value.length / props.oldData.length) * 100
})

const visibleConnections = computed(() => {
    return linkedPairs.value.filter((pair) => {
        const oldItem = props.oldData.find((item) => getItemKey(item) === pair.oldId)
        const newItem = props.newData.find((item) => getItemKey(item) === pair.newId)

        if (!oldItem || !newItem) return false

        // Filter based on search queries
        const oldVisible = !oldSearchQuery.value || filteredOldData.value.includes(oldItem)
        const newVisible = !newSearchQuery.value || filteredNewData.value.includes(newItem)

        return oldVisible && newVisible
    })
})

const canExport = computed(() => linkedPairs.value.length > 0)

const canComplete = computed(() => {
    // Require all old items to be linked
    return linkedPairs.value.length === props.oldData.length
})

// Methods
/**
 * Add a link between old and new items
 */
const addLink = (oldId: string | number, newId: string | number, confidence?: number) => {
    const existingIndex = linkedPairs.value.findIndex(
        (pair) => pair.oldId === oldId && pair.newId === newId
    )

    if (existingIndex !== -1) {
        // Update existing link
        linkedPairs.value[existingIndex] = {
            ...linkedPairs.value[existingIndex],
            confidence,
        }
    } else {
        // Add new link
        linkedPairs.value.push({ oldId, newId, confidence })
    }
}

/**
 * Remove a link between old and new items
 */
const removeLink = (oldId: string | number, newId: string | number) => {
    const index = linkedPairs.value.findIndex(
        (pair) => pair.oldId === oldId && pair.newId === newId
    )

    if (index !== -1) {
        linkedPairs.value.splice(index, 1)
    }
}

/**
 * Clear all links
 */
const clearLinks = () => {
    linkedPairs.value = []
}

const getItemKey = (item: MigrationItem): string | number => {
    const key = item[props.keyField]
    return key !== null && key !== undefined ? String(key) : ''
}

const getDisplayValue = (item: MigrationItem): string => {
    const value = item[props.displayField]
    return value !== null && value !== undefined ? String(value) : ''
}

const isLinked = (item: MigrationItem): boolean => {
    const key = getItemKey(item)
    return linkedPairs.value.some((pair) => pair.oldId === key)
}

const isLinkedTarget = (item: MigrationItem): boolean => {
    const key = getItemKey(item)
    return linkedPairs.value.some((pair) => pair.newId === key)
}

const getLinkedPair = (oldItem: MigrationItem): LinkedPair | undefined => {
    const key = getItemKey(oldItem)
    return linkedPairs.value.find((pair) => pair.oldId === key)
}

const getMatchScore = (oldItem: MigrationItem): number | null => {
    const pair = getLinkedPair(oldItem)
    return pair?.confidence ?? null
}

const getReverseMatchScore = (newItem: MigrationItem): number | null => {
    const key = getItemKey(newItem)
    const pair = linkedPairs.value.find((p) => p.newId === key)
    return pair?.confidence ?? null
}

const getMatchScoreColor = (score: number): string => {
    if (score >= 0.8) return 'success'
    if (score >= 0.6) return 'warning'
    return 'error'
}

const getOldRowClasses = (item: MigrationItem): string[] => {
    const classes = ['cursor-pointer', 'transition-colors', 'hover:bg-base-200']

    if (selectedOldItem.value && getItemKey(selectedOldItem.value) === getItemKey(item)) {
        classes.push('bg-primary/10', 'border-l-4', 'border-primary')
    }

    if (isLinked(item)) {
        classes.push('opacity-60')
    }

    return classes
}

const getNewRowClasses = (item: MigrationItem): string[] => {
    const classes = ['cursor-pointer', 'transition-colors', 'hover:bg-base-200']

    if (selectedNewItem.value && getItemKey(selectedNewItem.value) === getItemKey(item)) {
        classes.push('bg-secondary/10', 'border-r-4', 'border-secondary')
    }

    if (isLinkedTarget(item)) {
        classes.push('opacity-60')
    }

    return classes
}

const handleOldItemClick = (item: MigrationItem) => {
    // If already linked, unlink
    if (isLinked(item)) {
        const pair = getLinkedPair(item)
        if (pair) {
            removeLink(pair.oldId, pair.newId)
            emit('link-removed', pair)
        }
        selectedOldItem.value = null
        return
    }

    // Select for linking
    selectedOldItem.value = item

    // If new item is selected, create link
    if (selectedNewItem.value) {
        createLink(item, selectedNewItem.value)
    }
}

const handleNewItemClick = (item: MigrationItem) => {
    // If already linked and not allowing multiple, unlink
    if (isLinkedTarget(item) && !props.allowMultipleLinks) {
        const pair = linkedPairs.value.find((p) => p.newId === getItemKey(item))
        if (pair) {
            removeLink(pair.oldId, pair.newId)
            emit('link-removed', pair)
        }
        selectedNewItem.value = null
        return
    }

    // Select for linking
    selectedNewItem.value = item

    // If old item is selected, create link
    if (selectedOldItem.value) {
        createLink(selectedOldItem.value, item)
    }
}

const createLink = (oldItem: MigrationItem, newItem: MigrationItem) => {
    const oldId = getItemKey(oldItem)
    const newId = getItemKey(newItem)

    // Calculate confidence score
    const oldValue = getDisplayValue(oldItem).toLowerCase()
    const newValue = getDisplayValue(newItem).toLowerCase()
    const confidence = calculateSimilarity(oldValue, newValue)

    const pair: LinkedPair = { oldId, newId, confidence }

    addLink(oldId, newId, confidence)
    emit('link-created', pair)

    // Clear selections
    selectedOldItem.value = null
    selectedNewItem.value = null

    // Update connections
    nextTick(() => {
        updateConnections()
    })
}

const calculateSimilarity = (str1: string, str2: string): number => {
    // Levenshtein distance-based similarity
    const longer = str1.length > str2.length ? str1 : str2
    const shorter = str1.length > str2.length ? str2 : str1

    if (longer.length === 0) return 1.0

    const editDistance = levenshteinDistance(longer, shorter)
    return (longer.length - editDistance) / longer.length
}

const levenshteinDistance = (str1: string, str2: string): number => {
    const matrix: number[][] = []

    for (let i = 0; i <= str2.length; i++) {
        matrix[i] = [i]
    }

    for (let j = 0; j <= str1.length; j++) {
        matrix[0][j] = j
    }

    for (let i = 1; i <= str2.length; i++) {
        for (let j = 1; j <= str1.length; j++) {
            if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1]
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j] + 1
                )
            }
        }
    }

    return matrix[str2.length][str1.length]
}

const handleAutoMatch = async () => {
    isAutoMatching.value = true

    try {
        const newPairs: LinkedPair[] = []

        for (const oldItem of props.oldData) {
            // Skip if already linked
            if (isLinked(oldItem)) continue

            // Find best match in new data
            const oldValue = getDisplayValue(oldItem)
            const results = newFuse.value.search(oldValue)

            if (results.length > 0) {
                const bestMatch = results[0]
                const confidence = 1 - (bestMatch.score ?? 1)

                if (confidence >= props.confidenceThreshold) {
                    const oldId = getItemKey(oldItem)
                    const newId = getItemKey(bestMatch.item)

                    // Check if new item is already linked
                    if (!props.allowMultipleLinks && isLinkedTarget(bestMatch.item)) {
                        continue
                    }

                    addLink(oldId, newId, confidence)
                    newPairs.push({ oldId, newId, confidence })
                }
            }
        }

        emit('auto-match-complete', newPairs)

        // Update connections
        await nextTick()
        updateConnections()
    } finally {
        isAutoMatching.value = false
    }
}

const handleReset = () => {
    showResetModal.value = true
}

const confirmReset = () => {
    clearLinks()
    selectedOldItem.value = null
    selectedNewItem.value = null
    showResetModal.value = false
    updateConnections()
}

const handleExport = () => {
    emit('export', linkedPairs.value)
}

const handleComplete = () => {
    emit('complete', linkedPairs.value)
}

const getLinkingHint = (): string => {
    if (selectedOldItem.value && selectedNewItem.value) {
        return 'Click to link selected items'
    }
    if (selectedOldItem.value) {
        return 'Select a new data item to create link'
    }
    if (selectedNewItem.value) {
        return 'Select an old data item to create link'
    }
    return 'Click items to select and create links'
}

// Connection line rendering
const updateConnections = () => {
    if (!connectionsRef.value || !oldTableRef.value || !newTableRef.value) return

    const rect = connectionsRef.value.getBoundingClientRect()
    svgDimensions.value = {
        width: rect.width,
        height: rect.height,
    }
}

const getConnectionPath = (pair: LinkedPair): string => {
    const start = getConnectionStart(pair)
    const end = getConnectionEnd(pair)

    // Bezier curve for smooth connection
    const midX = (start.x + end.x) / 2

    return `M ${start.x} ${start.y} C ${midX} ${start.y}, ${midX} ${end.y}, ${end.x} ${end.y}`
}

const getConnectionStart = (pair: LinkedPair): { x: number; y: number } => {
    if (!oldTableRef.value || !connectionsRef.value) return { x: 0, y: 0 }

    const row = oldTableRef.value.querySelector(`[data-old-id="${pair.oldId}"]`)
    if (!row) return { x: 0, y: 0 }

    const rowRect = row.getBoundingClientRect()
    const containerRect = connectionsRef.value.getBoundingClientRect()

    return {
        x: 0,
        y: rowRect.top - containerRect.top + rowRect.height / 2,
    }
}

const getConnectionEnd = (pair: LinkedPair): { x: number; y: number } => {
    if (!newTableRef.value || !connectionsRef.value) return { x: 0, y: 0 }

    const row = newTableRef.value.querySelector(`[data-new-id="${pair.newId}"]`)
    if (!row) return { x: 0, y: 0 }

    const rowRect = row.getBoundingClientRect()
    const containerRect = connectionsRef.value.getBoundingClientRect()

    return {
        x: svgDimensions.value.width,
        y: rowRect.top - containerRect.top + rowRect.height / 2,
    }
}

const getConnectionColor = (pair: LinkedPair): string => {
    const confidence = pair.confidence ?? 0

    if (confidence >= 0.8) return 'oklch(var(--su))' // success
    if (confidence >= 0.6) return 'oklch(var(--wa))' // warning
    return 'oklch(var(--er))' // error
}

const getConnectionClasses = (_pair: LinkedPair): string[] => {
    return ['connection-line', 'cursor-pointer', 'hover:stroke-width-3', 'transition-all']
}

const handleConnectionClick = (pair: LinkedPair) => {
    removeLink(pair.oldId, pair.newId)
    emit('link-removed', pair)
    updateConnections()
}

// Lifecycle
onMounted(() => {
    // Initialize local state (no store needed!)
    linkedPairs.value = []

    // Setup resize observer
    const resizeObserver = new ResizeObserver(() => {
        updateConnections()
    })

    if (connectionsRef.value) {
        resizeObserver.observe(connectionsRef.value)
    }

    // Initial connection update
    nextTick(() => {
        updateConnections()
    })

    // Cleanup
    onUnmounted(() => {
        resizeObserver.disconnect()
    })
})

// Watch for data changes
watch([() => props.oldData, () => props.newData], () => {
    nextTick(() => {
        updateConnections()
    })
})

// Watch for scroll events to update connections
watch([oldSearchQuery, newSearchQuery], () => {
    nextTick(() => {
        updateConnections()
    })
})
</script>

<style scoped>
.data-migration {
    min-height: 600px;
}

.migration-header {
    border-bottom: 1px solid oklch(var(--bc) / 0.1);
    padding-bottom: 1rem;
}

.migration-content {
    flex: 1;
    min-height: 0;
    display: flex;
}

.migration-panel {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 0;
}

.panel-header {
    padding: 1rem;
    border-bottom: 1px solid oklch(var(--bc) / 0.1);
    background: oklch(var(--b2));
}

.table-container {
    flex: 1;
    overflow-y: auto;
    min-height: 400px;
    max-height: 600px;
}

.migration-connections {
    position: relative;
    width: 100px;
    flex-shrink: 0;
}

.connections-svg {
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
}

.connection-line {
    pointer-events: all;
}

.migration-footer {
    border-top: 1px solid oklch(var(--bc) / 0.1);
    padding-top: 1rem;
}

.migration-layout.flex-col .migration-connections {
    width: 100%;
    height: 100px;
}

.migration-layout.flex-col .table-container {
    max-height: 300px;
}
</style>

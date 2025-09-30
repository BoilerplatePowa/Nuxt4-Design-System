<template>
<div :class="filterClasses">
    <!-- Filter header -->
    <div
        v-if="showHeader"
        :class="headerClasses"
    >
        <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
                <h3
                    v-if="title"
                    class="font-semibold"
                >
                    {{ title }}
                </h3>
                <span
                    v-if="activeFiltersCount > 0"
                    class="badge badge-primary badge-sm"
                >
                    {{ activeFiltersCount }}
                </span>
            </div>

            <div class="flex items-center gap-2">
                <button
                    v-if="activeFiltersCount > 0"
                    class="btn btn-ghost btn-xs"
                    @click="clearAllFilters"
                >
                    Clear All
                </button>

                <button
                    v-if="collapsible"
                    class="btn btn-ghost btn-xs"
                    @click="toggleCollapsed"
                >
                    {{ collapsed ? 'Expand' : 'Collapse' }}
                </button>
            </div>
        </div>
    </div>

    <!-- Active filters display -->
    <div
        v-if="showActiveFilters && activeFilters.length > 0"
        :class="activeFiltersClasses"
    >
        <div class="flex flex-wrap gap-2">
            <div
                v-for="filter in activeFilters"
                :key="getFilterKey(filter)"
                class="badge badge-outline gap-1"
            >
                <span>{{ filter.label }}: {{ filter.value }}</span>
                <button
                    class="btn btn-ghost btn-xs w-4 h-4 p-0 min-h-0"
                    @click="removeFilter(filter)"
                >
                    ×
                </button>
            </div>
        </div>
    </div>

    <!-- Filter controls -->
    <div
        v-if="!collapsed"
        :class="controlsClasses"
    >
        <div
            v-for="(group, groupIndex) in filterGroups"
            :key="groupIndex"
            :class="groupClasses"
        >
            <!-- Group title -->
            <h4
                v-if="group.title"
                class="font-medium mb-2"
            >
                {{ group.title }}
            </h4>

            <!-- Group filters -->
            <div :class="getGroupControlsClasses(group)">
                <div
                    v-for="filter in group.filters"
                    :key="filter.key"
                    :class="getFilterControlClasses(filter)"
                >
                    <!-- Text input -->
                    <div
                        v-if="filter.type === 'text'"
                        class="form-control"
                    >
                        <label
                            v-if="filter.label"
                            class="label label-text text-sm"
                        >{{ filter.label }}</label>
                        <input
                            v-model="filter.value"
                            type="text"
                            :placeholder="filter.placeholder"
                            :class="getInputClasses(filter)"
                            @input="handleFilterChange"
                        >
                    </div>

                    <!-- Select dropdown -->
                    <div
                        v-else-if="filter.type === 'select'"
                        class="form-control"
                    >
                        <label
                            v-if="filter.label"
                            class="label label-text text-sm"
                        >{{ filter.label }}</label>
                        <select
                            v-model="filter.value"
                            :class="getSelectClasses(filter)"
                            @change="handleFilterChange"
                        >
                            <option value="">
                                {{ filter.placeholder || 'Select...' }}
                            </option>
                            <option
                                v-for="option in filter.options"
                                :key="option.value"
                                :value="option.value"
                            >
                                {{ option.label }}
                            </option>
                        </select>
                    </div>

                    <!-- Multi-select checkboxes -->
                    <div
                        v-else-if="filter.type === 'multiselect'"
                        class="form-control"
                    >
                        <label
                            v-if="filter.label"
                            class="label label-text text-sm"
                        >{{ filter.label }}</label>
                        <div class="space-y-1">
                            <label
                                v-for="option in filter.options"
                                :key="option.value"
                                class="flex items-center gap-2 cursor-pointer text-sm"
                            >
                                <input
                                    v-model="filter.value"
                                    type="checkbox"
                                    :value="option.value"
                                    class="checkbox checkbox-sm"
                                    @change="handleFilterChange"
                                >
                                <span>{{ option.label }}</span>
                            </label>
                        </div>
                    </div>

                    <!-- Range input -->
                    <div
                        v-else-if="filter.type === 'range'"
                        class="form-control"
                    >
                        <label
                            v-if="filter.label"
                            class="label label-text text-sm"
                        >{{ filter.label }}</label>
                        <div class="flex items-center gap-2">
                            <input
                                v-model="filter.value.min"
                                type="number"
                                :placeholder="filter.minPlaceholder || 'Min'"
                                :class="getRangeInputClasses(filter)"
                                @input="handleFilterChange"
                            >
                            <span class="text-sm">to</span>
                            <input
                                v-model="filter.value.max"
                                type="number"
                                :placeholder="filter.maxPlaceholder || 'Max'"
                                :class="getRangeInputClasses(filter)"
                                @input="handleFilterChange"
                            >
                        </div>
                    </div>

                    <!-- Date range -->
                    <div
                        v-else-if="filter.type === 'daterange'"
                        class="form-control"
                    >
                        <label
                            v-if="filter.label"
                            class="label label-text text-sm"
                        >{{ filter.label }}</label>
                        <div class="flex items-center gap-2">
                            <input
                                v-model="filter.value.start"
                                type="date"
                                :class="getDateInputClasses(filter)"
                                @change="handleFilterChange"
                            >
                            <span class="text-sm">to</span>
                            <input
                                v-model="filter.value.end"
                                type="date"
                                :class="getDateInputClasses(filter)"
                                @change="handleFilterChange"
                            >
                        </div>
                    </div>

                    <!-- Boolean toggle -->
                    <div
                        v-else-if="filter.type === 'boolean'"
                        class="form-control"
                    >
                        <label class="flex items-center gap-2 cursor-pointer">
                            <input
                                v-model="filter.value"
                                type="checkbox"
                                class="toggle toggle-sm"
                                @change="handleFilterChange"
                            >
                            <span class="text-sm">{{ filter.label }}</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

interface FilterOption {
    label: string
    value: string | number
}

interface FilterControl {
    key: string
    label?: string
    type: 'text' | 'select' | 'multiselect' | 'range' | 'daterange' | 'boolean'
    value?: unknown
    placeholder?: string
    minPlaceholder?: string
    maxPlaceholder?: string
    options?: FilterOption[]
    size?: 'sm' | 'md' | 'lg'
}

interface FilterGroup {
    title?: string
    layout?: 'vertical' | 'horizontal' | 'grid'
    filters: FilterControl[]
}

interface ActiveFilter {
    key: string
    label: string
    value: unknown
}

interface Props {
    filterGroups: FilterGroup[]
    title?: string
    showHeader?: boolean
    showActiveFilters?: boolean
    collapsible?: boolean
    size?: 'sm' | 'md' | 'lg'
    variant?: 'default' | 'bordered' | 'card'
}

const props = withDefaults(defineProps<Props>(), {
    showHeader: true,
    showActiveFilters: true,
    collapsible: false,
    size: 'md',
    variant: 'default',
})

const emit = defineEmits<{
    filterChange: [filters: Record<string, unknown>]
    filterClear: [key: string]
    filterClearAll: []
}>()

const collapsed = ref(false)

const filterClasses = computed(() => {
    const baseClasses = ['filter', 'flex', 'flex-col', 'gap-2']

    // Variant styling
    if (props.variant === 'bordered') {
        baseClasses.push('border', 'border-base-300', 'rounded-lg')
    }
    else if (props.variant === 'card') {
        baseClasses.push('card', 'bg-base-100', 'shadow')
    }

    // Size-based padding
    if (props.size === 'sm') {
        baseClasses.push('p-3')
    }
    else if (props.size === 'lg') {
        baseClasses.push('p-6')
    }
    else {
        baseClasses.push('p-4')
    }

    return baseClasses.join(' ')
})

const headerClasses = computed(() => {
    const baseClasses = ['filter-header']

    if (props.variant === 'card') {
        baseClasses.push('card-header')
    }

    baseClasses.push('mb-4')
    return baseClasses.join(' ')
})

const activeFiltersClasses = computed(() => {
    const baseClasses = ['active-filters', 'mb-4']
    return baseClasses.join(' ')
})

const controlsClasses = computed(() => {
    const baseClasses = ['filter-controls']

    if (props.size === 'sm') {
        baseClasses.push('space-y-3')
    }
    else if (props.size === 'lg') {
        baseClasses.push('space-y-6')
    }
    else {
        baseClasses.push('space-y-4')
    }

    return baseClasses.join(' ')
})

const groupClasses = computed(() => {
    const baseClasses = ['filter-group']
    return baseClasses.join(' ')
})

const activeFilters = computed(() => {
    const filters: ActiveFilter[] = []

    props.filterGroups.forEach((group) => {
        group.filters.forEach((filter) => {
            if (hasValue(filter.value)) {
                filters.push({
                    key: filter.key,
                    label: filter.label || filter.key,
                    value: formatFilterValue(filter),
                })
            }
        })
    })

    return filters
})

const activeFiltersCount = computed(() => activeFilters.value.length)

const allFilters = computed(() => {
    const filters: Record<string, unknown> = {}

    props.filterGroups.forEach((group) => {
        group.filters.forEach((filter) => {
            if (hasValue(filter.value)) {
                filters[filter.key] = filter.value
            }
        })
    })

    return filters
})

const getGroupControlsClasses = (group: FilterGroup) => {
    const baseClasses = []

    if (group.layout === 'horizontal') {
        baseClasses.push('flex', 'flex-wrap', 'gap-4')
    }
    else if (group.layout === 'grid') {
        baseClasses.push('grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3', 'gap-4')
    }
    else {
        baseClasses.push('space-y-3')
    }

    return baseClasses.join(' ')
}

const getFilterControlClasses = (filter: FilterControl) => {
    const baseClasses = ['filter-control']

    if (filter.type === 'boolean') {
        baseClasses.push('flex', 'items-center')
    }

    return baseClasses.join(' ')
}

const getInputClasses = (filter: FilterControl) => {
    const baseClasses = ['input', 'input-bordered']

    if (filter.size === 'sm') {
        baseClasses.push('input-sm')
    }
    else if (filter.size === 'lg') {
        baseClasses.push('input-lg')
    }

    return baseClasses.join(' ')
}

const getSelectClasses = (filter: FilterControl) => {
    const baseClasses = ['select', 'select-bordered']

    if (filter.size === 'sm') {
        baseClasses.push('select-sm')
    }
    else if (filter.size === 'lg') {
        baseClasses.push('select-lg')
    }

    return baseClasses.join(' ')
}

const getRangeInputClasses = (filter: FilterControl) => {
    const baseClasses = ['input', 'input-bordered', 'flex-1']

    if (filter.size === 'sm') {
        baseClasses.push('input-sm')
    }
    else if (filter.size === 'lg') {
        baseClasses.push('input-lg')
    }

    return baseClasses.join(' ')
}

const getDateInputClasses = (filter: FilterControl) => {
    const baseClasses = ['input', 'input-bordered', 'flex-1']

    if (filter.size === 'sm') {
        baseClasses.push('input-sm')
    }
    else if (filter.size === 'lg') {
        baseClasses.push('input-lg')
    }

    return baseClasses.join(' ')
}

const hasValue = (value: unknown) => {
    if (value === null || value === undefined || value === '') return false
    if (Array.isArray(value)) return value.length > 0
    if (typeof value === 'object') {
        return Object.values(value).some(v => v !== null && v !== undefined && v !== '')
    }
    return true
}

const formatFilterValue = (filter: FilterControl) => {
    if (filter.type === 'multiselect' && Array.isArray(filter.value)) {
        return filter.value.join(', ')
    }
    else if (filter.type === 'range' && typeof filter.value === 'object') {
        return `${filter.value.min || ''} - ${filter.value.max || ''}`
    }
    else if (filter.type === 'daterange' && typeof filter.value === 'object') {
        return `${filter.value.start || ''} to ${filter.value.end || ''}`
    }
    else if (filter.type === 'boolean') {
        return filter.value ? 'Yes' : 'No'
    }

    return filter.value
}

const getFilterKey = (filter: ActiveFilter) => {
    return `${filter.key}-${filter.value}`
}

const toggleCollapsed = () => {
    collapsed.value = !collapsed.value
}

const handleFilterChange = () => {
    emit('filterChange', allFilters.value)
}

const removeFilter = (activeFilter: ActiveFilter) => {
    // Find and clear the filter
    props.filterGroups.forEach((group) => {
        group.filters.forEach((filter) => {
            if (filter.key === activeFilter.key) {
                if (filter.type === 'multiselect') {
                    filter.value = []
                }
                else if (filter.type === 'range' || filter.type === 'daterange') {
                    filter.value = {}
                }
                else if (filter.type === 'boolean') {
                    filter.value = false
                }
                else {
                    filter.value = ''
                }
            }
        })
    })

    emit('filterClear', activeFilter.key)
    emit('filterChange', allFilters.value)
}

const clearAllFilters = () => {
    props.filterGroups.forEach((group) => {
        group.filters.forEach((filter) => {
            if (filter.type === 'multiselect') {
                filter.value = []
            }
            else if (filter.type === 'range' || filter.type === 'daterange') {
                filter.value = {}
            }
            else if (filter.type === 'boolean') {
                filter.value = false
            }
            else {
                filter.value = ''
            }
        })
    })

    emit('filterClearAll')
    emit('filterChange', {})
}
</script>

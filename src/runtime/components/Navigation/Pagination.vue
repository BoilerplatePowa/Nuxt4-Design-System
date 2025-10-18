<template>
    <div class="join" role="navigation" aria-label="Pagination">
        <!-- Previous button -->
        <button
            :class="buttonClasses"
            :disabled="currentPage <= 1 || disabled"
            :aria-disabled="currentPage <= 1 || disabled"
            aria-label="Previous page"
            type="button"
            @click="goToPage(currentPage - 1)"
        >
            <slot name="prev-icon">
                <span>«</span>
            </slot>
            <span v-if="showLabels" class="hidden sm:inline ml-2">Previous</span>
        </button>

        <!-- Page numbers -->
        <template v-if="showPageNumbers">
            <!-- First page -->
            <button
                v-if="showFirstLast && currentPage > 3"
                :class="getPageButtonClasses(1)"
                @click="goToPage(1)"
            >
                1
            </button>

            <!-- First ellipsis -->
            <button
                v-if="showFirstLast && currentPage > 4"
                :class="ellipsisClasses"
                disabled
                aria-disabled="true"
                type="button"
            >
                ...
            </button>

            <!-- Visible page numbers -->
            <button
                v-for="page in visiblePages"
                :key="page"
                :class="getPageButtonClasses(page)"
                :aria-current="page === currentPage ? 'page' : undefined"
                :aria-label="`Go to page ${page}`"
                type="button"
                @click="goToPage(page)"
            >
                {{ page }}
            </button>

            <!-- Last ellipsis -->
            <button
                v-if="showFirstLast && currentPage < totalPages - 3"
                :class="ellipsisClasses"
                disabled
                aria-disabled="true"
                type="button"
            >
                ...
            </button>

            <!-- Last page -->
            <button
                v-if="showFirstLast && currentPage < totalPages - 2"
                :class="getPageButtonClasses(totalPages)"
                :aria-current="totalPages === currentPage ? 'page' : undefined"
                :aria-label="`Go to page ${totalPages}`"
                type="button"
                @click="goToPage(totalPages)"
            >
                {{ totalPages }}
            </button>
        </template>

        <!-- Next button -->
        <button
            :class="buttonClasses"
            :disabled="currentPage >= totalPages || disabled"
            :aria-disabled="currentPage >= totalPages || disabled"
            aria-label="Next page"
            type="button"
            @click="goToPage(currentPage + 1)"
        >
            <span v-if="showLabels" class="hidden sm:inline mr-2">Next</span>
            <slot name="next-icon">
                <span>»</span>
            </slot>
        </button>
    </div>

    <!-- Page info -->
    <div v-if="showInfo" class="text-sm text-base-content/70 mt-2 text-center">
        <slot
            name="info"
            :current="currentPage"
            :total="totalPages"
            :start="startItem"
            :end="endItem"
            :total-items="totalItems"
        >
            Showing {{ startItem }} to {{ endItem }} of {{ totalItems }} results
        </slot>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
    currentPage: number
    totalPages: number
    totalItems?: number
    itemsPerPage?: number
    disabled?: boolean
    size?: 'xs' | 'sm' | 'md' | 'lg'
    variant?: 'default' | 'outline' | 'ghost'
    showPageNumbers?: boolean
    showFirstLast?: boolean
    showLabels?: boolean
    showInfo?: boolean
    maxVisiblePages?: number
}

const props = withDefaults(defineProps<Props>(), {
    disabled: false,
    size: 'md',
    variant: 'default',
    showPageNumbers: true,
    showFirstLast: true,
    showLabels: false,
    showInfo: false,
    maxVisiblePages: 5,
    itemsPerPage: 10,
})

const emit = defineEmits<{
    'page-change': [page: number]
}>()

const buttonClasses = computed(() => {
    const baseClasses = ['join-item', 'btn']

    // Size classes
    if (props.size === 'xs') {
        baseClasses.push('btn-xs')
    } else if (props.size === 'sm') {
        baseClasses.push('btn-sm')
    } else if (props.size === 'lg') {
        baseClasses.push('btn-lg')
    }

    // Variant classes
    if (props.variant === 'outline') {
        baseClasses.push('btn-outline')
    } else if (props.variant === 'ghost') {
        baseClasses.push('btn-ghost')
    }

    return baseClasses.join(' ')
})

const ellipsisClasses = computed(() => {
    const baseClasses = ['join-item', 'btn', 'btn-disabled', 'no-animation']

    // Size classes
    if (props.size === 'xs') {
        baseClasses.push('btn-xs')
    } else if (props.size === 'sm') {
        baseClasses.push('btn-sm')
    } else if (props.size === 'lg') {
        baseClasses.push('btn-lg')
    }

    return baseClasses.join(' ')
})

const visiblePages = computed(() => {
    const pages = []
    const maxVisible = props.maxVisiblePages
    const current = props.currentPage
    const total = props.totalPages

    if (total <= maxVisible) {
        // Show all pages if total is small
        for (let i = 1; i <= total; i++) {
            pages.push(i)
        }
    } else {
        // Calculate range around current page
        const half = Math.floor(maxVisible / 2)
        let start = Math.max(1, current - half)
        let end = Math.min(total, current + half)

        // Adjust if we're near the beginning or end
        if (end - start + 1 < maxVisible) {
            if (start === 1) {
                end = Math.min(total, start + maxVisible - 1)
            } else {
                start = Math.max(1, end - maxVisible + 1)
            }
        }

        for (let i = start; i <= end; i++) {
            pages.push(i)
        }
    }

    return pages
})

const startItem = computed(() => {
    if (!props.totalItems) return 1
    return (props.currentPage - 1) * props.itemsPerPage + 1
})

const endItem = computed(() => {
    if (!props.totalItems) return props.itemsPerPage
    return Math.min(props.currentPage * props.itemsPerPage, props.totalItems)
})

const getPageButtonClasses = (page: number): string => {
    const classes = buttonClasses.value.split(' ')

    if (page === props.currentPage) {
        classes.push('btn-active')
    }

    return classes.join(' ')
}

const goToPage = (page: number) => {
    if (page < 1 || page > props.totalPages || page === props.currentPage || props.disabled) {
        return
    }

    emit('page-change', page)
}
</script>

<style scoped lang="postcss">
/* DaisyUI handles most pagination styling */
</style>

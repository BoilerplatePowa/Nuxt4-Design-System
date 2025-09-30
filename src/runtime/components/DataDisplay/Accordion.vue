<template>
<div :class="accordionClasses">
    <slot>
        <div
            v-for="(item, index) in items"
            :key="getItemKey(item, index)"
            class="collapse collapse-arrow"
            :class="getItemClasses(item)"
        >
            <input
                :id="`accordion-${accordionId}-${index}`"
                :type="multiple ? 'checkbox' : 'radio'"
                :name="radioGroupName"
                :checked="isItemOpen(item, index)"
                class="collapse-checkbox"
                @change="handleItemToggle(item, index, $event)"
            >
            <label
                :for="`accordion-${accordionId}-${index}`"
                class="collapse-title text-xl font-medium cursor-pointer"
                :class="{ 'opacity-50 cursor-not-allowed': item.disabled }"
            >
                {{ item.title }}
            </label>
            <div class="collapse-content">
                <div class="pt-2">
                    <div
                        v-if="item.content"
                        v-html="item.content"
                    />
                    <slot
                        v-else
                        :name="`item-${index}`"
                        :item="item"
                        :index="index"
                        :is-open="isItemOpen(item, index)"
                    />
                </div>
            </div>
        </div>
    </slot>
</div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'

// Generate unique ID for each accordion instance
const generateAccordionId = () => `accordion-${Math.random().toString(36).substr(2, 9)}`

interface AccordionItem {
    title: string
    content?: string
    value?: string | number
    disabled?: boolean
    defaultOpen?: boolean
}

interface Props {
    items?: AccordionItem[]
    multiple?: boolean
    variant?: 'default' | 'bordered' | 'compact'
    size?: 'sm' | 'md' | 'lg'
    disabled?: boolean
    id?: string
}

const props = withDefaults(defineProps<Props>(), {
    items: () => [],
    multiple: false,
    variant: 'default',
    size: 'md',
    disabled: false,
    id: undefined,
})

// Use defineModel for Vue 3.4 best practices - renamed to openItem for clarity
const openItem = defineModel<string | number | null>({ default: null })

const emit = defineEmits<{
    'item-toggle': [item: AccordionItem, index: number, isOpen: boolean]
}>()

const accordionId = props.id || generateAccordionId()
const openItems = ref(new Set<number>())

// Helper functions - define these before using them
const getItemValue = (item: AccordionItem): string | number => {
    return item.value !== undefined ? item.value : item.title
}

const getItemKey = (item: AccordionItem, index: number): string => {
    return getItemValue(item).toString() || index.toString()
}

const getItemClasses = (item: AccordionItem) => {
    const classes = ['bg-base-200']

    if (props.variant === 'bordered') {
        classes.push('border', 'border-base-300', 'rounded-box')
    }

    if (item.disabled || props.disabled) {
        classes.push('opacity-50')
    }

    return classes.join(' ')
}

const isItemOpen = (item: AccordionItem, index: number): boolean => {
    if (props.multiple) {
        return openItems.value.has(index)
    }

    if (openItem.value !== null) {
        return getItemValue(item) === openItem.value
    }

    return openItems.value.has(index)
}

// Initialize open items based on defaultOpen or openItem
const initializeOpenItems = () => {
    openItems.value.clear()

    if (openItem.value !== null) {
        const index = props.items.findIndex(item => getItemValue(item) === openItem.value)
        if (index >= 0) {
            openItems.value.add(index)
        }
    }
    else {
        props.items.forEach((item, index) => {
            if (item.defaultOpen) {
                openItems.value.add(index)
            }
        })
    }
}

// Watch for changes in items and openItem to reinitialize
watch(() => props.items, initializeOpenItems, { immediate: true })
watch(() => openItem.value, initializeOpenItems)

const radioGroupName = computed(() => `accordion-${accordionId}`)

const accordionClasses = computed(() => {
    const baseClasses = ['space-y-2']

    if (props.variant === 'bordered') {
        baseClasses.push('border', 'border-base-300', 'rounded-box', 'p-2')
    }
    else if (props.variant === 'compact') {
        baseClasses.push('space-y-1')
    }

    return baseClasses.join(' ')
})

const handleItemToggle = async (item: AccordionItem, index: number, event: Event) => {
    if (item.disabled || props.disabled) {
        event.preventDefault()
        return
    }

    const target = event.target as HTMLInputElement
    const isOpen = target.checked

    if (props.multiple) {
        if (isOpen) {
            openItems.value.add(index)
        }
        else {
            openItems.value.delete(index)
        }
    }
    else {
        openItems.value.clear()
        if (isOpen) {
            openItems.value.add(index)
            openItem.value = getItemValue(item)
        }
        else {
            openItem.value = null
        }
    }

    // Wait for next tick to ensure DOM updates
    await nextTick()
    emit('item-toggle', item, index, isOpen)
}

// Expose openItem for testing
defineExpose({
    openItem,
})
</script>

<style scoped lang="postcss">
/* DaisyUI handles most accordion styling */
</style>

<template>
  <div class="w-full">
    <div :class="tabsClasses" role="tablist">
      <a
        v-for="(tab, index) in tabs"
        :key="getTabKey(tab, index)"
        :class="getTabClasses(tab, index)"
        :aria-selected="isActiveTab(tab, index)"
        role="tab"
        @click="selectTab(tab, index, $event)"
      >
        {{ tab.label }}
        <span v-if="tab.badge" class="badge badge-sm ml-1">{{ tab.badge }}</span>
      </a>
    </div>

    <!-- Content area -->
    <div v-if="$slots.default" class="tab-content mt-4">
      <slot />
    </div>

    <div v-else-if="tabs.length > 0 && tabs[activeIndex]?.content" class="tab-content mt-4">
      <div class="tab-pane" v-html="tabs[activeIndex]?.content" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'

interface Tab {
  label: string
  value?: string | number
  content?: string
  disabled?: boolean
  badge?: string | number
}

interface Props {
  tabs?: Tab[]
  variant?: 'default' | 'bordered' | 'lifted' | 'boxed'
  size?: 'xs' | 'sm' | 'md' | 'lg'
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  tabs: () => [],
  variant: 'default',
  size: 'md',
  disabled: false,
})

// Use defineModel for v-model support (Vue 3.4+)
const activeTabValue = defineModel<string | number>()

const emit = defineEmits<{
  'tab-change': [value: string | number]
}>()

// Helper functions
const getTabValue = (tab: Tab): string | number => {
  return tab.value !== undefined ? tab.value : tab.label
}

const getTabKey = (tab: Tab, index: number): string => {
  return getTabValue(tab).toString() || index.toString()
}

// Set default value to first tab if no model value is provided
watch(
  () => props.tabs,
  (newTabs) => {
    if (newTabs.length > 0 && activeTabValue.value === undefined) {
      activeTabValue.value = newTabs[0] ? getTabValue(newTabs[0]) : undefined
    }
  },
  { immediate: true }
)

// Computed active index based on model value
const activeIndex = computed(() => {
  if (activeTabValue.value !== undefined && activeTabValue.value !== '') {
    const index = props.tabs.findIndex((tab) => getTabValue(tab) === activeTabValue.value)
    return index >= 0 ? index : 0
  }
  return 0
})

const tabsClasses = computed(() => {
  const baseClasses = ['tabs']

  // Variant classes
  if (props.variant === 'bordered') {
    baseClasses.push('tabs-bordered')
  } else if (props.variant === 'lifted') {
    baseClasses.push('tabs-lifted')
  } else if (props.variant === 'boxed') {
    baseClasses.push('tabs-boxed')
  }

  // Size classes
  if (props.size === 'xs') {
    baseClasses.push('tabs-xs')
  } else if (props.size === 'sm') {
    baseClasses.push('tabs-sm')
  } else if (props.size === 'lg') {
    baseClasses.push('tabs-lg')
  }

  return baseClasses.join(' ')
})

const getTabClasses = (tab: Tab, index: number) => {
  const classes = ['tab']

  if (isActiveTab(tab, index)) {
    classes.push('tab-active')
  }

  if (tab.disabled || props.disabled) {
    classes.push('tab-disabled')
  }

  return classes.join(' ')
}

const isActiveTab = (tab: Tab, index: number): boolean => {
  if (activeTabValue.value !== undefined && activeTabValue.value !== '') {
    return getTabValue(tab) === activeTabValue.value
  }
  return index === activeIndex.value
}

const selectTab = (tab: Tab, _index: number, event: Event) => {
  if (tab.disabled || props.disabled) {
    event.preventDefault()
    return
  }

  const tabValue = getTabValue(tab)

  // Update the model value using defineModel
  activeTabValue.value = tabValue

  // Emit the tab-change event
  emit('tab-change', tabValue)
}
</script>

<style scoped lang="postcss">
/* Tabs styles are now in src/assets/css/tabs.css */
</style>

<template>
    <div class="drawer" :class="drawerClasses">
        <input :id="drawerId" v-model="isOpen" type="checkbox" class="drawer-toggle" />

        <div class="drawer-content">
            <!-- Page content here -->
            <slot name="content" :toggle="toggle" :open="open" :close="close">
                <div class="p-4">
                    <label :for="drawerId" class="btn btn-primary drawer-button" @click="toggle">
                        Open drawer
                    </label>
                </div>
            </slot>
        </div>

        <div class="drawer-side" :class="sideClasses">
            <label
                v-if="backdrop"
                :for="drawerId"
                aria-label="close sidebar"
                class="drawer-overlay"
                @click="close"
            ></label>

            <aside :class="asideClasses">
                <div v-if="showCloseButton" class="flex justify-end p-4">
                    <button class="btn btn-sm btn-circle btn-ghost" @click="close">✕</button>
                </div>
                <div :class="iconSidebarContainerClasses">
                    <div class="w-full">
                        <slot name="header" :open="isOpen" :toggle="toggle" :close="close" :drawer-id="drawerId" />
                    </div>
                    <div class="w-full grow overflow-auto">
                        <slot name="body" :open="isOpen" :toggle="toggle" :close="close" :drawer-id="drawerId">
                            <Menu
                                :items="items"
                                :open="isOpen"
                                :toggle="toggle"
                                :close="close"
                                :drawer-id="drawerId"
                            />
                        </slot>
                    </div>
                    <div class="w-full">
                        <slot name="bottom" :open="isOpen" :toggle="toggle" :close="close" :drawer-id="drawerId" />
                    </div>
                </div>
            </aside>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, watch, useId } from 'vue'
import type { MenuItem } from '../../shared/types.d'

// SSR-safe id
const uid = useId()

interface Props {
    position?: 'left' | 'right'
    width?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
    backdrop?: boolean
    persistent?: boolean
    showCloseButton?: boolean
    id?: string
    forceOpen?: boolean
    /** Enable icon-only sidebar behavior with is-drawer-open/close variants */
    iconOnly?: boolean
    items?: MenuItem[]
}

const props = withDefaults(defineProps<Props>(), {
    position: 'left',
    width: 'md',
    backdrop: true,
    persistent: false,
    showCloseButton: true,
    id: undefined,
    forceOpen: false,
    iconOnly: false,
})

const isOpen = defineModel<boolean>({ default: false })

const emit = defineEmits<{
    open: []
    close: []
}>()

const drawerId = props.id || `drawer-${uid}`

// Watch internal state changes to emit events
watch(isOpen, (newValue) => {
    if (newValue) {
        emit('open')
    } else {
        emit('close')
    }
})

const drawerClasses = computed(() => {
    const classes = []

    if (props.position === 'right') {
        classes.push('drawer-end')
    }

    if (props.forceOpen) {
        classes.push('drawer-open')
    }

    return classes.join(' ')
})

const sideClasses = computed(() => [
    props.iconOnly ? 'is-drawer-close:overflow-visible' : '',
]
    .filter(Boolean)
    .join(' '))

const asideClasses = computed(() => {
    const baseClasses = ['bg-base-200', 'text-base-content', 'min-h-full', 'flex', 'flex-col']


    return baseClasses.join(' ')
})

const iconSidebarContainerClasses = computed(() => [
    'is-drawer-close:w-14',
    'is-drawer-open:w-64',
    'bg-base-200',
    'flex',
    'flex-col',
    'items-start',
    'min-h-full',
].join(' '))

const toggle = () => {
    isOpen.value = !isOpen.value
}

const open = () => {
    isOpen.value = true
}

const close = () => {
    if (props.persistent) return
    isOpen.value = false
}

// Keyboard handling
const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && isOpen.value && !props.persistent) {
        close()
    }
}

// Add event listener for escape key
if (typeof window !== 'undefined') {
    window.addEventListener('keydown', handleKeydown)
}

// Expose methods for external triggers (template ref)
defineExpose({ open, close, toggle })
</script>

<style scoped lang="postcss">
/* DaisyUI handles most drawer styling */
</style>

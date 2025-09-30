<template>
<div
    class="drawer"
    :class="drawerClasses"
>
    <input
        :id="drawerId"
        v-model="isOpen"
        type="checkbox"
        class="drawer-toggle"
    >

    <div class="drawer-content">
        <!-- Page content here -->
        <slot
            name="content"
            :toggle="toggle"
            :open="open"
            :close="close"
        >
            <div class="p-4">
                <label
                    :for="drawerId"
                    class="btn btn-primary drawer-button"
                    @click="toggle"
                >
                    Open drawer
                </label>
            </div>
        </slot>
    </div>

    <div
        class="drawer-side"
        :class="sideClasses"
    >
        <label
            :for="drawerId"
            class="drawer-overlay"
            @click="close"
        />

        <aside :class="asideClasses">
            <div
                v-if="showCloseButton"
                class="flex justify-end p-4"
            >
                <button
                    class="btn btn-sm btn-circle btn-ghost"
                    @click="close"
                >
                    ✕
                </button>
            </div>

            <slot
                name="drawer"
                :close="close"
            >
                <!-- Drawer content here -->
                <div class="p-4">
                    <h3 class="text-lg font-bold mb-4">
                        Drawer Content
                    </h3>
                    <ul class="menu">
                        <li><a>Sidebar Item 1</a></li>
                        <li><a>Sidebar Item 2</a></li>
                    </ul>
                </div>
            </slot>
        </aside>
    </div>
</div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'

// Generate unique ID for each drawer instance
const generateDrawerId = () => `drawer-${Math.random().toString(36).substr(2, 9)}`

interface Props {
    position?: 'left' | 'right' | 'top' | 'bottom'
    width?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
    backdrop?: boolean
    persistent?: boolean
    showCloseButton?: boolean
    id?: string
}

const props = withDefaults(defineProps<Props>(), {
    position: 'left',
    width: 'md',
    backdrop: true,
    persistent: false,
    showCloseButton: true,
    id: undefined,
})

// Use defineModel for v-model support (Vue 3.4+)
const isOpen = defineModel<boolean>({ default: false })

const emit = defineEmits<{
    open: []
    close: []
}>()

const drawerId = props.id || generateDrawerId()

// Watch internal state changes to emit events
watch(isOpen, (newValue) => {
    if (newValue) {
        emit('open')
    }
    else {
        emit('close')
    }
})

const drawerClasses = computed(() => {
    const classes = []

    // Position classes
    if (props.position === 'right') {
        classes.push('drawer-end')
    }
    // Default left position doesn't need a class

    return classes.join(' ')
})

const sideClasses = computed(() => {
    const classes = []

    // Position specific classes
    if (props.position === 'right') {
        classes.push('drawer-side-right')
    }

    return classes.join(' ')
})

const asideClasses = computed(() => {
    const baseClasses = ['bg-base-200', 'text-base-content', 'min-h-full']

    // Width classes
    if (props.width === 'sm') {
        baseClasses.push('w-64')
    }
    else if (props.width === 'md') {
        baseClasses.push('w-80')
    }
    else if (props.width === 'lg') {
        baseClasses.push('w-96')
    }
    else if (props.width === 'xl') {
        baseClasses.push('w-[28rem]')
    }
    else if (props.width === 'full') {
        baseClasses.push('w-full')
    }

    return baseClasses.join(' ')
})

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
</script>

<style scoped lang="postcss">
/* DaisyUI handles most drawer styling */
</style>

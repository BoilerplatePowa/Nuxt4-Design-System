<template>
    <div class="drawer" :class="drawerClasses">
        <input :id="drawerId" v-model="model" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content">
            <!-- drawer content -->
            <slot name="content" :drawer-id="drawerId">
                <label v-if="mode === 'default'" :for="drawerId" class="btn drawer-button">
                    Open drawer
                </label>
            </slot>
        </div>

        <div class="drawer-side" :class="sideClasses">
            <label :for="drawerId" aria-label="close sidebar" class="drawer-overlay"></label>
            <div :class="glass ? 'h-full pl-2 py-2' : 'h-full'">
                <div :class="sidebarContentClasses">
                    <div class="flex w-full p-2">
                        <div class="grow">
                            <slot name="top"></slot>
                        </div>
                        <div class="tooltip tooltip-right" :data-tip="model ? 'Close' : 'Open'">
                            <label
                                :for="drawerId"
                                class="btn btn-ghost btn-square drawer-button hover:bg-base-content/10 active:bg-base-content active:text-base-100 !border-0 !shadow-none !p-0"
                                :class="model ? 'rotate-y-180' : ''"
                            >
                                <ChevronRight />
                            </label>
                        </div>
                    </div>
                    <div class="divider px-2 m-0"></div>
                    <Menu :items="items" class="w-full grow" :compact="!model" />
                    <div v-if="$slots.bottom" class="w-full">
                        <div class="divider px-2 m-0"></div>
                        <slot name="bottom"></slot>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, useId, onMounted, onUnmounted } from 'vue'
import type { MenuItem } from '../../shared/types.d'
import Menu from '../Navigation/Menu.vue'
import { ChevronRight } from 'lucide-vue-next'

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
    mode?: 'default' | 'sidebar'
    items?: MenuItem[]
    glass?: boolean
    glassOpacity?: number
}

const props = withDefaults(defineProps<Props>(), {
    position: 'left',
    width: 'md',
    backdrop: true,
    persistent: false,
    showCloseButton: true,
    id: undefined,
    forceOpen: false,
    mode: 'default',
    glass: false,
    glassOpacity: 10,
})

const model = defineModel<boolean>({ default: false })

const drawerId = props.id || `drawer-${uid}`

const drawerClasses = computed(() => {
    const classes = []

    if (props.position === 'right') {
        classes.push('drawer-end')
    }

    if (props.forceOpen || props.mode === 'sidebar') {
        classes.push('drawer-open')
    }

    return classes.join(' ')
})

const sideClasses = computed(() =>
    [props.mode === 'sidebar' ? '!overflow-visible drawer-open' : ''].filter(Boolean).join(' ')
)

const sidebarContentClasses = computed(() => {
    const classes = [
        'is-drawer-close:w-14',
        'is-drawer-open:w-48',
        'flex',
        'flex-col',
        'items-start',
        'min-h-full',
        '!transition-all',
    ]

    if (props.glass) {
        classes.push('glass', 'rounded-box', `bg-base-content/${props.glassOpacity}`)
    } else {
        classes.push('bg-base-200')
    }

    return classes.join(' ')
})

// Close drawer function
const close = () => {
    model.value = false
}

// Keyboard handling
const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && model.value && !props.persistent) {
        close()
    }
}

// Add event listener for escape key with proper cleanup
onMounted(() => {
    if (typeof window !== 'undefined') {
        window.addEventListener('keydown', handleKeydown)
    }
})

onUnmounted(() => {
    if (typeof window !== 'undefined') {
        window.removeEventListener('keydown', handleKeydown)
    }
})
</script>

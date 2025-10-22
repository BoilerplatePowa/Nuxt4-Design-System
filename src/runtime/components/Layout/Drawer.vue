<template>
    <div class="drawer" :class="drawerClasses">
        <input :id="drawerId" v-model="model" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content">
            <!-- drawer content -->
            <slot name="content" :drawer-id="drawerId">
                <label v-if="mode === 'default'" :for="drawerId" class="btn drawer-button"
                    >Open drawer</label
                >
            </slot>
        </div>

        <div class="drawer-side" :class="sideClasses">
            <label :for="drawerId" aria-label="close sidebar" class="drawer-overlay"></label>
            <div
                class="is-drawer-close:w-14 is-drawer-open:w-48 bg-base-200 flex flex-col items-start min-h-full"
            >
                <div class="flex w-full p-2">
                    <div class="grow">
                        <slot name="top"></slot>
                    </div>
                    <div
                        class="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                        data-tip="Open"
                    >
                        <label
                            :for="drawerId"
                            class="btn btn-ghost btn-square drawer-button is-drawer-open:rotate-y-180"
                        >
                            <Icon name="chevron-right" size="md" />
                        </label>
                    </div>
                </div>
                <div class="divider px-2 m-0"></div>
                <Menu :items="items" class="w-full grow" :compact="!model" />
                <div v-if="$slots.bottom">
                    <div class="divider px-2 m-0"></div>
                    <slot name="bottom"></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, useId } from 'vue'
import type { MenuItem } from '../../shared/types.d'
import Menu from '../Navigation/Menu.vue'
import Icon from '../Icons/Icon.vue'

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
    [props.mode === 'sidebar' ? 'is-drawer-close:overflow-visible drawer-open' : '']
        .filter(Boolean)
        .join(' ')
)

// Keyboard handling
const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && model.value && !props.persistent) {
        close()
    }
}

// Add event listener for escape key
if (typeof window !== 'undefined') {
    window.addEventListener('keydown', handleKeydown)
}
</script>

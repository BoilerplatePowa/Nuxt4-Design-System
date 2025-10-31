<template>
    <div :class="glass ? 'p-2' : ''">
        <div :class="navbarClasses">
            <div class="navbar-start">
                <Dropdown v-if="showMobileMenu && menuItems.length > 0" :items="menuItems" />
                <a v-if="logo || title" :href="logoHref" class="text-xl navbar-brand font-bold">
                    <img v-if="logo" :src="logo" :alt="logoAlt" class="h-8 w-auto" />
                    <span v-if="title">{{ title }}</span>
                </a>
                <slot name="brand" />
            </div>

            <div v-if="$slots.menu" class="navbar-center hidden lg:flex">
                <slot name="menu" />
            </div>

            <div v-if="$slots.actions" class="navbar-end">
                <slot name="actions" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Dropdown from '../Actions/Dropdown.vue'

interface Props {
    title?: string
    logo?: string
    logoAlt?: string
    logoHref?: string
    styleVariant?: 'default' | 'sticky'
    glass?: boolean
    glassOpacity?: number
    textColor?: string
    shadow?: boolean
    showMobileMenu?: boolean
    menuItems?: []
}

const props = withDefaults(defineProps<Props>(), {
    logoHref: '',
    logoAlt: 'Logo',
    styleVariant: 'default',
    glass: false,
    glassOpacity: 0.1,
    shadow: false,
    showMobileMenu: true,
    menuItems: () => [],
})

const navbarClasses = computed(() => {
    const baseClasses = ['navbar', 'px-4']

    // Style variant classes
    if (props.styleVariant === 'sticky') {
        baseClasses.push('sticky', 'top-0', 'z-30')
    }

    // Glass effect (can be combined with other variants)
    if (props.glass) {
        baseClasses.push('glass', 'rounded-lg', `bg-base-100/${props.glassOpacity * 100}`)
    }

    // Shadow
    if (props.shadow) {
        baseClasses.push('shadow-lg')
    }

    return baseClasses.join(' ')
})

// TODO : Update this component
</script>

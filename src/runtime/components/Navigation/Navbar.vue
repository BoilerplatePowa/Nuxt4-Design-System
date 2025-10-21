<template>
    <div :class="navbarClasses">
        <div class="navbar-start">
            <Dropdown v-if="showMobileMenu && menuItems.length > 0" :items="menuItems" />
            <a v-if="logo || title" :href="logoHref" class="btn btn-ghost text-xl navbar-brand">
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
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Dropdown from '../Actions/Dropdown.vue'

interface Props {
    title?: string
    logo?: string
    logoAlt?: string
    logoHref?: string
    variant?: 'default' | 'sticky' | 'glass'
    shadow?: boolean
    showMobileMenu?: boolean
    menuItems?: []
}

const props = withDefaults(defineProps<Props>(), {
    logoHref: '/',
    logoAlt: 'Logo',
    variant: 'default',
    shadow: false,
    showMobileMenu: true,
    menuItems: () => [],
})

const navbarClasses = computed(() => {
    const baseClasses = ['navbar', 'bg-base-100']

    // Variant classes
    if (props.variant === 'sticky') {
        baseClasses.push('sticky', 'top-0', 'z-30')
    } else if (props.variant === 'glass') {
        baseClasses.push('glass', 'backdrop-blur')
    }

    // Shadow
    if (props.shadow) {
        baseClasses.push('shadow-lg')
    }

    return baseClasses.join(' ')
})

// TODO : Update this component
</script>

<style scoped lang="postcss">
/* DaisyUI handles most navbar styling */
</style>

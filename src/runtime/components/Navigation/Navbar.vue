<template>
<div :class="navbarClasses">
    <div class="navbar-start">
        <div
            v-if="showMobileMenu"
            class="dropdown navbar-mobile"
        >
            <div
                tabindex="0"
                role="button"
                class="btn btn-ghost lg:hidden"
            >
                <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 6h16M4 12h8m-8 6h16"
                    />
                </svg>
            </div>
            <ul
                tabindex="0"
                class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
                <slot name="mobile-menu" />
            </ul>
        </div>

        <a
            v-if="logo || title"
            :href="logoHref"
            class="btn btn-ghost text-xl navbar-brand"
        >
            <img
                v-if="logo"
                :src="logo"
                :alt="logoAlt"
                class="h-8 w-auto"
            >
            <span v-if="title">{{ title }}</span>
        </a>
        <slot name="brand" />
    </div>

    <div
        v-if="$slots.menu"
        class="navbar-center hidden lg:flex"
    >
        <slot name="menu" />
    </div>

    <div
        v-if="$slots.actions"
        class="navbar-end"
    >
        <slot name="actions" />
    </div>
</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
    title?: string
    logo?: string
    logoAlt?: string
    logoHref?: string
    variant?: 'default' | 'sticky' | 'glass'
    shadow?: boolean
    showMobileMenu?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    logoHref: '/',
    logoAlt: 'Logo',
    variant: 'default',
    shadow: false,
    showMobileMenu: true,
})

const navbarClasses = computed(() => {
    const baseClasses = ['navbar', 'bg-base-100']

    // Variant classes
    if (props.variant === 'sticky') {
        baseClasses.push('sticky', 'top-0', 'z-30')
    }
    else if (props.variant === 'glass') {
        baseClasses.push('glass', 'backdrop-blur')
    }

    // Shadow
    if (props.shadow) {
        baseClasses.push('shadow-lg')
    }

    return baseClasses.join(' ')
})
</script>

<style scoped lang="postcss">
/* DaisyUI handles most navbar styling */
</style>

<template>
<div class="min-h-screen bg-base-100">
    <!-- Navigation Header -->
    <header class="navbar bg-base-200 shadow-lg sticky top-0 z-50">
        <div class="navbar-start">
            <div class="dropdown">
                <div
                    tabindex="0"
                    role="button"
                    class="btn btn-ghost lg:hidden"
                >
                    <BpIcon
                        name="menu"
                        class="w-5 h-5"
                    />
                </div>
                <ul
                    tabindex="0"
                    class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                >
                    <li><NuxtLink to="/">Home</NuxtLink></li>
                    <li><NuxtLink to="/installation">Installation</NuxtLink></li>
                    <li><NuxtLink to="/components">Components</NuxtLink></li>
                    <li><NuxtLink to="/examples">Examples</NuxtLink></li>
                </ul>
            </div>
            <NuxtLink
                to="/"
                class="btn btn-ghost text-xl"
            >
                <BpIcon
                    name="zap"
                    class="w-6 h-6 text-primary mr-2"
                />
                Nuxt DS
            </NuxtLink>
        </div>

        <div class="navbar-center hidden lg:flex">
            <ul class="menu menu-horizontal px-1">
                <li>
                    <NuxtLink
                        to="/"
                        class="hover:text-primary"
                    >Home</NuxtLink>
                </li>
                <li>
                    <NuxtLink
                        to="/installation"
                        class="hover:text-primary"
                    >Installation</NuxtLink>
                </li>
                <li>
                    <NuxtLink
                        to="/components"
                        class="hover:text-primary"
                    >Components</NuxtLink>
                </li>
                <li>
                    <NuxtLink
                        to="/examples"
                        class="hover:text-primary"
                    >Examples</NuxtLink>
                </li>
            </ul>
        </div>

        <div class="navbar-end">
            <!-- Theme Switcher -->
            <div class="dropdown dropdown-end">
                <div
                    tabindex="0"
                    role="button"
                    class="btn btn-ghost"
                >
                    <BpIcon
                        name="settings"
                        class="w-5 h-5"
                    />
                </div>
                <ul
                    tabindex="0"
                    class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                >
                    <li>
                        <button
                            class="flex items-center gap-2"
                            @click="setTheme('light')"
                        >
                            <BpIcon
                                name="sun"
                                class="w-4 h-4"
                            />
                            Light
                        </button>
                    </li>
                    <li>
                        <button
                            class="flex items-center gap-2"
                            @click="setTheme('dark')"
                        >
                            <BpIcon
                                name="moon"
                                class="w-4 h-4"
                            />
                            Dark
                        </button>
                    </li>
                    <li>
                        <button
                            class="flex items-center gap-2"
                            @click="setTheme('corporate')"
                        >
                            <BpIcon
                                name="building"
                                class="w-4 h-4"
                            />
                            Corporate
                        </button>
                    </li>
                    <li>
                        <button
                            class="flex items-center gap-2"
                            @click="setTheme('synthwave')"
                        >
                            <BpIcon
                                name="zap"
                                class="w-4 h-4"
                            />
                            Synthwave
                        </button>
                    </li>
                </ul>
            </div>

            <!-- GitHub Link -->
            <a
                href="https://github.com/BoilerplatePowa/Nuxt4-Design-System"
                target="_blank"
                class="btn btn-ghost btn-circle"
            >
                <BpIcon
                    name="external-link"
                    class="w-5 h-5"
                />
            </a>
        </div>
    </header>

    <!-- Main Content -->
    <main>
        <slot />
    </main>

    <!-- Footer -->
    <footer class="footer footer-center p-10 bg-base-300 text-base-content">
        <div>
            <BpIcon
                name="zap"
                class="w-8 h-8 text-primary"
            />
            <p class="font-bold">
                Nuxt Design System <br>
                Built with ❤️ for the Vue community
            </p>
            <p>Copyright © 2024 - All rights reserved</p>
        </div>
        <div>
            <div class="grid grid-flow-col gap-4">
                <a
                    href="https://github.com/BoilerplatePowa/Nuxt4-Design-System"
                    target="_blank"
                    class="link link-hover"
                >
                    <BpIcon
                        name="external-link"
                        class="w-5 h-5"
                    />
                </a>
                <NuxtLink
                    to="/components"
                    class="link link-hover"
                >Documentation</NuxtLink>
                <NuxtLink
                    to="/examples"
                    class="link link-hover"
                >Examples</NuxtLink>
                <a
                    href="https://github.com/BoilerplatePowa/Nuxt4-Design-System/issues"
                    target="_blank"
                    class="link link-hover"
                >Support</a>
            </div>
        </div>
    </footer>
</div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeMount } from 'vue'

// Theme management
const currentTheme = ref('light')

function setTheme(theme: string) {
    if (import.meta.client) {
        currentTheme.value = theme
        document.documentElement.setAttribute('data-theme', theme)
        localStorage.setItem('@nuxt-design-system/theme', theme)
    }
}

// Initialize theme on mount
onMounted(() => {
    if (import.meta.client) {
        const savedTheme = localStorage.getItem('@nuxt-design-system/theme') || 'light'
        setTheme(savedTheme)
    }
})

// Set default theme for SSR
onBeforeMount(() => {
    if (import.meta.client) {
        const savedTheme = localStorage.getItem('@nuxt-design-system/theme') || 'light'
        currentTheme.value = savedTheme
    }
})
</script>

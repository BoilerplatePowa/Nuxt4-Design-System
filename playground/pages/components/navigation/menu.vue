<template>
    <div class="min-h-screen bg-base-100">
        <div class="container mx-auto px-4 py-8">
            <div class="text-sm breadcrumbs mb-6">
                <ul>
                    <li><NuxtLink to="/">Home</NuxtLink></li>
                    <li><NuxtLink to="/components">Components</NuxtLink></li>
                    <li><NuxtLink to="/components/navigation">Navigation</NuxtLink></li>
                    <li>Menu</li>
                </ul>
            </div>

            <div class="mb-12">
                <h1 class="text-5xl font-bold mb-4">Menu</h1>
                <p class="text-xl text-base-content/70 max-w-3xl">Vertical and horizontal menus.</p>
            </div>

            <section class="mb-16">
                <h2 class="text-3xl font-bold mb-6">Examples</h2>
                
                <!-- Basic Vertical Menu -->
                <div class="card bg-base-200 shadow-xl mb-6">
                    <div class="card-body">
                        <h3 class="text-xl font-semibold mb-4">Vertical Menu</h3>
                        <BpMenu
                            :items="verticalMenuItems"
                            rounded
                            class="bg-base-100 w-56 rounded-box"
                        />
                    </div>
                </div>

                <!-- Menu with Submenu -->
                <div class="card bg-base-200 shadow-xl mb-6">
                    <div class="card-body">
                        <h3 class="text-xl font-semibold mb-4">Menu with Submenu</h3>
                        <BpMenu
                            :items="submenuItems"
                            rounded
                            class="bg-base-100 w-56 rounded-box"
                        />
                    </div>
                </div>

                <!-- Horizontal Menu -->
                <div class="card bg-base-200 shadow-xl mb-6">
                    <div class="card-body">
                        <h3 class="text-xl font-semibold mb-4">Horizontal Menu</h3>
                        <BpMenu
                            :items="horizontalMenuItems"
                            variant="horizontal"
                            rounded
                            class="bg-base-100 rounded-box"
                        />
                    </div>
                </div>

                <!-- Menu with Icons and Badges -->
                <div class="card bg-base-200 shadow-xl mb-6">
                    <div class="card-body">
                        <h3 class="text-xl font-semibold mb-4">Menu with Icons and Badges</h3>
                        <BpMenu
                            :items="iconMenuItems"
                            rounded
                            class="bg-base-100 w-56 rounded-box"
                        />
                    </div>
                </div>

                <!-- Compact Menu -->
                <div class="card bg-base-200 shadow-xl">
                    <div class="card-body">
                        <h3 class="text-xl font-semibold mb-4">Compact Menu</h3>
                        <BpMenu
                            :items="compactMenuItems"
                            :compact="true"
                            rounded
                            class="bg-base-100 w-20 rounded-box"
                        />
                    </div>
                </div>
            </section>

            <section class="mb-16">
                <div class="card bg-base-200 shadow-xl">
                    <div class="card-body text-center">
                        <h2 class="card-title text-2xl justify-center mb-4">Explore More</h2>
                        <div class="card-actions justify-center">
                            <NuxtLink to="/components/navigation" class="btn btn-primary">
                                <ArrowLeft class="w-4 h-4 mr-2" /> Back to Navigation
                            </NuxtLink>
                            <NuxtLink to="/components" class="btn btn-outline">
                                <Grid class="w-4 h-4 mr-2" /> All Components
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ArrowLeft, Grid, Home, User, Settings, Mail, Bell, Search, FileText, Heart, Star } from 'lucide-vue-next'
import type { MenuItem } from '../../../../src/runtime/shared/types.d'

definePageMeta({ title: 'Menu', description: 'Menu examples' })

// Basic vertical menu items
const verticalMenuItems = ref<MenuItem[]>([
    { label: 'Item 1', href: '/components/navigation/menu' },
    { label: 'Item 2', href: '/components/navigation/menu' },
    { label: 'Item 3', href: '/components/navigation/menu' },
])

// Menu with submenu
const submenuItems = ref<MenuItem[]>([
    { label: 'Item 1', href: '/components/navigation/menu' },
    {
        label: 'Parent',
        children: [
            { label: 'Submenu 1', href: '/components/navigation/menu' },
            { label: 'Submenu 2', href: '/components/navigation/menu' },
        ],
    },
    { label: 'Item 3', href: '/components/navigation/menu' },
])

// Horizontal menu items
const horizontalMenuItems = ref<MenuItem[]>([
    { label: 'Link 1', href: '/components/navigation/menu' },
    { label: 'Link 2', href: '/components/navigation/menu' },
    { label: 'Link 3', href: '/components/navigation/menu' },
])

// Menu with icons and badges
const iconMenuItems = ref<MenuItem[]>([
    { label: 'Home', href: '/', icon: Home },
    { label: 'Profile', href: '/components/navigation/menu', icon: User, badge: '3' },
    { label: 'Messages', href: '/components/navigation/menu', icon: Mail, badge: '12' },
    { label: 'Notifications', href: '/components/navigation/menu', icon: Bell, active: true },
    { label: 'Settings', href: '/components/navigation/menu', icon: Settings, disabled: true },
])

// Compact menu items
const compactMenuItems = ref<MenuItem[]>([
    { label: 'Home', href: '/', icon: Home },
    { label: 'Search', href: '/components/navigation/menu', icon: Search },
    { label: 'Documents', href: '/components/navigation/menu', icon: FileText },
    { label: 'Favorites', href: '/components/navigation/menu', icon: Heart },
    { label: 'Starred', href: '/components/navigation/menu', icon: Star },
])

function setTheme(theme: string) {
    if (import.meta.client) {
        document.documentElement.setAttribute('data-theme', theme)
        localStorage.setItem('@nuxt-design-system/theme', theme)
    }
}

onMounted(() => {
    if (import.meta.client) {
        const savedTheme = localStorage.getItem('@nuxt-design-system/theme') || 'light'
        setTheme(savedTheme)
    }
})
</script>

<template>
<div class="min-h-screen bg-base-100">
    <div class="container mx-auto px-4 py-8">
        <!-- Page Header -->
        <div class="text-center mb-12">
            <h1 class="text-5xl font-bold mb-4">
                Component Library
            </h1>
            <p class="text-xl text-base-content/70 max-w-3xl mx-auto">
                Explore our comprehensive collection of pre-built, accessible components. Each component is designed with modern web standards and follows DaisyUI conventions.
            </p>
        </div>

        <!-- Component Categories Grid -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <!-- Actions Category -->
            <div
                class="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow cursor-pointer"
                @click="navigateToCategory('actions')"
            >
                <div class="card-body">
                    <div class="flex items-center gap-4 mb-4">
                        <div class="bg-primary/20 p-3 rounded-full">
                            <BpIcon
                                name="zap"
                                class="w-8 h-8 text-primary"
                            />
                        </div>
                        <h2 class="card-title text-2xl">
                            Actions
                        </h2>
                    </div>
                    <p class="text-base-content/70 mb-4">
                        Interactive elements like buttons, dropdowns, modals, and other action-oriented components.
                    </p>
                    <div class="flex flex-wrap gap-2">
                        <span class="badge badge-primary">Button</span>
                        <span class="badge badge-primary">Dropdown</span>
                        <span class="badge badge-primary">Modal</span>
                        <span class="badge badge-primary">Swap</span>
                    </div>
                    <div class="card-actions justify-end mt-4">
                        <span class="text-sm text-base-content/60">5 components</span>
                    </div>
                </div>
            </div>

            <!-- Data Display Category -->
            <div
                class="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow cursor-pointer"
                @click="navigateToCategory('data-display')"
            >
                <div class="card-body">
                    <div class="flex items-center gap-4 mb-4">
                        <div class="bg-secondary/20 p-3 rounded-full">
                            <BpIcon
                                name="layout"
                                class="w-8 h-8 text-secondary"
                            />
                        </div>
                        <h2 class="card-title text-2xl">
                            Data Display
                        </h2>
                    </div>
                    <p class="text-base-content/70 mb-4">
                        Components for presenting data, content, and information in organized layouts.
                    </p>
                    <div class="flex flex-wrap gap-2">
                        <span class="badge badge-secondary">Card</span>
                        <span class="badge badge-secondary">Avatar</span>
                        <span class="badge badge-secondary">Badge</span>
                        <span class="badge badge-secondary">Table</span>
                    </div>
                    <div class="card-actions justify-end mt-4">
                        <span class="text-sm text-base-content/60">12 components</span>
                    </div>
                </div>
            </div>

            <!-- Data Input Category -->
            <div
                class="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow cursor-pointer"
                @click="navigateToCategory('data-input')"
            >
                <div class="card-body">
                    <div class="flex items-center gap-4 mb-4">
                        <div class="bg-accent/20 p-3 rounded-full">
                            <BpIcon
                                name="edit"
                                class="w-8 h-8 text-accent"
                            />
                        </div>
                        <h2 class="card-title text-2xl">
                            Data Input
                        </h2>
                    </div>
                    <p class="text-base-content/70 mb-4">
                        Form controls and input elements for user data collection and interaction.
                    </p>
                    <div class="flex flex-wrap gap-2">
                        <span class="badge badge-accent">Input</span>
                        <span class="badge badge-accent">Checkbox</span>
                        <span class="badge badge-accent">Select</span>
                        <span class="badge badge-accent">Radio</span>
                    </div>
                    <div class="card-actions justify-end mt-4">
                        <span class="text-sm text-base-content/60">11 components</span>
                    </div>
                </div>
            </div>

            <!-- Feedback Category -->
            <div
                class="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow cursor-pointer"
                @click="navigateToCategory('feedback')"
            >
                <div class="card-body">
                    <div class="flex items-center gap-4 mb-4">
                        <div class="bg-info/20 p-3 rounded-full">
                            <BpIcon
                                name="message-circle"
                                class="w-8 h-8 text-info"
                            />
                        </div>
                        <h2 class="card-title text-2xl">
                            Feedback
                        </h2>
                    </div>
                    <p class="text-base-content/70 mb-4">
                        Components that provide user feedback, notifications, and status information.
                    </p>
                    <div class="flex flex-wrap gap-2">
                        <span class="badge badge-info">Alert</span>
                        <span class="badge badge-info">Loading</span>
                        <span class="badge badge-info">Progress</span>
                        <span class="badge badge-info">Toast</span>
                    </div>
                    <div class="card-actions justify-end mt-4">
                        <span class="text-sm text-base-content/60">5 components</span>
                    </div>
                </div>
            </div>

            <!-- Layout Category -->
            <div
                class="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow cursor-pointer"
                @click="navigateToCategory('layout')"
            >
                <div class="card-body">
                    <div class="flex items-center gap-4 mb-4">
                        <div class="bg-success/20 p-3 rounded-full">
                            <BpIcon
                                name="grid"
                                class="w-8 h-8 text-success"
                            />
                        </div>
                        <h2 class="card-title text-2xl">
                            Layout
                        </h2>
                    </div>
                    <p class="text-base-content/70 mb-4">
                        Structural components for organizing content and creating page layouts.
                    </p>
                    <div class="flex flex-wrap gap-2">
                        <span class="badge badge-success">Divider</span>
                        <span class="badge badge-success">Drawer</span>
                        <span class="badge badge-success">Footer</span>
                        <span class="badge badge-success">Hero</span>
                    </div>
                    <div class="card-actions justify-end mt-4">
                        <span class="text-sm text-base-content/60">7 components</span>
                    </div>
                </div>
            </div>

            <!-- Navigation Category -->
            <div
                class="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow cursor-pointer"
                @click="navigateToCategory('navigation')"
            >
                <div class="card-body">
                    <div class="flex items-center gap-4 mb-4">
                        <div class="bg-warning/20 p-3 rounded-full">
                            <BpIcon
                                name="navigation"
                                class="w-8 h-8 text-warning"
                            />
                        </div>
                        <h2 class="card-title text-2xl">
                            Navigation
                        </h2>
                    </div>
                    <p class="text-base-content/70 mb-4">
                        Navigation components for site structure and user wayfinding.
                    </p>
                    <div class="flex flex-wrap gap-2">
                        <span class="badge badge-warning">Navbar</span>
                        <span class="badge badge-warning">Menu</span>
                        <span class="badge badge-warning">Tabs</span>
                        <span class="badge badge-warning">Steps</span>
                    </div>
                    <div class="card-actions justify-end mt-4">
                        <span class="text-sm text-base-content/60">6 components</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Featured Components -->
        <section class="mb-16">
            <h2 class="text-3xl font-bold mb-8 text-center">
                Featured Components
            </h2>

            <div class="grid lg:grid-cols-2 gap-8">
                <!-- Button Component -->
                <div class="card bg-base-200 shadow-xl">
                    <div class="card-body">
                        <h3 class="card-title text-xl mb-4">
                            <BpIcon
                                name="zap"
                                class="w-5 h-5 text-primary"
                            />
                            BpButton
                        </h3>
                        <p class="text-base-content/70 mb-4">
                            A versatile button component with multiple variants, sizes, and states. Built on DaisyUI button styles with enhanced functionality.
                        </p>

                        <div class="space-y-4 mb-6">
                            <div class="flex flex-wrap gap-2">
                                <BpButton
                                    color="primary"
                                    size="sm"
                                >
                                    Primary
                                </BpButton>
                                <BpButton
                                    color="secondary"
                                    size="sm"
                                >
                                    Secondary
                                </BpButton>
                                <BpButton
                                    color="accent"
                                    size="sm"
                                >
                                    Accent
                                </BpButton>
                                <BpButton
                                    color="ghost"
                                    size="sm"
                                >
                                    Ghost
                                </BpButton>
                            </div>

                            <div class="flex flex-wrap gap-2">
                                <BpButton
                                    color="primary"
                                    size="xs"
                                >
                                    XS
                                </BpButton>
                                <BpButton
                                    color="primary"
                                    size="sm"
                                >
                                    SM
                                </BpButton>
                                <BpButton
                                    color="primary"
                                    size="md"
                                >
                                    MD
                                </BpButton>
                                <BpButton
                                    color="primary"
                                    size="lg"
                                >
                                    LG
                                </BpButton>
                            </div>
                        </div>

                        <div class="card-actions justify-end">
                            <NuxtLink
                                to="/components/actions/button"
                                class="btn btn-primary btn-sm"
                            >
                                View Details
                            </NuxtLink>
                        </div>
                    </div>
                </div>

                <!-- Icon Component -->
                <div class="card bg-base-200 shadow-xl">
                    <div class="card-body">
                        <h3 class="card-title text-xl mb-4">
                            <BpIcon
                                name="image"
                                class="w-5 h-5 text-secondary"
                            />
                            Icon
                        </h3>
                        <p class="text-base-content/70 mb-4">
                            A comprehensive icon component powered by Lucide Vue Next. Access to 1000+ beautiful, customizable icons.
                        </p>

                        <div class="grid grid-cols-4 gap-4 mb-6">
                            <BpIcon
                                name="heart"
                                class="w-8 h-8 text-error"
                            />
                            <BpIcon
                                name="star"
                                class="w-8 h-8 text-warning"
                            />
                            <BpIcon
                                name="check-circle"
                                class="w-8 h-8 text-success"
                            />
                            <BpIcon
                                name="info"
                                class="w-8 h-8 text-info"
                            />
                            <BpIcon
                                name="zap"
                                class="w-8 h-8 text-primary"
                            />
                            <BpIcon
                                name="settings"
                                class="w-8 h-8 text-secondary"
                            />
                            <BpIcon
                                name="user"
                                class="w-8 h-8 text-accent"
                            />
                            <BpIcon
                                name="home"
                                class="w-8 h-8 text-neutral"
                            />
                        </div>

                        <div class="card-actions justify-end">
                            <NuxtLink
                                to="/components/icons/icon"
                                class="btn btn-secondary btn-sm"
                            >
                                View Details
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Component Stats -->
        <section class="mb-16">
            <div class="stats shadow w-full">
                <div class="stat">
                    <div class="stat-figure text-primary">
                        <BpIcon
                            name="archive"
                            class="w-8 h-8"
                        />
                    </div>
                    <div class="stat-title">
                        Total Components
                    </div>
                    <div class="stat-value text-primary">
                        46
                    </div>
                    <div class="stat-desc">
                        Ready to use
                    </div>
                </div>

                <div class="stat">
                    <div class="stat-figure text-secondary">
                        <BpIcon
                            name="grid"
                            class="w-8 h-8"
                        />
                    </div>
                    <div class="stat-title">
                        Categories
                    </div>
                    <div class="stat-value text-secondary">
                        6
                    </div>
                    <div class="stat-desc">
                        Organized by function
                    </div>
                </div>

                <div class="stat">
                    <div class="stat-figure text-accent">
                        <BpIcon
                            name="settings"
                            class="w-8 h-8"
                        />
                    </div>
                    <div class="stat-title">
                        Variants
                    </div>
                    <div class="stat-value text-accent">
                        200+
                    </div>
                    <div class="stat-desc">
                        Color & style options
                    </div>
                </div>

                <div class="stat">
                    <div class="stat-figure text-info">
                        <BpIcon
                            name="shield"
                            class="w-8 h-8"
                        />
                    </div>
                    <div class="stat-title">
                        Accessibility
                    </div>
                    <div class="stat-value text-info">
                        WCAG 2.1 AA
                    </div>
                    <div class="stat-desc">
                        Compliant
                    </div>
                </div>
            </div>
        </section>

        <!-- Quick Navigation -->
        <section class="mb-16">
            <div class="card bg-primary text-primary-content shadow-xl">
                <div class="card-body text-center">
                    <h2 class="card-title text-2xl justify-center mb-4">
                        <BpIcon
                            name="navigation"
                            class="w-6 h-6"
                        />
                        Ready to Explore?
                    </h2>
                    <p class="mb-6">
                        Dive deep into our component library and discover all the possibilities for building amazing interfaces.
                    </p>
                    <div class="card-actions justify-center">
                        <NuxtLink
                            to="/examples"
                            class="btn btn-secondary btn-lg"
                        >
                            <BpIcon
                                name="file"
                                class="w-5 h-5 mr-2"
                            />
                            View Examples
                        </NuxtLink>
                        <NuxtLink
                            to="/installation"
                            class="btn btn-outline btn-lg"
                        >
                            <BpIcon
                                name="download"
                                class="w-5 h-5 mr-2"
                            />
                            Get Started
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </section>
    </div>
</div>
</template>

<script setup lang="ts">
// Page metadata
definePageMeta({
    title: 'Components',
    description: 'Comprehensive component library for Nuxt Design System - browse all available components by category',
})

// Navigation function
function navigateToCategory(category: string) {
    navigateTo(`/components/${category}`)
}

// Theme management
function setTheme(theme: string) {
    if (import.meta.client) {
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
</script>

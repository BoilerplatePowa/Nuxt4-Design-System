<template>
    <div class="min-h-screen bg-base-100">
        <div class="container mx-auto px-4 py-8">
            <!-- Breadcrumb -->
            <div class="text-sm breadcrumbs mb-6">
                <ul>
                    <li><NuxtLink to="/">Home</NuxtLink></li>
                    <li><NuxtLink to="/components">Components</NuxtLink></li>
                    <li>Layout</li>
                </ul>
            </div>

            <!-- Page Header -->
            <div class="mb-12">
                <div class="flex items-center gap-4 mb-4">
                    <div class="bg-success/20 p-4 rounded-full">
                        <Grid class="w-12 h-12 text-success" />
                    </div>
                    <div>
                        <h1 class="text-5xl font-bold">Layout</h1>
                        <p class="text-xl text-base-content/70">Structural UI components</p>
                    </div>
                </div>
                <p class="text-lg text-base-content/70 max-w-3xl">
                    Components for organizing content and creating responsive layouts.
                </p>
            </div>

            <!-- Component Grid -->
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                <!-- Divider Component -->
                <div class="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
                    <div class="card-body">
                        <div class="flex items-center gap-3 mb-4">
                            <Minus class="w-8 h-8 text-neutral" />
                            <h2 class="card-title text-xl">BpDivider</h2>
                        </div>
                        <p class="text-base-content/70 mb-4">
                            Divide content horizontally or vertically.
                        </p>

                        <div class="flex flex-wrap gap-2 mb-4">
                            <span class="badge">Horizontal</span>
                            <span class="badge">Vertical</span>
                            <span class="badge">Colored</span>
                            <span class="badge">Positioned</span>
                        </div>

                        <div class="card-actions justify-end">
                            <NuxtLink
                                to="/components/layout/divider"
                                class="btn btn-neutral btn-sm"
                            >
                                View Details
                            </NuxtLink>
                        </div>
                    </div>
                </div>

                <!-- Drawer -->
                <div class="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
                    <div class="card-body">
                        <div class="flex items-center gap-3 mb-4">
                            <PanelLeft class="w-8 h-8 text-primary" />
                            <h2 class="card-title text-xl">BpDrawer</h2>
                        </div>
                        <p class="text-base-content/70 mb-4">Offcanvas sidebar layout.</p>
                        <div class="card-actions justify-end">
                            <NuxtLink to="/components/layout/drawer" class="btn btn-primary btn-sm">
                                View Details
                            </NuxtLink>
                        </div>
                    </div>
                </div>

                <!-- Footer -->
                <div class="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
                    <div class="card-body">
                        <div class="flex items-center gap-3 mb-4">
                            <Layout class="w-8 h-8 text-secondary" />
                            <h2 class="card-title text-xl">BpFooter</h2>
                        </div>
                        <p class="text-base-content/70 mb-4">Site footer with sections.</p>
                        <div class="card-actions justify-end">
                            <NuxtLink
                                to="/components/layout/footer"
                                class="btn btn-secondary btn-sm"
                            >
                                View Details
                            </NuxtLink>
                        </div>
                    </div>
                </div>

                <!-- Hero -->
                <div class="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
                    <div class="card-body">
                        <div class="flex items-center gap-3 mb-4">
                            <Image class="w-8 h-8 text-accent" />
                            <h2 class="card-title text-xl">BpHero</h2>
                        </div>
                        <p class="text-base-content/70 mb-4">Large hero section with overlay.</p>
                        <div class="card-actions justify-end">
                            <NuxtLink to="/components/layout/hero" class="btn btn-accent btn-sm">
                                View Details
                            </NuxtLink>
                        </div>
                    </div>
                </div>

                <!-- Indicator -->
                <div class="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
                    <div class="card-body">
                        <div class="flex items-center gap-3 mb-4">
                            <Activity class="w-8 h-8 text-info" />
                            <h2 class="card-title text-xl">BpIndicator</h2>
                        </div>
                        <p class="text-base-content/70 mb-4">
                            Place elements on corners of another element.
                        </p>
                        <div class="card-actions justify-end">
                            <NuxtLink to="/components/layout/indicator" class="btn btn-info btn-sm">
                                View Details
                            </NuxtLink>
                        </div>
                    </div>
                </div>

                <!-- Join -->
                <div class="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
                    <div class="card-body">
                        <div class="flex items-center gap-3 mb-4">
                            <Minus class="w-8 h-8 text-primary" />
                            <h2 class="card-title text-xl">BpJoin</h2>
                        </div>
                        <p class="text-base-content/70 mb-4">
                            Group items with shared border radius.
                        </p>
                        <div class="card-actions justify-end">
                            <NuxtLink to="/components/layout/join" class="btn btn-primary btn-sm">
                                View Details
                            </NuxtLink>
                        </div>
                    </div>
                </div>

                <!-- Mask -->
                <div class="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
                    <div class="card-body">
                        <div class="flex items-center gap-3 mb-4">
                            <Image class="w-8 h-8 text-warning" />
                            <h2 class="card-title text-xl">BpMask</h2>
                        </div>
                        <p class="text-base-content/70 mb-4">Crop content to common shapes.</p>
                        <div class="card-actions justify-end">
                            <NuxtLink to="/components/layout/mask" class="btn btn-warning btn-sm">
                                View Details
                            </NuxtLink>
                        </div>
                    </div>
                </div>

                <!-- Stack -->
                <div class="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
                    <div class="card-body">
                        <div class="flex items-center gap-3 mb-4">
                            <Layers class="w-8 h-8 text-success" />
                            <h2 class="card-title text-xl">BpStack</h2>
                        </div>
                        <p class="text-base-content/70 mb-4">Visually stack elements.</p>
                        <div class="card-actions justify-end">
                            <NuxtLink to="/components/layout/stack" class="btn btn-success btn-sm">
                                View Details
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Navigation -->
            <section class="mb-16">
                <div class="card bg-primary text-primary-content shadow-xl">
                    <div class="card-body text-center">
                        <h2 class="card-title text-2xl justify-center mb-4">
                            <Navigation class="w-6 h-6" />
                            Explore more components
                        </h2>
                        <div class="card-actions justify-center">
                            <NuxtLink to="/components" class="btn btn-secondary btn-lg">
                                <Grid class="w-5 h-5 mr-2" />
                                All Components
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script setup lang="ts">
import {
    Grid,
    Minus,
    PanelLeft,
    Layout,
    Image,
    Activity,
    Layers,
    Navigation,
} from 'lucide-vue-next'

definePageMeta({
    title: 'Layout Components',
    description: 'Structural components for layout',
})

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

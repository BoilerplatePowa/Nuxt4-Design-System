<template>
    <div class="min-h-screen bg-base-100">
        <div class="container mx-auto px-4 py-8">
            <!-- Breadcrumb -->
            <div class="text-sm breadcrumbs mb-6">
                <ul>
                    <li><NuxtLink to="/">Home</NuxtLink></li>
                    <li><NuxtLink to="/components">Components</NuxtLink></li>
                    <li>Navigation</li>
                </ul>
            </div>

            <!-- Page Header -->
            <div class="mb-12">
                <div class="flex items-center gap-4 mb-4">
                    <div class="bg-warning/20 p-4 rounded-full">
                        <Navigation class="w-12 h-12 text-warning" />
                    </div>
                    <div>
                        <h1 class="text-5xl font-bold">Navigation</h1>
                        <p class="text-xl text-base-content/70">Wayfinding and menus</p>
                    </div>
                </div>
                <p class="text-lg text-base-content/70 max-w-3xl">
                    Navigation components provide structured access to pages and sections.
                </p>
            </div>

            <!-- Component Grid -->
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                <!-- Tabs Component -->
                <div class="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
                    <div class="card-body">
                        <div class="flex items-center gap-3 mb-4">
                            <Navigation class="w-8 h-8 text-primary" />
                            <h2 class="card-title text-xl">BpTabs</h2>
                        </div>
                        <p class="text-base-content/70 mb-4">
                            Tab navigation with variants, sizes, badges and v-model support.
                        </p>
                        <div class="flex flex-wrap gap-2 mb-4">
                            <span class="badge badge-primary">Bordered</span>
                            <span class="badge badge-primary">Lifted</span>
                            <span class="badge badge-primary">Boxed</span>
                        </div>
                        <div class="card-actions justify-end">
                            <NuxtLink
                                to="/components/navigation/tabs"
                                class="btn btn-primary btn-sm"
                            >
                                View Details
                            </NuxtLink>
                        </div>
                    </div>
                </div>

                <!-- Steps -->
                <div class="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
                    <div class="card-body">
                        <div class="flex items-center gap-3 mb-4">
                            <Navigation class="w-8 h-8 text-accent" />
                            <h2 class="card-title text-xl">BpSteps</h2>
                        </div>
                        <p class="text-base-content/70 mb-4">Progress indicator for flows.</p>
                        <div class="card-actions justify-end">
                            <NuxtLink
                                to="/components/navigation/steps"
                                class="btn btn-accent btn-sm"
                            >
                                View Details
                            </NuxtLink>
                        </div>
                    </div>
                </div>

                <!-- Breadcrumbs -->
                <div class="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
                    <div class="card-body">
                        <div class="flex items-center gap-3 mb-4">
                            <Navigation class="w-8 h-8 text-secondary" />
                            <h2 class="card-title text-xl">Breadcrumbs</h2>
                        </div>
                        <p class="text-base-content/70 mb-4">Hierarchical navigation trail.</p>
                        <div class="card-actions justify-end">
                            <NuxtLink
                                to="/components/navigation/breadcrumbs"
                                class="btn btn-secondary btn-sm"
                            >
                                View Details
                            </NuxtLink>
                        </div>
                    </div>
                </div>

                <!-- Menu -->
                <div class="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
                    <div class="card-body">
                        <div class="flex items-center gap-3 mb-4">
                            <Menu class="w-8 h-8 text-info" />
                            <h2 class="card-title text-xl">Menu</h2>
                        </div>
                        <p class="text-base-content/70 mb-4">Vertical and horizontal menus.</p>
                        <div class="card-actions justify-end">
                            <NuxtLink to="/components/navigation/menu" class="btn btn-info btn-sm">
                                View Details
                            </NuxtLink>
                        </div>
                    </div>
                </div>

                <!-- Navbar -->
                <div class="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
                    <div class="card-body">
                        <div class="flex items-center gap-3 mb-4">
                            <Layout class="w-8 h-8 text-success" />
                            <h2 class="card-title text-xl">Navbar</h2>
                        </div>
                        <p class="text-base-content/70 mb-4">Top navigation bar.</p>
                        <div class="card-actions justify-end">
                            <NuxtLink
                                to="/components/navigation/navbar"
                                class="btn btn-success btn-sm"
                            >
                                View Details
                            </NuxtLink>
                        </div>
                    </div>
                </div>

                <!-- Pagination -->
                <div class="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
                    <div class="card-body">
                        <div class="flex items-center gap-3 mb-4">
                            <Navigation class="w-8 h-8 text-warning" />
                            <h2 class="card-title text-xl">Pagination</h2>
                        </div>
                        <p class="text-base-content/70 mb-4">Joined buttons for page navigation.</p>
                        <div class="card-actions justify-end">
                            <NuxtLink
                                to="/components/navigation/pagination"
                                class="btn btn-warning btn-sm"
                            >
                                View Details
                            </NuxtLink>
                        </div>
                    </div>
                </div>

                <!-- Link -->
                <div class="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
                    <div class="card-body">
                        <div class="flex items-center gap-3 mb-4">
                            <Link class="w-8 h-8 text-primary" />
                            <h2 class="card-title text-xl">Link</h2>
                        </div>
                        <p class="text-base-content/70 mb-4">Underline styles for links.</p>
                        <div class="card-actions justify-end">
                            <NuxtLink
                                to="/components/navigation/link"
                                class="btn btn-primary btn-sm"
                            >
                                View Details
                            </NuxtLink>
                        </div>
                    </div>
                </div>

                <!-- Dock -->
                <div class="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
                    <div class="card-body">
                        <div class="flex items-center gap-3 mb-4">
                            <Smartphone class="w-8 h-8 text-accent" />
                            <h2 class="card-title text-xl">Dock</h2>
                        </div>
                        <p class="text-base-content/70 mb-4">Bottom navigation dock.</p>
                        <div class="card-actions justify-end">
                            <NuxtLink
                                to="/components/navigation/dock"
                                class="btn btn-accent btn-sm"
                            >
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
    Navigation,
    Menu,
    Layout,
    Link,
    Smartphone,
    Grid,
} from 'lucide-vue-next'

definePageMeta({
    title: 'Navigation Components',
    description: 'Tabs, steps and navigation patterns',
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

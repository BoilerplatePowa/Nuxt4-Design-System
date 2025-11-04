<template>
    <div class="min-h-screen bg-base-100">
        <div class="container mx-auto px-4 py-8">
            <div class="text-sm breadcrumbs mb-6">
                <ul>
                    <li><NuxtLink to="/">Home</NuxtLink></li>
                    <li><NuxtLink to="/components">Components</NuxtLink></li>
                    <li><NuxtLink to="/components/navigation">Navigation</NuxtLink></li>
                    <li>Navbar</li>
                </ul>
            </div>

            <div class="mb-12">
                <h1 class="text-5xl font-bold mb-4">Navbar</h1>
                <p class="text-xl text-base-content/70 max-w-3xl">Top navigation bar.</p>
            </div>

            <section class="mb-16">
                <h2 class="text-3xl font-bold mb-6">Examples</h2>
                <div class="card bg-base-200 shadow-xl">
                    <div class="card-body">
                        <div class="navbar bg-base-100 rounded-box">
                            <div class="navbar-start">
                                <a class="btn btn-ghost text-xl">Nuxt DS</a>
                            </div>
                            <div class="navbar-center hidden lg:flex">
                                <ul class="menu menu-horizontal px-1">
                                    <li><a>Docs</a></li>
                                    <li><a>Components</a></li>
                                </ul>
                            </div>
                            <div class="navbar-end">
                                <button class="btn btn-primary btn-sm">Get Started</button>
                            </div>
                        </div>
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
import { ArrowLeft, Grid } from 'lucide-vue-next'

definePageMeta({ title: 'Navbar', description: 'Navbar examples' })

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

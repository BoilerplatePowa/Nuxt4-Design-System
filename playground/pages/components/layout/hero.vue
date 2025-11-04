<template>
    <div class="min-h-screen bg-base-100">
        <div class="container mx-auto px-4 py-8">
            <div class="text-sm breadcrumbs mb-6">
                <ul>
                    <li><NuxtLink to="/">Home</NuxtLink></li>
                    <li><NuxtLink to="/components">Components</NuxtLink></li>
                    <li><NuxtLink to="/components/layout">Layout</NuxtLink></li>
                    <li>Hero</li>
                </ul>
            </div>

            <div class="mb-12">
                <h1 class="text-5xl font-bold mb-4">Hero</h1>
                <p class="text-xl text-base-content/70 max-w-3xl">
                    Large hero section with overlay.
                </p>
            </div>

            <section class="mb-16">
                <h2 class="text-3xl font-bold mb-6">Examples</h2>
                <div class="card bg-base-200 shadow-xl">
                    <div class="card-body">
                        <div
                            class="hero min-h-[220px] rounded-box"
                            style="background-image: url('https://picsum.photos/1200/300')"
                        >
                            <div class="hero-overlay bg-opacity-60"></div>
                            <div class="hero-content text-center text-neutral-content">
                                <div class="max-w-md">
                                    <h1 class="mb-5 text-5xl font-bold">Hello</h1>
                                    <p class="mb-5">Welcome to the design system.</p>
                                    <button class="btn btn-primary">Get Started</button>
                                </div>
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
                            <NuxtLink to="/components/layout" class="btn btn-primary">
                                <ArrowLeft class="w-4 h-4 mr-2" /> Back to Layout
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

definePageMeta({ title: 'Hero', description: 'Hero examples' })

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

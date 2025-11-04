<template>
    <div class="min-h-screen bg-base-100">
        <div class="container mx-auto px-4 py-8">
            <div class="text-sm breadcrumbs mb-6">
                <ul>
                    <li><NuxtLink to="/">Home</NuxtLink></li>
                    <li><NuxtLink to="/components">Components</NuxtLink></li>
                    <li><NuxtLink to="/components/feedback">Feedback</NuxtLink></li>
                    <li>Radial Progress</li>
                </ul>
            </div>

            <div class="mb-12">
                <h1 class="text-5xl font-bold mb-4">Radial Progress</h1>
                <p class="text-xl text-base-content/70 max-w-3xl">Circular progress indicator.</p>
            </div>

            <section class="mb-16">
                <h2 class="text-3xl font-bold mb-6">Examples</h2>
                <div class="card bg-base-200 shadow-xl">
                    <div class="card-body flex gap-8 items-center">
                        <div
                            class="radial-progress"
                            style="--value: 25"
                            role="progressbar"
                            aria-valuenow="25"
                        >
                            25%
                        </div>
                        <div
                            class="radial-progress text-primary"
                            style="--value: 50"
                            role="progressbar"
                            aria-valuenow="50"
                        >
                            50%
                        </div>
                        <div
                            class="radial-progress text-accent"
                            style="--value: 85; --size: 6rem"
                            role="progressbar"
                            aria-valuenow="85"
                        >
                            85%
                        </div>
                    </div>
                </div>
            </section>

            <section class="mb-16">
                <div class="card bg-base-200 shadow-xl">
                    <div class="card-body text-center">
                        <h2 class="card-title text-2xl justify-center mb-4">Explore More</h2>
                        <div class="card-actions justify-center">
                            <NuxtLink to="/components/feedback" class="btn btn-primary">
                                <ArrowLeft class="w-4 h-4 mr-2" /> Back to Feedback
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

definePageMeta({ title: 'Radial Progress', description: 'Circular progress examples' })

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

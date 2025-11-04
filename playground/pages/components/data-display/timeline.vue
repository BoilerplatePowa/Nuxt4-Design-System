<template>
    <div class="min-h-screen bg-base-100">
        <div class="container mx-auto px-4 py-8">
            <div class="text-sm breadcrumbs mb-6">
                <ul>
                    <li><NuxtLink to="/">Home</NuxtLink></li>
                    <li><NuxtLink to="/components">Components</NuxtLink></li>
                    <li><NuxtLink to="/components/data-display">Data Display</NuxtLink></li>
                    <li>Timeline</li>
                </ul>
            </div>

            <div class="mb-12">
                <h1 class="text-5xl font-bold mb-4">BpTimeline</h1>
                <p class="text-xl text-base-content/70 max-w-3xl">Chronological events display.</p>
            </div>

            <section class="mb-16">
                <h2 class="text-3xl font-bold mb-6">Examples</h2>
                <div class="grid md:grid-cols-2 gap-6">
                    <div class="card bg-base-200 shadow-xl">
                        <div class="card-body">
                            <h3 class="card-title text-xl mb-4">Simple</h3>
                            <BpTimeline :items="itemsSimple" />
                        </div>
                    </div>

                    <div class="card bg-base-200 shadow-xl">
                        <div class="card-body">
                            <h3 class="card-title text-xl mb-4">Complex</h3>
                            <BpTimeline :items="itemsComplex" variant="complex" />
                        </div>
                    </div>
                </div>
            </section>

            <section class="mb-16">
                <div class="card bg-base-200 shadow-xl">
                    <div class="card-body text-center">
                        <h2 class="card-title text-2xl justify-center mb-4">Explore More</h2>
                        <div class="card-actions justify-center">
                            <NuxtLink to="/components/data-display" class="btn btn-primary">
                                <ArrowLeft class="w-4 h-4 mr-2" /> Back to Data Display
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

const itemsSimple = [
    { title: 'Project created' },
    { title: 'First commit' },
    { title: 'Release v1.0.0' },
]

const itemsComplex = [
    { title: 'Design', description: 'Initial design completed', timestamp: '2024-01-12' },
    { title: 'Development', description: 'Core features implemented', timestamp: '2024-02-05' },
    { title: 'QA', description: 'Testing and QA', timestamp: '2024-03-20' },
]

definePageMeta({ title: 'Timeline Component', description: 'Examples and usage for timeline' })

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

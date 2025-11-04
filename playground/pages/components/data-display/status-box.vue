<template>
    <div class="min-h-screen bg-base-100">
        <div class="container mx-auto px-4 py-8">
            <div class="text-sm breadcrumbs mb-6">
                <ul>
                    <li><NuxtLink to="/">Home</NuxtLink></li>
                    <li><NuxtLink to="/components">Components</NuxtLink></li>
                    <li><NuxtLink to="/components/data-display">Data Display</NuxtLink></li>
                    <li>Status Box</li>
                </ul>
            </div>

            <div class="mb-12">
                <h1 class="text-5xl font-bold mb-4">BpStatusBox</h1>
                <p class="text-xl text-base-content/70 max-w-3xl">
                    Rich status box with title, message and actions.
                </p>
            </div>

            <section class="mb-16">
                <h2 class="text-3xl font-bold mb-6">Examples</h2>
                <div class="grid md:grid-cols-2 gap-6">
                    <div class="card bg-base-200 shadow-xl">
                        <div class="card-body">
                            <BpStatusBox
                                variant="success"
                                title="Deployed"
                                message="Your app is live."
                            />
                        </div>
                    </div>
                    <div class="card bg-base-200 shadow-xl">
                        <div class="card-body">
                            <BpStatusBox
                                variant="warning"
                                title="Pending checks"
                                message="Some tests are still running."
                                :actions="[{ label: 'View logs', variant: 'outline' }]"
                            />
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

definePageMeta({ title: 'Status Box Component', description: 'Examples and usage for status box' })

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

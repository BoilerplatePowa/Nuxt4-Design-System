<template>
    <div class="min-h-screen bg-base-100">
        <div class="container mx-auto px-4 py-8">
            <!-- Breadcrumb -->
            <div class="text-sm breadcrumbs mb-6">
                <ul>
                    <li><NuxtLink to="/">Home</NuxtLink></li>
                    <li><NuxtLink to="/components">Components</NuxtLink></li>
                    <li><NuxtLink to="/components/icons">Icons</NuxtLink></li>
                    <li>Icon</li>
                </ul>
            </div>

            <!-- Header -->
            <div class="mb-12">
                <h1 class="text-5xl font-bold mb-4">BpIcon</h1>
                <p class="text-xl text-base-content/70 max-w-3xl">
                    Render Lucide icons by name with size and color. Great for buttons and UI
                    indicators.
                </p>
            </div>

            <!-- Examples -->
            <section class="mb-16">
                <h2 class="text-3xl font-bold mb-6">Examples</h2>
                <div class="card bg-base-200 shadow-xl">
                    <div class="card-body">
                        <div class="grid sm:grid-cols-4 gap-6 items-center">
                            <Heart class="w-8 h-8 text-error" />
                            <Star class="w-8 h-8 text-warning" />
                            <CheckCircle class="w-8 h-8 text-success" />
                            <Info class="w-8 h-8 text-info" />
                            <Zap class="w-10 h-10 text-primary" />
                            <Settings class="w-10 h-10 text-secondary" />
                            <User class="w-6 h-6 text-accent" />
                            <Home class="w-6 h-6 text-neutral" />
                        </div>
                    </div>
                </div>
            </section>

            <!-- Usage -->
            <section class="mb-16">
                <h2 class="text-3xl font-bold mb-6">Usage</h2>
                <div class="card bg-base-200 shadow-xl">
                    <div class="card-body">
                        <div class="mockup-code text-left">
                            <pre
                                data-prefix="<"
                            ><code>&lt;Heart class="w-6 h-6 text-error" /&gt;</code></pre>
                            <pre
                                data-prefix="<"
                            ><code>&lt;BpButton&gt;&lt;Zap class="w-4 h-4 mr-2" /&gt;Click&lt;/BpButton&gt;</code></pre>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Navigation -->
            <section class="mb-16">
                <div class="card bg-base-200 shadow-xl">
                    <div class="card-body text-center">
                        <h2 class="card-title text-2xl justify-center mb-4">Explore More</h2>
                        <div class="card-actions justify-center">
                            <NuxtLink to="/components/icons" class="btn btn-secondary">
                                <ArrowLeft class="w-4 h-4 mr-2" /> Back to Icons
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
import { onMounted } from 'vue'
import { Heart, Star, CheckCircle, Info, Zap, Settings, User, Home, ArrowLeft, Grid } from 'lucide-vue-next'

definePageMeta({
    title: 'BpIcon Component',
    description: 'Props, examples, and usage for BpIcon',
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

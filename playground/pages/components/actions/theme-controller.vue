<template>
    <div class="min-h-screen bg-base-100">
        <div class="container mx-auto px-4 py-8">
            <!-- Breadcrumb -->
            <div class="text-sm breadcrumbs mb-6">
                <ul>
                    <li><NuxtLink to="/">Home</NuxtLink></li>
                    <li><NuxtLink to="/components">Components</NuxtLink></li>
                    <li><NuxtLink to="/components/actions">Actions</NuxtLink></li>
                    <li>Theme Controller</li>
                </ul>
            </div>

            <!-- Header -->
            <div class="mb-12">
                <h1 class="text-5xl font-bold mb-4">BpThemeController</h1>
                <p class="text-xl text-base-content/70 max-w-3xl">
                    Toggle and select DaisyUI themes with multiple UI variants (button, toggle,
                    switch, dropdown, radio).
                </p>
            </div>

            <!-- Examples -->
            <section class="mb-16">
                <h2 class="text-3xl font-bold mb-6">Examples</h2>

                <div class="grid md:grid-cols-2 gap-8">
                    <div class="card bg-base-200 shadow-xl">
                        <div class="card-body">
                            <h3 class="card-title text-xl mb-4">Button</h3>
                            <BpThemeController variant="button" :show-label="true" />
                        </div>
                    </div>

                    <div class="card bg-base-200 shadow-xl">
                        <div class="card-body">
                            <h3 class="card-title text-xl mb-4">Toggle & Switch</h3>
                            <div class="flex items-center gap-6">
                                <BpThemeController variant="toggle" />
                                <BpThemeController variant="switch" />
                            </div>
                        </div>
                    </div>

                    <div class="card bg-base-200 shadow-xl">
                        <div class="card-body">
                            <h3 class="card-title text-xl mb-4">Dropdown</h3>
                            <BpThemeController variant="dropdown" />
                        </div>
                    </div>

                    <div class="card bg-base-200 shadow-xl">
                        <div class="card-body">
                            <h3 class="card-title text-xl mb-4">Radio</h3>
                            <BpThemeController variant="radio" :themes="themes" />
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
                            <NuxtLink to="/components/actions" class="btn btn-primary">
                                <BpIcon name="arrow-left" class="w-4 h-4 mr-2" /> Back to Actions
                            </NuxtLink>
                            <NuxtLink to="/components" class="btn btn-outline">
                                <BpIcon name="grid" class="w-4 h-4 mr-2" /> All Components
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script setup lang="ts">
const themes = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { value: 'corporate', label: 'Corporate' },
    { value: 'synthwave', label: 'Synthwave' },
]

definePageMeta({
    title: 'BpThemeController Component',
    description: 'Examples and usage for BpThemeController',
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


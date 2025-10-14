<template>
    <div class="min-h-screen bg-base-100">
        <div class="container mx-auto px-4 py-8">
            <div class="text-sm breadcrumbs mb-6">
                <ul>
                    <li><NuxtLink to="/">Home</NuxtLink></li>
                    <li><NuxtLink to="/components">Components</NuxtLink></li>
                    <li><NuxtLink to="/components/data-input">Data Input</NuxtLink></li>
                    <li>Toggle</li>
                </ul>
            </div>

            <div class="mb-12">
                <h1 class="text-5xl font-bold mb-4">BpToggle</h1>
                <p class="text-xl text-base-content/70 max-w-3xl">Switch-style checkbox.</p>
            </div>

            <section class="mb-16">
                <h2 class="text-3xl font-bold mb-6">Examples</h2>
                <div class="card bg-base-200 shadow-xl">
                    <div class="card-body space-y-4">
                        <input type="checkbox" class="toggle toggle-primary" />
                        <div class="flex items-center gap-6">
                            <input type="checkbox" class="toggle toggle-xs" />
                            <input type="checkbox" class="toggle" checked />
                            <input type="checkbox" class="toggle toggle-lg" />
                        </div>
                    </div>
                </div>
            </section>

            <section class="mb-16">
                <div class="card bg-base-200 shadow-xl">
                    <div class="card-body text-center">
                        <h2 class="card-title text-2xl justify-center mb-4">Explore More</h2>
                        <div class="card-actions justify-center">
                            <NuxtLink to="/components/data-input" class="btn btn-primary">
                                <BpIcon name="arrow-left" class="w-4 h-4 mr-2" /> Back to Data Input
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
definePageMeta({ title: 'Toggle Component', description: 'Examples and usage for toggle' })

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

<template>
    <div class="min-h-screen bg-base-100">
        <div class="container mx-auto px-4 py-8">
            <!-- Breadcrumb -->
            <div class="text-sm breadcrumbs mb-6">
                <ul>
                    <li><NuxtLink to="/">Home</NuxtLink></li>
                    <li><NuxtLink to="/components">Components</NuxtLink></li>
                    <li><NuxtLink to="/components/mockup">Mockup</NuxtLink></li>
                    <li>Browser</li>
                </ul>
            </div>

            <!-- Header -->
            <div class="mb-12">
                <h1 class="text-5xl font-bold mb-4">BpBrowserMockup</h1>
                <p class="text-xl text-base-content/70 max-w-3xl">
                    A container styled like a browser window. Useful for showcasing pages or
                    components.
                </p>
            </div>

            <!-- Examples -->
            <section class="mb-16">
                <h2 class="text-3xl font-bold mb-6">Examples</h2>

                <div class="card bg-base-200 shadow-xl">
                    <div class="card-body">
                        <div class="space-y-6">
                            <BpBrowserMockup>
                                <template #toolbar>
                                    <div class="input w-full">https://design-system.dev</div>
                                </template>
                                <div class="p-6">
                                    <h3 class="text-2xl font-bold mb-4">Demo Content</h3>
                                    <p class="opacity-70 mb-4">Place any content inside.</p>
                                    <BpButton color="primary">Primary Action</BpButton>
                                </div>
                            </BpBrowserMockup>

                            <BpBrowserMockup>
                                <div class="p-6">
                                    <div class="grid grid-cols-2 gap-4">
                                        <div class="card bg-base-100 shadow">
                                            <div class="card-body">Card A</div>
                                        </div>
                                        <div class="card bg-base-100 shadow">
                                            <div class="card-body">Card B</div>
                                        </div>
                                    </div>
                                </div>
                            </BpBrowserMockup>
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
                            <NuxtLink to="/components/mockup" class="btn btn-primary">
                                <BpIcon name="arrow-left" class="w-4 h-4 mr-2" /> Back to Mockup
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
definePageMeta({
    title: 'BpBrowserMockup Component',
    description: 'Examples and usage for BpBrowserMockup',
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

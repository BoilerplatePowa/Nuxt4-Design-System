<template>
    <div class="min-h-screen bg-base-100">
        <div class="container mx-auto px-4 py-8">
            <!-- Breadcrumb -->
            <div class="text-sm breadcrumbs mb-6">
                <ul>
                    <li><NuxtLink to="/">Home</NuxtLink></li>
                    <li><NuxtLink to="/components">Components</NuxtLink></li>
                    <li>Mockup</li>
                </ul>
            </div>

            <!-- Header -->
            <div class="mb-12">
                <div class="flex items-center gap-4 mb-4">
                    <div class="bg-neutral/20 p-4 rounded-full">
                        <BpIcon name="monitor" class="w-12 h-12 text-neutral" />
                    </div>
                    <div>
                        <h1 class="text-5xl font-bold">Mockup</h1>
                        <p class="text-xl text-base-content/70">Device and window mockups</p>
                    </div>
                </div>
                <p class="text-lg text-base-content/70 max-w-3xl">
                    Visual containers that look like OS windows, browsers or phones.
                </p>
            </div>

            <!-- Component Grid -->
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                <!-- Browser Mockup -->
                <div class="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
                    <div class="card-body">
                        <div class="flex items-center gap-3 mb-4">
                            <BpIcon name="globe" class="w-8 h-8 text-primary" />
                            <h2 class="card-title text-xl">BpBrowserMockup</h2>
                        </div>
                        <p class="text-base-content/70 mb-4">Browser window-styled container.</p>
                        <div class="card-actions justify-end">
                            <NuxtLink
                                to="/components/mockup/browser"
                                class="btn btn-primary btn-sm"
                            >
                                View Details
                            </NuxtLink>
                        </div>
                    </div>
                </div>

                <!-- Phone Mockup -->
                <div class="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
                    <div class="card-body">
                        <div class="flex items-center gap-3 mb-4">
                            <BpIcon name="smartphone" class="w-8 h-8 text-accent" />
                            <h2 class="card-title text-xl">BpPhoneMockup</h2>
                        </div>
                        <p class="text-base-content/70 mb-4">Phone-styled container.</p>
                        <div class="card-actions justify-end">
                            <NuxtLink to="/components/mockup/phone" class="btn btn-accent btn-sm">
                                View Details
                            </NuxtLink>
                        </div>
                    </div>
                </div>

                <!-- Code Mockup -->
                <div class="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
                    <div class="card-body">
                        <div class="flex items-center gap-3 mb-4">
                            <BpIcon name="code" class="w-8 h-8 text-info" />
                            <h2 class="card-title text-xl">BpCodeMockup</h2>
                        </div>
                        <p class="text-base-content/70 mb-4">Code editor-style container.</p>
                        <div class="card-actions justify-end">
                            <NuxtLink to="/components/mockup/code" class="btn btn-info btn-sm">
                                View Details
                            </NuxtLink>
                        </div>
                    </div>
                </div>

                <!-- Window Mockup -->
                <div class="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
                    <div class="card-body">
                        <div class="flex items-center gap-3 mb-4">
                            <BpIcon name="window" class="w-8 h-8 text-warning" />
                            <h2 class="card-title text-xl">BpWindowMockup</h2>
                        </div>
                        <p class="text-base-content/70 mb-4">Desktop window-style container.</p>
                        <div class="card-actions justify-end">
                            <NuxtLink to="/components/mockup/window" class="btn btn-warning btn-sm">
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
                            <BpIcon name="navigation" class="w-6 h-6" />
                            Explore more components
                        </h2>
                        <div class="card-actions justify-center">
                            <NuxtLink to="/components" class="btn btn-secondary btn-lg">
                                <BpIcon name="grid" class="w-5 h-5 mr-2" />
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
definePageMeta({
    title: 'Mockup Components',
    description: 'Device and window mockups',
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

<template>
    <div class="min-h-screen bg-base-100">
        <div class="container mx-auto px-4 py-8">
            <!-- Breadcrumb -->
            <div class="text-sm breadcrumbs mb-6">
                <ul>
                    <li><NuxtLink to="/">Home</NuxtLink></li>
                    <li><NuxtLink to="/components">Components</NuxtLink></li>
                    <li><NuxtLink to="/components/data-display">Data Display</NuxtLink></li>
                    <li>Avatar</li>
                </ul>
            </div>

            <!-- Header -->
            <div class="mb-12">
                <h1 class="text-5xl font-bold mb-4">BpAvatar</h1>
                <p class="text-xl text-base-content/70 max-w-3xl">
                    Avatar component for user thumbnails with sizes and placeholders.
                </p>
            </div>

            <!-- Examples -->
            <section class="mb-16">
                <h2 class="text-3xl font-bold mb-6">Examples</h2>
                <div class="card bg-base-200 shadow-xl">
                    <div class="card-body">
                        <div class="flex items-center gap-6 flex-wrap">
                            <div class="avatar">
                                <div class="w-8 rounded">
                                    <img src="https://picsum.photos/64" alt="avatar" />
                                </div>
                            </div>
                            <div class="avatar">
                                <div class="w-12 rounded">
                                    <img src="https://picsum.photos/96" alt="avatar" />
                                </div>
                            </div>
                            <div class="avatar placeholder">
                                <div class="bg-neutral text-neutral-content rounded w-12">
                                    <span>AB</span>
                                </div>
                            </div>
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
                            <NuxtLink to="/components/data-display" class="btn btn-primary">
                                <BpIcon name="arrow-left" class="w-4 h-4 mr-2" /> Back to Data
                                Display
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
    title: 'Avatar Component',
    description: 'Examples and usage for avatars',
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

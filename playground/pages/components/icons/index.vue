<template>
    <div class="min-h-screen bg-base-100">
        <div class="container mx-auto px-4 py-8">
            <!-- Breadcrumb -->
            <div class="text-sm breadcrumbs mb-6">
                <ul>
                    <li><NuxtLink to="/">Home</NuxtLink></li>
                    <li><NuxtLink to="/components">Components</NuxtLink></li>
                    <li>Icons</li>
                </ul>
            </div>

            <!-- Header -->
            <div class="mb-12">
                <div class="flex items-center gap-4 mb-4">
                    <div class="bg-neutral/20 p-4 rounded-full">
                        <BpIcon name="image" class="w-12 h-12 text-neutral" />
                    </div>
                    <div>
                        <h1 class="text-5xl font-bold">Icons</h1>
                        <p class="text-xl text-base-content/70">Lucide icon component</p>
                    </div>
                </div>
                <p class="text-lg text-base-content/70 max-w-3xl">
                    Use <code>BpIcon</code> to render any Lucide icon by name with size and color.
                </p>
            </div>

            <!-- Component Card -->
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                <div class="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
                    <div class="card-body">
                        <div class="flex items-center gap-3 mb-4">
                            <BpIcon name="image" class="w-8 h-8 text-secondary" />
                            <h2 class="card-title text-xl">BpIcon</h2>
                        </div>
                        <p class="text-base-content/70 mb-4">
                            Icon rendering with name and size props.
                        </p>
                        <div class="card-actions justify-end">
                            <NuxtLink to="/components/icons/icon" class="btn btn-secondary btn-sm">
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
    title: 'Icons',
    description: 'Icon component overview',
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

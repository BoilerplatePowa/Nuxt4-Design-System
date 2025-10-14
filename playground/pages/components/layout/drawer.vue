<template>
    <div class="min-h-screen bg-base-100">
        <div class="container mx-auto px-4 py-8">
            <div class="text-sm breadcrumbs mb-6">
                <ul>
                    <li><NuxtLink to="/">Home</NuxtLink></li>
                    <li><NuxtLink to="/components">Components</NuxtLink></li>
                    <li><NuxtLink to="/components/layout">Layout</NuxtLink></li>
                    <li>Drawer</li>
                </ul>
            </div>

            <div class="mb-12">
                <h1 class="text-5xl font-bold mb-4">Drawer</h1>
                <p class="text-xl text-base-content/70 max-w-3xl">Sidebar layout that slides in.</p>
            </div>

            <section class="mb-16">
                <h2 class="text-3xl font-bold mb-6">Examples</h2>
                <div class="card bg-base-200 shadow-xl">
                    <div class="card-body">
                        <div class="drawer">
                            <input id="layout-drawer" type="checkbox" class="drawer-toggle" />
                            <div class="drawer-content">
                                <label for="layout-drawer" class="btn">Open drawer</label>
                            </div>
                            <div class="drawer-side">
                                <label
                                    for="layout-drawer"
                                    aria-label="close sidebar"
                                    class="drawer-overlay"
                                ></label>
                                <ul class="menu p-4 w-64 min-h-full bg-base-100 text-base-content">
                                    <li><a>Item 1</a></li>
                                    <li><a>Item 2</a></li>
                                    <li><a>Item 3</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="mb-16">
                <div class="card bg-base-200 shadow-xl">
                    <div class="card-body text-center">
                        <h2 class="card-title text-2xl justify-center mb-4">Explore More</h2>
                        <div class="card-actions justify-center">
                            <NuxtLink to="/components/layout" class="btn btn-primary">
                                <BpIcon name="arrow-left" class="w-4 h-4 mr-2" /> Back to Layout
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
definePageMeta({ title: 'Drawer', description: 'Drawer layout examples' })

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

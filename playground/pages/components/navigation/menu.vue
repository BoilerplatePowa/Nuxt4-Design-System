<template>
    <div class="min-h-screen bg-base-100">
        <div class="container mx-auto px-4 py-8">
            <div class="text-sm breadcrumbs mb-6">
                <ul>
                    <li><NuxtLink to="/">Home</NuxtLink></li>
                    <li><NuxtLink to="/components">Components</NuxtLink></li>
                    <li><NuxtLink to="/components/navigation">Navigation</NuxtLink></li>
                    <li>Menu</li>
                </ul>
            </div>

            <div class="mb-12">
                <h1 class="text-5xl font-bold mb-4">Menu</h1>
                <p class="text-xl text-base-content/70 max-w-3xl">Vertical and horizontal menus.</p>
            </div>

            <section class="mb-16">
                <h2 class="text-3xl font-bold mb-6">Examples</h2>
                <div class="card bg-base-200 shadow-xl mb-6">
                    <div class="card-body">
                        <ul class="menu bg-base-100 w-56 rounded-box">
                            <li><a>Item 1</a></li>
                            <li>
                                <details open>
                                    <summary>Parent</summary>
                                    <ul>
                                        <li><a>Submenu 1</a></li>
                                        <li><a>Submenu 2</a></li>
                                    </ul>
                                </details>
                            </li>
                            <li><a>Item 3</a></li>
                        </ul>
                    </div>
                </div>

                <div class="card bg-base-200 shadow-xl">
                    <div class="card-body">
                        <ul class="menu menu-horizontal bg-base-100 rounded-box">
                            <li><a>Link</a></li>
                            <li><a>Link</a></li>
                            <li><a>Link</a></li>
                        </ul>
                    </div>
                </div>
            </section>

            <section class="mb-16">
                <div class="card bg-base-200 shadow-xl">
                    <div class="card-body text-center">
                        <h2 class="card-title text-2xl justify-center mb-4">Explore More</h2>
                        <div class="card-actions justify-center">
                            <NuxtLink to="/components/navigation" class="btn btn-primary">
                                <BpIcon name="arrow-left" class="w-4 h-4 mr-2" /> Back to Navigation
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
definePageMeta({ title: 'Menu', description: 'Menu examples' })

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

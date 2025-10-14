<template>
    <div class="min-h-screen bg-base-100">
        <div class="container mx-auto px-4 py-8">
            <!-- Breadcrumb -->
            <div class="text-sm breadcrumbs mb-6">
                <ul>
                    <li><NuxtLink to="/">Home</NuxtLink></li>
                    <li><NuxtLink to="/components">Components</NuxtLink></li>
                    <li><NuxtLink to="/components/actions">Actions</NuxtLink></li>
                    <li>Swap</li>
                </ul>
            </div>

            <!-- Header -->
            <div class="mb-12">
                <h1 class="text-5xl font-bold mb-4">BpSwap</h1>
                <p class="text-xl text-base-content/70 max-w-3xl">
                    Toggle between two visual states using a checkbox. Supports rotate, flip and
                    indeterminate styles.
                </p>
            </div>

            <!-- Examples -->
            <section class="mb-16">
                <h2 class="text-3xl font-bold mb-6">Examples</h2>

                <div class="card bg-base-200 shadow-xl mb-8">
                    <div class="card-body">
                        <h3 class="card-title text-xl mb-4">Rotate</h3>
                        <BpSwap v-model="state1" variant="rotate">
                            <template #on>🌞</template>
                            <template #off>🌚</template>
                        </BpSwap>
                    </div>
                </div>

                <div class="card bg-base-200 shadow-xl mb-8">
                    <div class="card-body">
                        <h3 class="card-title text-xl mb-4">Flip</h3>
                        <BpSwap v-model="state2" variant="flip">
                            <template #on>🔊</template>
                            <template #off>🔈</template>
                        </BpSwap>
                    </div>
                </div>

                <div class="card bg-base-200 shadow-xl">
                    <div class="card-body">
                        <h3 class="card-title text-xl mb-4">Indeterminate</h3>
                        <BpSwap v-model="state3" variant="indeterminate">
                            <template #indeterminate>🌤️</template>
                            <template #on>☀️</template>
                            <template #off>🌧️</template>
                        </BpSwap>
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
const state1 = ref(false)
const state2 = ref(false)
const state3 = ref(false)

definePageMeta({
    title: 'BpSwap Component',
    description: 'Props, examples, and usage for BpSwap',
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

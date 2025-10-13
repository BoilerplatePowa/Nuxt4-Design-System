<template>
    <div class="min-h-screen bg-base-100">
        <div class="container mx-auto px-4 py-8">
            <!-- Breadcrumb -->
            <div class="text-sm breadcrumbs mb-6">
                <ul>
                    <li><NuxtLink to="/">Home</NuxtLink></li>
                    <li><NuxtLink to="/components">Components</NuxtLink></li>
                    <li><NuxtLink to="/components/actions">Actions</NuxtLink></li>
                    <li>Modal</li>
                </ul>
            </div>

            <!-- Header -->
            <div class="mb-12">
                <h1 class="text-5xl font-bold mb-4">BpModal</h1>
                <p class="text-xl text-base-content/70 max-w-3xl">
                    Accessible dialog based on the HTML dialog element with focus management.
                </p>
            </div>

            <!-- Examples -->
            <section class="mb-16">
                <h2 class="text-3xl font-bold mb-6">Examples</h2>

                <div class="grid md:grid-cols-2 gap-8 mb-8">
                    <div class="card bg-base-200 shadow-xl">
                        <div class="card-body">
                            <h3 class="card-title text-xl mb-4">Basic</h3>
                            <BpButton color="primary" @click="openBasic">Open modal</BpButton>
                            <BpModal v-model="showBasic" title="Basic modal">
                                <p>Content goes here.</p>
                                <template #footer>
                                    <BpButton style="ghost" @click="showBasic = false">Close</BpButton>
                                    <BpButton color="primary">Confirm</BpButton>
                                </template>
                            </BpModal>
                        </div>
                    </div>

                    <div class="card bg-base-200 shadow-xl">
                        <div class="card-body">
                            <h3 class="card-title text-xl mb-4">Sizes</h3>
                            <div class="flex flex-wrap gap-2">
                                <BpButton @click="openSize('sm')">SM</BpButton>
                                <BpButton @click="openSize('md')">MD</BpButton>
                                <BpButton @click="openSize('lg')">LG</BpButton>
                                <BpButton @click="openSize('xl')">XL</BpButton>
                                <BpButton @click="openSize('full')">FULL</BpButton>
                            </div>
                            <BpModal v-model="showSized" :size="size" title="Sized modal">
                                <p>Current size: {{ size }}</p>
                                <template #footer>
                                    <BpButton style="ghost" @click="showSized = false">Close</BpButton>
                                </template>
                            </BpModal>
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
const showBasic = ref(false)
function openBasic() {
    showBasic.value = true
}

const showSized = ref(false)
const size = ref<'sm' | 'md' | 'lg' | 'xl' | 'full'>('md')
function openSize(s: 'sm' | 'md' | 'lg' | 'xl' | 'full') {
    size.value = s
    showSized.value = true
}

definePageMeta({
    title: 'BpModal Component',
    description: 'Props, examples, and usage for BpModal',
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


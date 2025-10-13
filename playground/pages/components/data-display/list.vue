<template>
    <div class="min-h-screen bg-base-100">
        <div class="container mx-auto px-4 py-8">
            <div class="text-sm breadcrumbs mb-6">
                <ul>
                    <li><NuxtLink to="/">Home</NuxtLink></li>
                    <li><NuxtLink to="/components">Components</NuxtLink></li>
                    <li><NuxtLink to="/components/data-display">Data Display</NuxtLink></li>
                    <li>List</li>
                </ul>
            </div>

            <div class="mb-12">
                <h1 class="text-5xl font-bold mb-4">BpList</h1>
                <p class="text-xl text-base-content/70 max-w-3xl">
                    Flexible list with avatars, badges and actions.
                </p>
            </div>

            <section class="mb-16">
                <h2 class="text-3xl font-bold mb-6">Examples</h2>
                <div class="card bg-base-200 shadow-xl">
                    <div class="card-body">
                        <BpList :items="items" variant="hover" @itemClick="onItem">
                            <template #item="{ item }">
                                <div class="avatar mr-3">
                                    <div class="w-10 h-10 rounded">
                                        <img :src="item.avatar" :alt="item.title" />
                                    </div>
                                </div>
                                <div class="flex-1">
                                    <div class="flex items-center gap-2">
                                        <h3 class="font-semibold">{{ item.title }}</h3>
                                        <span v-if="item.badge" class="badge badge-sm badge-info">{{ item.badge }}</span>
                                    </div>
                                    <p class="text-sm opacity-70">{{ item.subtitle }}</p>
                                </div>
                            </template>
                        </BpList>
                    </div>
                </div>
            </section>

            <section class="mb-16">
                <div class="card bg-base-200 shadow-xl">
                    <div class="card-body text-center">
                        <h2 class="card-title text-2xl justify-center mb-4">Explore More</h2>
                        <div class="card-actions justify-center">
                            <NuxtLink to="/components/data-display" class="btn btn-primary">
                                <BpIcon name="arrow-left" class="w-4 h-4 mr-2" /> Back to Data Display
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
const items = [
    { title: 'Design review', subtitle: 'Today 10:00', avatar: 'https://picsum.photos/64?1', badge: 'new' },
    { title: 'Sprint planning', subtitle: 'Tomorrow 09:00', avatar: 'https://picsum.photos/64?2' },
    { title: 'Retrospective', subtitle: 'Friday 16:00', avatar: 'https://picsum.photos/64?3' },
]

function onItem(item: unknown) {
    // eslint-disable-next-line no-console
    console.log('Clicked:', item)
}

definePageMeta({ title: 'List Component', description: 'Examples and usage for lists' })

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


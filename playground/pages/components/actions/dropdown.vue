<template>
    <div class="min-h-screen bg-base-100">
        <div class="container mx-auto px-4 py-8">
            <!-- Breadcrumb -->
            <div class="text-sm breadcrumbs mb-6">
                <ul>
                    <li><NuxtLink to="/">Home</NuxtLink></li>
                    <li><NuxtLink to="/components">Components</NuxtLink></li>
                    <li><NuxtLink to="/components/actions">Actions</NuxtLink></li>
                    <li>Dropdown</li>
                </ul>
            </div>

            <!-- Header -->
            <div class="mb-12">
                <h1 class="text-5xl font-bold mb-4">BpDropdown</h1>
                <p class="text-xl text-base-content/70 max-w-3xl">
                    Accessible dropdown menu with keyboard navigation, alignment and trigger
                    variants.
                </p>
            </div>

            <!-- Examples -->
            <section class="mb-16">
                <h2 class="text-3xl font-bold mb-6">Examples</h2>

                <div class="grid md:grid-cols-2 gap-8 mb-8">
                    <div class="card bg-base-200 shadow-xl">
                        <div class="card-body">
                            <h3 class="card-title text-xl mb-4">Basic</h3>
                            <BpDropdown
                                :items="items"
                                trigger-text="Actions"
                                @item-click="onItem"
                            />
                        </div>
                    </div>

                    <div class="card bg-base-200 shadow-xl">
                        <div class="card-body">
                            <h3 class="card-title text-xl mb-4">Alignment & Position</h3>
                            <div class="flex flex-wrap gap-4">
                                <BpDropdown :items="items" align="end" trigger-text="End" />
                                <BpDropdown :items="items" position="top" trigger-text="Top" />
                                <BpDropdown :items="items" position="left" trigger-text="Left" />
                                <BpDropdown :items="items" position="right" trigger-text="Right" />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card bg-base-200 shadow-xl">
                    <div class="card-body">
                        <h3 class="card-title text-xl mb-4">Trigger styles</h3>
                        <div class="flex flex-wrap gap-4">
                            <BpDropdown
                                :items="items"
                                trigger-text="Ghost"
                                trigger-color="neutral"
                                trigger-style="ghost"
                            />
                            <BpDropdown
                                :items="items"
                                trigger-text="Outline"
                                trigger-color="primary"
                                trigger-style="outline"
                            />
                            <BpDropdown :items="items" trigger-text="Link" trigger-style="link" />
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
import type { DropdownItem } from '../../../../src/runtime/shared/types.d'

const items: DropdownItem[] = [
    { label: 'Edit', value: 'edit' },
    { label: 'Duplicate', value: 'duplicate' },
    { label: 'Archive', value: 'archive' },
    { label: 'Delete', value: 'delete', disabled: true },
]

function onItem(item: DropdownItem) {
    console.log('Selected:', item)
}

definePageMeta({
    title: 'BpDropdown Component',
    description: 'Props, examples, and usage for BpDropdown',
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

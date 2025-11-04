<template>
    <div class="min-h-screen bg-base-100">
        <div class="container mx-auto px-4 py-8">
            <!-- Breadcrumb -->
            <div class="text-sm breadcrumbs mb-6">
                <ul>
                    <li><NuxtLink to="/">Home</NuxtLink></li>
                    <li><NuxtLink to="/components">Components</NuxtLink></li>
                    <li><NuxtLink to="/components/navigation">Navigation</NuxtLink></li>
                    <li>Tabs</li>
                </ul>
            </div>

            <!-- Header -->
            <div class="mb-12">
                <h1 class="text-5xl font-bold mb-4">BpTabs</h1>
                <p class="text-xl text-base-content/70 max-w-3xl">
                    Tab navigation with v-model, variants, sizes and badges.
                </p>
            </div>

            <!-- Examples -->
            <section class="mb-16">
                <h2 class="text-3xl font-bold mb-6">Examples</h2>

                <!-- Basic -->
                <div class="card bg-base-200 shadow-xl mb-8">
                    <div class="card-body">
                        <h3 class="card-title text-xl mb-4">Basic</h3>
                        <BpTabs v-model="active1" :tabs="tabs1" />
                        <div class="mt-4 text-sm opacity-70">Active: {{ active1 }}</div>
                    </div>
                </div>

                <!-- Variants & Sizes -->
                <div class="card bg-base-200 shadow-xl mb-8">
                    <div class="card-body">
                        <h3 class="card-title text-xl mb-4">Variants & Sizes</h3>
                        <div class="space-y-6">
                            <BpTabs :tabs="tabs2" variant="bordered" size="sm" />
                            <BpTabs :tabs="tabs2" variant="lifted" />
                            <BpTabs :tabs="tabs2" variant="boxed" size="lg" />
                        </div>
                    </div>
                </div>

                <!-- Disabled and Badges -->
                <div class="card bg-base-200 shadow-xl">
                    <div class="card-body">
                        <h3 class="card-title text-xl mb-4">Disabled & Badges</h3>
                        <BpTabs :tabs="tabs3" />
                    </div>
                </div>
            </section>

            <!-- Props -->
            <section class="mb-16">
                <h2 class="text-3xl font-bold mb-6">Props</h2>
                <div class="overflow-x-auto card bg-base-200 shadow-xl">
                    <div class="card-body p-0">
                        <table class="table table-zebra">
                            <thead>
                                <tr>
                                    <th>Prop</th>
                                    <th>Type</th>
                                    <th>Default</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><code>tabs</code></td>
                                    <td>
                                        <code
                                            >Array&lt;{ label, value?, content?, disabled?, badge?
                                            }&gt;</code
                                        >
                                    </td>
                                    <td><code>[]</code></td>
                                    <td>Tab definitions</td>
                                </tr>
                                <tr>
                                    <td><code>variant</code></td>
                                    <td>
                                        <code>'default' | 'bordered' | 'lifted' | 'boxed'</code>
                                    </td>
                                    <td><code>'default'</code></td>
                                    <td>Visual style</td>
                                </tr>
                                <tr>
                                    <td><code>size</code></td>
                                    <td><code>'xs' | 'sm' | 'md' | 'lg'</code></td>
                                    <td><code>'md'</code></td>
                                    <td>Size of tabs</td>
                                </tr>
                                <tr>
                                    <td><code>disabled</code></td>
                                    <td><code>boolean</code></td>
                                    <td><code>false</code></td>
                                    <td>Disable all tabs</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            <!-- Navigation -->
            <section class="mb-16">
                <div class="card bg-base-200 shadow-xl">
                    <div class="card-body text-center">
                        <h2 class="card-title text-2xl justify-center mb-4">Explore More</h2>
                        <div class="card-actions justify-center">
                            <NuxtLink to="/components/navigation" class="btn btn-primary">
                                <ArrowLeft class="w-4 h-4 mr-2" /> Back to Navigation
                            </NuxtLink>
                            <NuxtLink to="/components" class="btn btn-outline">
                                <Grid class="w-4 h-4 mr-2" /> All Components
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ArrowLeft, Grid } from 'lucide-vue-next'

const active1 = ref('Overview')
const tabs1 = [{ label: 'Overview' }, { label: 'Settings' }, { label: 'Profile' }]

const tabs2 = [{ label: 'Tab 1' }, { label: 'Tab 2' }, { label: 'Tab 3' }]

const tabs3 = [
    { label: 'Open', badge: 3 },
    { label: 'Pending' },
    { label: 'Closed', disabled: true },
]

definePageMeta({
    title: 'BpTabs Component',
    description: 'Props, examples, and usage for BpTabs',
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

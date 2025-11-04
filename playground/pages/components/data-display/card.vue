<template>
    <div class="min-h-screen bg-base-100">
        <div class="container mx-auto px-4 py-8">
            <!-- Breadcrumb -->
            <div class="text-sm breadcrumbs mb-6">
                <ul>
                    <li><NuxtLink to="/">Home</NuxtLink></li>
                    <li><NuxtLink to="/components">Components</NuxtLink></li>
                    <li><NuxtLink to="/components/data-display">Data Display</NuxtLink></li>
                    <li>Card</li>
                </ul>
            </div>

            <!-- Header -->
            <div class="mb-12">
                <h1 class="text-5xl font-bold mb-4">BpCard</h1>
                <p class="text-xl text-base-content/70 max-w-3xl">
                    Flexible content container with header, actions, media, badge and loading
                    overlay. Multiple variants and interactive states.
                </p>
            </div>

            <!-- Examples -->
            <section class="mb-16">
                <h2 class="text-3xl font-bold mb-6">Examples</h2>

                <!-- Basic -->
                <div class="grid md:grid-cols-2 gap-8 mb-8">
                    <div class="card bg-base-200 shadow-xl">
                        <div class="card-body">
                            <h3 class="card-title text-xl mb-4">Basic</h3>
                            <BpCard title="Card title" subtitle="Subtitle">
                                <p>Card content goes here. Use default slot for body.</p>
                                <template #actions>
                                    <BpButton size="sm">Action</BpButton>
                                </template>
                            </BpCard>
                        </div>
                    </div>

                    <div class="card bg-base-200 shadow-xl">
                        <div class="card-body">
                            <h3 class="card-title text-xl mb-4">Bordered + Badge</h3>
                            <BpCard
                                title="Project"
                                subtitle="Active"
                                variant="bordered"
                                badge="New"
                                badge-variant="success"
                            >
                                <p>Use <code>#badge</code> slot or <code>badge</code> prop.</p>
                                <template #actions>
                                    <BpButton size="sm" color="primary">Open</BpButton>
                                </template>
                            </BpCard>
                        </div>
                    </div>
                </div>

                <!-- Side & Outline -->
                <div class="grid md:grid-cols-2 gap-8 mb-8">
                    <div class="card bg-base-200 shadow-xl">
                        <div class="card-body">
                            <h3 class="card-title text-xl mb-4">Side variant</h3>
                            <BpCard variant="side" title="With Image">
                                <template #image>
                                    <img
                                        src="https://picsum.photos/400/300"
                                        alt="image"
                                        class="w-64 h-48 object-cover"
                                    />
                                </template>
                                <p>Content renders on the side of the media.</p>
                                <template #actions>
                                    <BpButton size="sm">Learn more</BpButton>
                                </template>
                            </BpCard>
                        </div>
                    </div>

                    <div class="card bg-base-200 shadow-xl">
                        <div class="card-body">
                            <h3 class="card-title text-xl mb-4">Outline + Interactive</h3>
                            <BpCard variant="outline" interactive @click="onCardClick">
                                <template #header>
                                    <div class="flex items-center gap-2">
                                        <span class="badge badge-info">Clickable</span>
                                        <h2 class="card-title">Interactive Card</h2>
                                    </div>
                                </template>
                                <p>
                                    Hover and focus styles are applied. Press Enter/Space to
                                    activate.
                                </p>
                            </BpCard>
                        </div>
                    </div>
                </div>

                <!-- Loading and States -->
                <div class="grid md:grid-cols-2 gap-8">
                    <div class="card bg-base-200 shadow-xl">
                        <div class="card-body">
                            <h3 class="card-title text-xl mb-4">Loading overlay</h3>
                            <BpCard :loading="true" loading-text="Loading data..." title="Fetching">
                                <p>Overlay prevents interaction while loading.</p>
                            </BpCard>
                        </div>
                    </div>

                    <div class="card bg-base-200 shadow-xl">
                        <div class="card-body">
                            <h3 class="card-title text-xl mb-4">Selected + Disabled</h3>
                            <div class="space-y-4">
                                <BpCard title="Selected" :selected="true">
                                    <p>Highlighted ring indicates selection.</p>
                                </BpCard>
                                <BpCard title="Disabled" :disabled="true">
                                    <p>Lower opacity and no interaction.</p>
                                </BpCard>
                            </div>
                        </div>
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
                                    <td><code>title</code></td>
                                    <td><code>string</code></td>
                                    <td><code>undefined</code></td>
                                    <td>Title text</td>
                                </tr>
                                <tr>
                                    <td><code>subtitle</code></td>
                                    <td><code>string</code></td>
                                    <td><code>undefined</code></td>
                                    <td>Subtitle text</td>
                                </tr>
                                <tr>
                                    <td><code>variant</code></td>
                                    <td>
                                        <code
                                            >'normal' | 'bordered' | 'compact' | 'side' |
                                            'outline'</code
                                        >
                                    </td>
                                    <td><code>'normal'</code></td>
                                    <td>Visual variant</td>
                                </tr>
                                <tr>
                                    <td><code>shadow</code></td>
                                    <td><code>'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'</code></td>
                                    <td><code>'md'</code></td>
                                    <td>Shadow level</td>
                                </tr>
                                <tr>
                                    <td><code>imageFull</code></td>
                                    <td><code>boolean</code></td>
                                    <td><code>false</code></td>
                                    <td>Image covers card (image-full)</td>
                                </tr>
                                <tr>
                                    <td><code>imageOverlay</code></td>
                                    <td><code>boolean</code></td>
                                    <td><code>false</code></td>
                                    <td>Gradient overlay on image</td>
                                </tr>
                                <tr>
                                    <td><code>glass</code></td>
                                    <td><code>boolean</code></td>
                                    <td><code>false</code></td>
                                    <td>Glass effect</td>
                                </tr>
                                <tr>
                                    <td><code>interactive</code></td>
                                    <td><code>boolean</code></td>
                                    <td><code>false</code></td>
                                    <td>Apply hover/focus and keyboard click</td>
                                </tr>
                                <tr>
                                    <td><code>loading</code></td>
                                    <td><code>boolean</code></td>
                                    <td><code>false</code></td>
                                    <td>Show loading overlay</td>
                                </tr>
                                <tr>
                                    <td><code>loadingText</code></td>
                                    <td><code>string</code></td>
                                    <td><code>undefined</code></td>
                                    <td>Text below spinner</td>
                                </tr>
                                <tr>
                                    <td><code>disabled</code></td>
                                    <td><code>boolean</code></td>
                                    <td><code>false</code></td>
                                    <td>Disable interactions</td>
                                </tr>
                                <tr>
                                    <td><code>selected</code></td>
                                    <td><code>boolean</code></td>
                                    <td><code>false</code></td>
                                    <td>Show selected ring</td>
                                </tr>
                                <tr>
                                    <td><code>badge</code></td>
                                    <td><code>string</code></td>
                                    <td><code>undefined</code></td>
                                    <td>Badge text</td>
                                </tr>
                                <tr>
                                    <td><code>badgeVariant</code></td>
                                    <td>
                                        <code
                                            >'primary' | 'secondary' | 'accent' | 'success' |
                                            'warning' | 'error' | 'info'</code
                                        >
                                    </td>
                                    <td><code>'primary'</code></td>
                                    <td>Badge color</td>
                                </tr>
                                <tr>
                                    <td><code>tag</code></td>
                                    <td><code>'div' | 'article' | 'section'</code></td>
                                    <td><code>'div'</code></td>
                                    <td>Root tag</td>
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
                            <NuxtLink to="/components/data-display" class="btn btn-primary">
                                <ArrowLeft class="w-4 h-4 mr-2" /> Back to Data
                                Display
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
function onCardClick() {
    // Demo click handler
}

definePageMeta({
    title: 'BpCard Component',
    description: 'Props, examples, and usage for BpCard',
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

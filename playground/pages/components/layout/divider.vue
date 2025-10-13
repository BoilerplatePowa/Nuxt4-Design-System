<template>
    <div class="min-h-screen bg-base-100">
        <div class="container mx-auto px-4 py-8">
            <!-- Breadcrumb -->
            <div class="text-sm breadcrumbs mb-6">
                <ul>
                    <li><NuxtLink to="/">Home</NuxtLink></li>
                    <li><NuxtLink to="/components">Components</NuxtLink></li>
                    <li><NuxtLink to="/components/layout">Layout</NuxtLink></li>
                    <li>Divider</li>
                </ul>
            </div>

            <!-- Header -->
            <div class="mb-12">
                <h1 class="text-5xl font-bold mb-4">BpDivider</h1>
                <p class="text-xl text-base-content/70 max-w-3xl">
                    Separate content horizontally or vertically. Supports colored variants and
                    positioning.
                </p>
            </div>

            <!-- Examples -->
            <section class="mb-16">
                <h2 class="text-3xl font-bold mb-6">Examples</h2>

                <div class="card bg-base-200 shadow-xl mb-8">
                    <div class="card-body">
                        <h3 class="card-title text-xl mb-4">Horizontal with text</h3>
                        <div class="space-y-6">
                            <div>
                                <p>Section A</p>
                                <BpDivider text="OR" />
                                <p>Section B</p>
                            </div>
                            <div>
                                <BpDivider text="Start" position="start" />
                                <BpDivider text="Center" position="center" />
                                <BpDivider text="End" position="end" />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card bg-base-200 shadow-xl mb-8">
                    <div class="card-body">
                        <h3 class="card-title text-xl mb-4">Vertical</h3>
                        <div class="flex items-center gap-4">
                            <span>A</span>
                            <BpDivider orientation="vertical" />
                            <span>B</span>
                            <BpDivider orientation="vertical" />
                            <span>C</span>
                        </div>
                    </div>
                </div>

                <div class="card bg-base-200 shadow-xl">
                    <div class="card-body">
                        <h3 class="card-title text-xl mb-4">Color variants</h3>
                        <div class="space-y-4">
                            <BpDivider text="Primary" variant="primary" />
                            <BpDivider text="Secondary" variant="secondary" />
                            <BpDivider text="Accent" variant="accent" />
                            <BpDivider text="Success" variant="success" />
                            <BpDivider text="Warning" variant="warning" />
                            <BpDivider text="Info" variant="info" />
                            <BpDivider text="Error" variant="error" />
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
                                <tr><td><code>text</code></td><td><code>string</code></td><td><code>undefined</code></td><td>Text content (or default slot)</td></tr>
                                <tr><td><code>orientation</code></td><td><code>'horizontal' | 'vertical'</code></td><td><code>'horizontal'</code></td><td>Direction</td></tr>
                                <tr><td><code>variant</code></td><td><code>'neutral' | 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'info' | 'error'</code></td><td><code>'neutral'</code></td><td>Color variant</td></tr>
                                <tr><td><code>position</code></td><td><code>'start' | 'center' | 'end'</code></td><td><code>'center'</code></td><td>Label position (horizontal only)</td></tr>
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
                            <NuxtLink to="/components/layout" class="btn btn-neutral">
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
definePageMeta({
    title: 'BpDivider Component',
    description: 'Props, examples, and usage for BpDivider',
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


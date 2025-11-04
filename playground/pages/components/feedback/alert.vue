<template>
    <div class="min-h-screen bg-base-100">
        <div class="container mx-auto px-4 py-8">
            <!-- Breadcrumb -->
            <div class="text-sm breadcrumbs mb-6">
                <ul>
                    <li><NuxtLink to="/">Home</NuxtLink></li>
                    <li><NuxtLink to="/components">Components</NuxtLink></li>
                    <li><NuxtLink to="/components/feedback">Feedback</NuxtLink></li>
                    <li>Alert</li>
                </ul>
            </div>

            <!-- Header -->
            <div class="mb-12">
                <h1 class="text-5xl font-bold mb-4">BpAlert</h1>
                <p class="text-xl text-base-content/70 max-w-3xl">
                    Inform users about important events. Supports variants, optional icon, and a
                    dismiss action. Uses role="alert" and aria-live for accessibility.
                </p>
            </div>

            <!-- Examples -->
            <section class="mb-16">
                <h2 class="text-3xl font-bold mb-6">Examples</h2>

                <div class="grid md:grid-cols-2 gap-8 mb-8">
                    <div class="card bg-base-200 shadow-xl">
                        <div class="card-body">
                            <h3 class="card-title text-xl mb-4">Variants</h3>
                            <div class="space-y-3">
                                <BpAlert variant="info" title="Info" message="Heads up!" />
                                <BpAlert variant="success" title="Success" message="It worked!" />
                                <BpAlert variant="warning" title="Warning" message="Be careful." />
                                <BpAlert
                                    variant="error"
                                    title="Error"
                                    message="Something failed."
                                />
                            </div>
                        </div>
                    </div>

                    <div class="card bg-base-200 shadow-xl">
                        <div class="card-body">
                            <h3 class="card-title text-xl mb-4">Dismissible + Custom content</h3>
                            <BpAlert
                                :dismissible="true"
                                variant="info"
                                title="Update available"
                                @dismiss="onDismiss"
                            >
                                <div>Click the close button to dismiss this message.</div>
                            </BpAlert>
                            <div class="mt-4">
                                Dismissed:
                                <span
                                    class="badge"
                                    :class="dismissed ? 'badge-success' : 'badge-ghost'"
                                    >{{ dismissed ? 'Yes' : 'No' }}</span
                                >
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
                                    <td><code>variant</code></td>
                                    <td><code>'info' | 'success' | 'warning' | 'error'</code></td>
                                    <td><code>'info'</code></td>
                                    <td>Alert color variant</td>
                                </tr>
                                <tr>
                                    <td><code>title</code></td>
                                    <td><code>string</code></td>
                                    <td><code>undefined</code></td>
                                    <td>Optional title text</td>
                                </tr>
                                <tr>
                                    <td><code>message</code></td>
                                    <td><code>string</code></td>
                                    <td><code>undefined</code></td>
                                    <td>Optional message text</td>
                                </tr>
                                <tr>
                                    <td><code>dismissible</code></td>
                                    <td><code>boolean</code></td>
                                    <td><code>false</code></td>
                                    <td>Show dismiss button</td>
                                </tr>
                                <tr>
                                    <td><code>showDefaultIcon</code></td>
                                    <td><code>boolean</code></td>
                                    <td><code>true</code></td>
                                    <td>Display default emoji icon</td>
                                </tr>
                                <tr>
                                    <td><code>icon</code></td>
                                    <td><code>string</code></td>
                                    <td><code>undefined</code></td>
                                    <td>Custom icon content</td>
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
                            <NuxtLink to="/components/feedback" class="btn btn-primary">
                                <ArrowLeft class="w-4 h-4 mr-2" /> Back to Feedback
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
const dismissed = ref(false)
function onDismiss() {
    dismissed.value = true
}

definePageMeta({
    title: 'BpAlert Component',
    description: 'Props, examples, and usage for BpAlert',
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

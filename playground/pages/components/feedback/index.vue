<template>
    <div class="min-h-screen bg-base-100">
        <div class="container mx-auto px-4 py-8">
            <!-- Breadcrumb -->
            <div class="text-sm breadcrumbs mb-6">
                <ul>
                    <li><NuxtLink to="/">Home</NuxtLink></li>
                    <li><NuxtLink to="/components">Components</NuxtLink></li>
                    <li>Feedback</li>
                </ul>
            </div>

            <!-- Page Header -->
            <div class="mb-12">
                <div class="flex items-center gap-4 mb-4">
                    <div class="bg-info/20 p-4 rounded-full">
                        <BpIcon name="message-circle" class="w-12 h-12 text-info" />
                    </div>
                    <div>
                        <h1 class="text-5xl font-bold">Feedback</h1>
                        <p class="text-xl text-base-content/70">Notifications and status</p>
                    </div>
                </div>
                <p class="text-lg text-base-content/70 max-w-3xl">
                    Feedback components provide user feedback, notifications, and task status.
                    Built on DaisyUI with accessible semantics and ARIA roles.
                </p>
            </div>

            <!-- Component Grid -->
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                <!-- Alert Component -->
                <div class="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
                    <div class="card-body">
                        <div class="flex items-center gap-3 mb-4">
                            <BpIcon name="alert-circle" class="w-8 h-8 text-error" />
                            <h2 class="card-title text-xl">BpAlert</h2>
                        </div>
                        <p class="text-base-content/70 mb-4">
                            Informational banners with variants, optional icon, and close button.
                        </p>

                        <div class="flex flex-wrap gap-2 mb-4">
                            <span class="badge badge-info">Info</span>
                            <span class="badge badge-success">Success</span>
                            <span class="badge badge-warning">Warning</span>
                            <span class="badge badge-error">Error</span>
                        </div>

                        <div class="card-actions justify-end">
                            <NuxtLink to="/components/feedback/alert" class="btn btn-info btn-sm">
                                View Details
                            </NuxtLink>
                        </div>
                    </div>
                </div>

                <!-- Loading -->
                <div class="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
                    <div class="card-body">
                        <div class="flex items-center gap-3 mb-4">
                            <BpIcon name="loader" class="w-8 h-8 text-primary" />
                            <h2 class="card-title text-xl">BpLoading</h2>
                        </div>
                        <p class="text-base-content/70 mb-4">Spinner and loading indicators.</p>
                        <div class="card-actions justify-end">
                            <NuxtLink to="/components/feedback/loading" class="btn btn-primary btn-sm">
                                View Details
                            </NuxtLink>
                        </div>
                    </div>
                </div>

                <!-- Progress -->
                <div class="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
                    <div class="card-body">
                        <div class="flex items-center gap-3 mb-4">
                            <BpIcon name="bar-chart" class="w-8 h-8 text-secondary" />
                            <h2 class="card-title text-xl">Progress</h2>
                        </div>
                        <p class="text-base-content/70 mb-4">Linear progress bars.</p>
                        <div class="card-actions justify-end">
                            <NuxtLink to="/components/feedback/progress" class="btn btn-secondary btn-sm">
                                View Details
                            </NuxtLink>
                        </div>
                    </div>
                </div>

                <!-- Radial Progress -->
                <div class="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
                    <div class="card-body">
                        <div class="flex items-center gap-3 mb-4">
                            <BpIcon name="circle" class="w-8 h-8 text-accent" />
                            <h2 class="card-title text-xl">Radial Progress</h2>
                        </div>
                        <p class="text-base-content/70 mb-4">Circular progress indicator.</p>
                        <div class="card-actions justify-end">
                            <NuxtLink to="/components/feedback/radial-progress" class="btn btn-accent btn-sm">
                                View Details
                            </NuxtLink>
                        </div>
                    </div>
                </div>

                <!-- Skeleton -->
                <div class="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
                    <div class="card-body">
                        <div class="flex items-center gap-3 mb-4">
                            <BpIcon name="square" class="w-8 h-8 text-info" />
                            <h2 class="card-title text-xl">Skeleton</h2>
                        </div>
                        <p class="text-base-content/70 mb-4">Placeholder skeleton loaders.</p>
                        <div class="card-actions justify-end">
                            <NuxtLink to="/components/feedback/skeleton" class="btn btn-info btn-sm">
                                View Details
                            </NuxtLink>
                        </div>
                    </div>
                </div>

                <!-- Toast -->
                <div class="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
                    <div class="card-body">
                        <div class="flex items-center gap-3 mb-4">
                            <BpIcon name="message-circle" class="w-8 h-8 text-success" />
                            <h2 class="card-title text-xl">Toast</h2>
                        </div>
                        <p class="text-base-content/70 mb-4">Toast notifications and container.</p>
                        <div class="card-actions justify-end">
                            <NuxtLink to="/components/feedback/toast" class="btn btn-success btn-sm">
                                View Details
                            </NuxtLink>
                        </div>
                    </div>
                </div>

                <!-- Tooltip -->
                <div class="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
                    <div class="card-body">
                        <div class="flex items-center gap-3 mb-4">
                            <BpIcon name="info" class="w-8 h-8 text-warning" />
                            <h2 class="card-title text-xl">Tooltip</h2>
                        </div>
                        <p class="text-base-content/70 mb-4">Tooltips for hints and context.</p>
                        <div class="card-actions justify-end">
                            <NuxtLink to="/components/feedback/tooltip" class="btn btn-warning btn-sm">
                                View Details
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Navigation -->
            <section class="mb-16">
                <div class="card bg-primary text-primary-content shadow-xl">
                    <div class="card-body text-center">
                        <h2 class="card-title text-2xl justify-center mb-4">
                            <BpIcon name="navigation" class="w-6 h-6" />
                            Explore more components
                        </h2>
                        <div class="card-actions justify-center">
                            <NuxtLink to="/components" class="btn btn-secondary btn-lg">
                                <BpIcon name="grid" class="w-5 h-5 mr-2" />
                                All Components
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
    title: 'Feedback Components',
    description: 'Notifications and status components',
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


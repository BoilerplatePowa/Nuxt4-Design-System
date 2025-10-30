<template>
    <div class="min-h-screen bg-base-100">
        <div class="container mx-auto px-4 py-8">
            <div class="text-sm breadcrumbs mb-6">
                <ul>
                    <li><NuxtLink to="/">Home</NuxtLink></li>
                    <li><NuxtLink to="/components">Components</NuxtLink></li>
                    <li><NuxtLink to="/components/feedback">Feedback</NuxtLink></li>
                    <li>Toast</li>
                </ul>
            </div>

            <div class="mb-12">
                <h1 class="text-5xl font-bold mb-4">Toast</h1>
                <p class="text-xl text-base-content/70 max-w-3xl">
                    Toast notifications with progress bar and auto-dismiss functionality.
                </p>
            </div>

            <!-- Toast with Progress Bar -->
            <section class="mb-16">
                <h2 class="text-3xl font-bold mb-6">Toast with Progress Bar</h2>
                <div class="card bg-base-200 shadow-xl">
                    <div class="card-body">
                        <div class="alert alert-info mb-4">
                            <BpIcon name="info" class="w-5 h-5" />
                            <span>
                                The progress bar starts at 100% and counts down to 0%, showing remaining time. Hover
                                over a toast to pause the countdown!
                            </span>
                        </div>

                        <div class="flex flex-wrap gap-4">
                            <button class="btn btn-success" @click="showSuccess">
                                <BpIcon name="check" class="w-4 h-4 mr-2" />
                                Success (3s)
                            </button>
                            <button class="btn btn-error" @click="showError">
                                <BpIcon name="x" class="w-4 h-4 mr-2" />
                                Error (5s)
                            </button>
                            <button class="btn btn-warning" @click="showWarning">
                                <BpIcon name="alert-triangle" class="w-4 h-4 mr-2" />
                                Warning (4s)
                            </button>
                            <button class="btn btn-info" @click="showInfo">
                                <BpIcon name="info" class="w-4 h-4 mr-2" />
                                Info (3s)
                            </button>
                        </div>

                        <div class="divider my-6">Advanced Options</div>

                        <div class="flex flex-wrap gap-4">
                            <button class="btn btn-primary" @click="showLongDuration">
                                <BpIcon name="clock" class="w-4 h-4 mr-2" />
                                Long Duration (10s)
                            </button>
                            <button class="btn btn-secondary" @click="showWithTitle">
                                <BpIcon name="message" class="w-4 h-4 mr-2" />
                                With Title
                            </button>
                            <button class="btn btn-accent" @click="showWithoutProgress">
                                <BpIcon name="eye-off" class="w-4 h-4 mr-2" />
                                No Progress Bar
                            </button>
                            <button class="btn btn-outline" @click="clearAllToasts">
                                <BpIcon name="trash" class="w-4 h-4 mr-2" />
                                Clear All
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <!-- DaisyUI Native Examples -->
            <section class="mb-16">
                <h2 class="text-3xl font-bold mb-6">DaisyUI Native Examples</h2>
                <div class="card bg-base-200 shadow-xl">
                    <div class="card-body">
                        <div class="toast toast-top toast-end">
                            <div class="alert alert-info">
                                <span>New message received.</span>
                            </div>
                        </div>
                        <div class="toast toast-bottom toast-start">
                            <div class="alert alert-success">
                                <span>Settings saved.</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="mb-16">
                <div class="card bg-base-200 shadow-xl">
                    <div class="card-body text-center">
                        <h2 class="card-title text-2xl justify-center mb-4">Explore More</h2>
                        <div class="card-actions justify-center">
                            <NuxtLink to="/components/feedback" class="btn btn-primary">
                                <BpIcon name="arrow-left" class="w-4 h-4 mr-2" /> Back to Feedback
                            </NuxtLink>
                            <NuxtLink to="/components" class="btn btn-outline">
                                <BpIcon name="grid" class="w-4 h-4 mr-2" /> All Components
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </section>
        </div>

        <!-- Toast Container -->
        <BpToastContainer :toasts="toasts" position="top-right" @remove-toast="removeToast" />
    </div>
</template>

<script setup lang="ts">
import { useToast } from '#imports'

definePageMeta({ title: 'Toast', description: 'Toast examples with progress bar' })

const { toasts, success, error, warning, info, addToast, removeToast, clearAll } = useToast()

function showSuccess() {
    success('Operation completed successfully!', {
        duration: 3000,
    })
}

function showError() {
    error('An error occurred while processing your request.', {
        duration: 5000,
    })
}

function showWarning() {
    warning('This action might have consequences.', {
        duration: 4000,
    })
}

function showInfo() {
    info('Here is some useful information for you.', {
        duration: 3000,
    })
}

function showLongDuration() {
    success('This toast will stay for 10 seconds. Watch the progress bar!', {
        title: 'Long Duration Toast',
        duration: 10000,
    })
}

function showWithTitle() {
    info('The progress bar at the bottom shows how much time is remaining.', {
        title: 'Toast with Title',
        duration: 5000,
    })
}

function showWithoutProgress() {
    warning('This toast has no progress bar.', {
        duration: 4000,
    })
}

function clearAllToasts() {
    clearAll()
}

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

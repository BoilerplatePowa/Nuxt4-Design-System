<template>
    <div class="min-h-screen bg-base-100">
        <div class="container mx-auto px-4 py-8">
            <!-- Breadcrumb -->
            <div class="text-sm breadcrumbs mb-6">
                <ul>
                    <li><NuxtLink to="/">Home</NuxtLink></li>
                    <li><NuxtLink to="/components">Components</NuxtLink></li>
                    <li>Data Display</li>
                </ul>
            </div>

            <!-- Page Header -->
            <div class="mb-12">
                <div class="flex items-center gap-4 mb-4">
                    <div class="bg-secondary/20 p-4 rounded-full">
                        <Layout class="w-12 h-12 text-secondary" />
                    </div>
                    <div>
                        <h1 class="text-5xl font-bold">Data Display</h1>
                        <p class="text-xl text-base-content/70">Present data and content</p>
                    </div>
                </div>
                <p class="text-lg text-base-content/70 max-w-3xl">
                    Components for presenting data, content and information with consistent DaisyUI
                    styling and a11y.
                </p>
            </div>

            <!-- Component Grid -->
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                <!-- Card Component -->
                <div class="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
                    <div class="card-body">
                        <div class="flex items-center gap-3 mb-4">
                            <Layout class="w-8 h-8 text-primary" />
                            <h2 class="card-title text-xl">BpCard</h2>
                        </div>
                        <p class="text-base-content/70 mb-4">
                            Flexible content container with header, actions, media and variants.
                        </p>

                        <div class="flex flex-wrap gap-2 mb-4">
                            <span class="badge badge-primary">Bordered</span>
                            <span class="badge badge-primary">Compact</span>
                            <span class="badge badge-primary">Side</span>
                            <span class="badge badge-primary">Outline</span>
                        </div>

                        <div class="card-actions justify-end">
                            <NuxtLink
                                to="/components/data-display/card"
                                class="btn btn-primary btn-sm"
                            >
                                View Details
                            </NuxtLink>
                        </div>
                    </div>
                </div>

                <!-- List -->
                <div class="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
                    <div class="card-body">
                        <div class="flex items-center gap-3 mb-4">
                            <Navigation class="w-8 h-8 text-primary" />
                            <h2 class="card-title text-xl">BpList</h2>
                        </div>
                        <p class="text-base-content/70 mb-4">
                            Flexible list with avatars and actions.
                        </p>
                        <div class="card-actions justify-end">
                            <NuxtLink
                                to="/components/data-display/list"
                                class="btn btn-primary btn-sm"
                            >
                                View Details
                            </NuxtLink>
                        </div>
                    </div>
                </div>

                <!-- Stat -->
                <div class="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
                    <div class="card-body">
                        <div class="flex items-center gap-3 mb-4">
                            <Activity class="w-8 h-8 text-secondary" />
                            <h2 class="card-title text-xl">BpStat</h2>
                        </div>
                        <p class="text-base-content/70 mb-4">KPIs and totals with variants.</p>
                        <div class="card-actions justify-end">
                            <NuxtLink
                                to="/components/data-display/stat"
                                class="btn btn-secondary btn-sm"
                            >
                                View Details
                            </NuxtLink>
                        </div>
                    </div>
                </div>

                <!-- Status -->
                <div class="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
                    <div class="card-body">
                        <div class="flex items-center gap-3 mb-4">
                            <AlertCircle class="w-8 h-8 text-info" />
                            <h2 class="card-title text-xl">BpStatus</h2>
                        </div>
                        <p class="text-base-content/70 mb-4">Small status indicator dot.</p>
                        <div class="card-actions justify-end">
                            <NuxtLink
                                to="/components/data-display/status"
                                class="btn btn-info btn-sm"
                            >
                                View Details
                            </NuxtLink>
                        </div>
                    </div>
                </div>

                <!-- Status Box -->
                <div class="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
                    <div class="card-body">
                        <div class="flex items-center gap-3 mb-4">
                            <Info class="w-8 h-8 text-accent" />
                            <h2 class="card-title text-xl">BpStatusBox</h2>
                        </div>
                        <p class="text-base-content/70 mb-4">Rich status message with actions.</p>
                        <div class="card-actions justify-end">
                            <NuxtLink
                                to="/components/data-display/status-box"
                                class="btn btn-accent btn-sm"
                            >
                                View Details
                            </NuxtLink>
                        </div>
                    </div>
                </div>

                <!-- Text Diff -->
                <div class="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
                    <div class="card-body">
                        <div class="flex items-center gap-3 mb-4">
                            <Navigation class="w-8 h-8 text-warning" />
                            <h2 class="card-title text-xl">BpTextDiff</h2>
                        </div>
                        <p class="text-base-content/70 mb-4">Show differences between texts.</p>
                        <div class="card-actions justify-end">
                            <NuxtLink
                                to="/components/data-display/text-diff"
                                class="btn btn-warning btn-sm"
                            >
                                View Details
                            </NuxtLink>
                        </div>
                    </div>
                </div>

                <!-- Timeline -->
                <div class="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
                    <div class="card-body">
                        <div class="flex items-center gap-3 mb-4">
                            <Clock class="w-8 h-8 text-info" />
                            <h2 class="card-title text-xl">BpTimeline</h2>
                        </div>
                        <p class="text-base-content/70 mb-4">Chronological events display.</p>
                        <div class="card-actions justify-end">
                            <NuxtLink
                                to="/components/data-display/timeline"
                                class="btn btn-info btn-sm"
                            >
                                View Details
                            </NuxtLink>
                        </div>
                    </div>
                </div>

                <!-- Chat Bubble -->
                <div class="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
                    <div class="card-body">
                        <div class="flex items-center gap-3 mb-4">
                            <MessageCircle class="w-8 h-8 text-primary" />
                            <h2 class="card-title text-xl">BpChatBubble</h2>
                        </div>
                        <p class="text-base-content/70 mb-4">Message bubbles with variants.</p>
                        <div class="card-actions justify-end">
                            <NuxtLink
                                to="/components/data-display/chat-bubble"
                                class="btn btn-primary btn-sm"
                            >
                                View Details
                            </NuxtLink>
                        </div>
                    </div>
                </div>

                <!-- Accordion -->
                <div class="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
                    <div class="card-body">
                        <div class="flex items-center gap-3 mb-4">
                            <ChevronDown class="w-8 h-8 text-secondary" />
                            <h2 class="card-title text-xl">Accordion</h2>
                        </div>
                        <p class="text-base-content/70 mb-4">One-at-a-time collapsible items.</p>
                        <div class="card-actions justify-end">
                            <NuxtLink
                                to="/components/data-display/accordion"
                                class="btn btn-secondary btn-sm"
                            >
                                View Details
                            </NuxtLink>
                        </div>
                    </div>
                </div>

                <!-- Collapse -->
                <div class="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
                    <div class="card-body">
                        <div class="flex items-center gap-3 mb-4">
                            <ChevronDown class="w-8 h-8 text-accent" />
                            <h2 class="card-title text-xl">Collapse</h2>
                        </div>
                        <p class="text-base-content/70 mb-4">Toggle sections open/closed.</p>
                        <div class="card-actions justify-end">
                            <NuxtLink
                                to="/components/data-display/collapse"
                                class="btn btn-accent btn-sm"
                            >
                                View Details
                            </NuxtLink>
                        </div>
                    </div>
                </div>

                <!-- Carousel -->
                <div class="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
                    <div class="card-body">
                        <div class="flex items-center gap-3 mb-4">
                            <Image class="w-8 h-8 text-success" />
                            <h2 class="card-title text-xl">Carousel</h2>
                        </div>
                        <p class="text-base-content/70 mb-4">Scrollable media/content area.</p>
                        <div class="card-actions justify-end">
                            <NuxtLink
                                to="/components/data-display/carousel"
                                class="btn btn-success btn-sm"
                            >
                                View Details
                            </NuxtLink>
                        </div>
                    </div>
                </div>

                <!-- Countdown -->
                <div class="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
                    <div class="card-body">
                        <div class="flex items-center gap-3 mb-4">
                            <Clock class="w-8 h-8 text-warning" />
                            <h2 class="card-title text-xl">Countdown</h2>
                        </div>
                        <p class="text-base-content/70 mb-4">Animated number transitions.</p>
                        <div class="card-actions justify-end">
                            <NuxtLink
                                to="/components/data-display/countdown"
                                class="btn btn-warning btn-sm"
                            >
                                View Details
                            </NuxtLink>
                        </div>
                    </div>
                </div>

                <!-- Kbd -->
                <div class="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
                    <div class="card-body">
                        <div class="flex items-center gap-3 mb-4">
                            <Keyboard class="w-8 h-8 text-info" />
                            <h2 class="card-title text-xl">Kbd</h2>
                        </div>
                        <p class="text-base-content/70 mb-4">Keyboard key hints.</p>
                        <div class="card-actions justify-end">
                            <NuxtLink to="/components/data-display/kbd" class="btn btn-info btn-sm">
                                View Details
                            </NuxtLink>
                        </div>
                    </div>
                </div>
                <!-- Table -->
                <div class="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
                    <div class="card-body">
                        <div class="flex items-center gap-3 mb-4">
                            <Grid class="w-8 h-8 text-accent" />
                            <h2 class="card-title text-xl">BpTable</h2>
                        </div>
                        <p class="text-base-content/70 mb-4">Table for structured data.</p>
                        <div class="card-actions justify-end">
                            <NuxtLink
                                to="/components/data-display/table"
                                class="btn btn-accent btn-sm"
                            >
                                View Details
                            </NuxtLink>
                        </div>
                    </div>
                </div>

                <!-- Avatar -->
                <div class="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
                    <div class="card-body">
                        <div class="flex items-center gap-3 mb-4">
                            <User class="w-8 h-8 text-info" />
                            <h2 class="card-title text-xl">BpAvatar</h2>
                        </div>
                        <p class="text-base-content/70 mb-4">User thumbnails and placeholders.</p>
                        <div class="card-actions justify-end">
                            <NuxtLink
                                to="/components/data-display/avatar"
                                class="btn btn-info btn-sm"
                            >
                                View Details
                            </NuxtLink>
                        </div>
                    </div>
                </div>

                <!-- Badge -->
                <div class="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
                    <div class="card-body">
                        <div class="flex items-center gap-3 mb-4">
                            <CheckCircle class="w-8 h-8 text-success" />
                            <h2 class="card-title text-xl">BpBadge</h2>
                        </div>
                        <p class="text-base-content/70 mb-4">Status and count indicators.</p>
                        <div class="card-actions justify-end">
                            <NuxtLink
                                to="/components/data-display/badge"
                                class="btn btn-success btn-sm"
                            >
                                View Details
                            </NuxtLink>
                        </div>
                    </div>
                </div>

                <!-- Tabs -->
                <div class="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
                    <div class="card-body">
                        <div class="flex items-center gap-3 mb-4">
                            <Navigation class="w-8 h-8 text-warning" />
                            <h2 class="card-title text-xl">BpTabs</h2>
                        </div>
                        <p class="text-base-content/70 mb-4">Tab navigation for content.</p>
                        <div class="card-actions justify-end">
                            <NuxtLink
                                to="/components/data-display/tabs"
                                class="btn btn-warning btn-sm"
                            >
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
                            <Navigation class="w-6 h-6" />
                            Explore more components
                        </h2>
                        <div class="card-actions justify-center">
                            <NuxtLink to="/components" class="btn btn-secondary btn-lg">
                                <Grid class="w-5 h-5 mr-2" />
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
import {
    Layout,
    Navigation,
    Activity,
    AlertCircle,
    Info,
    Clock,
    MessageCircle,
    ChevronDown,
    Image,
    Keyboard,
    Grid,
    User,
    CheckCircle,
} from 'lucide-vue-next'

definePageMeta({
    title: 'Data Display Components',
    description: 'Components for presenting data and content',
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

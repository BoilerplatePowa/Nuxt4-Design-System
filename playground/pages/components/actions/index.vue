<template>
    <div class="min-h-screen bg-base-100">
        <div class="container mx-auto px-4 py-8">
            <!-- Breadcrumb -->
            <div class="text-sm breadcrumbs mb-6">
                <ul>
                    <li><NuxtLink to="/">Home</NuxtLink></li>
                    <li><NuxtLink to="/components">Components</NuxtLink></li>
                    <li>Actions</li>
                </ul>
            </div>

            <!-- Page Header -->
            <div class="mb-12">
                <div class="flex items-center gap-4 mb-4">
                    <div class="bg-primary/20 p-4 rounded-full">
                        <Zap class="w-12 h-12 text-primary" />
                    </div>
                    <div>
                        <h1 class="text-5xl font-bold">Actions</h1>
                        <p class="text-xl text-base-content/70">
                            Interactive elements for user interactions
                        </p>
                    </div>
                </div>
                <p class="text-lg text-base-content/70 max-w-3xl">
                    Action components are the building blocks of user interactions in your
                    application. They provide consistent, accessible interfaces for buttons,
                    dropdowns, modals, and other interactive elements.
                </p>
            </div>

            <!-- Component Grid -->
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                <!-- Button Component -->
                <div class="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
                    <div class="card-body">
                        <div class="flex items-center gap-3 mb-4">
                            <Zap class="w-8 h-8 text-primary" />
                            <h2 class="card-title text-xl">BpButton</h2>
                        </div>
                        <p class="text-base-content/70 mb-4">
                            A versatile button component with multiple variants, sizes, and states.
                            Built on DaisyUI button styles with enhanced functionality.
                        </p>

                        <div class="flex flex-wrap gap-2 mb-4">
                            <span class="badge badge-primary">Primary</span>
                            <span class="badge badge-primary">Secondary</span>
                            <span class="badge badge-primary">Accent</span>
                            <span class="badge badge-primary">Ghost</span>
                        </div>

                        <div class="card-actions justify-end">
                            <NuxtLink
                                to="/components/actions/button"
                                class="btn btn-primary btn-sm"
                            >
                                View Details
                            </NuxtLink>
                        </div>
                    </div>
                </div>

                <!-- Dropdown Component -->
                <div class="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
                    <div class="card-body">
                        <div class="flex items-center gap-3 mb-4">
                            <ChevronDown class="w-8 h-8 text-secondary" />
                            <h2 class="card-title text-xl">BpDropdown</h2>
                        </div>
                        <p class="text-base-content/70 mb-4">
                            A dropdown menu component for displaying lists of actions or options.
                            Supports various trigger types and positioning.
                        </p>

                        <div class="flex flex-wrap gap-2 mb-4">
                            <span class="badge badge-secondary">Menu</span>
                            <span class="badge badge-secondary">Trigger</span>
                            <span class="badge badge-secondary">Positioning</span>
                        </div>

                        <div class="card-actions justify-end">
                            <NuxtLink
                                to="/components/actions/dropdown"
                                class="btn btn-secondary btn-sm"
                            >
                                View Details
                            </NuxtLink>
                        </div>
                    </div>
                </div>

                <!-- Modal Component -->
                <div class="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
                    <div class="card-body">
                        <div class="flex items-center gap-3 mb-4">
                            <Maximize class="w-8 h-8 text-accent" />
                            <h2 class="card-title text-xl">BpModal</h2>
                        </div>
                        <p class="text-base-content/70 mb-4">
                            A modal dialog component for overlaying content. Supports various sizes,
                            animations, and accessibility features.
                        </p>

                        <div class="flex flex-wrap gap-2 mb-4">
                            <span class="badge badge-accent">Dialog</span>
                            <span class="badge badge-accent">Overlay</span>
                            <span class="badge badge-accent">Animation</span>
                        </div>

                        <div class="card-actions justify-end">
                            <NuxtLink to="/components/actions/modal" class="btn btn-accent btn-sm">
                                View Details
                            </NuxtLink>
                        </div>
                    </div>
                </div>

                <!-- Swap Component -->
                <div class="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
                    <div class="card-body">
                        <div class="flex items-center gap-3 mb-4">
                            <RefreshCw class="w-8 h-8 text-info" />
                            <h2 class="card-title text-xl">BpSwap</h2>
                        </div>
                        <p class="text-base-content/70 mb-4">
                            A swap component for toggling between two states or content views.
                            Perfect for theme switching and state changes.
                        </p>

                        <div class="flex flex-wrap gap-2 mb-4">
                            <span class="badge badge-info">Toggle</span>
                            <span class="badge badge-info">State</span>
                            <span class="badge badge-info">Animation</span>
                        </div>

                        <div class="card-actions justify-end">
                            <NuxtLink to="/components/actions/swap" class="btn btn-info btn-sm">
                                View Details
                            </NuxtLink>
                        </div>
                    </div>
                </div>

                <!-- Theme Controller Component -->
                <div class="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
                    <div class="card-body">
                        <div class="flex items-center gap-3 mb-4">
                            <Palette class="w-8 h-8 text-success" />
                            <h2 class="card-title text-xl">BpThemeController</h2>
                        </div>
                        <p class="text-base-content/70 mb-4">
                            Toggle and select DaisyUI themes with multiple UI variants. Supports
                            button, toggle, switch, dropdown, and radio variants.
                        </p>

                        <div class="flex flex-wrap gap-2 mb-4">
                            <span class="badge badge-success">Theme</span>
                            <span class="badge badge-success">Toggle</span>
                            <span class="badge badge-success">Variants</span>
                        </div>

                        <div class="card-actions justify-end">
                            <NuxtLink
                                to="/components/actions/theme-controller"
                                class="btn btn-success btn-sm"
                            >
                                View Details
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Features Section -->
            <section class="mb-16">
                <h2 class="text-3xl font-bold mb-8 text-center">Key Features</h2>

                <div class="grid md:grid-cols-3 gap-8">
                    <div class="card bg-base-200 shadow-xl">
                        <div class="card-body text-center">
                            <Shield class="w-12 h-12 text-success mx-auto mb-4" />
                            <h3 class="card-title justify-center">Accessibility First</h3>
                            <p>
                                All action components are built with WCAG 2.1 AA compliance in mind,
                                ensuring they work for all users.
                            </p>
                        </div>
                    </div>

                    <div class="card bg-base-200 shadow-xl">
                        <div class="card-body text-center">
                            <Settings class="w-12 h-12 text-primary mx-auto mb-4" />
                            <h3 class="card-title justify-center">Theme Ready</h3>
                            <p>
                                Components automatically adapt to your DaisyUI theme, providing
                                consistent styling across your application.
                            </p>
                        </div>
                    </div>

                    <div class="card bg-base-200 shadow-xl">
                        <div class="card-body text-center">
                            <Zap class="w-12 h-12 text-accent mx-auto mb-4" />
                            <h3 class="card-title justify-center">Performance Optimized</h3>
                            <p>
                                Built with modern Vue 3 patterns and optimized for performance,
                                ensuring smooth interactions.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Usage Patterns -->
            <section class="mb-16">
                <h2 class="text-3xl font-bold mb-8 text-center">Common Usage Patterns</h2>

                <div class="grid lg:grid-cols-2 gap-8">
                    <!-- Form Actions -->
                    <div class="card bg-base-200 shadow-xl">
                        <div class="card-body">
                            <h3 class="card-title text-xl mb-4">
                                <Edit class="w-5 h-5" />
                                Form Actions
                            </h3>
                            <p class="mb-4">Common patterns for form submission and actions.</p>

                            <div class="space-y-3 mb-4">
                                <BpButton color="primary" size="sm"> Submit </BpButton>
                                <BpButton style="ghost" size="sm"> Cancel </BpButton>
                                <BpButton color="secondary" size="sm"> Save Draft </BpButton>
                            </div>

                            <div class="mockup-code text-left">
                                <pre
                                    data-prefix="<"
                                ><code>&lt;BpButton color="primary"&gt;Submit&lt;/BpButton&gt;</code></pre>
                                <pre
                                    data-prefix="<"
                                ><code>&lt;BpButton color="ghost"&gt;Cancel&lt;/BpButton&gt;</code></pre>
                            </div>
                        </div>
                    </div>

                    <!-- Navigation Actions -->
                    <div class="card bg-base-200 shadow-xl">
                        <div class="card-body">
                            <h3 class="card-title text-xl mb-4">
                                <Navigation class="w-5 h-5" />
                                Navigation Actions
                            </h3>
                            <p class="mb-4">Buttons and actions for navigation and user flow.</p>

                            <div class="space-y-3 mb-4">
                                <BpButton color="accent" size="sm"> Next </BpButton>
                                <BpButton style="ghost" size="sm"> Back </BpButton>
                                <BpButton style="link" size="sm"> Skip </BpButton>
                            </div>

                            <div class="mockup-code text-left">
                                <pre
                                    data-prefix="<"
                                ><code>&lt;BpButton color="accent"&gt;Next&lt;/BpButton&gt;</code></pre>
                                <pre
                                    data-prefix="<"
                                ><code>&lt;BpButton color="ghost"&gt;Back&lt;/BpButton&gt;</code></pre>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Best Practices -->
            <section class="mb-16">
                <h2 class="text-3xl font-bold mb-8 text-center">Best Practices</h2>

                <div class="card bg-base-200 shadow-xl">
                    <div class="card-body">
                        <div class="grid md:grid-cols-2 gap-8">
                            <div>
                                <h3 class="font-bold mb-4 text-success">✅ Do</h3>
                                <ul class="space-y-2">
                                    <li class="flex items-center">
                                        <Check class="w-4 h-4 text-success mr-2" />
                                        Use primary buttons for main actions
                                    </li>
                                    <li class="flex items-center">
                                        <Check class="w-4 h-4 text-success mr-2" />
                                        Provide clear, descriptive labels
                                    </li>
                                    <li class="flex items-center">
                                        <Check class="w-4 h-4 text-success mr-2" />
                                        Use appropriate button sizes for context
                                    </li>
                                    <li class="flex items-center">
                                        <Check class="w-4 h-4 text-success mr-2" />
                                        Include loading states for async actions
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h3 class="font-bold mb-4 text-error">❌ Don't</h3>
                                <ul class="space-y-2">
                                    <li class="flex items-center">
                                        <X class="w-4 h-4 text-error mr-2" />
                                        Overuse primary buttons
                                    </li>
                                    <li class="flex items-center">
                                        <X class="w-4 h-4 text-error mr-2" />
                                        Use vague or unclear labels
                                    </li>
                                    <li class="flex items-center">
                                        <X class="w-4 h-4 text-error mr-2" />
                                        Mix button styles inconsistently
                                    </li>
                                    <li class="flex items-center">
                                        <X class="w-4 h-4 text-error mr-2" />
                                        Forget loading states for user feedback
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Navigation -->
            <section class="mb-16">
                <div class="card bg-primary text-primary-content shadow-xl">
                    <div class="card-body text-center">
                        <h2 class="card-title text-2xl justify-center mb-4">
                            <Navigation class="w-6 h-6" />
                            Ready to Build?
                        </h2>
                        <p class="mb-6">
                            Start building interactive interfaces with our action components. Each
                            component is designed to work seamlessly together.
                        </p>
                        <div class="card-actions justify-center">
                            <NuxtLink to="/components" class="btn btn-secondary btn-lg">
                                <Grid class="w-5 h-5 mr-2" />
                                Browse All Components
                            </NuxtLink>
                            <NuxtLink to="/examples" class="btn btn-outline btn-lg">
                                <File class="w-5 h-5 mr-2" />
                                View Examples
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
    Zap,
    ChevronDown,
    Maximize,
    RefreshCw,
    Palette,
    Shield,
    Settings,
    Edit,
    Navigation,
    Check,
    X,
    Grid,
    File,
} from 'lucide-vue-next'

// Page metadata
definePageMeta({
    title: 'Action Components',
    description:
        'Interactive action components for user interactions - buttons, dropdowns, modals, and more',
})

// Theme management
function setTheme(theme: string) {
    if (import.meta.client) {
        document.documentElement.setAttribute('data-theme', theme)
        localStorage.setItem('@nuxt-design-system/theme', theme)
    }
}

// Initialize theme on mount
onMounted(() => {
    if (import.meta.client) {
        const savedTheme = localStorage.getItem('@nuxt-design-system/theme') || 'light'
        setTheme(savedTheme)
    }
})
</script>

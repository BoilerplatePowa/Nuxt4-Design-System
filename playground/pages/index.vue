<template>
    <div class="min-h-screen bg-base-100">
        <!-- Hero Section -->
        <section class="hero min-h-[70vh] bg-gradient-to-r from-primary/10 to-secondary/10">
            <div class="hero-content text-center">
                <div class="max-w-4xl">
                    <h1 class="text-6xl font-bold mb-8">
                        <span class="text-primary">Nuxt</span> Design System
                    </h1>
                    <p class="text-xl mb-8 text-base-content/80">
                        A modern, accessible design system built for Nuxt 4+ with TailwindCSS,
                        DaisyUI, and comprehensive component mapping. Build beautiful, consistent
                        interfaces with ease.
                    </p>
                    <div class="flex flex-wrap gap-4 justify-center">
                        <NuxtLink to="/components" class="btn btn-primary btn-lg">
                            <Eye class="w-5 h-5 mr-2" />
                            View Components
                        </NuxtLink>
                        <NuxtLink to="/installation" class="btn btn-outline btn-lg">
                            <Download class="w-5 h-5 mr-2" />
                            Get Started
                        </NuxtLink>
                        <a
                            href="https://github.com/BoilerplatePowa/Nuxt4-Design-System"
                            target="_blank"
                            class="btn btn-ghost btn-lg"
                        >
                            <ExternalLink class="w-5 h-5 mr-2" />
                            GitHub
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <!-- Features Section -->
        <section class="py-16">
            <div class="container mx-auto px-4">
                <div class="text-center mb-12">
                    <h2 class="text-4xl font-bold mb-4">Why Choose Nuxt Design System?</h2>
                    <p class="text-lg text-base-content/70">
                        Built with modern web standards and developer experience in mind
                    </p>
                </div>

                <div class="grid md:grid-cols-3 gap-8">
                    <div class="card bg-base-200 shadow-xl">
                        <div class="card-body text-center">
                            <Zap class="w-12 h-12 text-primary mx-auto mb-4" />
                            <h3 class="card-title justify-center">Lightning Fast</h3>
                            <p>
                                Optimized for performance with tree-shaking, lazy loading, and
                                efficient bundling
                            </p>
                        </div>
                    </div>

                    <div class="card bg-base-200 shadow-xl">
                        <div class="card-body text-center">
                            <Settings class="w-12 h-12 text-secondary mx-auto mb-4" />
                            <h3 class="card-title justify-center">Theme Ready</h3>
                            <p>
                                Multiple DaisyUI themes with easy switching and customization
                                options
                            </p>
                        </div>
                    </div>

                    <div class="card bg-base-200 shadow-xl">
                        <div class="card-body text-center">
                            <Shield class="w-12 h-12 text-accent mx-auto mb-4" />
                            <h3 class="card-title justify-center">Accessibility First</h3>
                            <p>
                                WCAG 2.1 AA compliant with proper ARIA support and keyboard
                                navigation
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Quick Start Section -->
        <section class="py-16 bg-base-200">
            <div class="container mx-auto px-4">
                <div class="text-center mb-12">
                    <h2 class="text-4xl font-bold mb-4">Quick Start</h2>
                    <p class="text-lg text-base-content/70">Get up and running in minutes</p>
                </div>

                <div class="grid lg:grid-cols-2 gap-8 items-center">
                    <div>
                        <h3 class="text-2xl font-bold mb-4">Installation</h3>
                        <div class="mockup-code text-left">
                            <pre
                                data-prefix="$"
                            ><code>npm install @boilerplatepowa/nuxt4-design-system</code></pre>
                        </div>

                        <h3 class="text-2xl font-bold mb-4 mt-8">Configuration</h3>
                        <div class="mockup-code text-left">
                            <pre data-prefix="//"><code>// nuxt.config.ts</code></pre>
                            <pre
                                data-prefix="export"
                            ><code>export default defineNuxtConfig({</code></pre>
                            <pre data-prefix="  "><code>  modules: [</code></pre>
                            <pre
                                data-prefix="    "
                            ><code>    '@boilerplatepowa/nuxt4-design-system'</code></pre>
                            <pre data-prefix="  "><code>  ]</code></pre>
                            <pre data-prefix="})"><code>})</code></pre>
                        </div>
                    </div>

                    <div class="text-center">
                        <h3 class="text-2xl font-bold mb-4">Usage</h3>
                        <div class="mockup-code text-left">
                            <pre data-prefix="<"><code>&lt;template&gt;</code></pre>
                            <pre
                                data-prefix="  "
                            ><code>  &lt;BpButton color="primary"&gt;</code></pre>
                            <pre data-prefix="    "><code>    Hello World!</code></pre>
                            <pre data-prefix="  "><code>  &lt;/BpButton&gt;</code></pre>
                            <pre data-prefix="&lt;/"><code>&lt;/template&gt;</code></pre>
                        </div>

                        <div class="mt-6">
                            <NuxtLink to="/installation" class="btn btn-primary">
                                View Full Installation Guide
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Component Preview Section -->
        <section class="py-16">
            <div class="container mx-auto px-4">
                <div class="text-center mb-12">
                    <h2 class="text-4xl font-bold mb-4">Component Preview</h2>
                    <p class="text-lg text-base-content/70">See our components in action</p>
                </div>

                <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div class="card bg-base-200 shadow-xl">
                        <div class="card-body text-center">
                            <div class="flex justify-center mb-4">
                                <BpButton color="primary" size="sm"> Button </BpButton>
                            </div>
                            <h3 class="card-title justify-center text-lg">Button</h3>
                            <p class="text-sm text-base-content/70">Multiple variants and states</p>
                        </div>
                    </div>

                    <div class="card bg-base-200 shadow-xl">
                        <div class="card-body text-center">
                            <div class="flex justify-center mb-4">
                                <Heart class="w-8 h-8 text-error" />
                            </div>
                            <h3 class="card-title justify-center text-lg">Icon</h3>
                            <p class="text-sm text-base-content/70">Lucide Vue Next icons</p>
                        </div>
                    </div>

                    <div class="card bg-base-200 shadow-xl">
                        <div class="card-body text-center">
                            <div class="flex justify-center mb-4">
                                <div class="badge badge-primary">Badge</div>
                            </div>
                            <h3 class="card-title justify-center text-lg">Badge</h3>
                            <p class="text-sm text-base-content/70">Status indicators</p>
                        </div>
                    </div>

                    <div class="card bg-base-200 shadow-xl">
                        <div class="card-body text-center">
                            <div class="flex justify-center mb-4">
                                <div class="alert alert-info">
                                    <Info class="w-4 h-4" />
                                    <span>Alert</span>
                                </div>
                            </div>
                            <h3 class="card-title justify-center text-lg">Alert</h3>
                            <p class="text-sm text-base-content/70">User notifications</p>
                        </div>
                    </div>
                </div>

                <div class="text-center mt-8">
                    <NuxtLink to="/components" class="btn btn-outline btn-lg">
                        View All Components
                    </NuxtLink>
                </div>
            </div>
        </section>

        <!-- Stats Section -->
        <section class="py-16 bg-base-200">
            <div class="container mx-auto px-4">
                <div class="stats shadow w-full">
                    <div class="stat">
                        <div class="stat-figure text-primary">
                            <Archive class="w-8 h-8" />
                        </div>
                        <div class="stat-title">Components</div>
                        <div class="stat-value text-primary">50+</div>
                        <div class="stat-desc">Ready to use</div>
                    </div>

                    <div class="stat">
                        <div class="stat-figure text-secondary">
                            <Settings class="w-8 h-8" />
                        </div>
                        <div class="stat-title">Themes</div>
                        <div class="stat-value text-secondary">20+</div>
                        <div class="stat-desc">DaisyUI themes</div>
                    </div>

                    <div class="stat">
                        <div class="stat-figure text-accent">
                            <Zap class="w-8 h-8" />
                        </div>
                        <div class="stat-title">Performance</div>
                        <div class="stat-value text-accent">90+</div>
                        <div class="stat-desc">Lighthouse score</div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { Eye, Download, ExternalLink, Zap, Settings, Shield, Heart, Info, Archive } from 'lucide-vue-next'

// Page metadata
definePageMeta({
    title: 'Home',
    description:
        'Modern Design System for Nuxt 4+ with TailwindCSS, DaisyUI and comprehensive component library',
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

<style scoped>
/* Custom scrollbar */
::-webkit-scrollbar {
    width: 8px;
}

::-webkit-scrollbar-track {
    background: hsl(var(--b2));
}

::-webkit-scrollbar-thumb {
    background: hsl(var(--p));
    border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
    background: hsl(var(--pf));
}
</style>

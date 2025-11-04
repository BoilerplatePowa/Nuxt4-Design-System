<template>
    <div class="min-h-screen bg-base-100">
        <div class="container mx-auto px-4 py-8">
            <!-- Breadcrumb -->
            <div class="text-sm breadcrumbs mb-6">
                <ul>
                    <li><NuxtLink to="/">Home</NuxtLink></li>
                    <li><NuxtLink to="/components">Components</NuxtLink></li>
                    <li><NuxtLink to="/components/actions">Actions</NuxtLink></li>
                    <li>Theme Controller</li>
                </ul>
            </div>

            <!-- Header -->
            <div class="mb-12">
                <div class="flex items-center gap-4 mb-4">
                    <div class="bg-primary/20 p-4 rounded-full">
                        <Palette class="w-12 h-12 text-primary" />
                    </div>
                    <div>
                        <h1 class="text-5xl font-bold">BpThemeController</h1>
                        <p class="text-xl text-base-content/70">
                            Toggle and select DaisyUI themes with multiple UI variants
                        </p>
                    </div>
                </div>
                <p class="text-lg text-base-content/70 max-w-3xl">
                    A versatile component for managing theme selection with five different UI
                    variants: button, toggle, switch, dropdown, and radio. Perfect for theme
                    switching in your application.
                </p>
            </div>

            <!-- All Variants -->
            <section class="mb-16">
                <h2 class="text-3xl font-bold mb-6">All Variants</h2>

                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <!-- Button Variant -->
                    <div class="card bg-base-200 shadow-xl">
                        <div class="card-body">
                            <h3 class="card-title text-lg mb-4">
                                <MousePointerClick class="w-5 h-5" />
                                Button
                            </h3>
                            <p class="text-sm text-base-content/70 mb-4">
                                Click button with icon to toggle theme
                            </p>
                            <div class="flex flex-col gap-4">
                                <div>
                                    <p class="text-xs text-base-content/60 mb-2">With Label</p>
                                    <BpThemeController variant="button" :show-label="true" />
                                </div>
                                <div>
                                    <p class="text-xs text-base-content/60 mb-2">Icon Only</p>
                                    <BpThemeController variant="button" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Toggle Variant -->
                    <div class="card bg-base-200 shadow-xl">
                        <div class="card-body">
                            <h3 class="card-title text-lg mb-4">
                                <ToggleLeft class="w-5 h-5" />
                                Toggle
                            </h3>
                            <p class="text-sm text-base-content/70 mb-4">
                                Classic toggle switch for theme selection
                            </p>
                            <div class="flex items-center gap-4">
                                <BpThemeController variant="toggle" size="sm" />
                                <BpThemeController variant="toggle" size="md" />
                                <BpThemeController variant="toggle" size="lg" />
                            </div>
                        </div>
                    </div>

                    <!-- Switch Variant -->
                    <div class="card bg-base-200 shadow-xl">
                        <div class="card-body">
                            <h3 class="card-title text-lg mb-4">
                                <ToggleRight class="w-5 h-5" />
                                Switch
                            </h3>
                            <p class="text-sm text-base-content/70 mb-4">
                                Primary colored toggle switch
                            </p>
                            <div class="flex items-center gap-4">
                                <BpThemeController variant="switch" size="sm" />
                                <BpThemeController variant="switch" size="md" />
                                <BpThemeController variant="switch" size="lg" />
                            </div>
                        </div>
                    </div>

                    <!-- Dropdown Variant -->
                    <div class="card bg-base-200 shadow-xl">
                        <div class="card-body">
                            <h3 class="card-title text-lg mb-4">
                                <ChevronDown class="w-5 h-5" />
                                Dropdown
                            </h3>
                            <p class="text-sm text-base-content/70 mb-4">
                                Select theme from dropdown menu
                            </p>
                            <BpThemeController variant="dropdown" :themes="allThemes" />
                        </div>
                    </div>

                    <!-- Radio Variant -->
                    <div class="card bg-base-200 shadow-xl">
                        <div class="card-body">
                            <h3 class="card-title text-lg mb-4">
                                <Radio class="w-5 h-5" />
                                Radio
                            </h3>
                            <p class="text-sm text-base-content/70 mb-4">
                                Radio buttons for theme selection
                            </p>
                            <BpThemeController variant="radio" :themes="allThemes" />
                        </div>
                    </div>

                    <!-- Custom Themes -->
                    <div class="card bg-base-200 shadow-xl">
                        <div class="card-body">
                            <h3 class="card-title text-lg mb-4">
                                <Settings class="w-5 h-5" />
                                Custom Themes
                            </h3>
                            <p class="text-sm text-base-content/70 mb-4">With custom theme list</p>
                            <BpThemeController
                                variant="dropdown"
                                :themes="customThemes"
                                :light-theme="'corporate'"
                                :dark-theme="'synthwave'"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <!-- Usage Examples -->
            <section class="mb-16">
                <h2 class="text-3xl font-bold mb-6">Usage Examples</h2>

                <div class="grid lg:grid-cols-2 gap-8">
                    <!-- Basic Usage -->
                    <div class="card bg-base-200 shadow-xl">
                        <div class="card-body">
                            <h3 class="card-title text-xl mb-4">Basic Usage</h3>
                            <div class="mockup-code text-left mb-4">
                                <pre
                                    data-prefix="<"
                                ><code>&lt;BpThemeController variant="button" /&gt;</code></pre>
                                <pre
                                    data-prefix="<"
                                ><code>&lt;BpThemeController variant="toggle" /&gt;</code></pre>
                                <pre
                                    data-prefix="<"
                                ><code>&lt;BpThemeController variant="dropdown" /&gt;</code></pre>
                            </div>
                            <div class="flex gap-4">
                                <BpThemeController variant="button" />
                                <BpThemeController variant="toggle" />
                                <BpThemeController variant="dropdown" />
                            </div>
                        </div>
                    </div>

                    <!-- With Custom Themes -->
                    <div class="card bg-base-200 shadow-xl">
                        <div class="card-body">
                            <h3 class="card-title text-xl mb-4">With Custom Themes</h3>
                            <div class="mockup-code text-left mb-4">
                                <pre data-prefix="<"><code>&lt;BpThemeController</code></pre>
                                <pre data-prefix="  "><code>  variant="dropdown"</code></pre>
                                <pre data-prefix="  "><code>  :themes="themes"</code></pre>
                                <pre
                                    data-prefix="  "
                                ><code>  :light-theme="'corporate'"</code></pre>
                                <pre data-prefix="  "><code>  :dark-theme="'synthwave'"</code></pre>
                                <pre data-prefix="/&gt;"><code>/&gt;</code></pre>
                            </div>
                            <BpThemeController
                                variant="dropdown"
                                :themes="customThemes"
                                :light-theme="'corporate'"
                                :dark-theme="'synthwave'"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <!-- Props Documentation -->
            <section class="mb-16">
                <h2 class="text-3xl font-bold mb-6">Props</h2>

                <div class="overflow-x-auto">
                    <table class="table table-zebra w-full">
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
                                <td>
                                    <code
                                        >'button' | 'toggle' | 'switch' | 'dropdown' | 'radio'</code
                                    >
                                </td>
                                <td><code>'button'</code></td>
                                <td>UI variant for the theme controller</td>
                            </tr>
                            <tr>
                                <td><code>themes</code></td>
                                <td><code>ThemeOption[]</code></td>
                                <td>
                                    <code
                                        >[{ value: 'light', label: 'Light' }, { value: 'dark',
                                        label: 'Dark' }]</code
                                    >
                                </td>
                                <td>Array of theme options</td>
                            </tr>
                            <tr>
                                <td><code>defaultTheme</code></td>
                                <td><code>string</code></td>
                                <td><code>'light'</code></td>
                                <td>Default theme value</td>
                            </tr>
                            <tr>
                                <td><code>darkTheme</code></td>
                                <td><code>string</code></td>
                                <td><code>'dark'</code></td>
                                <td>Dark theme value</td>
                            </tr>
                            <tr>
                                <td><code>lightTheme</code></td>
                                <td><code>string</code></td>
                                <td><code>'light'</code></td>
                                <td>Light theme value</td>
                            </tr>
                            <tr>
                                <td><code>showLabel</code></td>
                                <td><code>boolean</code></td>
                                <td><code>false</code></td>
                                <td>Show theme label (button variant only)</td>
                            </tr>
                            <tr>
                                <td><code>size</code></td>
                                <td><code>'xs' | 'sm' | 'md' | 'lg'</code></td>
                                <td><code>'md'</code></td>
                                <td>Size of the controller</td>
                            </tr>
                            <tr>
                                <td><code>ariaLabel</code></td>
                                <td><code>string</code></td>
                                <td><code>'Toggle theme'</code></td>
                                <td>Accessibility label</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <!-- Events -->
            <section class="mb-16">
                <h2 class="text-3xl font-bold mb-6">Events</h2>

                <div class="card bg-base-200 shadow-xl">
                    <div class="card-body">
                        <div class="overflow-x-auto">
                            <table class="table table-zebra w-full">
                                <thead>
                                    <tr>
                                        <th>Event</th>
                                        <th>Payload</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><code>themeChange</code></td>
                                        <td><code>theme: string</code></td>
                                        <td>Emitted when theme changes</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Current Theme Display -->
            <section class="mb-16">
                <div class="card bg-primary text-primary-content shadow-xl">
                    <div class="card-body">
                        <h2 class="card-title text-2xl mb-4">
                            <Palette class="w-6 h-6" />
                            Current Theme
                        </h2>
                        <p class="text-3xl font-bold mb-4">{{ currentTheme }}</p>
                        <p class="text-sm opacity-80">
                            Try switching themes using any of the controllers above to see the
                            change reflected here
                        </p>
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
                                <ArrowLeft class="w-4 h-4 mr-2" /> Back to Actions
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
import { watch } from 'vue'
import { useTheme } from '#imports'
import {
    Palette,
    MousePointerClick,
    ToggleLeft,
    ToggleRight,
    ChevronDown,
    Radio,
    Settings,
    ArrowLeft,
    Grid,
} from 'lucide-vue-next'

const { currentTheme } = useTheme()

// Theme options
const allThemes = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { value: 'cupcake', label: 'Cupcake' },
    { value: 'corporate', label: 'Corporate' },
    { value: 'synthwave', label: 'Synthwave' },
    { value: 'retro', label: 'Retro' },
    { value: 'cyberpunk', label: 'Cyberpunk' },
    { value: 'valentine', label: 'Valentine' },
    { value: 'halloween', label: 'Halloween' },
    { value: 'garden', label: 'Garden' },
    { value: 'forest', label: 'Forest' },
    { value: 'aqua', label: 'Aqua' },
    { value: 'lofi', label: 'Lofi' },
    { value: 'pastel', label: 'Pastel' },
    { value: 'fantasy', label: 'Fantasy' },
    { value: 'wireframe', label: 'Wireframe' },
    { value: 'black', label: 'Black' },
    { value: 'luxury', label: 'Luxury' },
    { value: 'dracula', label: 'Dracula' },
    { value: 'cmyk', label: 'CMYK' },
    { value: 'autumn', label: 'Autumn' },
    { value: 'business', label: 'Business' },
    { value: 'acid', label: 'Acid' },
    { value: 'lemonade', label: 'Lemonade' },
    { value: 'night', label: 'Night' },
    { value: 'coffee', label: 'Coffee' },
    { value: 'winter', label: 'Winter' },
    { value: 'dim', label: 'Dim' },
    { value: 'nord', label: 'Nord' },
    { value: 'sunset', label: 'Sunset' },
]

const customThemes = [
    { value: 'corporate', label: 'Corporate' },
    { value: 'synthwave', label: 'Synthwave' },
    { value: 'retro', label: 'Retro' },
    { value: 'cyberpunk', label: 'Cyberpunk' },
]

// Watch for theme changes
watch(currentTheme, (newTheme) => {
    console.log('Theme changed to:', newTheme)
})

definePageMeta({
    title: 'BpThemeController Component',
    description: 'Examples and usage for BpThemeController component',
})
</script>

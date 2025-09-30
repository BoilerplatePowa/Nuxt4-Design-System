<template>
<div class="min-h-screen bg-base-100">
    <div class="container mx-auto px-4 py-8">
        <!-- Breadcrumb -->
        <div class="text-sm breadcrumbs mb-6">
            <ul>
                <li><NuxtLink to="/">Home</NuxtLink></li>
                <li><NuxtLink to="/components">Components</NuxtLink></li>
                <li><NuxtLink to="/components/actions">Actions</NuxtLink></li>
                <li>Button</li>
            </ul>
        </div>

        <!-- Page Header -->
        <div class="mb-12">
            <h1 class="text-5xl font-bold mb-4">
                BpButton
            </h1>
            <p class="text-xl text-base-content/70 max-w-3xl">
                A versatile button component with multiple variants, sizes, and states. Built on DaisyUI button styles with enhanced functionality and accessibility.
            </p>
        </div>

        <!-- Quick Navigation -->
        <div class="flex flex-wrap gap-2 mb-8">
            <a
                href="#overview"
                class="btn btn-sm"
            >Overview</a>
            <a
                href="#props"
                class="btn btn-sm"
            >Props</a>
            <a
                href="#examples"
                class="btn btn-sm"
            >Examples</a>
            <a
                href="#usage"
                class="btn btn-sm"
            >Usage</a>
            <a
                href="#accessibility"
                class="btn btn-sm"
            >Accessibility</a>
        </div>

        <!-- Overview Section -->
        <section
            id="overview"
            class="mb-16"
        >
            <h2 class="text-3xl font-bold mb-6">
                Overview
            </h2>
            <div class="card bg-base-200 shadow-xl">
                <div class="card-body">
                    <p class="mb-4">
                        The <code class="bg-base-300 px-2 py-1 rounded">BpButton</code> component is the foundation of interactive elements in your application.
                        It provides a consistent, accessible button interface with extensive customization options.
                    </p>

                    <div class="grid md:grid-cols-2 gap-6">
                        <div>
                            <h3 class="font-bold mb-2">
                                Key Features
                            </h3>
                            <ul class="space-y-2">
                                <li class="flex items-center">
                                    <BpIcon
                                        name="check"
                                        class="w-4 h-4 text-success mr-2"
                                    />
                                    Multiple color variants (primary, secondary, accent, ghost, etc.)
                                </li>
                                <li class="flex items-center">
                                    <BpIcon
                                        name="check"
                                        class="w-4 h-4 text-success mr-2"
                                    />
                                    Size options (xs, sm, md, lg)
                                </li>
                                <li class="flex items-center">
                                    <BpIcon
                                        name="check"
                                        class="w-4 h-4 text-success mr-2"
                                    />
                                    Loading states with spinner
                                </li>
                                <li class="flex items-center">
                                    <BpIcon
                                        name="check"
                                        class="w-4 h-4 text-success mr-2"
                                    />
                                    Disabled states
                                </li>
                                <li class="flex items-center">
                                    <BpIcon
                                        name="check"
                                        class="w-4 h-4 text-success mr-2"
                                    />
                                    Full accessibility support
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 class="font-bold mb-2">
                                When to Use
                            </h3>
                            <ul class="space-y-2">
                                <li class="flex items-center">
                                    <BpIcon
                                        name="arrow-right"
                                        class="w-4 h-4 text-primary mr-2"
                                    />
                                    Primary actions and form submissions
                                </li>
                                <li class="flex items-center">
                                    <BpIcon
                                        name="arrow-right"
                                        class="w-4 h-4 text-primary mr-2"
                                    />
                                    Navigation and links
                                </li>
                                <li class="flex items-center">
                                    <BpIcon
                                        name="arrow-right"
                                        class="w-4 h-4 text-primary mr-2"
                                    />
                                    Interactive elements
                                </li>
                                <li class="flex items-center">
                                    <BpIcon
                                        name="arrow-right"
                                        class="w-4 h-4 text-primary mr-2"
                                    />
                                    Call-to-action buttons
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Props Section -->
        <section
            id="props"
            class="mb-16"
        >
            <h2 class="text-3xl font-bold mb-6">
                Props
            </h2>

            <div class="card bg-base-200 shadow-xl">
                <div class="card-body">
                    <div class="overflow-x-auto">
                        <table class="table table-zebra">
                            <thead>
                                <tr>
                                    <th>Prop</th>
                                    <th>Type</th>
                                    <th>Default</th>
                                    <th>Required</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><code>color</code></td>
                                    <td><code>ButtonColor</code></td>
                                    <td><code>'primary'</code></td>
                                    <td>No</td>
                                    <td>Button color variant from DaisyUI theme</td>
                                </tr>
                                <tr>
                                    <td><code>size</code></td>
                                    <td><code>ButtonSize</code></td>
                                    <td><code>'md'</code></td>
                                    <td>No</td>
                                    <td>Button size (xs, sm, md, lg)</td>
                                </tr>
                                <tr>
                                    <td><code>style</code></td>
                                    <td><code>ButtonStyle</code></td>
                                    <td><code>undefined</code></td>
                                    <td>No</td>
                                    <td>Button style (outline, ghost, link, etc.)</td>
                                </tr>
                                <tr>
                                    <td><code>isLoading</code></td>
                                    <td><code>boolean</code></td>
                                    <td><code>false</code></td>
                                    <td>No</td>
                                    <td>Shows loading spinner and disables button</td>
                                </tr>
                                <tr>
                                    <td><code>isDisabled</code></td>
                                    <td><code>boolean</code></td>
                                    <td><code>false</code></td>
                                    <td>No</td>
                                    <td>Disables button interaction</td>
                                </tr>
                                <tr>
                                    <td><code>isWide</code></td>
                                    <td><code>boolean</code></td>
                                    <td><code>false</code></td>
                                    <td>No</td>
                                    <td>Makes button full width</td>
                                </tr>
                                <tr>
                                    <td><code>shape</code></td>
                                    <td><code>'circle' | 'square'</code></td>
                                    <td><code>undefined</code></td>
                                    <td>No</td>
                                    <td>Button shape modifier</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- Type Definitions -->
            <div class="mt-6">
                <h3 class="text-xl font-bold mb-4">
                    Type Definitions
                </h3>
                <div class="mockup-code text-left">
                    <pre data-prefix="type"><code>type ButtonColor = 'primary' | 'secondary' | 'accent' | 'ghost' | 'link' | 'info' | 'success' | 'warning' | 'error'</code></pre>
                    <pre data-prefix="type"><code>type ButtonSize = 'xs' | 'sm' | 'md' | 'lg'</code></pre>
                    <pre data-prefix="type"><code>type ButtonStyle = 'outline' | 'ghost' | 'link' | 'dash' | 'soft'</code></pre>
                </div>
            </div>
        </section>

        <!-- Examples Section -->
        <section
            id="examples"
            class="mb-16"
        >
            <h2 class="text-3xl font-bold mb-6">
                Examples
            </h2>

            <!-- Color Variants -->
            <div class="card bg-base-200 shadow-xl mb-8">
                <div class="card-body">
                    <h3 class="card-title text-xl mb-4">
                        Color Variants
                    </h3>
                    <p class="text-base-content/70 mb-4">
                        All available color variants with their default styling.
                    </p>

                    <div class="flex flex-wrap gap-2 mb-4">
                        <BpButton color="primary">
                            Primary
                        </BpButton>
                        <BpButton color="secondary">
                            Secondary
                        </BpButton>
                        <BpButton color="accent">
                            Accent
                        </BpButton>
                        <BpButton btn-style="ghost">
                            Ghost
                        </BpButton>
                        <BpButton btn-style="link">
                            Link
                        </BpButton>
                    </div>

                    <div class="flex flex-wrap gap-2 mb-4">
                        <BpButton color="info">
                            Info
                        </BpButton>
                        <BpButton color="success">
                            Success
                        </BpButton>
                        <BpButton color="warning">
                            Warning
                        </BpButton>
                        <BpButton color="error">
                            Error
                        </BpButton>
                    </div>

                    <div class="mockup-code text-left">
                        <pre data-prefix="<"><code>&lt;BpButton color="primary"&gt;Primary&lt;/BpButton&gt;</code></pre>
                        <pre data-prefix="<"><code>&lt;BpButton color="secondary"&gt;Secondary&lt;/BpButton&gt;</code></pre>
                        <pre data-prefix="<"><code>&lt;BpButton color="accent"&gt;Accent&lt;/BpButton&gt;</code></pre>
                    </div>
                </div>
            </div>

            <!-- Size Variants -->
            <div class="card bg-base-200 shadow-xl mb-8">
                <div class="card-body">
                    <h3 class="card-title text-xl mb-4">
                        Size Variants
                    </h3>
                    <p class="text-base-content/70 mb-4">
                        Different button sizes for various use cases.
                    </p>

                    <div class="flex flex-wrap items-center gap-2 mb-4">
                        <BpButton
                            color="primary"
                            size="xs"
                        >
                            XS
                        </BpButton>
                        <BpButton
                            color="primary"
                            size="sm"
                        >
                            SM
                        </BpButton>
                        <BpButton
                            color="primary"
                            size="md"
                        >
                            MD
                        </BpButton>
                        <BpButton
                            color="primary"
                            size="lg"
                        >
                            LG
                        </BpButton>
                    </div>

                    <div class="mockup-code text-left">
                        <pre data-prefix="<"><code>&lt;BpButton color="primary" size="xs"&gt;XS&lt;/BpButton&gt;</code></pre>
                        <pre data-prefix="<"><code>&lt;BpButton color="primary" size="lg"&gt;LG&lt;/BpButton&gt;</code></pre>
                    </div>
                </div>
            </div>

            <!-- Style Variants -->
            <div class="card bg-base-200 shadow-xl mb-8">
                <div class="card-body">
                    <h3 class="card-title text-xl mb-4">
                        Style Variants
                    </h3>
                    <p class="text-base-content/70 mb-4">
                        Different button styles for visual variety.
                    </p>

                    <div class="flex flex-wrap gap-2 mb-4">
                        <BpButton
                            color="primary"
                            style="outline"
                        >
                            Outline
                        </BpButton>
                        <BpButton
                            color="primary"
                            style="ghost"
                        >
                            Ghost
                        </BpButton>
                        <BpButton
                            color="primary"
                            style="link"
                        >
                            Link
                        </BpButton>
                        <BpButton
                            color="primary"
                            style="dash"
                        >
                            Dash
                        </BpButton>
                        <BpButton
                            color="primary"
                            style="soft"
                        >
                            Soft
                        </BpButton>
                    </div>

                    <div class="mockup-code text-left">
                        <pre data-prefix="<"><code>&lt;BpButton color="primary" style="outline"&gt;Outline&lt;/BpButton&gt;</code></pre>
                        <pre data-prefix="<"><code>&lt;BpButton color="primary" style="ghost"&gt;Ghost&lt;/BpButton&gt;</code></pre>
                    </div>
                </div>
            </div>

            <!-- States -->
            <div class="card bg-base-200 shadow-xl mb-8">
                <div class="card-body">
                    <h3 class="card-title text-xl mb-4">
                        Button States
                    </h3>
                    <p class="text-base-content/70 mb-4">
                        Loading, disabled, and interactive states.
                    </p>

                    <div class="flex flex-wrap gap-2 mb-4">
                        <BpButton
                            color="primary"
                            :is-loading="true"
                        >
                            Loading
                        </BpButton>
                        <BpButton
                            color="primary"
                            :is-disabled="true"
                        >
                            Disabled
                        </BpButton>
                        <BpButton
                            color="primary"
                            :is-wide="true"
                        >
                            Wide Button
                        </BpButton>
                    </div>

                    <div class="flex flex-wrap gap-2 mb-4">
                        <BpButton
                            color="primary"
                            shape="circle"
                        >
                            <BpIcon
                                name="heart"
                                class="w-4 h-4"
                            />
                        </BpButton>
                        <BpButton
                            color="primary"
                            shape="square"
                        >
                            <BpIcon
                                name="star"
                                class="w-4 h-4"
                            />
                        </BpButton>
                    </div>

                    <div class="mockup-code text-left">
                        <pre data-prefix="<"><code>&lt;BpButton color="primary" :is-loading="true"&gt;Loading&lt;/BpButton&gt;</code></pre>
                        <pre data-prefix="<"><code>&lt;BpButton color="primary" :is-disabled="true"&gt;Disabled&lt;/BpButton&gt;</code></pre>
                        <pre data-prefix="<"><code>&lt;BpButton color="primary" shape="circle"&gt;</code></pre>
                    </div>
                </div>
            </div>
        </section>

        <!-- Usage Section -->
        <section
            id="usage"
            class="mb-16"
        >
            <h2 class="text-3xl font-bold mb-6">
                Usage
            </h2>

            <div class="grid lg:grid-cols-2 gap-8">
                <!-- Basic Usage -->
                <div class="card bg-base-200 shadow-xl">
                    <div class="card-body">
                        <h3 class="card-title text-xl mb-4">
                            Basic Usage
                        </h3>
                        <p class="text-base-content/70 mb-4">
                            Simple button with default styling.
                        </p>

                        <div class="mockup-code text-left mb-4">
                            <pre data-prefix="<"><code>&lt;template&gt;</code></pre>
                            <pre data-prefix="  "><code>  &lt;BpButton @click="handleClick"&gt;</code></pre>
                            <pre data-prefix="    "><code>    Click me</code></pre>
                            <pre data-prefix="  "><code>  &lt;/BpButton&gt;</code></pre>
                            <pre data-prefix="&lt;/"><code>&lt;/template&gt;</code></pre>
                        </div>

                        <div class="mockup-code text-left">
                            <pre data-prefix="<"><code>&lt;script setup&gt;</code></pre>
                            <pre data-prefix="  "><code>function handleClick() {</code></pre>
                            <pre data-prefix="    "><code>  console.log('Button clicked!')</code></pre>
                            <pre data-prefix="  "><code>}</code></pre>
                            <pre data-prefix="&lt;/"><code>&lt;/script&gt;</code></pre>
                        </div>
                    </div>
                </div>

                <!-- Advanced Usage -->
                <div class="card bg-base-200 shadow-xl">
                    <div class="card-body">
                        <h3 class="card-title text-xl mb-4">
                            Advanced Usage
                        </h3>
                        <p class="text-base-content/70 mb-4">
                            Button with multiple props and event handling.
                        </p>

                        <div class="mockup-code text-left mb-4">
                            <pre data-prefix="<"><code>&lt;template&gt;</code></pre>
                            <pre data-prefix="  "><code>  &lt;BpButton</code></pre>
                            <pre data-prefix="    "><code>    color="primary"</code></pre>
                            <pre data-prefix="    "><code>    size="lg"</code></pre>
                            <pre data-prefix="    "><code>    style="outline"</code></pre>
                            <pre data-prefix="    "><code>    :is-loading="isSubmitting"</code></pre>
                            <pre data-prefix="    "><code>    @click="handleSubmit"</code></pre>
                            <pre data-prefix="  "><code>  &gt;</code></pre>
                            <pre data-prefix="    "><code>    Submit Form</code></pre>
                            <pre data-prefix="  "><code>  &lt;/BpButton&gt;</code></pre>
                            <pre data-prefix="&lt;/"><code>&lt;/template&gt;</code></pre>
                        </div>

                        <div class="mockup-code text-left">
                            <pre data-prefix="<"><code>&lt;script setup&gt;</code></pre>
                            <pre data-prefix="  "><code>const isSubmitting = ref(false)</code></pre>
                            <pre data-prefix="  "><code /></pre>
                            <pre data-prefix="  "><code>async function handleSubmit() {</code></pre>
                            <pre data-prefix="    "><code>  isSubmitting.value = true</code></pre>
                            <pre data-prefix="    "><code>  // ... submit logic</code></pre>
                            <pre data-prefix="    "><code>  isSubmitting.value = false</code></pre>
                            <pre data-prefix="  "><code>}</code></pre>
                            <pre data-prefix="&lt;/"><code>&lt;/script&gt;</code></pre>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Accessibility Section -->
        <section
            id="accessibility"
            class="mb-16"
        >
            <h2 class="text-3xl font-bold mb-6">
                Accessibility
            </h2>

            <div class="card bg-base-200 shadow-xl">
                <div class="card-body">
                    <div class="grid md:grid-cols-2 gap-6">
                        <div>
                            <h3 class="font-bold mb-4">
                                WCAG 2.1 AA Compliant
                            </h3>
                            <ul class="space-y-2">
                                <li class="flex items-center">
                                    <BpIcon
                                        name="check"
                                        class="w-4 h-4 text-success mr-2"
                                    />
                                    Proper button role and semantics
                                </li>
                                <li class="flex items-center">
                                    <BpIcon
                                        name="check"
                                        class="w-4 h-4 text-success mr-2"
                                    />
                                    Keyboard navigation support
                                </li>
                                <li class="flex items-center">
                                    <BpIcon
                                        name="check"
                                        class="w-4 h-4 text-success mr-2"
                                    />
                                    Screen reader announcements
                                </li>
                                <li class="flex items-center">
                                    <BpIcon
                                        name="check"
                                        class="w-4 h-4 text-success mr-2"
                                    />
                                    Focus indicators
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 class="font-bold mb-4">
                                ARIA Support
                            </h3>
                            <ul class="space-y-2">
                                <li class="flex items-center">
                                    <BpIcon
                                        name="check"
                                        class="w-4 h-4 text-success mr-2"
                                    />
                                    aria-label for icon-only buttons
                                </li>
                                <li class="flex items-center">
                                    <BpIcon
                                        name="check"
                                        class="w-4 h-4 text-success mr-2"
                                    />
                                    aria-disabled for disabled state
                                </li>
                                <li class="flex items-center">
                                    <BpIcon
                                        name="check"
                                        class="w-4 h-4 text-success mr-2"
                                    />
                                    aria-busy for loading state
                                </li>
                                <li class="flex items-center">
                                    <BpIcon
                                        name="check"
                                        class="w-4 h-4 text-success mr-2"
                                    />
                                    aria-describedby for help text
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="mt-6">
                        <h3 class="font-bold mb-2">
                            Accessibility Example
                        </h3>
                        <div class="mockup-code text-left">
                            <pre data-prefix="<"><code>&lt;BpButton</code></pre>
                            <pre data-prefix="  "><code>  color="primary"</code></pre>
                            <pre data-prefix="  "><code>  aria-label="Submit form data"</code></pre>
                            <pre data-prefix="  "><code>  aria-describedby="submit-help"</code></pre>
                            <pre data-prefix="  "><code>  @click="handleSubmit"</code></pre>
                            <pre data-prefix="&gt;"><code>Submit</code></pre>
                            <pre data-prefix="&lt;/"><code>&lt;/BpButton&gt;</code></pre>
                            <pre data-prefix="<"><code>&lt;div id="submit-help" class="sr-only"&gt;</code></pre>
                            <pre data-prefix="  "><code>  Submits the form data to the server</code></pre>
                            <pre data-prefix="&lt;/"><code>&lt;/div&gt;</code></pre>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Navigation -->
        <section class="mb-16">
            <div class="card bg-base-200 shadow-xl">
                <div class="card-body text-center">
                    <h2 class="card-title text-2xl justify-center mb-4">
                        Explore More Components
                    </h2>
                    <div class="card-actions justify-center">
                        <NuxtLink
                            to="/components/actions"
                            class="btn btn-primary"
                        >
                            <BpIcon
                                name="arrow-left"
                                class="w-4 h-4 mr-2"
                            />
                            Back to Actions
                        </NuxtLink>
                        <NuxtLink
                            to="/components"
                            class="btn btn-outline"
                        >
                            <BpIcon
                                name="grid"
                                class="w-4 h-4 mr-2"
                            />
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
// Page metadata
definePageMeta({
    title: 'BpButton Component',
    description: 'Complete documentation for the BpButton component - props, examples, usage, and accessibility',
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

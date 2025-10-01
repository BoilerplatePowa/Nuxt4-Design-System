<template>
    <div class="min-h-screen bg-base-100">
        <div class="container mx-auto px-4 py-8">
            <!-- Page Header -->
            <div class="text-center mb-12">
                <h1 class="text-5xl font-bold mb-4">Component Examples</h1>
                <p class="text-xl text-base-content/70 max-w-3xl mx-auto">
                    Interactive examples and code snippets for all components. See them in action
                    and copy the code for your projects.
                </p>
            </div>

            <!-- Interactive Examples -->
            <section class="mb-16">
                <h2 class="text-3xl font-bold mb-8 text-center">Interactive Examples</h2>

                <!-- Button Examples -->
                <div class="card bg-base-200 shadow-xl mb-8">
                    <div class="card-body">
                        <h3 class="card-title text-xl mb-4">
                            <BpIcon name="zap" class="w-5 h-5 text-primary" />
                            Button Component Examples
                        </h3>

                        <div class="grid lg:grid-cols-2 gap-8">
                            <!-- Live Examples -->
                            <div>
                                <h4 class="font-bold mb-4">Live Examples</h4>

                                <div class="space-y-4">
                                    <!-- Color Variants -->
                                    <div>
                                        <p class="text-sm font-medium mb-2">Color Variants</p>
                                        <div class="flex flex-wrap gap-2">
                                            <BpButton
                                                v-for="color in buttonColors"
                                                :key="color"
                                                :color="color"
                                                size="sm"
                                            >
                                                {{ color }}
                                            </BpButton>
                                        </div>
                                    </div>

                                    <!-- Size Variants -->
                                    <div>
                                        <p class="text-sm font-medium mb-2">Size Variants</p>
                                        <div class="flex flex-wrap items-center gap-2">
                                            <BpButton
                                                v-for="size in buttonSizes"
                                                :key="size"
                                                color="primary"
                                                :size="size"
                                            >
                                                {{ size.toUpperCase() }}
                                            </BpButton>
                                        </div>
                                    </div>

                                    <!-- Interactive States -->
                                    <div>
                                        <p class="text-sm font-medium mb-2">Interactive States</p>
                                        <div class="flex flex-wrap gap-2">
                                            <BpButton
                                                color="primary"
                                                :is-loading="isLoading"
                                                @click="toggleLoading"
                                            >
                                                {{ isLoading ? 'Loading...' : 'Click Me' }}
                                            </BpButton>
                                            <BpButton
                                                color="secondary"
                                                :is-disabled="isDisabled"
                                                @click="toggleDisabled"
                                            >
                                                {{ isDisabled ? 'Disabled' : 'Toggle Disable' }}
                                            </BpButton>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Code Snippets -->
                            <div>
                                <h4 class="font-bold mb-4">Code Snippets</h4>

                                <div class="tabs tabs-boxed mb-4">
                                    <a
                                        v-for="tab in buttonTabs"
                                        :key="tab.id"
                                        class="tab"
                                        :class="{
                                            'tab-active': activeButtonTab === tab.id,
                                        }"
                                        @click="activeButtonTab = tab.id"
                                    >
                                        {{ tab.label }}
                                    </a>
                                </div>

                                <div class="mockup-code text-left">
                                    <pre
                                        v-for="line in getButtonCode()"
                                        :key="line.code"
                                        :data-prefix="line.prefix"
                                    >
                    <code>{{ line.code }}</code>
                  </pre>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Icon Examples -->
                <div class="card bg-base-200 shadow-xl mb-8">
                    <div class="card-body">
                        <h3 class="card-title text-xl mb-4">
                            <BpIcon name="image" class="w-5 h-5 text-secondary" />
                            Icon Component Examples
                        </h3>

                        <div class="grid lg:grid-cols-2 gap-8">
                            <!-- Live Examples -->
                            <div>
                                <h4 class="font-bold mb-4">Live Examples</h4>

                                <div class="space-y-4">
                                    <!-- Icon Grid -->
                                    <div>
                                        <p class="text-sm font-medium mb-2">Icon Grid</p>
                                        <div class="grid grid-cols-6 gap-3">
                                            <div
                                                v-for="icon in iconExamples"
                                                :key="icon.name"
                                                class="flex flex-col items-center p-2 rounded hover:bg-base-300 cursor-pointer"
                                                @click="selectIcon(icon.name)"
                                            >
                                                <BpIcon
                                                    :name="icon.name as any"
                                                    :class="icon.class"
                                                />
                                                <span class="text-xs mt-1">{{ icon.name }}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Selected Icon -->
                                    <div v-if="selectedIcon" class="p-4 bg-base-300 rounded">
                                        <p class="text-sm font-medium mb-2">
                                            Selected Icon: {{ selectedIcon }}
                                        </p>
                                        <div class="flex items-center gap-4">
                                            <BpIcon
                                                :name="selectedIcon as any"
                                                class="w-8 h-8 text-primary"
                                            />
                                            <BpIcon
                                                :name="selectedIcon as any"
                                                class="w-12 h-12 text-secondary"
                                            />
                                            <BpIcon
                                                :name="selectedIcon as any"
                                                class="w-16 h-16 text-accent"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Code Snippets -->
                            <div>
                                <h4 class="font-bold mb-4">Code Snippets</h4>

                                <div class="mockup-code text-left">
                                    <pre
                                        data-prefix="<"
                                    ><code>&lt;Icon name="heart" class="w-6 h-6 text-error" /&gt;</code></pre>
                                    <pre
                                        data-prefix="<"
                                    ><code>&lt;Icon name="star" class="w-8 h-8 text-warning" /&gt;</code></pre>
                                    <pre
                                        data-prefix="<"
                                    ><code>&lt;Icon name="check-circle" class="w-10 h-10 text-success" /&gt;</code></pre>
                                    <pre
                                        data-prefix="<"
                                    ><code>&lt;Icon name="info" class="w-12 h-12 text-info" /&gt;</code></pre>
                                </div>

                                <div class="mt-4 p-4 bg-base-300 rounded">
                                    <p class="text-sm font-medium mb-2">Available Icons</p>
                                    <p class="text-xs text-base-content/70">
                                        Browse all available icons at
                                        <a
                                            href="https://lucide.dev/icons"
                                            target="_blank"
                                            class="link link-primary"
                                            >lucide.dev</a
                                        >
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Form Examples -->
                <div class="card bg-base-200 shadow-xl mb-8">
                    <div class="card-body">
                        <h3 class="card-title text-xl mb-4">
                            <BpIcon name="edit" class="w-5 h-5 text-accent" />
                            Form Component Examples
                        </h3>

                        <div class="grid lg:grid-cols-2 gap-8">
                            <!-- Live Examples -->
                            <div>
                                <h4 class="font-bold mb-4">Live Examples</h4>

                                <div class="space-y-4">
                                    <!-- Input Fields -->
                                    <div>
                                        <p class="text-sm font-medium mb-2">Input Fields</p>
                                        <div class="space-y-3">
                                            <input
                                                type="text"
                                                placeholder="Text input"
                                                class="input input-bordered w-full"
                                            />
                                            <input
                                                type="email"
                                                placeholder="Email input"
                                                class="input input-bordered w-full"
                                            />
                                            <textarea
                                                placeholder="Textarea"
                                                class="textarea textarea-bordered w-full"
                                            />
                                        </div>
                                    </div>

                                    <!-- Form Actions -->
                                    <div>
                                        <p class="text-sm font-medium mb-2">Form Actions</p>
                                        <div class="flex gap-2">
                                            <BpButton color="primary" size="sm"> Submit </BpButton>
                                            <BpButton style="ghost" size="sm"> Reset </BpButton>
                                            <BpButton color="secondary" size="sm">
                                                Save Draft
                                            </BpButton>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Code Snippets -->
                            <div>
                                <h4 class="font-bold mb-4">Code Snippets</h4>

                                <div class="mockup-code text-left">
                                    <pre
                                        data-prefix="<"
                                    ><code>&lt;input type="text" placeholder="Text input" class="input input-bordered w-full" /&gt;</code></pre>
                                    <pre
                                        data-prefix="<"
                                    ><code>&lt;textarea placeholder="Textarea" class="textarea textarea-bordered w-full"&gt;&lt;/textarea&gt;</code></pre>
                                    <pre
                                        data-prefix="<"
                                    ><code>&lt;BpButton color="primary"&gt;Submit&lt;/BpButton&gt;</code></pre>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Code Playground -->
            <section class="mb-16">
                <h2 class="text-3xl font-bold mb-8 text-center">Code Playground</h2>

                <div class="card bg-base-200 shadow-xl">
                    <div class="card-body">
                        <h3 class="card-title text-xl mb-4">
                            <BpIcon name="file" class="w-5 h-5" />
                            Interactive Code Editor
                        </h3>

                        <div class="grid lg:grid-cols-2 gap-8">
                            <!-- Code Input -->
                            <div>
                                <h4 class="font-bold mb-4">Edit Code</h4>
                                <textarea
                                    v-model="playgroundCode"
                                    class="textarea textarea-bordered w-full h-64 font-mono text-sm"
                                    placeholder="Enter your Vue template code here..."
                                />

                                <div class="mt-4 flex gap-2">
                                    <button class="btn btn-primary btn-sm" @click="runCode">
                                        <BpIcon name="zap" class="w-4 h-4 mr-2" />
                                        Run Code
                                    </button>
                                    <button class="btn btn-ghost btn-sm" @click="resetCode">
                                        <BpIcon name="refresh-cw" class="w-4 h-4 mr-2" />
                                        Reset
                                    </button>
                                </div>
                            </div>

                            <!-- Live Preview -->
                            <div>
                                <h4 class="font-bold mb-4">Live Preview</h4>
                                <div
                                    class="border border-base-300 rounded-lg p-4 min-h-[200px] bg-base-100"
                                >
                                    <div v-if="previewError" class="text-error text-sm">
                                        {{ previewError }}
                                    </div>
                                    <div
                                        v-else-if="playgroundCode.trim()"
                                        v-html="compiledPreview"
                                    />
                                    <div v-else class="text-base-content/50 text-center py-8">
                                        <BpIcon
                                            name="file"
                                            class="w-12 h-12 mx-auto mb-2 opacity-50"
                                        />
                                        <p>Enter code to see live preview</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="mt-6">
                            <h4 class="font-bold mb-2">Example Templates</h4>
                            <div class="flex flex-wrap gap-2">
                                <button
                                    v-for="template in codeTemplates"
                                    :key="template.name"
                                    class="btn btn-outline btn-sm"
                                    @click="loadTemplate(template.code)"
                                >
                                    {{ template.name }}
                                </button>
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
                            <BpIcon name="navigation" class="w-6 h-6" />
                            Ready to Code?
                        </h2>
                        <p class="mb-6">
                            Start building with our components. Copy the code examples and customize
                            them for your projects.
                        </p>
                        <div class="card-actions justify-center">
                            <NuxtLink to="/components" class="btn btn-secondary btn-lg">
                                <BpIcon name="grid" class="w-5 h-5 mr-2" />
                                Browse Components
                            </NuxtLink>
                            <NuxtLink to="/installation" class="btn btn-outline btn-lg">
                                <BpIcon name="download" class="w-5 h-5 mr-2" />
                                Get Started
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
    title: 'Examples',
    description: 'Interactive examples and code snippets for Nuxt Design System components',
})

// Reactive state
const isLoading = ref(false)
const isDisabled = ref(false)
const selectedIcon = ref<(typeof iconExamples)[number]['name']>('heart')
const activeButtonTab = ref('colors')
const playgroundCode = ref('')
const previewError = ref('')
const compiledPreview = ref('')

// Button examples data
const buttonColors = [
    'primary',
    'secondary',
    'accent',
    'info',
    'success',
    'warning',
    'error',
    'neutral',
] as const
const buttonSizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const

const buttonTabs = [
    { id: 'colors', label: 'Colors' },
    { id: 'sizes', label: 'Sizes' },
    { id: 'states', label: 'States' },
]

const iconExamples = [
    { name: 'heart', class: 'w-6 h-6 text-error' },
    { name: 'star', class: 'w-6 h-6 text-warning' },
    { name: 'check-circle', class: 'w-6 h-6 text-success' },
    { name: 'info', class: 'w-6 h-6 text-info' },
    { name: 'zap', class: 'w-6 h-6 text-primary' },
    { name: 'settings', class: 'w-6 h-6 text-secondary' },
]

const codeTemplates = [
    {
        name: 'Simple Button',
        code: `<BpButton color="primary">Click me</BpButton>`,
    },
    {
        name: 'Button with Icon',
        code: `<BpButton color="accent" size="lg">
  <BpIcon name="heart" class="w-4 h-4 mr-2" />
  Like
</BpButton>`,
    },
    {
        name: 'Icon Grid',
        code: `<div class="grid grid-cols-4 gap-4">
  <BpIcon name="home" class="w-8 h-8 text-primary" />
  <BpIcon name="user" class="w-8 h-8 text-secondary" />
  <BpIcon name="settings" class="w-8 h-8 text-accent" />
  <BpIcon name="search" class="w-8 h-8 text-info" />
</div>`,
    },
]

// Methods
function toggleLoading() {
    isLoading.value = !isLoading.value
}

function toggleDisabled() {
    isDisabled.value = !isDisabled.value
}

function selectIcon(iconName: (typeof iconExamples)[number]['name']) {
    selectedIcon.value = iconName
}

function getButtonCode() {
    switch (activeButtonTab.value) {
        case 'colors':
            return [
                {
                    prefix: '<',
                    code: 'BpButton color="primary">Primary</BpButton>',
                },
                {
                    prefix: '<',
                    code: 'BpButton color="secondary">Secondary</BpButton>',
                },
                {
                    prefix: '<',
                    code: 'BpButton color="accent">Accent</BpButton>',
                },
            ]
        case 'sizes':
            return [
                {
                    prefix: '<',
                    code: 'BpButton color="primary" size="xs">XS</BpButton>',
                },
                {
                    prefix: '<',
                    code: 'BpButton color="primary" size="lg">LG</BpButton>',
                },
            ]
        case 'states':
            return [
                {
                    prefix: '<',
                    code: 'BpButton color="primary" :is-loading="true">Loading</BpButton>',
                },
                {
                    prefix: '<',
                    code: 'BpButton color="primary" :is-disabled="true">Disabled</BpButton>',
                },
            ]
        default:
            return []
    }
}

function runCode() {
    try {
        // Simple template compilation (in a real app, you'd use a proper Vue compiler)
        const code = playgroundCode.value.trim()
        if (!code) {
            previewError.value = 'Please enter some code'
            return
        }

        // Basic validation
        if (!code.includes('<') || !code.includes('>')) {
            previewError.value = 'Please enter valid HTML/Vue template code'
            return
        }

        // For demo purposes, just show the code (in production, you'd compile and render it)
        compiledPreview.value = code
        previewError.value = ''
    } catch (error) {
        previewError.value = `Error: ${(error as Error).message}`
    }
}

function resetCode() {
    playgroundCode.value = ''
    compiledPreview.value = ''
    previewError.value = ''
}

function loadTemplate(code: string) {
    playgroundCode.value = code
    runCode()
}

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

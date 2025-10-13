<template>
    <div class="min-h-screen bg-base-100">
        <div class="container mx-auto px-4 py-8">
            <!-- Breadcrumb -->
            <div class="text-sm breadcrumbs mb-6">
                <ul>
                    <li><NuxtLink to="/">Home</NuxtLink></li>
                    <li><NuxtLink to="/components">Components</NuxtLink></li>
                    <li>Data Input</li>
                </ul>
            </div>

            <!-- Page Header -->
            <div class="mb-12">
                <div class="flex items-center gap-4 mb-4">
                    <div class="bg-accent/20 p-4 rounded-full">
                        <BpIcon name="edit" class="w-12 h-12 text-accent" />
                    </div>
                    <div>
                        <h1 class="text-5xl font-bold">Data Input</h1>
                        <p class="text-xl text-base-content/70">Form controls and input elements</p>
                    </div>
                </div>
                <p class="text-lg text-base-content/70 max-w-3xl">
                    Data input components are designed for user data collection and interaction.
                    They follow DaisyUI conventions, support validation, and are fully accessible.
                </p>
            </div>

            <!-- Component Grid -->
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                <!-- Input Component -->
                <div class="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
                    <div class="card-body">
                        <div class="flex items-center gap-3 mb-4">
                            <BpIcon name="edit" class="w-8 h-8 text-accent" />
                            <h2 class="card-title text-xl">BpInput</h2>
                        </div>
                        <p class="text-base-content/70 mb-4">
                            Text input with sizes, variants, icons, masking and validation support.
                        </p>

                        <div class="flex flex-wrap gap-2 mb-4">
                            <span class="badge badge-accent">Text</span>
                            <span class="badge badge-accent">Password</span>
                            <span class="badge badge-accent">Masked</span>
                            <span class="badge badge-accent">Icons</span>
                        </div>

                        <div class="card-actions justify-end">
                            <NuxtLink to="/components/data-input/input" class="btn btn-accent btn-sm">
                                View Details
                            </NuxtLink>
                        </div>
                    </div>
                </div>

                <!-- Checkbox -->
                <div class="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
                    <div class="card-body">
                        <div class="flex items-center gap-3 mb-4">
                            <BpIcon name="check" class="w-8 h-8 text-secondary" />
                            <h2 class="card-title text-xl">BpCheckbox</h2>
                        </div>
                        <p class="text-base-content/70 mb-4">Binary selection control.</p>
                        <div class="card-actions justify-end">
                            <NuxtLink to="/components/data-input/checkbox" class="btn btn-secondary btn-sm">
                                View Details
                            </NuxtLink>
                        </div>
                    </div>
                </div>

                <!-- Select -->
                <div class="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
                    <div class="card-body">
                        <div class="flex items-center gap-3 mb-4">
                            <BpIcon name="menu" class="w-8 h-8 text-primary" />
                            <h2 class="card-title text-xl">BpSelect</h2>
                        </div>
                        <p class="text-base-content/70 mb-4">Dropdown select with variants.</p>
                        <div class="card-actions justify-end">
                            <NuxtLink to="/components/data-input/select" class="btn btn-primary btn-sm">
                                View Details
                            </NuxtLink>
                        </div>
                    </div>
                </div>

                <!-- Radio -->
                <div class="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
                    <div class="card-body">
                        <div class="flex items-center gap-3 mb-4">
                            <BpIcon name="radio" class="w-8 h-8 text-info" />
                            <h2 class="card-title text-xl">BpRadio</h2>
                        </div>
                        <p class="text-base-content/70 mb-4">Radio buttons with sizes and colors.</p>
                        <div class="card-actions justify-end">
                            <NuxtLink to="/components/data-input/radio" class="btn btn-info btn-sm">
                                View Details
                            </NuxtLink>
                        </div>
                    </div>
                </div>

                <!-- Range -->
                <div class="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
                    <div class="card-body">
                        <div class="flex items-center gap-3 mb-4">
                            <BpIcon name="settings" class="w-8 h-8 text-accent" />
                            <h2 class="card-title text-xl">BpRange</h2>
                        </div>
                        <p class="text-base-content/70 mb-4">Slider for selecting a value.</p>
                        <div class="card-actions justify-end">
                            <NuxtLink to="/components/data-input/range" class="btn btn-accent btn-sm">
                                View Details
                            </NuxtLink>
                        </div>
                    </div>
                </div>

                <!-- Rating -->
                <div class="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
                    <div class="card-body">
                        <div class="flex items-center gap-3 mb-4">
                            <BpIcon name="star" class="w-8 h-8 text-warning" />
                            <h2 class="card-title text-xl">BpRating</h2>
                        </div>
                        <p class="text-base-content/70 mb-4">Star rating with sizes and colors.</p>
                        <div class="card-actions justify-end">
                            <NuxtLink to="/components/data-input/rating" class="btn btn-warning btn-sm">
                                View Details
                            </NuxtLink>
                        </div>
                    </div>
                </div>

                <!-- Textarea -->
                <div class="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
                    <div class="card-body">
                        <div class="flex items-center gap-3 mb-4">
                            <BpIcon name="file" class="w-8 h-8 text-secondary" />
                            <h2 class="card-title text-xl">BpTextarea</h2>
                        </div>
                        <p class="text-base-content/70 mb-4">Multiline text input.</p>
                        <div class="card-actions justify-end">
                            <NuxtLink to="/components/data-input/textarea" class="btn btn-secondary btn-sm">
                                View Details
                            </NuxtLink>
                        </div>
                    </div>
                </div>

                <!-- Toggle -->
                <div class="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
                    <div class="card-body">
                        <div class="flex items-center gap-3 mb-4">
                            <BpIcon name="settings" class="w-8 h-8 text-success" />
                            <h2 class="card-title text-xl">BpToggle</h2>
                        </div>
                        <p class="text-base-content/70 mb-4">Switch-style checkbox.</p>
                        <div class="card-actions justify-end">
                            <NuxtLink to="/components/data-input/toggle" class="btn btn-success btn-sm">
                                View Details
                            </NuxtLink>
                        </div>
                    </div>
                </div>

                <!-- File Input -->
                <div class="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
                    <div class="card-body">
                        <div class="flex items-center gap-3 mb-4">
                            <BpIcon name="upload" class="w-8 h-8 text-primary" />
                            <h2 class="card-title text-xl">BpFileInput</h2>
                        </div>
                        <p class="text-base-content/70 mb-4">Upload files with styled input.</p>
                        <div class="card-actions justify-end">
                            <NuxtLink to="/components/data-input/file-input" class="btn btn-primary btn-sm">
                                View Details
                            </NuxtLink>
                        </div>
                    </div>
                </div>

                <!-- Label -->
                <div class="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
                    <div class="card-body">
                        <div class="flex items-center gap-3 mb-4">
                            <BpIcon name="edit" class="w-8 h-8 text-info" />
                            <h2 class="card-title text-xl">Label</h2>
                        </div>
                        <p class="text-base-content/70 mb-4">Labels for inputs and floating labels.</p>
                        <div class="card-actions justify-end">
                            <NuxtLink to="/components/data-input/label" class="btn btn-info btn-sm">
                                View Details
                            </NuxtLink>
                        </div>
                    </div>
                </div>

                <!-- Fieldset -->
                <div class="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
                    <div class="card-body">
                        <div class="flex items-center gap-3 mb-4">
                            <BpIcon name="layout" class="w-8 h-8 text-accent" />
                            <h2 class="card-title text-xl">Fieldset</h2>
                        </div>
                        <p class="text-base-content/70 mb-4">Group related form elements.</p>
                        <div class="card-actions justify-end">
                            <NuxtLink to="/components/data-input/fieldset" class="btn btn-accent btn-sm">
                                View Details
                            </NuxtLink>
                        </div>
                    </div>
                </div>

                <!-- Phone Input -->
                <div class="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
                    <div class="card-body">
                        <div class="flex items-center gap-3 mb-4">
                            <BpIcon name="phone" class="w-8 h-8 text-primary" />
                            <h2 class="card-title text-xl">BpPhoneInput</h2>
                        </div>
                        <p class="text-base-content/70 mb-4">Phone input with mask.</p>
                        <div class="card-actions justify-end">
                            <NuxtLink to="/components/data-input/phone-input" class="btn btn-primary btn-sm">
                                View Details
                            </NuxtLink>
                        </div>
                    </div>
                </div>

                <!-- Calendar -->
                <div class="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
                    <div class="card-body">
                        <div class="flex items-center gap-3 mb-4">
                            <BpIcon name="calendar" class="w-8 h-8 text-secondary" />
                            <h2 class="card-title text-xl">Calendar</h2>
                        </div>
                        <p class="text-base-content/70 mb-4">Calendar styles for date pickers.</p>
                        <div class="card-actions justify-end">
                            <NuxtLink to="/components/data-input/calendar" class="btn btn-secondary btn-sm">
                                View Details
                            </NuxtLink>
                        </div>
                    </div>
                </div>

                <!-- Filter -->
                <div class="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
                    <div class="card-body">
                        <div class="flex items-center gap-3 mb-4">
                            <BpIcon name="filter" class="w-8 h-8 text-info" />
                            <h2 class="card-title text-xl">Filter</h2>
                        </div>
                        <p class="text-base-content/70 mb-4">Grouped radio buttons with reset.</p>
                        <div class="card-actions justify-end">
                            <NuxtLink to="/components/data-input/filter" class="btn btn-info btn-sm">
                                View Details
                            </NuxtLink>
                        </div>
                    </div>
                </div>

                <!-- Validator -->
                <div class="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
                    <div class="card-body">
                        <div class="flex items-center gap-3 mb-4">
                            <BpIcon name="check-circle" class="w-8 h-8 text-success" />
                            <h2 class="card-title text-xl">Validator</h2>
                        </div>
                        <p class="text-base-content/70 mb-4">Change styles based on validity.</p>
                        <div class="card-actions justify-end">
                            <NuxtLink to="/components/data-input/validator" class="btn btn-success btn-sm">
                                View Details
                            </NuxtLink>
                        </div>
                    </div>
                </div>

                <!-- Form Wizard -->
                <div class="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
                    <div class="card-body">
                        <div class="flex items-center gap-3 mb-4">
                            <BpIcon name="menu" class="w-8 h-8 text-warning" />
                            <h2 class="card-title text-xl">BpFormWizard</h2>
                        </div>
                        <p class="text-base-content/70 mb-4">Step-by-step form flow.</p>
                        <div class="card-actions justify-end">
                            <NuxtLink to="/components/data-input/form-wizard" class="btn btn-warning btn-sm">
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
    title: 'Data Input Components',
    description: 'Form controls and inputs for user data collection',
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


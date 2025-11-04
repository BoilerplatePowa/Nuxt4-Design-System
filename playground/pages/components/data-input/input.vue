<template>
    <div class="min-h-screen bg-base-100">
        <div class="container mx-auto px-4 py-8">
            <!-- Breadcrumb -->
            <div class="text-sm breadcrumbs mb-6">
                <ul>
                    <li><NuxtLink to="/">Home</NuxtLink></li>
                    <li><NuxtLink to="/components">Components</NuxtLink></li>
                    <li><NuxtLink to="/components/data-input">Data Input</NuxtLink></li>
                    <li>Input</li>
                </ul>
            </div>

            <!-- Page Header -->
            <div class="mb-12">
                <h1 class="text-5xl font-bold mb-4">BpInput</h1>
                <p class="text-xl text-base-content/70 max-w-3xl">
                    Text input with DaisyUI variants, sizes, icons, masking (IMask), and VeeValidate
                    integration. Fully accessible with labels, help text, and ARIA.
                </p>
            </div>

            <!-- Overview -->
            <section id="overview" class="mb-16">
                <h2 class="text-3xl font-bold mb-6">Overview</h2>
                <div class="card bg-base-200 shadow-xl">
                    <div class="card-body grid md:grid-cols-2 gap-6">
                        <div>
                            <h3 class="font-bold mb-2">Key Features</h3>
                            <ul class="space-y-2">
                                <li class="flex items-center">
                                    <Check class="w-4 h-4 text-success mr-2" />
                                    Sizes (xs, sm, md, lg) and variants (bordered, ghost, primary,
                                    ...)
                                </li>
                                <li class="flex items-center">
                                    <Check class="w-4 h-4 text-success mr-2" />
                                    Left/Right icons and password toggle
                                </li>
                                <li class="flex items-center">
                                    <Check class="w-4 h-4 text-success mr-2" />
                                    IMask presets (phone, date, currency, number, email, ...)
                                </li>
                                <li class="flex items-center">
                                    <Check class="w-4 h-4 text-success mr-2" />
                                    VeeValidate Field integration with error + help text
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 class="font-bold mb-2">When to Use</h3>
                            <ul class="space-y-2">
                                <li class="flex items-center">
                                    <ArrowRight class="w-4 h-4 text-primary mr-2" />
                                    Collecting text, email, password or numeric input
                                </li>
                                <li class="flex items-center">
                                    <ArrowRight class="w-4 h-4 text-primary mr-2" />
                                    Inputs with formatting/masking requirements
                                </li>
                                <li class="flex items-center">
                                    <ArrowRight class="w-4 h-4 text-primary mr-2" />
                                    Inputs that require validation feedback
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Examples -->
            <section id="examples" class="mb-16">
                <h2 class="text-3xl font-bold mb-6">Examples</h2>

                <!-- Basic -->
                <div class="card bg-base-200 shadow-xl mb-8">
                    <div class="card-body">
                        <h3 class="card-title text-xl mb-4">Basic Usage</h3>
                        <div class="grid md:grid-cols-2 gap-6 items-end">
                            <div class="space-y-4">
                                <BpInput
                                    v-model="basic"
                                    name="basic"
                                    label="Your name"
                                    placeholder="Jane Doe"
                                />
                                <BpInput
                                    v-model="email"
                                    name="email"
                                    type="email"
                                    label="Email"
                                    placeholder="you@example.com"
                                    help-text="We'll never share your email."
                                />
                                <BpInput
                                    v-model="password"
                                    name="password"
                                    type="password"
                                    label="Password"
                                    placeholder="••••••••"
                                />
                            </div>
                            <div class="mockup-code text-left">
                                <pre
                                    data-prefix="<"
                                ><code>&lt;BpInput v-model="value" name="name" label="Your name" /&gt;</code></pre>
                                <pre
                                    data-prefix="<"
                                ><code>&lt;BpInput v-model="email" type="email" label="Email" /&gt;</code></pre>
                                <pre
                                    data-prefix="<"
                                ><code>&lt;BpInput v-model="password" type="password" label="Password" /&gt;</code></pre>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Sizes & Variants -->
                <div class="card bg-base-200 shadow-xl mb-8">
                    <div class="card-body">
                        <h3 class="card-title text-xl mb-4">Sizes & Variants</h3>
                        <div class="grid md:grid-cols-2 gap-6 items-end">
                            <div class="space-y-4">
                                <BpInput
                                    v-model="s1"
                                    name="s1"
                                    size="xs"
                                    label="XS"
                                    placeholder="Type..."
                                />
                                <BpInput
                                    v-model="s2"
                                    name="s2"
                                    size="sm"
                                    label="SM"
                                    placeholder="Type..."
                                />
                                <BpInput
                                    v-model="s3"
                                    name="s3"
                                    size="md"
                                    label="MD"
                                    placeholder="Type..."
                                />
                                <BpInput
                                    v-model="s4"
                                    name="s4"
                                    size="lg"
                                    label="LG"
                                    placeholder="Type..."
                                />

                                <BpInput
                                    v-model="v1"
                                    name="v1"
                                    variant="bordered"
                                    label="Bordered"
                                />
                                <BpInput v-model="v2" name="v2" variant="ghost" label="Ghost" />
                                <BpInput v-model="v3" name="v3" variant="primary" label="Primary" />
                                <BpInput
                                    v-model="v4"
                                    name="v4"
                                    variant="secondary"
                                    label="Secondary"
                                />
                            </div>
                            <div class="mockup-code text-left">
                                <pre
                                    data-prefix="<"
                                ><code>&lt;BpInput size="sm" variant="bordered" /&gt;</code></pre>
                                <pre
                                    data-prefix="<"
                                ><code>&lt;BpInput size="lg" variant="ghost" /&gt;</code></pre>
                                <pre
                                    data-prefix="<"
                                ><code>&lt;BpInput variant="primary" /&gt;</code></pre>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Icons & Masking -->
                <div class="card bg-base-200 shadow-xl mb-8">
                    <div class="card-body">
                        <h3 class="card-title text-xl mb-4">Icons & Masking</h3>
                        <div class="grid md:grid-cols-2 gap-6 items-end">
                            <div class="space-y-4">
                                <BpInput
                                    v-model="search"
                                    name="search"
                                    label="Search"
                                    placeholder="Search..."
                                    :left-icon="Search"
                                />
                                <BpInput
                                    v-model="amount"
                                    name="amount"
                                    label="Amount"
                                    placeholder="0.00"
                                    :mask-type="'currency'"
                                    :right-icon="Banknote"
                                />
                                <BpInput
                                    v-model="phone"
                                    name="phone"
                                    label="Phone"
                                    placeholder="+33 0 00 00 00 00"
                                    :mask-type="'phone'"
                                />
                                <BpInput
                                    v-model="date"
                                    name="date"
                                    label="Date"
                                    placeholder="dd/mm/yyyy"
                                    :mask-type="'date'"
                                />
                            </div>
                            <div class="mockup-code text-left">
                                <pre
                                    data-prefix="<"
                                ><code>&lt;BpInput left-icon="search" /&gt;</code></pre>
                                <pre
                                    data-prefix="<"
                                ><code>&lt;BpInput :mask-type="'currency'" /&gt;</code></pre>
                                <pre
                                    data-prefix="<"
                                ><code>&lt;BpInput :mask-type="'phone'" /&gt;</code></pre>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Validation helpers -->
                <div class="card bg-base-200 shadow-xl">
                    <div class="card-body">
                        <h3 class="card-title text-xl mb-4">Help text, max length and counter</h3>
                        <div class="grid md:grid-cols-2 gap-6 items-end">
                            <div class="space-y-4">
                                <BpInput
                                    v-model="bio"
                                    name="bio"
                                    label="Bio"
                                    placeholder="Up to 80 chars"
                                    :maxlength="80"
                                    :show-char-count="true"
                                    help-text="Tell us a bit about yourself."
                                />
                            </div>
                            <div class="mockup-code text-left">
                                <pre
                                    data-prefix="<"
                                ><code>&lt;BpInput :maxlength="80" :show-char-count="true" help-text="..." /&gt;</code></pre>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Props -->
            <section id="props" class="mb-16">
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
                                    <td><code>name</code></td>
                                    <td><code>string</code></td>
                                    <td><code>''</code></td>
                                    <td>Field name (VeeValidate)</td>
                                </tr>
                                <tr>
                                    <td><code>label</code></td>
                                    <td><code>string</code></td>
                                    <td><code>''</code></td>
                                    <td>Input label</td>
                                </tr>
                                <tr>
                                    <td><code>placeholder</code></td>
                                    <td><code>string</code></td>
                                    <td><code>''</code></td>
                                    <td>Placeholder text</td>
                                </tr>
                                <tr>
                                    <td><code>helpText</code></td>
                                    <td><code>string</code></td>
                                    <td><code>''</code></td>
                                    <td>Helper text below input</td>
                                </tr>
                                <tr>
                                    <td><code>type</code></td>
                                    <td><code>InputType</code></td>
                                    <td><code>'text'</code></td>
                                    <td>Input type (text, email, password, number, ...)</td>
                                </tr>
                                <tr>
                                    <td><code>size</code></td>
                                    <td><code>Size</code></td>
                                    <td><code>'md'</code></td>
                                    <td>DaisyUI size</td>
                                </tr>
                                <tr>
                                    <td><code>variant</code></td>
                                    <td><code>Variant</code></td>
                                    <td><code>'bordered'</code></td>
                                    <td>DaisyUI variant</td>
                                </tr>
                                <tr>
                                    <td><code>leftIcon</code></td>
                                    <td><code>IconName</code></td>
                                    <td><code>undefined</code></td>
                                    <td>Left icon</td>
                                </tr>
                                <tr>
                                    <td><code>rightIcon</code></td>
                                    <td><code>IconName</code></td>
                                    <td><code>undefined</code></td>
                                    <td>Right icon</td>
                                </tr>
                                <tr>
                                    <td><code>disabled</code></td>
                                    <td><code>boolean</code></td>
                                    <td><code>false</code></td>
                                    <td>Disabled state</td>
                                </tr>
                                <tr>
                                    <td><code>readonly</code></td>
                                    <td><code>boolean</code></td>
                                    <td><code>false</code></td>
                                    <td>Readonly state</td>
                                </tr>
                                <tr>
                                    <td><code>required</code></td>
                                    <td><code>boolean</code></td>
                                    <td><code>false</code></td>
                                    <td>Required field</td>
                                </tr>
                                <tr>
                                    <td><code>maxlength</code></td>
                                    <td><code>number</code></td>
                                    <td><code>undefined</code></td>
                                    <td>Maximum characters</td>
                                </tr>
                                <tr>
                                    <td><code>showCharCount</code></td>
                                    <td><code>boolean</code></td>
                                    <td><code>false</code></td>
                                    <td>Show character counter</td>
                                </tr>
                                <tr>
                                    <td><code>ariaDescribedby</code></td>
                                    <td><code>string</code></td>
                                    <td><code>''</code></td>
                                    <td>Additional aria-describedby IDs</td>
                                </tr>
                                <tr>
                                    <td><code>rules</code></td>
                                    <td><code>Record&lt;string,unknown&gt;</code></td>
                                    <td><code>undefined</code></td>
                                    <td>VeeValidate rules</td>
                                </tr>
                                <tr>
                                    <td><code>mask</code></td>
                                    <td><code>Record&lt;string,unknown&gt;</code></td>
                                    <td><code>undefined</code></td>
                                    <td>IMask config object</td>
                                </tr>
                                <tr>
                                    <td><code>maskType</code></td>
                                    <td><code>MaskType</code></td>
                                    <td><code>undefined</code></td>
                                    <td>Predefined mask (phone, date, currency, ...)</td>
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
                            <NuxtLink to="/components/data-input" class="btn btn-primary">
                                <ArrowLeft class="w-4 h-4 mr-2" /> Back to Data Input
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
import { ArrowLeft, Grid, Check, ArrowRight, Search, Banknote } from 'lucide-vue-next'
const basic = ref('')
const email = ref('')
const password = ref('')

const s1 = ref('')
const s2 = ref('')
const s3 = ref('')
const s4 = ref('')

const v1 = ref('')
const v2 = ref('')
const v3 = ref('')
const v4 = ref('')

const search = ref('')
const amount = ref('')
const phone = ref('')
const date = ref('')
const bio = ref('')

definePageMeta({
    title: 'BpInput Component',
    description: 'Props, examples, and usage for BpInput',
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

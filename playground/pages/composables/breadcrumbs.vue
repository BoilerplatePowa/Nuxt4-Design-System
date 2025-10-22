<template>
    <div class="container mx-auto p-6">
        <div class="space-y-8">
            <!-- Page Header -->
            <div>
                <h1 class="text-3xl font-bold mb-2">useBreadcrumbs Composable</h1>
                <p class="text-base-content/70">
                    Global breadcrumbs management that can be used anywhere in your application.
                </p>
            </div>

            <!-- Breadcrumb Provider -->
            <BreadcrumbProvider 
                size="md" 
                :max-items="5"
                class="mb-6"
            />

            <!-- Demo Controls -->
            <div class="card bg-base-100 shadow-lg">
                <div class="card-body">
                    <h2 class="card-title">Breadcrumb Controls</h2>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <!-- Set Breadcrumbs -->
                        <div class="space-y-2">
                            <h3 class="font-semibold">Set Breadcrumbs</h3>
                            <div class="flex flex-wrap gap-2">
                                <button 
                                    class="btn btn-sm btn-primary" 
                                    @click="setPageBreadcrumbs('Products')"
                                >
                                    Set Page
                                </button>
                                <button 
                                    class="btn btn-sm btn-secondary" 
                                    @click="setSectionBreadcrumbs('Products', 'Electronics')"
                                >
                                    Set Section
                                </button>
                                <button 
                                    class="btn btn-sm btn-accent" 
                                    @click="setNestedBreadcrumbs(['Products', 'Electronics', 'Laptops', 'Gaming'])"
                                >
                                    Set Nested
                                </button>
                            </div>
                        </div>

                        <!-- Add Breadcrumbs -->
                        <div class="space-y-2">
                            <h3 class="font-semibold">Add Breadcrumbs</h3>
                            <div class="flex flex-wrap gap-2">
                                <button 
                                    class="btn btn-sm btn-info" 
                                    @click="addBreadcrumb({ label: 'Category', value: 'category' })"
                                >
                                    Add Category
                                </button>
                                <button 
                                    class="btn btn-sm btn-success" 
                                    @click="addBreadcrumb({ label: 'Product', value: 'product' })"
                                >
                                    Add Product
                                </button>
                                <button 
                                    class="btn btn-sm btn-warning" 
                                    @click="addBreadcrumb({ label: 'Details', value: 'details' })"
                                >
                                    Add Details
                                </button>
                            </div>
                        </div>

                        <!-- Navigation -->
                        <div class="space-y-2">
                            <h3 class="font-semibold">Navigation</h3>
                            <div class="flex flex-wrap gap-2">
                                <button 
                                    class="btn btn-sm btn-outline" 
                                    @click="goBack(1)"
                                    :disabled="breadcrumbs.length <= 1"
                                >
                                    Go Back 1
                                </button>
                                <button 
                                    class="btn btn-sm btn-outline" 
                                    @click="goBack(2)"
                                    :disabled="breadcrumbs.length <= 2"
                                >
                                    Go Back 2
                                </button>
                                <button 
                                    class="btn btn-sm btn-outline" 
                                    @click="clearBreadcrumbs"
                                    :disabled="breadcrumbs.length === 0"
                                >
                                    Clear All
                                </button>
                            </div>
                        </div>

                        <!-- Utility Actions -->
                        <div class="space-y-2">
                            <h3 class="font-semibold">Utilities</h3>
                            <div class="flex flex-wrap gap-2">
                                <button 
                                    class="btn btn-sm btn-ghost" 
                                    @click="showCurrentPath"
                                >
                                    Show Path
                                </button>
                                <button 
                                    class="btn btn-sm btn-ghost" 
                                    @click="showCurrentItem"
                                >
                                    Show Current
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Current State Display -->
            <div class="card bg-base-200">
                <div class="card-body">
                    <h3 class="card-title">Current State</h3>
                    <div class="space-y-2">
                        <p><strong>Breadcrumbs Count:</strong> {{ breadcrumbs.length }}</p>
                        <p><strong>Current Path:</strong> {{ getCurrentPath() }}</p>
                        <p><strong>Current Item:</strong> {{ getCurrentItem()?.label || 'None' }}</p>
                        <p><strong>All Items:</strong></p>
                        <ul class="list-disc list-inside ml-4">
                            <li v-for="(item, index) in breadcrumbs" :key="index">
                                {{ item.label }} 
                                <span v-if="item.active" class="badge badge-sm badge-primary">Active</span>
                                <span v-if="item.href" class="badge badge-sm badge-secondary">Link</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Usage Examples -->
            <div class="card bg-base-100 shadow-lg">
                <div class="card-body">
                    <h3 class="card-title">Usage Examples</h3>
                    <div class="space-y-4">
                        <div>
                            <h4 class="font-semibold mb-2">Basic Usage</h4>
                            <pre class="bg-base-300 p-3 rounded text-sm overflow-x-auto"><code>// In any component
const { setPageBreadcrumbs, addBreadcrumb } = useBreadcrumbs()

// Set page breadcrumbs with auto home
setPageBreadcrumbs('Products')

// Add more breadcrumbs
addBreadcrumb({ label: 'Electronics', value: 'electronics' })
addBreadcrumb({ label: 'Laptops', value: 'laptops' })</code></pre>
                        </div>

                        <div>
                            <h4 class="font-semibold mb-2">Advanced Usage</h4>
                            <pre class="bg-base-300 p-3 rounded text-sm overflow-x-auto"><code>// Set nested breadcrumbs
setNestedBreadcrumbs(['Products', 'Electronics', 'Laptops'])

// Set section breadcrumbs
setSectionBreadcrumbs('Products', 'Electronics')

// Navigation
goBack(1) // Go back one step
clearBreadcrumbs() // Clear all

// Utilities
getCurrentPath() // Get current path string
getCurrentItem() // Get current active item</code></pre>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useBreadcrumbs } from '~/composables/useBreadcrumbs'
import BreadcrumbProvider from '~/components/Navigation/BreadcrumbProvider.vue'

// Use the global breadcrumbs composable
const {
    breadcrumbs,
    setPageBreadcrumbs,
    setSectionBreadcrumbs,
    setNestedBreadcrumbs,
    addBreadcrumb,
    goBack,
    clearBreadcrumbs,
    getCurrentPath,
    getCurrentItem
} = useBreadcrumbs()

// Initialize with some breadcrumbs
setPageBreadcrumbs('useBreadcrumbs Demo')

// Utility functions for demo
const showCurrentPath = () => {
    alert(`Current Path: ${getCurrentPath()}`)
}

const showCurrentItem = () => {
    const current = getCurrentItem()
    alert(`Current Item: ${current?.label || 'None'}`)
}
</script>

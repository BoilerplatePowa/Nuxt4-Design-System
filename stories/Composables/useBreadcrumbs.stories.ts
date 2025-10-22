import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { useBreadcrumbs } from '../../src/runtime/composables/useBreadcrumbs'
import BreadcrumbProvider from '../../src/runtime/components/Navigation/BreadcrumbProvider.vue'

const meta: Meta<typeof BreadcrumbProvider> = {
    title: 'Composables/useBreadcrumbs',
    component: BreadcrumbProvider,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: 'Global breadcrumbs composable that can be used anywhere in the application to manage navigation breadcrumbs.'
            }
        }
    },
    argTypes: {
        size: {
            control: { type: 'select' },
            options: ['xs', 'sm', 'md', 'lg'],
            description: 'DaisyUI breadcrumbs size'
        },
        maxItems: {
            control: { type: 'number' },
            description: 'Maximum number of breadcrumbs to show'
        },
        showHomeIcon: {
            control: { type: 'boolean' },
            description: 'Show home icon'
        },
        position: {
            control: { type: 'select' },
            options: ['top', 'bottom', 'inline'],
            description: 'Position of breadcrumbs'
        }
    }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: () => ({
        components: { BreadcrumbProvider },
        setup() {
            const { setPageBreadcrumbs } = useBreadcrumbs()
            
            // Set initial breadcrumbs
            setPageBreadcrumbs('Products')
            
            return {}
        },
        template: `
            <div class="space-y-4">
                <h2 class="text-2xl font-bold">useBreadcrumbs Demo</h2>
                <p class="text-base-content/70">This shows the global breadcrumbs state.</p>
                <BreadcrumbProvider />
            </div>
        `
    })
}

export const SectionBreadcrumbs: Story = {
    render: () => ({
        components: { BreadcrumbProvider },
        setup() {
            const { setSectionBreadcrumbs } = useBreadcrumbs()
            
            setSectionBreadcrumbs('Products', 'Electronics')
            
            return {}
        },
        template: `
            <div class="space-y-4">
                <h2 class="text-2xl font-bold">Section Breadcrumbs</h2>
                <p class="text-base-content/70">Shows section and page breadcrumbs.</p>
                <BreadcrumbProvider />
            </div>
        `
    })
}

export const NestedBreadcrumbs: Story = {
    render: () => ({
        components: { BreadcrumbProvider },
        setup() {
            const { setNestedBreadcrumbs } = useBreadcrumbs()
            
            setNestedBreadcrumbs(['Products', 'Electronics', 'Laptops', 'Gaming Laptops'])
            
            return {}
        },
        template: `
            <div class="space-y-4">
                <h2 class="text-2xl font-bold">Nested Breadcrumbs</h2>
                <p class="text-base-content/70">Shows deeply nested breadcrumbs with max items limit.</p>
                <BreadcrumbProvider :max-items="4" />
            </div>
        `
    })
}

export const Interactive: Story = {
    render: () => ({
        components: { BreadcrumbProvider },
        setup() {
            const { 
                setBreadcrumbs, 
                addBreadcrumb, 
                goBack, 
                clearBreadcrumbs,
                getCurrentPath,
                getCurrentItem
            } = useBreadcrumbs()
            
            const addProduct = () => {
                addBreadcrumb({ 
                    label: 'Product Details', 
                    value: 'product-details',
                    href: '/products/123'
                })
            }
            
            const addCategory = () => {
                addBreadcrumb({ 
                    label: 'Category', 
                    value: 'category',
                    href: '/categories/electronics'
                })
            }
            
            const goBackOne = () => {
                goBack(1)
            }
            
            const goBackTwo = () => {
                goBack(2)
            }
            
            const reset = () => {
                clearBreadcrumbs()
                setBreadcrumbs([
                    { label: 'Home', href: '/', value: 'home' },
                    { label: 'Products', href: '/products', value: 'products' }
                ])
            }
            
            // Initialize with some breadcrumbs
            reset()
            
            return {
                addProduct,
                addCategory,
                goBackOne,
                goBackTwo,
                reset,
                getCurrentPath,
                getCurrentItem
            }
        },
        template: `
            <div class="space-y-4">
                <h2 class="text-2xl font-bold">Interactive Breadcrumbs</h2>
                <p class="text-base-content/70">Try the buttons below to manipulate the breadcrumbs.</p>
                
                <BreadcrumbProvider />
                
                <div class="flex flex-wrap gap-2">
                    <button class="btn btn-sm btn-primary" @click="addProduct">
                        Add Product
                    </button>
                    <button class="btn btn-sm btn-secondary" @click="addCategory">
                        Add Category
                    </button>
                    <button class="btn btn-sm btn-accent" @click="goBackOne">
                        Go Back 1
                    </button>
                    <button class="btn btn-sm btn-warning" @click="goBackTwo">
                        Go Back 2
                    </button>
                    <button class="btn btn-sm btn-error" @click="reset">
                        Reset
                    </button>
                </div>
                
                <div class="card bg-base-200 p-4">
                    <h3 class="font-bold mb-2">Current State:</h3>
                    <p><strong>Path:</strong> {{ getCurrentPath() }}</p>
                    <p><strong>Current Item:</strong> {{ getCurrentItem()?.label || 'None' }}</p>
                </div>
            </div>
        `
    })
}

export const DifferentSizes: Story = {
    render: () => ({
        components: { BreadcrumbProvider },
        setup() {
            const { setBreadcrumbs } = useBreadcrumbs()
            
            setBreadcrumbs([
                { label: 'Home', href: '/', value: 'home' },
                { label: 'Products', href: '/products', value: 'products' },
                { label: 'Electronics', value: 'electronics' }
            ])
            
            return {}
        },
        template: `
            <div class="space-y-6">
                <h2 class="text-2xl font-bold">Different Sizes</h2>
                
                <div class="space-y-4">
                    <div>
                        <h3 class="text-lg font-semibold mb-2">Extra Small (xs)</h3>
                        <BreadcrumbProvider size="xs" />
                    </div>
                    
                    <div>
                        <h3 class="text-lg font-semibold mb-2">Small (sm)</h3>
                        <BreadcrumbProvider size="sm" />
                    </div>
                    
                    <div>
                        <h3 class="text-lg font-semibold mb-2">Medium (md)</h3>
                        <BreadcrumbProvider size="md" />
                    </div>
                    
                    <div>
                        <h3 class="text-lg font-semibold mb-2">Large (lg)</h3>
                        <BreadcrumbProvider size="lg" />
                    </div>
                </div>
            </div>
        `
    })
}

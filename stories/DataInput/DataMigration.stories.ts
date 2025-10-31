import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import DataMigration from '../../src/runtime/components/DataInput/DataMigration.vue'

/**
 * DataMigration Component
 *
 * A comprehensive data migration interface that helps users link old data to new data
 * with intelligent auto-matching, visual connections, and progress tracking.
 *
 * ## Features
 * - **Visual Linking**: Click-to-link interface with visual connection lines
 * - **Auto-Matching**: Intelligent fuzzy matching using Fuse.js
 * - **Search & Filter**: Real-time search across both data sets
 * - **Progress Tracking**: Visual progress bar and statistics
 * - **Undo/Redo**: Full history management via Pinia store
 * - **Responsive Layout**: Horizontal and vertical layout options
 * - **Accessibility**: Full keyboard navigation and screen reader support
 *
 * ## Use Cases
 * - Database migrations
 * - User account merging
 * - Product catalog updates
 * - Contact list consolidation
 * - Any data mapping scenario
 */

const meta: Meta<typeof DataMigration> = {
    title: 'Data Input/Data Migration',
    component: DataMigration,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component:
                    'DataMigration provides a visual interface for migrating old data to new data with intelligent auto-matching and manual linking capabilities.',
            },
        },
    },
    argTypes: {
        oldData: {
            control: 'object',
            description: 'Array of old data items to migrate from',
        },
        newData: {
            control: 'object',
            description: 'Array of new data items to migrate to',
        },
        keyField: {
            control: 'text',
            description: 'Field to use as unique identifier',
        },
        displayField: {
            control: 'text',
            description: 'Field to display in the tables',
        },
        title: {
            control: 'text',
            description: 'Title for the migration interface',
        },
        description: {
            control: 'text',
            description: 'Description text',
        },
        showAutoMatch: {
            control: 'boolean',
            description: 'Show auto-match button',
        },
        showMatchScore: {
            control: 'boolean',
            description: 'Show match confidence scores',
        },
        showConnectionDots: {
            control: 'boolean',
            description: 'Show connection dots on lines',
        },
        confidenceThreshold: {
            control: { type: 'range', min: 0, max: 1, step: 0.1 },
            description: 'Minimum confidence threshold for auto-matching',
        },
        layout: {
            control: 'select',
            options: ['horizontal', 'vertical'],
            description: 'Layout orientation',
        },
        allowMultipleLinks: {
            control: 'boolean',
            description: 'Allow multiple new items to link to same old item',
        },
    },
    args: {
        keyField: 'id',
        displayField: 'name',
        title: 'Data Migration',
        description: 'Link old data entries to their corresponding new data entries',
        showAutoMatch: true,
        showMatchScore: true,
        showConnectionDots: true,
        confidenceThreshold: 0.6,
        layout: 'horizontal',
        allowMultipleLinks: false,
    },
}

export default meta
type Story = StoryObj<typeof meta>

// Sample data
const sampleOldUsers = [
    { id: 1, name: 'John Doe', email: 'john@oldsite.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@oldsite.com', role: 'Editor' },
    { id: 3, name: 'Bob Johnson', email: 'bob@oldsite.com', role: 'Viewer' },
    { id: 4, name: 'Alice Williams', email: 'alice@oldsite.com', role: 'Editor' },
    { id: 5, name: 'Charlie Brown', email: 'charlie@oldsite.com', role: 'Admin' },
]

const sampleNewUsers = [
    { id: 101, name: 'John Doe', email: 'john.doe@newsite.com', department: 'IT' },
    { id: 102, name: 'Jane Smith', email: 'jane.smith@newsite.com', department: 'Marketing' },
    { id: 103, name: 'Robert Johnson', email: 'robert.j@newsite.com', department: 'Sales' },
    { id: 104, name: 'Alice Williams', email: 'a.williams@newsite.com', department: 'HR' },
    { id: 105, name: 'Charles Brown', email: 'c.brown@newsite.com', department: 'IT' },
]

const sampleOldProducts = [
    { id: 'p1', name: 'Laptop Pro 15"', sku: 'LAP-001', price: 1299 },
    { id: 'p2', name: 'Wireless Mouse', sku: 'MOU-001', price: 29 },
    { id: 'p3', name: 'Mechanical Keyboard', sku: 'KEY-001', price: 149 },
    { id: 'p4', name: 'USB-C Hub', sku: 'HUB-001', price: 79 },
    { id: 'p5', name: 'Monitor 27"', sku: 'MON-001', price: 399 },
]

const sampleNewProducts = [
    { id: 'np1', name: 'Laptop Pro 15" (2024)', sku: 'LAP-2024-001', price: 1399 },
    { id: 'np2', name: 'Wireless Mouse V2', sku: 'MOU-2024-001', price: 35 },
    { id: 'np3', name: 'Mechanical Keyboard RGB', sku: 'KEY-2024-001', price: 179 },
    { id: 'np4', name: 'USB-C Hub Pro', sku: 'HUB-2024-001', price: 99 },
    { id: 'np5', name: '27" 4K Monitor', sku: 'MON-2024-001', price: 499 },
]

/**
 * Default migration interface with user data
 */
export const Default: Story = {
    render: (args) => ({
        components: { DataMigration },
        setup() {
            return { args }
        },
        template: `
      <div class="p-6 bg-base-200 min-h-screen">
        <DataMigration v-bind="args" />
      </div>
    `,
    }),
    args: {
        oldData: sampleOldUsers,
        newData: sampleNewUsers,
    },
}

/**
 * Product migration example
 */
export const ProductMigration: Story = {
    render: (args) => ({
        components: { DataMigration },
        setup() {
            return { args }
        },
        template: `
      <div class="p-6 bg-base-200 min-h-screen">
        <DataMigration v-bind="args" />
      </div>
    `,
    }),
    args: {
        oldData: sampleOldProducts,
        newData: sampleNewProducts,
        title: 'Product Catalog Migration',
        description: 'Migrate products from old catalog to new catalog system',
        displayField: 'name',
    },
}

/**
 * Vertical layout for narrow screens
 */
export const VerticalLayout: Story = {
    render: (args) => ({
        components: { DataMigration },
        setup() {
            return { args }
        },
        template: `
      <div class="p-6 bg-base-200 min-h-screen">
        <DataMigration v-bind="args" />
      </div>
    `,
    }),
    args: {
        oldData: sampleOldUsers,
        newData: sampleNewUsers,
        layout: 'vertical',
    },
}

/**
 * With custom display field (email)
 */
export const EmailDisplay: Story = {
    render: (args) => ({
        components: { DataMigration },
        setup() {
            return { args }
        },
        template: `
      <div class="p-6 bg-base-200 min-h-screen">
        <DataMigration v-bind="args" />
      </div>
    `,
    }),
    args: {
        oldData: sampleOldUsers,
        newData: sampleNewUsers,
        displayField: 'email',
        title: 'Email Migration',
        description: 'Match old email addresses to new email addresses',
    },
}

/**
 * Without auto-match feature
 */
export const ManualOnly: Story = {
    render: (args) => ({
        components: { DataMigration },
        setup() {
            return { args }
        },
        template: `
      <div class="p-6 bg-base-200 min-h-screen">
        <DataMigration v-bind="args" />
      </div>
    `,
    }),
    args: {
        oldData: sampleOldUsers,
        newData: sampleNewUsers,
        showAutoMatch: false,
        title: 'Manual Migration',
        description: 'Manually link each old entry to a new entry',
    },
}

/**
 * High confidence threshold (stricter matching)
 */
export const HighConfidenceThreshold: Story = {
    render: (args) => ({
        components: { DataMigration },
        setup() {
            return { args }
        },
        template: `
      <div class="p-6 bg-base-200 min-h-screen">
        <DataMigration v-bind="args" />
      </div>
    `,
    }),
    args: {
        oldData: sampleOldUsers,
        newData: sampleNewUsers,
        confidenceThreshold: 0.9,
        title: 'High Confidence Migration',
        description: 'Only auto-match entries with 90%+ confidence',
    },
}

/**
 * Allow multiple links to same target
 */
export const MultipleLinks: Story = {
    render: (args) => ({
        components: { DataMigration },
        setup() {
            return { args }
        },
        template: `
      <div class="p-6 bg-base-200 min-h-screen">
        <DataMigration v-bind="args" />
      </div>
    `,
    }),
    args: {
        oldData: sampleOldUsers,
        newData: sampleNewUsers,
        allowMultipleLinks: true,
        title: 'Many-to-One Migration',
        description: 'Multiple old entries can link to the same new entry',
    },
}

/**
 * Interactive example with event handling
 */
export const WithEventHandling: Story = {
    render: (args) => ({
        components: { DataMigration },
        setup() {
            const events = ref<string[]>([])

            const handleLinkCreated = (pair: any) => {
                events.value.unshift(
                    `✅ Link created: ${pair.oldId} → ${pair.newId} (${Math.round((pair.confidence ?? 0) * 100)}%)`
                )
            }

            const handleLinkRemoved = (pair: any) => {
                events.value.unshift(`❌ Link removed: ${pair.oldId} → ${pair.newId}`)
            }

            const handleAutoMatchComplete = (pairs: any[]) => {
                events.value.unshift(`🤖 Auto-match completed: ${pairs.length} links created`)
            }

            const handleComplete = (mappings: any[]) => {
                events.value.unshift(`🎉 Migration completed: ${mappings.length} total mappings`)
            }

            const handleExport = (mappings: any[]) => {
                console.log('Exported mappings:', mappings)
                events.value.unshift(`📤 Exported ${mappings.length} mappings to console`)
            }

            return {
                args,
                events,
                handleLinkCreated,
                handleLinkRemoved,
                handleAutoMatchComplete,
                handleComplete,
                handleExport,
            }
        },
        template: `
      <div class="p-6 bg-base-200 min-h-screen">
        <DataMigration 
          v-bind="args"
          @link-created="handleLinkCreated"
          @link-removed="handleLinkRemoved"
          @auto-match-complete="handleAutoMatchComplete"
          @complete="handleComplete"
          @export="handleExport"
        />
        
        <div class="mt-6 card bg-base-100 shadow-xl">
          <div class="card-body">
            <h3 class="card-title">Event Log</h3>
            <div class="max-h-48 overflow-y-auto">
              <div v-if="events.length === 0" class="text-base-content/70 text-sm">
                No events yet. Start linking items to see events here.
              </div>
              <div v-for="(event, index) in events" :key="index" class="text-sm py-1 border-b border-base-300 last:border-0">
                {{ event }}
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
    }),
    args: {
        oldData: sampleOldUsers,
        newData: sampleNewUsers,
    },
}

/**
 * Large dataset example
 */
export const LargeDataset: Story = {
    render: (args) => ({
        components: { DataMigration },
        setup() {
            // Generate large datasets
            const largeOldData = Array.from({ length: 50 }, (_, i) => ({
                id: i + 1,
                name: `User ${i + 1}`,
                email: `user${i + 1}@oldsite.com`,
                role: ['Admin', 'Editor', 'Viewer'][i % 3],
            }))

            const largeNewData = Array.from({ length: 50 }, (_, i) => ({
                id: i + 101,
                name: `User ${i + 1}`,
                email: `user${i + 1}@newsite.com`,
                department: ['IT', 'Marketing', 'Sales', 'HR'][i % 4],
            }))

            return {
                args: {
                    ...args,
                    oldData: largeOldData,
                    newData: largeNewData,
                },
            }
        },
        template: `
      <div class="p-6 bg-base-200 min-h-screen">
        <DataMigration v-bind="args" />
      </div>
    `,
    }),
    args: {
        title: 'Large Dataset Migration',
        description: 'Migrate 50 users from old system to new system',
    },
}

/**
 * Minimal configuration
 */
export const Minimal: Story = {
    render: (args) => ({
        components: { DataMigration },
        setup() {
            return { args }
        },
        template: `
      <div class="p-6 bg-base-200 min-h-screen">
        <DataMigration v-bind="args" />
      </div>
    `,
    }),
    args: {
        oldData: sampleOldUsers.slice(0, 3),
        newData: sampleNewUsers.slice(0, 3),
        showMatchScore: false,
        showConnectionDots: false,
        title: 'Simple Migration',
        description: 'Basic migration interface',
    },
}

/**
 * Empty state
 */
export const EmptyState: Story = {
    render: (args) => ({
        components: { DataMigration },
        setup() {
            return { args }
        },
        template: `
      <div class="p-6 bg-base-200 min-h-screen">
        <DataMigration v-bind="args" />
      </div>
    `,
    }),
    args: {
        oldData: [],
        newData: [],
        title: 'Empty Migration',
        description: 'No data to migrate',
    },
}

/**
 * Custom styling example
 */
export const CustomStyling: Story = {
    render: (args) => ({
        components: { DataMigration },
        setup() {
            return { args }
        },
        template: `
      <div class="p-6 bg-gradient-to-br from-primary/10 to-secondary/10 min-h-screen">
        <div class="max-w-7xl mx-auto">
          <div class="mb-6 text-center">
            <h1 class="text-4xl font-bold text-primary mb-2">🔄 Data Migration Tool</h1>
            <p class="text-lg text-base-content/70">Seamlessly migrate your data with confidence</p>
          </div>
          <DataMigration v-bind="args" class="shadow-2xl" />
        </div>
      </div>
    `,
    }),
    args: {
        oldData: sampleOldUsers,
        newData: sampleNewUsers,
        title: 'User Account Migration',
        description: 'Migrate user accounts from legacy system to modern platform',
    },
}


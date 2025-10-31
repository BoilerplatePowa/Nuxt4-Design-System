<template>
    <div class="container mx-auto p-6">
        <div class="mb-8">
            <h1 class="text-4xl font-bold mb-2">DataMigration Component</h1>
            <p class="text-lg text-base-content/70">
                A comprehensive data migration interface with intelligent auto-matching and visual
                connections
            </p>
        </div>

        <!-- Component Demo -->
        <div class="card bg-base-100 shadow-xl mb-8">
            <div class="card-body">
                <h2 class="card-title mb-4">Interactive Demo</h2>

                <DataMigration
                    :old-data="oldUsers"
                    :new-data="newUsers"
                    key-field="id"
                    display-field="name"
                    title="User Migration"
                    description="Link old user accounts to new user accounts"
                    :show-auto-match="true"
                    :show-match-score="true"
                    :show-connection-dots="true"
                    :confidence-threshold="0.6"
                    layout="horizontal"
                    @link-created="handleLinkCreated"
                    @link-removed="handleLinkRemoved"
                    @auto-match-complete="handleAutoMatchComplete"
                    @complete="handleComplete"
                    @export="handleExport"
                />
            </div>
        </div>

        <!-- Event Log -->
        <div class="card bg-base-100 shadow-xl mb-8">
            <div class="card-body">
                <h2 class="card-title mb-4">Event Log</h2>
                <div class="max-h-64 overflow-y-auto">
                    <div v-if="eventLog.length === 0" class="text-center py-8 text-base-content/70">
                        No events yet. Start interacting with the migration interface above.
                    </div>
                    <div
                        v-for="(event, index) in eventLog"
                        :key="index"
                        class="py-2 px-4 border-b border-base-300 last:border-0 hover:bg-base-200 transition-colors"
                    >
                        <div class="flex items-start gap-3">
                            <span class="text-2xl">{{ event.icon }}</span>
                            <div class="flex-1">
                                <div class="font-medium">{{ event.title }}</div>
                                <div class="text-sm text-base-content/70">{{ event.message }}</div>
                                <div class="text-xs text-base-content/50 mt-1">
                                    {{ event.timestamp }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="eventLog.length > 0" class="mt-4">
                    <Button variant="ghost" size="sm" @click="clearEventLog">Clear Log</Button>
                </div>
            </div>
        </div>

        <!-- Configuration Options -->
        <div class="card bg-base-100 shadow-xl mb-8">
            <div class="card-body">
                <h2 class="card-title mb-4">Configuration Options</h2>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Layout</span>
                        </label>
                        <select v-model="config.layout" class="select select-bordered">
                            <option value="horizontal">Horizontal</option>
                            <option value="vertical">Vertical</option>
                        </select>
                    </div>

                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Display Field</span>
                        </label>
                        <select v-model="config.displayField" class="select select-bordered">
                            <option value="name">Name</option>
                            <option value="email">Email</option>
                        </select>
                    </div>

                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Confidence Threshold</span>
                        </label>
                        <input
                            v-model.number="config.confidenceThreshold"
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            class="range range-primary"
                        />
                        <div class="text-sm text-base-content/70 mt-1">
                            {{ Math.round(config.confidenceThreshold * 100) }}%
                        </div>
                    </div>

                    <div class="form-control">
                        <label class="label cursor-pointer">
                            <span class="label-text">Show Auto-Match</span>
                            <input
                                v-model="config.showAutoMatch"
                                type="checkbox"
                                class="toggle toggle-primary"
                            />
                        </label>
                    </div>

                    <div class="form-control">
                        <label class="label cursor-pointer">
                            <span class="label-text">Show Match Score</span>
                            <input
                                v-model="config.showMatchScore"
                                type="checkbox"
                                class="toggle toggle-primary"
                            />
                        </label>
                    </div>

                    <div class="form-control">
                        <label class="label cursor-pointer">
                            <span class="label-text">Show Connection Dots</span>
                            <input
                                v-model="config.showConnectionDots"
                                type="checkbox"
                                class="toggle toggle-primary"
                            />
                        </label>
                    </div>

                    <div class="form-control">
                        <label class="label cursor-pointer">
                            <span class="label-text">Allow Multiple Links</span>
                            <input
                                v-model="config.allowMultipleLinks"
                                type="checkbox"
                                class="toggle toggle-primary"
                            />
                        </label>
                    </div>
                </div>
            </div>
        </div>

        <!-- Code Example -->
        <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
                <h2 class="card-title mb-4">Code Example</h2>

                <div class="mockup-code">
                    <pre><code>&lt;template&gt;
  &lt;DataMigration
    :old-data="oldUsers"
    :new-data="newUsers"
    key-field="id"
    display-field="name"
    title="User Migration"
    description="Link old user accounts to new user accounts"
    :show-auto-match="true"
    :show-match-score="true"
    :confidence-threshold="0.6"
    @link-created="handleLinkCreated"
    @complete="handleComplete"
  /&gt;
&lt;/template&gt;

&lt;script setup lang="ts"&gt;
const oldUsers = [
  { id: 1, name: 'John Doe', email: 'john@old.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@old.com' },
]

const newUsers = [
  { id: 101, name: 'John Doe', email: 'john@new.com' },
  { id: 102, name: 'Jane Smith', email: 'jane@new.com' },
]

const handleLinkCreated = (pair) => {
  console.log('Link created:', pair)
}

const handleComplete = (mappings) => {
  console.log('Migration complete:', mappings)
  // Process the mappings...
}
&lt;/script&gt;</code></pre>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DataMigration from '../../../../src/runtime/components/DataInput/DataMigration.vue'
import Button from '../../../../src/runtime/components/Actions/Button.vue'
import type { LinkedPair } from '../../../../src/runtime/composables/useMigration'

// Sample data
const oldUsers = ref([
    { id: 1, name: 'John Doe', email: 'john@oldsite.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@oldsite.com', role: 'Editor' },
    { id: 3, name: 'Bob Johnson', email: 'bob@oldsite.com', role: 'Viewer' },
    { id: 4, name: 'Alice Williams', email: 'alice@oldsite.com', role: 'Editor' },
    { id: 5, name: 'Charlie Brown', email: 'charlie@oldsite.com', role: 'Admin' },
])

const newUsers = ref([
    { id: 101, name: 'John Doe', email: 'john.doe@newsite.com', department: 'IT' },
    { id: 102, name: 'Jane Smith', email: 'jane.smith@newsite.com', department: 'Marketing' },
    { id: 103, name: 'Robert Johnson', email: 'robert.j@newsite.com', department: 'Sales' },
    { id: 104, name: 'Alice Williams', email: 'a.williams@newsite.com', department: 'HR' },
    { id: 105, name: 'Charles Brown', email: 'c.brown@newsite.com', department: 'IT' },
])

// Configuration
const config = ref({
    layout: 'horizontal' as 'horizontal' | 'vertical',
    displayField: 'name',
    confidenceThreshold: 0.6,
    showAutoMatch: true,
    showMatchScore: true,
    showConnectionDots: true,
    allowMultipleLinks: false,
})

// Event log
interface EventLogEntry {
    icon: string
    title: string
    message: string
    timestamp: string
}

const eventLog = ref<EventLogEntry[]>([])

const addEvent = (icon: string, title: string, message: string) => {
    eventLog.value.unshift({
        icon,
        title,
        message,
        timestamp: new Date().toLocaleTimeString(),
    })
}

const handleLinkCreated = (pair: LinkedPair) => {
    addEvent(
        '✅',
        'Link Created',
        `Linked old item ${pair.oldId} to new item ${pair.newId} with ${Math.round((pair.confidence ?? 0) * 100)}% confidence`
    )
}

const handleLinkRemoved = (pair: LinkedPair) => {
    addEvent('❌', 'Link Removed', `Removed link between ${pair.oldId} and ${pair.newId}`)
}

const handleAutoMatchComplete = (pairs: LinkedPair[]) => {
    addEvent('🤖', 'Auto-Match Complete', `Successfully matched ${pairs.length} items`)
}

const handleComplete = (mappings: LinkedPair[]) => {
    addEvent('🎉', 'Migration Complete', `Completed migration with ${mappings.length} mappings`)
    console.log('Migration mappings:', mappings)
}

const handleExport = (mappings: LinkedPair[]) => {
    addEvent('📤', 'Export', `Exported ${mappings.length} mappings`)
    console.log('Exported mappings:', mappings)
}

const clearEventLog = () => {
    eventLog.value = []
}
</script>

<style scoped>
.mockup-code {
    overflow-x: auto;
}

.mockup-code pre {
    white-space: pre-wrap;
    word-wrap: break-word;
}
</style>

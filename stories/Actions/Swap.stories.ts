import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import Swap from '../../src/runtime/components/Actions/Swap.vue'

const meta: Meta<typeof Swap> = {
    title: 'Actions/Swap',
    component: Swap,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component:
                    'An animated swap component for toggling between two states with smooth transitions. Uses Vue 3.4+ `defineModel()` macro for seamless v-model integration with proper TypeScript support.',
            },
        },
    },
    argTypes: {
        variant: {
            control: { type: 'select' },
            options: ['rotate', 'flip', 'indeterminate'],
            description: 'Swap animation variant',
            table: {
                type: { summary: 'rotate | flip | indeterminate' },
                defaultValue: { summary: 'rotate' },
            },
        },
        swapOnContent: {
            control: 'text',
            description: 'Content for on state (fallback when no slot is provided)',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '🌞' },
            },
        },
        swapOffContent: {
            control: 'text',
            description: 'Content for off state (fallback when no slot is provided)',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '🌚' },
            },
        },
        indeterminateContent: {
            control: 'text',
            description: 'Content for indeterminate state (fallback when no slot is provided)',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '🌤️' },
            },
        },
        disabled: {
            control: 'boolean',
            description: 'Disable the swap interaction',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
            },
        },
        name: {
            control: 'text',
            description: 'Name attribute for the input element (useful for forms)',
            table: {
                type: { summary: 'string' },
            },
        },
        id: {
            control: 'text',
            description: 'ID attribute for the input element (useful for accessibility)',
            table: {
                type: { summary: 'string' },
            },
        },
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        variant: 'rotate',
    },
    render: (args) => ({
        components: { Swap },
        setup() {
            const isOn = ref(false)
            return { isOn, args }
        },
        template: `
      <div class="space-y-4">
        <Swap v-model="isOn" v-bind="args" />
        <p class="text-sm text-gray-600">Current state: {{ isOn ? 'On' : 'Off' }}</p>
      </div>
    `,
    }),
}

export const AllVariants: Story = {
    render: () => ({
        components: { Swap },
        setup() {
            const states = ref([false, false, false])
            return { states }
        },
        template: `
      <div class="space-y-6">
        <div class="grid grid-cols-3 gap-6">
          <div class="text-center">
            <h4 class="font-semibold mb-2">Rotate (Default)</h4>
            <Swap v-model="states[0]" variant="rotate">
              <template #on><div class="text-4xl">🌞</div></template>
              <template #off><div class="text-4xl">🌙</div></template>
            </Swap>
            <p class="text-sm text-gray-600 mt-2">{{ states[0] ? 'Light' : 'Dark' }}</p>
          </div>
          
          <div class="text-center">
            <h4 class="font-semibold mb-2">Flip</h4>
            <Swap v-model="states[1]" variant="flip">
              <template #on><div class="text-4xl">😊</div></template>
              <template #off><div class="text-4xl">😴</div></template>
            </Swap>
            <p class="text-sm text-gray-600 mt-2">{{ states[1] ? 'Awake' : 'Sleeping' }}</p>
          </div>
          
          <div class="text-center">
            <h4 class="font-semibold mb-2">Indeterminate</h4>
            <Swap v-model="states[2]" variant="indeterminate">
              <template #on><div class="text-4xl">🌞</div></template>
              <template #off><div class="text-4xl">🌙</div></template>
              <template #indeterminate><div class="text-4xl">🌤️</div></template>
            </Swap>
            <p class="text-sm text-gray-600 mt-2">{{ states[2] ? 'Light' : 'Dark' }}</p>
          </div>
        </div>
      </div>
    `,
    }),
}

export const CustomContent: Story = {
    args: {
        variant: 'rotate',
        swapOnContent: '✅',
        swapOffContent: '❌',
    },
    render: (args) => ({
        components: { Swap },
        setup() {
            const isOn = ref(false)
            return { isOn, args }
        },
        template: `
      <div class="space-y-4">
        <Swap v-model="isOn" v-bind="args" />
        <p class="text-sm text-gray-600">Status: {{ isOn ? 'Active' : 'Inactive' }}</p>
      </div>
    `,
    }),
}

export const FormIntegration: Story = {
    render: () => ({
        components: { Swap },
        setup() {
            const formData = ref({
                notifications: false,
                marketing: false,
                darkMode: false,
                autoSave: true,
            })

            const handleSubmit = () => {
                alert('Form submitted with: ' + JSON.stringify(formData.value, null, 2))
            }

            return { formData, handleSubmit }
        },
        template: `
      <div class="max-w-md mx-auto">
        <h3 class="text-lg font-semibold mb-4">Form Integration</h3>
        
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <label for="notifications-swap" class="text-sm font-medium">Email Notifications</label>
              <Swap v-model="formData.notifications" id="notifications-swap" name="notifications">
                <template #on><div class="text-2xl">🔔</div></template>
                <template #off><div class="text-2xl">🔕</div></template>
              </Swap>
            </div>
            
            <div class="flex items-center justify-between">
              <label for="marketing-swap" class="text-sm font-medium">Marketing Emails</label>
              <Swap v-model="formData.marketing" id="marketing-swap" name="marketing">
                <template #on><div class="text-2xl">📧</div></template>
                <template #off><div class="text-2xl">📭</div></template>
              </Swap>
            </div>
            
            <div class="flex items-center justify-between">
              <label for="darkmode-swap" class="text-sm font-medium">Dark Mode</label>
              <Swap v-model="formData.darkMode" id="darkmode-swap" name="darkMode">
                <template #on><div class="text-2xl">🌙</div></template>
                <template #off><div class="text-2xl">🌞</div></template>
              </Swap>
            </div>
            
            <div class="flex items-center justify-between">
              <label for="autosave-swap" class="text-sm font-medium">Auto Save</label>
              <Swap v-model="formData.autoSave" id="autosave-swap" name="autoSave">
                <template #on><div class="text-2xl">💾</div></template>
                <template #off><div class="text-2xl">📄</div></template>
              </Swap>
            </div>
          </div>
          
          <button type="submit" class="btn btn-primary w-full">Save Settings</button>
        </form>
        
        <div class="mt-4 p-3 bg-gray-100 rounded text-sm">
          <strong>Form data:</strong>
          <pre class="mt-2">{{ JSON.stringify(formData, null, 2) }}</pre>
        </div>
      </div>
    `,
    }),
}

export const AdvancedExamples: Story = {
    render: () => ({
        components: { Swap },
        setup() {
            const isOn = ref(false)
            const toggleCount = ref(0)
            const externalControl = ref(false)

            const handleToggle = () => {
                toggleCount.value++
            }

            const toggleFromParent = () => {
                isOn.value = !isOn.value
            }

            const syncWithExternal = () => {
                isOn.value = externalControl.value
            }

            return {
                isOn,
                toggleCount,
                externalControl,
                handleToggle,
                toggleFromParent,
                syncWithExternal,
            }
        },
        template: `
      <div class="space-y-6">
        <!-- Event Handling -->
        <div class="text-center">
          <h4 class="font-semibold mb-2">Event Handling</h4>
          <Swap v-model="isOn" @update:model-value="handleToggle">
            <template #on><div class="text-4xl">✅</div></template>
            <template #off><div class="text-4xl">❌</div></template>
          </Swap>
          <p class="text-sm text-gray-600 mt-2">Toggle count: {{ toggleCount }}</p>
        </div>
        
        <!-- Parent Control -->
        <div class="text-center">
          <h4 class="font-semibold mb-2">Parent Control</h4>
          <Swap v-model="isOn">
            <template #on><div class="text-4xl">🌞</div></template>
            <template #off><div class="text-4xl">🌙</div></template>
          </Swap>
          <p class="text-sm text-gray-600 mt-2">Current state: {{ isOn ? 'On' : 'Off' }}</p>
          
          <div class="mt-3 space-y-2">
            <button @click="toggleFromParent" class="btn btn-sm btn-outline">Toggle from parent</button>
            <div class="flex items-center gap-3 justify-center">
              <label class="text-sm">External control:</label>
              <input v-model="externalControl" type="checkbox" class="checkbox" />
              <button @click="syncWithExternal" class="btn btn-sm btn-outline">Sync</button>
            </div>
          </div>
        </div>
        
        <!-- Disabled State -->
        <div class="grid grid-cols-2 gap-6">
          <div class="text-center">
            <h4 class="font-semibold mb-2">Disabled</h4>
            <Swap v-model="isOn" :disabled="true">
              <template #on><div class="text-4xl">🌞</div></template>
              <template #off><div class="text-4xl">🌙</div></template>
            </Swap>
            <p class="text-sm text-gray-600 mt-2">Cannot interact</p>
          </div>
          
          <div class="text-center">
            <h4 class="font-semibold mb-2">Enabled</h4>
            <Swap v-model="isOn" :disabled="false">
              <template #on><div class="text-4xl">🌞</div></template>
              <template #off><div class="text-4xl">🌙</div></template>
            </Swap>
            <p class="text-sm text-gray-600 mt-2">Can interact</p>
          </div>
        </div>
      </div>
    `,
    }),
}

export const Accessibility: Story = {
    render: () => ({
        components: { Swap },
        setup() {
            const themeValue = ref(false)
            const notificationsValue = ref(false)
            const soundValue = ref(false)

            return { themeValue, notificationsValue, soundValue }
        },
        template: `
      <div class="max-w-md">
        <h3 class="text-lg font-semibold mb-4">Accessibility Features</h3>
        
        <div class="space-y-4">
          <div class="flex items-center justify-between p-3 border rounded">
            <label for="theme-swap" class="text-sm font-medium">Theme Mode</label>
            <Swap 
              v-model="themeValue"
              id="theme-swap"
              name="theme-toggle"
              aria-label="Toggle between light and dark theme"
            >
              <template #on><div class="text-3xl" aria-hidden="true">🌞</div></template>
              <template #off><div class="text-3xl" aria-hidden="true">🌙</div></template>
            </Swap>
            <span class="text-sm text-gray-600 ml-2">{{ themeValue ? 'Light' : 'Dark' }}</span>
          </div>
          
          <div class="flex items-center justify-between p-3 border rounded">
            <label for="notifications-swap" class="text-sm font-medium">Notifications</label>
            <Swap 
              v-model="notificationsValue"
              id="notifications-swap"
              name="notifications-toggle"
              aria-label="Toggle notifications on or off"
            >
              <template #on><div class="text-3xl" aria-hidden="true">🔔</div></template>
              <template #off><div class="text-3xl" aria-hidden="true">🔕</div></template>
            </Swap>
            <span class="text-sm text-gray-600 ml-2">{{ notificationsValue ? 'On' : 'Off' }}</span>
          </div>
          
          <div class="flex items-center justify-between p-3 border rounded">
            <label for="sound-swap" class="text-sm font-medium">Sound Effects</label>
            <Swap 
              v-model="soundValue"
              id="sound-swap"
              name="sound-toggle"
              aria-label="Toggle sound effects on or off"
            >
              <template #on><div class="text-3xl" aria-hidden="true">🔊</div></template>
              <template #off><div class="text-3xl" aria-hidden="true">🔇</div></template>
            </Swap>
            <span class="text-sm text-gray-600 ml-2">{{ soundValue ? 'On' : 'Off' }}</span>
          </div>
        </div>
        
        <div class="mt-6 p-4 bg-blue-50 border border-blue-200 rounded">
          <h4 class="font-semibold text-blue-900 mb-2">Accessibility Features:</h4>
          <ul class="text-sm text-blue-800 space-y-1">
            <li>• Proper label associations with <code>for</code> attributes</li>
            <li>• Descriptive <code>aria-label</code> attributes</li>
            <li>• <code>aria-hidden="true"</code> on decorative content</li>
            <li>• Keyboard navigation support</li>
            <li>• Screen reader friendly state announcements</li>
            <li>• Form integration with <code>name</code> attributes</li>
          </ul>
        </div>
      </div>
    `,
    }),
}

export const Playground: Story = {
    args: {
        variant: 'rotate',
        swapOnContent: '🌞',
        swapOffContent: '🌙',
        indeterminateContent: '🌤️',
        disabled: false,
        name: 'playground-swap',
        id: 'playground-swap',
    },
    render: (args) => ({
        components: { Swap },
        setup() {
            const isOn = ref(false)
            return { isOn, args }
        },
        template: `
      <div class="space-y-4">
        <Swap v-model="isOn" v-bind="args" />
        <p class="text-sm text-gray-600">Current state: {{ isOn ? 'On' : 'Off' }}</p>
        
        <div class="text-sm text-gray-600">
          Use the controls above to customize this swap component
        </div>
      </div>
    `,
    }),
}

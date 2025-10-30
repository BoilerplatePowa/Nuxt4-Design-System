import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Toast from '../../src/runtime/components/Feedback/Toast.vue'
import ToastContainer from '../../src/runtime/components/Feedback/ToastContainer.vue'
import { useToast } from '../../src/runtime/composables/useToast'

const meta: Meta<typeof Toast> = {
    title: 'Feedback/Toast',
    component: Toast,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component:
                    'Toast notification component for displaying temporary messages and alerts.',
            },
        },
    },
    argTypes: {
        message: {
            control: 'text',
            description: 'Toast message content',
        },
        type: {
            control: { type: 'select' },
            options: ['info', 'success', 'warning', 'error'],
            description: 'Toast variant determining color and icon',
        },
        duration: {
            control: { type: 'number', min: 1000, max: 10000, step: 500 },
            description: 'Auto-dismiss duration in milliseconds',
        },
        title: {
            control: 'text',
            description: 'Toast title',
        },
        closable: {
            control: 'boolean',
            description: 'Show close button',
        },
        persistent: {
            control: 'boolean',
            description: 'Prevent auto-dismiss',
        },
        position: {
            control: { type: 'select' },
            options: [
                'top-right',
                'top-left',
                'bottom-right',
                'bottom-left',
                'top-center',
                'bottom-center',
            ],
            description: 'Toast position on screen (only works when fixed is true)',
        },
        fixed: {
            control: 'boolean',
            description: 'Use fixed positioning (required for position prop to work)',
        },
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        message: 'This is a default toast message',
        type: 'info',
        closable: true,
    },
}

export const Variants: Story = {
    render: () => ({
        components: { Toast },
        data() {
            return {
                toasts: [
                    { id: 1, message: 'Information message', type: 'info' },
                    {
                        id: 2,
                        message: 'Success! Operation completed',
                        type: 'success',
                    },
                    {
                        id: 3,
                        message: 'Warning: Please check your input',
                        type: 'warning',
                    },
                    {
                        id: 4,
                        message: 'Error: Something went wrong',
                        type: 'error',
                    },
                ],
            }
        },
        template: `
      <div class="space-y-4">
        <Toast 
          v-for="toast in toasts" 
          :key="toast.id"
          :message="toast.message"
          :type="toast.type"
          :closable="true"
          :persistent="true"
        />
      </div>
    `,
    }),
}

export const WithActions: Story = {
    render: () => ({
        components: { Toast },
        template: `
      <div class="space-y-4">
        <Toast 
          message="File uploaded successfully!"
          variant="success"
          :dismissible="true"
          :persistent="true"
        >
          <template #actions>
            <button class="btn btn-sm btn-ghost">View</button>
            <button class="btn btn-sm btn-primary">Share</button>
          </template>
        </Toast>
        
        <Toast 
          message="Your session will expire in 5 minutes"
          variant="warning"
          :dismissible="true"
          :persistent="true"
        >
          <template #actions>
            <button class="btn btn-sm btn-warning">Extend Session</button>
          </template>
        </Toast>
        
        <Toast 
          message="Failed to save changes"
          type="error"
          :closable="true"
          :persistent="true"
        >
          <template #actions>
            <button class="btn btn-sm btn-error">Retry</button>
            <button class="btn btn-sm btn-ghost">Cancel</button>
          </template>
        </Toast>
      </div>
    `,
    }),
}

export const RichContent: Story = {
    render: () => ({
        components: { Toast },
        template: `
      <div class="space-y-4">
        <Toast 
          type="info"
          :closable="true"
          :persistent="true"
        >
          <template #default>
            <div>
              <div class="font-semibold">New Feature Available!</div>
              <div class="text-sm mt-1">Check out our new dashboard design with improved navigation and better performance.</div>
            </div>
          </template>
          <template #actions>
            <button class="btn btn-sm btn-primary">Learn More</button>
          </template>
        </Toast>
        
        <Toast 
          variant="success"
          :dismissible="true"
          :persistent="true"
        >
          <template #default>
            <div class="flex items-center">
              <div class="avatar mr-3">
                <div class="w-8 rounded-full">
                  <div class="w-8 h-8 bg-success rounded-full flex items-center justify-center text-white text-xs">
                    JD
                  </div>
                </div>
              </div>
              <div>
                <div class="font-semibold">John Doe commented</div>
                <div class="text-sm">Great work on the new feature!</div>
              </div>
            </div>
          </template>
        </Toast>
        
        <Toast 
          variant="warning"
          :dismissible="true"
          :persistent="true"
        >
          <template #default>
            <div>
              <div class="font-semibold">Storage Almost Full</div>
              <div class="text-sm mt-1">You're using 95% of your storage quota.</div>
              <div class="progress progress-warning w-full mt-2">
                <div class="progress-bar" style="width: 95%"></div>
              </div>
            </div>
          </template>
          <template #actions>
            <button class="btn btn-sm btn-warning">Upgrade</button>
          </template>
        </Toast>
      </div>
    `,
    }),
}

export const ToastManager: Story = {
    render: () => ({
        components: { Toast },
        data() {
            return {
                toasts: [],
                nextId: 1,
            }
        },
        methods: {
            addToast(type: string, message: string) {
                const toast = {
                    id: this.nextId++,
                    type,
                    message,
                    timestamp: new Date(),
                }
                this.toasts.push(toast)

                // Auto remove after 3 seconds
                setTimeout(() => {
                    this.removeToast(toast.id)
                }, 3000)
            },
            removeToast(id: number) {
                const index = this.toasts.findIndex((toast: any) => toast.id === id)
                if (index > -1) {
                    this.toasts.splice(index, 1)
                }
            },
        },
        template: `
      <div>
        <div class="flex gap-2 mb-6">
          <button 
            @click="addToast('info', 'Information message')"
            class="btn btn-info btn-sm"
          >
            Show Info
          </button>
          <button 
            @click="addToast('success', 'Success message')"
            class="btn btn-success btn-sm"
          >
            Show Success
          </button>
          <button 
            @click="addToast('warning', 'Warning message')"
            class="btn btn-warning btn-sm"
          >
            Show Warning
          </button>
          <button 
            @click="addToast('error', 'Error message')"
            class="btn btn-error btn-sm"
          >
            Show Error
          </button>
        </div>
        
        <Toast 
          v-for="toast in toasts"
          :key="toast.id"
          :message="toast.message"
          :type="toast.type"
          :position="'top-right'"
          :fixed="true"
          :closable="true"
          @close="removeToast(toast.id)"
        />
        
        <div class="text-center text-gray-500 mt-8">
          Click buttons above to show toasts in the top-right corner
        </div>
      </div>
    `,
    }),
}

export const Positions: Story = {
    render: () => ({
        components: { Toast },
        data() {
            return {
                currentPosition: 0,
                positions: [
                    { key: 'top-left', label: 'Top Left', type: 'info' },
                    { key: 'top-center', label: 'Top Center', type: 'success' },
                    { key: 'top-right', label: 'Top Right', type: 'warning' },
                    { key: 'bottom-left', label: 'Bottom Left', type: 'error' },
                    {
                        key: 'bottom-center',
                        label: 'Bottom Center',
                        type: 'info',
                    },
                    {
                        key: 'bottom-right',
                        label: 'Bottom Right',
                        type: 'success',
                    },
                ],
            }
        },
        methods: {
            nextPosition() {
                this.currentPosition = (this.currentPosition + 1) % this.positions.length
            },
            prevPosition() {
                this.currentPosition =
                    this.currentPosition === 0
                        ? this.positions.length - 1
                        : this.currentPosition - 1
            },
        },
        computed: {
            activePosition() {
                return this.positions[this.currentPosition]
            },
        },
        template: `
      <div class="space-y-6">
        <div class="text-center">
          <h3 class="text-lg font-semibold mb-2">Toast Position Demo</h3>
          <p class="text-gray-600 mb-4">Click the buttons to cycle through different toast positions</p>
          
          <div class="flex justify-center gap-4 mb-4">
            <button @click="prevPosition" class="btn btn-outline btn-sm">← Previous</button>
            <span class="px-4 py-2 bg-base-200 rounded text-sm font-medium">
              {{ activePosition.label }} ({{ currentPosition + 1 }}/{{ positions.length }})
            </span>
            <button @click="nextPosition" class="btn btn-outline btn-sm">Next →</button>
          </div>
        </div>
        
        <div class="relative h-80 bg-base-200 rounded-lg overflow-hidden border-2 border-dashed border-base-300">
          <Toast 
            :message="activePosition.label + ' toast notification'"
            :position="activePosition.key"
            :type="activePosition.type"
            :fixed="true"
            :closable="true"
            :persistent="true"
          />
          
          <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div class="text-center opacity-50">
              <div class="text-sm">Preview Area</div>
              <div class="text-xs mt-1">Toast will appear at: {{ activePosition.label }}</div>
            </div>
          </div>
        </div>
        
        <div class="grid grid-cols-3 gap-2 text-center text-xs">
          <div 
            v-for="(pos, index) in positions" 
            :key="pos.key"
            :class="['p-2 rounded', index === currentPosition ? 'bg-primary text-primary-content' : 'bg-base-300']"
          >
            {{ pos.label }}
          </div>
        </div>
      </div>
    `,
    }),
}

export const AllPositions: Story = {
    render: () => ({
        components: { Toast },
        template: `
      <div class="space-y-6">
        <div class="text-center">
          <h3 class="text-lg font-semibold mb-2">All Toast Positions</h3>
          <p class="text-gray-600">Visual overview of all available position options</p>
        </div>
        
        <div class="grid grid-cols-3 gap-6 max-w-4xl mx-auto">
          <!-- Top Row -->
          <div class="relative h-32 bg-base-200 rounded border">
            <div class="absolute top-2 left-2 text-xs opacity-60">top-left</div>
            <Toast 
              message="Top Left"
              position="top-left"
              type="info"
              :fixed="false"
              :closable="true"
              :persistent="true"
              class="m-2"
            />
          </div>
          
          <div class="relative h-32 bg-base-200 rounded border">
            <div class="absolute top-2 left-1/2 transform -translate-x-1/2 text-xs opacity-60">top-center</div>
            <div class="flex justify-center">
              <Toast 
                message="Top Center"
                position="top-center"
                type="success"
                :fixed="false"
                :closable="true"
                :persistent="true"
                class="mt-2"
              />
            </div>
          </div>
          
          <div class="relative h-32 bg-base-200 rounded border">
            <div class="absolute top-2 right-2 text-xs opacity-60">top-right</div>
            <div class="flex justify-end">
              <Toast 
                message="Top Right"
                position="top-right"
                type="warning"
                :fixed="false"
                :closable="true"
                :persistent="true"
                class="m-2"
              />
            </div>
          </div>
          
          <!-- Bottom Row -->
          <div class="relative h-32 bg-base-200 rounded border">
            <div class="absolute bottom-2 left-2 text-xs opacity-60">bottom-left</div>
            <div class="flex items-end h-full">
              <Toast 
                message="Bottom Left"
                position="bottom-left"
                type="error"
                :fixed="false"
                :closable="true"
                :persistent="true"
                class="m-2"
              />
            </div>
          </div>
          
          <div class="relative h-32 bg-base-200 rounded border">
            <div class="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs opacity-60">bottom-center</div>
            <div class="flex justify-center items-end h-full">
              <Toast 
                message="Bottom Center"
                position="bottom-center"
                type="info"
                :fixed="false"
                :closable="true"
                :persistent="true"
                class="mb-2"
              />
            </div>
          </div>
          
          <div class="relative h-32 bg-base-200 rounded border">
            <div class="absolute bottom-2 right-2 text-xs opacity-60">bottom-right</div>
            <div class="flex justify-end items-end h-full">
              <Toast 
                message="Bottom Right"
                position="bottom-right"
                type="success"
                :fixed="false"
                :closable="true"
                :persistent="true"
                class="m-2"
              />
            </div>
          </div>
        </div>
        
        <div class="text-center text-sm opacity-60">
          These examples show the toasts in containers for demonstration. 
          In real usage with <code>fixed={true}</code>, they would be positioned relative to the viewport.
        </div>
      </div>
    `,
    }),
}

export const PositionDemo: Story = {
    render: () => ({
        components: { Toast },
        data() {
            return {
                activeToasts: [],
                nextId: 1,
                positions: [
                    { key: 'top-left', label: 'Top Left', type: 'info' },
                    { key: 'top-center', label: 'Top Center', type: 'success' },
                    { key: 'top-right', label: 'Top Right', type: 'warning' },
                    { key: 'bottom-left', label: 'Bottom Left', type: 'error' },
                    {
                        key: 'bottom-center',
                        label: 'Bottom Center',
                        type: 'info',
                    },
                    {
                        key: 'bottom-right',
                        label: 'Bottom Right',
                        type: 'success',
                    },
                ],
            }
        },
        methods: {
            showToast(position: string, type: string, label: string) {
                const toast = {
                    id: this.nextId++,
                    position,
                    type,
                    message: `${label} toast notification!`,
                    timestamp: new Date(),
                }
                this.activeToasts.push(toast)

                // Auto remove after 3 seconds
                setTimeout(() => {
                    this.removeToast(toast.id)
                }, 3000)
            },
            removeToast(id: number) {
                const index = this.activeToasts.findIndex((toast: any) => toast.id === id)
                if (index > -1) {
                    this.activeToasts.splice(index, 1)
                }
            },
        },
        template: `
      <div>
        <div class="grid grid-cols-3 gap-4 mb-6">
          <button 
            v-for="pos in positions"
            :key="pos.key"
            @click="showToast(pos.key, pos.type, pos.label)"
            :class="['btn', 'btn-sm', {
              'btn-info': pos.type === 'info',
              'btn-success': pos.type === 'success', 
              'btn-warning': pos.type === 'warning',
              'btn-error': pos.type === 'error'
            }]"
          >
            {{ pos.label }}
          </button>
        </div>
        
        <Toast 
          v-for="toast in activeToasts"
          :key="toast.id"
          :message="toast.message"
          :type="toast.type"
          :position="toast.position"
          :fixed="true"
          :closable="true"
          @close="removeToast(toast.id)"
        />
        
        <div class="text-center text-gray-500">
          Click buttons above to show toasts at different positions
        </div>
      </div>
    `,
    }),
}

export const StackingDemo: Story = {
    render: () => ({
        components: { Toast, ToastContainer },
        setup() {
            const toast = useToast()
            return toast
        },
        template: `
      <div>
        <div class="p-8 space-y-4">
          <h3 class="text-lg font-semibold">Toast Stacking System</h3>
          <p class="text-gray-600 mb-4">
            This demo shows the new ToastContainer that automatically manages stacking multiple toasts.
            Maximum 5 toasts are shown, with oldest on top and newest on bottom.
          </p>
          
          <div class="flex gap-2 flex-wrap mb-4">
            <button @click="success('Success message!')" class="btn btn-success btn-sm">
              Add Success
            </button>
            <button @click="error('Error occurred!')" class="btn btn-error btn-sm">
              Add Error
            </button>
            <button @click="warning('Warning message!')" class="btn btn-warning btn-sm">
              Add Warning
            </button>
            <button @click="info('Info message!')" class="btn btn-info btn-sm">
              Add Info
            </button>
          </div>
          
          <div class="text-sm text-gray-500">
            Active toasts: {{ toasts.length }} | 
            Displayed: {{ Math.min(toasts.length, 5) }} |
            Hidden: {{ Math.max(0, toasts.length - 5) }}
          </div>
        </div>
        
        <!-- ToastContainer manages the stacking -->
        <ToastContainer 
          :toasts="toasts" 
          position="top-right"
          :max-toasts="5"
          @remove-toast="removeToast"
        />
      </div>
    `,
    }),
}

export const ProgressToast: Story = {
    render: () => ({
        components: { Toast },
        data() {
            return {
                progress: 0,
                isUploading: false,
            }
        },
        methods: {
            startUpload() {
                this.isUploading = true
                this.progress = 0

                const interval = setInterval(() => {
                    this.progress += Math.random() * 15
                    if (this.progress >= 100) {
                        this.progress = 100
                        this.isUploading = false
                        clearInterval(interval)
                    }
                }, 200)
            },
        },
        template: `
      <div>
        <button 
          @click="startUpload"
          :disabled="isUploading"
          class="btn btn-primary mb-6"
        >
          {{ isUploading ? 'Uploading...' : 'Start Upload' }}
        </button>
        
        <Toast 
          v-if="isUploading"
          type="info"
          :closable="false"
          :persistent="true"
        >
          <template #default>
            <div class="w-full">
              <div class="flex justify-between items-center mb-2">
                <span class="font-semibold">Uploading file...</span>
                <span class="text-sm">{{ Math.round(progress) }}%</span>
              </div>
              <div class="progress progress-info w-full">
                <div 
                  class="progress-bar transition-all duration-300"
                  :style="{ width: progress + '%' }"
                ></div>
              </div>
            </div>
          </template>
        </Toast>
        
        <Toast 
          v-if="!isUploading && progress === 100"
          message="Upload completed successfully!"
          variant="success"
          :dismissible="true"
          :persistent="true"
        />
      </div>
    `,
    }),
}

export const WithProgressBar: Story = {
    render: () => ({
        components: { Toast, ToastContainer },
        setup() {
            const toast = useToast()
            return toast
        },
        template: `
      <div>
        <div class="p-8 space-y-4">
          <h3 class="text-lg font-semibold">Toast with Progress Bar</h3>
          <p class="text-gray-600 mb-4">
            Each toast shows a visual progress bar at the bottom that counts down from 100% to 0%.
            The progress bar starts full and shrinks to empty, showing exactly how much time remains.
          </p>
          
          <div class="alert alert-info mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>💡 <strong>Pro tip:</strong> Hover over any toast to pause the countdown!</span>
          </div>
          
          <div class="flex gap-2 flex-wrap mb-4">
            <button @click="success('Operation completed successfully!', { duration: 3000 })" class="btn btn-success btn-sm">
              Success (3s)
            </button>
            <button @click="error('An error occurred!', { duration: 5000 })" class="btn btn-error btn-sm">
              Error (5s)
            </button>
            <button @click="warning('Warning: Please review!', { duration: 4000 })" class="btn btn-warning btn-sm">
              Warning (4s)
            </button>
            <button @click="info('New information available', { duration: 3000 })" class="btn btn-info btn-sm">
              Info (3s)
            </button>
          </div>

          <div class="divider">Advanced Options</div>

          <div class="flex gap-2 flex-wrap">
            <button 
              @click="success('Watch the progress bar countdown!', { title: 'Long Duration', duration: 10000 })" 
              class="btn btn-primary btn-sm"
            >
              Long Duration (10s)
            </button>
            <button 
              @click="info('This one is super fast!', { title: 'Quick Toast', duration: 2000 })" 
              class="btn btn-secondary btn-sm"
            >
              Quick (2s)
            </button>
            <button 
              @click="addToast('Multiple toasts at once!', { type: 'info', duration: 5000 })" 
              class="btn btn-accent btn-sm"
            >
              Add Multiple
            </button>
            <button @click="clearAll()" class="btn btn-outline btn-sm">
              Clear All
            </button>
          </div>

          <div class="text-sm text-gray-500 mt-4">
            Active toasts: <span class="font-semibold">{{ toasts.length }}</span>
          </div>
        </div>
        
        <!-- ToastContainer manages the stacking -->
        <ToastContainer 
          :toasts="toasts" 
          position="top-right"
          :max-toasts="5"
          @remove-toast="removeToast"
        />
      </div>
    `,
    }),
}

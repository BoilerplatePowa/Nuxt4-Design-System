import type { Meta, StoryObj } from '@storybook/vue3-vite';
import ToastContainer from './ToastContainer.vue';
import { useToast } from './useToast';

const meta: Meta<typeof ToastContainer> = {
  title: 'Feedback/ToastContainer',
  component: ToastContainer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Toast container that manages stacking multiple toasts with automatic ordering and limits.',
      },
    },
  },
  argTypes: {
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
      description: 'Position of the toast stack',
    },
    maxToasts: {
      control: { type: 'number', min: 1, max: 10 },
      description: 'Maximum number of toasts to display simultaneously',
    },
    toasts: {
      control: 'object',
      description: 'Array of toast items to display',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => ({
    components: { ToastContainer },
    setup() {
      const { toasts, addToast, removeToast, clearAll } = useToast();

      const addSampleToast = (type: 'info' | 'success' | 'warning' | 'error') => {
        const messages = {
          info: 'This is an informational message',
          success: 'Operation completed successfully!',
          warning: 'Please check your input',
          error: 'Something went wrong',
        };

        addToast(messages[type], { type });
      };

      return {
        args,
        toasts,
        addSampleToast,
        removeToast,
        clearAll,
      };
    },
    template: `
      <div>
        <div class="p-8 space-y-4">
          <h3 class="text-lg font-semibold">Toast Container Demo</h3>
          <p class="text-gray-600">Add toasts and see them stack. Maximum of 5 toasts displayed, oldest appear at the top.</p>
          
          <div class="flex gap-2 flex-wrap">
            <button @click="addSampleToast('info')" class="btn btn-info btn-sm">
              Add Info Toast
            </button>
            <button @click="addSampleToast('success')" class="btn btn-success btn-sm">
              Add Success Toast
            </button>
            <button @click="addSampleToast('warning')" class="btn btn-warning btn-sm">
              Add Warning Toast
            </button>
            <button @click="addSampleToast('error')" class="btn btn-error btn-sm">
              Add Error Toast
            </button>
            <button @click="clearAll" class="btn btn-ghost btn-sm" v-if="toasts.length > 0">
              Clear All
            </button>
          </div>
          
          <div class="text-sm text-gray-500">
            Active toasts: {{ toasts.length }}
          </div>
        </div>
        
        <ToastContainer 
          :toasts="toasts" 
          :position="args.position || 'top-right'"
          :max-toasts="args.maxToasts || 5"
          @remove-toast="removeToast"
        />
      </div>
    `,
  }),
  args: {
    position: 'top-right',
    maxToasts: 5,
  },
};

export const MaximumLimit: Story = {
  render: () => ({
    components: { ToastContainer },
    data() {
      return {
        toasts: [],
        nextId: 1,
        maxToasts: 3,
      };
    },
    methods: {
      addToast() {
        const types = ['info', 'success', 'warning', 'error'];
        const type = types[Math.floor(Math.random() * types.length)];

        this.toasts.push({
          id: this.nextId++,
          type,
          message: `Toast #${this.nextId - 1} - ${type}`,
          timestamp: Date.now(),
          closable: true,
        });
      },
      removeToast(id: string | number) {
        const index = this.toasts.findIndex((toast: any) => toast.id === id);
        if (index > -1) {
          this.toasts.splice(index, 1);
        }
      },
      addMultiple() {
        for (let i = 0; i < 8; i++) {
          setTimeout(() => this.addToast(), i * 200);
        }
      },
    },
    template: `
      <div>
        <div class="p-8 space-y-4">
          <h3 class="text-lg font-semibold">Maximum Limit Demo (3 toasts)</h3>
          <p class="text-gray-600">
            Only the 3 oldest toasts are shown. Try adding many toasts quickly to see the limit in action.
          </p>
          
          <div class="flex gap-2">
            <button @click="addToast" class="btn btn-primary btn-sm">
              Add Single Toast
            </button>
            <button @click="addMultiple" class="btn btn-secondary btn-sm">
              Add 8 Toasts Rapidly
            </button>
          </div>
          
          <div class="text-sm">
            <div>Total toasts: {{ toasts.length }}</div>
            <div>Displayed: {{ Math.min(toasts.length, maxToasts) }}</div>
            <div>Hidden: {{ Math.max(0, toasts.length - maxToasts) }}</div>
          </div>
        </div>
        
        <ToastContainer 
          :toasts="toasts" 
          :max-toasts="maxToasts"
          position="top-right"
          @remove-toast="removeToast"
        />
      </div>
    `,
  }),
};

export const DifferentPositions: Story = {
  render: () => ({
    components: { ToastContainer },
    data() {
      return {
        position: 'top-right',
        toasts: [],
        nextId: 1,
        positions: [
          { key: 'top-left', label: 'Top Left' },
          { key: 'top-center', label: 'Top Center' },
          { key: 'top-right', label: 'Top Right' },
          { key: 'bottom-left', label: 'Bottom Left' },
          { key: 'bottom-center', label: 'Bottom Center' },
          { key: 'bottom-right', label: 'Bottom Right' },
        ],
      };
    },
    methods: {
      addToast() {
        this.toasts.push({
          id: this.nextId++,
          type: 'info',
          message: `Toast at ${this.position}`,
          timestamp: Date.now(),
          closable: true,
        });
      },
      removeToast(id: string | number) {
        const index = this.toasts.findIndex((toast: any) => toast.id === id);
        if (index > -1) {
          this.toasts.splice(index, 1);
        }
      },
      changePosition(newPosition: string) {
        this.position = newPosition;
      },
    },
    template: `
      <div>
        <div class="p-8 space-y-4">
          <h3 class="text-lg font-semibold">Position Demo</h3>
          <p class="text-gray-600">
            Select a position and add toasts to see how they stack in different locations.
          </p>
          
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium mb-2">Position:</label>
              <div class="grid grid-cols-3 gap-2 max-w-md">
                <button 
                  v-for="pos in positions"
                  :key="pos.key"
                  @click="changePosition(pos.key)"
                  :class="[
                    'btn btn-sm',
                    position === pos.key ? 'btn-primary' : 'btn-outline'
                  ]"
                >
                  {{ pos.label }}
                </button>
              </div>
            </div>
            
            <button @click="addToast" class="btn btn-primary">
              Add Toast to {{ positions.find(p => p.key === position)?.label }}
            </button>
          </div>
        </div>
        
        <ToastContainer 
          :toasts="toasts" 
          :position="position"
          @remove-toast="removeToast"
        />
      </div>
    `,
  }),
};

export const AutoDismiss: Story = {
  render: () => ({
    components: { ToastContainer },
    data() {
      return {
        toasts: [],
        nextId: 1,
      };
    },
    methods: {
      addPersistentToast() {
        this.toasts.push({
          id: this.nextId++,
          type: 'info',
          message: 'This toast stays until you close it',
          timestamp: Date.now(),
          closable: true,
          duration: 0, // Won't auto-dismiss
        });
      },
      addTimedToast(duration: number) {
        this.toasts.push({
          id: this.nextId++,
          type: 'success',
          message: `Auto-dismiss in ${duration / 1000}s`,
          timestamp: Date.now(),
          closable: true,
          duration,
        });
      },
      removeToast(id: string | number) {
        const index = this.toasts.findIndex((toast: any) => toast.id === id);
        if (index > -1) {
          this.toasts.splice(index, 1);
        }
      },
    },
    template: `
      <div>
        <div class="p-8 space-y-4">
          <h3 class="text-lg font-semibold">Auto-Dismiss Demo</h3>
          <p class="text-gray-600">
            Some toasts auto-dismiss after a timeout, others stay until manually closed.
          </p>
          
          <div class="flex gap-2 flex-wrap">
            <button @click="addPersistentToast" class="btn btn-info btn-sm">
              Add Persistent Toast
            </button>
            <button @click="addTimedToast(2000)" class="btn btn-success btn-sm">
              Add 2s Toast
            </button>
            <button @click="addTimedToast(5000)" class="btn btn-warning btn-sm">
              Add 5s Toast
            </button>
            <button @click="addTimedToast(10000)" class="btn btn-error btn-sm">
              Add 10s Toast
            </button>
          </div>
        </div>
        
        <ToastContainer 
          :toasts="toasts" 
          position="top-right"
          @remove-toast="removeToast"
        />
      </div>
    `,
  }),
};

export const StackingOrder: Story = {
  render: () => ({
    components: { ToastContainer },
    data() {
      return {
        toasts: [],
        nextId: 1,
      };
    },
    methods: {
      addToast() {
        this.toasts.push({
          id: this.nextId++,
          type: 'info',
          message: `Toast #${this.nextId - 1} - ${new Date().toLocaleTimeString()}`,
          timestamp: Date.now(),
          closable: true,
          duration: 0, // Persistent for demo
        });
      },
      removeToast(id: string | number) {
        const index = this.toasts.findIndex((toast: any) => toast.id === id);
        if (index > -1) {
          this.toasts.splice(index, 1);
        }
      },
      clearAll() {
        this.toasts = [];
      },
    },
    template: `
      <div>
        <div class="p-8 space-y-4">
          <h3 class="text-lg font-semibold">Stacking Order Demo</h3>
          <p class="text-gray-600">
            Oldest toasts appear at the top, newest at the bottom. Add several toasts to see the stacking behavior.
          </p>
          
          <div class="flex gap-2">
            <button @click="addToast" class="btn btn-primary">
              Add Timestamped Toast
            </button>
            <button @click="clearAll" v-if="toasts.length > 0" class="btn btn-ghost">
              Clear All
            </button>
          </div>
          
          <div class="text-sm text-gray-600">
            Total toasts: {{ toasts.length }}
          </div>
        </div>
        
        <ToastContainer 
          :toasts="toasts" 
          position="top-right"
          @remove-toast="removeToast"
        />
      </div>
    `,
  }),
};

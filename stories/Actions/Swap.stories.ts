import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import Swap from './Swap.vue';

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
    modelValue: {
      control: 'boolean',
      description: 'Current swap state (handled by v-model using defineModel macro)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'v-model',
      },
    },
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
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic v-model usage with defineModel
export const BasicUsage: Story = {
  args: {
    modelValue: false,
  },
  render: (args) => ({
    components: { Swap },
    setup() {
      const isOn = ref(args.modelValue);
      return { isOn, args };
    },
    template: `
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Basic v-model Usage</h3>
        <p class="text-sm text-gray-600 mb-4">
          This demonstrates the basic v-model binding using Vue 3.4+ defineModel() macro.
          The component automatically handles two-way binding without manual prop/emit setup.
        </p>
        
        <Swap v-model="isOn" v-bind="args" />
        <p class="text-sm text-gray-600">Current state: {{ isOn ? 'On' : 'Off' }}</p>
      </div>
    `,
  }),
};

// Showcase defineModel with default value
export const WithDefaultValue: Story = {
  render: () => ({
    components: { Swap },
    setup() {
      // The component uses defineModel({ default: false }) internally
      const isOn = ref();
      return { isOn };
    },
    template: `
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">defineModel with Default Value</h3>
        <p class="text-sm text-gray-600 mb-4">
          The component uses <code>defineModel&lt;boolean&gt;({ default: false })</code> internally.
          When no v-model is provided, it defaults to false.
        </p>
        
        <Swap v-model="isOn" />
        <p class="text-sm text-gray-600">Current state: {{ isOn ? 'On' : 'Off' }}</p>
        <p class="text-sm text-gray-600">Initial value was: undefined, but component defaulted to false</p>
      </div>
    `,
  }),
};

// Demonstrate v-model with custom content
export const CustomContent: Story = {
  args: {
    modelValue: false,
    swapOnContent: '✅',
    swapOffContent: '❌',
  },
  render: (args) => ({
    components: { Swap },
    setup() {
      const isOn = ref(args.modelValue);
      return { isOn, args };
    },
    template: `
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">v-model with Custom Content</h3>
        <p class="text-sm text-gray-600 mb-4">
          Using v-model with custom content props. The defineModel() ref can be used
          alongside other props seamlessly.
        </p>
        
        <Swap v-model="isOn" v-bind="args" />
        <p class="text-sm text-gray-600">Status: {{ isOn ? 'Active' : 'Inactive' }}</p>
      </div>
    `,
  }),
};

// Showcase all variants with v-model
export const Variants: Story = {
  render: () => ({
    components: { Swap },
    setup() {
      const states = ref([false, false, false]);
      return { states };
    },
    template: `
      <div class="space-y-6">
        <h3 class="text-lg font-semibold">v-model with Different Variants</h3>
        <p class="text-sm text-gray-600 mb-4">
          Each swap uses v-model independently. The defineModel() macro ensures
          each instance maintains its own state without conflicts.
        </p>
        
        <div class="grid grid-cols-3 gap-6">
          <div class="text-center">
            <h4 class="font-semibold mb-2">Rotate (Default)</h4>
            <Swap v-model="states[0]" variant="rotate">
              <template #on>
                <div class="text-4xl">🌞</div>
              </template>
              <template #off>
                <div class="text-4xl">🌙</div>
              </template>
            </Swap>
            <p class="text-sm text-gray-600 mt-2">{{ states[0] ? 'Light' : 'Dark' }}</p>
          </div>
          
          <div class="text-center">
            <h4 class="font-semibold mb-2">Flip</h4>
            <Swap v-model="states[1]" variant="flip">
              <template #on>
                <div class="text-4xl">😊</div>
              </template>
              <template #off>
                <div class="text-4xl">😴</div>
              </template>
            </Swap>
            <p class="text-sm text-gray-600 mt-2">{{ states[1] ? 'Awake' : 'Sleeping' }}</p>
          </div>
          
          <div class="text-center">
            <h4 class="font-semibold mb-2">Indeterminate</h4>
            <Swap v-model="states[2]" variant="indeterminate">
              <template #on>
                <div class="text-4xl">🌞</div>
              </template>
              <template #off>
                <div class="text-4xl">🌙</div>
              </template>
              <template #indeterminate>
                <div class="text-4xl">🌤️</div>
              </template>
            </Swap>
            <p class="text-sm text-gray-600 mt-2">{{ states[2] ? 'Light' : 'Dark' }}</p>
          </div>
        </div>
      </div>
    `,
  }),
};

// Demonstrate v-model with event handling
export const WithEventHandling: Story = {
  render: () => ({
    components: { Swap },
    setup() {
      const isOn = ref(false);
      const toggleCount = ref(0);
      const lastToggleTime = ref('');

      const handleToggle = () => {
        toggleCount.value++;
        lastToggleTime.value = new Date().toLocaleTimeString();
      };

      return { isOn, toggleCount, lastToggleTime, handleToggle };
    },
    template: `
      <div class="space-y-6">
        <h3 class="text-lg font-semibold">v-model with Event Handling</h3>
        <p class="text-sm text-gray-600 mb-4">
          The component emits <code>update:modelValue</code> events when the value changes.
          You can listen to these events for side effects while still using v-model.
        </p>
        
        <Swap v-model="isOn" @update:model-value="handleToggle">
          <template #on>
            <div class="text-4xl">✅</div>
          </template>
          <template #off>
            <div class="text-4xl">❌</div>
          </template>
        </Swap>
        
        <div class="space-y-2">
          <p class="text-sm text-gray-600">Current state: {{ isOn ? 'Active' : 'Inactive' }}</p>
          <p class="text-sm text-gray-600">Toggle count: {{ toggleCount }}</p>
          <p class="text-sm text-gray-600">Last toggle: {{ lastToggleTime || 'None' }}</p>
        </div>
        
        <div class="p-4 bg-blue-50 border border-blue-200 rounded">
          <h4 class="font-semibold text-blue-900 mb-2">How defineModel() works:</h4>
          <ul class="text-sm text-blue-800 space-y-1">
            <li>• Automatically creates <code>modelValue</code> prop and <code>update:modelValue</code> emit</li>
            <li>• Provides a reactive ref that syncs with parent v-model</li>
            <li>• Handles two-way binding without manual prop/emit setup</li>
            <li>• Supports TypeScript generics for type safety</li>
          </ul>
        </div>
      </div>
    `,
  }),
};

// Demonstrate form integration with v-model
export const FormIntegration: Story = {
  render: () => ({
    components: { Swap },
    setup() {
      const formData = ref({
        notifications: false,
        marketing: false,
        darkMode: false,
        autoSave: true,
      });

      const handleSubmit = () => {
        alert('Form submitted with: ' + JSON.stringify(formData.value, null, 2));
      };

      return { formData, handleSubmit };
    },
    template: `
      <div class="max-w-md mx-auto">
        <h3 class="text-lg font-semibold mb-4">v-model in Forms</h3>
        <p class="text-sm text-gray-600 mb-4">
          v-model works seamlessly in forms. Each swap maintains its own state
          while being part of a larger form data object.
        </p>
        
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <label for="notifications-swap" class="text-sm font-medium">
                Email Notifications
              </label>
              <Swap 
                v-model="formData.notifications"
                id="notifications-swap"
                name="notifications"
              >
                <template #on>
                  <div class="text-2xl">🔔</div>
                </template>
                <template #off>
                  <div class="text-2xl">🔕</div>
                </template>
              </Swap>
            </div>
            
            <div class="flex items-center justify-between">
              <label for="marketing-swap" class="text-sm font-medium">
                Marketing Emails
              </label>
              <Swap 
                v-model="formData.marketing"
                id="marketing-swap"
                name="marketing"
              >
                <template #on>
                  <div class="text-2xl">📧</div>
                </template>
                <template #off>
                  <div class="text-2xl">📭</div>
                </template>
              </Swap>
            </div>
            
            <div class="flex items-center justify-between">
              <label for="darkmode-swap" class="text-sm font-medium">
                Dark Mode
              </label>
              <Swap 
                v-model="formData.darkMode"
                id="darkmode-swap"
                name="darkMode"
              >
                <template #on>
                  <div class="text-2xl">🌙</div>
                </template>
                <template #off>
                  <div class="text-2xl">🌞</div>
                </template>
              </Swap>
            </div>
            
            <div class="flex items-center justify-between">
              <label for="autosave-swap" class="text-sm font-medium">
                Auto Save
              </label>
              <Swap 
                v-model="formData.autoSave"
                id="autosave-swap"
                name="autoSave"
              >
                <template #on>
                  <div class="text-2xl">💾</div>
                </template>
                <template #off>
                  <div class="text-2xl">📄</div>
                </template>
              </Swap>
            </div>
          </div>
          
          <button type="submit" class="btn btn-primary w-full">
            Save Settings
          </button>
        </form>
        
        <div class="mt-4 p-3 bg-gray-100 rounded text-sm">
          <strong>Form data (reactive v-model bindings):</strong>
          <pre class="mt-2">{{ JSON.stringify(formData, null, 2) }}</pre>
        </div>
      </div>
    `,
  }),
};

// Demonstrate parent control of v-model
export const ParentControl: Story = {
  render: () => ({
    components: { Swap },
    setup() {
      const isOn = ref(false);
      const externalControl = ref(false);

      const toggleFromParent = () => {
        isOn.value = !isOn.value;
      };

      const syncWithExternal = () => {
        isOn.value = externalControl.value;
      };

      return { isOn, externalControl, toggleFromParent, syncWithExternal };
    },
    template: `
      <div class="space-y-6">
        <h3 class="text-lg font-semibold">Parent Control of v-model</h3>
        <p class="text-sm text-gray-600 mb-4">
          The parent component can control the v-model value programmatically.
          The defineModel() ref automatically syncs with parent changes.
        </p>
        
        <div class="text-center">
          <Swap v-model="isOn">
            <template #on>
              <div class="text-4xl">🌞</div>
            </template>
            <template #off>
              <div class="text-4xl">🌙</div>
            </template>
          </Swap>
          
          <p class="text-sm text-gray-600 mt-2">Current state: {{ isOn ? 'On' : 'Off' }}</p>
        </div>
        
        <div class="space-y-3">
          <button @click="toggleFromParent" class="btn btn-sm btn-outline">
            Toggle from parent
          </button>
          
          <div class="flex items-center gap-3">
            <label class="text-sm">External control:</label>
            <input 
              v-model="externalControl" 
              type="checkbox" 
              class="checkbox"
            />
            <button @click="syncWithExternal" class="btn btn-sm btn-outline">
              Sync with external
            </button>
          </div>
        </div>
        
        <div class="p-4 bg-green-50 border border-green-200 rounded">
          <h4 class="font-semibold text-green-900 mb-2">defineModel() Benefits:</h4>
          <ul class="text-sm text-green-800 space-y-1">
            <li>• Parent can control child state directly</li>
            <li>• Child can update parent state automatically</li>
            <li>• No manual prop/emit boilerplate needed</li>
            <li>• Type-safe with TypeScript generics</li>
          </ul>
        </div>
      </div>
    `,
  }),
};

// Demonstrate disabled state with v-model
export const DisabledState: Story = {
  render: () => ({
    components: { Swap },
    setup() {
      const isOn = ref(false);
      return { isOn };
    },
    template: `
      <div class="space-y-6">
        <h3 class="text-lg font-semibold">v-model with Disabled State</h3>
        <p class="text-sm text-gray-600 mb-4">
          When disabled, the component prevents v-model updates but maintains
          the current state. The defineModel() ref remains reactive.
        </p>
        
        <div class="grid grid-cols-2 gap-6">
          <div class="text-center">
            <h4 class="font-semibold mb-2">Disabled (Off State)</h4>
            <Swap v-model="isOn" :disabled="true">
              <template #on>
                <div class="text-4xl">🌞</div>
              </template>
              <template #off>
                <div class="text-4xl">🌙</div>
              </template>
            </Swap>
            <p class="text-sm text-gray-600 mt-2">Cannot interact</p>
          </div>
          
          <div class="text-center">
            <h4 class="font-semibold mb-2">Enabled for Comparison</h4>
            <Swap v-model="isOn" :disabled="false">
              <template #on>
                <div class="text-4xl">🌞</div>
              </template>
              <template #off>
                <div class="text-4xl">🌙</div>
              </template>
            </Swap>
            <p class="text-sm text-gray-600 mt-2">Can interact - Current: {{ isOn ? 'On' : 'Off' }}</p>
          </div>
        </div>
        
        <div class="p-4 bg-yellow-50 border border-yellow-200 rounded">
          <h4 class="font-semibold text-yellow-900 mb-2">v-model Behavior:</h4>
          <ul class="text-sm text-yellow-800 space-y-1">
            <li>• Disabled swaps don't emit <code>update:modelValue</code> events</li>
            <li>• The defineModel() ref remains unchanged when disabled</li>
            <li>• Parent v-model binding is preserved even when disabled</li>
            <li>• Visual feedback shows disabled state clearly</li>
          </ul>
        </div>
      </div>
    `,
  }),
};

// Demonstrate accessibility with v-model
export const Accessibility: Story = {
  render: () => ({
    components: { Swap },
    setup() {
      const themeValue = ref(false);
      const notificationsValue = ref(false);
      const soundValue = ref(false);

      return { themeValue, notificationsValue, soundValue };
    },
    template: `
      <div class="space-y-8">
        <h3 class="text-lg font-semibold">v-model with Accessibility</h3>
        <p class="text-sm text-gray-600 mb-4">
          v-model works seamlessly with accessibility features. The defineModel() ref
          ensures proper form integration and screen reader support.
        </p>
        
        <div class="max-w-md">
          <div class="space-y-4">
            <div class="flex items-center justify-between p-3 border rounded">
              <label for="theme-swap" class="text-sm font-medium">
                Theme Mode
              </label>
              <Swap 
                v-model="themeValue"
                id="theme-swap"
                name="theme-toggle"
                aria-label="Toggle between light and dark theme"
              >
                <template #on>
                  <div class="text-3xl" aria-hidden="true">🌞</div>
                </template>
                <template #off>
                  <div class="text-3xl" aria-hidden="true">🌙</div>
                </template>
              </Swap>
              <span class="text-sm text-gray-600 ml-2">
                {{ themeValue ? 'Light' : 'Dark' }}
              </span>
            </div>
            
            <div class="flex items-center justify-between p-3 border rounded">
              <label for="notifications-swap" class="text-sm font-medium">
                Notifications
              </label>
              <Swap 
                v-model="notificationsValue"
                id="notifications-swap"
                name="notifications-toggle"
                aria-label="Toggle notifications on or off"
              >
                <template #on>
                  <div class="text-3xl" aria-hidden="true">🔔</div>
                </template>
                <template #off>
                  <div class="text-3xl" aria-hidden="true">🔕</div>
                </template>
              </Swap>
              <span class="text-sm text-gray-600 ml-2">
                {{ notificationsValue ? 'On' : 'Off' }}
              </span>
            </div>
            
            <div class="flex items-center justify-between p-3 border rounded">
              <label for="sound-swap" class="text-sm font-medium">
                Sound Effects
              </label>
              <Swap 
                v-model="soundValue"
                id="sound-swap"
                name="sound-toggle"
                aria-label="Toggle sound effects on or off"
              >
                <template #on>
                  <div class="text-3xl" aria-hidden="true">🔊</div>
                </template>
                <template #off>
                  <div class="text-3xl" aria-hidden="true">🔇</div>
                </template>
              </Swap>
              <span class="text-sm text-gray-600 ml-2">
                {{ soundValue ? 'On' : 'Off' }}
              </span>
            </div>
          </div>
          
          <div class="mt-6 p-4 bg-blue-50 border border-blue-200 rounded">
            <h4 class="font-semibold text-blue-900 mb-2">v-model + Accessibility Features:</h4>
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
      </div>
    `,
  }),
};

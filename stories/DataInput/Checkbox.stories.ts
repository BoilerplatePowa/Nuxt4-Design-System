import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Checkbox from '../../src/runtime/components/DataInput/Checkbox.vue'

const meta: Meta<typeof Checkbox> = {
  title: 'Data Input/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Checkbox input component with multiple variants, sizes, and states.',
      },
    },
  },
  argTypes: {
    modelValue: {
      control: 'boolean',
      description: 'Checked state of the checkbox',
    },
    label: {
      control: 'text',
      description: 'Label text for the checkbox',
    },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'accent', 'success', 'warning', 'info', 'error'],
      description: 'Color variant of the checkbox',
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Size of the checkbox',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the checkbox',
    },
    indeterminate: {
      control: 'boolean',
      description: 'Show indeterminate state',
    },
    errorMessage: {
      control: 'text',
      description: 'Error message to display',
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'I agree to the terms and conditions',
    modelValue: false,
  },
}

export const Checked: Story = {
  args: {
    label: 'This checkbox is checked',
    modelValue: true,
  },
}

export const Variants: Story = {
  render: () => ({
    components: { Checkbox },
    data() {
      return {
        values: {
          primary: true,
          secondary: true,
          accent: true,
          success: true,
          warning: true,
          info: true,
          error: true,
        },
      }
    },
    template: `
      <div class="space-y-4">
        <Checkbox v-model="values.primary" variant="primary" label="Primary checkbox" />
        <Checkbox v-model="values.secondary" variant="secondary" label="Secondary checkbox" />
        <Checkbox v-model="values.accent" variant="accent" label="Accent checkbox" />
        <Checkbox v-model="values.success" variant="success" label="Success checkbox" />
        <Checkbox v-model="values.warning" variant="warning" label="Warning checkbox" />
        <Checkbox v-model="values.info" variant="info" label="Info checkbox" />
        <Checkbox v-model="values.error" variant="error" label="Error checkbox" />
      </div>
    `,
  }),
}

export const Sizes: Story = {
  render: () => ({
    components: { Checkbox },
    data() {
      return {
        values: {
          xs: true,
          sm: true,
          md: true,
          lg: true,
        },
      }
    },
    template: `
      <div class="space-y-4">
        <Checkbox v-model="values.xs" size="xs" label="Extra small checkbox" />
        <Checkbox v-model="values.sm" size="sm" label="Small checkbox" />
        <Checkbox v-model="values.md" size="md" label="Medium checkbox (default)" />
        <Checkbox v-model="values.lg" size="lg" label="Large checkbox" />
      </div>
    `,
  }),
}

export const States: Story = {
  render: () => ({
    components: { Checkbox },
    data() {
      return {
        checked: true,
        unchecked: false,
        indeterminate: false,
      }
    },
    template: `
      <div class="space-y-4">
        <Checkbox v-model="checked" label="Checked state" />
        <Checkbox v-model="unchecked" label="Unchecked state" />
        <Checkbox v-model="indeterminate" :indeterminate="true" label="Indeterminate state" />
        <Checkbox v-model="unchecked" disabled label="Disabled unchecked" />
        <Checkbox v-model="checked" disabled label="Disabled checked" />
      </div>
    `,
  }),
}

export const WithError: Story = {
  args: {
    label: 'You must agree to continue',
    modelValue: false,
    errorMessage: 'This field is required',
    variant: 'error',
  },
}

export const FormExample: Story = {
  render: () => ({
    components: { Checkbox },
    data() {
      return {
        preferences: {
          newsletter: false,
          notifications: true,
          marketing: false,
          privacy: false,
        },
      }
    },
    template: `
      <div class="max-w-md p-6 bg-base-100 rounded-lg shadow">
        <h3 class="text-lg font-semibold mb-4">Preferences</h3>
        
        <div class="space-y-4">
          <Checkbox 
            v-model="preferences.newsletter" 
            label="Subscribe to newsletter"
            variant="primary"
          />
          
          <Checkbox 
            v-model="preferences.notifications" 
            label="Enable push notifications"
            variant="info"
          />
          
          <Checkbox 
            v-model="preferences.marketing" 
            label="Receive marketing emails"
            variant="secondary"
          />
          
          <Checkbox 
            v-model="preferences.privacy" 
            label="I agree to the privacy policy"
            variant="success"
            :errorMessage="!preferences.privacy ? 'You must agree to the privacy policy' : ''"
          />
        </div>
        
        <div class="mt-6">
          <button 
            class="btn btn-primary"
            :disabled="!preferences.privacy"
          >
            Save Preferences
          </button>
        </div>
        
        <div class="mt-4 p-3 bg-base-200 rounded text-sm">
          <strong>Current values:</strong>
          <pre>{{ JSON.stringify(preferences, null, 2) }}</pre>
        </div>
      </div>
    `,
  }),
}

export const CheckboxList: Story = {
  render: () => ({
    components: { Checkbox },
    data() {
      return {
        selectedItems: ['item2'],
        items: [
          {
            id: 'item1',
            label: 'Option 1',
            description: 'First option with description',
          },
          {
            id: 'item2',
            label: 'Option 2',
            description: 'Second option (pre-selected)',
          },
          {
            id: 'item3',
            label: 'Option 3',
            description: 'Third option available',
          },
          {
            id: 'item4',
            label: 'Option 4',
            description: 'Fourth option disabled',
            disabled: true,
          },
        ],
      }
    },
    methods: {
      toggleItem(itemId: string) {
        const index = this.selectedItems.indexOf(itemId)
        if (index > -1) {
          this.selectedItems.splice(index, 1)
        } else {
          this.selectedItems.push(itemId)
        }
      },
    },
    template: `
      <div class="max-w-md">
        <h3 class="text-lg font-semibold mb-4">Select Items</h3>
        
        <div class="space-y-3">
          <div 
            v-for="item in items" 
            :key="item.id"
            class="p-3 border border-base-300 rounded-lg hover:bg-base-50"
            :class="{ 'opacity-50': item.disabled }"
          >
            <Checkbox 
              :modelValue="selectedItems.includes(item.id)"
              @update:modelValue="toggleItem(item.id)"
              :label="item.label"
              :disabled="item.disabled"
              variant="primary"
            />
            <p class="text-sm text-gray-600 mt-1 ml-6">{{ item.description }}</p>
          </div>
        </div>
        
        <div class="mt-4 p-3 bg-base-200 rounded text-sm">
          <strong>Selected:</strong> {{ selectedItems.length }} item(s)
          <div class="mt-1">{{ selectedItems.join(', ') }}</div>
        </div>
      </div>
    `,
  }),
}

export const SelectAll: Story = {
  render: () => ({
    components: { Checkbox },
    data() {
      return {
        allSelected: false,
        selectedItems: ['item2'],
        items: [
          { id: 'item1', label: 'Task 1' },
          { id: 'item2', label: 'Task 2' },
          { id: 'item3', label: 'Task 3' },
          { id: 'item4', label: 'Task 4' },
        ],
      }
    },
    computed: {
      selectAllState() {
        if (this.selectedItems.length === 0) return false
        if (this.selectedItems.length === this.items.length) return true
        return 'indeterminate'
      },
    },
    methods: {
      toggleSelectAll() {
        if (this.selectedItems.length === this.items.length) {
          this.selectedItems = []
        } else {
          this.selectedItems = this.items.map((item: any) => item.id)
        }
      },
      toggleItem(itemId: string) {
        const index = this.selectedItems.indexOf(itemId)
        if (index > -1) {
          this.selectedItems.splice(index, 1)
        } else {
          this.selectedItems.push(itemId)
        }
      },
    },
    template: `
      <div class="max-w-md">
        <div class="border-b border-base-300 pb-3 mb-3">
          <Checkbox 
            :modelValue="selectAllState === true"
            :indeterminate="selectAllState === 'indeterminate'"
            @update:modelValue="toggleSelectAll"
            label="Select All"
            variant="primary"
            class="font-semibold"
          />
        </div>
        
        <div class="space-y-2 ml-4">
          <Checkbox 
            v-for="item in items" 
            :key="item.id"
            :modelValue="selectedItems.includes(item.id)"
            @update:modelValue="toggleItem(item.id)"
            :label="item.label"
            variant="primary"
          />
        </div>
        
        <div class="mt-4 p-3 bg-base-200 rounded text-sm">
          {{ selectedItems.length }} of {{ items.length }} selected
        </div>
      </div>
    `,
  }),
}

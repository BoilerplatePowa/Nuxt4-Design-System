import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Dropdown from '../../src/runtime/components/Actions/Dropdown.vue';

const meta: Meta<typeof Dropdown> = {
  title: 'Actions/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Interactive dropdown menu component with customizable trigger and positioning.',
      },
    },
  },
  argTypes: {
    items: {
      control: 'object',
      description: 'Array of dropdown items with label, value, href, disabled, divider, and active properties',
    },
    triggerText: {
      control: 'text',
      description: 'Text for the default trigger button',
    },
    position: {
      control: { type: 'select' },
      options: ['bottom', 'top', 'left', 'right'],
      description: 'Position of the dropdown relative to trigger',
    },
    align: {
      control: { type: 'select' },
      options: ['start', 'end'],
      description: 'Alignment of the dropdown',
    },
    hover: {
      control: 'boolean',
      description: 'Open dropdown on hover instead of click',
    },
    forceOpen: {
      control: 'boolean',
      description: 'Force dropdown to stay open',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the dropdown',
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Dropdown size',
    },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'accent', 'ghost', 'outline'],
      description: 'Dropdown variant',
    },
    closeOnSelect: {
      control: 'boolean',
      description: 'Close dropdown when item is selected',
    },
    autoFocus: {
      control: 'boolean',
      description: 'Auto-focus first item when dropdown opens',
    },
    onItemClick: {
      action: 'item-click',
      description: 'Item click event',
    },
    onOpen: {
      action: 'open',
      description: 'Dropdown open event',
    },
    onClose: {
      action: 'close',
      description: 'Dropdown close event',
    },
    onUpdateOpen: {
      action: 'update:open',
      description: 'Open state update event',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    triggerText: 'Click me',
    variant: 'primary',
  },
  render: args => ({
    components: { Dropdown },
    setup() {
      return { args };
    },
    template: `
      <Dropdown v-bind="args">
        <li><a>Item 1</a></li>
        <li><a>Item 2</a></li>
        <li><a>Item 3</a></li>
      </Dropdown>
    `,
  }),
};

export const WithItems: Story = {
  args: {
    triggerText: 'Select Action',
    items: [
      { label: 'Edit', value: 'edit' },
      { label: 'Delete', value: 'delete' },
      { label: 'Archive', value: 'archive', disabled: true },
      { label: 'Share', value: 'share' },
    ],
  },
  render: args => ({
    components: { Dropdown },
    setup() {
      const handleItemClick = (item: { label: string; value: string }, _event: Event) => {
        console.log('Item clicked:', item);
        alert(`Clicked: ${item.label}`);
      };
      return { args, handleItemClick };
    },
    template: `
      <Dropdown v-bind="args" @item-click="handleItemClick" />
    `,
  }),
};

export const AllVariants: Story = {
  render: () => ({
    components: { Dropdown },
    template: `
      <div class="flex gap-4 flex-wrap">
        <Dropdown variant="primary" trigger-text="Primary">
          <li><a>Item 1</a></li>
          <li><a>Item 2</a></li>
        </Dropdown>
        
        <Dropdown variant="secondary" trigger-text="Secondary">
          <li><a>Item 1</a></li>
          <li><a>Item 2</a></li>
        </Dropdown>
        
        <Dropdown variant="accent" trigger-text="Accent">
          <li><a>Item 1</a></li>
          <li><a>Item 2</a></li>
        </Dropdown>
        
        <Dropdown variant="ghost" trigger-text="Ghost">
          <li><a>Item 1</a></li>
          <li><a>Item 2</a></li>
        </Dropdown>
        
        <Dropdown variant="outline" trigger-text="Outline">
          <li><a>Item 1</a></li>
          <li><a>Item 2</a></li>
        </Dropdown>
      </div>
    `,
  }),
};

export const AllSizes: Story = {
  render: () => ({
    components: { Dropdown },
    template: `
      <div class="flex gap-4 flex-wrap items-center">
        <Dropdown size="xs" trigger-text="XS">
          <li><a>Item 1</a></li>
          <li><a>Item 2</a></li>
        </Dropdown>
        
        <Dropdown size="sm" trigger-text="SM">
          <li><a>Item 1</a></li>
          <li><a>Item 2</a></li>
        </Dropdown>
        
        <Dropdown size="md" trigger-text="MD">
          <li><a>Item 1</a></li>
          <li><a>Item 2</a></li>
        </Dropdown>
        
        <Dropdown size="lg" trigger-text="LG">
          <li><a>Item 1</a></li>
          <li><a>Item 2</a></li>
        </Dropdown>
      </div>
    `,
  }),
};

export const AllPositions: Story = {
  render: () => ({
    components: { Dropdown },
    template: `
      <div class="flex gap-4 flex-wrap">
        <Dropdown position="bottom">
          <template #trigger>
            <button>Bottom</button>
          </template>
          <li><a>Item 1</a></li>
          <li><a>Item 2</a></li>
        </Dropdown>
        
        <Dropdown position="top">
          <template #trigger>
            <button>Top</button>
          </template>
          <li><a>Item 1</a></li>
          <li><a>Item 2</a></li>
        </Dropdown>
        
        <Dropdown position="left">
          <template #trigger>
            <button>Left</button>
          </template>
          <li><a>Item 1</a></li>
          <li><a>Item 2</a></li>
        </Dropdown>
        
        <Dropdown position="right">
          <template #trigger>
            <button>Right</button>
          </template>
          <li><a>Item 1</a></li>
          <li><a>Item 2</a></li>
        </Dropdown>
      </div>
    `,
  }),
};

export const CustomExamples: Story = {
  render: () => ({
    components: { Dropdown },
    template: `
      <div class="space-y-4">
        <!-- With Icons -->
        <Dropdown>
          <template #trigger>
            <button>Menu ▼</button>
          </template>
          <li><a>📧 Messages</a></li>
          <li><a>⚙️ Settings</a></li>
          <li><a>👤 Profile</a></li>
          <li><hr class="my-1"></li>
          <li><a class="text-error">🚪 Logout</a></li>
        </Dropdown>
        
        <!-- Custom Trigger -->
        <Dropdown>
          <template #trigger>
            <button>
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
          </template>
          <li><a>📧 Messages</a></li>
          <li><a>⚙️ Settings</a></li>
          <li><a>👤 Profile</a></li>
        </Dropdown>
        
        <!-- Hover Mode -->
        <Dropdown hover>
          <template #trigger>
            <button>Hover me</button>
          </template>
          <li><a>Hover Item 1</a></li>
          <li><a>Hover Item 2</a></li>
        </Dropdown>
        
        <!-- Disabled -->
        <Dropdown disabled trigger-text="Disabled Dropdown">
          <li><a>Item 1</a></li>
          <li><a>Item 2</a></li>
        </Dropdown>
      </div>
    `,
  }),
};

export const Playground: Story = {
  args: {
    triggerText: 'Customize Me',
    position: 'bottom',
    align: 'start',
    hover: false,
    forceOpen: false,
    disabled: false,
    size: 'md',
    variant: 'ghost',
    closeOnSelect: true,
    autoFocus: true,
    items: [
      { label: 'Edit', value: 'edit' },
      { label: 'Delete', value: 'delete' },
      { label: 'Archive', value: 'archive', disabled: true },
      { label: 'Share', value: 'share' },
    ],
  },
  render: args => ({
    components: { Dropdown },
    setup() {
      return { args };
    },
    template: `
      <div class="space-y-4">
        <Dropdown v-bind="args" />
        
        <div class="text-sm text-gray-600">
          Use the controls above to customize this dropdown
        </div>
      </div>
    `,
  }),
};

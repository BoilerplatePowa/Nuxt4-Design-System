import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Dropdown from './Dropdown.vue';

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

export const WithIcons: Story = {
  args: {},
  render: args => ({
    components: { Dropdown },
    setup() {
      return { args };
    },
    template: `
      <Dropdown v-bind="args">
        <template #trigger>
          <button>Menu ▼</button>
        </template>
        <li><a>📧 Messages</a></li>
        <li><a>⚙️ Settings</a></li>
        <li><a>👤 Profile</a></li>
        <li><hr class="my-1"></li>
        <li><a class="text-error">🚪 Logout</a></li>
      </Dropdown>
    `,
  }),
};

export const Positions: Story = {
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

export const HoverMode: Story = {
  args: {
    hover: true,
  },
  render: args => ({
    components: { Dropdown },
    setup() {
      return { args };
    },
    template: `
      <Dropdown v-bind="args">
        <template #trigger>
          <button>Hover me</button>
        </template>
        <li><a>Hover Item 1</a></li>
        <li><a>Hover Item 2</a></li>
        <li><a>Hover Item 3</a></li>
      </Dropdown>
    `,
  }),
};

export const Disabled: Story = {
  args: {
    disabled: true,
    triggerText: 'Disabled Dropdown',
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

export const CustomTrigger: Story = {
  args: {},
  render: args => ({
    components: { Dropdown },
    setup() {
      return { args };
    },
    template: `
      <Dropdown v-bind="args">
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
        <li><hr class="my-1"></li>
        <li><a class="text-error">🚪 Logout</a></li>
      </Dropdown>
    `,
  }),
};

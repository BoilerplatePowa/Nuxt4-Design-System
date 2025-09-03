import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { Tabs } from '.';
import { ref } from 'vue';

const meta: Meta<typeof Tabs> = {
  title: 'Data Display/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A flexible tabs component with multiple variants and content support using Vue 3.4 defineModel().',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    tabs: {
      control: { type: 'object' },
      description: 'Array of tab objects',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'bordered', 'lifted', 'boxed'],
      description: 'Tabs variant',
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Tabs size',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disable all tabs',
    },
    'onUpdate:modelValue': {
      action: 'update:modelValue',
    },
    'onTab-change': {
      action: 'tab-change',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleTabs = [
  {
    label: 'Tab 1',
    content:
      '<p>Content for tab 1. This is some sample content to show how the tab content area works.</p>',
  },
  {
    label: 'Tab 2',
    content: '<p>Content for tab 2. You can put any HTML content here, including components.</p>',
  },
  {
    label: 'Tab 3',
    content: '<p>Content for tab 3. Each tab can have different content and styling.</p>',
  },
  { label: 'Disabled', content: '<p>This tab is disabled.</p>', disabled: true },
];

export const Default: Story = {
  args: {
    tabs: sampleTabs,
  },
};

export const Bordered: Story = {
  args: {
    tabs: sampleTabs,
    variant: 'bordered',
  },
};

export const Lifted: Story = {
  args: {
    tabs: sampleTabs,
    variant: 'lifted',
  },
};

export const Boxed: Story = {
  args: {
    tabs: sampleTabs,
    variant: 'boxed',
  },
};

export const WithBadges: Story = {
  args: {
    tabs: [
      { label: 'Messages', badge: '5', content: '<p>You have 5 unread messages.</p>' },
      { label: 'Notifications', badge: '12', content: '<p>You have 12 notifications.</p>' },
      { label: 'Settings', content: '<p>Configure your preferences here.</p>' },
    ],
  },
};

export const Small: Story = {
  args: {
    tabs: sampleTabs,
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    tabs: sampleTabs,
    size: 'lg',
  },
};

export const WithVModel: Story = {
  render: () => ({
    components: { Tabs },
    setup() {
      const activeTab = ref('Tab 1');
      const simpleTabs = [
        { label: 'Tab 1', content: '<p>Welcome to the first tab!</p>' },
        { label: 'Tab 2', content: '<p>This is the second tab content.</p>' },
        { label: 'Tab 3', content: '<p>Third tab content here.</p>' },
      ];

      return {
        activeTab,
        simpleTabs,
        onTabChange: (value: string) => {
          console.log('Tab changed to:', value);
        },
      };
    },
    template: `
      <div class="space-y-4 w-full max-w-2xl">
        <div class="p-4 bg-base-200 rounded-lg">
          <p class="text-sm mb-2">Current active tab: <strong>{{ activeTab }}</strong></p>
        </div>
        <Tabs 
          :tabs="simpleTabs" 
          v-model="activeTab"
          @tab-change="onTabChange"
        />
      </div>
    `,
  }),
};

export const WithCustomValues: Story = {
  render: () => ({
    components: { Tabs },
    setup() {
      const activeTab = ref('home');
      const tabsWithValues = [
        { label: 'Home', value: 'home', content: '<p>Welcome to the home page!</p>' },
        { label: 'About', value: 'about', content: '<p>Learn more about us.</p>' },
        { label: 'Contact', value: 'contact', content: '<p>Get in touch with us.</p>' },
      ];

      return {
        activeTab,
        tabsWithValues,
        onTabChange: (value: string) => {
          console.log('Tab changed to:', value);
        },
      };
    },
    template: `
      <div class="space-y-4 w-full max-w-2xl">
        <div class="p-4 bg-base-200 rounded-lg">
          <p class="text-sm mb-2">Current active tab value: <strong>{{ activeTab }}</strong></p>
        </div>
        <Tabs 
          :tabs="tabsWithValues" 
          v-model="activeTab"
          @tab-change="onTabChange"
        />
      </div>
    `,
  }),
};

export const AllVariants: Story = {
  render: () => ({
    components: { Tabs },
    setup() {
      const simpleTabs = [
        { label: 'Home', content: '<p>Welcome to the home page!</p>' },
        { label: 'About', content: '<p>Learn more about us.</p>' },
        { label: 'Contact', content: '<p>Get in touch with us.</p>' },
      ];
      return { simpleTabs };
    },
    template: `
      <div class="space-y-8 w-full max-w-2xl">
        <div>
          <h3 class="text-lg font-semibold mb-3">Default</h3>
          <Tabs :tabs="simpleTabs" />
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-3">Bordered</h3>
          <Tabs :tabs="simpleTabs" variant="bordered" />
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-3">Lifted</h3>
          <Tabs :tabs="simpleTabs" variant="lifted" />
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-3">Boxed</h3>
          <Tabs :tabs="simpleTabs" variant="boxed" />
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-3">Sizes</h3>
          <div class="space-y-4">
            <Tabs :tabs="[{label: 'Small'}, {label: 'Tabs'}]" size="sm" variant="bordered" />
            <Tabs :tabs="[{label: 'Medium'}, {label: 'Tabs'}]" size="md" variant="bordered" />
            <Tabs :tabs="[{label: 'Large'}, {label: 'Tabs'}]" size="lg" variant="bordered" />
          </div>
        </div>
      </div>
    `,
  }),
};

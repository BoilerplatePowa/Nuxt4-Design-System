import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Avatar from './Avatar.vue';

const meta: Meta<typeof Avatar> = {
  title: 'Data Display/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A flexible avatar component with support for images, placeholders, presence indicators, badges, and loading states.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    src: {
      type: 'string',
      control: { type: 'text' },
      description: 'Image source URL',
      table: {
        type: { summary: 'string' },
      },
    },
    alt: {
      type: 'string',
      control: { type: 'text' },
      description: 'Alt text for image',
      table: {
        type: { summary: 'string' },
      },
    },
    name: {
      type: 'string',
      control: { type: 'text' },
      description: 'User name for generating initials',
      table: {
        type: { summary: 'string' },
      },
    },
    placeholder: {
      type: 'string',
      control: { type: 'text' },
      description: 'Placeholder text (shown when no image)',
      table: {
        type: { summary: 'string' },
      },
    },
    initials: {
      type: 'string',
      control: { type: 'text' },
      description: 'Custom initials to display',
      table: {
        type: { summary: 'string' },
      },
    },
    size: {
      type: 'string',
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Avatar size',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
    shape: {
      type: 'string',
      control: { type: 'select' },
      options: ['circle', 'square', 'rounded'],
      description: 'Avatar shape',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'circle' },
      },
    },
    presence: {
      type: 'string',
      control: { type: 'select' },
      options: ['online', 'offline', 'away', 'busy'],
      description: 'Presence status',
      table: {
        type: { summary: 'string' },
      },
    },
    showPresence: {
      type: 'boolean',
      control: { type: 'boolean' },
      description: 'Show presence indicator',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    ring: {
      type: 'boolean',
      control: { type: 'boolean' },
      description: 'Show ring around avatar',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    ringColor: {
      type: 'string',
      control: { type: 'select' },
      options: ['bordered', 'ghost', 'primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error', 'neutral'],
      description: 'Ring color',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
      },
    },
    badge: {
      type: 'string',
      control: { type: 'text' },
      description: 'Badge text to display',
      table: {
        type: { summary: 'string' },
      },
    },
    badgeVariant: {
      type: 'string',
      control: { type: 'select' },
      options: ['bordered', 'ghost', 'primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error', 'neutral'],
      description: 'Badge variant',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
      },
    },
    count: {
      type: 'number',
      control: { type: 'number' },
      description: 'Count number to display as badge',
      table: {
        type: { summary: 'number' },
      },
    },
    loading: {
      type: 'boolean',
      control: { type: 'boolean' },
      description: 'Show loading state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    lazy: {
      type: 'boolean',
      control: { type: 'boolean' },
      description: 'Enable lazy loading for image',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    fallbackColor: {
      type: 'string',
      control: { type: 'select' },
      options: ['primary', 'secondary', 'accent', 'neutral', 'random'],
      description: 'Background color for placeholder (random generates color from name)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'neutral' },
      },
    },
    fallbackIcon: {
      type: 'string',
      control: { type: 'text' },
      description: 'Icon to show when no image, name, or placeholder is provided',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'user' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=1',
    alt: 'User avatar',
  },
  render: args => ({
    components: { Avatar },
    setup() {
      return { args };
    },
    template: '<Avatar v-bind="args" />',
  }),
};

export const WithPlaceholder: Story = {
  args: {
    placeholder: 'JD',
  },
  render: args => ({
    components: { Avatar },
    setup() {
      return { args };
    },
    template: '<Avatar v-bind="args" />',
  }),
};

export const Online: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=2',
    alt: 'Online user',
    presence: 'online',
  },
  render: args => ({
    components: { Avatar },
    setup() {
      return { args };
    },
    template: '<Avatar v-bind="args" />',
  }),
};

export const Offline: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=3',
    alt: 'Offline user',
    presence: 'offline',
  },
  render: args => ({
    components: { Avatar },
    setup() {
      return { args };
    },
    template: '<Avatar v-bind="args" />',
  }),
};

export const Away: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=4',
    alt: 'Away user',
    presence: 'away',
  },
  render: args => ({
    components: { Avatar },
    setup() {
      return { args };
    },
    template: '<Avatar v-bind="args" />',
  }),
};

export const Busy: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=5',
    alt: 'Busy user',
    presence: 'busy',
  },
  render: args => ({
    components: { Avatar },
    setup() {
      return { args };
    },
    template: '<Avatar v-bind="args" />',
  }),
};

export const WithRing: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=6',
    alt: 'User with ring',
    ring: true,
    ringColor: 'primary',
  },
  render: args => ({
    components: { Avatar },
    setup() {
      return { args };
    },
    template: '<Avatar v-bind="args" />',
  }),
};

export const Square: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=7',
    alt: 'Square avatar',
    shape: 'square',
  },
  render: args => ({
    components: { Avatar },
    setup() {
      return { args };
    },
    template: '<Avatar v-bind="args" />',
  }),
};

export const Large: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=8',
    alt: 'Large avatar',
    size: 'xl',
  },
  render: args => ({
    components: { Avatar },
    setup() {
      return { args };
    },
    template: '<Avatar v-bind="args" />',
  }),
};

export const Small: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=9',
    alt: 'Small avatar',
    size: 'xs',
  },
  render: args => ({
    components: { Avatar },
    setup() {
      return { args };
    },
    template: '<Avatar v-bind="args" />',
  }),
};

export const WithName: Story = {
  args: {
    name: 'John Doe',
  },
  render: args => ({
    components: { Avatar },
    setup() {
      return { args };
    },
    template: '<Avatar v-bind="args" />',
  }),
};

export const WithBadge: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=10',
    alt: 'User with badge',
    badge: '3',
    badgeVariant: 'primary',
  },
  render: args => ({
    components: { Avatar },
    setup() {
      return { args };
    },
    template: '<Avatar v-bind="args" />',
  }),
};

export const WithCount: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=11',
    alt: 'User with count',
    count: 42,
    badgeVariant: 'success',
  },
  render: args => ({
    components: { Avatar },
    setup() {
      return { args };
    },
    template: '<Avatar v-bind="args" />',
  }),
};

export const WithLargeCount: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=12',
    alt: 'User with large count',
    count: 999,
    badgeVariant: 'warning',
  },
  render: args => ({
    components: { Avatar },
    setup() {
      return { args };
    },
    template: '<Avatar v-bind="args" />',
  }),
};

export const Loading: Story = {
  args: {
    loading: true,
  },
  render: args => ({
    components: { Avatar },
    setup() {
      return { args };
    },
    template: '<Avatar v-bind="args" />',
  }),
};

export const WithFallbackColors: Story = {
  render: () => ({
    components: { Avatar },
    template: `
      <div class="space-y-4">
        <div class="flex flex-wrap gap-4 items-center">
          <Avatar name="John Doe" fallbackColor="primary" />
          <Avatar name="Jane Smith" fallbackColor="secondary" />
          <Avatar name="Bob Wilson" fallbackColor="accent" />
          <Avatar name="Alice Brown" fallbackColor="neutral" />
          <Avatar name="Charlie Davis" fallbackColor="random" />
        </div>
      </div>
    `,
  }),
};

export const AllVariants: Story = {
  render: () => ({
    components: { Avatar },
    template: `
      <div class="space-y-6">
        <div>
          <h3 class="text-lg font-semibold mb-3">Sizes</h3>
          <div class="flex flex-wrap gap-4 items-center">
            <Avatar src="https://i.pravatar.cc/150?img=1" size="xs" alt="XS" />
            <Avatar src="https://i.pravatar.cc/150?img=2" size="sm" alt="SM" />
            <Avatar src="https://i.pravatar.cc/150?img=3" size="md" alt="MD" />
            <Avatar src="https://i.pravatar.cc/150?img=4" size="lg" alt="LG" />
            <Avatar src="https://i.pravatar.cc/150?img=5" size="xl" alt="XL" />
            <Avatar src="https://i.pravatar.cc/150?img=6" size="2xl" alt="2XL" />
          </div>
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-3">Shapes</h3>
          <div class="flex flex-wrap gap-4 items-center">
            <Avatar src="https://i.pravatar.cc/150?img=7" shape="circle" alt="Circle" />
            <Avatar src="https://i.pravatar.cc/150?img=8" shape="square" alt="Square" />
            <Avatar src="https://i.pravatar.cc/150?img=9" shape="rounded" alt="Rounded" />
          </div>
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-3">Presence</h3>
          <div class="flex flex-wrap gap-4 items-center">
            <Avatar src="https://i.pravatar.cc/150?img=10" presence="online" alt="Online" />
            <Avatar src="https://i.pravatar.cc/150?img=11" presence="offline" alt="Offline" />
            <Avatar src="https://i.pravatar.cc/150?img=12" presence="away" alt="Away" />
            <Avatar src="https://i.pravatar.cc/150?img=13" presence="busy" alt="Busy" />
          </div>
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-3">Ring Colors</h3>
          <div class="flex flex-wrap gap-4 items-center">
            <Avatar src="https://i.pravatar.cc/150?img=14" ring ringColor="primary" alt="Primary Ring" />
            <Avatar src="https://i.pravatar.cc/150?img=15" ring ringColor="secondary" alt="Secondary Ring" />
            <Avatar src="https://i.pravatar.cc/150?img=16" ring ringColor="accent" alt="Accent Ring" />
            <Avatar src="https://i.pravatar.cc/150?img=17" ring ringColor="neutral" alt="Neutral Ring" />
            <Avatar src="https://i.pravatar.cc/150?img=18" ring ringColor="success" alt="Success Ring" />
            <Avatar src="https://i.pravatar.cc/150?img=19" ring ringColor="warning" alt="Warning Ring" />
            <Avatar src="https://i.pravatar.cc/150?img=20" ring ringColor="error" alt="Error Ring" />
          </div>
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-3">Placeholders</h3>
          <div class="flex flex-wrap gap-4 items-center">
            <Avatar placeholder="AB" />
            <Avatar name="John Doe" />
            <Avatar initials="JD" />
            <Avatar placeholder="CD" size="lg" />
            <Avatar placeholder="EF" shape="square" />
            <Avatar placeholder="GH" ring ringColor="accent" />
            <Avatar name="Alice Smith" fallbackColor="random" />
          </div>
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-3">Badges & Counts</h3>
          <div class="flex flex-wrap gap-4 items-center">
            <Avatar src="https://i.pravatar.cc/150?img=21" badge="3" alt="With Badge" />
            <Avatar src="https://i.pravatar.cc/150?img=22" :count="42" alt="With Count" />
            <Avatar src="https://i.pravatar.cc/150?img=23" :count="999" alt="Large Count" />
            <Avatar src="https://i.pravatar.cc/150?img=24" badge="VIP" badgeVariant="warning" alt="VIP Badge" />
            <Avatar src="https://i.pravatar.cc/150?img=25" :count="5" badgeVariant="error" alt="Error Count" />
          </div>
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-3">Loading States</h3>
          <div class="flex flex-wrap gap-4 items-center">
            <Avatar loading size="xs" />
            <Avatar loading size="md" />
            <Avatar loading size="xl" />
          </div>
        </div>
      </div>
    `,
  }),
};

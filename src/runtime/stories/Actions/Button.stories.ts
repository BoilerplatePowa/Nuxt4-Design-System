import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Button from '../../components/Actions/Button.vue';

const meta: Meta<typeof Button> = {
  title: 'Actions/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A flexible button component with multiple variants, sizes, loading states, and accessibility features.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: [
        'primary',
        'secondary',
        'accent',
        'neutral',
        'ghost',
        'outline',
        'link',
        'info',
        'success',
        'warning',
        'error',
      ],
      description: 'Button variant',
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Button size',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disabled state',
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Loading state',
    },
    loadingText: {
      control: { type: 'text' },
      description: 'Text to show during loading',
    },
    hideTextOnLoading: {
      control: { type: 'boolean' },
      description: 'Hide button text during loading',
    },
    type: {
      control: { type: 'select' },
      options: ['button', 'submit', 'reset'],
      description: 'Button type',
    },
    fullWidth: {
      control: { type: 'boolean' },
      description: 'Full width',
    },
    circle: {
      control: { type: 'boolean' },
      description: 'Circle shape',
    },
    square: {
      control: { type: 'boolean' },
      description: 'Square shape',
    },
    glass: {
      control: { type: 'boolean' },
      description: 'Glass effect',
    },
    noAnimation: {
      control: { type: 'boolean' },
      description: 'Disable animations',
    },
    confirmAction: {
      control: { type: 'boolean' },
      description: 'Show confirmation dialog on click',
    },
    confirmText: {
      control: { type: 'text' },
      description: 'Confirmation dialog text',
    },
    debounceMs: {
      control: { type: 'number' },
      description: 'Debounce click events (milliseconds)',
    },
    autoFocus: {
      control: { type: 'boolean' },
      description: 'Auto focus on mount',
    },
    ariaLabel: {
      control: { type: 'text' },
      description: 'Accessibility label',
    },
    ariaPressed: {
      control: { type: 'boolean' },
      description: 'Pressed state for accessibility',
    },
    ariaExpanded: {
      control: { type: 'boolean' },
      description: 'Expanded state for accessibility',
    },
    ariaDescribedby: {
      control: { type: 'text' },
      description: 'Element ID that describes the button',
    },
    iconLeft: {
      control: { type: 'select' },
      options: [
        'heart',
        'star',
        'settings',
        'user',
        'home',
        'search',
        'mail',
        'phone',
        'calendar',
        'download',
        'upload',
        'edit',
        'delete',
        'plus',
        'minus',
        'check',
        'x',
        'arrow-left',
        'arrow-right',
        'arrow-up',
        'arrow-down',
        'menu',
        'info',
        'alert-circle',
        'check-circle',
        'x-circle',
        'help-circle',
        'eye',
        'eye-off',
        'lock',
        'unlock',
        'zap',
        'chevron-down',
        'chevron-up',
        'chevron-left',
        'chevron-right',
        'filter',
        'sort-asc',
        'sort-desc',
        'refresh-cw',
        'rotate-ccw',
        'rotate-cw',
        'zoom-in',
        'zoom-out',
        'maximize',
        'minimize',
        'external-link',
        'link',
        'copy',
        'share',
        'bookmark',
        'flag',
        'thumbs-up',
        'thumbs-down',
        'message-circle',
        'message-square',
        'bell',
        'shield',
        'award',
        'gift',
        'shopping-cart',
        'credit-card',
        'dollar-sign',
        'percent',
        'trending-up',
        'trending-down',
        'activity',
        'bar-chart',
        'pie-chart',
        'line-chart',
        'database',
        'server',
        'monitor',
        'smartphone',
        'tablet',
        'laptop',
        'printer',
        'camera',
        'video',
        'music',
        'file',
        'folder',
        'archive',
        'trash-2',
        'save',
        'download-cloud',
        'upload-cloud',
        'cloud',
        'wifi',
        'bluetooth',
        'battery',
        'power',
        'volume',
        'volume1',
        'volume2',
        'volume-x',
        'mic',
        'mic-off',
        'headphones',
        'speaker',
        'radio',
        'tv',
        'gamepad-2',
        'mouse',
        'keyboard',
        'hard-drive',
        'cpu',
        'thermometer',
        'droplets',
        'sun',
        'moon',
        'cloud-rain',
        'cloud-snow',
        'wind',
        'umbrella',
        'snowflake',
        'flame',
        'sparkles',
        'ice-cream',
        'heart-off',
        'star-off',
        'settings-2',
        'users',
        'building',
        'map',
        'navigation',
        'globe',
        'mail-open',
        'phone-call',
        'phone-incoming',
        'phone-outgoing',
        'calendar-days',
        'calendar-range',
        'clock-1',
        'clock-2',
        'clock-3',
        'clock-4',
        'clock-5',
        'clock-6',
        'clock-7',
        'clock-8',
        'clock-9',
        'clock-10',
        'clock-11',
        'clock-12',
        'map-pin-off',
        'navigation-2',
        'navigation-off',
        'edit-2',
        'edit-3',
        'trash',
        'plus-circle',
        'minus-circle',
        'x-square',
        'alert-triangle',
        'alert-octagon',
      ],
      description: 'Left icon name',
    },
    iconRight: {
      control: { type: 'select' },
      options: [
        'heart',
        'star',
        'settings',
        'user',
        'home',
        'search',
        'mail',
        'phone',
        'calendar',
        'download',
        'upload',
        'edit',
        'delete',
        'plus',
        'minus',
        'check',
        'x',
        'arrow-left',
        'arrow-right',
        'arrow-up',
        'arrow-down',
        'menu',
        'info',
        'alert-circle',
        'check-circle',
        'x-circle',
        'help-circle',
        'eye',
        'eye-off',
        'lock',
        'unlock',
        'zap',
        'chevron-down',
        'chevron-up',
        'chevron-left',
        'chevron-right',
        'filter',
        'sort-asc',
        'sort-desc',
        'refresh-cw',
        'rotate-ccw',
        'rotate-cw',
        'zoom-in',
        'zoom-out',
        'maximize',
        'minimize',
        'external-link',
        'link',
        'copy',
        'share',
        'bookmark',
        'flag',
        'thumbs-up',
        'thumbs-down',
        'message-circle',
        'message-square',
        'bell',
        'shield',
        'award',
        'gift',
        'shopping-cart',
        'credit-card',
        'dollar-sign',
        'percent',
        'trending-up',
        'trending-down',
        'activity',
        'bar-chart',
        'pie-chart',
        'line-chart',
        'database',
        'server',
        'monitor',
        'smartphone',
        'tablet',
        'laptop',
        'printer',
        'camera',
        'video',
        'music',
        'file',
        'folder',
        'archive',
        'trash-2',
        'save',
        'download-cloud',
        'upload-cloud',
        'cloud',
        'wifi',
        'bluetooth',
        'battery',
        'power',
        'volume',
        'volume1',
        'volume2',
        'volume-x',
        'mic',
        'mic-off',
        'headphones',
        'speaker',
        'radio',
        'tv',
        'gamepad-2',
        'mouse',
        'keyboard',
        'hard-drive',
        'cpu',
        'thermometer',
        'droplets',
        'sun',
        'moon',
        'cloud-rain',
        'cloud-snow',
        'wind',
        'umbrella',
        'snowflake',
        'flame',
        'sparkles',
        'ice-cream',
        'heart-off',
        'star-off',
        'settings-2',
        'users',
        'building',
        'map',
        'navigation',
        'globe',
        'mail-open',
        'phone-call',
        'phone-incoming',
        'phone-outgoing',
        'calendar-days',
        'calendar-range',
        'clock-1',
        'clock-2',
        'clock-3',
        'clock-4',
        'clock-5',
        'clock-6',
        'clock-7',
        'clock-8',
        'clock-9',
        'clock-10',
        'clock-11',
        'clock-12',
        'map-pin-off',
        'navigation-2',
        'navigation-off',
        'edit-2',
        'edit-3',
        'trash',
        'plus-circle',
        'minus-circle',
        'x-square',
        'alert-triangle',
        'alert-octagon',
      ],
      description: 'Right icon name',
    },
    iconSize: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Icon size',
    },
    onClick: {
      action: 'clicked',
      description: 'Click event',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
  render: args => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Primary Button</Button>',
  }),
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
  render: args => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Secondary Button</Button>',
  }),
};

export const Accent: Story = {
  args: {
    variant: 'accent',
  },
  render: args => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Accent Button</Button>',
  }),
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
  },
  render: args => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Ghost Button</Button>',
  }),
};

export const Outline: Story = {
  args: {
    variant: 'outline',
  },
  render: args => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Outline Button</Button>',
  }),
};

export const Link: Story = {
  args: {
    variant: 'link',
  },
  render: args => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Link Button</Button>',
  }),
};

export const Neutral: Story = {
  args: {
    variant: 'neutral',
  },
  render: args => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Neutral Button</Button>',
  }),
};

export const Info: Story = {
  args: {
    variant: 'info',
  },
  render: args => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Info Button</Button>',
  }),
};

export const Success: Story = {
  args: {
    variant: 'success',
  },
  render: args => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Success Button</Button>',
  }),
};

export const Warning: Story = {
  args: {
    variant: 'warning',
  },
  render: args => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Warning Button</Button>',
  }),
};

export const Error: Story = {
  args: {
    variant: 'error',
  },
  render: args => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Error Button</Button>',
  }),
};

export const Small: Story = {
  args: {
    size: 'sm',
  },
  render: args => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Small Button</Button>',
  }),
};

export const Large: Story = {
  args: {
    size: 'lg',
  },
  render: args => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Large Button</Button>',
  }),
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: args => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Disabled Button</Button>',
  }),
};

export const Loading: Story = {
  args: {
    loading: true,
  },
  render: args => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Loading...</Button>',
  }),
};

export const LoadingWithText: Story = {
  args: {
    loading: true,
    loadingText: 'Processing...',
  },
  render: args => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Submit</Button>',
  }),
};

export const LoadingHideText: Story = {
  args: {
    loading: true,
    hideTextOnLoading: true,
  },
  render: args => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Submit</Button>',
  }),
};

export const ConfirmAction: Story = {
  args: {
    confirmAction: true,
    confirmText: 'Are you sure you want to delete this item?',
  },
  render: args => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Delete Item</Button>',
  }),
};

export const Debounced: Story = {
  args: {
    debounceMs: 500,
  },
  render: args => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Debounced Button (500ms)</Button>',
  }),
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
  },
  render: args => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Full Width Button</Button>',
  }),
};

export const WithIcons: Story = {
  render: args => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: `
      <div class="space-y-4">
        <div class="flex flex-wrap gap-2">
          <Button v-bind="args">
            <template #icon-left>
              <span>←</span>
            </template>
            With Left Icon
          </Button>
          <Button v-bind="args">
            With Right Icon
            <template #icon-right>
              <span>→</span>
            </template>
          </Button>
          <Button v-bind="args">
            <template #icon-left>
              <span>←</span>
            </template>
            Both Icons
            <template #icon-right>
              <span>→</span>
            </template>
          </Button>
        </div>
        <div class="flex flex-wrap gap-2">
          <Button circle>
            <span>♥</span>
          </Button>
          <Button square>
            <span>★</span>
          </Button>
        </div>
      </div>
    `,
  }),
};

export const WithIconProps: Story = {
  args: {
    iconLeft: 'heart',
    iconRight: 'arrow-right',
  },
  render: args => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Button with Icon Props</Button>',
  }),
};

export const IconExamples: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div class="space-y-6">
        <div>
          <h3 class="text-lg font-semibold mb-3">Left Icons</h3>
          <div class="flex flex-wrap gap-2">
            <Button iconLeft="heart">Like</Button>
            <Button iconLeft="star">Favorite</Button>
            <Button iconLeft="download">Download</Button>
            <Button iconLeft="upload">Upload</Button>
            <Button iconLeft="plus">Add New</Button>
            <Button iconLeft="search">Search</Button>
          </div>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-3">Right Icons</h3>
          <div class="flex flex-wrap gap-2">
            <Button iconRight="arrow-right">Continue</Button>
            <Button iconRight="external-link">Open Link</Button>
            <Button iconRight="share">Share</Button>
            <Button iconRight="copy">Copy</Button>
            <Button iconRight="download">Download</Button>
            <Button iconRight="settings">Settings</Button>
          </div>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-3">Both Icons</h3>
          <div class="flex flex-wrap gap-2">
            <Button iconLeft="arrow-left" iconRight="arrow-right">Navigate</Button>
            <Button iconLeft="mail" iconRight="send">Send Email</Button>
            <Button iconLeft="edit" iconRight="check">Edit & Save</Button>
            <Button iconLeft="trash" iconRight="alert-triangle">Delete</Button>
          </div>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-3">Icon Sizes</h3>
          <div class="flex flex-wrap gap-2 items-center">
            <Button iconLeft="heart" iconSize="xs">XS Icon</Button>
            <Button iconLeft="heart" iconSize="sm">SM Icon</Button>
            <Button iconLeft="heart" iconSize="md">MD Icon</Button>
            <Button iconLeft="heart" iconSize="lg">LG Icon</Button>
          </div>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-3">Icon Only Buttons</h3>
          <div class="flex flex-wrap gap-2">
            <Button circle iconLeft="heart" />
            <Button circle iconLeft="star" />
            <Button circle iconLeft="settings" />
            <Button circle iconLeft="user" />
            <Button circle iconLeft="search" />
            <Button circle iconLeft="menu" />
          </div>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-3">Different Variants with Icons</h3>
          <div class="flex flex-wrap gap-2">
            <Button variant="primary" iconLeft="check">Primary</Button>
            <Button variant="secondary" iconLeft="star">Secondary</Button>
            <Button variant="accent" iconLeft="heart">Accent</Button>
            <Button variant="ghost" iconLeft="settings">Ghost</Button>
            <Button variant="outline" iconLeft="download">Outline</Button>
            <Button variant="link" iconLeft="external-link">Link</Button>
          </div>
        </div>
      </div>
    `,
  }),
};

export const Circle: Story = {
  args: {
    circle: true,
  },
  render: args => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">○</Button>',
  }),
};

export const Square: Story = {
  args: {
    square: true,
  },
  render: args => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">■</Button>',
  }),
};

export const Glass: Story = {
  args: {
    glass: true,
  },
  render: args => ({
    components: { Button },
    setup() {
      return { args };
    },
    template:
      '<div class="p-8 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"><Button v-bind="args">Glass Button</Button></div>',
  }),
};

export const NoAnimation: Story = {
  args: {
    noAnimation: true,
  },
  render: args => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">No Animation Button</Button>',
  }),
};

export const Accessibility: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div class="space-y-4">
        <div>
          <h3 class="text-lg font-semibold mb-3">Accessibility Features</h3>
          <div class="flex flex-wrap gap-2">
            <Button ariaLabel="Custom label">Custom Label</Button>
            <Button :ariaPressed="true">Pressed State</Button>
            <Button :ariaExpanded="true">Expanded State</Button>
            <Button ariaDescribedby="description">Described Button</Button>
            <div id="description" class="text-sm text-gray-600">This button has a description</div>
          </div>
        </div>
      </div>
    `,
  }),
};

export const AnimationDemo: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div class="space-y-8 p-6">
        <div>
          <h3 class="text-lg font-semibold mb-4">Button Animations</h3>
          <p class="text-sm text-gray-600 mb-4">Click buttons to see hover, focus, and active state animations</p>
          <div class="flex flex-wrap gap-4">
            <Button variant="primary" class="transform transition-all duration-200 hover:scale-105 hover:shadow-lg">
              Hover Scale Effect
            </Button>
            <Button variant="secondary" class="transition-all duration-300 hover:bg-opacity-80">
              Smooth Hover
            </Button>
            <Button variant="accent" class="transform transition-transform duration-150 active:scale-95">
              Click Scale
            </Button>
            <Button variant="outline" class="transition-all duration-200 hover:border-1 hover:border-primary">
              Border Animation
            </Button>
          </div>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-4">Loading Animations</h3>
          <div class="flex flex-wrap gap-4">
            <Button loading variant="primary">Loading Primary</Button>
            <Button loading variant="secondary">Loading Secondary</Button>
            <Button loading variant="accent">Loading Accent</Button>
          </div>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-4">Custom Animation Classes</h3>
          <p class="text-sm text-gray-600 mb-4">Buttons with custom CSS animations</p>
          <div class="flex flex-wrap gap-4">
            <Button 
              variant="primary" 
              class="animate-pulse"
            >
              Pulse Animation
            </Button>
            <Button 
              variant="secondary" 
              class="transform transition-all duration-500 hover:rotate-3"
            >
              Rotate on Hover
            </Button>
            <Button 
              variant="accent" 
              class="transition-all duration-300 hover:shadow-2xl hover:shadow-accent/50"
            >
              Shadow Glow
            </Button>
          </div>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-4">Animation Comparison</h3>
          <div class="flex flex-wrap gap-4">
            <Button variant="primary">
              Normal Button
            </Button>
            <Button variant="primary" noAnimation>
              No Animation
            </Button>
          </div>
        </div>
      </div>
    `,
  }),
};

export const AllVariants: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div class="space-y-6">
        <div>
          <h3 class="text-lg font-semibold mb-3">Variants</h3>
          <div class="flex flex-wrap gap-2">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="accent">Accent</Button>
            <Button variant="neutral">Neutral</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="link">Link</Button>
          </div>
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-3">Status Colors</h3>
          <div class="flex flex-wrap gap-2">
            <Button variant="info">Info</Button>
            <Button variant="success">Success</Button>
            <Button variant="warning">Warning</Button>
            <Button variant="error">Error</Button>
          </div>
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-3">Sizes</h3>
          <div class="flex flex-wrap gap-2 items-center">
            <Button size="xs">XS</Button>
            <Button size="sm">SM</Button>
            <Button size="md">MD</Button>
            <Button size="lg">LG</Button>
          </div>
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-3">Shapes</h3>
          <div class="flex flex-wrap gap-2 items-center">
            <Button circle size="sm">○</Button>
            <Button square size="sm">■</Button>
            <Button circle size="lg">○</Button>
            <Button square size="lg">■</Button>
          </div>
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-3">States</h3>
          <div class="flex flex-wrap gap-2">
            <Button loading>Loading</Button>
            <Button disabled>Disabled</Button>
            <Button glass>Glass</Button>
            <Button noAnimation>No Animation</Button>
          </div>
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-3">With Icons</h3>
          <div class="flex flex-wrap gap-2">
            <Button iconLeft="heart">Like</Button>
            <Button iconRight="arrow-right">Continue</Button>
            <Button iconLeft="download" iconRight="external-link">Download</Button>
            <Button circle iconLeft="settings" />
          </div>
        </div>
      </div>
    `,
  }),
};

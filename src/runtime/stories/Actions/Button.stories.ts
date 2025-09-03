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
          'A flexible button component with multiple variants, sizes, loading states, and accessibility features. Uses btnMap for consistent DaisyUI class mapping.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: { type: 'select' },
      options: ['neutral', 'primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error'],
      description: 'Button color variant',
    },
    btnStyle: {
      control: { type: 'select' },
      options: ['outline', 'dash', 'soft', 'ghost', 'link'],
      description: 'Button style variant',
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
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
    wide: {
      control: { type: 'boolean' },
      description: 'Wide modifier',
    },
    block: {
      control: { type: 'boolean' },
      description: 'Block modifier',
    },
    square: {
      control: { type: 'boolean' },
      description: 'Square modifier',
    },
    circle: {
      control: { type: 'boolean' },
      description: 'Circle modifier',
    },
    iconLeft: {
      control: { type: 'select' },
      options: ['heart', 'star', 'settings', 'user', 'home', 'search', 'download', 'plus', 'arrow-right'],
      description: 'Left icon name',
    },
    iconRight: {
      control: { type: 'select' },
      options: ['heart', 'star', 'settings', 'user', 'home', 'search', 'download', 'plus', 'arrow-right'],
      description: 'Right icon name',
    },
    onClick: {
      action: 'clicked',
      description: 'Click event',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default button for playground
export const Default: Story = {
  args: {
    color: 'primary',
    size: 'md',
  },
  render: args => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Click me</Button>',
  }),
};

// Colors showcase
export const Colors: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div class="space-y-4">
        <h3 class="text-lg font-semibold mb-3">Color Variants</h3>
        <div class="flex flex-wrap gap-2">
          <Button color="primary">Primary</Button>
          <Button color="secondary">Secondary</Button>
          <Button color="accent">Accent</Button>
          <Button color="neutral">Neutral</Button>
          <Button color="info">Info</Button>
          <Button color="success">Success</Button>
          <Button color="warning">Warning</Button>
          <Button color="error">Error</Button>
        </div>
      </div>
    `,
  }),
};

// Styles showcase
export const Styles: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div class="space-y-4">
        <h3 class="text-lg font-semibold mb-3">Style Variants</h3>
        <div class="flex flex-wrap gap-2">
          <Button btn-style="outline">Outline</Button>
          <Button btn-style="dash">Dash</Button>
          <Button btn-style="soft">Soft</Button>
          <Button btn-style="ghost">Ghost</Button>
          <Button btn-style="link">Link</Button>
        </div>
        
        <h4 class="text-md font-medium mt-4 mb-2">Combined Color + Style</h4>
        <div class="flex flex-wrap gap-2">
          <Button color="primary" btn-style="outline">Primary Outline</Button>
          <Button color="secondary" btn-style="ghost">Secondary Ghost</Button>
          <Button color="accent" btn-style="soft">Accent Soft</Button>
          <Button color="success" btn-style="link">Success Link</Button>
        </div>
      </div>
    `,
  }),
};

// Sizes showcase
export const Sizes: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div class="space-y-4">
        <h3 class="text-lg font-semibold mb-3">Size Variants</h3>
        <div class="flex flex-wrap gap-2 items-center">
          <Button size="xs">XS</Button>
          <Button size="sm">SM</Button>
          <Button size="md">MD</Button>
          <Button size="lg">LG</Button>
          <Button size="xl">XL</Button>
        </div>
        
        <h4 class="text-md font-medium mt-4 mb-2">With Different Colors</h4>
        <div class="flex flex-wrap gap-2 items-center">
          <Button color="primary" size="xs">Primary XS</Button>
          <Button color="secondary" size="sm">Secondary SM</Button>
          <Button color="accent" size="md">Accent MD</Button>
          <Button color="success" size="lg">Success LG</Button>
          <Button color="warning" size="xl">Warning XL</Button>
        </div>
      </div>
    `,
  }),
};

// States showcase
export const States: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div class="space-y-4">
        <h3 class="text-lg font-semibold mb-3">Button States</h3>
        <div class="flex flex-wrap gap-2">
          <Button>Normal</Button>
          <Button loading>Loading</Button>
          <Button disabled>Disabled</Button>
          <Button active>Active</Button>
        </div>
        
        <h4 class="text-md font-medium mt-4 mb-2">Loading Variations</h4>
        <div class="flex flex-wrap gap-2">
          <Button loading color="primary">Primary Loading</Button>
          <Button loading color="secondary">Secondary Loading</Button>
          <Button loading color="accent">Accent Loading</Button>
        </div>
        
        <h4 class="text-md font-medium mt-4 mb-2">Disabled Variations</h4>
        <div class="flex flex-wrap gap-2">
          <Button disabled color="primary">Primary Disabled</Button>
          <Button disabled color="secondary">Secondary Disabled</Button>
          <Button disabled color="accent">Accent Disabled</Button>
        </div>
      </div>
    `,
  }),
};

// Shapes showcase
export const Shapes: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div class="space-y-4">
        <h3 class="text-lg font-semibold mb-3">Shape Modifiers</h3>
        <div class="flex flex-wrap gap-2 items-center">
          <Button wide>Wide Button</Button>
          <Button block>Block Button</Button>
          <Button square>Square</Button>
          <Button circle>Circle</Button>
        </div>
        
        <h4 class="text-md font-medium mt-4 mb-2">Shapes with Colors</h4>
        <div class="flex flex-wrap gap-2 items-center">
          <Button color="primary" square>Primary Square</Button>
          <Button color="secondary" circle>Secondary Circle</Button>
          <Button color="accent" wide>Accent Wide</Button>
          <Button color="success" block>Success Block</Button>
        </div>
        
        <h4 class="text-md font-medium mt-4 mb-2">Icon Shapes</h4>
        <div class="flex flex-wrap gap-2 items-center">
          <Button circle iconLeft="heart" />
          <Button circle iconLeft="star" />
          <Button circle iconLeft="settings" />
          <Button square iconLeft="plus" />
          <Button square iconLeft="minus" />
        </div>
      </div>
    `,
  }),
};

// Icons showcase
export const Icons: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div class="space-y-4">
        <h3 class="text-lg font-semibold mb-3">Icon Examples</h3>
        <div class="flex flex-wrap gap-2">
          <Button iconLeft="heart">Like</Button>
          <Button iconLeft="star">Favorite</Button>
          <Button iconLeft="download">Download</Button>
          <Button iconLeft="plus">Add New</Button>
          <Button iconLeft="search">Search</Button>
        </div>
        
        <h4 class="text-md font-medium mt-4 mb-2">Right Icons</h4>
        <div class="flex flex-wrap gap-2">
          <Button iconRight="arrow-right">Continue</Button>
          <Button iconRight="external-link">Open Link</Button>
          <Button iconRight="share">Share</Button>
          <Button iconRight="copy">Copy</Button>
          <Button iconRight="settings">Settings</Button>
        </div>
        
        <h4 class="text-md font-medium mt-4 mb-2">Both Icons</h4>
        <div class="flex flex-wrap gap-2">
          <Button iconLeft="arrow-left" iconRight="arrow-right">Navigate</Button>
          <Button iconLeft="mail" iconRight="send">Send Email</Button>
          <Button iconLeft="edit" iconRight="check">Edit & Save</Button>
          <Button iconLeft="trash" iconRight="alert-triangle">Delete</Button>
        </div>
      </div>
    `,
  }),
};

// Interactive playground
export const Playground: Story = {
  args: {
    color: 'primary',
    size: 'md',
    style: undefined,
    disabled: false,
    loading: false,
    wide: false,
    block: false,
    square: false,
    circle: false,
    iconLeft: undefined,
    iconRight: undefined,
  },
  render: args => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: `
      <div class="space-y-4">
        <Button v-bind="args">
          <template v-if="args.iconLeft" #icon-left>
            <span>{{ args.iconLeft }}</span>
          </template>
          Interactive Button
          <template v-if="args.iconRight" #icon-right>
            <span>{{ args.iconRight }}</span>
          </template>
        </Button>
        
        <div class="text-sm text-gray-600">
          Use the controls above to customize this button
        </div>
      </div>
    `,
  }),
};

// All variants in one view
export const AllVariants: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div class="space-y-6 max-w-4xl">
        <div>
          <h3 class="text-lg font-semibold mb-3">Complete Button Collection</h3>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <h4 class="text-md font-medium mb-2">Colors</h4>
              <div class="flex flex-wrap gap-2">
                <Button color="primary">Primary</Button>
                <Button color="secondary">Secondary</Button>
                <Button color="accent">Accent</Button>
                <Button color="success">Success</Button>
                <Button color="warning">Warning</Button>
                <Button color="error">Error</Button>
              </div>
            </div>
            
            <div>
              <h4 class="text-md font-medium mb-2">Styles</h4>
              <div class="flex flex-wrap gap-2">
                <Button btn-style="outline">Outline</Button>
                <Button btn-style="ghost">Ghost</Button>
                <Button btn-style="link">Link</Button>
                <Button btn-style="soft">Soft</Button>
              </div>
            </div>
            
            <div>
              <h4 class="text-md font-medium mb-2">Sizes</h4>
              <div class="flex flex-wrap gap-2 items-center">
                <Button size="xs">XS</Button>
                <Button size="sm">SM</Button>
                <Button size="md">MD</Button>
                <Button size="lg">LG</Button>
              </div>
            </div>
            
            <div>
              <h4 class="text-md font-medium mb-2">Shapes</h4>
              <div class="flex flex-wrap gap-2 items-center">
                <Button square>Square</Button>
                <Button circle>Circle</Button>
                <Button wide>Wide</Button>
                <Button block>Block</Button>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h4 class="text-md font-medium mb-2">With Icons</h4>
          <div class="flex flex-wrap gap-2">
            <Button iconLeft="heart">Like</Button>
            <Button iconRight="arrow-right">Continue</Button>
            <Button iconLeft="download" iconRight="external-link">Download</Button>
            <Button circle iconLeft="settings" />
          </div>
        </div>
        
        <div>
          <h4 class="text-md font-medium mb-2">States</h4>
          <div class="flex flex-wrap gap-2">
            <Button loading>Loading</Button>
            <Button disabled>Disabled</Button>
            <Button active>Active</Button>
          </div>
        </div>
      </div>
    `,
  }),
};

import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Button from '../../src/runtime/components/Actions/Button.vue'

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
            options: [
                'neutral',
                'primary',
                'secondary',
                'accent',
                'info',
                'success',
                'warning',
                'error',
            ],
            description: 'Button color variant from btnColorMap',
        },
        btnStyle: {
            control: { type: 'select' },
            options: ['outline', 'dash', 'soft', 'ghost', 'link'],
            description: 'Button style variant from btnStyleMap',
        },
        size: {
            control: { type: 'select' },
            options: ['xs', 'sm', 'md', 'lg', 'xl'],
            description: 'Button size from btnSizeMap',
        },
        active: {
            control: { type: 'boolean' },
            description: 'Active state from btnBehaviorMap',
        },
        wide: {
            control: { type: 'boolean' },
            description: 'Wide modifier from btnModifierMap',
        },
        block: {
            control: { type: 'boolean' },
            description: 'Block modifier from btnModifierMap',
        },
        square: {
            control: { type: 'boolean' },
            description: 'Square modifier from btnModifierMap',
        },
        circle: {
            control: { type: 'boolean' },
            description: 'Circle modifier from btnModifierMap',
        },
        disabled: {
            control: { type: 'boolean' },
            description: 'Disabled state',
        },
        loading: {
            control: { type: 'boolean' },
            description: 'Loading state with spinner',
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
            description: 'Button type attribute',
        },
        fullWidth: {
            control: { type: 'boolean' },
            description: 'Full width button (legacy support)',
        },
        glass: {
            control: { type: 'boolean' },
            description: 'Glass effect modifier',
        },
        noAnimation: {
            control: { type: 'boolean' },
            description: 'Disable animations',
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
                'download',
                'plus',
                'arrow-right',
                'mail',
                'phone',
                'edit',
                'delete',
                'check',
                'x',
            ],
            description: 'Left icon name from iconMap',
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
                'download',
                'plus',
                'arrow-right',
                'mail',
                'phone',
                'edit',
                'delete',
                'check',
                'x',
            ],
            description: 'Right icon name from iconMap',
        },
        iconSize: {
            control: { type: 'select' },
            options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
            description: 'Icon size from sizeMap',
        },
        debounceMs: {
            control: { type: 'number', min: 0, max: 1000, step: 50 },
            description: 'Debounce delay in milliseconds',
        },
        confirmAction: {
            control: { type: 'boolean' },
            description: 'Show confirmation dialog before action',
        },
        confirmText: {
            control: { type: 'text' },
            description: 'Confirmation dialog text',
        },
        autoFocus: {
            control: { type: 'boolean' },
            description: 'Auto-focus button on mount',
        },
        ariaLabel: {
            control: { type: 'text' },
            description: 'Custom ARIA label',
        },
        ariaPressed: {
            control: { type: 'boolean' },
            description: 'ARIA pressed state',
        },
        ariaExpanded: {
            control: { type: 'boolean' },
            description: 'ARIA expanded state',
        },
        ariaDescribedby: {
            control: { type: 'text' },
            description: 'ARIA describedby reference',
        },
        onClick: {
            action: 'clicked',
            description: 'Click event',
        },
        onKeydown: {
            action: 'keydown',
            description: 'Keydown event',
        },
        onFocus: {
            action: 'focus',
            description: 'Focus event',
        },
        onBlur: {
            action: 'blur',
            description: 'Blur event',
        },
    },
}

export default meta
type Story = StoryObj<typeof meta>

// Default button for playground
export const Default: Story = {
    args: {
        color: 'primary',
        size: 'md',
    },
    render: (args) => ({
        components: { Button },
        setup() {
            return { args }
        },
        template: '<Button v-bind="args">Click me</Button>',
    }),
}

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
}

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
}

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
}

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
}

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
          <Button circle icon-left="heart" />
          <Button circle icon-left="star" />
          <Button circle icon-left="settings" />
          <Button square icon-left="plus" />
          <Button square icon-left="minus" />
        </div>
      </div>
    `,
    }),
}

// Icons showcase
export const Icons: Story = {
    render: () => ({
        components: { Button },
        template: `
      <div class="space-y-4">
        <h3 class="text-lg font-semibold mb-3">Icon Examples</h3>
        <div class="flex flex-wrap gap-2">
          <Button icon-left="heart">Like</Button>
          <Button icon-left="star">Favorite</Button>
          <Button icon-left="download">Download</Button>
          <Button icon-left="plus">Add New</Button>
          <Button icon-left="search">Search</Button>
        </div>
        
        <h4 class="text-md font-medium mt-4 mb-2">Right Icons</h4>
        <div class="flex flex-wrap gap-2">
          <Button icon-right="arrow-right">Continue</Button>
          <Button icon-right="external-link">Open Link</Button>
          <Button icon-right="share">Share</Button>
          <Button icon-right="copy">Copy</Button>
          <Button icon-right="settings">Settings</Button>
        </div>
        
        <h4 class="text-md font-medium mt-4 mb-2">Both Icons</h4>
        <div class="flex flex-wrap gap-2">
          <Button icon-left="arrow-left" icon-right="arrow-right">Navigate</Button>
          <Button icon-left="mail" icon-right="send">Send Email</Button>
          <Button icon-left="edit" icon-right="check">Edit & Save</Button>
          <Button icon-left="trash" icon-right="alert-triangle">Delete</Button>
        </div>
      </div>
    `,
    }),
}

// Advanced features showcase
export const AdvancedFeatures: Story = {
    render: () => ({
        components: { Button },
        template: `
      <div class="space-y-4">
        <h3 class="text-lg font-semibold mb-3">Advanced Features</h3>
        
        <h4 class="text-md font-medium mb-2">Glass Effect</h4>
        <div class="flex flex-wrap gap-2">
          <Button glass color="primary">Glass Primary</Button>
          <Button glass color="secondary">Glass Secondary</Button>
        </div>
        
        <h4 class="text-md font-medium mb-2">Loading with Text</h4>
        <div class="flex flex-wrap gap-2">
          <Button loading loading-text="Processing..." color="success">Submit</Button>
          <Button loading loading-text="Saving..." color="info">Save</Button>
        </div>
        
        <h4 class="text-md font-medium mb-2">Confirmation Action</h4>
        <div class="flex flex-wrap gap-2">
          <Button confirm-action confirm-text="Are you sure you want to delete?" color="error">Delete</Button>
        </div>
        
        <h4 class="text-md font-medium mb-2">Debounced Action</h4>
        <div class="flex flex-wrap gap-2">
          <Button :debounce-ms="500" color="warning">Debounced (500ms)</Button>
        </div>
      </div>
    `,
    }),
}

// Interactive playground
export const Playground: Story = {
    args: {
        color: 'primary',
        size: 'md',
        btnStyle: undefined,
        active: false,
        wide: false,
        block: false,
        square: false,
        circle: false,
        disabled: false,
        loading: false,
        loadingText: '',
        hideTextOnLoading: false,
        type: 'button',
        fullWidth: false,
        glass: false,
        noAnimation: false,
        iconLeft: undefined,
        iconRight: undefined,
        iconSize: 'md',
        debounceMs: 0,
        confirmAction: false,
        confirmText: 'Are you sure?',
        autoFocus: false,
    },
    render: (args) => ({
        components: { Button },
        setup() {
            return { args }
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
}

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
            <Button icon-left="heart">Like</Button>
            <Button icon-right="arrow-right">Continue</Button>
            <Button icon-left="download" icon-right="external-link">Download</Button>
            <Button circle icon-left="settings" />
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
}

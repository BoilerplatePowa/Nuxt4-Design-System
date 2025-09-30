import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Stack from '../../src/runtime/components/Layout/Stack.vue'

const meta: Meta<typeof Stack> = {
    title: 'Layout/Stack',
    component: Stack,
    parameters: {
        layout: 'padded',
    },
    argTypes: {
        direction: {
            control: { type: 'select' },
            options: ['horizontal', 'vertical'],
        },
        spacing: {
            control: { type: 'select' },
            options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
        },
        align: {
            control: { type: 'select' },
            options: ['start', 'center', 'end', 'stretch'],
        },
        justify: {
            control: { type: 'select' },
            options: ['start', 'center', 'end', 'between', 'around', 'evenly'],
        },
        wrap: {
            control: { type: 'boolean' },
        },
        reverse: {
            control: { type: 'boolean' },
        },
    },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        direction: 'vertical',
        spacing: 'md',
    },
    render: args => ({
        components: { Stack },
        setup() {
            return { args }
        },
        template: `
      <Stack v-bind="args">
        <div class="bg-primary text-primary-content p-4 rounded">Item 1</div>
        <div class="bg-secondary text-secondary-content p-4 rounded">Item 2</div>
        <div class="bg-accent text-accent-content p-4 rounded">Item 3</div>
      </Stack>
    `,
    }),
}

export const Horizontal: Story = {
    args: {
        direction: 'horizontal',
        spacing: 'md',
    },
    render: args => ({
        components: { Stack },
        setup() {
            return { args }
        },
        template: `
      <Stack v-bind="args">
        <div class="bg-primary text-primary-content p-4 rounded">Item 1</div>
        <div class="bg-secondary text-secondary-content p-4 rounded">Item 2</div>
        <div class="bg-accent text-accent-content p-4 rounded">Item 3</div>
      </Stack>
    `,
    }),
}

export const Spacing: Story = {
    render: () => ({
        components: { Stack },
        template: `
      <div class="space-y-8">
        <div>
          <h3 class="text-lg font-bold mb-4">No Spacing</h3>
          <Stack spacing="none">
            <div class="bg-primary text-primary-content p-2 rounded">Item 1</div>
            <div class="bg-secondary text-secondary-content p-2 rounded">Item 2</div>
            <div class="bg-accent text-accent-content p-2 rounded">Item 3</div>
          </Stack>
        </div>
        
        <div>
          <h3 class="text-lg font-bold mb-4">Small Spacing</h3>
          <Stack spacing="sm">
            <div class="bg-primary text-primary-content p-2 rounded">Item 1</div>
            <div class="bg-secondary text-secondary-content p-2 rounded">Item 2</div>
            <div class="bg-accent text-accent-content p-2 rounded">Item 3</div>
          </Stack>
        </div>
        
        <div>
          <h3 class="text-lg font-bold mb-4">Large Spacing</h3>
          <Stack spacing="lg">
            <div class="bg-primary text-primary-content p-2 rounded">Item 1</div>
            <div class="bg-secondary text-secondary-content p-2 rounded">Item 2</div>
            <div class="bg-accent text-accent-content p-2 rounded">Item 3</div>
          </Stack>
        </div>
      </div>
    `,
    }),
}

export const Alignment: Story = {
    render: () => ({
        components: { Stack },
        template: `
      <div class="space-y-8">
        <div>
          <h3 class="text-lg font-bold mb-4">Align Start</h3>
          <Stack direction="horizontal" align="start" class="h-32 bg-base-200 rounded p-4">
            <div class="bg-primary text-primary-content p-2 rounded">Short</div>
            <div class="bg-secondary text-secondary-content p-4 rounded">Medium<br/>Content</div>
            <div class="bg-accent text-accent-content p-6 rounded">Tall<br/>Content<br/>Here</div>
          </Stack>
        </div>
        
        <div>
          <h3 class="text-lg font-bold mb-4">Align Center</h3>
          <Stack direction="horizontal" align="center" class="h-32 bg-base-200 rounded p-4">
            <div class="bg-primary text-primary-content p-2 rounded">Short</div>
            <div class="bg-secondary text-secondary-content p-4 rounded">Medium<br/>Content</div>
            <div class="bg-accent text-accent-content p-6 rounded">Tall<br/>Content<br/>Here</div>
          </Stack>
        </div>
        
        <div>
          <h3 class="text-lg font-bold mb-4">Align End</h3>
          <Stack direction="horizontal" align="end" class="h-32 bg-base-200 rounded p-4">
            <div class="bg-primary text-primary-content p-2 rounded">Short</div>
            <div class="bg-secondary text-secondary-content p-4 rounded">Medium<br/>Content</div>
            <div class="bg-accent text-accent-content p-6 rounded">Tall<br/>Content<br/>Here</div>
          </Stack>
        </div>
        
        <div>
          <h3 class="text-lg font-bold mb-4">Align Stretch</h3>
          <Stack direction="horizontal" align="stretch" class="h-32 bg-base-200 rounded p-4">
            <div class="bg-primary text-primary-content p-2 rounded">Short</div>
            <div class="bg-secondary text-secondary-content p-4 rounded">Medium<br/>Content</div>
            <div class="bg-accent text-accent-content p-6 rounded">Tall<br/>Content<br/>Here</div>
          </Stack>
        </div>
      </div>
    `,
    }),
}

export const Justify: Story = {
    render: () => ({
        components: { Stack },
        template: `
      <div class="space-y-8">
        <div>
          <h3 class="text-lg font-bold mb-4">Justify Start</h3>
          <Stack direction="horizontal" justify="start" class="w-full bg-base-200 rounded p-4">
            <div class="bg-primary text-primary-content p-2 rounded">Item 1</div>
            <div class="bg-secondary text-secondary-content p-2 rounded">Item 2</div>
            <div class="bg-accent text-accent-content p-2 rounded">Item 3</div>
          </Stack>
        </div>
        
        <div>
          <h3 class="text-lg font-bold mb-4">Justify Center</h3>
          <Stack direction="horizontal" justify="center" class="w-full bg-base-200 rounded p-4">
            <div class="bg-primary text-primary-content p-2 rounded">Item 1</div>
            <div class="bg-secondary text-secondary-content p-2 rounded">Item 2</div>
            <div class="bg-accent text-accent-content p-2 rounded">Item 3</div>
          </Stack>
        </div>
        
        <div>
          <h3 class="text-lg font-bold mb-4">Justify Between</h3>
          <Stack direction="horizontal" justify="between" class="w-full bg-base-200 rounded p-4">
            <div class="bg-primary text-primary-content p-2 rounded">Item 1</div>
            <div class="bg-secondary text-secondary-content p-2 rounded">Item 2</div>
            <div class="bg-accent text-accent-content p-2 rounded">Item 3</div>
          </Stack>
        </div>
        
        <div>
          <h3 class="text-lg font-bold mb-4">Justify Around</h3>
          <Stack direction="horizontal" justify="around" class="w-full bg-base-200 rounded p-4">
            <div class="bg-primary text-primary-content p-2 rounded">Item 1</div>
            <div class="bg-secondary text-secondary-content p-2 rounded">Item 2</div>
            <div class="bg-accent text-accent-content p-2 rounded">Item 3</div>
          </Stack>
        </div>
        
        <div>
          <h3 class="text-lg font-bold mb-4">Justify Evenly</h3>
          <Stack direction="horizontal" justify="evenly" class="w-full bg-base-200 rounded p-4">
            <div class="bg-primary text-primary-content p-2 rounded">Item 1</div>
            <div class="bg-secondary text-secondary-content p-2 rounded">Item 2</div>
            <div class="bg-accent text-accent-content p-2 rounded">Item 3</div>
          </Stack>
        </div>
      </div>
    `,
    }),
}

export const Wrap: Story = {
    render: () => ({
        components: { Stack },
        template: `
      <div class="space-y-8">
        <div>
          <h3 class="text-lg font-bold mb-4">No Wrap (Default)</h3>
          <Stack direction="horizontal" spacing="sm" class="w-64 bg-base-200 rounded p-4">
            <div class="bg-primary text-primary-content p-2 rounded whitespace-nowrap">Long Item 1</div>
            <div class="bg-secondary text-secondary-content p-2 rounded whitespace-nowrap">Long Item 2</div>
            <div class="bg-accent text-accent-content p-2 rounded whitespace-nowrap">Long Item 3</div>
            <div class="bg-info text-info-content p-2 rounded whitespace-nowrap">Long Item 4</div>
          </Stack>
        </div>
        
        <div>
          <h3 class="text-lg font-bold mb-4">With Wrap</h3>
          <Stack direction="horizontal" spacing="sm" wrap class="w-64 bg-base-200 rounded p-4">
            <div class="bg-primary text-primary-content p-2 rounded whitespace-nowrap">Long Item 1</div>
            <div class="bg-secondary text-secondary-content p-2 rounded whitespace-nowrap">Long Item 2</div>
            <div class="bg-accent text-accent-content p-2 rounded whitespace-nowrap">Long Item 3</div>
            <div class="bg-info text-info-content p-2 rounded whitespace-nowrap">Long Item 4</div>
          </Stack>
        </div>
      </div>
    `,
    }),
}

export const Reverse: Story = {
    render: () => ({
        components: { Stack },
        template: `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 class="text-lg font-bold mb-4">Normal Order (Vertical)</h3>
          <Stack>
            <div class="bg-primary text-primary-content p-3 rounded">First</div>
            <div class="bg-secondary text-secondary-content p-3 rounded">Second</div>
            <div class="bg-accent text-accent-content p-3 rounded">Third</div>
          </Stack>
        </div>
        
        <div>
          <h3 class="text-lg font-bold mb-4">Reverse Order (Vertical)</h3>
          <Stack reverse>
            <div class="bg-primary text-primary-content p-3 rounded">First</div>
            <div class="bg-secondary text-secondary-content p-3 rounded">Second</div>
            <div class="bg-accent text-accent-content p-3 rounded">Third</div>
          </Stack>
        </div>
        
        <div>
          <h3 class="text-lg font-bold mb-4">Normal Order (Horizontal)</h3>
          <Stack direction="horizontal">
            <div class="bg-primary text-primary-content p-3 rounded">First</div>
            <div class="bg-secondary text-secondary-content p-3 rounded">Second</div>
            <div class="bg-accent text-accent-content p-3 rounded">Third</div>
          </Stack>
        </div>
        
        <div>
          <h3 class="text-lg font-bold mb-4">Reverse Order (Horizontal)</h3>
          <Stack direction="horizontal" reverse>
            <div class="bg-primary text-primary-content p-3 rounded">First</div>
            <div class="bg-secondary text-secondary-content p-3 rounded">Second</div>
            <div class="bg-accent text-accent-content p-3 rounded">Third</div>
          </Stack>
        </div>
      </div>
    `,
    }),
}

export const FormLayout: Story = {
    render: () => ({
        components: { Stack },
        template: `
      <div class="max-w-md mx-auto bg-base-100 p-6 rounded-lg shadow-lg">
        <h3 class="text-xl font-bold mb-6">Contact Form</h3>
        
        <Stack spacing="lg">
          <Stack direction="horizontal" spacing="md">
            <div class="flex-1">
              <label class="label">
                <span class="label-text">First Name</span>
              </label>
              <input type="text" class="input input-bordered w-full" placeholder="John" />
            </div>
            <div class="flex-1">
              <label class="label">
                <span class="label-text">Last Name</span>
              </label>
              <input type="text" class="input input-bordered w-full" placeholder="Doe" />
            </div>
          </Stack>
          
          <div>
            <label class="label">
              <span class="label-text">Email</span>
            </label>
            <input type="email" class="input input-bordered w-full" placeholder="john@example.com" />
          </div>
          
          <div>
            <label class="label">
              <span class="label-text">Message</span>
            </label>
            <textarea class="textarea textarea-bordered w-full" rows="4" placeholder="Your message..."></textarea>
          </div>
          
          <Stack direction="horizontal" justify="between" align="center">
            <label class="label cursor-pointer">
              <input type="checkbox" class="checkbox checkbox-sm" />
              <span class="label-text ml-2">Subscribe to newsletter</span>
            </label>
            
            <Stack direction="horizontal" spacing="sm">
              <button class="btn btn-ghost">Cancel</button>
              <button class="btn btn-primary">Send Message</button>
            </Stack>
          </Stack>
        </Stack>
      </div>
    `,
    }),
}

export const CardGrid: Story = {
    render: () => ({
        components: { Stack },
        template: `
      <div>
        <h3 class="text-xl font-bold mb-6 text-center">Product Grid</h3>
        
        <Stack direction="horizontal" wrap spacing="lg" justify="center">
          <div class="card w-64 bg-base-100 shadow-xl">
            <figure class="h-48 bg-primary"></figure>
            <div class="card-body">
              <h4 class="card-title">Product 1</h4>
              <p class="text-sm opacity-70">Description of product 1</p>
              <div class="card-actions justify-end">
                <button class="btn btn-primary btn-sm">Buy Now</button>
              </div>
            </div>
          </div>
          
          <div class="card w-64 bg-base-100 shadow-xl">
            <figure class="h-48 bg-secondary"></figure>
            <div class="card-body">
              <h4 class="card-title">Product 2</h4>
              <p class="text-sm opacity-70">Description of product 2</p>
              <div class="card-actions justify-end">
                <button class="btn btn-primary btn-sm">Buy Now</button>
              </div>
            </div>
          </div>
          
          <div class="card w-64 bg-base-100 shadow-xl">
            <figure class="h-48 bg-accent"></figure>
            <div class="card-body">
              <h4 class="card-title">Product 3</h4>
              <p class="text-sm opacity-70">Description of product 3</p>
              <div class="card-actions justify-end">
                <button class="btn btn-primary btn-sm">Buy Now</button>
              </div>
            </div>
          </div>
          
          <div class="card w-64 bg-base-100 shadow-xl">
            <figure class="h-48 bg-info"></figure>
            <div class="card-body">
              <h4 class="card-title">Product 4</h4>
              <p class="text-sm opacity-70">Description of product 4</p>
              <div class="card-actions justify-end">
                <button class="btn btn-primary btn-sm">Buy Now</button>
              </div>
            </div>
          </div>
        </Stack>
      </div>
    `,
    }),
}

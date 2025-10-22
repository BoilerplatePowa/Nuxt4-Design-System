import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Mask from '../../src/runtime/components/Layout/Mask.vue'

const meta: Meta<typeof Mask> = {
    title: 'Layout/Mask',
    component: Mask,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component:
                    'Mask component that crops content to common shapes using DaisyUI mask classes. Supports various geometric shapes and half-mask modifiers.',
            },
        },
    },
    argTypes: {
        variant: {
            control: { type: 'select' },
            options: [
                'squircle',
                'heart',
                'hexagon',
                'hexagon-2',
                'decagon',
                'pentagon',
                'diamond',
                'square',
                'circle',
                'star',
                'star-2',
                'triangle',
                'triangle-2',
                'triangle-3',
                'triangle-4',
            ],
            description: 'DaisyUI mask shape variant',
        },
        size: {
            control: { type: 'select' },
            options: ['xs', 'sm', 'md', 'lg', 'xl'],
            description: 'Mask size using Tailwind width/height classes',
        },
        isHalf1: {
            control: { type: 'boolean' },
            description: 'Half mask modifier - crops only the first half',
        },
        isHalf2: {
            control: { type: 'boolean' },
            description: 'Half mask modifier - crops only the second half',
        },
        class: {
            control: { type: 'text' },
            description: 'Custom CSS classes',
        },
    },
    args: {
        variant: 'squircle',
        size: 'md',
        isHalf1: false,
        isHalf2: false,
    },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        variant: 'squircle',
        size: 'md',
    },
    render: (args) => ({
        components: { Mask },
        setup() {
            return { args }
        },
        template: `
      <Mask v-bind="args">
        <img src="https://img.daisyui.com/images/stock/photo-1567653418876-5bb0e566e1c2.webp" alt="Masked Image" />
      </Mask>
    `,
    }),
}

export const BasicShapes: Story = {
    render: () => ({
        components: { Mask },
        template: `
      <div class="grid grid-cols-3 gap-8 items-center justify-items-center">
        <div class="text-center">
          <Mask variant="circle">
            <img src="https://img.daisyui.com/images/stock/photo-1567653418876-5bb0e566e1c2.webp" alt="Circle" />
          </Mask>
          <p class="mt-2 text-sm">Circle</p>
        </div>
        
        <div class="text-center">
          <Mask variant="square">
            <img src="https://img.daisyui.com/images/stock/photo-1567653418876-5bb0e566e1c2.webp" alt="Square" />
          </Mask>
          <p class="mt-2 text-sm">Square</p>
        </div>
        
        <div class="text-center">
          <Mask variant="squircle">
            <img src="https://img.daisyui.com/images/stock/photo-1567653418876-5bb0e566e1c2.webp" alt="Squircle" />
          </Mask>
          <p class="mt-2 text-sm">Squircle</p>
        </div>
        
        <div class="text-center">
          <Mask variant="diamond">
            <img src="https://img.daisyui.com/images/stock/photo-1567653418876-5bb0e566e1c2.webp" alt="Diamond" />
          </Mask>
          <p class="mt-2 text-sm">Diamond</p>
        </div>
        
        <div class="text-center">
          <Mask variant="hexagon">
            <img src="https://img.daisyui.com/images/stock/photo-1567653418876-5bb0e566e1c2.webp" alt="Hexagon" />
          </Mask>
          <p class="mt-2 text-sm">Hexagon</p>
        </div>
        
        <div class="text-center">
          <Mask variant="pentagon">
            <img src="https://img.daisyui.com/images/stock/photo-1567653418876-5bb0e566e1c2.webp" alt="Pentagon" />
          </Mask>
          <p class="mt-2 text-sm">Pentagon</p>
        </div>
      </div>
    `,
    }),
}

export const Stars: Story = {
    render: () => ({
        components: { Mask },
        template: `
      <div class="flex gap-8 items-center justify-center">
        <div class="text-center">
          <Mask variant="star">
            <img src="https://img.daisyui.com/images/stock/photo-1567653418876-5bb0e566e1c2.webp" alt="Star" />
          </Mask>
          <p class="mt-2 text-sm">Star</p>
        </div>
        
        <div class="text-center">
          <Mask variant="star-2">
            <img src="https://img.daisyui.com/images/stock/photo-1567653418876-5bb0e566e1c2.webp" alt="Star 2" />
          </Mask>
          <p class="mt-2 text-sm">Star 2</p>
        </div>
        
        <div class="text-center">
          <Mask variant="heart">
            <img src="https://img.daisyui.com/images/stock/photo-1567653418876-5bb0e566e1c2.webp" alt="Heart" />
          </Mask>
          <p class="mt-2 text-sm">Heart</p>
        </div>
      </div>
    `,
    }),
}

export const Triangles: Story = {
    render: () => ({
        components: { Mask },
        template: `
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
        <div class="text-center">
          <Mask variant="triangle">
            <img src="https://img.daisyui.com/images/stock/photo-1567653418876-5bb0e566e1c2.webp" alt="Triangle 1" />
          </Mask>
          <p class="mt-2 text-sm">Triangle</p>
        </div>
        
        <div class="text-center">
          <Mask variant="triangle-2">
            <img src="https://img.daisyui.com/images/stock/photo-1567653418876-5bb0e566e1c2.webp" alt="Triangle 2" />
          </Mask>
          <p class="mt-2 text-sm">Triangle 2</p>
        </div>
        
        <div class="text-center">
          <Mask variant="triangle-3">
            <img src="https://img.daisyui.com/images/stock/photo-1567653418876-5bb0e566e1c2.webp" alt="Triangle 3" />
          </Mask>
          <p class="mt-2 text-sm">Triangle 3</p>
        </div>
        
        <div class="text-center">
          <Mask variant="triangle-4">
            <img src="https://img.daisyui.com/images/stock/photo-1567653418876-5bb0e566e1c2.webp" alt="Triangle 4" />
          </Mask>
          <p class="mt-2 text-sm">Triangle 4</p>
        </div>
      </div>
    `,
    }),
}

export const HalfMasks: Story = {
    render: () => ({
        components: { Mask },
        template: `
      <div class="space-y-8">
        <div class="text-center">
          <h3 class="text-lg font-bold mb-4">Half Mask Modifiers</h3>
          <p class="text-sm opacity-70">Crop only part of the mask shape</p>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
          <div class="text-center">
            <Mask variant="circle" is-half1>
              <img src="https://img.daisyui.com/images/stock/photo-1567653418876-5bb0e566e1c2.webp" alt="Half 1" />
            </Mask>
            <p class="mt-2 text-sm">Circle Half 1</p>
          </div>
          
          <div class="text-center">
            <Mask variant="circle" is-half2>
              <img src="https://img.daisyui.com/images/stock/photo-1567653418876-5bb0e566e1c2.webp" alt="Half 2" />
            </Mask>
            <p class="mt-2 text-sm">Circle Half 2</p>
          </div>
          
          <div class="text-center">
            <Mask variant="star" is-half1>
              <img src="https://img.daisyui.com/images/stock/photo-1567653418876-5bb0e566e1c2.webp" alt="Star Half 1" />
            </Mask>
            <p class="mt-2 text-sm">Star Half 1</p>
          </div>
          
          <div class="text-center">
            <Mask variant="star" is-half2>
              <img src="https://img.daisyui.com/images/stock/photo-1567653418876-5bb0e566e1c2.webp" alt="Star Half 2" />
            </Mask>
            <p class="mt-2 text-sm">Star Half 2</p>
          </div>
        </div>
      </div>
    `,
    }),
}

export const Sizes: Story = {
    render: () => ({
        components: { Mask },
        template: `
      <div class="flex flex-wrap gap-8 items-center justify-center">
        <div class="text-center">
          <Mask variant="circle" size="xs">
            <img src="https://img.daisyui.com/images/stock/photo-1567653418876-5bb0e566e1c2.webp" alt="Extra Small" />
          </Mask>
          <p class="mt-2 text-sm">XS</p>
        </div>
        
        <div class="text-center">
          <Mask variant="circle" size="sm">
            <img src="https://img.daisyui.com/images/stock/photo-1567653418876-5bb0e566e1c2.webp" alt="Small" />
          </Mask>
          <p class="mt-2 text-sm">SM</p>
        </div>
        
        <div class="text-center">
          <Mask variant="circle" size="md">
            <img src="https://img.daisyui.com/images/stock/photo-1567653418876-5bb0e566e1c2.webp" alt="Medium" />
          </Mask>
          <p class="mt-2 text-sm">MD</p>
        </div>
        
        <div class="text-center">
          <Mask variant="circle" size="lg">
            <img src="https://img.daisyui.com/images/stock/photo-1567653418876-5bb0e566e1c2.webp" alt="Large" />
          </Mask>
          <p class="mt-2 text-sm">LG</p>
        </div>
        
        <div class="text-center">
          <Mask variant="circle" size="xl">
            <img src="https://img.daisyui.com/images/stock/photo-1567653418876-5bb0e566e1c2.webp" alt="Extra Large" />
          </Mask>
          <p class="mt-2 text-sm">XL</p>
        </div>
      </div>
    `,
    }),
}

export const ProfileGallery: Story = {
    render: () => ({
        components: { Mask },
        template: `
      <div class="bg-base-200 p-8 rounded-lg">
        <h3 class="text-xl font-bold mb-6 text-center">Team Gallery</h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 justify-items-center">
          <div class="text-center">
            <Mask variant="circle" size="lg">
              <img src="https://img.daisyui.com/images/stock/photo-1567653418876-5bb0e566e1c2.webp" alt="CEO" />
            </Mask>
            <h4 class="mt-2 font-semibold">John Doe</h4>
            <p class="text-sm opacity-70">CEO</p>
          </div>
          
          <div class="text-center">
            <Mask variant="squircle" size="lg">
              <img src="https://img.daisyui.com/images/stock/photo-1567653418876-5bb0e566e1c2.webp" alt="CTO" />
            </Mask>
            <h4 class="mt-2 font-semibold">Jane Smith</h4>
            <p class="text-sm opacity-70">CTO</p>
          </div>
          
          <div class="text-center">
            <Mask variant="hexagon" size="lg">
              <img src="https://img.daisyui.com/images/stock/photo-1567653418876-5bb0e566e1c2.webp" alt="Developer" />
            </Mask>
            <h4 class="mt-2 font-semibold">Bob Johnson</h4>
            <p class="text-sm opacity-70">Lead Developer</p>
          </div>
          
          <div class="text-center">
            <Mask variant="diamond" size="lg">
              <img src="https://img.daisyui.com/images/stock/photo-1567653418876-5bb0e566e1c2.webp" alt="Designer" />
            </Mask>
            <h4 class="mt-2 font-semibold">Alice Wilson</h4>
            <p class="text-sm opacity-70">UX Designer</p>
          </div>
        </div>
      </div>
    `,
    }),
}

export const AllShapes: Story = {
    render: () => ({
        components: { Mask },
        template: `
      <div class="space-y-8">
        <div class="text-center">
          <h3 class="text-xl font-bold mb-6">All Available Shapes</h3>
          <p class="text-sm opacity-70">Complete collection of DaisyUI mask shapes</p>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          <div class="text-center">
            <Mask variant="squircle" size="lg">
              <img src="https://img.daisyui.com/images/stock/photo-1567653418876-5bb0e566e1c2.webp" alt="Squircle" />
            </Mask>
            <p class="mt-2 text-xs">Squircle</p>
          </div>
          
          <div class="text-center">
            <Mask variant="heart" size="lg">
              <img src="https://img.daisyui.com/images/stock/photo-1567653418876-5bb0e566e1c2.webp" alt="Heart" />
            </Mask>
            <p class="mt-2 text-xs">Heart</p>
          </div>
          
          <div class="text-center">
            <Mask variant="hexagon" size="lg">
              <img src="https://img.daisyui.com/images/stock/photo-1567653418876-5bb0e566e1c2.webp" alt="Hexagon" />
            </Mask>
            <p class="mt-2 text-xs">Hexagon</p>
          </div>
          
          <div class="text-center">
            <Mask variant="hexagon-2" size="lg">
              <img src="https://img.daisyui.com/images/stock/photo-1567653418876-5bb0e566e1c2.webp" alt="Hexagon 2" />
            </Mask>
            <p class="mt-2 text-xs">Hexagon 2</p>
          </div>
          
          <div class="text-center">
            <Mask variant="decagon" size="lg">
              <img src="https://img.daisyui.com/images/stock/photo-1567653418876-5bb0e566e1c2.webp" alt="Decagon" />
            </Mask>
            <p class="mt-2 text-xs">Decagon</p>
          </div>
          
          <div class="text-center">
            <Mask variant="pentagon" size="lg">
              <img src="https://img.daisyui.com/images/stock/photo-1567653418876-5bb0e566e1c2.webp" alt="Pentagon" />
            </Mask>
            <p class="mt-2 text-xs">Pentagon</p>
          </div>
          
          <div class="text-center">
            <Mask variant="diamond" size="lg">
              <img src="https://img.daisyui.com/images/stock/photo-1567653418876-5bb0e566e1c2.webp" alt="Diamond" />
            </Mask>
            <p class="mt-2 text-xs">Diamond</p>
          </div>
          
          <div class="text-center">
            <Mask variant="square" size="lg">
              <img src="https://img.daisyui.com/images/stock/photo-1567653418876-5bb0e566e1c2.webp" alt="Square" />
            </Mask>
            <p class="mt-2 text-xs">Square</p>
          </div>
          
          <div class="text-center">
            <Mask variant="circle" size="lg">
              <img src="https://img.daisyui.com/images/stock/photo-1567653418876-5bb0e566e1c2.webp" alt="Circle" />
            </Mask>
            <p class="mt-2 text-xs">Circle</p>
          </div>
          
          <div class="text-center">
            <Mask variant="star" size="lg">
              <img src="https://img.daisyui.com/images/stock/photo-1567653418876-5bb0e566e1c2.webp" alt="Star" />
            </Mask>
            <p class="mt-2 text-xs">Star</p>
          </div>
          
          <div class="text-center">
            <Mask variant="star-2" size="lg">
              <img src="https://img.daisyui.com/images/stock/photo-1567653418876-5bb0e566e1c2.webp" alt="Star 2" />
            </Mask>
            <p class="mt-2 text-xs">Star 2</p>
          </div>
          
          <div class="text-center">
            <Mask variant="triangle" size="lg">
              <img src="https://img.daisyui.com/images/stock/photo-1567653418876-5bb0e566e1c2.webp" alt="Triangle" />
            </Mask>
            <p class="mt-2 text-xs">Triangle</p>
          </div>
          
          <div class="text-center">
            <Mask variant="triangle-2" size="lg">
              <img src="https://img.daisyui.com/images/stock/photo-1567653418876-5bb0e566e1c2.webp" alt="Triangle 2" />
            </Mask>
            <p class="mt-2 text-xs">Triangle 2</p>
          </div>
          
          <div class="text-center">
            <Mask variant="triangle-3" size="lg">
              <img src="https://img.daisyui.com/images/stock/photo-1567653418876-5bb0e566e1c2.webp" alt="Triangle 3" />
            </Mask>
            <p class="mt-2 text-xs">Triangle 3</p>
          </div>
          
          <div class="text-center">
            <Mask variant="triangle-4" size="lg">
              <img src="https://img.daisyui.com/images/stock/photo-1567653418876-5bb0e566e1c2.webp" alt="Triangle 4" />
            </Mask>
            <p class="mt-2 text-xs">Triangle 4</p>
          </div>
        </div>
      </div>
    `,
    }),
}

export const CreativeShowcase: Story = {
    render: () => ({
        components: { Mask },
        template: `
      <div class="space-y-8">
        <div class="text-center">
          <h3 class="text-xl font-bold mb-6">Creative Image Masks</h3>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center bg-base-200 p-6 rounded-lg">
            <Mask variant="star" size="xl">
              <img src="https://img.daisyui.com/images/stock/photo-1567653418876-5bb0e566e1c2.webp" alt="Award" />
            </Mask>
            <h4 class="mt-4 font-bold text-lg">Best Product 2024</h4>
            <p class="text-sm opacity-70">Recognized for excellence</p>
          </div>
          
          <div class="text-center bg-base-200 p-6 rounded-lg">
            <Mask variant="heart" size="xl">
              <img src="https://img.daisyui.com/images/stock/photo-1567653418876-5bb0e566e1c2.webp" alt="Love" />
            </Mask>
            <h4 class="mt-4 font-bold text-lg">Customer Love</h4>
            <p class="text-sm opacity-70">Testimonials & reviews</p>
          </div>
          
          <div class="text-center bg-base-200 p-6 rounded-lg">
            <Mask variant="hexagon-2" size="xl">
              <img src="https://img.daisyui.com/images/stock/photo-1567653418876-5bb0e566e1c2.webp" alt="Technology" />
            </Mask>
            <h4 class="mt-4 font-bold text-lg">Innovation Hub</h4>
            <p class="text-sm opacity-70">Cutting-edge technology</p>
          </div>
        </div>
      </div>
    `,
    }),
}

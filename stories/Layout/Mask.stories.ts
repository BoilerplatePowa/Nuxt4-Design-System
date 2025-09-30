import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Mask from '../../src/runtime/components/Layout/Mask.vue'

const meta: Meta<typeof Mask> = {
    title: 'Layout/Mask',
    component: Mask,
    parameters: {
        layout: 'centered',
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
                'parallelogram',
                'parallelogram-2',
                'parallelogram-3',
                'parallelogram-4',
                'star',
                'star-2',
                'triangle',
                'triangle-2',
                'triangle-3',
                'triangle-4',
            ],
        },
        size: {
            control: { type: 'select' },
            options: ['xs', 'sm', 'md', 'lg', 'xl'],
        },
    },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        variant: 'squircle',
        size: 'md',
    },
    render: args => ({
        components: { Mask },
        setup() {
            return { args }
        },
        template: `
      <Mask v-bind="args">
        <img src="https://via.placeholder.com/200x200/3B82F6/FFFFFF?text=Image" alt="Masked Image" />
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
            <img src="https://via.placeholder.com/120x120/10B981/FFFFFF?text=Circle" alt="Circle" />
          </Mask>
          <p class="mt-2 text-sm">Circle</p>
        </div>
        
        <div class="text-center">
          <Mask variant="square">
            <img src="https://via.placeholder.com/120x120/F59E0B/FFFFFF?text=Square" alt="Square" />
          </Mask>
          <p class="mt-2 text-sm">Square</p>
        </div>
        
        <div class="text-center">
          <Mask variant="squircle">
            <img src="https://via.placeholder.com/120x120/EF4444/FFFFFF?text=Squircle" alt="Squircle" />
          </Mask>
          <p class="mt-2 text-sm">Squircle</p>
        </div>
        
        <div class="text-center">
          <Mask variant="diamond">
            <img src="https://via.placeholder.com/120x120/8B5CF6/FFFFFF?text=Diamond" alt="Diamond" />
          </Mask>
          <p class="mt-2 text-sm">Diamond</p>
        </div>
        
        <div class="text-center">
          <Mask variant="hexagon">
            <img src="https://via.placeholder.com/120x120/06B6D4/FFFFFF?text=Hexagon" alt="Hexagon" />
          </Mask>
          <p class="mt-2 text-sm">Hexagon</p>
        </div>
        
        <div class="text-center">
          <Mask variant="pentagon">
            <img src="https://via.placeholder.com/120x120/EC4899/FFFFFF?text=Pentagon" alt="Pentagon" />
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
            <img src="https://via.placeholder.com/120x120/F59E0B/FFFFFF?text=Star" alt="Star" />
          </Mask>
          <p class="mt-2 text-sm">Star</p>
        </div>
        
        <div class="text-center">
          <Mask variant="star-2">
            <img src="https://via.placeholder.com/120x120/EF4444/FFFFFF?text=Star-2" alt="Star 2" />
          </Mask>
          <p class="mt-2 text-sm">Star 2</p>
        </div>
        
        <div class="text-center">
          <Mask variant="heart">
            <img src="https://via.placeholder.com/120x120/EC4899/FFFFFF?text=Heart" alt="Heart" />
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
            <img src="https://via.placeholder.com/120x120/10B981/FFFFFF?text=T1" alt="Triangle 1" />
          </Mask>
          <p class="mt-2 text-sm">Triangle</p>
        </div>
        
        <div class="text-center">
          <Mask variant="triangle-2">
            <img src="https://via.placeholder.com/120x120/3B82F6/FFFFFF?text=T2" alt="Triangle 2" />
          </Mask>
          <p class="mt-2 text-sm">Triangle 2</p>
        </div>
        
        <div class="text-center">
          <Mask variant="triangle-3">
            <img src="https://via.placeholder.com/120x120/8B5CF6/FFFFFF?text=T3" alt="Triangle 3" />
          </Mask>
          <p class="mt-2 text-sm">Triangle 3</p>
        </div>
        
        <div class="text-center">
          <Mask variant="triangle-4">
            <img src="https://via.placeholder.com/120x120/F59E0B/FFFFFF?text=T4" alt="Triangle 4" />
          </Mask>
          <p class="mt-2 text-sm">Triangle 4</p>
        </div>
      </div>
    `,
    }),
}

export const Parallelograms: Story = {
    render: () => ({
        components: { Mask },
        template: `
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
        <div class="text-center">
          <Mask variant="parallelogram">
            <img src="https://via.placeholder.com/120x120/EF4444/FFFFFF?text=P1" alt="Parallelogram 1" />
          </Mask>
          <p class="mt-2 text-sm">Parallelogram</p>
        </div>
        
        <div class="text-center">
          <Mask variant="parallelogram-2">
            <img src="https://via.placeholder.com/120x120/10B981/FFFFFF?text=P2" alt="Parallelogram 2" />
          </Mask>
          <p class="mt-2 text-sm">Parallelogram 2</p>
        </div>
        
        <div class="text-center">
          <Mask variant="parallelogram-3">
            <img src="https://via.placeholder.com/120x120/3B82F6/FFFFFF?text=P3" alt="Parallelogram 3" />
          </Mask>
          <p class="mt-2 text-sm">Parallelogram 3</p>
        </div>
        
        <div class="text-center">
          <Mask variant="parallelogram-4">
            <img src="https://via.placeholder.com/120x120/8B5CF6/FFFFFF?text=P4" alt="Parallelogram 4" />
          </Mask>
          <p class="mt-2 text-sm">Parallelogram 4</p>
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
            <img src="https://via.placeholder.com/48x48/EF4444/FFFFFF?text=XS" alt="Extra Small" />
          </Mask>
          <p class="mt-2 text-sm">XS</p>
        </div>
        
        <div class="text-center">
          <Mask variant="circle" size="sm">
            <img src="https://via.placeholder.com/64x64/F59E0B/FFFFFF?text=SM" alt="Small" />
          </Mask>
          <p class="mt-2 text-sm">SM</p>
        </div>
        
        <div class="text-center">
          <Mask variant="circle" size="md">
            <img src="https://via.placeholder.com/96x96/10B981/FFFFFF?text=MD" alt="Medium" />
          </Mask>
          <p class="mt-2 text-sm">MD</p>
        </div>
        
        <div class="text-center">
          <Mask variant="circle" size="lg">
            <img src="https://via.placeholder.com/128x128/3B82F6/FFFFFF?text=LG" alt="Large" />
          </Mask>
          <p class="mt-2 text-sm">LG</p>
        </div>
        
        <div class="text-center">
          <Mask variant="circle" size="xl">
            <img src="https://via.placeholder.com/192x192/8B5CF6/FFFFFF?text=XL" alt="Extra Large" />
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
              <img src="https://via.placeholder.com/128x128/3B82F6/FFFFFF?text=CEO" alt="CEO" />
            </Mask>
            <h4 class="mt-2 font-semibold">John Doe</h4>
            <p class="text-sm opacity-70">CEO</p>
          </div>
          
          <div class="text-center">
            <Mask variant="squircle" size="lg">
              <img src="https://via.placeholder.com/128x128/10B981/FFFFFF?text=CTO" alt="CTO" />
            </Mask>
            <h4 class="mt-2 font-semibold">Jane Smith</h4>
            <p class="text-sm opacity-70">CTO</p>
          </div>
          
          <div class="text-center">
            <Mask variant="hexagon" size="lg">
              <img src="https://via.placeholder.com/128x128/F59E0B/FFFFFF?text=DEV" alt="Developer" />
            </Mask>
            <h4 class="mt-2 font-semibold">Bob Johnson</h4>
            <p class="text-sm opacity-70">Lead Developer</p>
          </div>
          
          <div class="text-center">
            <Mask variant="diamond" size="lg">
              <img src="https://via.placeholder.com/128x128/EC4899/FFFFFF?text=UX" alt="Designer" />
            </Mask>
            <h4 class="mt-2 font-semibold">Alice Wilson</h4>
            <p class="text-sm opacity-70">UX Designer</p>
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
              <img src="https://via.placeholder.com/192x192/F59E0B/FFFFFF?text=AWARD" alt="Award" />
            </Mask>
            <h4 class="mt-4 font-bold text-lg">Best Product 2024</h4>
            <p class="text-sm opacity-70">Recognized for excellence</p>
          </div>
          
          <div class="text-center bg-base-200 p-6 rounded-lg">
            <Mask variant="heart" size="xl">
              <img src="https://via.placeholder.com/192x192/EC4899/FFFFFF?text=LOVE" alt="Love" />
            </Mask>
            <h4 class="mt-4 font-bold text-lg">Customer Love</h4>
            <p class="text-sm opacity-70">Testimonials & reviews</p>
          </div>
          
          <div class="text-center bg-base-200 p-6 rounded-lg">
            <Mask variant="hexagon-2" size="xl">
              <img src="https://via.placeholder.com/192x192/8B5CF6/FFFFFF?text=TECH" alt="Technology" />
            </Mask>
            <h4 class="mt-4 font-bold text-lg">Innovation Hub</h4>
            <p class="text-sm opacity-70">Cutting-edge technology</p>
          </div>
        </div>
      </div>
    `,
    }),
}

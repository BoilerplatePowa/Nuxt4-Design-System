import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import Carousel from '../../src/runtime/components/DataDisplay/Carousel.vue'

const meta: Meta<typeof Carousel> = {
  title: 'Data Display/Carousel',
  component: Carousel,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Interactive carousel component for displaying images and content with flexible navigation controls. Supports multiple arrow positions (bottom, sides), pagination types (numbers, dots, line), and style variants for both indicators and arrows. Side arrows are transparent by default and appear on hover. Uses Vue 3.4 defineModel() for v-model support.',
      },
    },
  },
  argTypes: {
    items: {
      control: 'object',
      description: 'Array of carousel items',
    },
    autoplay: {
      control: 'boolean',
      description: 'Enable automatic slide progression',
    },
    autoplayInterval: {
      control: { type: 'number', min: 1000, max: 10000, step: 500 },
      description: 'Autoplay interval in milliseconds',
    },
    showIndicators: {
      control: 'boolean',
      description: 'Show dot indicators',
    },
    showArrows: {
      control: 'boolean',
      description: 'Show navigation arrows',
    },
    loop: {
      control: 'boolean',
      description: 'Enable infinite loop',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'full-width', 'center', 'vertical'],
      description: 'Carousel variant',
    },
    controllerPosition: {
      control: { type: 'select' },
      options: ['bottom', 'sides'],
      description: 'Position of navigation arrows',
    },
    paginationType: {
      control: { type: 'select' },
      options: ['numbers', 'dots', 'line', 'default'],
      description: 'Type of pagination indicators',
    },
    indicatorVariant: {
      control: { type: 'select' },
      options: ['default', 'filled', 'outline', 'ghost', 'link'],
      description: 'Style variant for pagination indicators',
    },
    arrowVariant: {
      control: { type: 'select' },
      options: ['default', 'filled', 'outline', 'ghost', 'link', 'glass'],
      description: 'Style variant for arrow buttons',
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

const imageItems = [
  {
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop',
    alt: 'Mountain landscape',
    value: '1',
  },
  {
    image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=400&fit=crop',
    alt: 'Ocean waves',
    value: '2',
  },
  {
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=400&fit=crop',
    alt: 'Forest path',
    value: '3',
  },
  {
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop',
    alt: 'Desert dunes',
    value: '4',
  },
]

export const Default: Story = {
  args: {
    items: imageItems,
    controllerPosition: 'bottom',
    paginationType: 'dots',
    showIndicators: true,
    showArrows: true,
  },
}

export const WithVModel: Story = {
  args: {
    items: imageItems,
    controllerPosition: 'bottom',
    paginationType: 'dots',
    showIndicators: true,
    showArrows: true,
  },
  render: (args) => ({
    components: { Carousel },
    setup() {
      const currentSlide = ref(0)
      return { args, currentSlide }
    },
    template: `
      <div class="space-y-4">
        <div class="text-center">
          <p class="text-lg">Current slide: {{ currentSlide + 1 }}</p>
          <div class="flex gap-2 justify-center mt-2">
            <button 
              v-for="(item, index) in args.items" 
              :key="index"
              @click="currentSlide = index"
              :class="[
                'btn btn-sm',
                currentSlide === index ? 'btn-primary' : 'btn-outline'
              ]"
            >
              {{ index + 1 }}
            </button>
          </div>
        </div>
        <Carousel 
          v-model="currentSlide"
          v-bind="args"
          @slide-change="(index) => console.log('Slide changed to:', index + 1)"
        />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates v-model usage with the carousel. The current slide is controlled by the parent component and can be changed via the buttons above the carousel.',
      },
    },
  },
}

export const Autoplay: Story = {
  args: {
    items: imageItems,
    autoplay: true,
    autoplayInterval: 3000,
    showIndicators: true,
    showArrows: true,
  },
}

export const NoControls: Story = {
  args: {
    items: imageItems,
    showIndicators: false,
    showArrows: false,
  },
}

export const SideControls: Story = {
  args: {
    items: imageItems,
    controllerPosition: 'sides',
    showIndicators: true,
    showArrows: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Side arrows are transparent by default and appear when hovering over the carousel. They span the full height of the carousel.',
      },
    },
  },
}

export const NumbersPagination: Story = {
  args: {
    items: imageItems,
    paginationType: 'numbers',
    showIndicators: true,
    showArrows: true,
  },
}

export const DotsPagination: Story = {
  args: {
    items: imageItems,
    paginationType: 'dots',
    showIndicators: true,
    showArrows: true,
  },
}

export const LinePagination: Story = {
  args: {
    items: imageItems,
    paginationType: 'line',
    showIndicators: true,
    showArrows: true,
  },
}

export const InfiniteLoop: Story = {
  args: {
    items: imageItems,
    loop: true,
    showIndicators: true,
    showArrows: true,
  },
}

export const ProductShowcase: Story = {
  args: {
    items: [
      {
        value: '1',
        content: `
          <div class="flex flex-col items-center p-8 bg-gradient-to-br from-blue-50 to-indigo-100">
            <div class="w-32 h-32 bg-blue-500 rounded-full mb-4 flex items-center justify-center text-white text-4xl">
              📱
            </div>
            <h3 class="text-2xl font-bold mb-2">Smartphone</h3>
            <p class="text-gray-600 text-center">Latest technology with amazing features</p>
            <div class="text-3xl font-bold text-blue-600 mt-4">$699</div>
          </div>
        `,
      },
      {
        value: '2',
        content: `
          <div class="flex flex-col items-center p-8 bg-gradient-to-br from-green-50 to-emerald-100">
            <div class="w-32 h-32 bg-green-500 rounded-full mb-4 flex items-center justify-center text-white text-4xl">
              💻
            </div>
            <h3 class="text-2xl font-bold mb-2">Laptop</h3>
            <p class="text-gray-600 text-center">Powerful performance for work and play</p>
            <div class="text-3xl font-bold text-green-600 mt-4">$1,299</div>
          </div>
        `,
      },
      {
        value: '3',
        content: `
          <div class="flex flex-col items-center p-8 bg-gradient-to-br from-purple-50 to-violet-100">
            <div class="w-32 h-32 bg-purple-500 rounded-full mb-4 flex items-center justify-center text-white text-4xl">
              🎧
            </div>
            <h3 class="text-2xl font-bold mb-2">Headphones</h3>
            <p class="text-gray-600 text-center">Premium sound quality and comfort</p>
            <div class="text-3xl font-bold text-purple-600 mt-4">$199</div>
          </div>
        `,
      },
    ],
    showIndicators: true,
    showArrows: true,
  },
}

export const ProductShowcaseWithSideControls: Story = {
  args: {
    items: [
      {
        value: '1',
        content: `
          <div class="flex flex-col items-center p-8 bg-gradient-to-br from-blue-50 to-indigo-100">
            <div class="w-32 h-32 bg-blue-500 rounded-full mb-4 flex items-center justify-center text-white text-4xl">
              📱
            </div>
            <h3 class="text-2xl font-bold mb-2">Smartphone</h3>
            <p class="text-gray-600 text-center">Latest technology with amazing features</p>
            <div class="text-3xl font-bold text-blue-600 mt-4">$699</div>
          </div>
        `,
      },
      {
        value: '2',
        content: `
          <div class="flex flex-col items-center p-8 bg-gradient-to-br from-green-50 to-emerald-100">
            <div class="w-32 h-32 bg-green-500 rounded-full mb-4 flex items-center justify-center text-white text-4xl">
              💻
            </div>
            <h3 class="text-2xl font-bold mb-2">Laptop</h3>
            <p class="text-gray-600 text-center">Powerful performance for work and play</p>
            <div class="text-3xl font-bold text-green-600 mt-4">$1,299</div>
          </div>
        `,
      },
      {
        value: '3',
        content: `
          <div class="flex flex-col items-center p-8 bg-gradient-to-br from-purple-50 to-violet-100">
            <div class="w-32 h-32 bg-purple-500 rounded-full mb-4 flex items-center justify-center text-white text-4xl">
              🎧
            </div>
            <h3 class="text-2xl font-bold mb-2">Headphones</h3>
            <p class="text-gray-600 text-center">Premium sound quality and comfort</p>
            <div class="text-3xl font-bold text-purple-600 mt-4">$199</div>
          </div>
        `,
      },
    ],
    controllerPosition: 'sides',
    paginationType: 'dots',
    showIndicators: true,
    showArrows: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Product showcase with side controls. Hover over the carousel to see the transparent arrows appear.',
      },
    },
  },
}

export const TestimonialCarousel: Story = {
  args: {
    items: [
      {
        value: '1',
        content: `
          <div class="text-center p-8 max-w-md mx-auto">
            <div class="text-4xl mb-4">⭐⭐⭐⭐⭐</div>
            <p class="text-lg italic mb-6">"This product exceeded my expectations. Highly recommended!"</p>
            <div class="flex items-center justify-center">
              <div class="w-12 h-12 bg-blue-500 rounded-full mr-4"></div>
              <div>
                <div class="font-semibold">Sarah Johnson</div>
                <div class="text-sm text-gray-500">Verified Customer</div>
              </div>
            </div>
          </div>
        `,
      },
      {
        value: '2',
        content: `
          <div class="text-center p-8 max-w-md mx-auto">
            <div class="text-4xl mb-4">⭐⭐⭐⭐⭐</div>
            <p class="text-lg italic mb-6">"Amazing customer service and fast delivery!"</p>
            <div class="flex items-center justify-center">
              <div class="w-12 h-12 bg-green-500 rounded-full mr-4"></div>
              <div>
                <div class="font-semibold">Mike Chen</div>
                <div class="text-sm text-gray-500">Happy Customer</div>
              </div>
            </div>
          </div>
        `,
      },
      {
        value: '3',
        content: `
          <div class="text-center p-8 max-w-md mx-auto">
            <div class="text-4xl mb-4">⭐⭐⭐⭐⭐</div>
            <p class="text-lg italic mb-6">"Best purchase I've made this year!"</p>
            <div class="flex items-center justify-center">
              <div class="w-12 h-12 bg-purple-500 rounded-full mr-4"></div>
              <div>
                <div class="font-semibold">Emily Davis</div>
                <div class="text-sm text-gray-500">Regular Customer</div>
              </div>
            </div>
          </div>
        `,
      },
    ],
    autoplay: true,
    autoplayInterval: 4000,
    showIndicators: true,
    showArrows: false,
  },
}

export const FilledIndicators: Story = {
  args: {
    items: imageItems,
    indicatorVariant: 'filled',
    showIndicators: true,
    showArrows: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Carousel with filled indicator style - active indicators are primary colored, inactive ones are base-200.',
      },
    },
  },
}

export const OutlineIndicators: Story = {
  args: {
    items: imageItems,
    indicatorVariant: 'outline',
    showIndicators: true,
    showArrows: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Carousel with outline indicator style - all indicators have outlines, active ones are primary colored.',
      },
    },
  },
}

export const GhostIndicators: Story = {
  args: {
    items: imageItems,
    indicatorVariant: 'ghost',
    showIndicators: true,
    showArrows: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Carousel with ghost indicator style - subtle indicators that become primary colored when active.',
      },
    },
  },
}

export const LinkIndicators: Story = {
  args: {
    items: imageItems,
    indicatorVariant: 'link',
    showIndicators: true,
    showArrows: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Carousel with link indicator style - indicators look like links, active ones are primary colored.',
      },
    },
  },
}

export const FilledArrows: Story = {
  args: {
    items: imageItems,
    arrowVariant: 'filled',
    showIndicators: true,
    showArrows: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Carousel with filled arrow buttons - primary colored buttons.',
      },
    },
  },
}

export const OutlineArrows: Story = {
  args: {
    items: imageItems,
    arrowVariant: 'outline',
    showIndicators: true,
    showArrows: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Carousel with outline arrow buttons - outlined buttons with transparent background.',
      },
    },
  },
}

export const GhostArrows: Story = {
  args: {
    items: imageItems,
    arrowVariant: 'ghost',
    showIndicators: true,
    showArrows: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Carousel with ghost arrow buttons - subtle buttons that become more visible on hover.',
      },
    },
  },
}

export const GlassArrows: Story = {
  args: {
    items: imageItems,
    arrowVariant: 'glass',
    showIndicators: true,
    showArrows: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Carousel with glass arrow buttons - translucent buttons with blur effect.',
      },
    },
  },
}

export const CombinedVariants: Story = {
  args: {
    items: imageItems,
    indicatorVariant: 'filled',
    arrowVariant: 'glass',
    controllerPosition: 'sides',
    showIndicators: true,
    showArrows: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Carousel combining different variants - filled indicators with glass arrows and side controls.',
      },
    },
  },
}

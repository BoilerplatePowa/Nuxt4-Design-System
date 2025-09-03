import type { Meta, StoryObj } from '@storybook/vue3-vite';
import PhoneMockup from './PhoneMockup.vue';

const meta: Meta<typeof PhoneMockup> = {
  title: 'Mockup/PhoneMockup',
  component: PhoneMockup,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Mobile device mockup component for showcasing mobile apps and responsive designs.',
      },
    },
  },
  argTypes: {
    color: {
      control: { type: 'select' },
      options: ['black', 'white', 'gold', 'silver'],
      description: 'Phone frame color',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Phone mockup size',
    },
    variant: {
      control: { type: 'select' },
      options: ['iphone', 'android', 'modern'],
      description: 'Phone style variant',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    color: 'black',
    size: 'md',
  },
  render: args => ({
    components: { PhoneMockup },
    setup() {
      return { args };
    },
    template: `
      <PhoneMockup v-bind="args">
        <div class="bg-gradient-to-br from-blue-500 to-purple-600 h-full flex items-center justify-center text-white">
          <div class="text-center">
            <h3 class="text-2xl font-bold mb-2">My App</h3>
            <p class="text-sm opacity-80">Welcome Screen</p>
          </div>
        </div>
      </PhoneMockup>
    `,
  }),
};

export const AppInterface: Story = {
  args: {
    color: 'white',
    size: 'lg',
  },
  render: args => ({
    components: { PhoneMockup },
    setup() {
      return { args };
    },
    template: `
      <PhoneMockup v-bind="args">
        <div class="bg-white h-full flex flex-col">
          <!-- Status Bar -->
          <div class="bg-gray-900 text-white text-xs p-2 flex justify-between">
            <span>9:41</span>
            <span>100%</span>
          </div>
          
          <!-- Header -->
          <div class="bg-blue-600 text-white p-4 flex items-center">
            <button class="mr-3">←</button>
            <h1 class="text-lg font-semibold">Messages</h1>
            <div class="ml-auto">⋮</div>
          </div>
          
          <!-- Content -->
          <div class="flex-1 p-4 space-y-3 overflow-y-auto">
            <div class="flex items-start space-x-2">
              <div class="w-8 h-8 bg-blue-500 rounded-full flex-shrink-0"></div>
              <div class="bg-gray-100 rounded-lg p-2 max-w-xs">
                <p class="text-sm">Hey! How's it going?</p>
                <span class="text-xs text-gray-500">2:30 PM</span>
              </div>
            </div>
            
            <div class="flex items-start space-x-2 justify-end">
              <div class="bg-blue-500 text-white rounded-lg p-2 max-w-xs">
                <p class="text-sm">Great! Just finished the presentation.</p>
                <span class="text-xs opacity-70">2:32 PM</span>
              </div>
              <div class="w-8 h-8 bg-green-500 rounded-full flex-shrink-0"></div>
            </div>
            
            <div class="flex items-start space-x-2">
              <div class="w-8 h-8 bg-blue-500 rounded-full flex-shrink-0"></div>
              <div class="bg-gray-100 rounded-lg p-2 max-w-xs">
                <p class="text-sm">Awesome! Can't wait to see it 🎉</p>
                <span class="text-xs text-gray-500">2:33 PM</span>
              </div>
            </div>
          </div>
          
          <!-- Input -->
          <div class="p-4 border-t flex items-center space-x-2">
            <input type="text" placeholder="Type a message..." class="flex-1 border rounded-full px-3 py-2 text-sm" />
            <button class="bg-blue-500 text-white rounded-full p-2">→</button>
          </div>
        </div>
      </PhoneMockup>
    `,
  }),
};

export const MusicPlayer: Story = {
  args: {
    color: 'black',
    size: 'md',
  },
  render: args => ({
    components: { PhoneMockup },
    setup() {
      return { args };
    },
    template: `
      <PhoneMockup v-bind="args">
        <div class="bg-gradient-to-b from-purple-900 via-blue-900 to-indigo-900 h-full text-white flex flex-col">
          <!-- Header -->
          <div class="p-4 flex items-center justify-between">
            <button>←</button>
            <span class="text-sm font-medium">Now Playing</span>
            <button>⋮</button>
          </div>
          
          <!-- Album Art -->
          <div class="flex-1 flex items-center justify-center p-8">
            <div class="w-64 h-64 bg-gradient-to-br from-pink-500 to-orange-500 rounded-2xl shadow-2xl flex items-center justify-center">
              <div class="text-6xl">🎵</div>
            </div>
          </div>
          
          <!-- Song Info -->
          <div class="p-6 text-center">
            <h2 class="text-xl font-bold mb-1">Midnight Dreams</h2>
            <p class="text-gray-300 text-sm mb-4">The Cosmic Band</p>
            
            <!-- Progress -->
            <div class="mb-6">
              <div class="w-full bg-gray-600 rounded-full h-1 mb-2">
                <div class="bg-white h-1 rounded-full" style="width: 45%"></div>
              </div>
              <div class="flex justify-between text-xs text-gray-400">
                <span>1:23</span>
                <span>3:45</span>
              </div>
            </div>
            
            <!-- Controls -->
            <div class="flex items-center justify-center space-x-8">
              <button class="text-2xl">⏮</button>
              <button class="bg-white text-black rounded-full w-16 h-16 flex items-center justify-center text-2xl">⏸</button>
              <button class="text-2xl">⏭</button>
            </div>
          </div>
        </div>
      </PhoneMockup>
    `,
  }),
};

export const ECommerceApp: Story = {
  args: {
    color: 'white',
    size: 'md',
  },
  render: args => ({
    components: { PhoneMockup },
    setup() {
      return { args };
    },
    template: `
      <PhoneMockup v-bind="args">
        <div class="bg-white h-full flex flex-col">
          <!-- Header -->
          <div class="bg-white shadow-sm p-4 flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-orange-500 rounded-lg"></div>
              <span class="font-bold text-lg">Shop</span>
            </div>
            <div class="flex items-center space-x-2">
              <button>🔍</button>
              <button>🛒</button>
            </div>
          </div>
          
          <!-- Search -->
          <div class="p-4">
            <div class="bg-gray-100 rounded-lg p-3 flex items-center">
              <span class="mr-2">🔍</span>
              <span class="text-gray-500 text-sm">Search products...</span>
            </div>
          </div>
          
          <!-- Categories -->
          <div class="px-4 mb-4">
            <div class="flex space-x-3 overflow-x-auto">
              <div class="bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm whitespace-nowrap">Electronics</div>
              <div class="bg-gray-100 text-gray-600 px-4 py-2 rounded-full text-sm whitespace-nowrap">Fashion</div>
              <div class="bg-gray-100 text-gray-600 px-4 py-2 rounded-full text-sm whitespace-nowrap">Home</div>
            </div>
          </div>
          
          <!-- Products -->
          <div class="flex-1 px-4 space-y-4 overflow-y-auto">
            <div class="bg-white rounded-lg shadow-sm border p-3">
              <div class="flex space-x-3">
                <div class="w-20 h-20 bg-gray-200 rounded-lg"></div>
                <div class="flex-1">
                  <h3 class="font-semibold text-sm mb-1">Wireless Headphones</h3>
                  <p class="text-gray-500 text-xs mb-2">Premium sound quality</p>
                  <div class="flex items-center justify-between">
                    <span class="text-orange-600 font-bold">$99.99</span>
                    <button class="bg-orange-500 text-white px-3 py-1 rounded text-xs">Add</button>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="bg-white rounded-lg shadow-sm border p-3">
              <div class="flex space-x-3">
                <div class="w-20 h-20 bg-gray-200 rounded-lg"></div>
                <div class="flex-1">
                  <h3 class="font-semibold text-sm mb-1">Smart Watch</h3>
                  <p class="text-gray-500 text-xs mb-2">Fitness tracking & more</p>
                  <div class="flex items-center justify-between">
                    <span class="text-orange-600 font-bold">$199.99</span>
                    <button class="bg-orange-500 text-white px-3 py-1 rounded text-xs">Add</button>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="bg-white rounded-lg shadow-sm border p-3">
              <div class="flex space-x-3">
                <div class="w-20 h-20 bg-gray-200 rounded-lg"></div>
                <div class="flex-1">
                  <h3 class="font-semibold text-sm mb-1">Laptop Stand</h3>
                  <p class="text-gray-500 text-xs mb-2">Ergonomic design</p>
                  <div class="flex items-center justify-between">
                    <span class="text-orange-600 font-bold">$49.99</span>
                    <button class="bg-orange-500 text-white px-3 py-1 rounded text-xs">Add</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Bottom Navigation -->
          <div class="bg-white border-t flex justify-around py-2">
            <button class="flex flex-col items-center p-2 text-orange-500">
              <span class="text-lg">🏠</span>
              <span class="text-xs">Home</span>
            </button>
            <button class="flex flex-col items-center p-2 text-gray-400">
              <span class="text-lg">🔍</span>
              <span class="text-xs">Search</span>
            </button>
            <button class="flex flex-col items-center p-2 text-gray-400">
              <span class="text-lg">❤️</span>
              <span class="text-xs">Wishlist</span>
            </button>
            <button class="flex flex-col items-center p-2 text-gray-400">
              <span class="text-lg">👤</span>
              <span class="text-xs">Profile</span>
            </button>
          </div>
        </div>
      </PhoneMockup>
    `,
  }),
};

export const DifferentSizes: Story = {
  render: () => ({
    components: { PhoneMockup },
    template: `
      <div class="flex items-end justify-center space-x-8">
        <PhoneMockup size="sm" color="black">
          <div class="bg-blue-500 h-full flex items-center justify-center text-white">
            <div class="text-center">
              <div class="text-xl">📱</div>
              <div class="text-xs mt-1">Small</div>
            </div>
          </div>
        </PhoneMockup>
        
        <PhoneMockup size="md" color="white">
          <div class="bg-green-500 h-full flex items-center justify-center text-white">
            <div class="text-center">
              <div class="text-2xl">📱</div>
              <div class="text-sm mt-1">Medium</div>
            </div>
          </div>
        </PhoneMockup>
        
        <PhoneMockup size="lg" color="gold">
          <div class="bg-purple-500 h-full flex items-center justify-center text-white">
            <div class="text-center">
              <div class="text-3xl">📱</div>
              <div class="text-base mt-1">Large</div>
            </div>
          </div>
        </PhoneMockup>
      </div>
    `,
  }),
};

export const Colors: Story = {
  render: () => ({
    components: { PhoneMockup },
    template: `
      <div class="flex items-center justify-center space-x-6">
        <PhoneMockup color="black">
          <div class="bg-gray-900 h-full flex items-center justify-center text-white">
            <div class="text-center">
              <div class="text-2xl mb-2">⚫</div>
              <div class="text-sm">Black</div>
            </div>
          </div>
        </PhoneMockup>
        
        <PhoneMockup color="white">
          <div class="bg-gray-100 h-full flex items-center justify-center text-gray-800">
            <div class="text-center">
              <div class="text-2xl mb-2">⚪</div>
              <div class="text-sm">White</div>
            </div>
          </div>
        </PhoneMockup>
        
        <PhoneMockup color="gold">
          <div class="bg-yellow-400 h-full flex items-center justify-center text-yellow-900">
            <div class="text-center">
              <div class="text-2xl mb-2">🟡</div>
              <div class="text-sm">Gold</div>
            </div>
          </div>
        </PhoneMockup>
        
        <PhoneMockup color="silver">
          <div class="bg-gray-300 h-full flex items-center justify-center text-gray-700">
            <div class="text-center">
              <div class="text-2xl mb-2">⚪</div>
              <div class="text-sm">Silver</div>
            </div>
          </div>
        </PhoneMockup>
      </div>
    `,
  }),
};

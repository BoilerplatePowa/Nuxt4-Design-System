import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Hero from './Hero.vue';

const meta: Meta<typeof Hero> = {
  title: 'Layout/Hero',
  component: Hero,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Hero section component for creating impactful landing page headers with customizable layouts.',
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Main hero title',
    },
    subtitle: {
      control: 'text',
      description: 'Hero subtitle or description',
    },
    backgroundImage: {
      control: 'text',
      description: 'Background image URL',
    },
    overlay: {
      control: 'boolean',
      description: 'Add dark overlay for better text readability',
    },
    minHeight: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl', 'screen'],
      description: 'Hero section height',
    },
    overlayOpacity: {
      control: { type: 'select' },
      options: ['light', 'medium', 'dark'],
      description: 'Overlay opacity level',
    },
    textColor: {
      control: { type: 'select' },
      options: ['default', 'neutral', 'primary', 'white'],
      description: 'Text color theme',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Welcome to Our Platform',
    subtitle: 'Discover amazing features and build something great',
    minHeight: 'lg',
  },
};

export const WithBackground: Story = {
  args: {
    title: 'Adventure Awaits',
    subtitle: 'Explore the world with our comprehensive travel guides and booking platform',
    backgroundImage:
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop',
    overlay: true,
    minHeight: 'xl',
  },
};

export const Gradient: Story = {
  args: {
    title: 'Build the Future',
    subtitle: 'Join thousands of developers creating amazing applications',
    minHeight: 'lg',
  },
};

export const WithActions: Story = {
  render: args => ({
    components: { Hero },
    setup() {
      return { args };
    },
    template: `
      <Hero v-bind="args">
        <template #actions>
          <div class="flex flex-col sm:flex-row gap-4">
            <button class="btn btn-primary btn-lg">Get Started</button>
            <button class="btn btn-outline btn-lg">Learn More</button>
          </div>
        </template>
      </Hero>
    `,
  }),
  args: {
    title: 'Ready to Transform Your Business?',
    subtitle: 'Our platform helps you streamline operations and boost productivity',
    minHeight: 'lg',
  },
};

export const LeftAligned: Story = {
  render: args => ({
    components: { Hero },
    setup() {
      return { args };
    },
    template: `
      <Hero v-bind="args">
        <template #actions>
          <div class="flex flex-col sm:flex-row gap-4">
            <button class="btn btn-primary btn-lg">Start Free Trial</button>
            <button class="btn btn-ghost btn-lg">Watch Demo</button>
          </div>
        </template>
      </Hero>
    `,
  }),
  args: {
    title: 'Powerful Analytics for Modern Teams',
    subtitle:
      'Make data-driven decisions with our comprehensive analytics platform. Track performance, understand your users, and grow your business.',
    minHeight: 'lg',
  },
};

export const Minimal: Story = {
  render: args => ({
    components: { Hero },
    setup() {
      return { args };
    },
    template: `
      <Hero v-bind="args">
        <template #actions>
          <div class="flex items-center gap-6">
            <button class="btn btn-primary">Sign Up</button>
            <a href="#" class="link">Already have an account?</a>
          </div>
        </template>
      </Hero>
    `,
  }),
  args: {
    title: 'Simple. Powerful. Effective.',
    subtitle: 'The easiest way to manage your projects',
    minHeight: 'md',
  },
};

export const ProductLaunch: Story = {
  render: args => ({
    components: { Hero },
    setup() {
      return { args };
    },
    template: `
      <Hero v-bind="args">
        <template #content>
          <div class="text-center max-w-4xl mx-auto">
            <div class="badge badge-primary badge-lg mb-6">🚀 Now Available</div>
            <h1 class="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {{ args.title }}
            </h1>
            <p class="text-xl md:text-2xl mb-8 opacity-80">
              {{ args.subtitle }}
            </p>
            
            <div class="flex flex-col md:flex-row items-center justify-center gap-6 mb-8">
              <div class="stat text-center">
                <div class="stat-value text-primary">10K+</div>
                <div class="stat-desc">Active Users</div>
              </div>
              <div class="stat text-center">
                <div class="stat-value text-secondary">99.9%</div>
                <div class="stat-desc">Uptime</div>
              </div>
              <div class="stat text-center">
                <div class="stat-value text-accent">24/7</div>
                <div class="stat-desc">Support</div>
              </div>
            </div>
            
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <button class="btn btn-primary btn-lg">
                Try Free for 30 Days
              </button>
              <button class="btn btn-outline btn-lg">
                Schedule Demo
              </button>
            </div>
            
            <div class="mt-8 text-sm opacity-60">
              No credit card required • Cancel anytime
            </div>
          </div>
        </template>
      </Hero>
    `,
  }),
  args: {
    title: 'NextGen Platform',
    subtitle: 'The all-in-one solution for modern businesses',
    minHeight: 'xl',
  },
};

export const AppShowcase: Story = {
  render: args => ({
    components: { Hero },
    setup() {
      return { args };
    },
    template: `
      <Hero v-bind="args">
        <template #content>
          <div class="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div class="text-left">
              <h1 class="text-4xl md:text-6xl font-bold mb-6">
                {{ args.title }}
              </h1>
              <p class="text-lg md:text-xl mb-8 opacity-80">
                {{ args.subtitle }}
              </p>
              
              <div class="flex flex-col sm:flex-row gap-4 mb-8">
                <button class="btn btn-primary btn-lg">
                  Download App
                </button>
                <button class="btn btn-outline btn-lg">
                  View Features
                </button>
              </div>
              
              <div class="flex items-center gap-6">
                <div class="rating rating-sm">
                  <span class="text-yellow-500">★★★★★</span>
                </div>
                <span class="text-sm">4.9/5 from 2,000+ reviews</span>
              </div>
            </div>
            
            <div class="relative">
              <div class="mockup-phone">
                <div class="camera"></div>
                <div class="display">
                  <div class="artboard artboard-demo phone-1 bg-gradient-to-br from-primary to-secondary">
                    <div class="text-center text-white p-8">
                      <h3 class="text-2xl font-bold mb-4">Mobile App</h3>
                      <div class="space-y-4">
                        <div class="progress progress-secondary w-full"></div>
                        <div class="grid grid-cols-2 gap-4">
                          <div class="card bg-white/20 p-4">
                            <div class="text-2xl">📊</div>
                          </div>
                          <div class="card bg-white/20 p-4">
                            <div class="text-2xl">📈</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </Hero>
    `,
  }),
  args: {
    title: 'Your Productivity Companion',
    subtitle: 'Manage tasks, track time, and collaborate with your team from anywhere',
    minHeight: 'xl',
  },
};

export const SplitLayout: Story = {
  render: args => ({
    components: { Hero },
    setup() {
      return { args };
    },
    template: `
      <Hero v-bind="args">
        <template #content>
          <div class="grid lg:grid-cols-2 gap-8 items-center min-h-screen">
            <div class="order-2 lg:order-1">
              <h1 class="text-4xl md:text-5xl font-bold mb-6">
                {{ args.title }}
              </h1>
              <p class="text-lg mb-8 opacity-80">
                {{ args.subtitle }}
              </p>
              
              <div class="space-y-4 mb-8">
                <div class="flex items-center gap-3">
                  <div class="w-6 h-6 bg-success rounded-full flex items-center justify-center">
                    <span class="text-white text-xs">✓</span>
                  </div>
                  <span>Real-time collaboration</span>
                </div>
                <div class="flex items-center gap-3">
                  <div class="w-6 h-6 bg-success rounded-full flex items-center justify-center">
                    <span class="text-white text-xs">✓</span>
                  </div>
                  <span>Advanced security</span>
                </div>
                <div class="flex items-center gap-3">
                  <div class="w-6 h-6 bg-success rounded-full flex items-center justify-center">
                    <span class="text-white text-xs">✓</span>
                  </div>
                  <span>24/7 customer support</span>
                </div>
              </div>
              
              <div class="flex flex-col sm:flex-row gap-4">
                <button class="btn btn-primary btn-lg">Start Now</button>
                <button class="btn btn-ghost btn-lg">Contact Sales</button>
              </div>
            </div>
            
            <div class="order-1 lg:order-2">
              <div class="bg-gradient-to-br from-primary to-secondary p-8 rounded-2xl">
                <div class="space-y-6">
                  <div class="flex items-center gap-4">
                    <div class="avatar">
                      <div class="w-12 rounded-full bg-white/20"></div>
                    </div>
                    <div class="flex-1">
                      <div class="h-4 bg-white/30 rounded mb-2"></div>
                      <div class="h-3 bg-white/20 rounded w-2/3"></div>
                    </div>
                  </div>
                  
                  <div class="grid grid-cols-2 gap-4">
                    <div class="bg-white/20 p-4 rounded-lg">
                      <div class="h-8 bg-white/30 rounded mb-2"></div>
                      <div class="h-3 bg-white/20 rounded"></div>
                    </div>
                    <div class="bg-white/20 p-4 rounded-lg">
                      <div class="h-8 bg-white/30 rounded mb-2"></div>
                      <div class="h-3 bg-white/20 rounded"></div>
                    </div>
                  </div>
                  
                  <div class="bg-white/20 p-4 rounded-lg">
                    <div class="flex justify-between items-center mb-4">
                      <div class="h-4 bg-white/30 rounded w-1/3"></div>
                      <div class="h-4 bg-white/30 rounded w-1/4"></div>
                    </div>
                    <div class="progress progress-secondary"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </Hero>
    `,
  }),
  args: {
    title: 'Transform Your Workflow',
    subtitle:
      'Streamline processes, increase efficiency, and deliver better results with our comprehensive business solution.',
    minHeight: 'lg',
  },
};

import type { Meta, StoryObj } from '@storybook/vue3-vite';
import RadialProgress from './RadialProgress.vue';

const meta: Meta<typeof RadialProgress> = {
  title: 'Feedback/RadialProgress',
  component: RadialProgress,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    value: {
      control: { type: 'number', min: 0, max: 100 },
    },
    max: {
      control: { type: 'number' },
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    thickness: {
      control: { type: 'select' },
      options: ['thin', 'normal', 'thick'],
    },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error'],
    },
    showValue: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 70,
  },
};

export const Sizes: Story = {
  render: () => ({
    components: { RadialProgress },
    template: `
      <div class="flex flex-wrap gap-8 items-center justify-center">
        <div class="text-center">
          <RadialProgress :value="25" size="xs" />
          <p class="mt-2 text-sm">XS</p>
        </div>
        
        <div class="text-center">
          <RadialProgress :value="50" size="sm" />
          <p class="mt-2 text-sm">SM</p>
        </div>
        
        <div class="text-center">
          <RadialProgress :value="75" size="md" />
          <p class="mt-2 text-sm">MD</p>
        </div>
        
        <div class="text-center">
          <RadialProgress :value="85" size="lg" />
          <p class="mt-2 text-sm">LG</p>
        </div>
        
        <div class="text-center">
          <RadialProgress :value="95" size="xl" />
          <p class="mt-2 text-sm">XL</p>
        </div>
      </div>
    `,
  }),
};

export const Colors: Story = {
  render: () => ({
    components: { RadialProgress },
    template: `
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
        <div class="text-center">
          <RadialProgress :value="70" variant="primary" />
          <p class="mt-2 text-sm">Primary</p>
        </div>
        
        <div class="text-center">
          <RadialProgress :value="70" variant="secondary" />
          <p class="mt-2 text-sm">Secondary</p>
        </div>
        
        <div class="text-center">
          <RadialProgress :value="70" variant="accent" />
          <p class="mt-2 text-sm">Accent</p>
        </div>
        
        <div class="text-center">
          <RadialProgress :value="70" variant="info" />
          <p class="mt-2 text-sm">Info</p>
        </div>
        
        <div class="text-center">
          <RadialProgress :value="70" variant="success" />
          <p class="mt-2 text-sm">Success</p>
        </div>
        
        <div class="text-center">
          <RadialProgress :value="70" variant="warning" />
          <p class="mt-2 text-sm">Warning</p>
        </div>
        
        <div class="text-center">
          <RadialProgress :value="70" variant="error" />
          <p class="mt-2 text-sm">Error</p>
        </div>
      </div>
    `,
  }),
};

export const Thickness: Story = {
  render: () => ({
    components: { RadialProgress },
    template: `
      <div class="flex gap-8 items-center justify-center">
        <div class="text-center">
          <RadialProgress :value="60" thickness="thin" variant="primary" />
          <p class="mt-2 text-sm">Thin</p>
        </div>
        
        <div class="text-center">
          <RadialProgress :value="60" thickness="normal" variant="secondary" />
          <p class="mt-2 text-sm">Normal</p>
        </div>
        
        <div class="text-center">
          <RadialProgress :value="60" thickness="thick" variant="accent" />
          <p class="mt-2 text-sm">Thick</p>
        </div>
      </div>
    `,
  }),
};

export const CustomContent: Story = {
  render: () => ({
    components: { RadialProgress },
    template: `
      <div class="flex flex-wrap gap-8 items-center justify-center">
        <div class="text-center">
          <RadialProgress :value="85" variant="success" :show-value="false">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </RadialProgress>
          <p class="mt-2 text-sm">Complete</p>
        </div>
        
        <div class="text-center">
          <RadialProgress :value="45" variant="warning" :show-value="false">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </RadialProgress>
          <p class="mt-2 text-sm">In Progress</p>
        </div>
        
        <div class="text-center">
          <RadialProgress :value="15" variant="error" :show-value="false">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </RadialProgress>
          <p class="mt-2 text-sm">Failed</p>
        </div>
        
        <div class="text-center">
          <RadialProgress :value="92" variant="primary" :show-value="false">
            <div class="text-xs font-bold">A+</div>
          </RadialProgress>
          <p class="mt-2 text-sm">Grade</p>
        </div>
      </div>
    `,
  }),
};

export const WithLabels: Story = {
  render: () => ({
    components: { RadialProgress },
    template: `
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="text-center">
          <RadialProgress 
            :value="68" 
            variant="success" 
            label="CPU Usage"
            size="lg"
          />
        </div>
        
        <div class="text-center">
          <RadialProgress 
            :value="42" 
            variant="info" 
            label="Memory Usage"
            size="lg"
          />
        </div>
        
        <div class="text-center">
          <RadialProgress 
            :value="89" 
            variant="warning" 
            label="Disk Usage"
            size="lg"
          />
        </div>
      </div>
    `,
  }),
};

export const Dashboard: Story = {
  render: () => ({
    components: { RadialProgress },
    template: `
      <div class="bg-base-200 p-8 rounded-lg">
        <h3 class="text-xl font-bold mb-6">System Dashboard</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <!-- Server Performance -->
          <div class="bg-base-100 p-6 rounded-lg text-center">
            <RadialProgress 
              :value="92" 
              variant="success" 
              size="lg"
              label="Server Health"
            />
            <div class="mt-4">
              <p class="text-sm opacity-70">All systems operational</p>
            </div>
          </div>
          
          <!-- Load Average -->
          <div class="bg-base-100 p-6 rounded-lg text-center">
            <RadialProgress 
              :value="65" 
              variant="warning" 
              size="lg"
              label="Load Average"
            />
            <div class="mt-4">
              <p class="text-sm opacity-70">Moderate load detected</p>
            </div>
          </div>
          
          <!-- Storage -->
          <div class="bg-base-100 p-6 rounded-lg text-center">
            <RadialProgress 
              :value="38" 
              variant="info" 
              size="lg"
              label="Storage Used"
            />
            <div class="mt-4">
              <p class="text-sm opacity-70">623 GB of 1.6 TB used</p>
            </div>
          </div>
          
          <!-- Network -->
          <div class="bg-base-100 p-6 rounded-lg text-center">
            <RadialProgress 
              :value="15" 
              variant="accent" 
              size="lg"
              label="Network Usage"
            />
            <div class="mt-4">
              <p class="text-sm opacity-70">Low network activity</p>
            </div>
          </div>
        </div>
        
        <!-- Skills Progress -->
        <div class="mt-8">
          <h4 class="text-lg font-bold mb-4">Learning Progress</h4>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div class="text-center">
              <RadialProgress :value="85" variant="primary" size="md" />
              <p class="mt-2 text-sm font-medium">Vue.js</p>
            </div>
            
            <div class="text-center">
              <RadialProgress :value="72" variant="secondary" size="md" />
              <p class="mt-2 text-sm font-medium">TypeScript</p>
            </div>
            
            <div class="text-center">
              <RadialProgress :value="90" variant="accent" size="md" />
              <p class="mt-2 text-sm font-medium">CSS</p>
            </div>
            
            <div class="text-center">
              <RadialProgress :value="58" variant="info" size="md" />
              <p class="mt-2 text-sm font-medium">Node.js</p>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
};

export const AnimatedProgress: Story = {
  render: () => ({
    components: { RadialProgress },
    data() {
      return {
        progress: 0,
        interval: null,
      };
    },
    mounted() {
      this.startAnimation();
    },
    beforeUnmount() {
      if (this.interval) {
        clearInterval(this.interval);
      }
    },
    methods: {
      startAnimation() {
        this.interval = setInterval(() => {
          this.progress += 1;
          if (this.progress > 100) {
            this.progress = 0;
          }
        }, 50);
      },
    },
    template: `
      <div class="text-center">
        <h3 class="text-lg font-bold mb-6">Animated Progress</h3>
        
        <div class="flex gap-8 items-center justify-center">
          <div class="text-center">
            <RadialProgress 
              :value="progress" 
              variant="primary" 
              size="lg"
            />
            <p class="mt-2 text-sm">Loading...</p>
          </div>
          
          <div class="text-center">
            <RadialProgress 
              :value="(progress + 25) % 100" 
              variant="secondary" 
              size="lg"
            />
            <p class="mt-2 text-sm">Processing...</p>
          </div>
          
          <div class="text-center">
            <RadialProgress 
              :value="(progress + 50) % 100" 
              variant="accent" 
              size="lg"
            />
            <p class="mt-2 text-sm">Uploading...</p>
          </div>
        </div>
        
        <button 
          @click="startAnimation" 
          class="btn btn-primary mt-6"
        >
          Restart Animation
        </button>
      </div>
    `,
  }),
};

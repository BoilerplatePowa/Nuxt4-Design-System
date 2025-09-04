import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Label from '../../src/runtime/components/DataInput/Label.vue';

const meta: Meta<typeof Label> = {
  title: 'Data Input/Label',
  component: Label,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    tag: {
      control: { type: 'select' },
      options: ['label', 'div', 'span'],
    },
    cursor: {
      control: { type: 'select' },
      options: ['default', 'pointer', 'not-allowed'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    required: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: 'Default Label',
  },
};

export const WithAltText: Story = {
  args: {
    text: 'Email address',
    altText: 'Required',
  },
};

export const FormLabels: Story = {
  render: () => ({
    components: { Label },
    template: `
      <div class="space-y-4 max-w-md">
        <div class="form-control">
          <Label text="Name" html-for="name" />
          <input id="name" type="text" class="input input-bordered" placeholder="Enter your name" />
        </div>
        
        <div class="form-control">
          <Label text="Email" alt-text="Required" html-for="email" />
          <input id="email" type="email" class="input input-bordered" placeholder="Enter your email" />
        </div>
        
        <div class="form-control">
          <Label text="Message" alt-text="Optional" html-for="message" />
          <textarea id="message" class="textarea textarea-bordered" placeholder="Enter your message"></textarea>
        </div>
        
        <div class="form-control">
          <Label cursor="pointer" html-for="newsletter">
            <input id="newsletter" type="checkbox" class="checkbox" />
            <span class="label-text ml-2">Subscribe to newsletter</span>
          </Label>
        </div>
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    components: { Label },
    template: `
      <div class="space-y-4">
        <div class="form-control">
          <Label text="Small Label" alt-text="Size: sm" size="sm" />
          <input type="text" class="input input-bordered input-sm" placeholder="Small input" />
        </div>
        
        <div class="form-control">
          <Label text="Medium Label" alt-text="Size: md" size="md" />
          <input type="text" class="input input-bordered" placeholder="Medium input" />
        </div>
        
        <div class="form-control">
          <Label text="Large Label" alt-text="Size: lg" size="lg" />
          <input type="text" class="input input-bordered input-lg" placeholder="Large input" />
        </div>
      </div>
    `,
  }),
};

export const WithSlots: Story = {
  render: () => ({
    components: { Label },
    template: `
      <div class="space-y-4 max-w-md">
        <div class="form-control">
          <Label>
            <template #start>
              <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </template>
            <span class="label-text ml-2">Username</span>
            <template #end>
              <span class="label-text-alt text-red-500">*</span>
            </template>
          </Label>
          <input type="text" class="input input-bordered" placeholder="Enter username" />
        </div>
        
        <div class="form-control">
          <Label>
            <template #start>
              <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </template>
            <span class="label-text ml-2">Password</span>
            <template #end>
              <span class="label-text-alt">
                <a href="#" class="text-blue-500 hover:underline">Forgot?</a>
              </span>
            </template>
          </Label>
          <input type="password" class="input input-bordered" placeholder="Enter password" />
        </div>
      </div>
    `,
  }),
};

export const CheckboxLabels: Story = {
  render: () => ({
    components: { Label },
    data() {
      return {
        preferences: {
          emails: false,
          sms: true,
          push: false,
        },
      };
    },
    template: `
      <div class="space-y-4">
        <h3 class="text-lg font-bold">Notification Preferences</h3>
        
        <div class="space-y-2">
          <Label cursor="pointer">
            <input 
              type="checkbox" 
              class="checkbox" 
              v-model="preferences.emails"
            />
            <span class="label-text ml-2">Email notifications</span>
            <span class="label-text-alt">Daily digest</span>
          </Label>
          
          <Label cursor="pointer">
            <input 
              type="checkbox" 
              class="checkbox" 
              v-model="preferences.sms"
            />
            <span class="label-text ml-2">SMS notifications</span>
            <span class="label-text-alt">Important only</span>
          </Label>
          
          <Label cursor="pointer">
            <input 
              type="checkbox" 
              class="checkbox" 
              v-model="preferences.push"
            />
            <span class="label-text ml-2">Push notifications</span>
            <span class="label-text-alt">Real-time</span>
          </Label>
        </div>
        
        <div class="mt-4 p-4 bg-base-200 rounded">
          <h4 class="font-semibold">Current Settings:</h4>
          <pre>{{ JSON.stringify(preferences, null, 2) }}</pre>
        </div>
      </div>
    `,
  }),
};

export const RadioLabels: Story = {
  render: () => ({
    components: { Label },
    data() {
      return {
        plan: 'basic',
      };
    },
    template: `
      <div class="space-y-4">
        <h3 class="text-lg font-bold">Choose Your Plan</h3>
        
        <div class="space-y-2">
          <Label cursor="pointer">
            <input 
              type="radio" 
              name="plan" 
              value="free" 
              class="radio" 
              v-model="plan"
            />
            <span class="label-text ml-2">Free Plan</span>
            <span class="label-text-alt">$0/month</span>
          </Label>
          
          <Label cursor="pointer">
            <input 
              type="radio" 
              name="plan" 
              value="basic" 
              class="radio" 
              v-model="plan"
            />
            <span class="label-text ml-2">Basic Plan</span>
            <span class="label-text-alt">$9/month</span>
          </Label>
          
          <Label cursor="pointer">
            <input 
              type="radio" 
              name="plan" 
              value="pro" 
              class="radio" 
              v-model="plan"
            />
            <span class="label-text ml-2">Pro Plan</span>
            <span class="label-text-alt">$29/month</span>
          </Label>
        </div>
        
        <div class="mt-4 p-4 bg-base-200 rounded">
          <p><strong>Selected plan:</strong> {{ plan }}</p>
        </div>
      </div>
    `,
  }),
};

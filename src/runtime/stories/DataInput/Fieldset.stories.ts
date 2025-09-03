import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Fieldset from './Fieldset.vue';
import Input from './Input.vue';
import Select from './Select.vue';

const meta: Meta<typeof Fieldset> = {
  title: 'Data Input/Fieldset',
  component: Fieldset,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'bordered', 'outlined', 'filled'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    disabled: {
      control: { type: 'boolean' },
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
    legend: 'Personal Information',
    description: 'Please provide your basic details',
  },
  render: args => ({
    components: { Fieldset, Input },
    setup() {
      return { args };
    },
    template: `
      <Fieldset v-bind="args">
        <div class="grid grid-cols-2 gap-4">
          <Input
            label="First Name"
            placeholder="John"
            variant="bordered"
          />
          
          <Input
            label="Last Name"
            placeholder="Doe"
            variant="bordered"
          />
          
          <Input
            label="Email"
            type="email"
            placeholder="john@example.com"
            variant="bordered"
            class="col-span-2"
          />
        </div>
      </Fieldset>
    `,
  }),
};

export const Bordered: Story = {
  args: {
    legend: 'Contact Information',
    variant: 'bordered',
  },
  render: args => ({
    components: { Fieldset, Input },
    setup() {
      return { args };
    },
    template: `
      <Fieldset v-bind="args">
        <Input
          label="Phone"
          type="tel"
          placeholder="+1 (555) 123-4567"
          variant="bordered"
        />
      </Fieldset>
    `,
  }),
};

export const Outlined: Story = {
  args: {
    legend: 'Preferences',
    variant: 'outlined',
  },
  render: args => ({
    components: { Fieldset },
    setup() {
      return { args };
    },
    template: `
      <Fieldset v-bind="args">
        <div class="space-y-2">
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" class="checkbox" />
            <span>Email notifications</span>
          </label>
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" class="checkbox" />
            <span>SMS notifications</span>
          </label>
        </div>
      </Fieldset>
    `,
  }),
};

export const Filled: Story = {
  args: {
    legend: 'Settings',
    variant: 'filled',
  },
  render: args => ({
    components: { Fieldset, Select },
    setup() {
      return { args };
    },
    template: `
      <Fieldset v-bind="args">
        <Select
          label="Theme"
          :options="[
            { label: 'Light', value: 'light' },
            { label: 'Dark', value: 'dark' },
            { label: 'Auto', value: 'auto' }
          ]"
          variant="bordered"
        />
      </Fieldset>
    `,
  }),
};

export const Small: Story = {
  args: {
    legend: 'Quick Info',
    size: 'sm',
    variant: 'bordered',
  },
  render: args => ({
    components: { Fieldset, Input },
    setup() {
      return { args };
    },
    template: `
      <Fieldset v-bind="args">
        <Input
          label="Name"
          placeholder="Enter name"
          size="sm"
          variant="bordered"
        />
      </Fieldset>
    `,
  }),
};

export const Large: Story = {
  args: {
    legend: 'Detailed Information',
    size: 'lg',
    variant: 'bordered',
  },
  render: args => ({
    components: { Fieldset, Input },
    setup() {
      return { args };
    },
    template: `
      <Fieldset v-bind="args">
        <Input
          label="Name"
          placeholder="Enter name"
          size="lg"
          variant="bordered"
        />
      </Fieldset>
    `,
  }),
};

export const WithError: Story = {
  args: {
    legend: 'Payment Information',
    variant: 'bordered',
    error: 'Please correct the errors below',
    required: true,
  },
  render: args => ({
    components: { Fieldset, Input },
    setup() {
      return { args };
    },
    template: `
      <Fieldset v-bind="args">
        <div class="grid grid-cols-2 gap-4">
          <Input
            label="Card Number"
            placeholder="1234 5678 9012 3456"
            variant="bordered"
            errorMessage="Invalid card number"
          />
          
          <Input
            label="Expiry Date"
            placeholder="MM/YY"
            variant="bordered"
          />
        </div>
      </Fieldset>
    `,
  }),
};

export const Disabled: Story = {
  args: {
    legend: 'Account Settings',
    variant: 'bordered',
    disabled: true,
    description: 'These settings are currently locked',
  },
  render: args => ({
    components: { Fieldset, Input, Select },
    setup() {
      return { args };
    },
    template: `
      <Fieldset v-bind="args">
        <div class="space-y-4">
          <Input
            label="Username"
            :model-value="'john_doe'"
            variant="bordered"
            disabled
          />
          
          <Select
            label="Role"
            :options="[
              { label: 'Administrator', value: 'admin' },
              { label: 'User', value: 'user' },
              { label: 'Guest', value: 'guest' }
            ]"
            :model-value="'admin'"
            variant="bordered"
            disabled
          />
        </div>
      </Fieldset>
    `,
  }),
};

export const WithCustomSlots: Story = {
  args: {
    variant: 'bordered',
  },
  render: args => ({
    components: { Fieldset, Input },
    setup() {
      return { args };
    },
    template: `
      <Fieldset v-bind="args">
        <template #legend>
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span class="font-semibold">User Account</span>
            <span class="badge badge-primary badge-sm">Required</span>
          </div>
        </template>
        
        <div class="space-y-4">
          <Input
            label="Username"
            placeholder="Enter username"
            variant="bordered"
          />
          
          <Input
            label="Password"
            type="password"
            placeholder="Enter password"
            variant="bordered"
          />
        </div>
        
        <template #description>
          <div class="flex items-start gap-2">
            <svg class="w-4 h-4 text-info mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span class="text-sm opacity-70">
              Your password should be at least 8 characters long and include both letters and numbers.
            </span>
          </div>
        </template>
      </Fieldset>
    `,
  }),
};

export const Nested: Story = {
  args: {
    legend: 'User Profile',
    variant: 'bordered',
    size: 'lg',
  },
  render: args => ({
    components: { Fieldset, Input },
    setup() {
      return { args };
    },
    template: `
      <div class="max-w-2xl">
        <Fieldset v-bind="args">
          <Fieldset legend="Personal Details" variant="outlined" size="md">
            <div class="grid grid-cols-2 gap-4">
              <Input
                label="First Name"
                placeholder="John"
                variant="bordered"
              />
              <Input
                label="Last Name"
                placeholder="Doe"
                variant="bordered"
              />
            </div>
          </Fieldset>
          
          <Fieldset legend="Contact Information" variant="outlined" size="md">
            <div class="space-y-4">
              <Input
                label="Email"
                type="email"
                placeholder="john@example.com"
                variant="bordered"
              />
              <Input
                label="Phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                variant="bordered"
              />
            </div>
          </Fieldset>
        </Fieldset>
      </div>
    `,
  }),
};

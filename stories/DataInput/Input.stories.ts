import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { Form, Field } from 'vee-validate';
import * as yup from 'yup';
import Input from '../../src/runtime/components/DataInput/Input.vue';

const meta: Meta<typeof Input> = {
  title: 'Data Input/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
      description: 'Field name for VeeValidate',
    },
    label: {
      control: 'text',
      description: 'Input label',
    },
    placeholder: {
      control: 'text',
      description: 'Input placeholder text',
    },
    helpText: {
      control: 'text',
      description: 'Help text displayed below the input',
    },
    type: {
      control: 'select',
      options: [
        'text',
        'email',
        'password',
        'url',
        'tel',
        'number',
        'search',
        'date',
        'time',
        'datetime-local',
        'month',
        'week',
      ],
      description: 'Input type',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Input size',
    },
    variant: {
      control: 'select',
      options: [
        'bordered',
        'ghost',
        'primary',
        'secondary',
        'accent',
        'info',
        'success',
        'warning',
        'error',
        'neutral',
      ],
      description: 'Input variant/style',
    },
    leftIcon: {
      control: 'select',
      options: [
        'search',
        'mail',
        'phone',
        'user',
        'lock',
        'eye',
        'eye-off',
        'calendar',
        'map-pin',
        'settings',
      ],
      description: 'Left icon name',
    },
    rightIcon: {
      control: 'select',
      options: [
        'search',
        'mail',
        'phone',
        'user',
        'lock',
        'eye',
        'eye-off',
        'calendar',
        'map-pin',
        'settings',
      ],
      description: 'Right icon name',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
    readonly: {
      control: 'boolean',
      description: 'Whether the input is readonly',
    },
    required: {
      control: 'boolean',
      description: 'Whether the input is required',
    },
    maxlength: {
      control: 'number',
      description: 'Maximum character length',
    },
    showCharCount: {
      control: 'boolean',
      description: 'Show character count',
    },
    rules: {
      control: 'object',
      description: 'Yup validation rules',
    },
    mask: {
      control: 'object',
      description: 'IMask configuration object',
    },
    maskType: {
      control: 'select',
      options: [
        'phone',
        'credit-card',
        'date',
        'time',
        'currency',
        'number',
        'email',
        'zip',
        'ssn',
      ],
      description: 'Predefined mask type',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic input
export const Default: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    type: 'email',
    required: true,
    rules: yup.string().email('Please enter a valid email').required('Email is required'),
  },
};

// Input with icon
export const WithIcon: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search...',
    type: 'search',
    leftIcon: 'search',
  },
};

// Input with validation
export const WithValidation: Story = {
  render: args => ({
    components: { Input, Form, Field },
    setup() {
      const schema = yup.object({
        email: yup.string().email('Please enter a valid email').required('Email is required'),
        password: yup
          .string()
          .min(8, 'Password must be at least 8 characters')
          .required('Password is required'),
      });

      return { args, schema };
    },
    template: `
      <Form :validation-schema="schema" v-slot="{ handleSubmit }">
        <form @submit="handleSubmit" class="space-y-4 w-80">
          <Input
            name="email"
            label="Email"
            placeholder="Enter your email"
            type="email"
            left-icon="mail"
            required
          />
          <Input
            name="password"
            label="Password"
            placeholder="Enter your password"
            type="password"
            left-icon="lock"
            right-icon="eye"
            required
          />
          <button type="submit" class="btn btn-primary w-full">Submit</button>
        </form>
      </Form>
    `,
  }),
};

// Input with inline rules
export const WithInlineRules: Story = {
  render: () => ({
    components: { Input },
    setup() {
      const emailRules = yup
        .string()
        .email('Please enter a valid email')
        .required('Email is required');
      const passwordRules = yup
        .string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required');
      const phoneRules = yup
        .string()
        .matches(/^\+?[\d\s-()]+$/, 'Please enter a valid phone number');

      return { emailRules, passwordRules, phoneRules };
    },
    template: `
      <div class="space-y-4 w-80">
        <Input
          name="email"
          label="Email"
          placeholder="Enter your email"
          type="email"
          left-icon="mail"
          :rules="emailRules"
        />
        <Input
          name="password"
          label="Password"
          placeholder="Enter your password"
          type="password"
          left-icon="lock"
          :rules="passwordRules"
        />
        <Input
          name="phone"
          label="Phone"
          placeholder="+1 (555) 123-4567"
          type="tel"
          left-icon="phone"
          :rules="phoneRules"
        />
      </div>
    `,
  }),
};

// Different sizes
export const Sizes: Story = {
  render: () => ({
    components: { Input },
    template: `
      <div class="space-y-4 w-80">
        <Input label="Extra Small" placeholder="xs size" size="xs" />
        <Input label="Small" placeholder="sm size" size="sm" />
        <Input label="Medium" placeholder="md size" size="md" />
        <Input label="Large" placeholder="lg size" size="lg" />
        <Input label="Extra Large" placeholder="xl size" size="xl" />
      </div>
    `,
  }),
};

// Different variants
export const Variants: Story = {
  render: () => ({
    components: { Input },
    template: `
      <div class="space-y-4 w-80">
        <Input label="Bordered" placeholder="bordered variant" variant="bordered" />
        <Input label="Ghost" placeholder="ghost variant" variant="ghost" />
        <Input label="Primary" placeholder="primary variant" variant="primary" />
        <Input label="Secondary" placeholder="secondary variant" variant="secondary" />
        <Input label="Accent" placeholder="accent variant" variant="accent" />
        <Input label="Info" placeholder="info variant" variant="info" />
        <Input label="Success" placeholder="success variant" variant="success" />
        <Input label="Warning" placeholder="warning variant" variant="warning" />
        <Input label="Error" placeholder="error variant" variant="error" />
        <Input label="Neutral" placeholder="neutral variant" variant="neutral" />
      </div>
    `,
  }),
};

// Input with character count
export const WithCharacterCount: Story = {
  args: {
    label: 'Description',
    placeholder: 'Enter description',
    maxlength: 100,
    showCharCount: true,
  },
};

// Disabled and readonly states
export const States: Story = {
  render: () => ({
    components: { Input },
    template: `
      <div class="space-y-4 w-80">
        <Input label="Normal" placeholder="normal input" />
        <Input label="Disabled" placeholder="disabled input" disabled />
        <Input label="Readonly" placeholder="readonly input" readonly />
      </div>
    `,
  }),
};

// Password input with toggle visibility
export const PasswordWithToggle: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    type: 'password',
    leftIcon: 'lock',
    required: true,
    helpText: 'Click the eye icon to toggle password visibility',
    rules: yup
      .string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
  },
};

// Phone number with mask
export const PhoneWithMask: Story = {
  args: {
    label: 'Phone Number',
    placeholder: 'Enter phone number',
    type: 'tel',
    leftIcon: 'phone',
    maskType: 'phone',
    required: true,
    helpText: 'Format: +1(555)123-4567',
  },
};

// Credit card with mask
export const CreditCardWithMask: Story = {
  args: {
    label: 'Credit Card',
    placeholder: 'Enter card number',
    type: 'text',
    leftIcon: 'credit-card',
    maskType: 'credit-card',
    required: true,
    helpText: 'Format: 1234 5678 9012 3456',
  },
};

// Date with mask
export const DateWithMask: Story = {
  args: {
    label: 'Date',
    placeholder: 'MM/DD/YYYY',
    type: 'text',
    leftIcon: 'calendar',
    maskType: 'date',
    required: true,
    helpText: 'Format: MM/DD/YYYY',
  },
};

// Currency with mask
export const CurrencyWithMask: Story = {
  args: {
    label: 'Amount',
    placeholder: '0.00',
    type: 'text',
    leftIcon: 'dollar-sign',
    maskType: 'currency',
    required: true,
    helpText: 'Enter amount in dollars',
  },
};

// Different input types
export const InputTypes: Story = {
  render: () => ({
    components: { Input },
    template: `
      <div class="space-y-4 w-80">
        <Input label="Text" placeholder="text input" type="text" />
        <Input label="Email" placeholder="email@example.com" type="email" left-icon="mail" />
        <Input label="Password" placeholder="password" type="password" left-icon="lock" />
        <Input label="URL" placeholder="https://example.com" type="url" left-icon="link" />
        <Input label="Phone" placeholder="+1 (555) 123-4567" type="tel" left-icon="phone" />
        <Input label="Number" placeholder="123" type="number" />
        <Input label="Search" placeholder="search..." type="search" left-icon="search" />
        <Input label="Date" type="date" />
        <Input label="Time" type="time" />
      </div>
    `,
  }),
};

// All mask types example
export const AllMaskTypes: Story = {
  render: () => ({
    components: { Input },
    template: `
      <div class="space-y-4 w-80">
        <Input label="Phone Number" placeholder="+1(555)123-4567" mask-type="phone" left-icon="phone" />
        <Input label="Credit Card" placeholder="1234 5678 9012 3456" mask-type="credit-card" left-icon="credit-card" />
        <Input label="Date" placeholder="MM/DD/YYYY" mask-type="date" left-icon="calendar" />
        <Input label="Time" placeholder="HH:MM" mask-type="time" left-icon="clock" />
        <Input label="Currency" placeholder="0.00" mask-type="currency" left-icon="dollar-sign" />
        <Input label="Number" placeholder="1,234" mask-type="number" left-icon="hash" />
        <Input label="ZIP Code" placeholder="12345-6789" mask-type="zip" left-icon="map-pin" />
        <Input label="SSN" placeholder="123-45-6789" mask-type="ssn" left-icon="user" />
      </div>
    `,
  }),
};

// Complex form example
export const ComplexForm: Story = {
  render: () => ({
    components: { Input, Form, Field },
    setup() {
      const schema = yup.object({
        firstName: yup.string().required('First name is required'),
        lastName: yup.string().required('Last name is required'),
        email: yup.string().email('Please enter a valid email').required('Email is required'),
        phone: yup.string().matches(/^\+?[\d\s-()]+$/, 'Please enter a valid phone number'),
        website: yup.string().url('Please enter a valid URL'),
        bio: yup.string().max(200, 'Bio must be less than 200 characters'),
      });

      return { schema };
    },
    template: `
      <Form :validation-schema="schema" v-slot="{ handleSubmit }">
        <form @submit="handleSubmit" class="space-y-4 w-96">
          <div class="grid grid-cols-2 gap-4">
            <Input
              name="firstName"
              label="First Name"
              placeholder="John"
              left-icon="user"
              required
            />
            <Input
              name="lastName"
              label="Last Name"
              placeholder="Doe"
              left-icon="user"
              required
            />
          </div>
          
          <Input
            name="email"
            label="Email"
            placeholder="john.doe@example.com"
            type="email"
            left-icon="mail"
            required
          />
          
          <Input
            name="phone"
            label="Phone"
            placeholder="+1 (555) 123-4567"
            type="tel"
            left-icon="phone"
          />
          
          <Input
            name="website"
            label="Website"
            placeholder="https://example.com"
            type="url"
            left-icon="link"
          />
          
          <Input
            name="bio"
            label="Bio"
            placeholder="Tell us about yourself..."
            :maxlength="200"
            show-char-count
          />
          
          <button type="submit" class="btn btn-primary w-full">Submit</button>
        </form>
      </Form>
    `,
  }),
};

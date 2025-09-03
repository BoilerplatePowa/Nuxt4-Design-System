import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import Validator from './Validator.vue';

const meta: Meta<typeof Validator> = {
  title: 'Data Input/Validator',
  component: Validator,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A comprehensive form input component with built-in validation, custom rules, and visual feedback.',
      },
    },
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'url', 'tel', 'number', 'textarea'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: 'select',
      options: ['default', 'bordered', 'ghost', 'filled'],
    },
    validateOnInput: {
      control: 'boolean',
    },
    validateOnBlur: {
      control: 'boolean',
    },
    showValidationIcon: {
      control: 'boolean',
    },
    showCharCount: {
      control: 'boolean',
    },
    showSummary: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter your username',
    required: true,
    minLength: 3,
    helperText: 'Username must be at least 3 characters',
  },
  render: args => ({
    components: { Validator },
    setup() {
      const value = ref('');
      return { args, value };
    },
    template: `
      <div class="w-80">
        <Validator v-bind="args" v-model="value" />
        <p class="text-sm mt-2 opacity-60">Value: {{ value }}</p>
      </div>
    `,
  }),
};

export const EmailValidation: Story = {
  args: {
    type: 'email',
    label: 'Email Address',
    placeholder: 'user@example.com',
    required: true,
    email: true,
    successMessage: 'Email format is valid!',
    showValidationIcon: true,
    validateOnBlur: true,
  },
  render: args => ({
    components: { Validator },
    setup() {
      const value = ref('');
      return { args, value };
    },
    template: `
      <div class="w-80">
        <Validator v-bind="args" v-model="value" />
      </div>
    `,
  }),
};

export const PasswordValidation: Story = {
  args: {
    type: 'password',
    label: 'Password',
    placeholder: 'Enter a secure password',
    required: true,
    minLength: 8,
    helperText: 'Password must be at least 8 characters with special characters',
    showValidationIcon: true,
    showSummary: true,
  },
  render: args => ({
    components: { Validator },
    setup() {
      const value = ref('');

      const customRules = [
        {
          name: 'uppercase',
          test: (val: string) => /[A-Z]/.test(val),
          message: 'Must contain at least one uppercase letter',
        },
        {
          name: 'number',
          test: (val: string) => /\d/.test(val),
          message: 'Must contain at least one number',
        },
        {
          name: 'special',
          test: (val: string) => /[!@#$%^&*(),.?":{}|<>]/.test(val),
          message: 'Must contain at least one special character',
        },
      ];

      return { args: { ...args, rules: customRules }, value };
    },
    template: `
      <div class="w-80">
        <Validator v-bind="args" v-model="value" />
      </div>
    `,
  }),
};

export const TextareaWithCount: Story = {
  args: {
    type: 'textarea',
    label: 'Description',
    placeholder: 'Enter your description...',
    maxLength: 200,
    rows: 4,
    showCharCount: true,
    helperText: 'Describe your project in detail',
    validateOnInput: true,
  },
  render: args => ({
    components: { Validator },
    setup() {
      const value = ref('');
      return { args, value };
    },
    template: `
      <div class="w-80">
        <Validator v-bind="args" v-model="value" />
      </div>
    `,
  }),
};

export const CustomValidation: Story = {
  args: {
    label: 'Product Code',
    placeholder: 'PRD-XXXX-YYYY',
    required: true,
    helperText: 'Product code format: PRD-XXXX-YYYY',
    showValidationIcon: true,
    successMessage: 'Valid product code!',
  },
  render: args => ({
    components: { Validator },
    setup() {
      const value = ref('');

      const customValidator = (val: string) => {
        if (!val) return null;
        const pattern = /^PRD-[A-Z0-9]{4}-[A-Z0-9]{4}$/;
        return pattern.test(val) ? null : 'Invalid product code format';
      };

      return { args: { ...args, customValidator }, value };
    },
    template: `
      <div class="w-80">
        <Validator v-bind="args" v-model="value" />
      </div>
    `,
  }),
};

export const DifferentSizes: Story = {
  render: () => ({
    components: { Validator },
    setup() {
      const values = ref({ sm: '', md: '', lg: '' });
      return { values };
    },
    template: `
      <div class="space-y-4 w-80">
        <Validator 
          v-model="values.sm"
          size="sm" 
          label="Small Size" 
          placeholder="Small input"
          required
        />
        <Validator 
          v-model="values.md"
          size="md" 
          label="Medium Size" 
          placeholder="Medium input"
          required
        />
        <Validator 
          v-model="values.lg"
          size="lg" 
          label="Large Size" 
          placeholder="Large input"
          required
        />
      </div>
    `,
  }),
};

export const ValidationStates: Story = {
  render: () => ({
    components: { Validator },
    setup() {
      const values = ref({
        success: 'valid@email.com',
        error: 'invalid-email',
        pending: '',
      });

      return { values };
    },
    template: `
      <div class="space-y-4 w-80">
        <Validator 
          v-model="values.success"
          type="email"
          label="Success State" 
          email
          :validate-on-blur="false"
          success-message="Email is valid!"
          show-validation-icon
        />
        <Validator 
          v-model="values.error"
          type="email"
          label="Error State" 
          email
          :validate-on-blur="false"
          show-validation-icon
        />
        <Validator 
          v-model="values.pending"
          label="Pending State" 
          placeholder="Start typing..."
          required
          helper-text="This field is required"
        />
      </div>
    `,
  }),
};

export const Variants: Story = {
  render: () => ({
    components: { Validator },
    setup() {
      const values = ref({
        default: '',
        bordered: '',
        ghost: '',
        filled: '',
      });
      return { values };
    },
    template: `
      <div class="space-y-4 w-80">
        <Validator 
          v-model="values.default"
          variant="default"
          label="Default Variant" 
          placeholder="Default style"
          required
        />
        <Validator 
          v-model="values.bordered"
          variant="bordered"
          label="Bordered Variant" 
          placeholder="Bordered style"
          required
        />
        <Validator 
          v-model="values.ghost"
          variant="ghost"
          label="Ghost Variant" 
          placeholder="Ghost style"
          required
        />
        <Validator 
          v-model="values.filled"
          variant="filled"
          label="Filled Variant" 
          placeholder="Filled style"
          required
        />
      </div>
    `,
  }),
};

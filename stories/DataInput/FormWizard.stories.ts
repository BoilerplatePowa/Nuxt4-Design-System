import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref, nextTick } from 'vue';
import * as yup from 'yup';
import FormWizard from '../../src/runtime/components/DataInput/FormWizard.vue';
import Input from '../../src/runtime/components/DataInput/Input.vue';
import Select from '../../src/runtime/components/DataInput/Select.vue';
import Textarea from '../../src/runtime/components/DataInput/Textarea.vue';
import Checkbox from '../../src/runtime/components/DataInput/Checkbox.vue';
import Toggle from '../../src/runtime/components/DataInput/Toggle.vue';
import Avatar from '../../src/runtime/components/DataDisplay/Avatar.vue';
import Icon from '../../src/runtime/components/Icons/Icon.vue';

const meta: Meta<typeof FormWizard> = {
  title: 'Data Input/FormWizard',
  component: FormWizard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A comprehensive multi-step form wizard component that integrates with VeeValidate for validation.

## Features
- **Multi-step navigation** with progress tracking
- **VeeValidate integration** for form validation
- **Flexible step configuration** with custom schemas
- **Progress indicators** and step summaries
- **Accessible navigation** with keyboard support
- **Customizable styling** with DaisyUI classes

## Usage
The FormWizard component allows you to create complex multi-step forms with validation, progress tracking, and flexible navigation.
        `,
      },
    },
  },
  argTypes: {
    steps: {
      description: 'Array of step configurations',
      control: { type: 'object' },
      table: {
        type: { summary: 'object' },
      },
    },
    modelValue: {
      type: 'number',
      description: 'Current step index (0-based)',
      control: { type: 'number', min: 0 },
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    showSteps: {
      type: 'boolean',
      description: 'Show the steps indicator',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    stepsVariant: {
      type: 'string',
      description: 'Steps display variant',
      control: { type: 'select' },
      options: ['default', 'vertical'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    stepsColor: {
      type: 'string',
      description: 'Steps color theme',
      control: { type: 'select' },
      options: ['bordered', 'ghost', 'primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error', 'neutral'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
      },
    },
    showProgress: {
      type: 'boolean',
      description: 'Show progress bar',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    showSummary: {
      type: 'boolean',
      description: 'Show completed steps summary',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    nextButtonText: {
      type: 'string',
      description: 'Text for the next button',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Next' },
      },
    },
    previousButtonText: {
      type: 'string',
      description: 'Text for the previous button',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Previous' },
      },
    },
    submitButtonText: {
      type: 'string',
      description: 'Text for the submit button',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Submit' },
      },
    },
    stepData: {
      description: 'Data for each step',
      control: { type: 'object' },
      table: {
        type: { summary: 'object' },
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic wizard steps
const basicSteps = [
  {
    title: 'Personal Information',
    description: 'Enter your basic details',
    schema: yup.object({
      firstName: yup.string().required('First name is required'),
      lastName: yup.string().required('Last name is required'),
      email: yup.string().email('Please enter a valid email').required('Email is required'),
    }),
  },
  {
    title: 'Contact Details',
    description: 'Provide your contact information',
    schema: yup.object({
      phone: yup.string().required('Phone number is required'),
      address: yup.string().required('Address is required'),
      city: yup.string().required('City is required'),
    }),
  },
  {
    title: 'Preferences',
    description: 'Set your preferences',
    schema: yup.object({
      newsletter: yup.boolean(),
      notifications: yup.boolean(),
      terms: yup.boolean().oneOf([true], 'You must accept the terms'),
    }),
  },
];

// Account setup steps
const accountSetupSteps = [
  {
    title: 'Account Details',
    description: 'Create your account',
    icon: 'user' as const,
    schema: yup.object({
      username: yup
        .string()
        .min(3, 'Username must be at least 3 characters')
        .required('Username is required'),
      email: yup.string().email('Please enter a valid email').required('Email is required'),
      password: yup
        .string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Passwords must match')
        .required('Please confirm your password'),
    }),
  },
  {
    title: 'Profile Information',
    description: 'Tell us about yourself',
    icon: 'settings' as const,
    schema: yup.object({
      firstName: yup.string().required('First name is required'),
      lastName: yup.string().required('Last name is required'),
      bio: yup.string().max(200, 'Bio must be less than 200 characters'),
      website: yup.string().url('Please enter a valid URL'),
    }),
  },
  {
    title: 'Preferences',
    description: 'Set your account preferences',
    icon: 'settings-2' as const,
    schema: yup.object({
      language: yup.string().required('Please select a language'),
      timezone: yup.string().required('Please select a timezone'),
      notifications: yup.boolean(),
      newsletter: yup.boolean(),
    }),
  },
  {
    title: 'Verification',
    description: 'Verify your account',
    icon: 'check-circle' as const,
    schema: yup.object({
      terms: yup.boolean().oneOf([true], 'You must accept the terms and conditions'),
      privacy: yup.boolean().oneOf([true], 'You must accept the privacy policy'),
    }),
  },
];

// Checkout steps
const checkoutSteps = [
  {
    title: 'Cart Review',
    description: 'Review your items',
    icon: 'shopping-cart' as const,
    schema: yup.object({
      items: yup.array().min(1, 'Please select at least one item'),
    }),
  },
  {
    title: 'Shipping',
    description: 'Enter shipping details',
    icon: 'map-pin' as const,
    schema: yup.object({
      address: yup.string().required('Address is required'),
      city: yup.string().required('City is required'),
      zipCode: yup.string().required('ZIP code is required'),
      country: yup.string().required('Country is required'),
      shippingMethod: yup.string().required('Please select a shipping method'),
    }),
  },
  {
    title: 'Payment',
    description: 'Enter payment information',
    icon: 'credit-card' as const,
    schema: yup.object({
      cardNumber: yup.string().required('Card number is required'),
      expiryDate: yup.string().required('Expiry date is required'),
      cvv: yup.string().required('CVV is required'),
      cardholderName: yup.string().required('Cardholder name is required'),
    }),
  },
  {
    title: 'Confirmation',
    description: 'Review and confirm order',
    icon: 'check' as const,
    schema: yup.object({
      confirmOrder: yup.boolean().oneOf([true], 'Please confirm your order'),
    }),
  },
];

export const Default: Story = {
  args: {
    steps: basicSteps,
    modelValue: 0,
    showSteps: true,
    stepsColor: 'primary',
    showProgress: true,
    showSummary: true,
  },
  render: args => ({
    components: { FormWizard, Input, Textarea, Checkbox },
    setup() {
      const currentStep = ref(args.modelValue);
      const stepData = ref<Record<string, any>>({});

      const handleStepChange = (step: number, previousStep: number) => {
        // Step change handled silently
      };

      const handleStepComplete = (step: number, data: any) => {
        stepData.value[`step_${step}`] = data;
      };

      const handleWizardComplete = (data: any) => {
        alert('Form wizard completed successfully!');
      };

      return {
        args,
        currentStep,
        stepData,
        handleStepChange,
        handleStepComplete,
        handleWizardComplete,
      };
    },
    template: `
      <div class="w-full max-w-2xl">
        <FormWizard
          v-bind="args"
          v-model="currentStep"
          :step-data="stepData"
          @step-change="handleStepChange"
          @step-complete="handleStepComplete"
          @wizard-complete="handleWizardComplete"
        >
          <!-- Step 0: Personal Information -->
          <template #step-0="{ errors, meta }">
            <div class="space-y-4">
              <h3 class="text-lg font-semibold">Personal Information</h3>
              <p class="opacity-70">Please enter your basic details below.</p>
              
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
                type="email"
                placeholder="john.doe@example.com"
                left-icon="mail"
                required
              />
            </div>
          </template>

          <!-- Step 1: Contact Details -->
          <template #step-1="{ errors, meta }">
            <div class="space-y-4">
              <h3 class="text-lg font-semibold">Contact Details</h3>
              <p class="opacity-70">Provide your contact information.</p>
              
              <Input
                name="phone"
                label="Phone Number"
                type="tel"
                placeholder="+1 (555) 123-4567"
                left-icon="phone"
                required
              />
              
              <Input
                name="address"
                label="Address"
                placeholder="123 Main Street"
                left-icon="map-pin"
                required
              />
              
              <Input
                name="city"
                label="City"
                placeholder="New York"
                left-icon="building"
                required
              />
            </div>
          </template>

          <!-- Step 2: Preferences -->
          <template #step-2="{ errors, meta }">
            <div class="space-y-4">
              <h3 class="text-lg font-semibold">Preferences</h3>
              <p class="opacity-70">Set your communication preferences.</p>
              
              <Checkbox
                name="newsletter"
                label="Subscribe to newsletter"
                description="Receive updates about new features and products"
              />
              
              <Checkbox
                name="notifications"
                label="Enable notifications"
                description="Get notified about important updates"
              />
              
              <Checkbox
                name="terms"
                label="I accept the terms and conditions"
                description="You must accept the terms to continue"
                required
              />
            </div>
          </template>
        </FormWizard>
      </div>
    `,
  }),
};

export const AccountSetup: Story = {
  args: {
    steps: accountSetupSteps,
    modelValue: 0,
    showSteps: true,
    stepsVariant: 'vertical',
    stepsColor: 'accent',
    showProgress: true,
    showSummary: true,
  },
  render: args => ({
    components: { FormWizard, Input, Select, Textarea, Checkbox, Toggle },
    setup() {
      const currentStep = ref(args.modelValue);
      const stepData = ref<Record<string, any>>({});

      const languages = [
        { value: 'en', label: 'English' },
        { value: 'es', label: 'Spanish' },
        { value: 'fr', label: 'French' },
        { value: 'de', label: 'German' },
      ];

      const timezones = [
        { value: 'utc', label: 'UTC' },
        { value: 'est', label: 'Eastern Time' },
        { value: 'pst', label: 'Pacific Time' },
        { value: 'gmt', label: 'Greenwich Mean Time' },
      ];

      const handleWizardComplete = (data: any) => {
        alert('Account created successfully!');
      };

      return {
        args,
        currentStep,
        stepData,
        languages,
        timezones,
        handleWizardComplete,
      };
    },
    template: `
      <div class="w-full max-w-4xl">
        <FormWizard
          v-bind="args"
          v-model="currentStep"
          :step-data="stepData"
          @wizard-complete="handleWizardComplete"
        >
          <!-- Step 0: Account Details -->
          <template #step-0="{ errors, meta }">
            <div class="space-y-4">
              <h3 class="text-lg font-semibold">Account Details</h3>
              <p class="opacity-70">Create your account with a username and password.</p>
              
              <Input
                name="username"
                label="Username"
                placeholder="johndoe"
                left-icon="user"
                required
              />
              
              <Input
                name="email"
                label="Email"
                type="email"
                placeholder="john.doe@example.com"
                left-icon="mail"
                required
              />
              
              <div class="grid grid-cols-2 gap-4">
                <Input
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                  left-icon="lock"
                  required
                />
                <Input
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  placeholder="••••••••"
                  left-icon="lock"
                  required
                />
              </div>
            </div>
          </template>

          <!-- Step 1: Profile Information -->
          <template #step-1="{ errors, meta }">
            <div class="space-y-4">
              <h3 class="text-lg font-semibold">Profile Information</h3>
              <p class="opacity-70">Tell us about yourself.</p>
              
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
              
              <Textarea
                name="bio"
                label="Bio"
                placeholder="Tell us about yourself..."
                maxlength="200"
                show-char-count
              />
              
              <Input
                name="website"
                label="Website"
                type="url"
                placeholder="https://example.com"
                left-icon="link"
              />
            </div>
          </template>

          <!-- Step 2: Preferences -->
          <template #step-2="{ errors, meta }">
            <div class="space-y-4">
              <h3 class="text-lg font-semibold">Preferences</h3>
              <p class="opacity-70">Set your account preferences.</p>
              
              <Select
                name="language"
                label="Language"
                :options="languages"
                placeholder="Select language"
                required
              />
              
              <Select
                name="timezone"
                label="Timezone"
                :options="timezones"
                placeholder="Select timezone"
                required
              />
              
              <Toggle
                name="notifications"
                label="Enable notifications"
                description="Receive push notifications"
              />
              
              <Toggle
                name="newsletter"
                label="Subscribe to newsletter"
                description="Get weekly updates"
              />
            </div>
          </template>

          <!-- Step 3: Verification -->
          <template #step-3="{ errors, meta }">
            <div class="space-y-4">
              <h3 class="text-lg font-semibold">Verification</h3>
              <p class="opacity-70">Please review and accept the terms.</p>
              
              <div class="bg-base-200 p-4 rounded-lg">
                <h4 class="font-semibold mb-2">Terms and Conditions</h4>
                <p class="text-sm opacity-70 mb-4">
                  By creating an account, you agree to our terms of service and privacy policy.
                  We will use your information to provide you with the best possible experience.
                </p>
                
                <Checkbox
                  name="terms"
                  label="I accept the terms and conditions"
                  required
                />
              </div>
              
              <div class="bg-base-200 p-4 rounded-lg">
                <h4 class="font-semibold mb-2">Privacy Policy</h4>
                <p class="text-sm opacity-70 mb-4">
                  We respect your privacy and will never share your personal information
                  with third parties without your explicit consent.
                </p>
                
                <Checkbox
                  name="privacy"
                  label="I accept the privacy policy"
                  required
                />
              </div>
            </div>
          </template>
        </FormWizard>
      </div>
    `,
  }),
};

export const CheckoutProcess: Story = {
  args: {
    steps: checkoutSteps,
    modelValue: 0,
    showSteps: true,
    stepsColor: 'success',
    showProgress: true,
    showSummary: true,
  },
  render: args => ({
    components: { FormWizard, Input, Select, Checkbox },
    setup() {
      const currentStep = ref(args.modelValue);
      const stepData = ref<Record<string, any>>({});

      const shippingMethods = [
        { value: 'standard', label: 'Standard Shipping (3-5 days)', price: '$5.99' },
        { value: 'express', label: 'Express Shipping (1-2 days)', price: '$12.99' },
        { value: 'overnight', label: 'Overnight Shipping', price: '$24.99' },
      ];

      const handleWizardComplete = (data: any) => {
        alert('Order placed successfully!');
      };

      return {
        args,
        currentStep,
        stepData,
        shippingMethods,
        handleWizardComplete,
      };
    },
    template: `
      <div class="w-full max-w-2xl">
        <FormWizard
          v-bind="args"
          v-model="currentStep"
          :step-data="stepData"
          @wizard-complete="handleWizardComplete"
        >
          <!-- Step 0: Cart Review -->
          <template #step-0="{ errors, meta }">
            <div class="space-y-4">
              <h3 class="text-lg font-semibold">Cart Review</h3>
              <p class="opacity-70">Review your items before checkout.</p>
              
              <div class="bg-base-200 p-4 rounded-lg">
                <div class="flex justify-between items-center mb-2">
                  <span class="font-medium">Product Name</span>
                  <span class="text-success font-semibold">$29.99</span>
                </div>
                <div class="flex justify-between items-center mb-2">
                  <span class="font-medium">Quantity</span>
                  <span>1</span>
                </div>
                <div class="border-t pt-2 flex justify-between items-center">
                  <span class="font-bold">Total</span>
                  <span class="text-success font-bold">$29.99</span>
                </div>
              </div>
            </div>
          </template>

          <!-- Step 1: Shipping -->
          <template #step-1="{ errors, meta }">
            <div class="space-y-4">
              <h3 class="text-lg font-semibold">Shipping Information</h3>
              <p class="opacity-70">Enter your shipping details.</p>
              
              <Input
                name="address"
                label="Address"
                placeholder="123 Main Street"
                left-icon="map-pin"
                required
              />
              
              <div class="grid grid-cols-2 gap-4">
                <Input
                  name="city"
                  label="City"
                  placeholder="New York"
                  left-icon="building"
                  required
                />
                <Input
                  name="zipCode"
                  label="ZIP Code"
                  placeholder="10001"
                  left-icon="map-pin"
                  required
                />
              </div>
              
              <Input
                name="country"
                label="Country"
                placeholder="United States"
                left-icon="globe"
                required
              />
              
              <Select
                name="shippingMethod"
                label="Shipping Method"
                :options="shippingMethods"
                placeholder="Select shipping method"
                required
              />
            </div>
          </template>

          <!-- Step 2: Payment -->
          <template #step-2="{ errors, meta }">
            <div class="space-y-4">
              <h3 class="text-lg font-semibold">Payment Information</h3>
              <p class="opacity-70">Enter your payment details securely.</p>
              
              <Input
                name="cardNumber"
                label="Card Number"
                placeholder="1234 5678 9012 3456"
                left-icon="credit-card"
                mask-type="credit-card"
                required
              />
              
              <div class="grid grid-cols-3 gap-4">
                <Input
                  name="expiryDate"
                  label="Expiry Date"
                  placeholder="MM/YY"
                  mask-type="date"
                  required
                />
                <Input
                  name="cvv"
                  label="CVV"
                  placeholder="123"
                  maxlength="4"
                  required
                />
                <div></div>
              </div>
              
              <Input
                name="cardholderName"
                label="Cardholder Name"
                placeholder="John Doe"
                left-icon="user"
                required
              />
            </div>
          </template>

          <!-- Step 3: Confirmation -->
          <template #step-3="{ errors, meta }">
            <div class="space-y-4">
              <h3 class="text-lg font-semibold">Order Confirmation</h3>
              <p class="opacity-70">Review your order details and confirm.</p>
              
              <div class="bg-base-200 p-4 rounded-lg space-y-2">
                <div class="flex justify-between">
                  <span>Subtotal:</span>
                  <span>$29.99</span>
                </div>
                <div class="flex justify-between">
                  <span>Shipping:</span>
                  <span>$5.99</span>
                </div>
                <div class="flex justify-between">
                  <span>Tax:</span>
                  <span>$2.40</span>
                </div>
                <div class="border-t pt-2 flex justify-between font-bold">
                  <span>Total:</span>
                  <span class="text-success">$38.38</span>
                </div>
              </div>
              
              <Checkbox
                name="confirmOrder"
                label="I confirm this order and agree to the terms"
                description="By checking this box, you confirm your order and agree to our terms of service"
                required
              />
            </div>
          </template>
        </FormWizard>
      </div>
    `,
  }),
};

export const Minimal: Story = {
  args: {
    steps: [
      {
        title: 'Step 1',
        description: 'First step description',
      },
      {
        title: 'Step 2',
        description: 'Second step description',
      },
      {
        title: 'Step 3',
        description: 'Final step description',
      },
    ],
    modelValue: 0,
    showSteps: false,
    showProgress: false,
    showSummary: false,
  },
};

export const VerticalSteps: Story = {
  args: {
    steps: accountSetupSteps,
    modelValue: 0,
    showSteps: true,
    stepsVariant: 'vertical',
    stepsColor: 'info',
    showProgress: true,
    showSummary: true,
  },
};

export const CustomButtons: Story = {
  args: {
    steps: basicSteps,
    modelValue: 0,
    nextButtonText: 'Continue',
    previousButtonText: 'Go Back',
    submitButtonText: 'Finish Setup',
    stepsColor: 'warning',
  },
};

export const NoValidation: Story = {
  args: {
    steps: [
      {
        title: 'Welcome',
        description: 'Welcome to our platform',
      },
      {
        title: 'Information',
        description: 'Learn about our features',
      },
      {
        title: 'Complete',
        description: "You're all set!",
      },
    ],
    modelValue: 0,
    showSteps: true,
    stepsColor: 'success',
  },
};

export const EnhancedSteps: Story = {
  args: {
    steps: [
      {
        title: 'Account Setup',
        description: 'Create your account',
        icon: 'user' as const,
      },
      {
        title: 'Profile',
        description: 'Complete your profile',
        icon: 'settings' as const,
      },
      {
        title: 'Preferences',
        description: 'Set your preferences',
        icon: 'heart' as const,
      },
      {
        title: 'Verification',
        description: 'Verify your account',
        icon: 'check-circle' as const,
      },
    ],
    modelValue: 0,
    showSteps: true,
    stepsVariant: 'vertical',
    stepsColor: 'accent',
    showProgress: true,
    showSummary: true,
  },
  render: args => ({
    components: { FormWizard, Input, Checkbox, Avatar, Icon },
    setup() {
      const currentStep = ref(args.modelValue);
      const stepData = ref<Record<string, any>>({});

      const handleStepComplete = (step: number, data: any) => {
        // Create a clean copy of the data to avoid circular references
        const cleanData = JSON.parse(
          JSON.stringify(data, (key, value) => {
            if (typeof value === 'function' || value === undefined) {
              return undefined;
            }
            if (value && typeof value === 'object' && value.nodeType) {
              return undefined;
            }
            return value;
          })
        );

        stepData.value[`step_${step}`] = cleanData;
      };

      const handleWizardComplete = (data: any) => {
        alert('Enhanced wizard completed successfully!');
      };

      return {
        args,
        currentStep,
        stepData,
        handleStepComplete,
        handleWizardComplete,
      };
    },
    template: `
      <div class="w-full max-w-4xl">
        <FormWizard
          v-bind="args"
          v-model="currentStep"
          :step-data="stepData"
          @step-complete="handleStepComplete"
          @wizard-complete="handleWizardComplete"
        >
          <!-- Step 0: Account Setup -->
          <template #step-0="{ errors, meta }">
            <div class="space-y-6">
              <div class="text-center">
                <Avatar size="lg" fallback-color="primary" class="mx-auto mb-4">
                  <Icon name="user" size="lg" />
                </Avatar>
                <h3 class="text-xl font-bold mb-2">Account Setup</h3>
                <p class="opacity-70">Create your account to get started.</p>
              </div>
              
              <div class="space-y-4">
                <Input
                  name="username"
                  label="Username"
                  placeholder="johndoe"
                  left-icon="user"
                  required
                />
                
                <Input
                  name="email"
                  label="Email"
                  type="email"
                  placeholder="john.doe@example.com"
                  left-icon="mail"
                  required
                />
                
                <Input
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                  left-icon="lock"
                  required
                />
              </div>
            </div>
          </template>

          <!-- Step 1: Profile -->
          <template #step-1="{ errors, meta }">
            <div class="space-y-6">
              <div class="text-center">
                <Avatar size="lg" fallback-color="secondary" class="mx-auto mb-4">
                  <Icon name="settings" size="lg" />
                </Avatar>
                <h3 class="text-xl font-bold mb-2">Profile Information</h3>
                <p class="opacity-70">Tell us about yourself.</p>
              </div>
              
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
                name="bio"
                label="Bio"
                placeholder="Tell us about yourself..."
                left-icon="message-circle"
              />
            </div>
          </template>

          <!-- Step 2: Preferences -->
          <template #step-2="{ errors, meta }">
            <div class="space-y-6">
              <div class="text-center">
                <Avatar size="lg" fallback-color="accent" class="mx-auto mb-4">
                  <Icon name="heart" size="lg" />
                </Avatar>
                <h3 class="text-xl font-bold mb-2">Preferences</h3>
                <p class="opacity-70">Set your communication preferences.</p>
              </div>
              
              <div class="space-y-4">
                <Checkbox
                  name="newsletter"
                  label="Subscribe to Newsletter"
                  description="Receive updates about new features"
                />
                
                <Checkbox
                  name="notifications"
                  label="Enable Notifications"
                  description="Get notified about important updates"
                />
                
                <Checkbox
                  name="marketing"
                  label="Marketing Communications"
                  description="Receive promotional emails"
                />
              </div>
            </div>
          </template>

          <!-- Step 3: Verification -->
          <template #step-3="{ errors, meta }">
            <div class="space-y-6">
              <div class="text-center">
                <Avatar size="lg" fallback-color="success" class="mx-auto mb-4">
                  <Icon name="check-circle" size="lg" />
                </Avatar>
                <h3 class="text-xl font-bold mb-2">Verification</h3>
                <p class="opacity-70">Review and confirm your information.</p>
              </div>
              
              <div class="card bg-base-200 shadow-sm">
                <div class="card-body">
                  <h4 class="card-title">Account Summary</h4>
                  <div class="space-y-2 text-sm">
                    <div><strong>Username:</strong> {{ stepData['step_0']?.username || 'Not provided' }}</div>
                    <div><strong>Email:</strong> {{ stepData['step_0']?.email || 'Not provided' }}</div>
                    <div><strong>Name:</strong> {{ stepData['step_1']?.firstName }} {{ stepData['step_1']?.lastName }}</div>
                    <div><strong>Newsletter:</strong> {{ stepData['step_2']?.newsletter ? 'Yes' : 'No' }}</div>
                    <div><strong>Notifications:</strong> {{ stepData['step_2']?.notifications ? 'Yes' : 'No' }}</div>
                  </div>
                </div>
              </div>
              
              <Checkbox
                name="terms"
                label="I accept the terms and conditions"
                description="You must accept the terms to continue"
                required
              />
            </div>
          </template>
        </FormWizard>
      </div>
    `,
  }),
};

export const InteractiveWizard: Story = {
  render: () => ({
    components: { FormWizard, Input, Checkbox, Select, Avatar, Icon },
    setup() {
      const currentStep = ref(0);
      const stepData = ref<Record<string, any>>({});
      const isCompleted = ref(false);
      const isAutoAdvancing = ref(false);

      // Safe JSON stringify function to handle circular references
      const safeStringify = (obj: any, space?: number) => {
        try {
          // First try to create a clean copy
          const cleanObj = JSON.parse(
            JSON.stringify(obj, (key, value) => {
              // Skip functions, undefined, and non-serializable objects
              if (typeof value === 'function' || value === undefined) {
                return undefined;
              }
              // Skip DOM elements and other non-serializable objects
              if (value && typeof value === 'object' && value.nodeType) {
                return undefined;
              }
              // Skip objects that might cause circular references
              if (value && typeof value === 'object' && value.$el) {
                return '[Vue Component]';
              }
              return value;
            })
          );

          return JSON.stringify(cleanObj, null, space);
        } catch (error) {
          // If that fails, try a more aggressive approach
          try {
            const simpleObj: Record<string, any> = {};
            if (obj && typeof obj === 'object') {
              Object.keys(obj).forEach(key => {
                const value = obj[key];
                if (
                  typeof value === 'string' ||
                  typeof value === 'number' ||
                  typeof value === 'boolean'
                ) {
                  simpleObj[key] = value;
                } else if (Array.isArray(value)) {
                  simpleObj[key] = value.map(item =>
                    typeof item === 'object' ? '[Object]' : item
                  );
                } else if (value && typeof value === 'object') {
                  simpleObj[key] = '[Object]';
                }
              });
            }
            return JSON.stringify(simpleObj, null, space);
          } catch (fallbackError) {
            return `[Serialization Error: ${error instanceof Error ? error.message : 'Unknown error'}]`;
          }
        }
      };

      const interactiveSteps = [
        {
          title: 'Personal Info',
          description: 'Tell us about yourself',
          schema: yup.object({
            name: yup.string().required('Name is required'),
            email: yup.string().email('Valid email required').required('Email is required'),
          }),
        },
        {
          title: 'Preferences',
          description: 'Set your preferences',
          schema: yup.object({
            newsletter: yup.boolean().default(false),
            notifications: yup.boolean().default(false),
          }),
        },
        {
          title: 'Confirmation',
          description: 'Review and confirm',
          schema: yup.object({
            terms: yup
              .boolean()
              .oneOf([true], 'Must accept terms')
              .required('Terms must be accepted'),
          }),
        },
      ];

      const handleStepChange = (step: number, previousStep: number) => {
        // Step change handled silently
      };

      const handleStepComplete = (step: number, data: any) => {
        // Create a clean copy of the data to avoid circular references
        const cleanData = JSON.parse(
          JSON.stringify(data, (key, value) => {
            // Skip functions, undefined, and non-serializable objects
            if (typeof value === 'function' || value === undefined) {
              return undefined;
            }
            // Skip DOM elements and other non-serializable objects
            if (value && typeof value === 'object' && value.nodeType) {
              return undefined;
            }
            return value;
          })
        );

        // Store data directly without step key prefix to avoid nesting
        stepData.value[`step_${step}`] = cleanData;

        // Auto-advance to step 2 when step 1 is completed
        if (step === 0) {
          isAutoAdvancing.value = true;
          // Use nextTick to ensure the step data is updated before navigation
          nextTick(() => {
            currentStep.value = 1;
            // Reset the auto-advancing flag after a short delay
            setTimeout(() => {
              isAutoAdvancing.value = false;
            }, 1000);
          });
        }
      };

      const handleWizardComplete = (data: any) => {
        isCompleted.value = true;
        alert('Wizard completed successfully! Check the console for data.');
      };

      return {
        currentStep,
        stepData,
        isCompleted,
        isAutoAdvancing,
        interactiveSteps,
        safeStringify,
        handleStepChange,
        handleStepComplete,
        handleWizardComplete,
      };
    },
    template: `
      <div class="w-full max-w-2xl mx-auto">
        <div v-if="!isCompleted" class="space-y-6">
          <div class="text-center mb-8">
            <h2 class="text-2xl font-bold mb-2">Interactive Form Wizard</h2>
            <p class="opacity-70">Try navigating through the steps and filling out the forms.</p>
            <div class="alert alert-info mt-4">
              <Icon name="user" size="sm" />
              <span><strong>Auto-advance feature:</strong> Step 1 will automatically advance to Step 2 when valid and submitted!</span>
            </div>
            
            <div v-if="isAutoAdvancing" class="alert alert-success mt-4">
              <Icon name="loading" size="sm" class="animate-spin" />
              <span><strong>Auto-advancing to step 2...</strong></span>
            </div>
          </div>

          <FormWizard
            v-model="currentStep"
            :steps="interactiveSteps"
            :step-data="stepData"
            :show-steps="true"
            :steps-color="'primary'"
            :show-progress="true"
            :show-summary="true"
            @step-change="handleStepChange"
            @step-complete="handleStepComplete"
            @wizard-complete="handleWizardComplete"
          >
            <!-- Step 0: Personal Info -->
            <template #step-0="{ errors, meta, allStepData }">
              <div class="space-y-6">
                <div class="flex items-center flex-col text-center">
                  <Avatar 
                    size="lg" 
                    fallback-color="primary" 
                    class="mx-auto mb-4"
                    alt="Personal Info"
                  >
                    <Icon name="user" size="lg" />
                  </Avatar>
                  <h3 class="text-xl font-bold mb-2">Personal Information</h3>
                  <p class="opacity-70">Please provide your basic details.</p>
                </div>

                <div class="space-y-4">
                  <Input
                    name="name"
                    label="Full Name"
                    placeholder="John Doe"
                    left-icon="user"
                    required
                  />
                  
                  <Input
                    name="email"
                    label="Email Address"
                    type="email"
                    placeholder="john.doe@example.com"
                    left-icon="mail"
                    required
                  />
                </div>

                <div class="bg-base-200 p-4 rounded-lg">
                  <h4 class="font-semibold mb-2">Current Step Data:</h4>
                  <pre class="text-xs">{{ safeStringify(stepData, 2) }}</pre>
                  <h4 class="font-semibold mb-2 mt-4">All Steps Data:</h4>
                  <pre class="text-xs">{{ safeStringify(allStepData || {}, 2) }}</pre>
                  <h4 class="font-semibold mb-2 mt-4">Validation State:</h4>
                  <pre class="text-xs">Valid: {{ meta.valid }}, Dirty: {{ meta.dirty }}, Touched: {{ meta.touched }}</pre>
                  <h4 class="font-semibold mb-2 mt-4">Errors:</h4>
                  <pre class="text-xs">{{ safeStringify(errors, 2) }}</pre>
                  
                  <div v-if="meta.valid && meta.dirty" class="alert alert-success mt-4">
                    <Icon name="check-circle" size="sm" />
                    <span>Form is valid! Click "Next" to auto-advance to step 2.</span>
                  </div>
                </div>
              </div>
            </template>

            <!-- Step 1: Preferences -->
            <template #step-1="{ errors, meta, allStepData }">
              <div class="space-y-6">
                <div class="text-center">
                  <Avatar 
                    size="lg" 
                    fallback-color="secondary" 
                    class="mx-auto mb-4"
                  >
                    <Icon name="settings" size="lg" />
                  </Avatar>
                  <h3 class="text-xl font-bold mb-2">Preferences</h3>
                  <p class="opacity-70">Set your communication preferences.</p>
                </div>

                <div class="space-y-4">
                  <Checkbox
                    name="newsletter"
                    label="Subscribe to Newsletter"
                    description="Receive updates about new features"
                  />
                  
                  <Checkbox
                    name="notifications"
                    label="Enable Notifications"
                    description="Get notified about important updates"
                  />
                </div>

                <div class="bg-base-200 p-4 rounded-lg">
                  <h4 class="font-semibold mb-2">Current Step Data:</h4>
                  <pre class="text-xs">{{ safeStringify(stepData, 2) }}</pre>
                  <h4 class="font-semibold mb-2 mt-4">All Steps Data:</h4>
                  <pre class="text-xs">{{ safeStringify(allStepData || {}, 2) }}</pre>
                  <h4 class="font-semibold mb-2 mt-4">Validation State:</h4>
                  <pre class="text-xs">Valid: {{ meta.valid }}, Dirty: {{ meta.dirty }}, Touched: {{ meta.touched }}</pre>
                  <h4 class="font-semibold mb-2 mt-4">Errors:</h4>
                  <pre class="text-xs">{{ safeStringify(errors, 2) }}</pre>
                </div>
              </div>
            </template>

            <!-- Step 2: Confirmation -->
            <template #step-2="{ errors, meta, allStepData }">
              <div class="space-y-6">
                <div class="text-center">
                  <Avatar 
                    size="lg" 
                    fallback-color="success" 
                    class="mx-auto mb-4"
                  >
                    <Icon name="check-circle" size="lg" />
                  </Avatar>
                  <h3 class="text-xl font-bold mb-2">Confirmation</h3>
                  <p class="opacity-70">Review your information and confirm.</p>
                </div>

                <div class="card bg-base-100 shadow-sm">
                  <div class="card-body">
                    <h4 class="card-title">Summary</h4>
                    <div class="space-y-2 text-sm">
                      <div><strong>Name:</strong> {{ stepData['step_0']?.name || 'Not provided' }}</div>
                      <div><strong>Email:</strong> {{ stepData['step_0']?.email || 'Not provided' }}</div>
                      <div><strong>Newsletter:</strong> {{ stepData['step_1']?.newsletter ? 'Yes' : 'No' }}</div>
                      <div><strong>Notifications:</strong> {{ stepData['step_1']?.notifications ? 'Yes' : 'No' }}</div>
                    </div>
                  </div>
                </div>

                <Checkbox
                  name="terms"
                  label="I accept the terms and conditions"
                  description="You must accept the terms to continue"
                  required
                />

                <div class="bg-base-200 p-4 rounded-lg">
                  <h4 class="font-semibold mb-2">Validation State:</h4>
                  <pre class="text-xs">Valid: {{ meta.valid }}, Dirty: {{ meta.dirty }}, Touched: {{ meta.touched }}</pre>
                  <h4 class="font-semibold mb-2 mt-4">Errors:</h4>
                  <pre class="text-xs">{{ safeStringify(errors, 2) }}</pre>
                  <h4 class="font-semibold mb-2 mt-4">All Steps Data:</h4>
                  <pre class="text-xs">{{ safeStringify(allStepData || {}, 2) }}</pre>
                </div>
              </div>
            </template>
          </FormWizard>
        </div>

        <div v-else class="text-center py-12">
          <Avatar 
            size="xl" 
            fallback-color="success" 
            class="mx-auto mb-6"
          >
            <Icon name="check-circle" size="xl" />
          </Avatar>
          <h2 class="text-2xl font-bold mb-4">Wizard Completed!</h2>
          <p class="opacity-70 mb-6">Thank you for completing the form wizard.</p>
          
          <div class="card bg-base-200 shadow-sm">
            <div class="card-body">
              <h4 class="font-semibold mb-3">Final Data:</h4>
              <pre class="text-xs overflow-auto">{{ safeStringify(stepData, 2) }}</pre>
            </div>
          </div>

          <button 
            @click="isCompleted = false; currentStep = 0; stepData = {}" 
            class="btn btn-primary mt-6"
          >
            Start Over
          </button>
        </div>
      </div>
    `,
  }),
};

import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import PhoneInput from './PhoneInput.vue';

const meta: Meta<typeof PhoneInput> = {
  title: 'Data Input/PhoneInput',
  component: PhoneInput,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: { type: 'select' },
      options: ['bordered', 'outlined', 'filled'],
    },
    defaultCountry: {
      control: { type: 'select' },
      options: ['US', 'CA', 'GB', 'FR', 'DE', 'IT', 'ES', 'AU', 'JP', 'CN', 'IN', 'BR', 'MX'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
    required: {
      control: { type: 'boolean' },
    },
    showValidation: {
      control: { type: 'boolean' },
    },
    showCharCount: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Phone Number',
    placeholder: 'Enter your phone number',
    helpText: '',
    defaultCountry: 'FR',
    showValidation: true,
    showExampleNumber: true,
  },
};

export const WithValidation: Story = {
  args: {
    label: 'Contact Phone',
    placeholder: 'Enter phone number',
    helpText: '',
    defaultCountry: 'FR',
    showValidation: true,
    showExampleNumber: true,
    required: true,
  },
  render: args => ({
    components: { PhoneInput },
    setup() {
      return { args };
    },
    template: `
      <div class="space-y-4">
        <PhoneInput v-bind="args" />
        <div class="text-sm opacity-70">
          <p>Try entering different phone numbers to see validation:</p>
          <ul class="list-disc list-inside mt-2 space-y-1">
            <li>US: (555) 123-4567</li>
            <li>UK: 07700 900000</li>
            <li>FR: 06 12 34 56 78</li>
            <li>Invalid: 123</li>
          </ul>
        </div>
      </div>
    `,
  }),
};

export const DifferentCountries: Story = {
  render: () => ({
    components: { PhoneInput },
    template: `
      <div class="space-y-6">
        <div>
          <h3 class="text-lg font-bold mb-4">France</h3>
          <PhoneInput 
            label="French Phone" 
            defaultCountry="FR"
            placeholder="06 12 34 56 78"
            showValidation
            showExampleNumber
          />
        </div>
        
        <div>
          <h3 class="text-lg font-bold mb-4">United States</h3>
          <PhoneInput 
            label="US Phone" 
            defaultCountry="US"
            placeholder="(555) 123-4567"
            showValidation
            showExampleNumber
          />
        </div>
        
        <div>
          <h3 class="text-lg font-bold mb-4">Belgium</h3>
          <PhoneInput 
            label="Belgian Phone" 
            defaultCountry="BE"
            placeholder="0470 12 34 56"
            showValidation
            showExampleNumber
          />
        </div>
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    components: { PhoneInput },
    template: `
      <div class="space-y-6">
        <div>
          <h3 class="text-lg font-bold mb-4">Small</h3>
          <PhoneInput 
            label="Small Phone Input" 
            size="sm"
            placeholder="Enter phone number"
            showValidation
          />
        </div>
        
        <div>
          <h3 class="text-lg font-bold mb-4">Medium (Default)</h3>
          <PhoneInput 
            label="Medium Phone Input" 
            size="md"
            placeholder="Enter phone number"
            showValidation
          />
        </div>
        
        <div>
          <h3 class="text-lg font-bold mb-4">Large</h3>
          <PhoneInput 
            label="Large Phone Input" 
            size="lg"
            placeholder="Enter phone number"
            showValidation
          />
        </div>
      </div>
    `,
  }),
};

export const Variants: Story = {
  render: () => ({
    components: { PhoneInput },
    template: `
      <div class="space-y-6">
        <div>
          <h3 class="text-lg font-bold mb-4">Bordered</h3>
          <PhoneInput 
            label="Bordered Phone Input" 
            variant="bordered"
            placeholder="Enter phone number"
            showValidation
          />
        </div>
        
        <div>
          <h3 class="text-lg font-bold mb-4">Outlined</h3>
          <PhoneInput 
            label="Outlined Phone Input" 
            variant="outlined"
            placeholder="Enter phone number"
            showValidation
          />
        </div>
        
        <div>
          <h3 class="text-lg font-bold mb-4">Filled</h3>
          <PhoneInput 
            label="Filled Phone Input" 
            variant="filled"
            placeholder="Enter phone number"
            showValidation
          />
        </div>
      </div>
    `,
  }),
};

export const WithCharacterCount: Story = {
  args: {
    label: 'Phone Number',
    placeholder: 'Enter phone number',
    maxlength: 15,
    showCharCount: true,
    showValidation: true,
    showExampleNumber: true,
  },
};

export const CustomCountries: Story = {
  args: {
    label: 'Phone Number',
    placeholder: 'Enter phone number',
    helpText: '',
    showValidation: true,
    showExampleNumber: true,
    countriesCodes: ['FR', 'US', 'BE'],
  },
  render: args => ({
    components: { PhoneInput },
    setup() {
      return { args };
    },
    template: `
      <div class="space-y-4">
        <PhoneInput v-bind="args" />
        <div class="text-sm opacity-70">
          <p>This example shows only 3 countries: FR, US, BE</p>
        </div>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  args: {
    label: 'Phone Number',
    placeholder: 'Enter phone number',
    disabled: true,
    defaultCountry: 'FR',
  },
};

export const WithEvents: Story = {
  args: {
    label: 'Phone Number',
    placeholder: 'Enter phone number',
    showValidation: true,
    showExampleNumber: true,
  },
  render: args => ({
    components: { PhoneInput },
    setup() {
      const events = ref<string[]>([]);

      const handleCountryChange = (countryCode: string) => {
        events.value.push(`Country changed to: ${countryCode}`);
      };

      const handleValidationChange = (isValid: boolean, phoneNumber?: string) => {
        events.value.push(
          `Validation: ${isValid ? 'Valid' : 'Invalid'}${phoneNumber ? ` - ${phoneNumber}` : ''}`
        );
      };

      const clearEvents = () => {
        events.value = [];
      };

      return {
        args,
        events,
        handleCountryChange,
        handleValidationChange,
        clearEvents,
      };
    },
    template: `
      <div class="space-y-4">
        <PhoneInput 
          v-bind="args"
          @country-change="handleCountryChange"
          @validation-change="handleValidationChange"
        />
        
        <div class="mt-6">
          <h4 class="font-semibold mb-2">Events Log:</h4>
          <div class="bg-base-200 p-4 rounded-lg max-h-40 overflow-y-auto">
            <div v-if="events.length === 0" class="opacity-50">
              No events yet. Try changing the country or entering a phone number.
            </div>
            <div v-else class="space-y-1">
              <div v-for="(event, index) in events" :key="index" class="text-sm">
                {{ event }}
              </div>
            </div>
          </div>
          <button 
            @click="clearEvents" 
            class="btn btn-sm btn-outline mt-2"
          >
            Clear Events
          </button>
        </div>
      </div>
    `,
  }),
};

export const FormIntegration: Story = {
  render: () => ({
    components: { PhoneInput },
    setup() {
      const formData = ref({
        name: '',
        email: '',
        phone: '',
      });

      const isSubmitting = ref(false);

      const handleSubmit = () => {
        isSubmitting.value = true;
        setTimeout(() => {
          isSubmitting.value = false;
          alert('Form submitted! Check console for data.');
          console.log('Form data:', formData.value);
        }, 1000);
      };

      return { formData, isSubmitting, handleSubmit };
    },
    template: `
      <div class="max-w-md">
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Full Name</span>
            </label>
            <input 
              v-model="formData.name"
              type="text" 
              class="input input-bordered" 
              placeholder="John Doe"
              required
            />
          </div>
          
          <div class="form-control">
            <label class="label">
              <span class="label-text">Email</span>
            </label>
            <input 
              v-model="formData.email"
              type="email" 
              class="input input-bordered" 
              placeholder="john@example.com"
              required
            />
          </div>
          
          <PhoneInput 
            v-model="formData.phone"
            label="Phone Number"
            placeholder="Enter your phone number"
            helpText=""
            showValidation
            showExampleNumber
            required
          />
          
          <button 
            type="submit" 
            class="btn btn-primary w-full"
            :disabled="isSubmitting"
          >
            {{ isSubmitting ? 'Submitting...' : 'Submit Form' }}
          </button>
        </form>
        
        <div class="mt-6 p-4 bg-base-200 rounded-lg">
          <h4 class="font-semibold mb-2">Form Data:</h4>
          <pre class="text-sm">{{ JSON.stringify(formData, null, 2) }}</pre>
        </div>
      </div>
    `,
  }),
};

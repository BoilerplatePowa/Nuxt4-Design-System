import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import Steps from '../../src/runtime/components/Navigation/Steps.vue'
import Button from '../../src/runtime/components/Actions/Button.vue'
import Card from '../../src/runtime/components/DataDisplay/Card.vue'
import Avatar from '../../src/runtime/components/DataDisplay/Avatar.vue'
import {
    CheckCircle,
    MapPin,
    User,
    Settings,
    Heart,
    Check,
    Package,
    Truck,
    Home,
    ClipboardList,
    Code,
    TestTube,
    Rocket,
} from 'lucide-vue-next'

const meta: Meta<typeof Steps> = {
    title: 'Navigation/Steps',
    component: Steps,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: `
A flexible step indicator component for displaying multi-step processes and navigation.

## Features
- **Horizontal and vertical orientations** for different layouts
- **Multiple color variants** to match your design system
- **Interactive step navigation** with click handlers
- **Custom step content** with slots for advanced customization
- **Progress tracking** with current step highlighting
- **Accessible navigation** with proper ARIA attributes

## Usage
The Steps component is perfect for checkout processes, form wizards, onboarding flows, and any multi-step user journey.
        `,
            },
        },
    },
    argTypes: {
        steps: {
            description: 'Array of step configurations',
            control: { type: 'object' },
        },
        currentStep: {
            description: 'Current active step index (0-based)',
            control: { type: 'number', min: 0 },
        },
        variant: {
            description: 'Steps display variant',
            control: { type: 'select' },
            options: ['horizontal', 'vertical'],
        },
        color: {
            description: 'Steps color theme',
            control: { type: 'select' },
            options: ['primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error'],
        },
        showNumbers: {
            description: 'Show step numbers instead of icons',
            control: { type: 'boolean' },
        },
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

// Basic steps data
const basicSteps = [
    { title: 'Order', description: 'Place your order' },
    { title: 'Payment', description: 'Complete payment' },
    { title: 'Shipping', description: 'Package shipped' },
    { title: 'Delivery', description: 'Order delivered' },
]

// Detailed steps with icons
const detailedSteps = [
    {
        title: 'Account Setup',
        description: 'Create your account with basic information',
        value: 'setup',
        icon: 'user' as const,
    },
    {
        title: 'Profile Details',
        description: 'Add your personal and professional details',
        value: 'profile',
        icon: 'settings' as const,
    },
    {
        title: 'Verification',
        description: 'Verify your email and phone number',
        value: 'verify',
        icon: 'check-circle' as const,
    },
    {
        title: 'Preferences',
        description: 'Set your communication and privacy preferences',
        value: 'preferences',
        icon: 'heart' as const,
    },
    {
        title: 'Complete',
        description: 'Your account is ready to use',
        value: 'complete',
        icon: 'check' as const,
    },
]

// Checkout steps
const checkoutSteps = [
    {
        title: 'Cart',
        description: 'Review items',
        icon: 'shopping-cart' as const,
    },
    {
        title: 'Shipping',
        description: 'Delivery details',
        icon: 'map-pin' as const,
    },
    {
        title: 'Payment',
        description: 'Billing information',
        icon: 'credit-card' as const,
    },
    {
        title: 'Confirmation',
        description: 'Order complete',
        icon: 'check' as const,
    },
]

// Order tracking steps
const orderTrackingSteps = [
    { title: 'Ordered', description: 'Order placed', icon: 'package' as const },
    {
        title: 'Processing',
        description: 'Being prepared',
        icon: 'settings' as const,
    },
    { title: 'Shipped', description: 'In transit', icon: 'truck' as const },
    {
        title: 'Delivered',
        description: 'At destination',
        icon: 'home' as const,
    },
]

export const Default: Story = {
    args: {
        steps: basicSteps,
        currentStep: 1,
        color: 'primary',
        showNumbers: true,
    },
    render: (args) => ({
        components: { Steps, Button },
        setup() {
            const currentStep = ref(args.currentStep)

            const handleStepClick = (index: number) => {
                currentStep.value = index
                console.log(`Step clicked: ${index}`)
            }

            return {
                args,
                currentStep,
                handleStepClick,
            }
        },
        template: `
      <div class="space-y-6">
        <div class="text-center">
          <h3 class="text-lg font-bold mb-2">Order Process</h3>
          <p class="opacity-70">Track your order through each step</p>
        </div>
        
        <Steps 
          v-bind="args"
          :current-step="currentStep"
          @step-click="handleStepClick"
        />
        
        <div class="text-center">
          <div class="flex gap-2 justify-center">
            <Button 
              @click="currentStep = Math.max(0, currentStep - 1)"
              :disabled="currentStep === 0"
              variant="outline"
              size="sm"
            >
              Previous
            </Button>
            <Button 
              @click="currentStep = Math.min(args.steps.length - 1, currentStep + 1)"
              :disabled="currentStep === args.steps.length - 1"
              size="sm"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    `,
    }),
}

export const Vertical: Story = {
    args: {
        steps: detailedSteps,
        currentStep: 2,
        variant: 'vertical',
        color: 'accent',
        showNumbers: false,
    },
    render: (args) => ({
        components: { Steps, Button },
        setup() {
            const currentStep = ref(args.currentStep)

            const handleStepClick = (index: number) => {
                currentStep.value = index
                console.log(`Step clicked: ${index}`)
            }

            return {
                args,
                currentStep,
                handleStepClick,
            }
        },
        template: `
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-8">
          <h3 class="text-2xl font-bold">Account Setup</h3>
          <p class="opacity-70">Complete these steps to set up your account</p>
        </div>
        
        <div class="flex gap-8">
          <div class="flex-1">
            <Steps 
              v-bind="args"
              :current-step="currentStep"
              @step-click="handleStepClick"
              class="max-w-md"
            />
          </div>
          
          <div class="flex-1">
            <Card>
              <div class="card-body">
                <h4 class="card-title">{{ args.steps[currentStep].title }}</h4>
                <p>{{ args.steps[currentStep].description }}</p>
                
                <div class="card-actions justify-end mt-4">
                  <Button 
                    @click="currentStep = Math.max(0, currentStep - 1)"
                    :disabled="currentStep === 0"
                    variant="outline"
                    size="sm"
                  >
                    Back
                  </Button>
                  <Button 
                    @click="currentStep = Math.min(args.steps.length - 1, currentStep + 1)"
                    :disabled="currentStep === args.steps.length - 1"
                    size="sm"
                  >
                    Continue
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    `,
    }),
}

export const Variants: Story = {
    render: () => ({
        components: { Steps },
        template: `
      <div class="space-y-8">
        <div>
          <h3 class="text-lg font-bold mb-4">Primary</h3>
          <Steps 
            :steps="[
              { title: 'Step 1' },
              { title: 'Step 2' },
              { title: 'Step 3' },
              { title: 'Step 4' }
            ]"
            :current-step="1"
            color="primary"
          />
        </div>
        
        <div>
          <h3 class="text-lg font-bold mb-4">Secondary</h3>
          <Steps 
            :steps="[
              { title: 'Step 1' },
              { title: 'Step 2' },
              { title: 'Step 3' },
              { title: 'Step 4' }
            ]"
            :current-step="1"
            color="secondary"
          />
        </div>
        
        <div>
          <h3 class="text-lg font-bold mb-4">Accent</h3>
          <Steps 
            :steps="[
              { title: 'Step 1' },
              { title: 'Step 2' },
              { title: 'Step 3' },
              { title: 'Step 4' }
            ]"
            :current-step="1"
            color="accent"
          />
        </div>
        
        <div>
          <h3 class="text-lg font-bold mb-4">Success</h3>
          <Steps 
            :steps="[
              { title: 'Step 1' },
              { title: 'Step 2' },
              { title: 'Step 3' },
              { title: 'Step 4' }
            ]"
            :current-step="1"
            color="success"
          />
        </div>
        
        <div>
          <h3 class="text-lg font-bold mb-4">Warning</h3>
          <Steps 
            :steps="[
              { title: 'Step 1' },
              { title: 'Step 2' },
              { title: 'Step 3' },
              { title: 'Step 4' }
            ]"
            :current-step="1"
            color="warning"
          />
        </div>
        
        <div>
          <h3 class="text-lg font-bold mb-4">Error</h3>
          <Steps 
            :steps="[
              { title: 'Step 1' },
              { title: 'Step 2' },
              { title: 'Step 3' },
              { title: 'Step 4' }
            ]"
            :current-step="1"
            color="error"
          />
        </div>
      </div>
    `,
    }),
}

export const CheckoutProcess: Story = {
    render: () => ({
        components: { Steps, Button, Card },
        setup() {
            const currentStep = ref(1)
            const steps = checkoutSteps

            const handleStepClick = (index: number) => {
                currentStep.value = index
                console.log(`Step clicked: ${index}`)
            }

            return {
                currentStep,
                steps,
                handleStepClick,
            }
        },
        template: `
      <div class="bg-base-200 p-8 rounded-lg">
        <h3 class="text-xl font-bold mb-6">Checkout Process</h3>
        
        <Steps 
          :steps="steps"
          :current-step="currentStep"
          color="primary"
          class="mb-8"
          @step-click="handleStepClick"
        />
        
        <Card>
          <div class="card-body">
            <div v-if="currentStep === 0">
              <h4 class="text-lg font-bold mb-4">Shopping Cart</h4>
              <p>Review your items and proceed to shipping.</p>
              <div class="bg-base-200 p-4 rounded-lg mt-4">
                <div class="flex justify-between items-center mb-2">
                  <span class="font-medium">Product Name</span>
                  <span class="text-success font-semibold">$29.99</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="font-medium">Quantity</span>
                  <span>1</span>
                </div>
              </div>
            </div>
            
            <div v-else-if="currentStep === 1">
              <h4 class="text-lg font-bold mb-4">Shipping Information</h4>
              <p>Enter your delivery address and shipping preferences.</p>
              <div class="bg-base-200 p-4 rounded-lg mt-4">
                <p class="text-sm">Shipping address form would go here...</p>
              </div>
            </div>
            
            <div v-else-if="currentStep === 2">
              <h4 class="text-lg font-bold mb-4">Payment Details</h4>
              <p>Provide billing information and payment method.</p>
              <div class="bg-base-200 p-4 rounded-lg mt-4">
                <p class="text-sm">Payment form would go here...</p>
              </div>
            </div>
            
            <div v-else-if="currentStep === 3">
              <h4 class="text-lg font-bold mb-4">Order Confirmation</h4>
              <p>Thank you! Your order has been placed successfully.</p>
              <div class="bg-success/20 p-4 rounded-lg mt-4">
                <div class="flex items-center gap-2">
                  <CheckCircle class="w-5 h-5 text-success" />
                  <span class="font-medium">Order #12345 confirmed</span>
                </div>
              </div>
            </div>
            
            <div class="card-actions justify-end mt-6">
              <Button 
                @click="currentStep = Math.max(0, currentStep - 1)"
                :disabled="currentStep === 0"
                variant="outline"
              >
                Previous
              </Button>
              <Button 
                @click="currentStep = Math.min(3, currentStep + 1)"
                :disabled="currentStep === 3"
              >
                {{ currentStep === 3 ? 'Complete' : 'Next' }}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    `,
    }),
}

export const ProgressTracking: Story = {
    render: () => ({
        components: { Steps, Card, MapPin },
        setup() {
            const orderStep = ref(2)
            const orderSteps = orderTrackingSteps

            const handleStepClick = (index: number) => {
                orderStep.value = index
                console.log(`Step clicked: ${index}`)
            }

            return {
                orderStep,
                orderSteps,
                handleStepClick,
            }
        },
        template: `
      <div class="bg-base-100 shadow-xl rounded-lg p-8">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h3 class="text-xl font-bold">Order #12345</h3>
            <p class="text-sm opacity-70">Tracking your order status</p>
          </div>
          <div class="badge badge-primary">In Transit</div>
        </div>
        
        <Steps 
          :steps="orderSteps"
          :current-step="orderStep"
          color="primary"
          @step-click="handleStepClick"
        />
        
        <Card class="mt-8">
          <div class="card-body">
            <h4 class="font-bold mb-2">Current Status: {{ orderSteps[orderStep].title }}</h4>
            <p class="text-sm">{{ orderSteps[orderStep].description }}</p>
            <p class="text-xs opacity-70 mt-2">Last updated: 2 hours ago</p>
            
            <div class="mt-4 p-4 bg-base-200 rounded-lg">
              <div class="flex items-center gap-2 mb-2">
                <MapPin class="w-4 h-4" />
                <span class="font-medium">Current Location</span>
              </div>
              <p class="text-sm">Package is in transit to your local distribution center</p>
            </div>
          </div>
        </Card>
      </div>
    `,
    }),
}

export const CustomContent: Story = {
    render: () => ({
        components: { Steps, ClipboardList, Code, TestTube, Rocket },
        template: `
      <Steps 
        :steps="[
          { title: 'Planning' },
          { title: 'Development' },
          { title: 'Testing' },
          { title: 'Deployment' }
        ]"
        :current-step="1"
        color="secondary"
      >
        <template #step-0="{ step, isActive, isCompleted }">
          <div class="text-center">
            <div class="mb-2">
              <ClipboardList 
                class="w-8 h-8"
                :class="{ 'text-primary': isActive, 'text-success': isCompleted }" 
              />
            </div>
            <div class="font-medium">{{ step.title }}</div>
            <div class="text-xs opacity-70">Define requirements</div>
          </div>
        </template>
        
        <template #step-1="{ step, isActive, isCompleted }">
          <div class="text-center">
            <div class="mb-2">
              <Code 
                class="w-8 h-8"
                :class="{ 'text-primary': isActive, 'text-success': isCompleted }" 
              />
            </div>
            <div class="font-medium">{{ step.title }}</div>
            <div class="text-xs opacity-70">Write the code</div>
          </div>
        </template>
        
        <template #step-2="{ step, isActive, isCompleted }">
          <div class="text-center">
            <div class="mb-2">
              <TestTube 
                class="w-8 h-8"
                :class="{ 'text-primary': isActive, 'text-success': isCompleted }" 
              />
            </div>
            <div class="font-medium">{{ step.title }}</div>
            <div class="text-xs opacity-70">Quality assurance</div>
          </div>
        </template>
        
        <template #step-3="{ step, isActive, isCompleted }">
          <div class="text-center">
            <div class="mb-2">
              <Rocket 
                class="w-8 h-8"
                :class="{ 'text-primary': isActive, 'text-success': isCompleted }" 
              />
            </div>
            <div class="font-medium">{{ step.title }}</div>
            <div class="text-xs opacity-70">Go live</div>
          </div>
        </template>
      </Steps>
    `,
    }),
}

export const InteractiveSteps: Story = {
    render: () => ({
        components: { Steps, Button, Card, Avatar, User, Settings, CheckCircle },
        setup() {
            const currentStep = ref(0)
            const steps = [
                {
                    title: 'Personal Info',
                    description: 'Tell us about yourself',
                    icon: 'user' as const,
                },
                {
                    title: 'Preferences',
                    description: 'Set your preferences',
                    icon: 'settings' as const,
                },
                {
                    title: 'Confirmation',
                    description: 'Review and confirm',
                    icon: 'check-circle' as const,
                },
            ]

            const handleStepClick = (index: number) => {
                currentStep.value = index
                console.log(`Step clicked: ${index}`)
            }

            const stepData = ref({
                name: 'John Doe',
                email: 'john@example.com',
                newsletter: true,
                notifications: false,
            })

            return {
                currentStep,
                steps,
                stepData,
                handleStepClick,
            }
        },
        template: `
      <div class="w-full max-w-2xl mx-auto">
        <div class="text-center mb-8">
          <h2 class="text-2xl font-bold mb-2">Interactive Steps</h2>
          <p class="opacity-70">Click on any step to navigate through the process</p>
        </div>

        <Steps 
          :steps="steps"
          :current-step="currentStep"
          color="primary"
          @step-click="handleStepClick"
          class="mb-8"
        />

        <Card>
          <div class="card-body">
            <div v-if="currentStep === 0" class="space-y-4">
              <div class="text-center">
                <Avatar size="lg" fallback-color="primary" class="mx-auto mb-4">
                  <User class="w-8 h-8" />
                </Avatar>
                <h3 class="text-xl font-bold mb-2">Personal Information</h3>
                <p class="opacity-70">Tell us about yourself</p>
              </div>
              
              <div class="space-y-2">
                <div><strong>Name:</strong> {{ stepData.name }}</div>
                <div><strong>Email:</strong> {{ stepData.email }}</div>
              </div>
            </div>

            <div v-else-if="currentStep === 1" class="space-y-4">
              <div class="text-center">
                <Avatar size="lg" fallback-color="secondary" class="mx-auto mb-4">
                  <Settings class="w-8 h-8" />
                </Avatar>
                <h3 class="text-xl font-bold mb-2">Preferences</h3>
                <p class="opacity-70">Set your communication preferences</p>
              </div>
              
              <div class="space-y-2">
                <div><strong>Newsletter:</strong> {{ stepData.newsletter ? 'Yes' : 'No' }}</div>
                <div><strong>Notifications:</strong> {{ stepData.notifications ? 'Yes' : 'No' }}</div>
              </div>
            </div>

            <div v-else-if="currentStep === 2" class="space-y-4">
              <div class="text-center">
                <Avatar size="lg" fallback-color="success" class="mx-auto mb-4">
                  <CheckCircle class="w-8 h-8" />
                </Avatar>
                <h3 class="text-xl font-bold mb-2">Confirmation</h3>
                <p class="opacity-70">Review your information</p>
              </div>
              
              <div class="bg-base-200 p-4 rounded-lg">
                <h4 class="font-semibold mb-2">Summary</h4>
                <div class="space-y-1 text-sm">
                  <div><strong>Name:</strong> {{ stepData.name }}</div>
                  <div><strong>Email:</strong> {{ stepData.email }}</div>
                  <div><strong>Newsletter:</strong> {{ stepData.newsletter ? 'Yes' : 'No' }}</div>
                  <div><strong>Notifications:</strong> {{ stepData.notifications ? 'Yes' : 'No' }}</div>
                </div>
              </div>
            </div>

            <div class="card-actions justify-end mt-6">
              <Button 
                @click="currentStep = Math.max(0, currentStep - 1)"
                :disabled="currentStep === 0"
                variant="outline"
              >
                Previous
              </Button>
              <Button 
                @click="currentStep = Math.min(2, currentStep + 1)"
                :disabled="currentStep === 2"
              >
                {{ currentStep === 2 ? 'Complete' : 'Next' }}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    `,
    }),
}

export const Minimal: Story = {
    args: {
        steps: [{ title: 'Step 1' }, { title: 'Step 2' }, { title: 'Step 3' }],
        currentStep: 0,
        showNumbers: true,
    },
}

export const WithIcons: Story = {
    args: {
        steps: [
            { title: 'Account', icon: 'user' as const },
            { title: 'Profile', icon: 'settings' as const },
            { title: 'Complete', icon: 'check' as const },
        ],
        currentStep: 1,
        showNumbers: false,
    },
}

export const VerticalWithIcons: Story = {
    args: {
        steps: [
            {
                title: 'Setup',
                description: 'Initial setup',
                icon: 'settings' as const,
            },
            {
                title: 'Configure',
                description: 'Configuration',
                icon: 'settings' as const,
            },
            {
                title: 'Test',
                description: 'Testing phase',
                icon: 'settings' as const,
            },
            {
                title: 'Deploy',
                description: 'Deployment',
                icon: 'settings' as const,
            },
        ],
        currentStep: 2,
        variant: 'vertical',
        showNumbers: false,
    },
}

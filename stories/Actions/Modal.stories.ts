import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import Modal from './Modal.vue';
import Button from './Button.vue';

const meta: Meta<typeof Modal> = {
  title: 'Actions/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          "A flexible modal component built on DaisyUI's native modal system. Uses the HTML dialog element with DaisyUI modal classes for consistent styling and behavior. Features Button and Icon components for the close button. Supports Vue 3.5+ `defineModel()` for two-way binding.",
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl', 'full'],
      description: 'Modal size - responsive design with mobile-first approach',
    },
    title: {
      control: { type: 'text' },
      description: 'Modal title displayed in the header',
    },
    closable: {
      control: { type: 'boolean' },
      description: 'Show close button in the top-right corner',
    },
    closeOnOverlay: {
      control: { type: 'boolean' },
      description: 'Close when clicking the backdrop overlay',
    },
    closeOnEsc: {
      control: { type: 'boolean' },
      description: 'Close when pressing the Escape key',
    },
    persistent: {
      control: { type: 'boolean' },
      description: 'Prevent modal from being closed (overrides other close behaviors)',
    },
    trapFocus: {
      control: { type: 'boolean' },
      description: 'Trap focus within the modal for accessibility',
    },
    returnFocus: {
      control: { type: 'boolean' },
      description: 'Return focus to the previous element when modal closes',
    },
    autoFocus: {
      control: { type: 'boolean' },
      description: 'Automatically focus the first focusable element when modal opens',
    },
    zIndex: {
      control: { type: 'number', min: 10, max: 100, step: 10 },
      description: 'Z-index for modal layering',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => ({
    components: { Modal, Button },
    setup() {
      const isOpen = ref(false);
      const openModal = () => {
        console.log('Opening modal');
        isOpen.value = true;
      };

      return { args, isOpen, openModal };
    },
    template: `
      <div>
        <Button @click="openModal">Open Modal</Button>
        
        <Modal 
          v-model="isOpen" 
          v-bind="args"
          title="Modal Title"
        >
          <p>This is a basic modal with some content. You can close it by clicking the X button, pressing Escape, or clicking outside the modal.</p>
          <p class="mt-2 text-sm text-gray-500">Modal state: {{ isOpen ? 'Open' : 'Closed' }}</p>
        </Modal>
      </div>
    `,
  }),
  args: {
    size: 'md',
    closable: true,
    closeOnOverlay: true,
    closeOnEsc: true,
    persistent: false,
    trapFocus: true,
    returnFocus: true,
    autoFocus: true,
    zIndex: 50,
  },
};

export const DaisyUINative: Story = {
  render: () => ({
    components: { Button },
    setup() {
      const showModal = () => {
        const modal = document.getElementById('my_modal_1') as HTMLDialogElement;
        if (modal) {
          modal.showModal();
        }
      };

      return { showModal };
    },
    template: `
      <div>
        <Button @click="showModal">Open DaisyUI Native Modal</Button>
        
        <dialog id="my_modal_1" class="modal">
          <div class="modal-box">
            <h3 class="text-lg font-bold">Hello!</h3>
            <p class="py-4">Press ESC key or click the button below to close</p>
            <div class="modal-action">
              <form method="dialog">
                <!-- if there is a button in form, it will close the modal -->
                <Button variant="primary">Close</Button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'This example shows the traditional DaisyUI modal pattern using the native HTML dialog element with showModal() method.',
      },
    },
  },
};

export const WithFooter: Story = {
  render: args => ({
    components: { Modal, Button },
    setup() {
      const isOpen = ref(false);
      const openModal = () => {
        isOpen.value = true;
      };

      return { args, isOpen, openModal };
    },
    template: `
      <div>
        <Button @click="openModal">Open Modal with Footer</Button>
        
        <Modal 
          v-model="isOpen" 
          v-bind="args"
          title="Confirm Action"
        >
          <p>Are you sure you want to perform this action? This cannot be undone.</p>
          
          <template #footer>
            <Button variant="outline" @click="isOpen = false">Cancel</Button>
            <Button variant="primary" @click="isOpen = false">Confirm</Button>
          </template>
        </Modal>
      </div>
    `,
  }),
  args: {
    size: 'md',
    closable: true,
    closeOnOverlay: true,
    closeOnEsc: true,
    persistent: false,
  },
};

export const CustomHeader: Story = {
  render: args => ({
    components: { Modal, Button },
    setup() {
      const isOpen = ref(false);
      const openModal = () => {
        isOpen.value = true;
      };

      return { args, isOpen, openModal };
    },
    template: `
      <div>
        <Button @click="openModal">Open Modal with Custom Header</Button>
        
        <Modal 
          v-model="isOpen" 
          v-bind="args"
        >
          <template #header>
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                </svg>
              </div>
              <h2 class="text-lg font-semibold">Custom Header</h2>
            </div>
          </template>
          
          <p>This modal has a custom header with an icon and styling.</p>
        </Modal>
      </div>
    `,
  }),
  args: {
    size: 'md',
    closable: true,
    closeOnOverlay: true,
    closeOnEsc: true,
    persistent: false,
  },
};

export const Sizes: Story = {
  render: () => ({
    components: { Modal, Button },
    setup() {
      const modals = ref({
        sm: false,
        md: false,
        lg: false,
        xl: false,
        full: false,
      });

      const openModal = (size: string) => {
        modals.value[size as keyof typeof modals.value] = true;
      };

      return { modals, openModal };
    },
    template: `
      <div class="space-x-2">
        <Button @click="openModal('sm')">Small</Button>
        <Button @click="openModal('md')">Medium</Button>
        <Button @click="openModal('lg')">Large</Button>
        <Button @click="openModal('xl')">Extra Large</Button>
        <Button @click="openModal('full')">Full Screen</Button>
        
        <Modal v-model="modals.sm" size="sm" title="Small Modal">
          <p>This is a small modal perfect for simple confirmations or brief messages.</p>
        </Modal>
        
        <Modal v-model="modals.md" size="md" title="Medium Modal">
          <p>This is a medium modal - the default size for most use cases.</p>
        </Modal>
        
        <Modal v-model="modals.lg" size="lg" title="Large Modal">
          <p>This is a large modal with more content space for forms or detailed information.</p>
        </Modal>
        
        <Modal v-model="modals.xl" size="xl" title="Extra Large Modal">
          <p>This is an extra large modal with even more content space for complex forms, detailed information, or rich content displays.</p>
        </Modal>
        
        <Modal v-model="modals.full" size="full" title="Full Screen Modal">
          <p>This is a full screen modal that takes up the entire viewport. Perfect for complex workflows, detailed forms, or immersive experiences.</p>
        </Modal>
      </div>
    `,
  }),
};

export const Accessibility: Story = {
  render: args => ({
    components: { Modal, Button },
    setup() {
      const isOpen = ref(false);
      const openModal = () => {
        isOpen.value = true;
      };

      return { args, isOpen, openModal };
    },
    template: `
      <div>
        <Button @click="openModal">Open Accessible Modal</Button>
        
        <Modal 
          v-model="isOpen" 
          v-bind="args"
          title="Accessibility Features"
        >
          <div class="space-y-4">
            <div>
              <h3 class="font-semibold mb-2">Keyboard Navigation</h3>
              <ul class="text-sm space-y-1">
                <li>• <kbd class="kbd kbd-sm">Tab</kbd> - Navigate between focusable elements</li>
                <li>• <kbd class="kbd kbd-sm">Shift + Tab</kbd> - Navigate backwards</li>
                <li>• <kbd class="kbd kbd-sm">Escape</kbd> - Close modal (if enabled)</li>
              </ul>
            </div>
            
            <div>
              <h3 class="font-semibold mb-2">Screen Reader Support</h3>
              <ul class="text-sm space-y-1">
                <li>• Proper ARIA attributes</li>
                <li>• Focus trap for keyboard users</li>
                <li>• Descriptive labels and roles</li>
              </ul>
            </div>
            
            <div>
              <h3 class="font-semibold mb-2">Focus Management</h3>
              <ul class="text-sm space-y-1">
                <li>• Auto-focus on first element</li>
                <li>• Return focus when closed</li>
                <li>• Focus trap within modal</li>
              </ul>
            </div>
          </div>
          
          <template #footer>
            <Button variant="primary" @click="isOpen = false">Got it!</Button>
          </template>
        </Modal>
      </div>
    `,
  }),
  args: {
    size: 'lg',
    closable: true,
    closeOnOverlay: true,
    closeOnEsc: true,
    persistent: false,
    trapFocus: true,
    returnFocus: true,
    autoFocus: true,
  },
};

export const Persistent: Story = {
  render: args => ({
    components: { Modal, Button },
    setup() {
      const isOpen = ref(false);
      const openModal = () => {
        isOpen.value = true;
      };

      return { args, isOpen, openModal };
    },
    template: `
      <div>
        <Button @click="openModal">Open Persistent Modal</Button>
        
        <Modal 
          v-model="isOpen" 
          v-bind="args"
          title="Persistent Modal"
        >
          <p>This modal cannot be closed by clicking outside, pressing Escape, or using the X button. You must use the Close button below.</p>
          
          <template #footer>
            <Button variant="primary" @click="isOpen = false">Close Modal</Button>
          </template>
        </Modal>
      </div>
    `,
  }),
  args: {
    size: 'md',
    closable: false,
    closeOnOverlay: false,
    closeOnEsc: false,
    persistent: true,
    trapFocus: true,
    returnFocus: true,
    autoFocus: true,
  },
};

export const FormExample: Story = {
  render: args => ({
    components: { Modal, Button },
    setup() {
      const isOpen = ref(false);
      const formData = ref({
        name: '',
        email: '',
        message: '',
      });

      const openModal = () => {
        isOpen.value = true;
      };

      const submitForm = () => {
        console.log('Form submitted:', formData.value);
        isOpen.value = false;
        // Reset form
        formData.value = { name: '', email: '', message: '' };
      };

      return { args, isOpen, openModal, formData, submitForm };
    },
    template: `
      <div>
        <Button @click="openModal">Open Form Modal</Button>
        
        <Modal 
          v-model="isOpen" 
          v-bind="args"
          title="Contact Form"
        >
          <form @submit.prevent="submitForm" class="space-y-4">
            <div>
              <label for="name" class="block text-sm font-medium mb-1">Name</label>
              <input 
                id="name"
                v-model="formData.name"
                type="text" 
                class="input input-bordered w-full" 
                required
              />
            </div>
            
            <div>
              <label for="email" class="block text-sm font-medium mb-1">Email</label>
              <input 
                id="email"
                v-model="formData.email"
                type="email" 
                class="input input-bordered w-full" 
                required
              />
            </div>
            
            <div>
              <label for="message" class="block text-sm font-medium mb-1">Message</label>
              <textarea 
                id="message"
                v-model="formData.message"
                class="textarea textarea-bordered w-full h-24" 
                required
              ></textarea>
            </div>
          </form>
          
          <template #footer>
            <Button variant="outline" @click="isOpen = false">Cancel</Button>
            <Button variant="primary" @click="submitForm">Submit</Button>
          </template>
        </Modal>
      </div>
    `,
  }),
  args: {
    size: 'lg',
    closable: true,
    closeOnOverlay: false,
    closeOnEsc: true,
    persistent: false,
    trapFocus: true,
    returnFocus: true,
    autoFocus: true,
  },
};

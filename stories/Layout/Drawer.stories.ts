import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Drawer from '../../src/runtime/components/Layout/Drawer.vue';

const meta: Meta<typeof Drawer> = {
  title: 'Layout/Drawer',
  component: Drawer,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    position: {
      control: { type: 'select' },
      options: ['left', 'right', 'top', 'bottom'],
    },
    width: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl', 'full'],
    },
    showCloseButton: {
      control: { type: 'boolean' },
    },
    persistent: {
      control: { type: 'boolean' },
    },
    backdrop: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => ({
    components: { Drawer },
    data() {
      return {
        isOpen: false,
      };
    },
    template: `
      <div class="h-screen">
        <Drawer v-model="isOpen">
          <template #content="{ toggle }">
            <div class="p-8">
              <h1 class="text-3xl font-bold mb-4">Main Content</h1>
              <p class="mb-4">This is the main content area. Click the button below to open the drawer.</p>
              <p class="mb-4 text-sm opacity-70">Drawer is {{ isOpen ? 'open' : 'closed' }}</p>
              <button @click="toggle" class="btn btn-primary">
                {{ isOpen ? 'Close' : 'Open' }} Drawer
              </button>
            </div>
          </template>
          
          <template #drawer>
            <div class="p-6">
              <h2 class="text-xl font-bold mb-4">Drawer Content</h2>
              <ul class="menu">
                <li><a>Home</a></li>
                <li><a>About</a></li>
                <li><a>Services</a></li>
                <li><a>Contact</a></li>
              </ul>
            </div>
          </template>
        </Drawer>
      </div>
    `,
  }),
};

export const RightSide: Story = {
  render: () => ({
    components: { Drawer },
    data() {
      return {
        isOpen: false,
      };
    },
    template: `
      <div class="h-screen">
        <Drawer v-model="isOpen" position="right">
          <template #content="{ toggle }">
            <div class="p-8">
              <h1 class="text-3xl font-bold mb-4">Right Drawer Example</h1>
              <p class="mb-4">The drawer will slide in from the right side.</p>
              <p class="mb-4 text-sm opacity-70">Drawer is {{ isOpen ? 'open' : 'closed' }}</p>
              <button @click="toggle" class="btn btn-secondary">
                {{ isOpen ? 'Close' : 'Open' }} Right Drawer
              </button>
            </div>
          </template>
          
          <template #drawer>
            <div class="p-6">
              <h2 class="text-xl font-bold mb-4">Settings</h2>
              <div class="form-control">
                <label class="label cursor-pointer">
                  <span class="label-text">Dark Mode</span>
                  <input type="checkbox" class="toggle" />
                </label>
              </div>
              <div class="form-control">
                <label class="label cursor-pointer">
                  <span class="label-text">Notifications</span>
                  <input type="checkbox" class="toggle" checked />
                </label>
              </div>
            </div>
          </template>
        </Drawer>
      </div>
    `,
  }),
};

export const WithCloseButton: Story = {
  render: () => ({
    components: { Drawer },
    data() {
      return {
        isOpen: false,
      };
    },
    template: `
      <div class="h-screen">
        <Drawer v-model="isOpen" show-close-button>
          <template #content="{ toggle }">
            <div class="p-8">
              <h1 class="text-3xl font-bold mb-4">Drawer with Close Button</h1>
              <p class="mb-4">This drawer includes a close button in the drawer content.</p>
              <p class="mb-4 text-sm opacity-70">Drawer is {{ isOpen ? 'open' : 'closed' }}</p>
              <button @click="toggle" class="btn btn-accent">
                {{ isOpen ? 'Close' : 'Open' }} Drawer
              </button>
            </div>
          </template>
          
          <template #drawer>
            <div class="p-6">
              <h2 class="text-xl font-bold mb-4">Navigation</h2>
              <ul class="menu">
                <li><a>Dashboard</a></li>
                <li><a>Profile</a></li>
                <li><a>Settings</a></li>
                <li><a>Help</a></li>
                <li><a>Logout</a></li>
              </ul>
            </div>
          </template>
        </Drawer>
      </div>
    `,
  }),
};

export const MobileVariant: Story = {
  render: () => ({
    components: { Drawer },
    data() {
      return {
        isOpen: false,
      };
    },
    template: `
      <div class="h-screen">
        <Drawer v-model="isOpen">
          <template #content="{ toggle }">
            <div class="navbar bg-base-100">
              <div class="navbar-start">
                <button @click="toggle" class="btn btn-square btn-ghost">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                  </svg>
                </button>
              </div>
              <div class="navbar-center">
                <a class="btn btn-ghost text-xl">Mobile App</a>
              </div>
            </div>
            
            <div class="p-8">
              <h1 class="text-2xl font-bold mb-4">Mobile Layout</h1>
              <p>This is optimized for mobile devices with a hamburger menu.</p>
              <p class="mt-4 text-sm opacity-70">Drawer is {{ isOpen ? 'open' : 'closed' }}</p>
            </div>
          </template>
          
          <template #drawer>
            <div class="p-6">
              <div class="flex items-center gap-4 mb-6">
                <div class="avatar">
                  <div class="w-12 rounded-full">
                    <img src="https://via.placeholder.com/48" alt="User" />
                  </div>
                </div>
                <div>
                  <div class="font-bold">John Doe</div>
                  <div class="text-sm opacity-50">john@example.com</div>
                </div>
              </div>
              
              <ul class="menu">
                <li><a>Dashboard</a></li>
                <li><a>Profile</a></li>
                <li><a>Messages</a></li>
                <li><a>Settings</a></li>
                <li><a>Mobile App</a></li>
              </ul>
            </div>
          </template>
        </Drawer>
      </div>
    `,
  }),
};

export const OverlayVariant: Story = {
  render: () => ({
    components: { Drawer },
    data() {
      return {
        isOpen: false,
      };
    },
    template: `
      <div class="h-screen">
        <Drawer v-model="isOpen">
          <template #content="{ toggle }">
            <div class="hero min-h-screen bg-base-200">
              <div class="hero-content text-center">
                <div class="max-w-md">
                  <h1 class="text-5xl font-bold">Overlay Drawer</h1>
                  <p class="py-6">
                    This drawer appears as an overlay on top of the content.
                  </p>
                  <p class="mb-4 text-sm opacity-70">Drawer is {{ isOpen ? 'open' : 'closed' }}</p>
                  <button @click="toggle" class="btn btn-primary">
                    {{ isOpen ? 'Close' : 'Open' }} Overlay
                  </button>
                </div>
              </div>
            </div>
          </template>
          
          <template #drawer>
            <div class="p-6">
              <h2 class="text-xl font-bold mb-4">Quick Actions</h2>
              <div class="grid gap-4">
                <button class="btn btn-outline">New Document</button>
                <button class="btn btn-outline">Upload File</button>
                <button class="btn btn-outline">Share Link</button>
                <button class="btn btn-outline">Export Data</button>
              </div>
            </div>
          </template>
        </Drawer>
      </div>
    `,
  }),
};

export const Persistent: Story = {
  render: () => ({
    components: { Drawer },
    data() {
      return {
        isOpen: true,
      };
    },
    template: `
      <div class="h-screen">
        <Drawer v-model="isOpen" persistent>
          <template #content>
            <div class="p-8">
              <h1 class="text-3xl font-bold mb-4">Persistent Drawer</h1>
              <p class="mb-4">
                This drawer is always open and cannot be closed by clicking outside.
                Perfect for desktop layouts with permanent navigation.
              </p>
              <p class="mb-4 text-sm opacity-70">Drawer is {{ isOpen ? 'open' : 'closed' }}</p>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="card bg-base-100 shadow-xl">
                  <div class="card-body">
                    <h2 class="card-title">Card 1</h2>
                    <p>Some content here</p>
                  </div>
                </div>
                <div class="card bg-base-100 shadow-xl">
                  <div class="card-body">
                    <h2 class="card-title">Card 2</h2>
                    <p>More content here</p>
                  </div>
                </div>
              </div>
            </div>
          </template>
          
          <template #drawer>
            <div class="p-6">
              <h2 class="text-lg font-bold mb-4">Persistent Navigation</h2>
              <ul class="menu">
                <li><a class="active">Dashboard</a></li>
                <li><a>Analytics</a></li>
                <li><a>Users</a></li>
                <li><a>Reports</a></li>
                <li><a>Settings</a></li>
              </ul>
            </div>
          </template>
        </Drawer>
      </div>
    `,
  }),
};

export const WithEvents: Story = {
  render: () => ({
    components: { Drawer },
    data() {
      return {
        isOpen: false,
        eventLog: [],
      };
    },
    methods: {
      onOpen() {
        this.eventLog.push('Drawer opened');
      },
      onClose() {
        this.eventLog.push('Drawer closed');
      },
    },
    template: `
      <div class="h-screen">
        <Drawer v-model="isOpen" @open="onOpen" @close="onClose">
          <template #content="{ toggle }">
            <div class="p-8">
              <h1 class="text-3xl font-bold mb-4">Drawer with Events</h1>
              <p class="mb-4">This example shows how to listen to open/close events.</p>
              <p class="mb-4 text-sm opacity-70">Drawer is {{ isOpen ? 'open' : 'closed' }}</p>
              <button @click="toggle" class="btn btn-primary">
                {{ isOpen ? 'Close' : 'Open' }} Drawer
              </button>
              
              <div class="mt-8">
                <h3 class="text-lg font-bold mb-2">Event Log:</h3>
                <div class="bg-base-200 p-4 rounded-lg max-h-32 overflow-y-auto">
                  <div v-for="(event, index) in eventLog" :key="index" class="text-sm">
                    {{ event }}
                  </div>
                  <div v-if="eventLog.length === 0" class="text-sm opacity-50">
                    No events yet
                  </div>
                </div>
              </div>
            </div>
          </template>
          
          <template #drawer>
            <div class="p-6">
              <h2 class="text-xl font-bold mb-4">Event Demo</h2>
              <p class="mb-4">Open and close this drawer to see events logged.</p>
              <ul class="menu">
                <li><a>Event 1</a></li>
                <li><a>Event 2</a></li>
                <li><a>Event 3</a></li>
              </ul>
            </div>
          </template>
        </Drawer>
      </div>
    `,
  }),
};

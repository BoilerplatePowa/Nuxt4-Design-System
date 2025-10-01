import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Menu from '../../src/runtime/components/Navigation/Menu.vue'

const meta: Meta<typeof Menu> = {
  title: 'Navigation/Menu',
  component: Menu,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'compact', 'horizontal'],
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg'],
    },
    rounded: {
      control: { type: 'boolean' },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const sampleMenuItems = [
  { label: 'Dashboard', href: '/dashboard', icon: '📊' },
  { label: 'Users', href: '/users', icon: '👥', badge: '12' },
  { label: 'Products', href: '/products', icon: '📦' },
  { divider: true },
  { title: 'Settings' },
  { label: 'Profile', href: '/profile', icon: '👤' },
  { label: 'Account', href: '/account', icon: '⚙️' },
  { label: 'Logout', href: '/logout', icon: '🚪' },
]

const hierarchicalMenu = [
  { label: 'Home', href: '/', icon: '🏠' },
  {
    label: 'Products',
    icon: '📦',
    children: [
      { label: 'Electronics', href: '/products/electronics' },
      { label: 'Clothing', href: '/products/clothing' },
      { label: 'Books', href: '/products/books' },
    ],
  },
  {
    label: 'Services',
    icon: '🛠️',
    children: [
      { label: 'Consulting', href: '/services/consulting' },
      { label: 'Support', href: '/services/support' },
      { label: 'Training', href: '/services/training' },
    ],
  },
  { label: 'About', href: '/about', icon: 'ℹ️' },
  { label: 'Contact', href: '/contact', icon: '📞' },
]

export const Default: Story = {
  args: {
    items: sampleMenuItems,
  },
}

export const Compact: Story = {
  args: {
    items: sampleMenuItems,
    variant: 'compact',
  },
}

export const Horizontal: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'Services', href: '/services' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
    variant: 'horizontal',
  },
}

export const WithIcons: Story = {
  args: {
    items: [
      { label: 'Dashboard', href: '/dashboard', icon: '📊' },
      { label: 'Analytics', href: '/analytics', icon: '📈' },
      { label: 'Reports', href: '/reports', icon: '📄' },
      { label: 'Settings', href: '/settings', icon: '⚙️' },
      { label: 'Help', href: '/help', icon: '❓' },
    ],
  },
}

export const WithBadges: Story = {
  args: {
    items: [
      { label: 'Inbox', href: '/inbox', icon: '📧', badge: '5' },
      { label: 'Messages', href: '/messages', icon: '💬', badge: '12' },
      {
        label: 'Notifications',
        href: '/notifications',
        icon: '🔔',
        badge: '3',
      },
      { label: 'Tasks', href: '/tasks', icon: '✅', badge: '8' },
      { label: 'Archive', href: '/archive', icon: '📁' },
    ],
  },
}

export const Hierarchical: Story = {
  args: {
    items: hierarchicalMenu,
  },
}

export const Sizes: Story = {
  render: () => ({
    components: { Menu },
    template: `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 class="text-lg font-bold mb-4">Extra Small</h3>
          <Menu 
            size="xs"
            :items="[
              { label: 'Home', href: '/', icon: '🏠' },
              { label: 'About', href: '/about', icon: 'ℹ️' },
              { label: 'Contact', href: '/contact', icon: '📞' }
            ]"
          />
        </div>
        
        <div>
          <h3 class="text-lg font-bold mb-4">Small</h3>
          <Menu 
            size="sm"
            :items="[
              { label: 'Home', href: '/', icon: '🏠' },
              { label: 'About', href: '/about', icon: 'ℹ️' },
              { label: 'Contact', href: '/contact', icon: '📞' }
            ]"
          />
        </div>
        
        <div>
          <h3 class="text-lg font-bold mb-4">Medium</h3>
          <Menu 
            size="md"
            :items="[
              { label: 'Home', href: '/', icon: '🏠' },
              { label: 'About', href: '/about', icon: 'ℹ️' },
              { label: 'Contact', href: '/contact', icon: '📞' }
            ]"
          />
        </div>
        
        <div>
          <h3 class="text-lg font-bold mb-4">Large</h3>
          <Menu 
            size="lg"
            :items="[
              { label: 'Home', href: '/', icon: '🏠' },
              { label: 'About', href: '/about', icon: 'ℹ️' },
              { label: 'Contact', href: '/contact', icon: '📞' }
            ]"
          />
        </div>
      </div>
    `,
  }),
}

export const CustomContent: Story = {
  render: () => ({
    components: { Menu },
    template: `
      <Menu>
        <li><a class="active">Dashboard</a></li>
        <li><a>Users</a></li>
        <li>
          <details open>
            <summary>Products</summary>
            <ul>
              <li><a>Electronics</a></li>
              <li><a>Clothing</a></li>
              <li><a>Books</a></li>
            </ul>
          </details>
        </li>
        <li><a>Settings</a></li>
        <li><a disabled>Coming Soon</a></li>
      </Menu>
    `,
  }),
}

export const SidebarLayout: Story = {
  render: () => ({
    components: { Menu },
    template: `
      <div class="flex h-96">
        <div class="w-64 bg-base-200 p-4">
          <div class="mb-6">
            <h2 class="text-xl font-bold">Admin Panel</h2>
            <p class="text-sm opacity-70">Welcome back, John</p>
          </div>
          
          <Menu 
            :items="[
              { title: 'Main' },
              { label: 'Dashboard', href: '/dashboard', icon: '📊', active: true },
              { label: 'Analytics', href: '/analytics', icon: '📈' },
              { divider: true },
              { title: 'Management' },
              { label: 'Users', href: '/users', icon: '👥', badge: '24' },
              { label: 'Products', href: '/products', icon: '📦', badge: '156' },
              { label: 'Orders', href: '/orders', icon: '🛒', badge: '12' },
              { divider: true },
              { title: 'System' },
              { label: 'Settings', href: '/settings', icon: '⚙️' },
              { label: 'Logs', href: '/logs', icon: '📄' },
              { label: 'Logout', href: '/logout', icon: '🚪' }
            ]"
          />
        </div>
        
        <div class="flex-1 p-8 bg-base-100">
          <h1 class="text-3xl font-bold mb-4">Dashboard</h1>
          <p>Main content area goes here...</p>
        </div>
      </div>
    `,
  }),
}

export const DropdownMenu: Story = {
  render: () => ({
    components: { Menu },
    template: `
      <div class="flex gap-4">
        <div class="dropdown">
          <div tabindex="0" role="button" class="btn">
            User Menu
            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
          <Menu 
            tabindex="0"
            class="dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            :items="[
              { label: 'Profile', href: '/profile', icon: '👤' },
              { label: 'Account Settings', href: '/settings', icon: '⚙️' },
              { label: 'Billing', href: '/billing', icon: '💳' },
              { divider: true },
              { label: 'Help & Support', href: '/help', icon: '❓' },
              { label: 'Logout', href: '/logout', icon: '🚪' }
            ]"
          />
        </div>
        
        <div class="dropdown dropdown-end">
          <div tabindex="0" role="button" class="btn btn-circle">
            <div class="indicator">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5z"></path>
              </svg>
              <span class="badge badge-xs badge-primary indicator-item"></span>
            </div>
          </div>
          <Menu 
            tabindex="0"
            class="dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-64"
            :items="[
              { title: 'Notifications' },
              { label: 'New message from John', href: '#', icon: '💬' },
              { label: 'Your order has shipped', href: '#', icon: '📦' },
              { label: 'Payment received', href: '#', icon: '💰' },
              { divider: true },
              { label: 'View all notifications', href: '/notifications' }
            ]"
          />
        </div>
      </div>
    `,
  }),
}

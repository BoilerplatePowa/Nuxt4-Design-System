import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Menu from '../../src/runtime/components/Navigation/Menu.vue'
import {
    Home,
    Users,
    Library,
    Settings,
    User,
    LogOut,
    ShoppingCart,
    Settings2,
    Info,
    Phone,
    BarChart,
    LineChart,
    File,
    HelpCircle,
    Mail,
    MessageSquare,
    Bell,
    CheckCircle,
    Archive,
    CreditCard,
    DollarSign,
} from 'lucide-vue-next'

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
        compact: {
            control: { type: 'boolean' },
            description: 'Compact spacing for items',
        },
        size: {
            control: { type: 'select' },
            options: ['xs', 'sm', 'md', 'lg'],
        },
        rounded: {
            control: { type: 'boolean' },
        },
        'onItem-click': { action: 'item-click' },
    },
}

export default meta
type Story = StoryObj<typeof meta>

const sampleMenuItems = [
    { label: 'Dashboard', href: '/dashboard', icon: Home },
    { label: 'Users', href: '/users', icon: Users, badge: '12' },
    { label: 'Products', href: '/products', icon: Library },
    { title: 'Settings' },
    { label: 'Profile', href: '/profile', icon: User },
    { label: 'Account', href: '/account', icon: Settings },
    { label: 'Logout', href: '/logout', icon: LogOut },
]

const hierarchicalMenu = [
    { label: 'Home', href: '/', icon: Home },
    {
        label: 'Products',
        icon: ShoppingCart,
        children: [
            { label: 'Electronics', href: '/products/electronics' },
            { label: 'Clothing', href: '/products/clothing' },
            { label: 'Books', href: '/products/books' },
        ],
    },
    {
        label: 'Services',
        icon: Settings2,
        children: [
            { label: 'Consulting', href: '/services/consulting' },
            { label: 'Support', href: '/services/support' },
            { label: 'Training', href: '/services/training' },
        ],
    },
    { label: 'About', href: '/about', icon: Info },
    { label: 'Contact', href: '/contact', icon: Phone },
]

export const Default: Story = {
    args: {
        items: sampleMenuItems,
    },
    render: (args) => ({
        components: { Menu },
        setup() {
            return { args }
        },
        template: '<Menu v-bind="args" @item-click="args[\'onItem-click\']" />',
    }),
}

export const Compact: Story = {
    args: {
        items: sampleMenuItems,
        variant: 'compact',
        compact: true,
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
        compact: true,
    },
}

export const WithIcons: Story = {
    args: {
        items: [
            { label: 'Dashboard', href: '/dashboard', icon: BarChart },
            { label: 'Analytics', href: '/analytics', icon: LineChart },
            { label: 'Reports', href: '/reports', icon: File },
            { label: 'Settings', href: '/settings', icon: Settings },
            { label: 'Help', href: '/help', icon: HelpCircle },
        ],
    },
}

export const WithBadges: Story = {
    args: {
        items: [
            { label: 'Inbox', href: '/inbox', icon: Mail, badge: '5' },
            { label: 'Messages', href: '/messages', icon: MessageSquare, badge: '12' },
            {
                label: 'Notifications',
                href: '/notifications',
                icon: Bell,
                badge: '3',
            },
            { label: 'Tasks', href: '/tasks', icon: CheckCircle, badge: '8' },
            { label: 'Archive', href: '/archive', icon: Archive },
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
        setup() {
            const menuItems = [
                { label: 'Home', href: '/', icon: Home },
                { label: 'About', href: '/about', icon: Info },
                { label: 'Contact', href: '/contact', icon: Phone },
            ]
            return { menuItems }
        },
        template: `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 class="text-lg font-bold mb-4">Extra Small</h3>
          <Menu size="xs" :items="menuItems" />
        </div>
        
        <div>
          <h3 class="text-lg font-bold mb-4">Small</h3>
          <Menu size="sm" :items="menuItems" />
        </div>
        
        <div>
          <h3 class="text-lg font-bold mb-4">Medium</h3>
          <Menu size="md" :items="menuItems" />
        </div>
        
        <div>
          <h3 class="text-lg font-bold mb-4">Large</h3>
          <Menu size="lg" :items="menuItems" />
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
        setup() {
            const sidebarItems = [
                { title: 'Main' },
                { label: 'Dashboard', href: '/dashboard', icon: BarChart, active: true },
                { label: 'Analytics', href: '/analytics', icon: LineChart },
                { title: 'Management' },
                { label: 'Users', href: '/users', icon: Users, badge: '24' },
                { label: 'Products', href: '/products', icon: Library, badge: '156' },
                { label: 'Orders', href: '/orders', icon: ShoppingCart, badge: '12' },
                { title: 'System' },
                { label: 'Settings', href: '/settings', icon: Settings },
                { label: 'Logs', href: '/logs', icon: File },
                { label: 'Logout', href: '/logout', icon: LogOut },
            ]
            return { sidebarItems }
        },
        template: `
      <div class="flex h-96">
        <div class="w-64 bg-base-200 p-4">
          <div class="mb-6">
            <h2 class="text-xl font-bold">Admin Panel</h2>
            <p class="text-sm opacity-70">Welcome back, John</p>
          </div>
          
          <Menu :items="sidebarItems" />
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
        setup() {
            const userMenuItems = [
                { label: 'Profile', href: '/profile', icon: User },
                { label: 'Account Settings', href: '/settings', icon: Settings },
                { label: 'Billing', href: '/billing', icon: CreditCard },
                { label: 'Help & Support', href: '/help', icon: HelpCircle },
                { label: 'Logout', href: '/logout', icon: LogOut },
            ]
            const notificationItems = [
                { title: 'Notifications' },
                { label: 'New message from John', href: '#', icon: MessageSquare },
                { label: 'Your order has shipped', href: '#', icon: ShoppingCart },
                { label: 'Payment received', href: '#', icon: DollarSign },
                { label: 'View all notifications', href: '/notifications' },
            ]
            return { userMenuItems, notificationItems }
        },
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
            :items="userMenuItems"
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
            :items="notificationItems"
          />
        </div>
      </div>
    `,
    }),
}

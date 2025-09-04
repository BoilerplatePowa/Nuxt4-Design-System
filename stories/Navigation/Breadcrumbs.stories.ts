import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Breadcrumbs from '../../src/runtime/components/Navigation/Breadcrumbs.vue';

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Navigation/Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg'],
    },
    separator: {
      control: { type: 'text' },
    },
    maxItems: {
      control: { type: 'number' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const basicItems = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Electronics', href: '/products/electronics' },
  { label: 'Smartphones' },
];

const itemsWithIcons = [
  { label: 'Home', href: '/', icon: '🏠' },
  { label: 'Dashboard', href: '/dashboard', icon: '📊' },
  { label: 'Analytics', href: '/analytics', icon: '📈' },
  { label: 'Reports', icon: '📄' },
];

export const Default: Story = {
  args: {
    items: basicItems,
  },
};

export const WithIcons: Story = {
  args: {
    items: itemsWithIcons,
  },
};

export const CustomSeparator: Story = {
  args: {
    items: basicItems,
    separator: '→',
  },
};

export const Sizes: Story = {
  render: () => ({
    components: { Breadcrumbs },
    template: `
      <div class="space-y-6">
        <div>
          <h3 class="text-lg font-bold mb-2">Extra Small</h3>
          <Breadcrumbs 
            size="xs"
            :items="[
              { label: 'Home', href: '/' },
              { label: 'Products', href: '/products' },
              { label: 'Current Page' }
            ]"
          />
        </div>
        
        <div>
          <h3 class="text-lg font-bold mb-2">Small</h3>
          <Breadcrumbs 
            size="sm"
            :items="[
              { label: 'Home', href: '/' },
              { label: 'Products', href: '/products' },
              { label: 'Current Page' }
            ]"
          />
        </div>
        
        <div>
          <h3 class="text-lg font-bold mb-2">Medium</h3>
          <Breadcrumbs 
            size="md"
            :items="[
              { label: 'Home', href: '/' },
              { label: 'Products', href: '/products' },
              { label: 'Current Page' }
            ]"
          />
        </div>
        
        <div>
          <h3 class="text-lg font-bold mb-2">Large</h3>
          <Breadcrumbs 
            size="lg"
            :items="[
              { label: 'Home', href: '/' },
              { label: 'Products', href: '/products' },
              { label: 'Current Page' }
            ]"
          />
        </div>
      </div>
    `,
  }),
};

export const LongPath: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Categories', href: '/categories' },
      { label: 'Electronics', href: '/categories/electronics' },
      { label: 'Computers', href: '/categories/electronics/computers' },
      { label: 'Laptops', href: '/categories/electronics/computers/laptops' },
      { label: 'Gaming', href: '/categories/electronics/computers/laptops/gaming' },
      {
        label: 'High Performance',
        href: '/categories/electronics/computers/laptops/gaming/high-performance',
      },
      { label: 'Current Product' },
    ],
  },
};

export const WithMaxItems: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Categories', href: '/categories' },
      { label: 'Electronics', href: '/categories/electronics' },
      { label: 'Computers', href: '/categories/electronics/computers' },
      { label: 'Laptops', href: '/categories/electronics/computers/laptops' },
      { label: 'Gaming', href: '/categories/electronics/computers/laptops/gaming' },
      { label: 'Current Product' },
    ],
    maxItems: 4,
  },
};

export const CustomContent: Story = {
  render: () => ({
    components: { Breadcrumbs },
    template: `
      <Breadcrumbs>
        <li>
          <a href="/" class="flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Home
          </a>
        </li>
        <li>
          <a href="/products" class="flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            Products
          </a>
        </li>
        <li>
          <span class="flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
            Electronics
          </span>
        </li>
      </Breadcrumbs>
    `,
  }),
};

export const EcommercePath: Story = {
  render: () => ({
    components: { Breadcrumbs },
    template: `
      <div class="space-y-8">
        <div class="bg-base-200 p-6 rounded-lg">
          <h3 class="text-lg font-bold mb-4">E-commerce Product Page</h3>
          <Breadcrumbs 
            :items="[
              { label: 'Home', href: '/', icon: '🏠' },
              { label: 'Men', href: '/men', icon: '👤' },
              { label: 'Clothing', href: '/men/clothing', icon: '👕' },
              { label: 'T-Shirts', href: '/men/clothing/t-shirts', icon: '👔' },
              { label: 'Organic Cotton Tee' }
            ]"
          />
          
          <div class="mt-6">
            <h1 class="text-2xl font-bold">Organic Cotton T-Shirt</h1>
            <p class="text-gray-600">Comfortable, sustainable, and stylish.</p>
          </div>
        </div>
        
        <div class="bg-base-200 p-6 rounded-lg">
          <h3 class="text-lg font-bold mb-4">Admin Dashboard</h3>
          <Breadcrumbs 
            :items="[
              { label: 'Dashboard', href: '/admin', icon: '📊' },
              { label: 'Users', href: '/admin/users', icon: '👥' },
              { label: 'Edit User', icon: '✏️' }
            ]"
          />
          
          <div class="mt-6">
            <h1 class="text-2xl font-bold">Edit User Profile</h1>
            <p class="text-gray-600">Modify user information and permissions.</p>
          </div>
        </div>
        
        <div class="bg-base-200 p-6 rounded-lg">
          <h3 class="text-lg font-bold mb-4">Documentation</h3>
          <Breadcrumbs 
            separator="→"
            :items="[
              { label: 'Docs', href: '/docs', icon: '📖' },
              { label: 'Components', href: '/docs/components', icon: '🧩' },
              { label: 'Navigation', href: '/docs/components/navigation', icon: '🧭' },
              { label: 'Breadcrumbs', icon: '🍞' }
            ]"
          />
          
          <div class="mt-6">
            <h1 class="text-2xl font-bold">Breadcrumbs Component</h1>
            <p class="text-gray-600">Learn how to implement breadcrumb navigation.</p>
          </div>
        </div>
      </div>
    `,
  }),
};

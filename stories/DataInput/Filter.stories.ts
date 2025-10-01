import type { Meta, StoryObj } from '@storybook/vue3-vite'

import Filter from '../../src/runtime/components/DataInput/Filter.vue'

const meta: Meta<typeof Filter> = {
  title: 'Data Input/Filter',
  component: Filter,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A flexible filter component supporting multiple input types including text, select, multi-select, range, date range, and boolean toggles.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: 'select',
      options: ['default', 'bordered', 'card'],
    },
    showHeader: {
      control: 'boolean',
    },
    showActiveFilters: {
      control: 'boolean',
    },
    collapsible: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const sampleFilterGroups = [
  {
    title: 'Basic Filters',
    layout: 'vertical' as const,
    filters: [
      {
        key: 'search',
        label: 'Search',
        type: 'text' as const,
        placeholder: 'Search products...',
        value: '',
      },
      {
        key: 'category',
        label: 'Category',
        type: 'select' as const,
        placeholder: 'Select category',
        value: '',
        options: [
          { label: 'Electronics', value: 'electronics' },
          { label: 'Clothing', value: 'clothing' },
          { label: 'Books', value: 'books' },
          { label: 'Home & Garden', value: 'home' },
        ],
      },
    ],
  },
  {
    title: 'Advanced Filters',
    layout: 'grid' as const,
    filters: [
      {
        key: 'price',
        label: 'Price Range',
        type: 'range' as const,
        value: { min: '', max: '' },
        minPlaceholder: 'Min price',
        maxPlaceholder: 'Max price',
      },
      {
        key: 'brands',
        label: 'Brands',
        type: 'multiselect' as const,
        value: [],
        options: [
          { label: 'Apple', value: 'apple' },
          { label: 'Samsung', value: 'samsung' },
          { label: 'Sony', value: 'sony' },
          { label: 'Nike', value: 'nike' },
        ],
      },
      {
        key: 'dateRange',
        label: 'Date Range',
        type: 'daterange' as const,
        value: { start: '', end: '' },
      },
      {
        key: 'inStock',
        label: 'In Stock Only',
        type: 'boolean' as const,
        value: false,
      },
    ],
  },
]

export const Default: Story = {
  args: {
    filterGroups: sampleFilterGroups,
    title: 'Product Filters',
    showHeader: true,
    showActiveFilters: true,
  },
  render: (args) => ({
    components: { Filter },
    setup() {
      const handleFilterChange = (filters: Record<string, any>) => {
        console.log('Filters changed:', filters)
      }

      const handleFilterClear = (key: string) => {
        console.log('Filter cleared:', key)
      }

      const handleFilterClearAll = () => {
        console.log('All filters cleared')
      }

      return {
        args,
        handleFilterChange,
        handleFilterClear,
        handleFilterClearAll,
      }
    },
    template: `
      <div class="w-96 max-w-full">
        <Filter 
          v-bind="args" 
          @filter-change="handleFilterChange"
          @filter-clear="handleFilterClear"
          @filter-clear-all="handleFilterClearAll"
        />
      </div>
    `,
  }),
}

export const Collapsible: Story = {
  args: {
    filterGroups: sampleFilterGroups,
    title: 'Collapsible Filters',
    showHeader: true,
    showActiveFilters: true,
    collapsible: true,
  },
  render: (args) => ({
    components: { Filter },
    setup() {
      const handleFilterChange = (filters: Record<string, any>) => {
        console.log('Filters changed:', filters)
      }

      return { args, handleFilterChange }
    },
    template: `
      <div class="w-96 max-w-full">
        <Filter v-bind="args" @filter-change="handleFilterChange" />
      </div>
    `,
  }),
}

export const CompactLayout: Story = {
  args: {
    filterGroups: [
      {
        title: 'Quick Filters',
        layout: 'horizontal' as const,
        filters: [
          {
            key: 'status',
            label: 'Status',
            type: 'select' as const,
            size: 'sm',
            value: '',
            options: [
              { label: 'Active', value: 'active' },
              { label: 'Inactive', value: 'inactive' },
              { label: 'Pending', value: 'pending' },
            ],
          },
          {
            key: 'priority',
            label: 'Priority',
            type: 'select' as const,
            size: 'sm',
            value: '',
            options: [
              { label: 'High', value: 'high' },
              { label: 'Medium', value: 'medium' },
              { label: 'Low', value: 'low' },
            ],
          },
          {
            key: 'urgent',
            label: 'Urgent Only',
            type: 'boolean' as const,
            value: false,
          },
        ],
      },
    ],
    size: 'sm',
    showHeader: false,
    showActiveFilters: true,
  },
  render: (args) => ({
    components: { Filter },
    setup() {
      const handleFilterChange = (filters: Record<string, any>) => {
        console.log('Filters changed:', filters)
      }

      return { args, handleFilterChange }
    },
    template: `
      <div class="w-full max-w-2xl">
        <Filter v-bind="args" @filter-change="handleFilterChange" />
      </div>
    `,
  }),
}

export const CardVariant: Story = {
  args: {
    filterGroups: [
      {
        title: 'Search & Filter',
        filters: [
          {
            key: 'search',
            label: 'Search',
            type: 'text' as const,
            placeholder: 'Search anything...',
            value: '',
          },
          {
            key: 'tags',
            label: 'Tags',
            type: 'multiselect' as const,
            value: [],
            options: [
              { label: 'Important', value: 'important' },
              { label: 'Urgent', value: 'urgent' },
              { label: 'Review', value: 'review' },
              { label: 'Archive', value: 'archive' },
            ],
          },
        ],
      },
    ],
    variant: 'card',
    title: 'Search Filters',
    showHeader: true,
    showActiveFilters: true,
  },
  render: (args) => ({
    components: { Filter },
    setup() {
      const handleFilterChange = (filters: Record<string, any>) => {
        console.log('Filters changed:', filters)
      }

      return { args, handleFilterChange }
    },
    template: `
      <div class="w-80">
        <Filter v-bind="args" @filter-change="handleFilterChange" />
      </div>
    `,
  }),
}

export const DateRangeFilter: Story = {
  args: {
    filterGroups: [
      {
        title: 'Date Filters',
        filters: [
          {
            key: 'createdDate',
            label: 'Created Date',
            type: 'daterange' as const,
            value: { start: '', end: '' },
          },
          {
            key: 'modifiedDate',
            label: 'Modified Date',
            type: 'daterange' as const,
            value: { start: '', end: '' },
          },
        ],
      },
    ],
    title: 'Date Range Filters',
    showHeader: true,
    showActiveFilters: true,
  },
  render: (args) => ({
    components: { Filter },
    setup() {
      const handleFilterChange = (filters: Record<string, any>) => {
        console.log('Filters changed:', filters)
      }

      return { args, handleFilterChange }
    },
    template: `
      <div class="w-80">
        <Filter v-bind="args" @filter-change="handleFilterChange" />
      </div>
    `,
  }),
}

export const MultipleGroups: Story = {
  args: {
    filterGroups: [
      {
        title: 'Basic Information',
        layout: 'vertical' as const,
        filters: [
          {
            key: 'name',
            label: 'Name',
            type: 'text' as const,
            placeholder: 'Search by name...',
            value: '',
          },
          {
            key: 'type',
            label: 'Type',
            type: 'select' as const,
            value: '',
            options: [
              { label: 'User', value: 'user' },
              { label: 'Admin', value: 'admin' },
              { label: 'Guest', value: 'guest' },
            ],
          },
        ],
      },
      {
        title: 'Preferences',
        layout: 'vertical' as const,
        filters: [
          {
            key: 'notifications',
            label: 'Email Notifications',
            type: 'boolean' as const,
            value: false,
          },
          {
            key: 'newsletter',
            label: 'Newsletter Subscription',
            type: 'boolean' as const,
            value: false,
          },
        ],
      },
      {
        title: 'Statistics',
        layout: 'grid' as const,
        filters: [
          {
            key: 'loginCount',
            label: 'Login Count',
            type: 'range' as const,
            value: { min: '', max: '' },
            minPlaceholder: 'Min',
            maxPlaceholder: 'Max',
          },
          {
            key: 'score',
            label: 'Score Range',
            type: 'range' as const,
            value: { min: '', max: '' },
            minPlaceholder: 'Min score',
            maxPlaceholder: 'Max score',
          },
        ],
      },
    ],
    title: 'User Filters',
    variant: 'bordered',
    showHeader: true,
    showActiveFilters: true,
    collapsible: true,
  },
  render: (args) => ({
    components: { Filter },
    setup() {
      const handleFilterChange = (filters: Record<string, any>) => {
        console.log('Filters changed:', filters)
      }

      return { args, handleFilterChange }
    },
    template: `
      <div class="w-96">
        <Filter v-bind="args" @filter-change="handleFilterChange" />
      </div>
    `,
  }),
}

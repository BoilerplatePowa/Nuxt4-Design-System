import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Table from '../../src/runtime/components/DataDisplay/Table.vue'

const meta: Meta<typeof Table> = {
  title: 'Data Display/Table',
  component: Table,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg'],
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'zebra', 'compact', 'bordered'],
    },
    selectable: {
      control: { type: 'boolean' },
    },
    hoverable: {
      control: { type: 'boolean' },
    },
    loading: {
      control: { type: 'boolean' },
    },
    showHeader: {
      control: { type: 'boolean' },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const sampleColumns = [
  { key: 'id', title: 'ID', sortable: true, format: 'number' as const },
  { key: 'name', title: 'Name', sortable: true },
  { key: 'email', title: 'Email' },
  { key: 'role', title: 'Role' },
  { key: 'status', title: 'Status', align: 'center' as const },
  {
    key: 'salary',
    title: 'Salary',
    sortable: true,
    format: 'currency' as const,
    align: 'right' as const,
  },
]

const sampleData = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Developer',
    status: 'Active',
    salary: 75000,
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'Designer',
    status: 'Active',
    salary: 68000,
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'Manager',
    status: 'Inactive',
    salary: 85000,
  },
  {
    id: 4,
    name: 'Alice Brown',
    email: 'alice@example.com',
    role: 'Developer',
    status: 'Active',
    salary: 72000,
  },
  {
    id: 5,
    name: 'Charlie Wilson',
    email: 'charlie@example.com',
    role: 'Analyst',
    status: 'Active',
    salary: 65000,
  },
]

export const Default: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
  },
}

export const Zebra: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    variant: 'zebra',
  },
}

export const Compact: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    variant: 'compact',
  },
}

export const Bordered: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    variant: 'bordered',
  },
}

export const SmallSize: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    size: 'sm',
  },
}

export const LargeSize: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    size: 'lg',
  },
}

export const Loading: Story = {
  args: {
    columns: sampleColumns,
    data: [],
    loading: true,
  },
}

export const Empty: Story = {
  args: {
    columns: sampleColumns,
    data: [],
  },
}

export const NoHeader: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    showHeader: false,
  },
}

export const Selectable: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    selectable: true,
  },
}

import type { Meta, StoryObj } from '@storybook/vue3-vite'
import List from '../../src/runtime/components/DataDisplay/List.vue'

const meta: Meta<typeof List> = {
  title: 'Data Display/List',
  component: List,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'bordered', 'hover', 'zebra'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    clickable: {
      control: { type: 'boolean' },
    },
    selectable: {
      control: { type: 'boolean' },
    },
    showEmpty: {
      control: { type: 'boolean' },
    },
    dividers: {
      control: { type: 'boolean' },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    items: [
      {
        id: 1,
        title: 'John Doe',
        subtitle: 'Software Engineer',
        description: 'Building amazing web applications with Vue.js',
        avatar: 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg',
      },
      {
        id: 2,
        title: 'Jane Smith',
        subtitle: 'UX Designer',
        description: 'Creating beautiful and intuitive user experiences',
        avatar: 'https://daisyui.com/images/stock/photo-1580489944761-15a19d654956.jpg',
      },
      {
        id: 3,
        title: 'Mike Johnson',
        subtitle: 'Product Manager',
        description: 'Leading product development and strategy',
        avatar: 'https://daisyui.com/images/stock/photo-1507003211169-0a1dd7228f2d.jpg',
      },
    ],
  },
}

export const Variants: Story = {
  render: () => ({
    components: { List },
    data() {
      return {
        sampleItems: [
          {
            id: 1,
            title: 'First Item',
            subtitle: 'Subtitle text',
            description: 'Description of the first item',
          },
          {
            id: 2,
            title: 'Second Item',
            subtitle: 'Another subtitle',
            description: 'Description of the second item',
          },
          {
            id: 3,
            title: 'Third Item',
            subtitle: 'Third subtitle',
            description: 'Description of the third item',
          },
        ],
      }
    },
    template: `
      <div class="space-y-8">
        <div>
          <h3 class="text-lg font-bold mb-4">Default</h3>
          <div class="max-w-md">
            <List :items="sampleItems" />
          </div>
        </div>
        
        <div>
          <h3 class="text-lg font-bold mb-4">Bordered</h3>
          <div class="max-w-md">
            <List :items="sampleItems" variant="bordered" />
          </div>
        </div>
        
        <div>
          <h3 class="text-lg font-bold mb-4">Hover Effect</h3>
          <div class="max-w-md">
            <List :items="sampleItems" variant="hover" />
          </div>
        </div>
        
        <div>
          <h3 class="text-lg font-bold mb-4">Zebra Striping</h3>
          <div class="max-w-md">
            <List :items="sampleItems" variant="zebra" />
          </div>
        </div>
      </div>
    `,
  }),
}

export const Sizes: Story = {
  render: () => ({
    components: { List },
    data() {
      return {
        sampleItems: [
          {
            id: 1,
            title: 'Sample Item',
            subtitle: 'With subtitle',
            description: 'And some description text',
            avatar: 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg',
          },
          {
            id: 2,
            title: 'Another Item',
            subtitle: 'Different subtitle',
            description: 'More description content',
            avatar: 'https://daisyui.com/images/stock/photo-1580489944761-15a19d654956.jpg',
          },
        ],
      }
    },
    template: `
      <div class="space-y-8">
        <div>
          <h3 class="text-lg font-bold mb-4">Small</h3>
          <div class="max-w-md">
            <List :items="sampleItems" size="sm" variant="bordered" />
          </div>
        </div>
        
        <div>
          <h3 class="text-lg font-bold mb-4">Medium (Default)</h3>
          <div class="max-w-md">
            <List :items="sampleItems" size="md" variant="bordered" />
          </div>
        </div>
        
        <div>
          <h3 class="text-lg font-bold mb-4">Large</h3>
          <div class="max-w-md">
            <List :items="sampleItems" size="lg" variant="bordered" />
          </div>
        </div>
      </div>
    `,
  }),
}

export const WithActions: Story = {
  render: () => ({
    components: { List },
    data() {
      return {
        itemsWithActions: [
          {
            id: 1,
            title: 'Invitation from John',
            subtitle: 'Team collaboration request',
            description: 'John has invited you to join the development team',
            meta: '2 hours ago',
            badge: 'New',
            actions: [
              { label: 'Accept', variant: 'primary', size: 'sm' },
              { label: 'Decline', variant: 'ghost', size: 'sm' },
            ],
          },
          {
            id: 2,
            title: 'Payment Received',
            subtitle: 'Invoice #12345',
            description: 'Payment of $150.00 has been processed successfully',
            meta: '1 day ago',
            actions: [
              { label: 'View', variant: 'outline', size: 'sm' },
              { label: 'Download', variant: 'ghost', size: 'sm' },
            ],
          },
          {
            id: 3,
            title: 'System Update',
            subtitle: 'Version 2.1.0 available',
            description: 'New features and bug fixes are ready to install',
            meta: '3 days ago',
            actions: [
              {
                label: 'Update',
                variant: 'secondary',
                size: 'sm',
              },
              { label: 'Later', variant: 'ghost', size: 'sm' },
            ],
          },
        ],
      }
    },
    methods: {
      handleActionClick(action: { label: string }, item: { title: string }, index: number) {
        console.log('Action clicked:', {
          action: action.label,
          item: item.title,
          index,
        })
        alert(`${action.label} clicked for "${item.title}"`)
      },
    },
    template: `
      <div class="max-w-lg mx-auto">
        <h3 class="text-lg font-bold mb-4">Notifications with Actions</h3>
        <List 
          :items="itemsWithActions" 
          variant="bordered"
          @action-click="handleActionClick"
        />
      </div>
    `,
  }),
}

export const Interactive: Story = {
  render: () => ({
    components: { List },
    data() {
      return {
        selectedItems: new Set(),
        contactItems: [
          {
            id: 1,
            title: 'Alice Johnson',
            subtitle: 'alice@example.com',
            description: 'Online',
            avatar: 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg',
            selectable: true,
          },
          {
            id: 2,
            title: 'Bob Smith',
            subtitle: 'bob@example.com',
            description: 'Away',
            avatar: 'https://daisyui.com/images/stock/photo-1580489944761-15a19d654956.jpg',
            selectable: true,
          },
          {
            id: 3,
            title: 'Carol Davis',
            subtitle: 'carol@example.com',
            description: 'Offline',
            avatar: 'https://daisyui.com/images/stock/photo-1507003211169-0a1dd7228f2d.jpg',
            selectable: true,
            disabled: true,
          },
          {
            id: 4,
            title: 'David Wilson',
            subtitle: 'david@example.com',
            description: 'Online',
            avatar: 'https://daisyui.com/images/stock/photo-1472099645785-5658abf4ff4e.jpg',
            selectable: true,
          },
        ],
      }
    },
    computed: {
      computedItems() {
        return this.contactItems.map((item: any) => ({
          ...item,
          selected: this.selectedItems.has(item.id),
        }))
      },
    },
    methods: {
      handleItemClick(item: any, index: number) {
        if (item.disabled) return

        if (this.selectedItems.has(item.id)) {
          this.selectedItems.delete(item.id)
        } else {
          this.selectedItems.add(item.id)
        }

        console.log('Item clicked:', {
          item: item.title,
          index,
          selected: this.selectedItems.has(item.id),
        })
      },
    },
    template: `
      <div class="max-w-md mx-auto space-y-4">
        <div>
          <h3 class="text-lg font-bold mb-2">Select Contacts</h3>
          <p class="text-sm opacity-70 mb-4">Click to select/deselect contacts</p>
        </div>
        
        <List 
          :items="computedItems"
          variant="bordered"
          selectable
          @item-click="handleItemClick"
        />
        
        <div class="mt-4 p-4 bg-base-200 rounded">
          <h4 class="font-semibold mb-2">Selected Items:</h4>
          <div v-if="selectedItems.size === 0" class="text-sm opacity-60">
            No items selected
          </div>
          <div v-else class="space-y-1">
            <div 
              v-for="item in computedItems.filter(i => selectedItems.has(i.id))" 
              :key="item.id"
              class="text-sm"
            >
              • {{ item.title }}
            </div>
          </div>
        </div>
      </div>
    `,
  }),
}

export const EmptyState: Story = {
  render: () => ({
    components: { List },
    template: `
      <div class="space-y-8">
        <div>
          <h3 class="text-lg font-bold mb-4">Default Empty State</h3>
          <div class="max-w-md">
            <List :items="[]" variant="bordered" />
          </div>
        </div>
        
        <div>
          <h3 class="text-lg font-bold mb-4">Custom Empty State</h3>
          <div class="max-w-md">
            <List :items="[]" variant="bordered">
              <template #empty>
                <div class="text-center py-12">
                  <div class="text-6xl mb-4">📝</div>
                  <h3 class="text-lg font-semibold mb-2">No tasks yet</h3>
                  <p class="text-sm opacity-60 mb-4">Create your first task to get started</p>
                  <button class="btn btn-primary btn-sm">Add Task</button>
                </div>
              </template>
            </List>
          </div>
        </div>
        
        <div>
          <h3 class="text-lg font-bold mb-4">Hidden Empty State</h3>
          <div class="max-w-md">
            <List :items="[]" variant="bordered" :show-empty="false" />
            <p class="text-sm opacity-60 mt-2">Empty state is hidden</p>
          </div>
        </div>
      </div>
    `,
  }),
}

export const ComplexLayout: Story = {
  render: () => ({
    components: { List },
    data() {
      return {
        complexItems: [
          {
            id: 1,
            title: 'Project Alpha',
            subtitle: 'Web Development',
            description: 'Building a modern e-commerce platform with Vue.js and Node.js',
            avatar: 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg',
            meta: 'Due: Dec 15',
            badge: 'High Priority',
            actions: [
              { label: 'View', variant: 'primary', size: 'xs' },
              { label: 'Edit', variant: 'ghost', size: 'xs' },
            ],
          },
          {
            id: 2,
            title: 'Mobile App Redesign',
            subtitle: 'UI/UX Design',
            description: 'Complete redesign of the mobile application interface',
            avatar: 'https://daisyui.com/images/stock/photo-1580489944761-15a19d654956.jpg',
            meta: 'Due: Jan 20',
            badge: 'Medium',
            actions: [
              { label: 'Review', variant: 'outline', size: 'xs' },
              {
                label: 'Approve',
                variant: 'secondary',
                size: 'xs',
              },
            ],
          },
          {
            id: 3,
            title: 'API Documentation',
            subtitle: 'Documentation',
            description: 'Update and maintain comprehensive API documentation',
            avatar: 'https://daisyui.com/images/stock/photo-1507003211169-0a1dd7228f2d.jpg',
            meta: 'Due: Nov 30',
            badge: 'Low',
            disabled: true,
            actions: [
              {
                label: 'Edit',
                variant: 'ghost',
                size: 'xs',
                disabled: true,
              },
            ],
          },
        ],
      }
    },
    methods: {
      handleItemClick(item: { title: string }, index: number) {
        console.log('Project clicked:', item.title, index)
      },
      handleActionClick(action: { label: string }, item: { title: string }) {
        console.log('Action:', action.label, 'for project:', item.title)
      },
    },
    template: `
      <div class="max-w-2xl mx-auto">
        <h3 class="text-lg font-bold mb-4">Project Management Dashboard</h3>
        <List 
          :items="complexItems"
          variant="bordered"
          size="lg"
          clickable
          @item-click="handleItemClick"
          @action-click="handleActionClick"
        />
      </div>
    `,
  }),
}

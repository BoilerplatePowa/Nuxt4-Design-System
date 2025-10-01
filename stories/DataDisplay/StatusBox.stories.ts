import type { Meta, StoryObj } from '@storybook/vue3-vite'
import StatusBox from '../../src/runtime/components/DataDisplay/StatusBox.vue'

interface NotificationItem {
  id: number
  variant: 'success' | 'error' | 'warning' | 'info' | 'pending' | 'neutral'
  title: string
  message: string
  visible: boolean
  timestamp?: Date
  actions?: Array<{
    label: string
    variant: 'primary' | 'secondary' | 'accent' | 'ghost' | 'outline'
    size: 'xs' | 'sm' | 'md'
  }>
  dismissible?: boolean
}

const meta: Meta<typeof StatusBox> = {
  title: 'Data Display/StatusBox',
  component: StatusBox,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['success', 'error', 'warning', 'info', 'pending', 'neutral'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    showIndicator: {
      control: { type: 'boolean' },
    },
    dismissible: {
      control: { type: 'boolean' },
    },
  },
}

export default meta
type Story = StoryObj<typeof StatusBox>

export const Default: Story = {
  args: {
    variant: 'success',
    title: 'Success',
    message: 'Your action completed successfully.',
  },
}

export const Variants: Story = {
  render: () => ({
    components: { StatusBox },
    template: `
      <div class="space-y-4 max-w-md">
        <StatusBox 
          variant="success" 
          title="Success" 
          message="Operation completed successfully."
        />
        
        <StatusBox 
          variant="error" 
          title="Error" 
          message="Something went wrong. Please try again."
        />
        
        <StatusBox 
          variant="warning" 
          title="Warning" 
          message="Please review your settings before proceeding."
        />
        
        <StatusBox 
          variant="info" 
          title="Information" 
          message="New features are available in this version."
        />
        
        <StatusBox 
          variant="pending" 
          title="Processing" 
          message="Your request is being processed..."
        />
        
        <StatusBox 
          variant="neutral" 
          title="Neutral" 
          message="This is a neutral status message."
        />
      </div>
    `,
  }),
}

export const Sizes: Story = {
  render: () => ({
    components: { StatusBox },
    template: `
      <div class="space-y-4">
        <div>
          <h3 class="text-lg font-bold mb-2">Small</h3>
          <StatusBox 
            variant="info" 
            title="Small Status" 
            message="This is a small status message."
            size="sm"
          />
        </div>
        
        <div>
          <h3 class="text-lg font-bold mb-2">Medium (Default)</h3>
          <StatusBox 
            variant="info" 
            title="Medium Status" 
            message="This is a medium status message."
            size="md"
          />
        </div>
        
        <div>
          <h3 class="text-lg font-bold mb-2">Large</h3>
          <StatusBox 
            variant="info" 
            title="Large Status" 
            message="This is a large status message."
            size="lg"
          />
        </div>
      </div>
    `,
  }),
}

export const WithTimestamp: Story = {
  render: () => ({
    components: { StatusBox },
    data() {
      return {
        now: new Date(),
        fiveMinutesAgo: new Date(Date.now() - 5 * 60 * 1000),
        oneHourAgo: new Date(Date.now() - 60 * 60 * 1000),
        yesterdayDate: new Date(Date.now() - 24 * 60 * 60 * 1000),
      }
    },
    template: `
      <div class="space-y-4 max-w-lg">
        <StatusBox 
          variant="success" 
          title="Just completed" 
          message="Task finished successfully."
          :timestamp="now"
        />
        
        <StatusBox 
          variant="info" 
          title="Recent update" 
          message="System updated with new features."
          :timestamp="fiveMinutesAgo"
        />
        
        <StatusBox 
          variant="warning" 
          title="Earlier today" 
          message="Warning: High memory usage detected."
          :timestamp="oneHourAgo"
        />
        
        <StatusBox 
          variant="error" 
          title="Yesterday's issue" 
          message="Server error occurred during deployment."
          :timestamp="yesterdayDate"
        />
      </div>
    `,
  }),
}

export const WithActions: Story = {
  render: () => ({
    components: { StatusBox },
    data() {
      return {
        statusItems: [
          {
            variant: 'error',
            title: 'Payment Failed',
            message: 'Your payment could not be processed. Please check your payment method.',
            actions: [
              { label: 'Retry', variant: 'primary', size: 'sm' },
              {
                label: 'Change Method',
                variant: 'outline',
                size: 'sm',
              },
            ],
          },
          {
            variant: 'warning',
            title: 'Storage Almost Full',
            message: 'You have used 95% of your storage space.',
            actions: [
              {
                label: 'Upgrade',
                variant: 'primary',
                size: 'sm',
              },
              {
                label: 'Manage Files',
                variant: 'ghost',
                size: 'sm',
              },
            ],
          },
          {
            variant: 'info',
            title: 'New Feature Available',
            message: 'Try our new collaboration tools to improve team productivity.',
            actions: [
              {
                label: 'Learn More',
                variant: 'outline',
                size: 'sm',
              },
            ],
          },
        ],
      }
    },
    methods: {
      handleActionClick(action: { label: string }, _event: Event) {
        console.log('Action clicked:', action.label)
        alert(`${action.label} clicked!`)
      },
    },
    template: `
      <div class="space-y-4 max-w-lg">
        <StatusBox 
          v-for="(item, index) in statusItems"
          :key="index"
          :variant="item.variant"
          :title="item.title"
          :message="item.message"
          :actions="item.actions"
          @action-click="handleActionClick"
        />
      </div>
    `,
  }),
}

export const Dismissible: Story = {
  render: () => ({
    components: { StatusBox },
    data() {
      return {
        notifications: [
          {
            id: 1,
            variant: 'success',
            title: 'Profile Updated',
            message: 'Your profile has been successfully updated.',
            visible: true,
          },
          {
            id: 2,
            variant: 'info',
            title: 'New Message',
            message: 'You have received a new message from John.',
            visible: true,
          },
          {
            id: 3,
            variant: 'warning',
            title: 'Session Expiring',
            message: 'Your session will expire in 5 minutes.',
            visible: true,
          },
        ] as NotificationItem[],
      }
    },
    methods: {
      handleDismiss(id: number) {
        const notification = this.notifications.find((n: NotificationItem) => n.id === id)
        if (notification) {
          notification.visible = false
        }
        console.log('Dismissed notification:', id)
      },
    },
    template: `
      <div class="space-y-4 max-w-lg">
        <h3 class="text-lg font-bold">Dismissible Notifications</h3>
        
        <div v-for="notification in notifications" :key="notification.id">
          <StatusBox 
            :variant="notification.variant"
            :title="notification.title"
            :message="notification.message"
            :visible="notification.visible"
            dismissible
            @dismiss="handleDismiss(notification.id)"
          />
        </div>
        
        <div v-if="!notifications.some(n => n.visible)" class="text-center py-8 opacity-60">
          All notifications dismissed
        </div>
      </div>
    `,
  }),
}

export const CustomIndicators: Story = {
  render: () => ({
    components: { StatusBox },
    template: `
      <div class="space-y-4 max-w-lg">
        <StatusBox variant="success" title="Custom Success Icon" message="With a checkmark icon">
          <template #indicator>
            <div class="w-6 h-6 bg-success rounded-full flex items-center justify-center">
              <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
            </div>
          </template>
        </StatusBox>
        
        <StatusBox variant="error" title="Custom Error Icon" message="With an X icon">
          <template #indicator>
            <div class="w-6 h-6 bg-error rounded-full flex items-center justify-center">
              <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </div>
          </template>
        </StatusBox>
        
        <StatusBox variant="info" title="Progress Status" message="25% completed">
          <template #indicator>
            <div class="w-8 h-8 relative">
              <svg class="w-8 h-8 text-info" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="3"
                  stroke-dasharray="25, 100"
                />
              </svg>
              <div class="absolute inset-0 flex items-center justify-center text-xs font-bold">
                25%
              </div>
            </div>
          </template>
        </StatusBox>
        
        <StatusBox variant="warning" title="No Indicator" message="Status without indicator" :show-indicator="false" />
      </div>
    `,
  }),
}

export const NotificationCenter: Story = {
  render: () => ({
    components: { StatusBox },
    data() {
      return {
        notifications: [
          {
            id: 1,
            variant: 'success',
            title: 'Backup Complete',
            message: 'Your data has been successfully backed up.',
            timestamp: new Date(Date.now() - 2 * 60 * 1000),
            dismissible: true,
            visible: true,
          },
          {
            id: 2,
            variant: 'info',
            title: 'System Update',
            message: 'A new system update is available for installation.',
            timestamp: new Date(Date.now() - 30 * 60 * 1000),
            actions: [
              {
                label: 'Install',
                variant: 'primary',
                size: 'xs',
              },
              { label: 'Later', variant: 'ghost', size: 'xs' },
            ],
            dismissible: true,
            visible: true,
          },
          {
            id: 3,
            variant: 'warning',
            title: 'High CPU Usage',
            message: 'CPU usage is at 85%. Consider closing unnecessary applications.',
            timestamp: new Date(Date.now() - 60 * 60 * 1000),
            actions: [
              {
                label: 'View Details',
                variant: 'outline',
                size: 'xs',
              },
            ],
            dismissible: true,
            visible: true,
          },
          {
            id: 4,
            variant: 'error',
            title: 'Connection Failed',
            message: 'Unable to connect to the remote server.',
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
            actions: [
              { label: 'Retry', variant: 'primary', size: 'xs' },
              { label: 'Settings', variant: 'ghost', size: 'xs' },
            ],
            dismissible: true,
            visible: true,
          },
        ] as NotificationItem[],
      }
    },
    methods: {
      handleDismiss(id: number) {
        const notification = this.notifications.find((n: NotificationItem) => n.id === id)
        if (notification) {
          notification.visible = false
        }
      },
      handleActionClick(action: { label: string }, _event: Event) {
        console.log('Action clicked:', action.label)
        alert(`${action.label} clicked!`)
      },
      clearAll() {
        this.notifications.forEach((n: NotificationItem) => (n.visible = false))
      },
    },
    template: `
      <div class="max-w-md mx-auto">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-bold">Notification Center</h3>
          <button 
            v-if="notifications.some(n => n.visible)"
            @click="clearAll"
            class="btn btn-ghost btn-sm"
          >
            Clear All
          </button>
        </div>
        
        <div v-if="!notifications.some(n => n.visible)" class="text-center py-12 opacity-60">
          <div class="text-4xl mb-4">🔔</div>
          <p>No notifications</p>
        </div>
        
        <div v-else class="space-y-3">
          <StatusBox 
            v-for="notification in notifications"
            :key="notification.id"
            :variant="notification.variant"
            :title="notification.title"
            :message="notification.message"
            :timestamp="notification.timestamp"
            :actions="notification.actions || []"
            :dismissible="notification.dismissible"
            :visible="notification.visible"
            size="sm"
            @dismiss="handleDismiss(notification.id)"
            @action-click="handleActionClick"
          />
        </div>
      </div>
    `,
  }),
}

import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Stat from '../../src/runtime/components/DataDisplay/Stat.vue'

const meta: Meta<typeof Stat> = {
    title: 'Data Display/Stat',
    component: Stat,
    parameters: {
        layout: 'padded',
    },
    argTypes: {
        variant: {
            control: { type: 'select' },
            options: ['default', 'primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error'],
        },
        size: {
            control: { type: 'select' },
            options: ['sm', 'md', 'lg'],
        },
    },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        title: 'Total Sales',
        value: '12,345',
        description: '↗︎ 400 (22%)',
        icon: '💰',
    },
}

export const BasicStats: Story = {
    render: () => ({
        components: { Stat },
        template: `
      <div class="stats shadow">
        <Stat 
          title="Total Users"
          value="31K"
          description="Jan 1st - Feb 1st"
          icon="👥"
        />
        
        <Stat 
          title="Page Views"
          value="2.6M"
          description="↗︎ 25% increase"
          icon="👁️"
          variant="primary"
        />
        
        <Stat 
          title="Revenue"
          value="$89,400"
          description="↗︎ $12,500 (16%)"
          icon="💵"
          variant="success"
        />
      </div>
    `,
    }),
}

export const WithTrends: Story = {
    render: () => ({
        components: { Stat },
        template: `
      <div class="stats stats-vertical lg:stats-horizontal shadow">
        <Stat 
          title="Downloads"
          value="31K"
          description="Jan 1st - Feb 1st"
        >
          <template #icon>
            <svg class="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </template>
        </Stat>
        
        <Stat 
          title="New Users"
          value="4,200"
          variant="secondary"
        >
          <template #icon>
            <svg class="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </template>
          <template #description>
            <div class="stat-desc text-secondary">↗︎ 400 (22%)</div>
          </template>
        </Stat>
        
        <Stat 
          title="New Registers"
          value="1,200"
          variant="accent"
        >
          <template #icon>
            <svg class="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </template>
          <template #description>
            <div class="stat-desc text-accent">↘︎ 90 (14%)</div>
          </template>
        </Stat>
      </div>
    `,
    }),
}

export const Variants: Story = {
    render: () => ({
        components: { Stat },
        template: `
      <div class="space-y-8">
        <div>
          <h3 class="text-lg font-bold mb-4">Default</h3>
          <div class="stats shadow">
            <Stat title="Sales" value="1,234" description="This month" />
            <Stat title="Orders" value="567" description="This week" />
          </div>
        </div>
        
        <div>
          <h3 class="text-lg font-bold mb-4">Bordered</h3>
          <div class="stats stats-bordered">
            <Stat title="Sales" value="1,234" description="This month" variant="bordered" />
            <Stat title="Orders" value="567" description="This week" variant="bordered" />
          </div>
        </div>
        
        <div>
          <h3 class="text-lg font-bold mb-4">Vertical</h3>
          <div class="stats stats-vertical shadow">
            <Stat title="Sales" value="1,234" description="This month" />
            <Stat title="Orders" value="567" description="This week" />
            <Stat title="Revenue" value="$8,900" description="This quarter" />
          </div>
        </div>
      </div>
    `,
    }),
}

export const Dashboard: Story = {
    render: () => ({
        components: { Stat },
        template: `
      <div class="space-y-6">
        <!-- Top Row Stats -->
        <div class="stats shadow w-full">
          <Stat 
            title="Total Sales"
            value="$45,231.89"
            description="+20.1% from last month"
            variant="success"
          >
            <template #icon>
              <svg class="w-8 h-8 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </template>
          </Stat>
          
          <Stat 
            title="Active Users"
            value="2,350"
            description="+180.1% from last month"
            variant="primary"
          >
            <template #icon>
              <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </template>
          </Stat>
          
          <Stat 
            title="Orders"
            value="12,234"
            description="+19% from last month"
            variant="secondary"
          >
            <template #icon>
              <svg class="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </template>
          </Stat>
          
          <Stat 
            title="Conversion Rate"
            value="3.2%"
            description="+2.5% from last month"
            variant="accent"
          >
            <template #icon>
              <svg class="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </template>
          </Stat>
        </div>
        
        <!-- Bottom Row Stats -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="stats stats-vertical shadow">
            <Stat 
              title="Support Tickets"
              value="573"
              description="24 resolved today"
              variant="warning"
            >
              <template #icon>
                <svg class="w-8 h-8 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </template>
            </Stat>
            
            <Stat 
              title="Response Time"
              value="2.4h"
              description="Average this week"
              variant="info"
            >
              <template #icon>
                <svg class="w-8 h-8 text-info" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </template>
            </Stat>
          </div>
          
          <div class="stats stats-vertical shadow">
            <Stat 
              title="Server Uptime"
              value="99.9%"
              description="30 days average"
              variant="success"
            >
              <template #icon>
                <svg class="w-8 h-8 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12l5 5L20 7" />
                </svg>
              </template>
            </Stat>
            
            <Stat 
              title="API Errors"
              value="0.1%"
              description="Last 24 hours"
              variant="error"
            >
              <template #icon>
                <svg class="w-8 h-8 text-error" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </template>
            </Stat>
          </div>
        </div>
      </div>
    `,
    }),
}

export const CustomColors: Story = {
    render: () => ({
        components: { Stat },
        template: `
      <div class="stats shadow">
        <Stat 
          title="Primary"
          value="1,234"
          variant="primary"
          description="Sample description"
        />
        
        <Stat 
          title="Success"
          value="5,678"
          variant="success"
          description="Sample description"
        />
        
        <Stat 
          title="Warning"
          value="910"
          variant="warning"
          description="Sample description"
        />
        
        <Stat 
          title="Error"
          value="112"
          variant="error"
          description="Sample description"
        />
      </div>
    `,
    }),
}

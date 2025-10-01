import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Pagination from '../../src/runtime/components/Navigation/Pagination.vue'

const meta: Meta<typeof Pagination> = {
    title: 'Navigation/Pagination',
    component: Pagination,
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        size: {
            control: { type: 'select' },
            options: ['xs', 'sm', 'md', 'lg'],
        },
        variant: {
            control: { type: 'select' },
            options: ['default', 'bordered', 'ghost'],
        },
        showLabels: {
            control: { type: 'boolean' },
        },
        showPageNumbers: {
            control: { type: 'boolean' },
        },
        showFirstLast: {
            control: { type: 'boolean' },
        },
        maxVisiblePages: {
            control: { type: 'number' },
        },
        disabled: {
            control: { type: 'boolean' },
        },
    },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        currentPage: 3,
        totalPages: 10,
    },
    render: (args) => ({
        components: { Pagination },
        setup() {
            return { args }
        },
        template: `
      <Pagination 
        v-bind="args"
        @page-change="(page) => { args.currentPage = page; }"
      />
    `,
    }),
}

export const WithLabels: Story = {
    args: {
        currentPage: 5,
        totalPages: 20,
        showLabels: true,
    },
    render: (args) => ({
        components: { Pagination },
        setup() {
            return { args }
        },
        template: `
      <Pagination 
        v-bind="args"
        @page-change="(page) => { args.currentPage = page; }"
      />
    `,
    }),
}

export const Sizes: Story = {
    render: () => ({
        components: { Pagination },
        data() {
            return {
                page1: 2,
                page2: 3,
                page3: 4,
                page4: 5,
            }
        },
        template: `
      <div class="space-y-8">
        <div class="text-center">
          <h3 class="text-lg font-bold mb-4">Extra Small</h3>
          <Pagination 
            :current-page="page1"
            :total-pages="8"
            size="xs"
            @page-change="page1 = $event"
          />
        </div>
        
        <div class="text-center">
          <h3 class="text-lg font-bold mb-4">Small</h3>
          <Pagination 
            :current-page="page2"
            :total-pages="8"
            size="sm"
            @page-change="page2 = $event"
          />
        </div>
        
        <div class="text-center">
          <h3 class="text-lg font-bold mb-4">Medium</h3>
          <Pagination 
            :current-page="page3"
            :total-pages="8"
            size="md"
            @page-change="page3 = $event"
          />
        </div>
        
        <div class="text-center">
          <h3 class="text-lg font-bold mb-4">Large</h3>
          <Pagination 
            :current-page="page4"
            :total-pages="8"
            size="lg"
            show-labels
            @page-change="page4 = $event"
          />
        </div>
      </div>
    `,
    }),
}

export const Variants: Story = {
    render: () => ({
        components: { Pagination },
        data() {
            return {
                page1: 3,
                page2: 3,
                page3: 3,
            }
        },
        template: `
      <div class="space-y-8">
        <div class="text-center">
          <h3 class="text-lg font-bold mb-4">Default</h3>
          <Pagination 
            :current-page="page1"
            :total-pages="10"
            variant="default"
            @page-change="page1 = $event"
          />
        </div>
        
        <div class="text-center">
          <h3 class="text-lg font-bold mb-4">Bordered</h3>
          <Pagination 
            :current-page="page2"
            :total-pages="10"
            variant="bordered"
            @page-change="page2 = $event"
          />
        </div>
        
        <div class="text-center">
          <h3 class="text-lg font-bold mb-4">Ghost</h3>
          <Pagination 
            :current-page="page3"
            :total-pages="10"
            variant="ghost"
            @page-change="page3 = $event"
          />
        </div>
      </div>
    `,
    }),
}

export const LargeDataset: Story = {
    render: () => ({
        components: { Pagination },
        data() {
            return {
                currentPage: 25,
            }
        },
        template: `
      <div class="text-center">
        <h3 class="text-lg font-bold mb-4">Large Dataset (100 pages)</h3>
        <Pagination 
          :current-page="currentPage"
          :total-pages="100"
          show-first-last
          show-labels
          @page-change="currentPage = $event"
        />
        
        <p class="mt-4 text-sm opacity-70">
          Current page: {{ currentPage }} of 100
        </p>
      </div>
    `,
    }),
}

export const CustomIcons: Story = {
    render: () => ({
        components: { Pagination },
        data() {
            return {
                currentPage: 4,
            }
        },
        template: `
      <div class="text-center">
        <h3 class="text-lg font-bold mb-4">Custom Icons</h3>
        <Pagination 
          :current-page="currentPage"
          :total-pages="10"
          show-labels
          @page-change="currentPage = $event"
        >
          <template #prev-icon>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </template>
          
          <template #next-icon>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </template>
          
          <template #first-icon>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          </template>
          
          <template #last-icon>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          </template>
        </Pagination>
      </div>
    `,
    }),
}

export const MinimalPagination: Story = {
    render: () => ({
        components: { Pagination },
        data() {
            return {
                currentPage: 1,
            }
        },
        template: `
      <div class="text-center">
        <h3 class="text-lg font-bold mb-4">Minimal - Previous/Next Only</h3>
        <Pagination 
          :current-page="currentPage"
          :total-pages="5"
          :show-page-numbers="false"
          show-labels
          size="lg"
          @page-change="currentPage = $event"
        />
        
        <p class="mt-4 text-sm opacity-70">
          Page {{ currentPage }} of 5
        </p>
      </div>
    `,
    }),
}

export const DisabledState: Story = {
    render: () => ({
        components: { Pagination },
        template: `
      <div class="space-y-8">
        <div class="text-center">
          <h3 class="text-lg font-bold mb-4">Normal State</h3>
          <Pagination 
            :current-page="3"
            :total-pages="10"
            show-labels
          />
        </div>
        
        <div class="text-center">
          <h3 class="text-lg font-bold mb-4">Disabled State</h3>
          <Pagination 
            :current-page="3"
            :total-pages="10"
            show-labels
            disabled
          />
        </div>
      </div>
    `,
    }),
}

export const TablePagination: Story = {
    render: () => ({
        components: { Pagination },
        data() {
            return {
                currentPage: 1,
                itemsPerPage: 10,
                totalItems: 247,
            }
        },
        computed: {
            totalPages() {
                return Math.ceil(this.totalItems / this.itemsPerPage)
            },
            startItem() {
                return (this.currentPage - 1) * this.itemsPerPage + 1
            },
            endItem() {
                return Math.min(this.currentPage * this.itemsPerPage, this.totalItems)
            },
        },
        template: `
      <div class="bg-base-100 rounded-lg shadow-lg overflow-hidden">
        <!-- Table Header -->
        <div class="bg-base-200 px-6 py-4">
          <h3 class="text-lg font-bold">User Management</h3>
          <p class="text-sm opacity-70">Manage your users and their permissions</p>
        </div>
        
        <!-- Mock Table -->
        <div class="p-6">
          <div class="overflow-x-auto">
            <table class="table w-full">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="i in itemsPerPage" :key="i">
                  <td>{{ startItem + i - 1 }}</td>
                  <td>User {{ startItem + i - 1 }}</td>
                  <td>user{{ startItem + i - 1 }}@example.com</td>
                  <td>
                    <span class="badge badge-ghost">
                      {{ i % 3 === 0 ? 'Admin' : i % 2 === 0 ? 'Editor' : 'Viewer' }}
                    </span>
                  </td>
                  <td>
                    <span :class="i % 4 === 0 ? 'badge badge-error' : 'badge badge-success'">
                      {{ i % 4 === 0 ? 'Inactive' : 'Active' }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <!-- Pagination Footer -->
        <div class="bg-base-200 px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div class="text-sm opacity-70">
            Showing {{ startItem }} to {{ endItem }} of {{ totalItems }} results
          </div>
          
          <Pagination 
            :current-page="currentPage"
            :total-pages="totalPages"
            show-first-last
            @page-change="currentPage = $event"
          />
        </div>
      </div>
    `,
    }),
}

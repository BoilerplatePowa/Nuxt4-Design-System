import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Skeleton from '../../src/runtime/components/Feedback/Skeleton.vue';

const meta: Meta<typeof Skeleton> = {
  title: 'Feedback/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['text', 'circular', 'rectangular', 'rounded'],
    },
    width: {
      control: { type: 'text' },
    },
    height: {
      control: { type: 'text' },
    },
    lines: {
      control: { type: 'number' },
    },
    animated: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'text',
    width: '100%',
  },
};

export const Variants: Story = {
  render: () => ({
    components: { Skeleton },
    template: `
      <div class="space-y-8">
        <div>
          <h3 class="text-lg font-bold mb-4">Text Skeleton</h3>
          <div class="space-y-2">
            <Skeleton variant="text" width="100%" />
            <Skeleton variant="text" width="80%" />
            <Skeleton variant="text" width="60%" />
          </div>
        </div>
        
        <div>
          <h3 class="text-lg font-bold mb-4">Circular Skeleton</h3>
          <div class="flex gap-4">
            <Skeleton variant="circular" width="40px" height="40px" />
            <Skeleton variant="circular" width="60px" height="60px" />
            <Skeleton variant="circular" width="80px" height="80px" />
          </div>
        </div>
        
        <div>
          <h3 class="text-lg font-bold mb-4">Rectangular Skeleton</h3>
          <Skeleton variant="rectangular" width="200px" height="120px" />
        </div>
        
        <div>
          <h3 class="text-lg font-bold mb-4">Rounded Skeleton</h3>
          <Skeleton variant="rounded" width="200px" height="120px" />
        </div>
      </div>
    `,
  }),
};

export const CardSkeleton: Story = {
  render: () => ({
    components: { Skeleton },
    template: `
      <div class="max-w-sm mx-auto">
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <!-- Avatar and text -->
            <div class="flex items-center space-x-4 mb-4">
              <Skeleton variant="circular" width="48px" height="48px" />
              <div class="flex-1">
                <Skeleton variant="text" width="100%" height="16px" />
                <Skeleton variant="text" width="60%" height="14px" />
              </div>
            </div>
            
            <!-- Image placeholder -->
            <Skeleton variant="rounded" width="100%" height="200px" />
            
            <!-- Text content -->
            <div class="mt-4 space-y-2">
              <Skeleton variant="text" width="100%" />
              <Skeleton variant="text" width="90%" />
              <Skeleton variant="text" width="70%" />
            </div>
            
            <!-- Actions -->
            <div class="flex gap-2 mt-4">
              <Skeleton variant="rounded" width="80px" height="32px" />
              <Skeleton variant="rounded" width="80px" height="32px" />
            </div>
          </div>
        </div>
      </div>
    `,
  }),
};

export const ListSkeleton: Story = {
  render: () => ({
    components: { Skeleton },
    template: `
      <div class="max-w-md mx-auto space-y-4">
        <h3 class="text-lg font-bold">Loading List Items...</h3>
        
        <!-- List item skeletons -->
        <div v-for="i in 5" :key="i" class="flex items-center space-x-4 p-4 border rounded-lg">
          <Skeleton variant="circular" width="40px" height="40px" />
          <div class="flex-1">
            <Skeleton variant="text" width="100%" height="16px" />
            <Skeleton variant="text" width="70%" height="14px" />
          </div>
          <Skeleton variant="rounded" width="60px" height="24px" />
        </div>
      </div>
    `,
  }),
};

export const TableSkeleton: Story = {
  render: () => ({
    components: { Skeleton },
    template: `
      <div class="overflow-x-auto">
        <table class="table w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="i in 5" :key="i">
              <td>
                <div class="flex items-center space-x-3">
                  <Skeleton variant="circular" width="32px" height="32px" />
                  <Skeleton variant="text" width="120px" />
                </div>
              </td>
              <td>
                <Skeleton variant="text" width="150px" />
              </td>
              <td>
                <Skeleton variant="rounded" width="80px" height="20px" />
              </td>
              <td>
                <Skeleton variant="rounded" width="60px" height="24px" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    `,
  }),
};

export const FormSkeleton: Story = {
  render: () => ({
    components: { Skeleton },
    template: `
      <div class="max-w-md mx-auto space-y-6">
        <h3 class="text-lg font-bold">Loading Form...</h3>
        
        <!-- Form field skeletons -->
        <div class="form-control">
          <Skeleton variant="text" width="80px" height="16px" />
          <Skeleton variant="rounded" width="100%" height="48px" />
        </div>
        
        <div class="form-control">
          <Skeleton variant="text" width="60px" height="16px" />
          <Skeleton variant="rounded" width="100%" height="48px" />
        </div>
        
        <div class="form-control">
          <Skeleton variant="text" width="70px" height="16px" />
          <Skeleton variant="rounded" width="100%" height="96px" />
        </div>
        
        <div class="flex gap-2">
          <Skeleton variant="rounded" width="100px" height="40px" />
          <Skeleton variant="rounded" width="80px" height="40px" />
        </div>
      </div>
    `,
  }),
};

export const WithoutAnimation: Story = {
  render: () => ({
    components: { Skeleton },
    template: `
      <div class="space-y-4">
        <h3 class="text-lg font-bold">Without Animation</h3>
        
        <div class="space-y-2">
          <Skeleton variant="text" width="100%" :animated="false" />
          <Skeleton variant="text" width="80%" :animated="false" />
          <Skeleton variant="text" width="60%" :animated="false" />
        </div>
        
        <div class="flex items-center space-x-4">
          <Skeleton variant="circular" width="48px" height="48px" :animated="false" />
          <div class="flex-1 space-y-1">
            <Skeleton variant="text" width="100%" :animated="false" />
            <Skeleton variant="text" width="70%" :animated="false" />
          </div>
        </div>
      </div>
    `,
  }),
};

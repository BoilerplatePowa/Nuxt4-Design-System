import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Join from '../../src/runtime/components/Layout/Join.vue';

const meta: Meta<typeof Join> = {
  title: 'Layout/Join',
  component: Join,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'rounded'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => ({
    components: { Join },
    template: `
      <Join>
        <button class="btn join-item">Button 1</button>
        <button class="btn join-item">Button 2</button>
        <button class="btn join-item">Button 3</button>
      </Join>
    `,
  }),
};

export const ButtonGroup: Story = {
  render: () => ({
    components: { Join },
    template: `
      <div class="space-y-8">
        <div>
          <h3 class="text-lg font-bold mb-4">Horizontal Button Group</h3>
          <Join>
            <button class="btn btn-primary join-item">Left</button>
            <button class="btn btn-primary join-item">Center</button>
            <button class="btn btn-primary join-item">Right</button>
          </Join>
        </div>
        
        <div>
          <h3 class="text-lg font-bold mb-4">Vertical Button Group</h3>
          <Join orientation="vertical">
            <button class="btn btn-secondary join-item">Top</button>
            <button class="btn btn-secondary join-item">Middle</button>
            <button class="btn btn-secondary join-item">Bottom</button>
          </Join>
        </div>
      </div>
    `,
  }),
};

export const InputGroup: Story = {
  render: () => ({
    components: { Join },
    template: `
      <div class="space-y-8">
        <div>
          <h3 class="text-lg font-bold mb-4">Search Input Group</h3>
          <Join>
            <input 
              class="input input-bordered join-item flex-1" 
              placeholder="Search..." 
            />
            <button class="btn btn-primary join-item">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </Join>
        </div>
        
        <div>
          <h3 class="text-lg font-bold mb-4">Email Input Group</h3>
          <Join>
            <span class="btn btn-disabled join-item">@</span>
            <input 
              class="input input-bordered join-item flex-1" 
              placeholder="username" 
            />
            <span class="btn btn-disabled join-item">@email.com</span>
          </Join>
        </div>
      </div>
    `,
  }),
};

export const CardGroup: Story = {
  render: () => ({
    components: { Join },
    template: `
      <div class="space-y-8">
        <div>
          <h3 class="text-lg font-bold mb-4">Horizontal Cards</h3>
          <Join>
            <div class="card bg-base-100 shadow-xl join-item">
              <div class="card-body">
                <h2 class="card-title">Card 1</h2>
                <p>Content for card 1</p>
              </div>
            </div>
            <div class="card bg-base-100 shadow-xl join-item">
              <div class="card-body">
                <h2 class="card-title">Card 2</h2>
                <p>Content for card 2</p>
              </div>
            </div>
            <div class="card bg-base-100 shadow-xl join-item">
              <div class="card-body">
                <h2 class="card-title">Card 3</h2>
                <p>Content for card 3</p>
              </div>
            </div>
          </Join>
        </div>
        
        <div>
          <h3 class="text-lg font-bold mb-4">Vertical Cards</h3>
          <Join orientation="vertical">
            <div class="card bg-base-100 shadow-xl join-item">
              <div class="card-body">
                <h2 class="card-title">Top Card</h2>
                <p>Content for top card</p>
              </div>
            </div>
            <div class="card bg-base-100 shadow-xl join-item">
              <div class="card-body">
                <h2 class="card-title">Middle Card</h2>
                <p>Content for middle card</p>
              </div>
            </div>
            <div class="card bg-base-100 shadow-xl join-item">
              <div class="card-body">
                <h2 class="card-title">Bottom Card</h2>
                <p>Content for bottom card</p>
              </div>
            </div>
          </Join>
        </div>
      </div>
    `,
  }),
};

export const Statistics: Story = {
  render: () => ({
    components: { Join },
    template: `
      <div class="space-y-8">
        <div>
          <h3 class="text-lg font-bold mb-4">Statistics Group</h3>
          <Join>
            <div class="stat join-item bg-base-200">
              <div class="stat-title">Total Sales</div>
              <div class="stat-value text-primary">25.6K</div>
              <div class="stat-desc">21% more than last month</div>
            </div>
            <div class="stat join-item bg-base-200">
              <div class="stat-title">Total Users</div>
              <div class="stat-value text-secondary">2.6M</div>
              <div class="stat-desc">↗︎ 400 (22%)</div>
            </div>
            <div class="stat join-item bg-base-200">
              <div class="stat-title">New Registers</div>
              <div class="stat-value text-accent">1,200</div>
              <div class="stat-desc">↘︎ 90 (14%)</div>
            </div>
          </Join>
        </div>
      </div>
    `,
  }),
};

export const RadioGroup: Story = {
  render: () => ({
    components: { Join },
    data() {
      return {
        selectedOption: 'option2',
      };
    },
    template: `
      <div class="space-y-8">
        <div>
          <h3 class="text-lg font-bold mb-4">Radio Button Group</h3>
          <Join>
            <input 
              class="join-item btn" 
              type="radio" 
              name="options" 
              value="option1"
              v-model="selectedOption"
              aria-label="Option 1" 
            />
            <input 
              class="join-item btn" 
              type="radio" 
              name="options" 
              value="option2"
              v-model="selectedOption"
              aria-label="Option 2" 
            />
            <input 
              class="join-item btn" 
              type="radio" 
              name="options" 
              value="option3"
              v-model="selectedOption"
              aria-label="Option 3" 
            />
          </Join>
          <p class="mt-2 text-sm">Selected: {{ selectedOption }}</p>
        </div>
        
        <div>
          <h3 class="text-lg font-bold mb-4">Size Toggle Group</h3>
          <Join>
            <button class="btn btn-outline join-item">S</button>
            <button class="btn btn-outline join-item btn-active">M</button>
            <button class="btn btn-outline join-item">L</button>
            <button class="btn btn-outline join-item">XL</button>
          </Join>
        </div>
      </div>
    `,
  }),
};

export const Rounded: Story = {
  render: () => ({
    components: { Join },
    template: `
      <div class="space-y-8">
        <div>
          <h3 class="text-lg font-bold mb-4">Default (Sharp Corners)</h3>
          <Join>
            <button class="btn btn-primary join-item">Button 1</button>
            <button class="btn btn-primary join-item">Button 2</button>
            <button class="btn btn-primary join-item">Button 3</button>
          </Join>
        </div>
        
        <div>
          <h3 class="text-lg font-bold mb-4">Rounded Corners</h3>
          <Join variant="rounded">
            <button class="btn btn-secondary join-item">Button 1</button>
            <button class="btn btn-secondary join-item">Button 2</button>
            <button class="btn btn-secondary join-item">Button 3</button>
          </Join>
        </div>
      </div>
    `,
  }),
};

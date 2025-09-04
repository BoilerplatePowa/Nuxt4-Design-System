import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Kbd from '../../src/runtime/components/DataDisplay/Kbd.vue';

const meta: Meta<typeof Kbd> = {
  title: 'Data Display/Kbd',
  component: Kbd,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Keyboard key representation component for displaying keyboard shortcuts and key combinations.',
      },
    },
  },
  argTypes: {
    keyText: {
      control: 'text',
      description: 'The key or key combination to display',
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Size of the keyboard key',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'primary', 'secondary', 'accent'],
      description: 'Visual style variant',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    keyText: 'Enter',
  },
};

export const SingleKeys: Story = {
  render: () => ({
    components: { Kbd },
    template: `
      <div class="flex flex-wrap gap-2">
        <Kbd keyText="A" />
        <Kbd keyText="B" />
        <Kbd keyText="C" />
        <Kbd keyText="1" />
        <Kbd keyText="2" />
        <Kbd keyText="3" />
        <Kbd keyText="Space" />
        <Kbd keyText="Enter" />
        <Kbd keyText="Tab" />
        <Kbd keyText="Esc" />
        <Kbd keyText="Shift" />
        <Kbd keyText="Ctrl" />
        <Kbd keyText="Alt" />
        <Kbd keyText="Cmd" />
      </div>
    `,
  }),
};

export const KeyCombinations: Story = {
  render: () => ({
    components: { Kbd },
    template: `
      <div class="space-y-4">
        <div class="flex items-center gap-2">
          <span>Copy:</span>
          <Kbd keyText="Ctrl" />
          <span>+</span>
          <Kbd keyText="C" />
        </div>
        
        <div class="flex items-center gap-2">
          <span>Paste:</span>
          <Kbd keyText="Ctrl" />
          <span>+</span>
          <Kbd keyText="V" />
        </div>
        
        <div class="flex items-center gap-2">
          <span>Save:</span>
          <Kbd keyText="Ctrl" />
          <span>+</span>
          <Kbd keyText="S" />
        </div>
        
        <div class="flex items-center gap-2">
          <span>Select All:</span>
          <Kbd keyText="Ctrl" />
          <span>+</span>
          <Kbd keyText="A" />
        </div>
        
        <div class="flex items-center gap-2">
          <span>Undo:</span>
          <Kbd keyText="Ctrl" />
          <span>+</span>
          <Kbd keyText="Z" />
        </div>
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    components: { Kbd },
    template: `
      <div class="space-y-4">
        <div class="flex items-center gap-2">
          <span>Extra Small:</span>
          <Kbd keyText="Ctrl" size="xs" />
          <span>+</span>
          <Kbd keyText="C" size="xs" />
        </div>
        
        <div class="flex items-center gap-2">
          <span>Small:</span>
          <Kbd keyText="Ctrl" size="sm" />
          <span>+</span>
          <Kbd keyText="C" size="sm" />
        </div>
        
        <div class="flex items-center gap-2">
          <span>Medium:</span>
          <Kbd keyText="Ctrl" size="md" />
          <span>+</span>
          <Kbd keyText="C" size="md" />
        </div>
        
        <div class="flex items-center gap-2">
          <span>Large:</span>
          <Kbd keyText="Ctrl" size="lg" />
          <span>+</span>
          <Kbd keyText="C" size="lg" />
        </div>
      </div>
    `,
  }),
};

export const Variants: Story = {
  render: () => ({
    components: { Kbd },
    template: `
      <div class="space-y-4">
        <div class="flex items-center gap-2">
          <span>Default:</span>
          <Kbd keyText="Enter" variant="default" />
        </div>
        
        <div class="flex items-center gap-2">
          <span>Primary:</span>
          <Kbd keyText="Enter" variant="primary" />
        </div>
        
        <div class="flex items-center gap-2">
          <span>Secondary:</span>
          <Kbd keyText="Enter" variant="secondary" />
        </div>
        
        <div class="flex items-center gap-2">
          <span>Accent:</span>
          <Kbd keyText="Enter" variant="accent" />
        </div>
      </div>
    `,
  }),
};

export const KeyboardShortcuts: Story = {
  render: () => ({
    components: { Kbd },
    template: `
      <div class="max-w-md">
        <h3 class="text-lg font-semibold mb-4">Keyboard Shortcuts</h3>
        <div class="space-y-3">
          <div class="flex justify-between items-center p-3 bg-base-200 rounded-lg">
            <span>New File</span>
            <div class="flex items-center gap-1">
              <Kbd keyText="Ctrl" size="sm" />
              <span class="text-xs">+</span>
              <Kbd keyText="N" size="sm" />
            </div>
          </div>
          
          <div class="flex justify-between items-center p-3 bg-base-200 rounded-lg">
            <span>Open File</span>
            <div class="flex items-center gap-1">
              <Kbd keyText="Ctrl" size="sm" />
              <span class="text-xs">+</span>
              <Kbd keyText="O" size="sm" />
            </div>
          </div>
          
          <div class="flex justify-between items-center p-3 bg-base-200 rounded-lg">
            <span>Find</span>
            <div class="flex items-center gap-1">
              <Kbd keyText="Ctrl" size="sm" />
              <span class="text-xs">+</span>
              <Kbd keyText="F" size="sm" />
            </div>
          </div>
          
          <div class="flex justify-between items-center p-3 bg-base-200 rounded-lg">
            <span>Find & Replace</span>
            <div class="flex items-center gap-1">
              <Kbd keyText="Ctrl" size="sm" />
              <span class="text-xs">+</span>
              <Kbd keyText="H" size="sm" />
            </div>
          </div>
          
          <div class="flex justify-between items-center p-3 bg-base-200 rounded-lg">
            <span>Command Palette</span>
            <div class="flex items-center gap-1">
              <Kbd keyText="Ctrl" size="sm" />
              <span class="text-xs">+</span>
              <Kbd keyText="Shift" size="sm" />
              <span class="text-xs">+</span>
              <Kbd keyText="P" size="sm" />
            </div>
          </div>
        </div>
      </div>
    `,
  }),
};

export const ArrowKeys: Story = {
  render: () => ({
    components: { Kbd },
    template: `
      <div class="text-center space-y-4">
        <h4 class="text-lg font-semibold">Navigation Keys</h4>
        
        <div class="grid grid-cols-3 gap-2 w-40 mx-auto">
          <div></div>
          <Kbd keyText="↑" />
          <div></div>
          <Kbd keyText="←" />
          <Kbd keyText="↓" />
          <Kbd keyText="→" />
        </div>
        
        <div class="text-sm text-gray-600">
          Use arrow keys to navigate
        </div>
      </div>
    `,
  }),
};

export const FunctionKeys: Story = {
  render: () => ({
    components: { Kbd },
    template: `
      <div class="space-y-4">
        <h4 class="text-lg font-semibold">Function Keys</h4>
        
        <div class="grid grid-cols-6 gap-2">
          <Kbd keyText="F1" size="sm" />
          <Kbd keyText="F2" size="sm" />
          <Kbd keyText="F3" size="sm" />
          <Kbd keyText="F4" size="sm" />
          <Kbd keyText="F5" size="sm" />
          <Kbd keyText="F6" size="sm" />
          <Kbd keyText="F7" size="sm" />
          <Kbd keyText="F8" size="sm" />
          <Kbd keyText="F9" size="sm" />
          <Kbd keyText="F10" size="sm" />
          <Kbd keyText="F11" size="sm" />
          <Kbd keyText="F12" size="sm" />
        </div>
        
        <div class="text-sm text-gray-600">
          Press <Kbd keyText="F5" size="xs" /> to refresh
        </div>
      </div>
    `,
  }),
};

export const GameControls: Story = {
  render: () => ({
    components: { Kbd },
    template: `
      <div class="max-w-sm mx-auto">
        <div class="bg-gradient-to-br from-purple-500 to-pink-500 text-white p-6 rounded-lg">
          <h3 class="text-xl font-bold mb-4 text-center">Game Controls</h3>
          
          <div class="space-y-3">
            <div class="flex justify-between items-center">
              <span>Move</span>
              <div class="flex gap-1 text-black">
                <Kbd keyText="W" size="sm" variant="primary" />
                <Kbd keyText="A" size="sm" variant="primary" />
                <Kbd keyText="S" size="sm" variant="primary" />
                <Kbd keyText="D" size="sm" variant="primary" />
              </div>
            </div>
            
            <div class="flex justify-between items-center">
              <span>Jump</span>
              <Kbd keyText="Space" size="sm" variant="accent" class="text-black" />
            </div>
            
            <div class="flex justify-between items-center">
              <span>Sprint</span>
              <Kbd keyText="Shift" size="sm" variant="secondary" class="text-black" />
            </div>
            
            <div class="flex justify-between items-center">
              <span>Interact</span>
              <Kbd keyText="E" size="sm" variant="accent" class="text-black" />
            </div>
            
            <div class="flex justify-between items-center">
              <span>Menu</span>
              <Kbd keyText="Esc" size="sm" variant="secondary" class="text-black" />
            </div>
          </div>
        </div>
      </div>
    `,
  }),
};

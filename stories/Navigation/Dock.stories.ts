import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Dock from './Dock.vue';

const meta: Meta<typeof Dock> = {
  title: 'Navigation/Dock',
  component: Dock,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    position: {
      control: { type: 'select' },
      options: ['bottom', 'top', 'left', 'right'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'floating', 'glass'],
    },
    showTooltips: {
      control: { type: 'boolean' },
    },
    animated: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultItems = [
  {
    id: 'finder',
    label: 'Finder',
    icon: '📁',
    active: true,
  },
  {
    id: 'browser',
    label: 'Browser',
    icon: '🌐',
  },
  {
    id: 'terminal',
    label: 'Terminal',
    icon: '⚡',
  },
  {
    id: 'code',
    label: 'Code Editor',
    icon: '💻',
    badge: '3',
  },
  {
    id: 'mail',
    label: 'Mail',
    icon: '📧',
    badge: '12',
  },
];

export const Default: Story = {
  args: {
    items: defaultItems,
    position: 'bottom',
    size: 'md',
    variant: 'floating',
  },
};

export const Positions: Story = {
  render: () => ({
    components: { Dock },
    data() {
      return {
        items: [
          { id: 1, label: 'Home', icon: '🏠' },
          { id: 2, label: 'Search', icon: '🔍' },
          { id: 3, label: 'Settings', icon: '⚙️' },
          { id: 4, label: 'Profile', icon: '👤' },
        ],
      };
    },
    template: `
      <div class="relative h-screen bg-base-200">
        <div class="p-8">
          <h1 class="text-2xl font-bold mb-4">Dock Positions</h1>
          <p class="mb-4">Docks are positioned at different edges of the screen.</p>
          
          <div class="grid grid-cols-2 gap-4 text-sm">
            <div class="bg-base-100 p-4 rounded-lg">
              <h3 class="font-semibold">Bottom Dock</h3>
              <p>Traditional macOS-style dock at the bottom</p>
            </div>
            <div class="bg-base-100 p-4 rounded-lg">
              <h3 class="font-semibold">Top Dock</h3>
              <p>Dock positioned at the top of the screen</p>
            </div>
            <div class="bg-base-100 p-4 rounded-lg">
              <h3 class="font-semibold">Left Dock</h3>
              <p>Vertical dock on the left side</p>
            </div>
            <div class="bg-base-100 p-4 rounded-lg">
              <h3 class="font-semibold">Right Dock</h3>
              <p>Vertical dock on the right side</p>
            </div>
          </div>
        </div>
        
        <Dock :items="items" position="bottom" variant="floating" />
        <Dock :items="items" position="top" variant="glass" />
        <Dock :items="items" position="left" variant="default" />
        <Dock :items="items" position="right" variant="floating" />
      </div>
    `,
  }),
};

export const Variants: Story = {
  render: () => ({
    components: { Dock },
    data() {
      return {
        items: [
          { id: 1, label: 'Dashboard', icon: '📊' },
          { id: 2, label: 'Messages', icon: '💬', badge: '5' },
          { id: 3, label: 'Calendar', icon: '📅' },
          { id: 4, label: 'Photos', icon: '📸' },
          { id: 5, label: 'Music', icon: '🎵' },
        ],
      };
    },
    template: `
      <div class="relative h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
        <div class="p-8 text-white">
          <h1 class="text-3xl font-bold mb-4">Dock Variants</h1>
          <p class="mb-8 text-lg opacity-90">Different visual styles for the dock component</p>
          
          <div class="grid grid-cols-3 gap-6 text-sm">
            <div class="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
              <h3 class="font-semibold text-lg mb-2">Default</h3>
              <p>Simple background with minimal styling</p>
            </div>
            <div class="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
              <h3 class="font-semibold text-lg mb-2">Floating</h3>
              <p>Elevated appearance with shadow and border</p>
            </div>
            <div class="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
              <h3 class="font-semibold text-lg mb-2">Glass</h3>
              <p>Translucent with blur effect</p>
            </div>
          </div>
        </div>
        
        <Dock :items="items" position="bottom" variant="default" style="bottom: 120px;" />
        <Dock :items="items" position="bottom" variant="floating" style="bottom: 70px;" />
        <Dock :items="items" position="bottom" variant="glass" style="bottom: 20px;" />
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    components: { Dock },
    data() {
      return {
        items: [
          { id: 1, label: 'Small', icon: '🔹' },
          { id: 2, label: 'Medium', icon: '🔸' },
          { id: 3, label: 'Large', icon: '🔶' },
        ],
      };
    },
    template: `
      <div class="relative h-screen bg-base-200">
        <div class="p-8">
          <h1 class="text-2xl font-bold mb-4">Dock Sizes</h1>
          <p class="mb-4">Different sizes for the dock items</p>
        </div>
        
        <Dock :items="items" position="bottom" variant="floating" size="sm" style="bottom: 120px;" />
        <Dock :items="items" position="bottom" variant="floating" size="md" style="bottom: 70px;" />
        <Dock :items="items" position="bottom" variant="floating" size="lg" style="bottom: 20px;" />
      </div>
    `,
  }),
};

export const WithBadges: Story = {
  render: () => ({
    components: { Dock },
    data() {
      return {
        items: [
          { id: 'mail', label: 'Mail', icon: '📧', badge: '12' },
          { id: 'messages', label: 'Messages', icon: '💬', badge: '3' },
          { id: 'notifications', label: 'Notifications', icon: '🔔', badge: '99+' },
          { id: 'updates', label: 'Updates', icon: '🔄', badge: '1' },
          { id: 'calendar', label: 'Calendar', icon: '📅' },
        ],
      };
    },
    methods: {
      handleItemClick(item: { label: string; badge?: string }, index: number) {
        console.log('Clicked:', item.label, 'at index:', index);

        // Simulate clearing badges
        if (item.badge) {
          item.badge = '';
          setTimeout(() => {
            // Simulate new notifications
            if (item.label === 'Mail') {
              item.badge = Math.floor(Math.random() * 10).toString();
            } else if (item.label === 'Messages') {
              item.badge = Math.floor(Math.random() * 5).toString();
            }
          }, 2000);
        }
      },
    },
    template: `
      <div class="relative h-screen bg-base-200">
        <div class="p-8">
          <h1 class="text-2xl font-bold mb-4">Dock with Badges</h1>
          <p class="mb-4">Click items to clear badges (they'll randomly reappear)</p>
        </div>
        
        <Dock 
          :items="items" 
          position="bottom" 
          variant="floating"
          @item-click="handleItemClick"
        />
      </div>
    `,
  }),
};

export const ApplicationDock: Story = {
  render: () => ({
    components: { Dock },
    data() {
      return {
        activeApp: 'finder',
        applications: [
          {
            id: 'finder',
            label: 'Finder',
            icon: '📁',
            active: true,
          },
          {
            id: 'safari',
            label: 'Safari',
            icon: '🌐',
          },
          {
            id: 'mail',
            label: 'Mail',
            icon: '📧',
            badge: '7',
          },
          {
            id: 'messages',
            label: 'Messages',
            icon: '💬',
            badge: '2',
          },
          {
            id: 'photos',
            label: 'Photos',
            icon: '📸',
          },
          {
            id: 'music',
            label: 'Music',
            icon: '🎵',
          },
          {
            id: 'terminal',
            label: 'Terminal',
            icon: '⚡',
          },
          {
            id: 'vscode',
            label: 'VS Code',
            icon: '💻',
            badge: '3',
          },
          {
            id: 'settings',
            label: 'System Preferences',
            icon: '⚙️',
          },
        ],
      };
    },
    computed: {
      dockItems() {
        return this.applications.map((app: any) => ({
          ...app,
          active: app.id === this.activeApp,
        }));
      },
    },
    methods: {
      handleAppClick(app: { id: string; label: string }, _index: number) {
        this.activeApp = app.id;
        console.log('Launched:', app.label);

        // Simulate opening an application
        setTimeout(() => {
          alert(`Opening ${app.label}...`);
        }, 100);
      },
    },
    template: `
      <div class="relative h-screen bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700">
        <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920')] bg-cover bg-center opacity-30"></div>
        
        <div class="relative z-10 p-8 text-white">
          <h1 class="text-4xl font-bold mb-4">macOS-style Application Dock</h1>
          <p class="text-lg mb-4 opacity-90">Click applications to launch them</p>
          
          <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4 max-w-md">
            <h3 class="font-semibold mb-2">Active Application:</h3>
            <p class="text-xl">{{ applications.find(app => app.id === activeApp)?.label }}</p>
          </div>
        </div>
        
        <Dock 
          :items="dockItems" 
          position="bottom" 
          variant="glass"
          size="lg"
          @item-click="handleAppClick"
        />
      </div>
    `,
  }),
};

export const ToolbarDock: Story = {
  render: () => ({
    components: { Dock },
    data() {
      return {
        selectedTool: 'select',
        tools: [
          { id: 'select', label: 'Select', icon: '↖️' },
          { id: 'move', label: 'Move', icon: '✋' },
          { id: 'rotate', label: 'Rotate', icon: '🔄' },
          { id: 'scale', label: 'Scale', icon: '📏' },
          { id: 'pen', label: 'Pen', icon: '✏️' },
          { id: 'brush', label: 'Brush', icon: '🖌️' },
          { id: 'eraser', label: 'Eraser', icon: '🧹' },
          { id: 'text', label: 'Text', icon: '📝' },
        ],
      };
    },
    computed: {
      toolItems() {
        return this.tools.map((tool: any) => ({
          ...tool,
          active: tool.id === this.selectedTool,
        }));
      },
    },
    methods: {
      handleToolSelect(tool: { id: string; label: string }, _index: number) {
        this.selectedTool = tool.id;
        console.log('Selected tool:', tool.label);
      },
    },
    template: `
      <div class="relative h-screen bg-gray-100">
        <div class="p-8">
          <h1 class="text-2xl font-bold mb-4">Design Tool Toolbar</h1>
          <div class="bg-white rounded-lg p-6 shadow-sm max-w-md">
            <h3 class="font-semibold mb-2">Selected Tool:</h3>
            <div class="flex items-center gap-2">
              <span class="text-2xl">{{ tools.find(t => t.id === selectedTool)?.icon }}</span>
              <span class="text-lg">{{ tools.find(t => t.id === selectedTool)?.label }}</span>
            </div>
          </div>
          
          <div class="mt-8 bg-white rounded-lg p-6 shadow-sm">
            <h3 class="font-semibold mb-4">Canvas Area</h3>
            <div class="w-full h-64 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
              <p class="text-gray-500">Design workspace</p>
            </div>
          </div>
        </div>
        
        <Dock 
          :items="toolItems" 
          position="left" 
          variant="floating"
          size="md"
          @item-click="handleToolSelect"
        />
      </div>
    `,
  }),
};

export const SocialMediaDock: Story = {
  render: () => ({
    components: { Dock },
    data() {
      return {
        socialApps: [
          {
            id: 'twitter',
            label: 'Twitter',
            icon: '🐦',
            href: 'https://twitter.com',
            target: '_blank',
          },
          {
            id: 'facebook',
            label: 'Facebook',
            icon: '📘',
            href: 'https://facebook.com',
            target: '_blank',
            badge: '3',
          },
          {
            id: 'instagram',
            label: 'Instagram',
            icon: '📷',
            href: 'https://instagram.com',
            target: '_blank',
          },
          {
            id: 'linkedin',
            label: 'LinkedIn',
            icon: '💼',
            href: 'https://linkedin.com',
            target: '_blank',
            badge: '12',
          },
          {
            id: 'youtube',
            label: 'YouTube',
            icon: '📺',
            href: 'https://youtube.com',
            target: '_blank',
          },
          {
            id: 'tiktok',
            label: 'TikTok',
            icon: '🎵',
            href: 'https://tiktok.com',
            target: '_blank',
            badge: '99+',
          },
        ],
      };
    },
    methods: {
      handleSocialClick(app: { label: string; href?: string }, _index: number, event: Event) {
        console.log('Opening:', app.label);

        // For demo purposes, prevent actual navigation
        if (app.href) {
          event.preventDefault();
          alert(`Would open ${app.label} in new tab`);
        }
      },
    },
    template: `
      <div class="relative h-screen bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600">
        <div class="p-8 text-white">
          <h1 class="text-3xl font-bold mb-4">Social Media Dock</h1>
          <p class="text-lg mb-8 opacity-90">Quick access to your favorite social platforms</p>
          
          <div class="bg-white/20 backdrop-blur-sm rounded-lg p-6 max-w-lg">
            <h3 class="font-semibold text-xl mb-4">Features:</h3>
            <ul class="space-y-2">
              <li class="flex items-center gap-2">
                <span class="w-2 h-2 bg-white rounded-full"></span>
                <span>External links with target="_blank"</span>
              </li>
              <li class="flex items-center gap-2">
                <span class="w-2 h-2 bg-white rounded-full"></span>
                <span>Notification badges</span>
              </li>
              <li class="flex items-center gap-2">
                <span class="w-2 h-2 bg-white rounded-full"></span>
                <span>Hover tooltips</span>
              </li>
              <li class="flex items-center gap-2">
                <span class="w-2 h-2 bg-white rounded-full"></span>
                <span>Glass morphism design</span>
              </li>
            </ul>
          </div>
        </div>
        
        <Dock 
          :items="socialApps" 
          position="bottom" 
          variant="glass"
          size="lg"
          @item-click="handleSocialClick"
        />
      </div>
    `,
  }),
};

import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Drawer from '../../src/runtime/components/Layout/Drawer.vue'
import Navbar from '../../src/runtime/components/Navigation/Navbar.vue'

const meta: Meta<typeof Drawer> = {
    title: 'Layout/Drawer',
    component: Drawer,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component:
                    'DaisyUI drawer wrapper with Vue 3.5 defineModel() support. Slots: content, top, body, bottom (header slot deprecated). Emits open/close events. Props include mode (default|sidebar), position, width, backdrop, persistent, showCloseButton, id, forceOpen, items.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        mode: {
            control: { type: 'select' },
            options: ['default', 'sidebar'],
        },
        position: {
            control: { type: 'select' },
            options: ['left', 'right'],
        },
        width: {
            control: { type: 'select' },
            options: ['sm', 'md', 'lg', 'xl', 'full'],
        },
        id: {
            control: { type: 'text' },
        },
        showCloseButton: {
            control: { type: 'boolean' },
        },
        persistent: {
            control: { type: 'boolean' },
        },
        backdrop: {
            control: { type: 'boolean' },
        },
        forceOpen: {
            control: { type: 'boolean' },
        },
        items: {
            control: { type: 'array' },
        },
        // event actions
        open: { action: 'open' },
        close: { action: 'close' },
    },
    args: {
        mode: 'default',
        position: 'left',
        width: 'md',
        showCloseButton: true,
        persistent: false,
        backdrop: true,
        forceOpen: false,
        items: [
            { label: 'Dashboard', icon: 'home', href: '#' },
            {
                label: 'Reports',
                icon: 'library',
            },
            { label: 'Settings', icon: 'settings', href: '#' },
            { label: 'Support', icon: 'help-circle', href: '#' },
        ],
    },
}

export default meta
type Story = StoryObj<typeof meta>

export const DefaultVariant: Story = {
    render: (args) => ({
        components: { Drawer },
        data() {
            return {
                drawerOpen: false,
            }
        },
        setup() {
            return { args }
        },
        template: `
            <div class="h-screen">
              <Drawer v-model="drawerOpen" v-bind="args" @open="args.open" @close="args.close">
              </Drawer>
            </div>
        `,
    }),
}

export const DefaultVariantRight: Story = {
    args: { position: 'right' },
    render: (args) => ({
        components: { Drawer },
        data() {
            return {
                drawerOpen: false,
            }
        },
        setup() {
            return { args }
        },
        template: `
      <div class="h-screen">
        <Drawer v-model="drawerOpen" v-bind="args" @open="args.open" @close="args.close" />
      </div>
    `,
    }),
}

export const WithItemsProp: Story = {
    args: {
        items: [
            { label: 'Dashboard', icon: '🏠', href: '#' },
            {
                label: 'Reports',
                icon: '📄',
                href: '#',
                children: [
                    { label: 'Monthly', href: '#' },
                    { label: 'Annual', href: '#' },
                ],
            },
            { label: 'Settings', icon: '⚙️', href: '#' },
        ],
    },
    render: (args) => ({
        components: { Drawer },
        data() {
            return {
                drawerOpen: true,
            }
        },
        setup() {
            return { args }
        },
        template: `
      <div class="h-screen">
        <Drawer v-model="drawerOpen" v-bind="args" @open="args.open" @close="args.close">
          <template #content>
            <div class="p-6">
              <h2 class="text-xl font-semibold">Drawer with items prop</h2>
              <p class="opacity-70">Body slot omitted to render built-in Menu from items.</p>
            </div>
          </template>
        </Drawer>
      </div>
    `,
    }),
}

export const SidebarMode: Story = {
    args: {
        mode: 'sidebar',
        items: [
            { label: 'Home', icon: 'home', href: '#' },
            { label: 'Search', icon: 'search', href: '#' },
            { label: 'Settings', icon: 'settings', href: '#' },
        ],
    },
    render: (args) => ({
        components: { Drawer, Navbar },
        data() {
            return {
                drawerOpen: true,
            }
        },
        setup() {
            return { args }
        },
        template: `
      <div class="h-screen">
        <Drawer v-model="drawerOpen" v-bind="args" @open="args.open" @close="args.close">
            <template #content>
                <div class="flex flex-col h-full">
                    <div>
                        <Navbar title="Admin" :showMobileMenu="false" shadow>
                        </Navbar>
                    </div>
                    <div class="p-4">
                    </div>
                </div>
            </template>
        </Drawer>
      </div>
    `,
    }),
}

export const ForceOpen: Story = {
    args: {
        forceOpen: true,
        mode: 'sidebar',
        items: [
            { label: 'Dashboard', icon: 'home', href: '#' },
            { label: 'Analytics', icon: 'analytics', href: '#' },
            { label: 'Settings', icon: 'settings', href: '#' },
        ],
    },
    render: (args) => ({
        components: { Drawer },
        setup() {
            return { args }
        },
        template: `
      <div class="h-screen">
        <!-- When forceOpen is true, omit v-model -->
        <Drawer v-bind="args" @open="args.open" @close="args.close">
          <template #content>
            <div class="p-8">
              <h1 class="text-2xl font-bold mb-2">Always Open</h1>
              <p class="opacity-70">The drawer stays open using the <code>forceOpen</code> prop. Hover over the chevron button to see the tooltip.</p>
            </div>
          </template>
        </Drawer>
      </div>
    `,
    }),
}

export const Playground: Story = {
    args: {
        mode: 'default',
        position: 'left',
        width: 'md',
        showCloseButton: true,
        persistent: false,
        backdrop: true,
        forceOpen: false,
        items: [
            { label: 'Home', icon: 'home', href: '#' },
            { label: 'Search', icon: 'magnifyingGlass', href: '#' },
            { label: 'Settings', icon: 'cog6Tooth', href: '#' },
        ],
    },
    render: (args) => ({
        components: { Drawer },
        data() {
            return {
                drawerOpen: false,
            }
        },
        setup() {
            return { args }
        },
        template: `
      <div class="h-screen">
        <Drawer v-model="drawerOpen" v-bind="args" @open="args.open" @close="args.close" />
      </div>
    `,
    }),
}

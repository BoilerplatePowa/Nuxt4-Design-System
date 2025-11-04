import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Drawer from '../../src/runtime/components/Layout/Drawer.vue'
import Navbar from '../../src/runtime/components/Navigation/Navbar.vue'
import { Home, Library, Settings, HelpCircle, FileText, Search, BarChart } from 'lucide-vue-next'

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
        glass: {
            control: { type: 'boolean' },
            description: 'Apply glass effect with padding and rounded corners',
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
        glass: false,
        items: [
            { label: 'Dashboard', icon: Home, href: '#' },
            {
                label: 'Reports',
                icon: Library,
            },
            { label: 'Settings', icon: Settings, href: '#' },
            { label: 'Support', icon: HelpCircle, href: '#' },
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
            <div class="h-screen border-2">
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
            { label: 'Dashboard', icon: Home, href: '#' },
            {
                label: 'Reports',
                icon: FileText,
                href: '#',
                children: [
                    { label: 'Monthly', href: '#' },
                    { label: 'Annual', href: '#' },
                ],
            },
            { label: 'Settings', icon: Settings, href: '#' },
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
            { label: 'Home', icon: Home, href: '#' },
            { label: 'Search', icon: Search, href: '#' },
            { label: 'Settings', icon: Settings, href: '#' },
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
            { label: 'Dashboard', icon: Home, href: '#' },
            { label: 'Analytics', icon: BarChart, href: '#' },
            { label: 'Settings', icon: Settings, href: '#' },
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

export const GlassVariant: Story = {
    args: {
        glass: true,
        mode: 'sidebar',
        forceOpen: true,
        items: [
            { label: 'Home', icon: Home, href: '#' },
            { label: 'Search', icon: Search, href: '#' },
            { label: 'Analytics', icon: BarChart, href: '#' },
            { label: 'Settings', icon: Settings, href: '#' },
        ],
    },
    render: (args) => ({
        components: { Drawer, Navbar },
        setup() {
            return { args }
        },
        template: `
      <div class="h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500">
        <Drawer v-bind="args" @open="args.open" @close="args.close">
          <template #content>
            <div class="flex flex-col h-full">
              <Navbar title="Glass Effect" :showMobileMenu="false" glass />
              <div class="p-8">
                <h1 class="text-3xl font-bold mb-4 text-white">Glass Drawer</h1>
                <p class="text-white opacity-90">
                  The sidebar has a beautiful glass effect with rounded corners and subtle padding.
                  Perfect for modern, elegant designs with colorful backgrounds.
                </p>
              </div>
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
            { label: 'Home', icon: Home, href: '#' },
            { label: 'Search', icon: Search, href: '#' },
            { label: 'Settings', icon: Settings, href: '#' },
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

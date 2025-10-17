import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Drawer from '../../src/runtime/components/Layout/Drawer.vue'

const meta: Meta<typeof Drawer> = {
    title: 'Layout/Drawer',
    component: Drawer,
    parameters: {
        layout: 'fullscreen',
    },
    argTypes: {
        position: {
            control: { type: 'select' },
            options: ['left', 'right'],
        },
        width: {
            control: { type: 'select' },
            options: ['sm', 'md', 'lg', 'xl', 'full'],
        },
        // variant removed
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
        iconOnly: {
            control: { type: 'boolean' },
        },
    },
    args: {
        position: 'left',
        width: 'md',
        // variant removed
        showCloseButton: true,
        persistent: false,
        backdrop: true,
        forceOpen: false,
        iconOnly: false,
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
        <div class="p-4">
          <button class="btn btn-primary" @click="drawerOpen = !drawerOpen">
            {{ drawerOpen ? 'Close' : 'Open' }} Drawer
          </button>
        </div>

        <Drawer v-model="drawerOpen" v-bind="args">
          <template #content>
            <div class="p-8">
              <h1 class="text-3xl font-bold mb-4">Default Drawer</h1>
              <p class="opacity-70">Use the external button to open/close.</p>
            </div>
          </template>

          <template #header="{ drawerId }">
            <div class="flex items-center gap-2">
              <span class="text-lg font-bold">Project</span>
              <div v-if="args.iconOnly" class="ml-auto is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Open/Close">
                <label :for="drawerId" class="btn btn-ghost btn-circle drawer-button is-drawer-open:rotate-y-180">⇄</label>
              </div>
            </div>
          </template>
          <template #body>
            <ul class="menu w-full">
              <li>
                <a>
                  <span class="inline-block size-4">🏠</span>
                  <span class="is-drawer-close:hidden">Dashboard</span>
                </a>
              </li>
              <li>
                <a>
                  <span class="inline-block size-4">📄</span>
                  <span class="is-drawer-close:hidden">Reports</span>
                </a>
              </li>
              <li>
                <a>
                  <span class="inline-block size-4">⚙️</span>
                  <span class="is-drawer-close:hidden">Settings</span>
                </a>
              </li>
              <li>
                <a>
                  <span class="inline-block size-4">🆘</span>
                  <span class="is-drawer-close:hidden">Support</span>
                </a>
              </li>
            </ul>
          </template>
          <template #bottom>
            <div class="pt-2 border-t border-base-300">
              <button class="btn btn-ghost w-full">
                <span class="inline-block size-4">🚪</span>
                <span class="is-drawer-close:hidden">Logout</span>
              </button>
            </div>
          </template>
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
        <div class="p-4">
          <button class="btn btn-secondary" @click="drawerOpen = !drawerOpen">
            Toggle Right Drawer
          </button>
        </div>
        <Drawer v-model="drawerOpen" v-bind="args">
          <template #content>
            <div class="p-8">
              <h1 class="text-3xl font-bold mb-4">Right Drawer</h1>
              <p class="opacity-70">Slides in from the right.</p>
            </div>
          </template>
          <template #header="{ drawerId }">
            <div class="flex items-center gap-2">
              <span class="text-lg font-bold">Settings</span>
              <div v-if="args.iconOnly" class="ml-auto is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Open/Close">
                <label :for="drawerId" class="btn btn-ghost btn-circle drawer-button is-drawer-open:rotate-y-180">⇄</label>
              </div>
            </div>
          </template>
          <template #body>
            <ul class="menu w-full">
              <li>
                <a>
                  <span class="inline-block size-4">🛠️</span>
                  <span class="is-drawer-close:hidden">General</span>
                </a>
              </li>
              <li>
                <a>
                  <span class="inline-block size-4">🔔</span>
                  <span class="is-drawer-close:hidden">Notifications</span>
                </a>
              </li>
              <li>
                <a>
                  <span class="inline-block size-4">🔐</span>
                  <span class="is-drawer-close:hidden">Security</span>
                </a>
              </li>
            </ul>
          </template>
          <template #bottom>
            <div class="pt-2 border-t border-base-300">
              <button class="btn btn-ghost w-full">
                <span class="inline-block size-4">🚪</span>
                <span class="is-drawer-close:hidden">Close</span>
              </button>
            </div>
          </template>
        </Drawer>
      </div>
    `,
    }),
}

// Sidebar/minified variant removed

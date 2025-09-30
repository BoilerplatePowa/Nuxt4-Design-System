import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import ThemeController from '../../src/runtime/components/Actions/ThemeController.vue'

const meta: Meta<typeof ThemeController> = {
    title: 'Actions/ThemeController',
    component: ThemeController,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A flexible theme controller component with multiple variants for switching between themes. Supports button, toggle, switch, dropdown, and radio variants.',
            },
        },
    },
    argTypes: {
        variant: {
            control: { type: 'select' },
            options: ['button', 'toggle', 'switch', 'dropdown', 'radio'],
            description: 'Theme controller variant',
        },
        themes: {
            control: 'object',
            description: 'Array of available themes with value and label properties',
        },
        defaultTheme: {
            control: 'text',
            description: 'Default theme value',
        },
        darkTheme: {
            control: 'text',
            description: 'Theme value for dark mode',
        },
        lightTheme: {
            control: 'text',
            description: 'Theme value for light mode',
        },
        showLabel: {
            control: { type: 'boolean' },
            description: 'Show theme label (button variant only)',
        },
        size: {
            control: { type: 'select' },
            options: ['xs', 'sm', 'md', 'lg'],
            description: 'Component size',
        },
        radioName: {
            control: 'text',
            description: 'Name attribute for radio inputs (radio variant only)',
        },
        ariaLabel: {
            control: 'text',
            description: 'ARIA label for accessibility',
        },
        onThemeChange: {
            action: 'themeChange',
            description: 'Theme change event',
        },
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        variant: 'button',
        size: 'md',
    },
}

export const AllVariants: Story = {
    render: () => ({
        components: { ThemeController },
        setup() {
            const currentTheme = ref('light')
            const allThemes = ref([
                { value: 'light', label: 'Light' },
                { value: 'dark', label: 'Dark' },
                { value: 'cupcake', label: 'Cupcake' },
                { value: 'bumblebee', label: 'Bumblebee' },
                { value: 'emerald', label: 'Emerald' },
                { value: 'corporate', label: 'Corporate' },
            ])

            const onThemeChange = (theme: string) => {
                currentTheme.value = theme
                console.log('Theme changed to:', theme)
            }

            return { currentTheme, allThemes, onThemeChange }
        },
        template: `
      <div class="space-y-6">
        <div class="text-center">
          <h3 class="text-lg font-bold mb-2">All Theme Controller Variants</h3>
          <p class="text-sm opacity-70">Current theme: <strong>{{ currentTheme }}</strong></p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Button Variant -->
          <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
              <h2 class="card-title">Button Variant</h2>
              <p class="mb-4">Simple button toggle between light and dark themes.</p>
              <div class="flex gap-2">
                <ThemeController variant="button" @theme-change="onThemeChange" />
                <ThemeController variant="button" :show-label="true" @theme-change="onThemeChange" />
              </div>
            </div>
          </div>
          
          <!-- Toggle Variant -->
          <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
              <h2 class="card-title">Toggle Variant</h2>
              <p class="mb-4">Classic toggle switch for theme switching.</p>
              <div class="flex justify-between items-center">
                <span>Enable dark mode</span>
                <ThemeController variant="toggle" @theme-change="onThemeChange" />
              </div>
            </div>
          </div>
          
          <!-- Switch Variant -->
          <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
              <h2 class="card-title">Switch Variant</h2>
              <p class="mb-4">Primary colored switch for theme switching.</p>
              <div class="flex justify-between items-center">
                <span>Enable dark mode</span>
                <ThemeController variant="switch" @theme-change="onThemeChange" />
              </div>
            </div>
          </div>
          
          <!-- Dropdown Variant -->
          <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
              <h2 class="card-title">Dropdown Variant</h2>
              <p class="mb-4">Dropdown menu for multiple theme options.</p>
              <ThemeController variant="dropdown" :themes="allThemes" @theme-change="onThemeChange" />
            </div>
          </div>
          
          <!-- Radio Variant -->
          <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
              <h2 class="card-title">Radio Variant</h2>
              <p class="mb-4">Radio buttons for explicit theme selection.</p>
              <ThemeController variant="radio" :themes="allThemes" radio-name="demo-theme" @theme-change="onThemeChange" />
            </div>
          </div>
        </div>
      </div>
    `,
    }),
}

export const AllSizes: Story = {
    render: () => ({
        components: { ThemeController },
        template: `
      <div class="space-y-6">
        <div>
          <h3 class="text-lg font-bold mb-4">Button Variant Sizes</h3>
          <div class="flex gap-4 items-center">
            <ThemeController variant="button" size="xs" />
            <ThemeController variant="button" size="sm" />
            <ThemeController variant="button" size="md" />
            <ThemeController variant="button" size="lg" />
          </div>
        </div>
        
        <div>
          <h3 class="text-lg font-bold mb-4">Toggle Variant Sizes</h3>
          <div class="flex gap-4 items-center">
            <div class="flex items-center gap-2">
              <span class="text-sm">XS:</span>
              <ThemeController variant="toggle" size="xs" />
            </div>
            <div class="flex items-center gap-2">
              <span class="text-sm">SM:</span>
              <ThemeController variant="toggle" size="sm" />
            </div>
            <div class="flex items-center gap-2">
              <span class="text-sm">MD:</span>
              <ThemeController variant="toggle" size="md" />
            </div>
            <div class="flex items-center gap-2">
              <span class="text-sm">LG:</span>
              <ThemeController variant="toggle" size="lg" />
            </div>
          </div>
        </div>
        
        <div>
          <h3 class="text-lg font-bold mb-4">Switch Variant Sizes</h3>
          <div class="flex gap-4 items-center">
            <div class="flex items-center gap-2">
              <span class="text-sm">XS:</span>
              <ThemeController variant="switch" size="xs" />
            </div>
            <div class="flex items-center gap-2">
              <span class="text-sm">SM:</span>
              <ThemeController variant="switch" size="sm" />
            </div>
            <div class="flex items-center gap-2">
              <span class="text-sm">MD:</span>
              <ThemeController variant="switch" size="md" />
            </div>
            <div class="flex items-center gap-2">
              <span class="text-sm">LG:</span>
              <ThemeController variant="switch" size="lg" />
            </div>
          </div>
        </div>
      </div>
    `,
    }),
}

export const AdvancedExamples: Story = {
    render: () => ({
        components: { ThemeController },
        setup() {
            const customThemes = ref([
                { value: 'light', label: 'Light Theme' },
                { value: 'dark', label: 'Dark Theme' },
                { value: 'cupcake', label: 'Cupcake' },
                { value: 'bumblebee', label: 'Bumblebee' },
                { value: 'emerald', label: 'Emerald' },
                { value: 'corporate', label: 'Corporate' },
                { value: 'synthwave', label: 'Synthwave' },
                { value: 'retro', label: 'Retro' },
                { value: 'cyberpunk', label: 'Cyberpunk' },
                { value: 'valentine', label: 'Valentine' },
                { value: 'halloween', label: 'Halloween' },
                { value: 'garden', label: 'Garden' },
                { value: 'forest', label: 'Forest' },
                { value: 'aqua', label: 'Aqua' },
                { value: 'lofi', label: 'Lo-Fi' },
                { value: 'pastel', label: 'Pastel' },
                { value: 'fantasy', label: 'Fantasy' },
                { value: 'wireframe', label: 'Wireframe' },
                { value: 'black', label: 'Black' },
                { value: 'luxury', label: 'Luxury' },
                { value: 'dracula', label: 'Dracula' },
                { value: 'cmyk', label: 'CMYK' },
                { value: 'autumn', label: 'Autumn' },
                { value: 'business', label: 'Business' },
                { value: 'acid', label: 'Acid' },
                { value: 'lemonade', label: 'Lemonade' },
                { value: 'night', label: 'Night' },
                { value: 'coffee', label: 'Coffee' },
                { value: 'winter', label: 'Winter' },
            ])

            const radioThemes = ref([
                { value: 'light', label: 'Light' },
                { value: 'dark', label: 'Dark' },
                { value: 'cupcake', label: 'Cupcake' },
                { value: 'bumblebee', label: 'Bumblebee' },
                { value: 'emerald', label: 'Emerald' },
                { value: 'corporate', label: 'Corporate' },
                { value: 'synthwave', label: 'Synthwave' },
            ])

            return { customThemes, radioThemes }
        },
        template: `
      <div class="space-y-6">
        <!-- Dropdown with Many Themes -->
        <div>
          <h3 class="text-lg font-bold mb-4">Dropdown with All Themes</h3>
          <div class="flex gap-4 items-center">
            <ThemeController variant="dropdown" size="sm" :themes="customThemes" />
            <ThemeController variant="dropdown" size="md" :themes="customThemes" />
            <ThemeController variant="dropdown" size="lg" :themes="customThemes" />
          </div>
        </div>
        
        <!-- Radio Variant -->
        <div>
          <h3 class="text-lg font-bold mb-4">Radio Variant</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ThemeController variant="radio" :themes="radioThemes" radio-name="theme-selection" />
          </div>
        </div>
        
        <!-- In Context Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
              <h2 class="card-title">Theme Toggle in Context</h2>
              <div class="flex justify-between items-center">
                <span>Enable dark mode</span>
                <ThemeController variant="toggle" />
              </div>
            </div>
          </div>
          
          <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
              <h2 class="card-title">Theme Preferences</h2>
              <p class="mb-4">Choose your preferred theme:</p>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                <ThemeController variant="radio" :themes="radioThemes" radio-name="preferences-theme" size="sm" />
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
    }),
}

export const InNavbar: Story = {
    render: () => ({
        components: { ThemeController },
        setup() {
            const navbarThemes = ref([
                { value: 'light', label: 'Light' },
                { value: 'dark', label: 'Dark' },
                { value: 'cupcake', label: 'Cupcake' },
                { value: 'bumblebee', label: 'Bumblebee' },
                { value: 'emerald', label: 'Emerald' },
                { value: 'corporate', label: 'Corporate' },
                { value: 'synthwave', label: 'Synthwave' },
            ])

            const onThemeChange = (theme: string) => {
                console.log('Navbar theme changed to:', theme)
            }

            return { navbarThemes, onThemeChange }
        },
        template: `
      <div class="space-y-6">
        <h3 class="text-lg font-bold mb-4">Theme Controller in Navbar</h3>
        
        <!-- Button Variant in Navbar -->
        <div class="navbar bg-base-100 shadow-lg rounded-box mb-4">
          <div class="flex-1">
            <a class="btn btn-ghost text-xl">My App</a>
          </div>
          <div class="flex-none gap-2">
            <div class="form-control">
              <input type="text" placeholder="Search" class="input input-bordered w-24 md:w-auto" />
            </div>
            <ThemeController variant="button" @theme-change="onThemeChange" />
            <div class="dropdown dropdown-end">
              <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
                <div class="w-10 rounded-full">
                  <img alt="Avatar" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
              </div>
              <ul tabindex="0" class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                <li><a>Profile</a></li>
                <li><a>Settings</a></li>
                <li><a>Logout</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <!-- Dropdown Variant in Navbar -->
        <div class="navbar bg-base-100 shadow-lg rounded-box mb-4">
          <div class="flex-1">
            <a class="btn btn-ghost text-xl">My App</a>
          </div>
          <div class="flex-none gap-2">
            <div class="form-control">
              <input type="text" placeholder="Search" class="input input-bordered w-24 md:w-auto" />
            </div>
            <ThemeController variant="dropdown" :themes="navbarThemes" size="sm" @theme-change="onThemeChange" />
            <div class="dropdown dropdown-end">
              <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
                <div class="w-10 rounded-full">
                  <img alt="Avatar" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
              </div>
              <ul tabindex="0" class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                <li><a>Profile</a></li>
                <li><a>Settings</a></li>
                <li><a>Logout</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <!-- Toggle Variant in Navbar -->
        <div class="navbar bg-base-100 shadow-lg rounded-box">
          <div class="flex-1">
            <a class="btn btn-ghost text-xl">My App</a>
          </div>
          <div class="flex-none gap-2">
            <div class="form-control">
              <input type="text" placeholder="Search" class="input input-bordered w-24 md:w-auto" />
            </div>
            <div class="flex items-center gap-2">
              <span class="text-sm">Theme</span>
              <ThemeController variant="toggle" @theme-change="onThemeChange" />
            </div>
            <div class="dropdown dropdown-end">
              <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
                <div class="w-10 rounded-full">
                  <img alt="Avatar" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
              </div>
              <ul tabindex="0" class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                <li><a>Profile</a></li>
                <li><a>Settings</a></li>
                <li><a>Logout</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="alert alert-info">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>Theme controller integrated into navbar components with different variants</span>
        </div>
      </div>
    `,
    }),
}

export const Playground: Story = {
    args: {
        variant: 'button',
        themes: [
            { value: 'light', label: 'Light' },
            { value: 'dark', label: 'Dark' },
            { value: 'cupcake', label: 'Cupcake' },
            { value: 'corporate', label: 'Corporate' },
        ],
        defaultTheme: 'light',
        darkTheme: 'dark',
        lightTheme: 'light',
        showLabel: false,
        size: 'md',
        radioName: 'playground-theme',
        ariaLabel: 'Toggle theme',
    },
    render: args => ({
        components: { ThemeController },
        setup() {
            return { args }
        },
        template: `
      <div class="space-y-4">
        <ThemeController v-bind="args" />
        
        <div class="text-sm text-gray-600">
          Use the controls above to customize this theme controller
        </div>
      </div>
    `,
    }),
}

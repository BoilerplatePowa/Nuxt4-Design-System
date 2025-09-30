import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Card from '../../src/runtime/components/DataDisplay/Card.vue'
import Button from '../../src/runtime/components/Actions/Button.vue'
import Alert from '../../src/runtime/components/Feedback/Alert.vue'
import { ref } from 'vue'

const meta: Meta<typeof Card> = {
    title: 'Data Display/Card',
    component: Card,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A flexible card component with optional header, body and footer.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        title: {
            control: { type: 'text' },
            description: 'Card title',
        },
        variant: {
            control: { type: 'select' },
            options: ['normal', 'bordered', 'compact', 'side', 'outline'],
            description: 'Card variant',
        },
        shadow: {
            control: { type: 'select' },
            options: ['none', 'sm', 'md', 'lg', 'xl', '2xl'],
            description: 'Card shadow size',
        },
        glass: {
            control: 'boolean',
            description: 'Glass effect',
        },
        imageFull: {
            control: 'boolean',
            description: 'Full image layout',
        },
    },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: args => ({
        components: { Card },
        setup() {
            return { args }
        },
        template: '<Card v-bind="args">Card content with simple text.</Card>',
    }),
}

export const WithTitle: Story = {
    args: {
        title: 'Card Title',
    },
    render: args => ({
        components: { Card },
        setup() {
            return { args }
        },
        template: '<Card v-bind="args">This card has a title defined via the title prop.</Card>',
    }),
}

export const CustomHeader: Story = {
    render: args => ({
        components: { Card },
        setup() {
            return { args }
        },
        template: `
      <Card v-bind="args">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold">Custom Header</h3>
            <span class="text-sm text-gray-500">Badge</span>
          </div>
        </template>
        Card content with custom header.
      </Card>
    `,
    }),
}

export const WithFooter: Story = {
    render: args => ({
        components: { Card, Button },
        setup() {
            return { args }
        },
        template: `
      <Card v-bind="args">
        This card has a footer with actions.
        <template #footer>
          <Button variant="primary" size="sm">Save</Button>
          <Button variant="secondary" size="sm">Cancel</Button>
        </template>
      </Card>
    `,
    }),
}

export const Bordered: Story = {
    args: {
        variant: 'bordered',
        title: 'Bordered Card',
    },
    render: args => ({
        components: { Card },
        setup() {
            return { args }
        },
        template:
      '<Card v-bind="args">This card uses the bordered variant with a visible border.</Card>',
    }),
}

export const Outline: Story = {
    args: {
        variant: 'outline',
        title: 'Outline Card',
    },
    render: args => ({
        components: { Card },
        setup() {
            return { args }
        },
        template:
      '<Card v-bind="args">This card uses the outline variant with a transparent background and prominent border.</Card>',
    }),
}

export const Glass: Story = {
    args: {
        glass: true,
        title: 'Glass Card',
    },
    render: args => ({
        components: { Card },
        setup() {
            return { args }
        },
        template: `
      <div class="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-8">
        <div class="max-w-md mx-auto">
          <Card v-bind="args">This card uses the glass variant with a transparency effect. The background shows through the card.</Card>
        </div>
      </div>
    `,
    }),
}

export const NoShadow: Story = {
    args: {
        shadow: 'none',
        title: 'No Shadow',
    },
    render: args => ({
        components: { Card },
        setup() {
            return { args }
        },
        template: '<Card v-bind="args">This card has no shadow.</Card>',
    }),
}

export const WithShadow: Story = {
    args: {
        shadow: '2xl',
        title: 'With Shadow',
    },
    render: args => ({
        components: { Card },
        setup() {
            return { args }
        },
        template: '<Card v-bind="args">This card has a very pronounced shadow.</Card>',
    }),
}

export const Compact: Story = {
    args: {
        variant: 'compact',
        title: 'Compact Card',
    },
    render: args => ({
        components: { Card },
        setup() {
            return { args }
        },
        template: '<Card v-bind="args">This card uses compact variant with reduced padding.</Card>',
    }),
}

export const SideCard: Story = {
    args: {
        variant: 'side',
        title: 'Side Card',
    },
    render: args => ({
        components: { Card },
        setup() {
            return { args }
        },
        template: '<Card v-bind="args">This card uses side layout variant.</Card>',
    }),
}

export const ComplexCard: Story = {
    render: args => ({
        components: { Card, Button },
        setup() {
            return { args }
        },
        template: `
      <Card v-bind="args" title="User Profile" variant="bordered" badge="Online" badgeVariant="success">
        <template #header>
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
              JD
            </div>
            <div>
              <h3 class="font-semibold">John Doe</h3>
              <p class="text-sm text-gray-500">Software Engineer</p>
            </div>
          </div>
        </template>
        
        <div class="space-y-3">
          <p class="text-gray-700">
            Passionate developer with 5+ years of experience in Vue.js and TypeScript.
            Love building design systems and user interfaces.
          </p>
          
          <div class="flex flex-wrap gap-2">
            <span class="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Vue.js</span>
            <span class="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">TypeScript</span>
            <span class="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">Nuxt</span>
          </div>
        </div>
        
        <template #footer>
          <div class="flex justify-between">
            <Button variant="outline" size="sm">View Profile</Button>
            <Button variant="primary" size="sm">Send Message</Button>
          </div>
        </template>
      </Card>
    `,
    }),
}

export const AllVariants: Story = {
    render: () => ({
        components: { Card },
        template: `
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card title="Normal" variant="normal">
          Normal card
        </Card>
        
        <Card title="Bordered" variant="bordered">
          Bordered card
        </Card>
        
        <Card title="Outline" variant="outline">
          Outline card
        </Card>
        
        <Card title="Glass" :glass="true">
          Glass card
        </Card>
      </div>
    `,
    }),
}

export const ShadowVariants: Story = {
    render: () => ({
        components: { Card },
        template: `
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card title="No Shadow" shadow="none">
          Card without shadow
        </Card>
        
        <Card title="Small Shadow" shadow="sm">
          Card with small shadow
        </Card>
        
        <Card title="Medium Shadow" shadow="md">
          Card with medium shadow
        </Card>
        
        <Card title="Large Shadow" shadow="lg">
          Card with large shadow
        </Card>
        
        <Card title="Extra Large Shadow" shadow="xl">
          Card with extra large shadow
        </Card>
        
        <Card title="2XL Shadow" shadow="2xl">
          Card with 2XL shadow
        </Card>
      </div>
    `,
    }),
}

export const WithAllSections: Story = {
    render: () => ({
        components: { Card, Button },
        template: `
      <Card title="Complete Card Example" subtitle="With all sections" variant="bordered" badge="Premium" badgeVariant="warning">
        <template #header>
          <div class="flex items-center justify-between w-full">
            <div>
              <h3 class="text-lg font-semibold">Complete Card</h3>
              <p class="text-sm text-gray-500">With header, body, actions, and footer</p>
            </div>
          </div>
        </template>
        
        <div class="space-y-3">
          <p class="text-gray-700">
            This card demonstrates all the different sections with proper padding and spacing.
            The header has top and side padding, the body has consistent spacing,
            and the footer has proper separation.
          </p>
          
          <div class="flex flex-wrap gap-2">
            <span class="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Header</span>
            <span class="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Body</span>
            <span class="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">Actions</span>
            <span class="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs">Footer</span>
          </div>
        </div>
        
        <template #actions>
          <Button variant="outline" size="sm">Share</Button>
          <Button variant="primary" size="sm">Learn More</Button>
        </template>
        
        <template #footer>
          <div class="flex justify-between items-center">
            <span class="text-sm text-gray-500">Last updated: 2 hours ago</span>
            <div class="flex gap-2">
              <Button variant="ghost" size="sm">Edit</Button>
              <Button variant="ghost" size="sm">Delete</Button>
            </div>
          </div>
        </template>
      </Card>
    `,
    }),
}

export const OutlineWithSections: Story = {
    args: {
        variant: 'outline',
    },
    render: args => ({
        components: { Card, Button },
        setup() {
            return { args }
        },
        template: `
      <Card v-bind="args" title="Outline Card" subtitle="With transparent background" badge="Outline" badgeVariant="secondary">
        <template #header>
          <div class="flex items-center justify-between w-full">
            <div>
              <h3 class="text-lg font-semibold">Outline Style</h3>
              <p class="text-sm text-gray-500">Transparent background with border</p>
            </div>
          </div>
        </template>
        
        <div class="space-y-3">
          <p class="text-gray-700">
            This outline variant has a transparent background with a prominent border.
            Perfect for cards that need to blend with the background while maintaining structure.
          </p>
          
          <div class="flex flex-wrap gap-2">
            <span class="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">Transparent</span>
            <span class="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">Bordered</span>
            <span class="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">Clean</span>
          </div>
        </div>
        
        <template #actions>
          <Button variant="outline" size="sm">Preview</Button>
          <Button variant="primary" size="sm">Apply</Button>
        </template>
        
        <template #footer>
          <div class="flex justify-between items-center">
            <span class="text-sm text-gray-500">Outline variant</span>
            <div class="flex gap-2">
              <Button variant="ghost" size="sm">Reset</Button>
              <Button variant="ghost" size="sm">Save</Button>
            </div>
          </div>
        </template>
      </Card>
    `,
    }),
}

export const WithBadge: Story = {
    args: {
        title: 'Card with Badge',
        badge: 'New',
        badgeVariant: 'primary',
    },
    render: args => ({
        components: { Card },
        setup() {
            return { args }
        },
        template:
      '<Card v-bind="args">This card has a badge positioned above the title for better visual hierarchy.</Card>',
    }),
}

export const BadgeWithHeaderActions: Story = {
    render: () => ({
        components: { Card, Button },
        template: `
      <div class="space-y-4">
        <Card title="Card with Badge and Actions" badge="Featured" badgeVariant="success">
          <template #headerActions>
            <Button variant="ghost" size="sm">Edit</Button>
            <Button variant="ghost" size="sm">Share</Button>
          </template>
          This card shows how badges work above the title with header actions on the right.
        </Card>
        
        <Card title="Multiple Badges" subtitle="With subtitle">
          <template #badge>
            <span class="badge badge-primary">New</span>
            <span class="badge badge-secondary">Updated</span>
          </template>
          <template #headerActions>
            <Button variant="outline" size="sm">View</Button>
          </template>
          This card demonstrates multiple badges above the title with subtitle.
        </Card>
        
        <Card title="Custom Badge Layout">
          <template #header>
            <div class="flex items-start justify-between w-full">
              <div class="flex flex-col gap-2">
                <div class="flex items-center gap-2">
                  <span class="badge badge-warning">Custom</span>
                  <span class="badge badge-info">Info</span>
                </div>
                <h3 class="text-lg font-semibold">Custom Layout</h3>
                <p class="text-sm text-gray-500">With badges above title</p>
              </div>
              <div class="flex items-center gap-2">
                <Button variant="ghost" size="sm">Settings</Button>
              </div>
            </div>
          </template>
          This card shows a completely custom header layout with badges above the title.
        </Card>
      </div>
    `,
    }),
}

export const CustomBadgePosition: Story = {
    render: () => ({
        components: { Card },
        template: `
      <div class="space-y-4">
        <Card title="Badge Above Title" badge="Featured" badgeVariant="success">
          This card has a badge positioned above the title for better visual hierarchy.
        </Card>
        
        <Card title="Custom Badge Slot" subtitle="With subtitle">
          <template #badge>
            <div class="flex gap-2">
              <span class="badge badge-primary">New</span>
              <span class="badge badge-secondary">Updated</span>
            </div>
          </template>
          This card uses a custom badge slot with multiple badges above the title.
        </Card>
        
        <Card title="No Badge" subtitle="Clean layout">
          This card has no badge to show the clean header layout without badges.
        </Card>
      </div>
    `,
    }),
}

export const AllCardVariants: Story = {
    render: () => ({
        components: { Card, Button },
        template: `
      <div class="space-y-8">
        <div class="text-center mb-6">
          <h2 class="text-2xl font-bold mb-2">All Card Variants</h2>
          <p class="text-gray-600">Compare different card styles and layouts</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Normal Variant -->
          <Card title="Normal Card" subtitle="Default variant" badge="Default" badgeVariant="primary">
            <p class="text-gray-700 mb-4">
              This is the standard card variant with default styling and medium shadow.
            </p>
            <template #actions>
              <Button variant="primary" size="sm">Action</Button>
            </template>
          </Card>

          <!-- Bordered Variant -->
          <Card title="Bordered Card" subtitle="With border" variant="bordered" badge="Bordered" badgeVariant="secondary">
            <p class="text-gray-700 mb-4">
              This variant has a visible border around the card for better definition.
            </p>
            <template #actions>
              <Button variant="outline" size="sm">Action</Button>
            </template>
          </Card>

          <!-- Outline Variant -->
          <Card title="Outline Card" subtitle="Transparent background" variant="outline" badge="Outline" badgeVariant="accent">
            <p class="text-gray-700 mb-4">
              This variant has a transparent background with a prominent border.
            </p>
            <template #actions>
              <Button variant="primary" size="sm">Action</Button>
            </template>
          </Card>

          <!-- Compact Variant -->
          <Card title="Compact Card" subtitle="Reduced padding" variant="compact" badge="Compact" badgeVariant="success">
            <p class="text-gray-700 mb-4">
              This variant uses reduced padding for a more condensed layout.
            </p>
            <template #actions>
              <Button variant="ghost" size="sm">Action</Button>
            </template>
          </Card>

          <!-- Glass Variant with Background -->
          <div class="bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-4 rounded-lg">
            <Card title="Glass Card" subtitle="Transparency effect" :glass="true" badge="Glass" badgeVariant="warning">
              <p class="text-gray-700 mb-4">
                This variant uses a glass effect with transparency and blur.
              </p>
              <template #actions>
                <Button variant="primary" size="sm">Action</Button>
              </template>
            </Card>
          </div>

          <!-- Side Variant -->
          <Card title="Side Card" subtitle="Horizontal layout" variant="side" badge="Side" badgeVariant="info">
            <template #image>
              <div class="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold">
                IMG
              </div>
            </template>
            <p class="text-gray-700 mb-4">
              This variant displays content in a horizontal layout with image on the side. The header stays above the text content.
            </p>
            <template #actions>
              <Button variant="outline" size="sm">Action</Button>
            </template>
          </Card>
        </div>
      </div>
    `,
    }),
}

export const SideVariant: Story = {
    render: () => ({
        components: { Card, Button },
        template: `
      <div class="space-y-6">
        <div class="text-center mb-6">
          <h2 class="text-xl font-bold mb-2">Side Variant Examples</h2>
          <p class="text-gray-600">Header stays above text content with image on the side</p>
        </div>
        
        <div class="space-y-4">
          <!-- Basic Side Card -->
          <Card title="Basic Side Card" subtitle="Simple layout" variant="side" badge="Basic" badgeVariant="primary">
            <template #image>
              <div class="w-24 h-24 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
                IMG
              </div>
            </template>
            <p class="text-gray-700">
              This is a basic side card where the header (title and subtitle) appears above the text content, 
              while the image is positioned to the left side of the card.
            </p>
            <template #actions>
              <Button variant="primary" size="sm">View Details</Button>
            </template>
          </Card>

          <!-- Side Card with Footer -->
          <Card title="Side Card with Footer" subtitle="Complete layout" variant="side" badge="Complete" badgeVariant="success">
            <template #image>
              <div class="w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold">
                IMG
              </div>
            </template>
            <p class="text-gray-700 mb-4">
              This side card demonstrates the complete layout with header, body content, actions, and footer.
              The header remains above the text content for better readability.
            </p>
            <template #actions>
              <Button variant="outline" size="sm">Edit</Button>
              <Button variant="primary" size="sm">Save</Button>
            </template>
            <template #footer>
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-500">Last updated: 2 hours ago</span>
                <span class="text-sm text-gray-500">Status: Active</span>
              </div>
            </template>
          </Card>

          <!-- Side Card with Custom Header -->
          <Card variant="side" badge="Custom" badgeVariant="warning">
            <template #image>
              <div class="w-24 h-24 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center text-white font-bold">
                IMG
              </div>
            </template>
            <template #header>
              <div class="flex items-center justify-between w-full">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    U
                  </div>
                  <div>
                    <h3 class="font-semibold">User Profile</h3>
                    <p class="text-sm text-gray-500">Custom header layout</p>
                  </div>
                </div>
                <span class="badge badge-info">Online</span>
              </div>
            </template>
            <p class="text-gray-700">
              This side card uses a custom header layout while maintaining the header-above-text structure.
              The image remains on the left side, and all content flows naturally.
            </p>
            <template #actions>
              <Button variant="ghost" size="sm">Message</Button>
              <Button variant="primary" size="sm">Follow</Button>
            </template>
          </Card>
        </div>
      </div>
    `,
    }),
}

export const GlassEffects: Story = {
    render: () => ({
        components: { Card, Button },
        template: `
      <div class="space-y-8">
        <div class="text-center mb-6">
          <h2 class="text-2xl font-bold mb-2">Glass Effect Examples</h2>
          <p class="text-gray-600">Glass cards need backgrounds to showcase transparency and blur effects</p>
        </div>
        
        <!-- Gradient Background -->
        <div class="bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-8 rounded-lg">
          <h3 class="text-white text-lg font-semibold mb-4">Gradient Background</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card title="Glass Card" subtitle="With gradient background" :glass="true" badge="Glass" badgeVariant="primary">
              <p class="text-gray-700 mb-4">
                This glass card shows transparency over a colorful gradient background.
              </p>
              <template #actions>
                <Button variant="primary" size="sm">Action</Button>
              </template>
            </Card>
            
            <Card title="Glass with Actions" subtitle="Complete layout" :glass="true" badge="Complete" badgeVariant="success">
              <p class="text-gray-700 mb-4">
                Glass effect works with all card sections including actions and footer.
              </p>
              <template #actions>
                <Button variant="outline" size="sm">Cancel</Button>
                <Button variant="primary" size="sm">Save</Button>
              </template>
              <template #footer>
                <span class="text-sm text-gray-500">Glass effect with footer</span>
              </template>
            </Card>
          </div>
        </div>

        <!-- Image Background -->
        <div class="relative bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-8 rounded-lg">
          <div class="absolute inset-0 bg-black/30 rounded-lg"></div>
          <div class="relative z-10">
            <h3 class="text-white text-lg font-semibold mb-4">Gradient Background</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card title="Glass over Gradient" subtitle="Transparent overlay" :glass="true" badge="Gradient" badgeVariant="warning">
                <p class="text-gray-700 mb-4">
                  Glass effect creates a beautiful overlay on gradient backgrounds.
                </p>
                <template #actions>
                  <Button variant="primary" size="sm">View</Button>
                </template>
              </Card>
              
              <Card title="Glass with Badge" subtitle="Custom styling" :glass="true" badge="Custom" badgeVariant="error">
                <p class="text-gray-700 mb-4">
                  Badges and other elements work perfectly with glass effects.
                </p>
                <template #actions>
                  <Button variant="ghost" size="sm">Details</Button>
                </template>
              </Card>
            </div>
          </div>
        </div>

        <!-- Pattern Background -->
        <div class="bg-pattern p-8 rounded-lg" style="background-image: radial-gradient(circle, #e5e7eb 1px, transparent 1px); background-size: 20px 20px;">
          <h3 class="text-gray-800 text-lg font-semibold mb-4">Pattern Background</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card title="Small Glass" subtitle="Compact layout" :glass="true" variant="compact" badge="Small" badgeVariant="info">
              <p class="text-gray-700">Compact glass card over pattern.</p>
            </Card>
            
            <Card title="Medium Glass" subtitle="Standard layout" :glass="true" badge="Medium" badgeVariant="primary">
              <p class="text-gray-700 mb-4">Standard glass card with pattern background.</p>
              <template #actions>
                <Button variant="outline" size="sm">Action</Button>
              </template>
            </Card>
            
            <Card title="Large Glass" subtitle="With footer" :glass="true" badge="Large" badgeVariant="success">
              <p class="text-gray-700 mb-4">Large glass card with complete layout.</p>
              <template #actions>
                <Button variant="primary" size="sm">Primary</Button>
              </template>
              <template #footer>
                <span class="text-sm text-gray-500">Footer content</span>
              </template>
            </Card>
          </div>
        </div>
      </div>
    `,
    }),
}

export const InteractiveCards: Story = {
    render: () => ({
        components: { Card, Button, Alert },
        setup() {
            const selectedCard = ref('card-1')
            const clickCount = ref(0)
            const lastClicked = ref('')
            const showAlert = ref(false)
            const alertMessage = ref('')
            const alertType = ref('info')

            const handleCardClick = (cardId: string) => {
                selectedCard.value = cardId
                clickCount.value++
                lastClicked.value = cardId
                console.log(`Card ${cardId} clicked! Total clicks: ${clickCount.value}`)
            }

            const handleAlertCardClick = () => {
                showAlert.value = true
                alertMessage.value = 'This is an alert triggered by clicking the card!'
                alertType.value = 'success'
                handleCardClick('alert-card')

                // Auto-hide alert after 3 seconds
                setTimeout(() => {
                    showAlert.value = false
                }, 3000)
            }

            const handleErrorCardClick = () => {
                showAlert.value = true
                alertMessage.value = 'Something went wrong! This is an error alert.'
                alertType.value = 'error'
                handleCardClick('error-card')

                // Auto-hide alert after 5 seconds
                setTimeout(() => {
                    showAlert.value = false
                }, 5000)
            }

            return {
                selectedCard,
                clickCount,
                lastClicked,
                showAlert,
                alertMessage,
                alertType,
                handleCardClick,
                handleAlertCardClick,
                handleErrorCardClick,
            }
        },
        template: `
      <div class="space-y-8">
        <div class="text-center mb-6">
          <h2 class="text-2xl font-bold mb-2">Interactive Cards</h2>
          <p class="text-gray-600">Cards with hover effects, click events, and different interactive states</p>
        </div>
        
        <!-- Alert Display -->
        <div v-if="showAlert" class="mb-4">
          <Alert :variant="alertType" :title="alertMessage" closable @close="showAlert = false" />
        </div>
        
        <!-- Interactive Stats -->
        <div class="bg-base-200 p-4 rounded-lg">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <div class="text-2xl font-bold text-primary">{{ clickCount }}</div>
              <div class="text-sm text-gray-600">Total Clicks</div>
            </div>
            <div>
              <div class="text-lg font-semibold">{{ selectedCard }}</div>
              <div class="text-sm text-gray-600">Selected Card</div>
            </div>
            <div>
              <div class="text-lg font-semibold">{{ lastClicked || 'None' }}</div>
              <div class="text-sm text-gray-600">Last Clicked</div>
            </div>
          </div>
        </div>
        
        <!-- Basic Interactive Cards -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Basic Interactive Cards</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card 
              title="Clickable Card" 
              subtitle="Hover and click me" 
              :interactive="true" 
              badge="Click" 
              badgeVariant="primary"
              @click="handleCardClick('card-1')"
            >
              <p class="text-gray-700 mb-4">
                This card is interactive and responds to hover and click events. 
                Try hovering over it and clicking!
              </p>
              <template #actions>
                <Button variant="primary" size="sm">Action</Button>
              </template>
            </Card>

            <Card 
              title="Alert Card" 
              subtitle="Click to show alert" 
              :interactive="true" 
              badge="Alert" 
              badgeVariant="success"
              @click="handleAlertCardClick"
            >
              <p class="text-gray-700 mb-4">
                Click this card to trigger a success alert! 
                The alert will appear at the top and auto-hide after 3 seconds.
              </p>
              <template #actions>
                <Button variant="success" size="sm">Show Alert</Button>
              </template>
            </Card>

            <Card 
              title="Error Alert Card" 
              subtitle="Click for error alert" 
              :interactive="true" 
              badge="Error" 
              badgeVariant="error"
              @click="handleErrorCardClick"
            >
              <p class="text-gray-700 mb-4">
                Click this card to trigger an error alert! 
                Error alerts stay visible longer (5 seconds).
              </p>
              <template #actions>
                <Button variant="error" size="sm">Show Error</Button>
              </template>
            </Card>
          </div>
        </div>

        <!-- Interactive with Different Variants -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Interactive with Different Variants</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card 
              title="Interactive Bordered" 
              subtitle="With border variant" 
              variant="bordered"
              :interactive="true" 
              badge="Bordered" 
              badgeVariant="secondary"
              @click="handleCardClick('card-3')"
            >
              <p class="text-gray-700 mb-4">
                Interactive card with bordered variant. 
                Hover effects work with borders too!
              </p>
              <template #actions>
                <Button variant="outline" size="sm">View</Button>
              </template>
            </Card>

            <Card 
              title="Interactive Outline" 
              subtitle="Transparent background" 
              variant="outline"
              :interactive="true" 
              badge="Outline" 
              badgeVariant="accent"
              @click="handleCardClick('card-4')"
            >
              <p class="text-gray-700 mb-4">
                Interactive outline card with transparent background. 
                Notice the hover border color change.
              </p>
              <template #actions>
                <Button variant="primary" size="sm">Select</Button>
              </template>
            </Card>

            <Card 
              title="Interactive Glass" 
              subtitle="Glass effect" 
              :glass="true"
              :interactive="true" 
              badge="Glass" 
              badgeVariant="warning"
              @click="handleCardClick('card-5')"
            >
              <p class="text-gray-700 mb-4">
                Interactive glass card. The glass effect works great with hover states.
              </p>
              <template #actions>
                <Button variant="primary" size="sm">Apply</Button>
              </template>
            </Card>
          </div>
        </div>

        <!-- Interactive with Custom Content -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Interactive with Custom Content</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card 
              :interactive="true" 
              badge="Custom" 
              badgeVariant="info"
              @click="handleCardClick('card-6')"
            >
              <template #header>
                <div class="flex items-center justify-between w-full">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                      U
                    </div>
                    <div>
                      <h3 class="font-semibold">User Profile</h3>
                      <p class="text-sm text-gray-500">Click to view details</p>
                    </div>
                  </div>
                  <span class="badge badge-success">Online</span>
                </div>
              </template>
              <p class="text-gray-700 mb-4">
                This card has custom header content and is fully interactive. 
                Try clicking anywhere on the card!
              </p>
              <template #actions>
                <Button variant="ghost" size="sm">Message</Button>
                <Button variant="primary" size="sm">View Profile</Button>
              </template>
              <template #footer>
                <div class="flex justify-between items-center">
                  <span class="text-sm text-gray-500">Last active: 5 min ago</span>
                  <span class="text-sm text-gray-500">Status: Available</span>
                </div>
              </template>
            </Card>

            <Card 
              title="Product Card" 
              subtitle="Interactive product display" 
              variant="bordered"
              :interactive="true" 
              :selected="selectedCard === 'card-7'"
              badge="Featured" 
              badgeVariant="warning"
              @click="handleCardClick('card-7')"
            >
              <div class="space-y-3">
                <div class="flex items-center gap-2">
                  <span class="text-2xl">⭐</span>
                  <span class="text-sm text-gray-600">4.8 (120 reviews)</span>
                </div>
                <p class="text-gray-700">
                  This is an interactive product card that can be selected. 
                  Perfect for e-commerce applications.
                </p>
                <div class="flex items-center justify-between">
                  <span class="text-lg font-bold text-primary">$99.99</span>
                  <span class="text-sm text-gray-500">In Stock</span>
                </div>
              </div>
              <template #actions>
                <Button variant="outline" size="sm">Add to Cart</Button>
                <Button variant="primary" size="sm">Buy Now</Button>
              </template>
            </Card>
          </div>
        </div>

        <!-- Keyboard Navigation Demo -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Keyboard Navigation</h3>
          <p class="text-gray-600 mb-4">Use Tab to navigate and Enter/Space to activate the cards</p>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card 
              title="Tab Navigation" 
              subtitle="Press Tab to focus" 
              :interactive="true" 
              badge="Tab 1" 
              badgeVariant="primary"
              @click="handleCardClick('keyboard-1')"
              @keydown="(e) => e.key === 'Enter' && handleCardClick('keyboard-1')"
            >
              <p class="text-gray-700">
                This card can be navigated with keyboard. 
                Tab to focus, Enter to activate.
              </p>
            </Card>

            <Card 
              title="Space Activation" 
              subtitle="Press Space to activate" 
              :interactive="true" 
              badge="Tab 2" 
              badgeVariant="secondary"
              @click="handleCardClick('keyboard-2')"
              @keydown="(e) => e.key === ' ' && handleCardClick('keyboard-2')"
            >
              <p class="text-gray-700">
                This card also supports keyboard navigation. 
                Space key works too!
              </p>
            </Card>

            <Card 
              title="Focus Ring" 
              subtitle="Visible focus indicator" 
              :interactive="true" 
              badge="Tab 3" 
              badgeVariant="accent"
              @click="handleCardClick('keyboard-3')"
              @keydown="(e) => e.key === 'Enter' && handleCardClick('keyboard-3')"
            >
              <p class="text-gray-700">
                Notice the focus ring when navigating with keyboard. 
                Great for accessibility!
              </p>
            </Card>
          </div>
        </div>
      </div>
    `,
    }),
}

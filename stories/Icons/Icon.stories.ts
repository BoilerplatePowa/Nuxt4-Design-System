import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Heart, Star, Settings, User, Home, Search, Mail, Phone, Calendar, Clock, MapPin, Download, Upload, Edit, Delete, Plus, Minus, Check, X, Menu, Info, HelpCircle, IceCream, Zap, CheckCircle, AlertCircle, XCircle } from 'lucide-vue-next'

const meta: Meta = {
    title: 'Icons/Lucide Icons',
    component: Heart,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Direct Lucide icon components with customizable size and color.',
            },
        },
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

// Default icon showcase
export const Default: Story = {
    render: () => ({
        components: { Heart },
        template: '<Heart class="w-6 h-6 text-primary" />',
    }),
}

// Sizes showcase
export const Sizes: Story = {
    render: () => ({
        components: { Heart },
        template: `
      <div class="space-y-3">
        <h3 class="text-lg font-semibold mb-2">Size Variants</h3>
        <div class="flex items-center gap-3">
          <Heart class="w-4 h-4" />
          <Heart class="w-5 h-5" />
          <Heart class="w-6 h-6" />
          <Heart class="w-8 h-8" />
          <Heart class="w-10 h-10" />
          <Heart class="w-12 h-12" />
        </div>
      </div>
    `,
    }),
}

// Colors showcase
export const Colors: Story = {
    render: () => ({
        components: { CheckCircle, AlertCircle, XCircle, Info, Heart, Star, Settings },
        template: `
      <div class="space-y-3">
        <h3 class="text-lg font-semibold mb-2">Color Variants</h3>
        <div class="flex items-center gap-3">
          <CheckCircle class="w-8 h-8 text-success" />
          <AlertCircle class="w-8 h-8 text-warning" />
          <XCircle class="w-8 h-8 text-error" />
          <Info class="w-8 h-8 text-info" />
          <Heart class="w-8 h-8 text-primary" />
          <Star class="w-8 h-8 text-secondary" />
          <Settings class="w-8 h-8 text-accent" />
        </div>
      </div>
    `,
    }),
}

// Icon collection
export const IconCollection: Story = {
    render: () => ({
        components: { Heart, Star, Settings, User, Home, Search, Mail, Phone, Calendar, Clock, MapPin, Download, Upload, Edit, Delete, Plus, Minus, Check, X, Menu, Info, HelpCircle, IceCream, Zap },
        template: `
      <div class="space-y-3">
        <h3 class="text-lg font-semibold mb-2">Common Icons</h3>
        <div class="grid grid-cols-8 gap-3 p-2">
          <Heart class="w-6 h-6" />
          <Star class="w-6 h-6" />
          <Settings class="w-6 h-6" />
          <User class="w-6 h-6" />
          <Home class="w-6 h-6" />
          <Search class="w-6 h-6" />
          <Mail class="w-6 h-6" />
          <Phone class="w-6 h-6" />
          <Calendar class="w-6 h-6" />
          <Clock class="w-6 h-6" />
          <MapPin class="w-6 h-6" />
          <Download class="w-6 h-6" />
          <Upload class="w-6 h-6" />
          <Edit class="w-6 h-6" />
          <Delete class="w-6 h-6" />
          <Plus class="w-6 h-6" />
          <Minus class="w-6 h-6" />
          <Check class="w-6 h-6" />
          <X class="w-6 h-6" />
          <Menu class="w-6 h-6" />
          <Info class="w-6 h-6" />
          <HelpCircle class="w-6 h-6" />
          <IceCream class="w-6 h-6" />
          <Zap class="w-6 h-6" />
        </div>
      </div>
    `,
    }),
}

// Interactive playground
export const Playground: Story = {
    render: () => ({
        components: { Heart, Star, Settings, User, Home, Search, Mail, Phone, Calendar, Clock, MapPin, Download, Upload, Edit, Delete, Plus, Minus, Check, X, Menu, Info, HelpCircle, IceCream, Zap, CheckCircle, AlertCircle, XCircle },
        template: `
      <div class="space-y-6">
        <div class="text-center">
          <Heart class="w-12 h-12 text-primary mx-auto mb-4" />
          <h3 class="text-lg font-semibold mb-2">Lucide Icons</h3>
          <p class="text-sm text-gray-600 mb-4">
            Direct Lucide icon components with Tailwind CSS classes
          </p>
        </div>
        
        <div class="grid grid-cols-4 gap-4">
          <div class="text-center p-4 border rounded-lg">
            <Heart class="w-8 h-8 text-error mx-auto mb-2" />
            <p class="text-sm">Heart</p>
          </div>
          <div class="text-center p-4 border rounded-lg">
            <Star class="w-8 h-8 text-warning mx-auto mb-2" />
            <p class="text-sm">Star</p>
          </div>
          <div class="text-center p-4 border rounded-lg">
            <Settings class="w-8 h-8 text-accent mx-auto mb-2" />
            <p class="text-sm">Settings</p>
          </div>
          <div class="text-center p-4 border rounded-lg">
            <User class="w-8 h-8 text-primary mx-auto mb-2" />
            <p class="text-sm">User</p>
          </div>
        </div>
        
        <div class="text-sm text-gray-600">
          <p>Usage example:</p>
          <code class="block bg-gray-100 p-2 rounded mt-2">
            &lt;Heart class="w-6 h-6 text-primary" /&gt;
          </code>
        </div>
      </div>
    `,
    }),
}
import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Footer from '../../src/runtime/components/Layout/Footer.vue'

const meta: Meta<typeof Footer> = {
    title: 'Layout/Footer',
    component: Footer,
    parameters: {
        layout: 'fullscreen',
    },
    argTypes: {
        variant: {
            control: { type: 'select' },
            options: ['default', 'center', 'grid'],
        },
        showBranding: {
            control: { type: 'boolean' },
        },
        showCopyright: {
            control: { type: 'boolean' },
        },
    },
}

export default meta
type Story = StoryObj<typeof meta>

const sampleLinks = [
    {
        title: 'Company',
        items: [
            { label: 'About Us', href: '/about' },
            { label: 'Careers', href: '/careers' },
            { label: 'Press', href: '/press' },
            { label: 'Blog', href: '/blog' },
        ],
    },
    {
        title: 'Support',
        items: [
            { label: 'Help Center', href: '/help' },
            { label: 'Contact Us', href: '/contact' },
            { label: 'Documentation', href: '/docs' },
            { label: 'API', href: '/api' },
        ],
    },
    {
        title: 'Legal',
        items: [
            { label: 'Privacy Policy', href: '/privacy' },
            { label: 'Terms of Service', href: '/terms' },
            { label: 'Cookie Policy', href: '/cookies' },
        ],
    },
]

const sampleSocial = [
    { name: 'Twitter', href: 'https://twitter.com/company', icon: '🐦' },
    { name: 'Facebook', href: 'https://facebook.com/company', icon: '📘' },
    { name: 'Instagram', href: 'https://instagram.com/company', icon: '📷' },
    { name: 'LinkedIn', href: 'https://linkedin.com/company', icon: '💼' },
]

export const Default: Story = {
    args: {
        brandName: 'Your Company',
        brandDescription: 'Building amazing products since 2020',
        links: sampleLinks,
        social: sampleSocial,
        copyrightText: '© 2024 Your Company. All rights reserved.',
    },
}

export const WithLogo: Story = {
    args: {
        logo: 'https://via.placeholder.com/120x40/6366f1/ffffff?text=LOGO',
        logoAlt: 'Company Logo',
        brandName: 'Your Company',
        brandDescription: 'Innovation at its finest',
        links: sampleLinks,
        social: sampleSocial,
        copyrightText: '© 2024 Your Company. All rights reserved.',
    },
}

export const Compact: Story = {
    args: {
        variant: 'grid',
        brandName: 'Your Company',
        links: [
            {
                title: '',
                items: [
                    { label: 'About', href: '/about' },
                    { label: 'Contact', href: '/contact' },
                    { label: 'Privacy', href: '/privacy' },
                    { label: 'Terms', href: '/terms' },
                ],
            },
        ],
        social: sampleSocial.slice(0, 3),
        copyrightText: '© 2024 Your Company',
    },
}

export const Center: Story = {
    args: {
        variant: 'center',
        brandName: 'Your Company',
        brandDescription: 'Centered footer layout',
        links: sampleLinks.slice(0, 2),
        social: sampleSocial,
        copyrightText: '© 2024 Your Company. All rights reserved.',
    },
}

export const MinimalBranding: Story = {
    args: {
        brandName: 'Minimal Co.',
        showBranding: true,
        links: [],
        copyrightText: '© 2024 Minimal Co.',
    },
}

export const SocialOnly: Story = {
    args: {
        showBranding: false,
        links: [],
        social: sampleSocial,
        copyrightText: '© 2024 Social Company',
    },
}

export const LinksOnly: Story = {
    args: {
        showBranding: false,
        links: sampleLinks,
        copyrightText: '© 2024 Links Company',
    },
}

export const CustomContent: Story = {
    render: () => ({
        components: { Footer },
        template: `
      <Footer>
        <div class="flex flex-col md:flex-row justify-between items-center gap-6">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <span class="text-primary-content font-bold text-xl">C</span>
            </div>
            <div>
              <h3 class="font-bold text-lg">Custom Footer</h3>
              <p class="text-sm opacity-70">Completely customizable content</p>
            </div>
          </div>
          
          <div class="flex flex-col md:flex-row gap-6 text-center md:text-left">
            <div>
              <h4 class="font-semibold mb-2">Quick Links</h4>
              <div class="flex flex-col gap-1">
                <a href="#" class="link link-hover">Home</a>
                <a href="#" class="link link-hover">About</a>
                <a href="#" class="link link-hover">Contact</a>
              </div>
            </div>
            
            <div>
              <h4 class="font-semibold mb-2">Connect</h4>
              <div class="flex gap-3 justify-center md:justify-start">
                <button class="btn btn-ghost btn-sm btn-circle">
                  <span class="text-lg">📧</span>
                </button>
                <button class="btn btn-ghost btn-sm btn-circle">
                  <span class="text-lg">📱</span>
                </button>
                <button class="btn btn-ghost btn-sm btn-circle">
                  <span class="text-lg">🌐</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div class="divider"></div>
        
        <div class="text-center text-sm opacity-70">
          <p>© 2024 Custom Footer. Made with ❤️ using our component library.</p>
        </div>
      </Footer>
    `,
    }),
}

export const Newsletter: Story = {
    render: () => ({
        components: { Footer },
        template: `
      <Footer 
        brand-name="Newsletter Co."
        brand-description="Stay updated with our latest news"
        copyright-text="© 2024 Newsletter Co."
      >
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="lg:col-span-2">
            <h3 class="font-bold text-lg mb-4">Newsletter Co.</h3>
            <p class="text-sm opacity-70 mb-4">
              Subscribe to our newsletter and stay updated with the latest news, 
              product updates, and exclusive offers.
            </p>
            
            <div class="flex gap-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                class="input input-bordered flex-1"
              />
              <button class="btn btn-primary">Subscribe</button>
            </div>
          </div>
          
          <div>
            <h4 class="font-semibold mb-3">Company</h4>
            <div class="flex flex-col gap-1">
              <a href="#" class="link link-hover">About</a>
              <a href="#" class="link link-hover">Careers</a>
              <a href="#" class="link link-hover">Press</a>
            </div>
          </div>
          
          <div>
            <h4 class="font-semibold mb-3">Support</h4>
            <div class="flex flex-col gap-1">
              <a href="#" class="link link-hover">Help Center</a>
              <a href="#" class="link link-hover">Contact</a>
              <a href="#" class="link link-hover">FAQ</a>
            </div>
          </div>
        </div>
      </Footer>
    `,
    }),
}

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PhoneMockup from '../../../src/runtime/components/Mockup/PhoneMockup.vue'

describe('PhoneMockup', () => {
    it('renders correctly with default props', () => {
        const wrapper = mount(PhoneMockup, {
            slots: {
                default: 'Phone content',
            },
        })

        expect(wrapper.classes()).toContain('mockup-phone')
        expect(wrapper.text()).toContain('Phone content')
    })

    it('renders camera element with correct class', () => {
        const wrapper = mount(PhoneMockup, {
            slots: {
                default: 'Phone content',
            },
        })

        expect(wrapper.find('.mockup-phone-camera').exists()).toBe(true)
    })

    it('renders display area with correct class', () => {
        const wrapper = mount(PhoneMockup, {
            slots: {
                default: 'Display content',
            },
        })

        expect(wrapper.find('.mockup-phone-display').exists()).toBe(true)
    })

    it('applies border color correctly', () => {
        const wrapper = mount(PhoneMockup, {
            props: {
                borderColor: '#ff8938',
            },
            slots: {
                default: 'Content',
            },
        })

        expect(wrapper.classes()).toContain('border-[#ff8938]')
    })

    it('applies display class correctly', () => {
        const wrapper = mount(PhoneMockup, {
            props: {
                displayClass: 'grid place-content-center',
            },
            slots: {
                default: 'Content',
            },
        })

        const display = wrapper.find('.mockup-phone-display')
        expect(display.classes()).toContain('grid')
        expect(display.classes()).toContain('place-content-center')
    })

    it('applies background color correctly', () => {
        const wrapper = mount(PhoneMockup, {
            props: {
                backgroundColor: 'neutral-900',
            },
            slots: {
                default: 'Content',
            },
        })

        const display = wrapper.find('.mockup-phone-display')
        expect(display.classes()).toContain('bg-neutral-900')
    })

    it('applies text color correctly', () => {
        const wrapper = mount(PhoneMockup, {
            props: {
                textColor: 'white',
            },
            slots: {
                default: 'Content',
            },
        })

        const display = wrapper.find('.mockup-phone-display')
        expect(display.classes()).toContain('text-white')
    })

    it('renders slot content in display area', () => {
        const wrapper = mount(PhoneMockup, {
            slots: {
                default: '<div class="app-content">Mobile App Interface</div>',
            },
        })

        expect(wrapper.find('.app-content').exists()).toBe(true)
        expect(wrapper.text()).toContain('Mobile App Interface')
    })

    it('combines multiple props correctly', () => {
        const wrapper = mount(PhoneMockup, {
            props: {
                borderColor: '#3b82f6',
                backgroundColor: 'blue-50',
                textColor: 'blue-900',
                displayClass: 'flex items-center justify-center',
            },
            slots: {
                default: 'Custom styled phone',
            },
        })

        expect(wrapper.classes()).toContain('border-[#3b82f6]')

        const display = wrapper.find('.mockup-phone-display')
        expect(display.classes()).toContain('bg-blue-50')
        expect(display.classes()).toContain('text-blue-900')
        expect(display.classes()).toContain('flex')
        expect(display.classes()).toContain('items-center')
        expect(display.classes()).toContain('justify-center')
    })

    it('renders complex content correctly', () => {
        const wrapper = mount(PhoneMockup, {
            slots: {
                default: `
          <div class="phone-app">
            <header class="app-header">Header</header>
            <main class="app-main">Main Content</main>
            <footer class="app-footer">Footer</footer>
          </div>
        `,
            },
        })

        expect(wrapper.find('.phone-app').exists()).toBe(true)
        expect(wrapper.find('.app-header').exists()).toBe(true)
        expect(wrapper.find('.app-main').exists()).toBe(true)
        expect(wrapper.find('.app-footer').exists()).toBe(true)
        expect(wrapper.text()).toContain('Header')
        expect(wrapper.text()).toContain('Main Content')
        expect(wrapper.text()).toContain('Footer')
    })

    it('handles empty content gracefully', () => {
        const wrapper = mount(PhoneMockup)

        expect(wrapper.classes()).toContain('mockup-phone')
        expect(wrapper.find('.mockup-phone-display').exists()).toBe(true)
        expect(wrapper.find('.mockup-phone-camera').exists()).toBe(true)
    })

    it('maintains proper DaisyUI structure', () => {
        const wrapper = mount(PhoneMockup, {
            slots: {
                default: 'Test content',
            },
        })

        // Should have proper DaisyUI mockup structure
        expect(wrapper.find('.mockup-phone').exists()).toBe(true)
        expect(wrapper.find('.mockup-phone-camera').exists()).toBe(true)
        expect(wrapper.find('.mockup-phone-display').exists()).toBe(true)

        // Content should be inside the display
        const display = wrapper.find('.mockup-phone-display')
        expect(display.text()).toContain('Test content')
    })

    it('works with image content', () => {
        const wrapper = mount(PhoneMockup, {
            slots: {
                default: '<img alt="wallpaper" src="https://example.com/image.jpg" />',
            },
        })

        const img = wrapper.find('img')
        expect(img.exists()).toBe(true)
        expect(img.attributes('alt')).toBe('wallpaper')
        expect(img.attributes('src')).toBe('https://example.com/image.jpg')
    })
})

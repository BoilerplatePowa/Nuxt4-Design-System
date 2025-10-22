import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BrowserMockup from '../../../src/runtime/components/Mockup/BrowserMockup.vue'

describe('BrowserMockup', () => {
    it('renders with default props', () => {
        const wrapper = mount(BrowserMockup, {
            slots: {
                default: '<div>Test content</div>',
            },
        })

        expect(wrapper.find('.mockup-browser').exists()).toBe(true)
        expect(wrapper.find('.mockup-browser-toolbar').exists()).toBe(true)
        expect(wrapper.find('.input').text()).toBe('https://daisyui.com')
        expect(wrapper.text()).toContain('Test content')
    })

    it('applies correct classes for default variant', () => {
        const wrapper = mount(BrowserMockup)

        expect(wrapper.classes()).toContain('mockup-browser')
        expect(wrapper.classes()).toContain('w-full')
        expect(wrapper.classes()).toContain('max-w-lg')
    })

    it('applies correct classes for border variant', () => {
        const wrapper = mount(BrowserMockup, {
            props: { variant: 'border' },
        })

        expect(wrapper.classes()).toContain('mockup-browser')
        expect(wrapper.classes()).toContain('border-base-300')
        expect(wrapper.classes()).toContain('border')
        expect(wrapper.classes()).toContain('w-full')
    })

    it('applies correct classes for background variant', () => {
        const wrapper = mount(BrowserMockup, {
            props: { variant: 'background' },
        })

        expect(wrapper.classes()).toContain('mockup-browser')
        expect(wrapper.classes()).toContain('border')
        expect(wrapper.classes()).toContain('border-base-300')
        expect(wrapper.classes()).toContain('w-full')
    })

    it('applies correct size classes', () => {
        const sizes = [
            { size: 'sm', expectedClass: 'max-w-sm' },
            { size: 'md', expectedClass: 'max-w-lg' },
            { size: 'lg', expectedClass: 'max-w-2xl' },
            { size: 'xl', expectedClass: 'max-w-4xl' },
        ]

        sizes.forEach(({ size, expectedClass }) => {
            const wrapper = mount(BrowserMockup, {
                props: { size },
            })
            expect(wrapper.classes()).toContain(expectedClass)
        })
    })

    it('hides toolbar when showToolbar is false', () => {
        const wrapper = mount(BrowserMockup, {
            props: { showToolbar: false },
        })

        expect(wrapper.find('.mockup-browser-toolbar').exists()).toBe(false)
    })

    it('shows toolbar when showToolbar is true', () => {
        const wrapper = mount(BrowserMockup, {
            props: { showToolbar: true },
        })

        expect(wrapper.find('.mockup-browser-toolbar').exists()).toBe(true)
    })

    it('displays custom URL', () => {
        const customUrl = 'https://example.com'
        const wrapper = mount(BrowserMockup, {
            props: { url: customUrl },
        })

        expect(wrapper.find('.input').text()).toBe(customUrl)
    })

    it('applies custom class', () => {
        const customClass = 'custom-browser-class'
        const wrapper = mount(BrowserMockup, {
            props: { class: customClass },
        })

        expect(wrapper.classes()).toContain(customClass)
    })

    it('applies custom content class', () => {
        const customContentClass = 'custom-content-class'
        const wrapper = mount(BrowserMockup, {
            props: { contentClass: customContentClass },
        })

        // Find the content div (the one that's not the toolbar)
        const contentDiv = wrapper.find('.mockup-browser > div:not(.mockup-browser-toolbar)')
        expect(contentDiv.classes()).toContain(customContentClass)
    })

    it('renders slot content', () => {
        const slotContent = '<div class="test-slot">Slot content</div>'
        const wrapper = mount(BrowserMockup, {
            slots: {
                default: slotContent,
            },
        })

        expect(wrapper.html()).toContain(slotContent)
    })

    it('applies correct content classes for border variant', () => {
        const wrapper = mount(BrowserMockup, {
            props: { variant: 'border' },
        })

        const contentDiv = wrapper.find('.mockup-browser > div:not(.mockup-browser-toolbar)')
        expect(contentDiv.classes()).toContain('border-t')
        expect(contentDiv.classes()).toContain('border-base-300')
        expect(contentDiv.classes()).toContain('grid')
        expect(contentDiv.classes()).toContain('place-content-center')
    })

    it('applies correct height classes for different sizes', () => {
        const sizeHeights = [
            { size: 'sm', expectedClass: 'h-48' },
            { size: 'md', expectedClass: 'h-80' },
            { size: 'lg', expectedClass: 'h-96' },
            { size: 'xl', expectedClass: 'h-[32rem]' },
        ]

        sizeHeights.forEach(({ size, expectedClass }) => {
            const wrapper = mount(BrowserMockup, {
                props: { size },
            })
            const contentDiv = wrapper.find('.mockup-browser > div:not(.mockup-browser-toolbar)')
            expect(contentDiv.classes()).toContain(expectedClass)
        })
    })
})

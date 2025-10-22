import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import WindowMockup from '../../../src/runtime/components/Mockup/WindowMockup.vue'

describe('WindowMockup', () => {
    describe('DaisyUI Integration', () => {
        it('applies correct DaisyUI base classes', () => {
            const wrapper = mount(WindowMockup)

            expect(wrapper.classes()).toContain('mockup-window')
        })

        it('applies border classes when isBordered is true', () => {
            const wrapper = mount(WindowMockup, {
                props: { isBordered: true }
            })

            expect(wrapper.classes()).toContain('mockup-window')
            expect(wrapper.classes()).toContain('border')
            expect(wrapper.classes()).toContain('border-base-300')
        })

        it('applies background classes when hasBackground is true', () => {
            const wrapper = mount(WindowMockup, {
                props: { hasBackground: true }
            })

            expect(wrapper.classes()).toContain('mockup-window')
            expect(wrapper.classes()).toContain('bg-base-100')
            expect(wrapper.classes()).toContain('border')
            expect(wrapper.classes()).toContain('border-base-300')
        })

        it('applies custom classes when provided', () => {
            const wrapper = mount(WindowMockup, {
                props: { class: 'w-full max-w-md' }
            })

            expect(wrapper.classes()).toContain('mockup-window')
            expect(wrapper.classes()).toContain('w-full')
            expect(wrapper.classes()).toContain('max-w-md')
        })
    })

    describe('rendering', () => {
        it('renders slot content', () => {
            const wrapper = mount(WindowMockup, {
                slots: { default: 'Hello World!' }
            })

            expect(wrapper.text()).toBe('Hello World!')
        })

        it('renders complex slot content', () => {
            const wrapper = mount(WindowMockup, {
                slots: {
                    default: '<div class="p-4">Complex content</div>'
                }
            })

            expect(wrapper.find('.p-4').exists()).toBe(true)
            expect(wrapper.text()).toBe('Complex content')
        })
    })

    describe('props', () => {
        it('has correct default props', () => {
            const wrapper = mount(WindowMockup)

            expect(wrapper.props('isBordered')).toBe(false)
            expect(wrapper.props('hasBackground')).toBe(false)
        })

        it('accepts isBordered prop', () => {
            const wrapper = mount(WindowMockup, {
                props: { isBordered: true }
            })

            expect(wrapper.props('isBordered')).toBe(true)
        })

        it('accepts hasBackground prop', () => {
            const wrapper = mount(WindowMockup, {
                props: { hasBackground: true }
            })

            expect(wrapper.props('hasBackground')).toBe(true)
        })

        it('accepts class prop', () => {
            const wrapper = mount(WindowMockup, {
                props: { class: 'custom-class' }
            })

            expect(wrapper.props('class')).toBe('custom-class')
        })
    })

    describe('accessibility', () => {
        it('renders as a div element', () => {
            const wrapper = mount(WindowMockup)

            expect(wrapper.element.tagName).toBe('DIV')
        })

        it('maintains semantic structure', () => {
            const wrapper = mount(WindowMockup, {
                slots: {
                    default: '<main>Main content</main>'
                }
            })

            expect(wrapper.find('main').exists()).toBe(true)
        })
    })
})

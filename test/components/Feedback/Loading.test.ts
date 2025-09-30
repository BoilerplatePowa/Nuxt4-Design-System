import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Loading from '../../../src/runtime/components/Feedback/Loading.vue'

describe('Loading', () => {
    it('renders correctly with default props', () => {
        const wrapper = mount(Loading)

        expect(wrapper.classes()).toContain('loading')
        expect(wrapper.classes()).toContain('loading-spinner')
        expect(wrapper.attributes('role')).toBe('status')
        expect(wrapper.attributes('aria-label')).toBe('Loading')
    })

    it('applies variant classes correctly', () => {
        const variants = ['spinner', 'dots', 'ring', 'ball', 'bars', 'infinity'] as const

        variants.forEach((variant) => {
            const wrapper = mount(Loading, {
                props: { variant },
            })

            expect(wrapper.classes()).toContain(`loading-${variant}`)
        })
    })

    it('applies size classes correctly', () => {
        const sizes = ['xs', 'sm', 'lg'] as const

        sizes.forEach((size) => {
            const wrapper = mount(Loading, {
                props: { size },
            })

            expect(wrapper.classes()).toContain(`loading-${size}`)
        })

        // Test that medium (default) doesn't add a class
        const mediumWrapper = mount(Loading, {
            props: { size: 'md' },
        })
        expect(mediumWrapper.classes()).not.toContain('loading-md')
    })

    it('displays text when provided', () => {
        const wrapper = mount(Loading, {
            props: { text: 'Loading data...' },
        })

        expect(wrapper.text()).toContain('Loading data...')
        expect(wrapper.find('.loading-text').exists()).toBe(true)
    })

    it('uses custom aria label', () => {
        const wrapper = mount(Loading, {
            props: { ariaLabel: 'Custom loading message' },
        })

        expect(wrapper.attributes('aria-label')).toBe('Custom loading message')
    })

    it('renders slot content', () => {
        const wrapper = mount(Loading, {
            slots: {
                default: '<span class="custom-content">Custom loading content</span>',
            },
        })

        expect(wrapper.find('.custom-content').exists()).toBe(true)
        expect(wrapper.text()).toContain('Custom loading content')
    })
})

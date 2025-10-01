import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Badge from '../../../src/runtime/components/DataDisplay/Badge.vue'

describe('Badge', () => {
    it('renders correctly with default props', () => {
        const wrapper = mount(Badge, {
            slots: {
                default: 'New',
            },
        })

        expect(wrapper.classes()).toContain('badge')
        expect(wrapper.text()).toBe('New')
        expect(wrapper.element.tagName).toBe('SPAN')
    })

    it('applies variant classes correctly', () => {
        const variants = [
            'neutral',
            'primary',
            'secondary',
            'accent',
            'ghost',
            'info',
            'success',
            'warning',
            'error',
        ] as const

        variants.forEach((variant) => {
            const wrapper = mount(Badge, {
                props: { variant },
                slots: { default: 'Badge' },
            })

            expect(wrapper.classes()).toContain(`badge-${variant}`)
        })
    })

    it('applies size classes correctly', () => {
        const sizes = ['xs', 'sm', 'md', 'lg'] as const

        sizes.forEach((size) => {
            const wrapper = mount(Badge, {
                props: { size },
                slots: { default: 'Badge' },
            })

            if (size !== 'md') {
                expect(wrapper.classes()).toContain(`badge-${size}`)
            }
        })
    })

    it('applies outline style when outline prop is true', () => {
        const wrapper = mount(Badge, {
            props: {
                variant: 'primary',
                outline: true,
            },
            slots: {
                default: 'Outline',
            },
        })

        expect(wrapper.classes()).toContain('badge-outline')
    })

    it('renders as different HTML elements based on tag prop', () => {
        const spanWrapper = mount(Badge, {
            props: { tag: 'span' },
            slots: { default: 'Span Badge' },
        })

        const divWrapper = mount(Badge, {
            props: { tag: 'div' },
            slots: { default: 'Div Badge' },
        })

        const pWrapper = mount(Badge, {
            props: { tag: 'p' },
            slots: { default: 'P Badge' },
        })

        const labelWrapper = mount(Badge, {
            props: { tag: 'label' },
            slots: { default: 'Label Badge' },
        })

        expect(spanWrapper.element.tagName).toBe('SPAN')
        expect(divWrapper.element.tagName).toBe('DIV')
        expect(pWrapper.element.tagName).toBe('P')
        expect(labelWrapper.element.tagName).toBe('LABEL')
    })

    it('renders slot content correctly', () => {
        const wrapper = mount(Badge, {
            slots: {
                default: '<span class="custom-content">🔥 Hot</span>',
            },
        })

        expect(wrapper.find('.custom-content').exists()).toBe(true)
        expect(wrapper.text()).toBe('🔥 Hot')
    })

    it('combines multiple props correctly', () => {
        const wrapper = mount(Badge, {
            props: {
                variant: 'success',
                size: 'lg',
                outline: true,
                tag: 'div',
            },
            slots: {
                default: 'Large Success',
            },
        })

        expect(wrapper.classes()).toContain('badge')
        expect(wrapper.classes()).toContain('badge-success')
        expect(wrapper.classes()).toContain('badge-lg')
        expect(wrapper.classes()).toContain('badge-outline')
        expect(wrapper.element.tagName).toBe('DIV')
    })

    it('handles empty content gracefully', () => {
        const wrapper = mount(Badge)

        expect(wrapper.classes()).toContain('badge')
        expect(wrapper.text()).toBe('')
    })

    it('applies custom classes when provided', () => {
        const wrapper = mount(Badge, {
            props: {
                class: 'custom-badge-class',
            },
            slots: {
                default: 'Custom',
            },
        })

        expect(wrapper.classes()).toContain('badge')
        expect(wrapper.classes()).toContain('custom-badge-class')
    })

    it('defaults to span tag when no tag is provided', () => {
        const wrapper = mount(Badge, {
            slots: { default: 'Default' },
        })

        expect(wrapper.element.tagName).toBe('SPAN')
    })

    it('defaults to neutral variant when no variant is provided', () => {
        const wrapper = mount(Badge, {
            slots: { default: 'Default' },
        })

        expect(wrapper.classes()).toContain('badge-neutral')
    })

    it('defaults to md size when no size is provided', () => {
        const wrapper = mount(Badge, {
            slots: { default: 'Default' },
        })

        // md size doesn't add a specific class, so we just check it doesn't have other size classes
        expect(wrapper.classes()).not.toContain('badge-xs')
        expect(wrapper.classes()).not.toContain('badge-sm')
        expect(wrapper.classes()).not.toContain('badge-lg')
    })
})

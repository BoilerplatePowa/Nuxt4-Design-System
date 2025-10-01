import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Alert from '../../../src/runtime/components/Feedback/Alert.vue'

describe('Alert', () => {
    it('renders correctly with default props', () => {
        const wrapper = mount(Alert, {
            props: {
                message: 'Test alert message',
            },
        })

        expect(wrapper.classes()).toContain('alert')
        expect(wrapper.text()).toContain('Test alert message')
    })

    it('applies variant classes correctly', () => {
        const variants = ['info', 'success', 'warning', 'error'] as const

        variants.forEach((variant) => {
            const wrapper = mount(Alert, {
                props: {
                    variant: variant,
                    message: 'Test message',
                },
            })

            expect(wrapper.classes()).toContain(`alert-${variant}`)
        })
    })

    it('renders title when provided', () => {
        const wrapper = mount(Alert, {
            props: {
                title: 'Alert Title',
                message: 'Alert message',
            },
        })

        expect(wrapper.text()).toContain('Alert Title')
        expect(wrapper.find('.alert-title').exists()).toBe(true)
    })

    it('renders without title when not provided', () => {
        const wrapper = mount(Alert, {
            props: {
                message: 'Alert message',
            },
        })

        expect(wrapper.find('.alert-title').exists()).toBe(false)
    })

    it('shows dismiss button when dismissible', () => {
        const wrapper = mount(Alert, {
            props: {
                message: 'Dismissible alert',
                dismissible: true,
            },
        })

        expect(wrapper.find('button[aria-label="close"]').exists()).toBe(true)
    })

    it('does not show dismiss button when not dismissible', () => {
        const wrapper = mount(Alert, {
            props: {
                message: 'Non-dismissible alert',
                dismissible: false,
            },
        })

        expect(wrapper.find('button[aria-label="close"]').exists()).toBe(false)
    })

    it('emits dismiss event when dismiss button is clicked', async () => {
        const wrapper = mount(Alert, {
            props: {
                message: 'Test alert',
                dismissible: true,
            },
        })

        const dismissButton = wrapper.find('button[aria-label="close"]')
        await dismissButton.trigger('click')

        expect(wrapper.emitted('dismiss')).toBeTruthy()
    })

    it('renders custom icon when provided', () => {
        const wrapper = mount(Alert, {
            props: {
                message: 'Alert with icon',
                icon: '🔥',
            },
        })

        expect(wrapper.text()).toContain('🔥')
    })

    it('renders default icon based on variant', () => {
        const wrapper = mount(Alert, {
            props: {
                variant: 'success',
                message: 'Success alert',
            },
        })

        // Should render default success icon
        expect(wrapper.find('.alert-icon').exists()).toBe(true)
    })

    it('renders slot content when provided', () => {
        const wrapper = mount(Alert, {
            props: {
                message: 'Base message',
            },
            slots: {
                default: '<span class="custom-content">Custom alert content</span>',
            },
        })

        expect(wrapper.find('.custom-content').exists()).toBe(true)
        expect(wrapper.text()).toContain('Custom alert content')
    })

    it('combines title, message and custom content', () => {
        const wrapper = mount(Alert, {
            props: {
                title: 'Important Notice',
                message: 'Base message',
            },
            slots: {
                default: '<p>Additional details here</p>',
            },
        })

        expect(wrapper.text()).toContain('Important Notice')
        expect(wrapper.text()).toContain('Base message')
        expect(wrapper.text()).toContain('Additional details here')
    })

    it('sets correct ARIA attributes', () => {
        const wrapper = mount(Alert, {
            props: {
                variant: 'error',
                message: 'Error alert',
            },
        })

        expect(wrapper.attributes('role')).toBe('alert')
        expect(wrapper.attributes('aria-live')).toBe('assertive')
    })

    it('handles empty message gracefully', () => {
        const wrapper = mount(Alert, {
            props: {
                message: '',
            },
        })

        expect(wrapper.classes()).toContain('alert')
        expect(wrapper.text()).toBe('')
    })

    it('applies custom classes when provided', () => {
        const wrapper = mount(Alert, {
            props: {
                message: 'Custom alert',
                class: 'custom-alert-class',
            },
        })

        expect(wrapper.classes()).toContain('alert')
        expect(wrapper.classes()).toContain('custom-alert-class')
    })
})

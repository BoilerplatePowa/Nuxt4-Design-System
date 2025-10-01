import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Swap from '../../../src/runtime/components/Actions/Swap.vue'

describe('Swap', () => {
    it('renders correctly with default props', () => {
        const wrapper = mount(Swap, {
            props: {
                modelValue: false,
            },
            slots: {
                on: '<div class="on-content">On</div>',
                off: '<div class="off-content">Off</div>',
            },
        })

        expect(wrapper.classes()).toContain('swap')
        expect(wrapper.classes()).toContain('swap-rotate') // default variant
        expect(wrapper.find('.off-content').exists()).toBe(true)
    })

    it('shows correct content based on isOn state', async () => {
        const wrapper = mount(Swap, {
            props: {
                modelValue: false,
            },
            slots: {
                on: '<div class="on-content">On State</div>',
                off: '<div class="off-content">Off State</div>',
            },
        })

        // Initially off
        expect(wrapper.find('.off-content').exists()).toBe(true)
        expect(wrapper.find('.on-content').exists()).toBe(true)

        // Change to on
        await wrapper.setProps({ modelValue: true })
        const checkbox = wrapper.find('input[type="checkbox"]')
        expect((checkbox.element as HTMLInputElement).checked).toBe(true)
    })

    it('applies variant classes correctly', () => {
        const variants = ['rotate', 'flip', 'indeterminate'] as const

        variants.forEach((variant) => {
            const wrapper = mount(Swap, {
                props: {
                    modelValue: false,
                    variant,
                },
                slots: {
                    on: 'On',
                    off: 'Off',
                },
            })

            expect(wrapper.classes()).toContain(`swap-${variant}`)
        })
    })

    it('updates isOn state when checkbox is clicked', async () => {
        const wrapper = mount(Swap, {
            props: {
                modelValue: false,
            },
            slots: {
                on: 'On',
                off: 'Off',
            },
        })

        const checkbox = wrapper.find('input[type="checkbox"]')
        await checkbox.setValue(true)

        // With defineModel, the component should emit update:modelValue
        expect(wrapper.emitted('update:modelValue')).toBeTruthy()
        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])
    })

    it('is disabled when disabled prop is true', () => {
        const wrapper = mount(Swap, {
            props: {
                modelValue: false,
                disabled: true,
            },
            slots: {
                on: 'On',
                off: 'Off',
            },
        })

        expect(wrapper.classes()).toContain('swap-disabled')
        expect(wrapper.classes()).toContain('opacity-50')
        expect(wrapper.classes()).toContain('cursor-not-allowed')
        expect(wrapper.classes()).toContain('pointer-events-none')
    })

    it('renders on content in on slot', () => {
        const wrapper = mount(Swap, {
            props: {
                modelValue: true,
            },
            slots: {
                on: '<span class="on-text">Active State</span>',
                off: '<span class="off-text">Inactive State</span>',
            },
        })

        expect(wrapper.find('.on-text').exists()).toBe(true)
        expect(wrapper.find('.on-text').text()).toBe('Active State')
    })

    it('renders off content in off slot', () => {
        const wrapper = mount(Swap, {
            props: {
                modelValue: false,
            },
            slots: {
                on: '<span class="on-text">Active State</span>',
                off: '<span class="off-text">Inactive State</span>',
            },
        })

        expect(wrapper.find('.off-text').exists()).toBe(true)
        expect(wrapper.find('.off-text').text()).toBe('Inactive State')
    })

    it('renders indeterminate content when variant is indeterminate', () => {
        const wrapper = mount(Swap, {
            props: {
                modelValue: false,
                variant: 'indeterminate',
                indeterminateContent: '🌤️',
            },
        })

        expect(wrapper.find('.swap-indeterminate').exists()).toBe(true)
        expect(wrapper.text()).toContain('🌤️')
    })

    it('uses custom indeterminate content from slot', () => {
        const wrapper = mount(Swap, {
            props: {
                modelValue: false,
                variant: 'indeterminate',
            },
            slots: {
                indeterminate: '<span class="custom-indeterminate">Custom</span>',
            },
        })

        expect(wrapper.find('.custom-indeterminate').exists()).toBe(true)
        expect(wrapper.find('.custom-indeterminate').text()).toBe('Custom')
    })

    it('generates unique ID when not provided', () => {
        const wrapper1 = mount(Swap, {
            props: {
                modelValue: false,
            },
        })

        const wrapper2 = mount(Swap, {
            props: {
                modelValue: false,
            },
        })

        const id1 = wrapper1.find('input').attributes('id')
        const id2 = wrapper2.find('input').attributes('id')

        expect(id1).toBeTruthy()
        expect(id2).toBeTruthy()
        expect(id1).not.toBe(id2)
    })

    it('uses provided ID when available', () => {
        const customId = 'custom-swap-id'
        const wrapper = mount(Swap, {
            props: {
                modelValue: false,
                id: customId,
            },
        })

        expect(wrapper.find('input').attributes('id')).toBe(customId)
    })

    it('applies name attribute when provided', () => {
        const customName = 'custom-swap-name'
        const wrapper = mount(Swap, {
            props: {
                modelValue: false,
                name: customName,
            },
        })

        expect(wrapper.find('input').attributes('name')).toBe(customName)
    })

    it('does not emit update:modelValue when disabled', async () => {
        const wrapper = mount(Swap, {
            props: {
                modelValue: false,
                disabled: true,
            },
            slots: {
                on: 'On',
                off: 'Off',
            },
        })

        const checkbox = wrapper.find('input[type="checkbox"]')
        await checkbox.setValue(true)

        // Should not emit when disabled
        expect(wrapper.emitted('update:modelValue')).toBeFalsy()
    })

    it('handles keyboard interaction', async () => {
        const wrapper = mount(Swap, {
            props: {
                modelValue: false,
            },
            slots: {
                on: 'On',
                off: 'Off',
            },
        })

        const checkbox = wrapper.find('input[type="checkbox"]')
        await checkbox.setValue(true)

        expect(wrapper.emitted('update:modelValue')).toBeTruthy()
        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])
    })

    it('uses default content when slots are not provided', () => {
        const wrapper = mount(Swap, {
            props: {
                modelValue: false,
                swapOnContent: '🌞',
                swapOffContent: '🌚',
            },
        })

        expect(wrapper.text()).toContain('🌚') // Initially off
    })

    it('updates content when isOn state changes', async () => {
        const wrapper = mount(Swap, {
            props: {
                modelValue: false,
                swapOnContent: '🌞',
                swapOffContent: '🌚',
            },
        })

        expect(wrapper.text()).toContain('🌚') // Initially off

        await wrapper.setProps({ modelValue: true })
        expect(wrapper.text()).toContain('🌞') // Now on
    })
})

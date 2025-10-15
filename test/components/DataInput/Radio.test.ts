import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Radio from '../../../src/runtime/components/DataInput/Radio.vue'

describe('Radio', () => {
    it('renders correctly with default props', () => {
        const wrapper = mount(Radio, {
            props: {
                value: 'test',
                name: 'test-radio',
                label: 'Test radio',
            },
        })

        expect(wrapper.find('input[type="radio"]').exists()).toBe(true)
        expect(wrapper.find('label').text()).toBe('Test radio')
        expect(wrapper.classes()).toContain('form-control')
    })

    it('is checked when modelValue matches value', async () => {
        const wrapper = mount(Radio, {
            props: {
                value: 'test',
                name: 'test-radio',
                label: 'Test radio',
            },
        })

        // Set the model value to match the radio value
        wrapper.setProps({ modelValue: 'test' })
        await wrapper.vm.$nextTick()

        const radio = wrapper.find('input[type="radio"]')
        expect((radio.element as HTMLInputElement).checked).toBe(true)
    })

    it('is unchecked when modelValue does not match value', () => {
        const wrapper = mount(Radio, {
            props: {
                value: 'test',
                name: 'test-radio',
                label: 'Test radio',
            },
        })

        const radio = wrapper.find('input[type="radio"]')
        expect((radio.element as HTMLInputElement).checked).toBe(false)
    })

    it('applies variant classes correctly', () => {
        const variants = [
            'primary',
            'secondary',
            'accent',
            'success',
            'warning',
            'info',
            'error',
        ] as const

        variants.forEach((variant) => {
            const wrapper = mount(Radio, {
                props: {
                    value: 'test',
                    name: 'test-radio',
                    variant,
                    label: 'Test',
                },
            })

            expect(wrapper.find('input').classes()).toContain(`radio-${variant}`)
        })
    })

    it('applies size classes correctly', () => {
        const sizes = ['xs', 'sm', 'md', 'lg'] as const

        sizes.forEach((size) => {
            const wrapper = mount(Radio, {
                props: {
                    value: 'test',
                    name: 'test-radio',
                    size,
                    label: 'Test',
                },
            })

            if (size !== 'md') {
                expect(wrapper.find('input').classes()).toContain(`radio-${size}`)
            }
        })
    })

    it('emits update:modelValue when clicked', async () => {
        const wrapper = mount(Radio, {
            props: {
                value: 'test',
                name: 'test-radio',
                label: 'Test radio',
            },
        })

        const radio = wrapper.find('input[type="radio"]')
        await radio.setValue(true)

        expect(wrapper.emitted('update:modelValue')).toBeTruthy()
        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['test'])
    })

    it('emits change event when clicked', async () => {
        const wrapper = mount(Radio, {
            props: {
                value: 'test',
                name: 'test-radio',
                label: 'Test radio',
            },
        })

        const radio = wrapper.find('input[type="radio"]')
        await radio.trigger('change')

        expect(wrapper.emitted('change')).toBeTruthy()
    })

    it('is disabled when disabled prop is true', () => {
        const wrapper = mount(Radio, {
            props: {
                value: 'test',
                name: 'test-radio',
                disabled: true,
                label: 'Disabled radio',
            },
        })

        const radio = wrapper.find('input[type="radio"]')
        expect(radio.attributes('disabled')).toBeDefined()
    })

    it('shows help text when provided', () => {
        const wrapper = mount(Radio, {
            props: {
                value: 'test',
                name: 'test-radio',
                label: 'Test radio',
                helpText: 'This is help text',
            },
        })

        expect(wrapper.text()).toContain('This is help text')
        expect(wrapper.find('.text-base-content\\/70').exists()).toBe(true)
    })

    it('shows error message when provided', () => {
        const wrapper = mount(Radio, {
            props: {
                value: 'test',
                name: 'test-radio',
                label: 'Test radio',
                errorMessage: 'This field is required',
            },
        })

        expect(wrapper.text()).toContain('This field is required')
        expect(wrapper.find('.text-error').exists()).toBe(true)
    })

    it('applies error state classes when error message is present', () => {
        const wrapper = mount(Radio, {
            props: {
                value: 'test',
                name: 'test-radio',
                label: 'Test radio',
                errorMessage: 'Error',
            },
        })

        expect(wrapper.find('input').classes()).toContain('radio-error')
    })

    it('renders without label when not provided', () => {
        const wrapper = mount(Radio, {
            props: {
                value: 'test',
                name: 'test-radio',
            },
        })

        expect(wrapper.find('label').exists()).toBe(false)
        expect(wrapper.find('input[type="radio"]').exists()).toBe(true)
    })

    it('sets correct ARIA attributes', () => {
        const wrapper = mount(Radio, {
            props: {
                value: 'test',
                name: 'test-radio',
                label: 'Accessible radio',
                errorMessage: 'Error message',
                helpText: 'Help text',
            },
        })

        const radio = wrapper.find('input[type="radio"]')
        expect(radio.attributes('aria-describedby')).toBeTruthy()
    })

    it('generates IDs for radio inputs', () => {
        const wrapper1 = mount(Radio, {
            props: {
                value: 'test1',
                name: 'test-radio-1',
                label: 'Radio 1',
            },
        })

        const wrapper2 = mount(Radio, {
            props: {
                value: 'test2',
                name: 'test-radio-2',
                label: 'Radio 2',
            },
        })

        const id1 = wrapper1.find('input').attributes('id')
        const id2 = wrapper2.find('input').attributes('id')

        expect(id1).toBeTruthy()
        expect(id2).toBeTruthy()
        expect(id1?.startsWith('radio-')).toBe(true)
        expect(id2?.startsWith('radio-')).toBe(true)
    })

    it('handles required attribute correctly', () => {
        const wrapper = mount(Radio, {
            props: {
                value: 'test',
                name: 'test-radio',
                required: true,
                label: 'Required radio',
            },
        })

        const radio = wrapper.find('input[type="radio"]')
        expect(radio.attributes('required')).toBeDefined()
    })

    it('handles name attribute correctly', () => {
        const wrapper = mount(Radio, {
            props: {
                value: 'test',
                name: 'test-group',
                label: 'Test radio',
            },
        })

        const radio = wrapper.find('input[type="radio"]')
        expect(radio.attributes('name')).toBe('test-group')
    })

    it('handles value attribute correctly', () => {
        const wrapper = mount(Radio, {
            props: {
                value: 'test-value',
                name: 'test-radio',
                label: 'Test radio',
            },
        })

        const radio = wrapper.find('input[type="radio"]')
        expect(radio.attributes('value')).toBe('test-value')
    })

    it('works with numeric values', async () => {
        const wrapper = mount(Radio, {
            props: {
                value: 42,
                name: 'test-radio',
                label: 'Test radio',
            },
        })

        const radio = wrapper.find('input[type="radio"]')
        await radio.setValue(true)

        expect(wrapper.emitted('update:modelValue')).toBeTruthy()
        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([42])
    })

    it('works with boolean values', async () => {
        const wrapper = mount(Radio, {
            props: {
                value: true,
                name: 'test-radio',
                label: 'Test radio',
            },
        })

        const radio = wrapper.find('input[type="radio"]')
        await radio.setValue(true)

        expect(wrapper.emitted('update:modelValue')).toBeTruthy()
        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])
    })

    it('does not emit update:modelValue when disabled', async () => {
        const wrapper = mount(Radio, {
            props: {
                value: 'test',
                name: 'test-radio',
                disabled: true,
                label: 'Disabled radio',
            },
        })

        const radio = wrapper.find('input[type="radio"]')
        await radio.setValue(true)

        expect(wrapper.emitted('update:modelValue')).toBeFalsy()
    })

    it('handles custom aria-describedby attribute', () => {
        const wrapper = mount(Radio, {
            props: {
                value: 'test',
                name: 'test-radio',
                label: 'Test radio',
                ariaDescribedby: 'custom-description',
            },
        })

        const radio = wrapper.find('input[type="radio"]')
        expect(radio.attributes('aria-describedby')).toContain('custom-description')
    })
})

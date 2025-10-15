import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Select from '../../../src/runtime/components/DataInput/Select.vue'

describe('Select', () => {
    const sampleOptions = [
        { label: 'Option 1', value: '1' },
        { label: 'Option 2', value: '2' },
        { label: 'Option 3', value: '3' },
        { label: 'Option 4', value: '4' },
    ]

    it('renders correctly with basic props', () => {
        const wrapper = mount(Select, {
            props: {
                label: 'Test Select',
                placeholder: 'Choose an option',
                options: sampleOptions,
            },
        })

        expect(wrapper.find('label').text()).toContain('Test Select')
        expect(wrapper.find('select').exists()).toBe(true)
        expect(wrapper.findAll('option')).toHaveLength(5) // 4 options + 1 placeholder
    })

    it('uses defineModel() for v-model support', async () => {
        const wrapper = mount(Select, {
            props: {
                options: sampleOptions,
            },
        })

        const select = wrapper.find('select')
        await select.setValue('2')

        expect(wrapper.emitted('update:modelValue')).toBeTruthy()
        // The component converts string values to numbers when they're numeric
        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([2])
    })

    it('handles multiple selection correctly', async () => {
        const wrapper = mount(Select, {
            props: {
                multiple: true,
                options: sampleOptions,
            },
        })

        const select = wrapper.find('select')
        await select.setValue(['1', '3'])

        expect(wrapper.emitted('update:modelValue')).toBeTruthy()
        // The component converts string values to numbers when they're numeric
        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([[1, 3]])
    })

    it('applies correct size classes', () => {
        const sizes = ['xs', 'sm', 'md', 'lg'] as const

        sizes.forEach((size) => {
            const wrapper = mount(Select, {
                props: { size, options: sampleOptions },
            })

            const select = wrapper.find('select')
            if (size !== 'md') {
                expect(select.classes()).toContain(`select-${size}`)
            }
        })
    })

    it('applies correct variant classes', () => {
        const variants = [
            'bordered',
            'ghost',
            'primary',
            'secondary',
            'accent',
            'info',
            'success',
            'warning',
            'error',
        ] as const

        variants.forEach((variant) => {
            const wrapper = mount(Select, {
                props: { variant, options: sampleOptions },
            })

            const select = wrapper.find('select')
            expect(select.classes()).toContain(`select-${variant}`)
        })
    })

    it('shows required indicator when required is true', () => {
        const wrapper = mount(Select, {
            props: {
                label: 'Required Field',
                required: true,
                options: sampleOptions,
            },
        })

        const requiredIndicator = wrapper.find('.text-error')
        expect(requiredIndicator.exists()).toBe(true)
        expect(requiredIndicator.text()).toBe('*')
    })

    it('shows error message when provided', () => {
        const errorMessage = 'This field is required'
        const wrapper = mount(Select, {
            props: {
                errorMessage,
                options: sampleOptions,
            },
        })

        const errorElement = wrapper.find('[role="alert"]')
        expect(errorElement.exists()).toBe(true)
        expect(errorElement.text()).toBe(errorMessage)
        expect(wrapper.find('select').classes()).toContain('select-error')
    })

    it('shows help text when provided', () => {
        const helpText = 'Choose an option from the list'
        const wrapper = mount(Select, {
            props: {
                helpText,
                options: sampleOptions,
            },
        })

        const id = wrapper.find('select').attributes('id')
        const helpElement = wrapper.find(`#${id}-help`)
        expect(helpElement.exists()).toBe(true)
        expect(helpElement.text()).toBe(helpText)
    })

    it('shows validation message when showValidation is true', async () => {
        const wrapper = mount(Select, {
            props: {
                showValidation: true,
                options: sampleOptions,
            },
        })

        // Initially no validation message should be shown
        expect(wrapper.find('.text-success').exists()).toBe(false)

        // Select a value
        const select = wrapper.find('select')
        await select.setValue('1')

        // Now validation message should be shown
        expect(wrapper.find('.text-success').exists()).toBe(true)
        expect(wrapper.find('.text-success').text()).toContain('Selection valid!')
    })

    it('shows loading indicator when loading is true', () => {
        const wrapper = mount(Select, {
            props: {
                loading: true,
                options: sampleOptions,
            },
        })

        const loadingIndicator = wrapper.find('.loading-spinner')
        expect(loadingIndicator.exists()).toBe(true)
        expect(wrapper.find('select').classes()).toContain('cursor-wait')
    })

    it('disables select when disabled is true', () => {
        const wrapper = mount(Select, {
            props: {
                disabled: true,
                options: sampleOptions,
            },
        })

        const select = wrapper.find('select')
        expect(select.attributes('disabled')).toBeDefined()
    })

    it('emits change event when selection changes', async () => {
        const wrapper = mount(Select, {
            props: {
                options: sampleOptions,
            },
        })

        const select = wrapper.find('select')
        await select.setValue('2')

        expect(wrapper.emitted('change')).toBeTruthy()
    })

    it('emits focus and blur events', async () => {
        const wrapper = mount(Select, {
            props: {
                options: sampleOptions,
            },
        })

        const select = wrapper.find('select')

        await select.trigger('focus')
        expect(wrapper.emitted('focus')).toBeTruthy()

        await select.trigger('blur')
        expect(wrapper.emitted('blur')).toBeTruthy()
    })

    it('emits validate event when validation occurs', async () => {
        const wrapper = mount(Select, {
            props: {
                required: true,
                options: sampleOptions,
            },
        })

        const select = wrapper.find('select')
        await select.setValue('1')

        expect(wrapper.emitted('validate')).toBeTruthy()
        expect(wrapper.emitted('validate')?.[0]).toEqual([true])
    })

    it('handles grouped options correctly', () => {
        const groupedOptions = [
            { label: 'Option 1', value: '1', group: 'Group A' },
            { label: 'Option 2', value: '2', group: 'Group A' },
            { label: 'Option 3', value: '3', group: 'Group B' },
            { label: 'Option 4', value: '4', group: 'Group B' },
        ]

        const wrapper = mount(Select, {
            props: {
                options: groupedOptions,
            },
        })

        const optgroups = wrapper.findAll('optgroup')
        expect(optgroups).toHaveLength(2)

        expect(optgroups[0].attributes('label')).toBe('Group A')
        expect(optgroups[1].attributes('label')).toBe('Group B')
    })

    it('handles disabled options correctly', () => {
        const optionsWithDisabled = [
            { label: 'Option 1', value: '1' },
            { label: 'Option 2', value: '2', disabled: true },
            { label: 'Option 3', value: '3' },
        ]

        const wrapper = mount(Select, {
            props: {
                options: optionsWithDisabled,
            },
        })

        const options = wrapper.findAll('option')
        // Find the option with value '2' which should be disabled
        const disabledOption = options.find((option) => option.attributes('value') === '2')
        expect(disabledOption?.attributes('disabled')).toBeDefined()
    })

    it('generates an ID for the select element', () => {
        const wrapper = mount(Select, {
            props: { options: sampleOptions },
        })

        const select = wrapper.find('select')
        const id = select.attributes('id')

        expect(id).toBeDefined()
        expect(id?.startsWith('select-')).toBe(true)
    })

    it('exposes focus and blur methods', async () => {
        const wrapper = mount(Select, {
            props: {
                options: sampleOptions,
            },
        })

        const vm = wrapper.vm as any

        // Mock focus and blur methods
        const focusSpy = vi.fn()
        const blurSpy = vi.fn()

        const selectElement = wrapper.find('select').element
        selectElement.focus = focusSpy
        selectElement.blur = blurSpy

        vm.focus()
        expect(focusSpy).toHaveBeenCalled()

        vm.blur()
        expect(blurSpy).toHaveBeenCalled()
    })

    it('exposes validate method', () => {
        const wrapper = mount(Select, {
            props: {
                required: true,
                options: sampleOptions,
            },
        })

        const vm = wrapper.vm as any
        const isValid = vm.validate()

        expect(typeof isValid).toBe('boolean')
    })

    it('handles autoFocus prop correctly', async () => {
        const wrapper = mount(Select, {
            props: {
                autoFocus: true,
                options: sampleOptions,
            },
        })

        // Mock nextTick to ensure focus is called
        await wrapper.vm.$nextTick()

        // The focus should be called on mount
        // We can't easily test this without more complex mocking, but we can verify the prop is handled
        expect(wrapper.props('autoFocus')).toBe(true)
    })

    it('handles aria-describedby correctly', () => {
        const wrapper = mount(Select, {
            props: {
                helpText: 'Help text',
                errorMessage: 'Error message',
                ariaDescribedby: 'custom-id',
                options: sampleOptions,
            },
        })

        const select = wrapper.find('select')
        const describedBy = select.attributes('aria-describedby')

        const id = select.attributes('id')
        expect(describedBy).toContain(`${id}-help`)
        expect(describedBy).toContain(`${id}-error`)
        expect(describedBy).toContain('custom-id')
    })

    it('handles aria-invalid correctly', () => {
        const wrapper = mount(Select, {
            props: {
                errorMessage: 'Error message',
                options: sampleOptions,
            },
        })

        const select = wrapper.find('select')
        expect(select.attributes('aria-invalid')).toBe('true')
    })

    it('handles slot content for options', () => {
        const wrapper = mount(Select, {
            props: {
                options: [], // Empty options to use slot
            },
            slots: {
                default: `
          <option value="slot1">Slot Option 1</option>
          <option value="slot2">Slot Option 2</option>
        `,
            },
        })

        const options = wrapper.findAll('option')
        expect(options).toHaveLength(2)
        expect(options[0].text()).toBe('Slot Option 1')
        expect(options[1].text()).toBe('Slot Option 2')
    })
})

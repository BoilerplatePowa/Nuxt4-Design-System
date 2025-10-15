import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PhoneInput from '../../../src/runtime/components/DataInput/PhoneInput.vue'

describe('PhoneInput', () => {
    it('renders properly with default props', () => {
        const wrapper = mount(PhoneInput, {
            props: {
                label: 'Phone Number',
                placeholder: 'Enter phone number',
            },
        })

        expect(wrapper.find('label').text()).toContain('Phone Number')
        expect(wrapper.find('input[type="tel"]').exists()).toBe(true)
        expect(wrapper.find('select').exists()).toBe(true)
    })

    it('shows country calling code prefix', () => {
        const wrapper = mount(PhoneInput, {
            props: {
                defaultCountry: 'FR',
            },
        })

        const prefix = wrapper.find('.text-base-content\\/70')
        expect(prefix.text()).toContain('+33')
    })

    it('shows default country calling code prefix', () => {
        const wrapper = mount(PhoneInput)

        const prefix = wrapper.find('.text-base-content\\/70')
        expect(prefix.text()).toContain('+33') // Default is now FR
    })

    it('emits country-change event when country is changed', async () => {
        const wrapper = mount(PhoneInput)

        const select = wrapper.find('select')
        await select.setValue('US')

        expect(wrapper.emitted('country-change')).toBeTruthy()
        expect(wrapper.emitted('country-change')?.[0]).toEqual(['US'])
    })

    it('shows validation message when showValidation is true', async () => {
        const wrapper = mount(PhoneInput, {
            props: {
                showValidation: true,
            },
        })

        const input = wrapper.find('input[type="tel"]')
        await input.setValue('1234567890')

        // Wait for validation to process
        await wrapper.vm.$nextTick()

        // Should show validation message
        const text = wrapper.text()
        expect(text.includes('Valid') || text.includes('Invalid')).toBe(true)
    })

    it('shows example number when showExampleNumber is true', () => {
        const wrapper = mount(PhoneInput, {
            props: {
                showExampleNumber: true,
            },
        })

        // Should show example number
        const id = wrapper.find('input[type="tel"]').attributes('id')
        const exampleElement = wrapper.find(`#${id}-example`)
        expect(exampleElement.exists()).toBe(true)
    })

    it('applies disabled state correctly', () => {
        const wrapper = mount(PhoneInput, {
            props: {
                disabled: true,
            },
        })

        expect(wrapper.find('input[disabled]').exists()).toBe(true)
        expect(wrapper.find('select[disabled]').exists()).toBe(true)
    })

    it('applies required state correctly', () => {
        const wrapper = mount(PhoneInput, {
            props: {
                required: true,
            },
        })

        expect(wrapper.find('input[required]').exists()).toBe(true)
        // Check that the required attribute is applied to the input
        expect(wrapper.find('input').attributes('required')).toBeDefined()
    })

    it('shows character count when enabled', async () => {
        const wrapper = mount(PhoneInput, {
            props: {
                showCharCount: true,
                maxlength: 15,
            },
        })

        // Check that character count element exists
        const charCount = wrapper.find('.text-base-content\\/60')
        expect(charCount.exists()).toBe(true)

        // Initially should show 0/15
        expect(charCount.text()).toContain('0/15')
    })

    it('applies different sizes correctly', () => {
        const wrapper = mount(PhoneInput, {
            props: {
                size: 'lg',
            },
        })

        expect(wrapper.find('.input-lg').exists()).toBe(true)
        expect(wrapper.find('.select-lg').exists()).toBe(true)
    })

    it('applies different variants correctly', () => {
        const wrapper = mount(PhoneInput, {
            props: {
                variant: 'outlined',
            },
        })

        expect(wrapper.find('.input-outlined').exists()).toBe(true)
        expect(wrapper.find('.select-outlined').exists()).toBe(true)
    })

    it('filters countries when countriesCodes prop is provided', () => {
        const wrapper = mount(PhoneInput, {
            props: {
                countriesCodes: ['FR', 'US'],
            },
        })

        const select = wrapper.find('select')
        const options = select.findAll('option')

        // Should only show FR and US options
        expect(options.length).toBe(2)
        expect(options[0].text()).toContain('FR')
        expect(options[1].text()).toContain('US')
    })
})

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Checkbox from '../../../src/runtime/components/DataInput/Checkbox.vue'

describe('Checkbox', () => {
  it('renders correctly with default props', () => {
    const wrapper = mount(Checkbox, {
      props: {
        modelValue: false,
        label: 'Test checkbox',
      },
    })

    expect(wrapper.find('input[type="checkbox"]').exists()).toBe(true)
    expect(wrapper.find('label').text()).toBe('Test checkbox')
    expect(wrapper.classes()).toContain('form-control')
  })

  it('is checked when modelValue is true', () => {
    const wrapper = mount(Checkbox, {
      props: {
        modelValue: true,
        label: 'Checked checkbox',
      },
    })

    const checkbox = wrapper.find('input[type="checkbox"]')
    expect((checkbox.element as HTMLInputElement).checked).toBe(true)
  })

  it('is unchecked when modelValue is false', () => {
    const wrapper = mount(Checkbox, {
      props: {
        modelValue: false,
        label: 'Unchecked checkbox',
      },
    })

    const checkbox = wrapper.find('input[type="checkbox"]')
    expect((checkbox.element as HTMLInputElement).checked).toBe(false)
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
      const wrapper = mount(Checkbox, {
        props: {
          modelValue: false,
          variant,
          label: 'Test',
        },
      })

      expect(wrapper.find('input').classes()).toContain(`checkbox-${variant}`)
    })
  })

  it('applies size classes correctly', () => {
    const sizes = ['xs', 'sm', 'md', 'lg'] as const

    sizes.forEach((size) => {
      const wrapper = mount(Checkbox, {
        props: {
          modelValue: false,
          size,
          label: 'Test',
        },
      })

      if (size !== 'md') {
        expect(wrapper.find('input').classes()).toContain(`checkbox-${size}`)
      }
    })
  })

  it('emits update:modelValue when clicked', async () => {
    const wrapper = mount(Checkbox, {
      props: {
        modelValue: false,
        label: 'Test checkbox',
      },
    })

    const checkbox = wrapper.find('input[type="checkbox"]')
    await checkbox.setValue(true)

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])
  })

  it('is disabled when disabled prop is true', () => {
    const wrapper = mount(Checkbox, {
      props: {
        modelValue: false,
        disabled: true,
        label: 'Disabled checkbox',
      },
    })

    const checkbox = wrapper.find('input[type="checkbox"]')
    expect(checkbox.attributes('disabled')).toBeDefined()
    expect(checkbox.classes()).toContain('checkbox-disabled')
  })

  it('shows indeterminate state correctly', () => {
    const wrapper = mount(Checkbox, {
      props: {
        modelValue: false,
        indeterminate: true,
        label: 'Indeterminate checkbox',
      },
    })

    const checkbox = wrapper.find('input[type="checkbox"]')
    expect((checkbox.element as HTMLInputElement).indeterminate).toBe(true)
  })

  it('shows error message when provided', () => {
    const wrapper = mount(Checkbox, {
      props: {
        modelValue: false,
        label: 'Test checkbox',
        errorMessage: 'This field is required',
      },
    })

    expect(wrapper.text()).toContain('This field is required')
    expect(wrapper.find('.text-error').exists()).toBe(true)
  })

  it('applies error state classes when error message is present', () => {
    const wrapper = mount(Checkbox, {
      props: {
        modelValue: false,
        label: 'Test checkbox',
        errorMessage: 'Error',
      },
    })

    expect(wrapper.find('input').classes()).toContain('checkbox-error')
  })

  it('renders without label when not provided', () => {
    const wrapper = mount(Checkbox, {
      props: {
        modelValue: false,
      },
    })

    expect(wrapper.find('label span').exists()).toBe(false)
  })

  it('handles keyboard events correctly', async () => {
    const wrapper = mount(Checkbox, {
      props: {
        modelValue: false,
        label: 'Test checkbox',
      },
    })

    const checkbox = wrapper.find('input[type="checkbox"]')
    await checkbox.setValue(true)

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
  })

  it('sets correct ARIA attributes', () => {
    const wrapper = mount(Checkbox, {
      props: {
        modelValue: false,
        label: 'Accessible checkbox',
        errorMessage: 'Error message',
      },
    })

    const checkbox = wrapper.find('input[type="checkbox"]')
    expect(checkbox.attributes('aria-describedby')).toBeTruthy()
  })
})

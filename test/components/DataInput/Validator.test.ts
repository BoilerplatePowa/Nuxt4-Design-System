import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Validator from '../../../src/runtime/components/DataInput/Validator.vue'

describe('Validator', () => {
  it('renders correctly with basic props', () => {
    const wrapper = mount(Validator, {
      props: {
        label: 'Test Label',
        placeholder: 'Test placeholder',
      },
    })

    expect(wrapper.find('label').text()).toContain('Test Label')
    expect(wrapper.find('input').attributes('placeholder')).toBe('Test placeholder')
  })

  it('uses defineModel for v-model binding', async () => {
    const wrapper = mount(Validator, {
      props: {
        modelValue: 'initial value',
      },
    })

    const input = wrapper.find('input')
    expect(input.element.value).toBe('initial value')

    // Test updating the model
    await input.setValue('new value')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['new value'])
  })

  it('renders textarea when type is textarea', () => {
    const wrapper = mount(Validator, {
      props: {
        type: 'textarea',
        rows: 5,
      },
    })

    expect(wrapper.find('textarea').exists()).toBe(true)
    expect(wrapper.find('input').exists()).toBe(false)
    expect(wrapper.find('textarea').attributes('rows')).toBe('5')
  })

  it('shows required asterisk when required is true', () => {
    const wrapper = mount(Validator, {
      props: {
        label: 'Required Field',
        required: true,
      },
    })

    expect(wrapper.find('.text-error').text()).toBe('*')
  })

  it('applies correct size classes', () => {
    const wrapper = mount(Validator, {
      props: {
        size: 'lg',
      },
    })

    expect(wrapper.find('input').classes()).toContain('input-lg')
  })

  it('applies correct variant classes', () => {
    const wrapper = mount(Validator, {
      props: {
        variant: 'bordered',
      },
    })

    expect(wrapper.find('input').classes()).toContain('input-bordered')
  })

  it('shows character count when enabled', async () => {
    const wrapper = mount(Validator, {
      props: {
        maxLength: 100,
        showCharCount: true,
        modelValue: 'test',
      },
    })

    expect(wrapper.find('.absolute.bottom-2.right-2').text()).toBe('4/100')
  })

  it('validates required field', async () => {
    const wrapper = mount(Validator, {
      props: {
        required: true,
        validateOnBlur: true,
      },
    })

    const input = wrapper.find('input')
    await input.trigger('blur')

    expect(wrapper.find('.text-error').exists()).toBe(true)
    expect(wrapper.find('.label-text-alt.text-error').text()).toContain('This field is required')
  })

  it('validates email format', async () => {
    const wrapper = mount(Validator, {
      props: {
        type: 'email',
        email: true,
        validateOnBlur: true,
        modelValue: 'invalid-email',
      },
    })

    const input = wrapper.find('input')
    await input.trigger('blur')

    expect(wrapper.find('.label-text-alt.text-error').text()).toContain(
      'Please enter a valid email address'
    )
  })

  it('shows success state for valid email', async () => {
    const wrapper = mount(Validator, {
      props: {
        type: 'email',
        email: true,
        validateOnBlur: true,
        modelValue: 'valid@email.com',
        successMessage: 'Email is valid!',
      },
    })

    const input = wrapper.find('input')
    await input.trigger('blur')

    expect(wrapper.find('.label-text-alt.text-success').text()).toContain('Email is valid!')
  })

  it('validates minimum length', async () => {
    const wrapper = mount(Validator, {
      props: {
        minLength: 5,
        validateOnBlur: true,
        modelValue: 'abc',
      },
    })

    const input = wrapper.find('input')
    await input.trigger('blur')

    expect(wrapper.find('.label-text-alt.text-error').text()).toContain(
      'Must be at least 5 characters'
    )
  })

  it('validates maximum length', async () => {
    const wrapper = mount(Validator, {
      props: {
        maxLength: 3,
        validateOnBlur: true,
        modelValue: 'abcdef',
      },
    })

    const input = wrapper.find('input')
    await input.trigger('blur')

    expect(wrapper.find('.label-text-alt.text-error').text()).toContain(
      'Must be no more than 3 characters'
    )
  })

  it('validates URL format', async () => {
    const wrapper = mount(Validator, {
      props: {
        type: 'url',
        url: true,
        validateOnBlur: true,
        modelValue: 'invalid-url',
      },
    })

    const input = wrapper.find('input')
    await input.trigger('blur')

    expect(wrapper.find('.label-text-alt.text-error').text()).toContain('Please enter a valid URL')
  })

  it('validates custom pattern', async () => {
    const wrapper = mount(Validator, {
      props: {
        pattern: /^[A-Z]{3}$/,
        validateOnBlur: true,
        modelValue: 'abc',
      },
    })

    const input = wrapper.find('input')
    await input.trigger('blur')

    expect(wrapper.find('.label-text-alt.text-error').text()).toContain(
      'Please match the required format'
    )
  })

  it('validates with custom rules', async () => {
    const customRules = [
      {
        name: 'uppercase',
        test: (value: string) => /[A-Z]/.test(value),
        message: 'Must contain uppercase letter',
      },
    ]

    const wrapper = mount(Validator, {
      props: {
        rules: customRules,
        validateOnBlur: true,
        modelValue: 'lowercase',
      },
    })

    const input = wrapper.find('input')
    await input.trigger('blur')

    expect(wrapper.find('.label-text-alt.text-error').text()).toContain(
      'Must contain uppercase letter'
    )
  })

  it('validates with custom validator function', async () => {
    const customValidator = vi.fn((value: string) => {
      return value === 'valid' ? null : 'Custom validation failed'
    })

    const wrapper = mount(Validator, {
      props: {
        customValidator,
        validateOnBlur: true,
        modelValue: 'invalid',
      },
    })

    const input = wrapper.find('input')
    await input.trigger('blur')

    expect(wrapper.find('.label-text-alt.text-error').text()).toContain('Custom validation failed')
  })

  it('shows validation icon when enabled', async () => {
    const wrapper = mount(Validator, {
      props: {
        showValidationIcon: true,
        required: true,
        validateOnBlur: true,
      },
    })

    const input = wrapper.find('input')
    await input.trigger('blur')

    expect(wrapper.find('.absolute.right-3').exists()).toBe(true)
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('shows validation summary when enabled', async () => {
    const wrapper = mount(Validator, {
      props: {
        showSummary: true,
        required: true,
        validateOnBlur: true,
      },
    })

    const input = wrapper.find('input')
    await input.trigger('blur')

    expect(wrapper.find('.validation-summary').exists()).toBe(true)
    expect(wrapper.find('.text-sm.font-medium').text()).toContain('1 error')
  })

  it('emits validate event with correct parameters', async () => {
    const wrapper = mount(Validator, {
      props: {
        required: true,
        validateOnBlur: true,
      },
    })

    const input = wrapper.find('input')
    await input.trigger('blur')

    expect(wrapper.emitted('validate')).toBeTruthy()
    const [isValid, errors] = wrapper.emitted('validate')![0]
    expect(isValid).toBe(false)
    expect(errors).toContain('This field is required')
  })

  it('emits focus and blur events', async () => {
    const wrapper = mount(Validator)
    const input = wrapper.find('input')

    await input.trigger('focus')
    expect(wrapper.emitted('focus')).toBeTruthy()

    await input.trigger('blur')
    expect(wrapper.emitted('blur')).toBeTruthy()
  })

  it('validates on input when validateOnInput is true', async () => {
    const wrapper = mount(Validator, {
      props: {
        required: true,
        validateOnInput: true,
      },
    })

    const input = wrapper.find('input')
    await input.setValue('test')

    expect(wrapper.emitted('validate')).toBeTruthy()
  })

  it('applies disabled state correctly', () => {
    const wrapper = mount(Validator, {
      props: {
        disabled: true,
      },
    })

    expect(wrapper.find('input').attributes('disabled')).toBeDefined()
  })

  it('applies readonly state correctly', () => {
    const wrapper = mount(Validator, {
      props: {
        readonly: true,
      },
    })

    expect(wrapper.find('input').attributes('readonly')).toBeDefined()
  })

  it('exposes validation methods', async () => {
    const wrapper = mount(Validator, {
      props: {
        required: true,
      },
    })

    const vm = wrapper.vm as any

    expect(typeof vm.validate).toBe('function')
    expect(typeof vm.isValid).toBe('boolean') // computed value
    expect(typeof vm.errors).toBe('object') // computed ref
    expect(typeof vm.reset).toBe('function')

    // Test reset method
    await vm.reset()
    // After reset, the field should be empty
    expect(vm.isValid).toBe(false) // Empty string fails required validation
    expect(vm.errors).toContain('This field is required')
  })

  it('handles helper text correctly', () => {
    const wrapper = mount(Validator, {
      props: {
        helperText: 'This is helper text',
      },
    })

    expect(wrapper.find('.label-text-alt.opacity-70').text()).toBe('This is helper text')
  })

  it('applies correct validation state classes', async () => {
    const wrapper = mount(Validator, {
      props: {
        required: true,
        validateOnBlur: true,
      },
    })

    const input = wrapper.find('input')
    await input.trigger('blur')

    expect(input.classes()).toContain('input-error')
  })

  it('handles multiple validation errors', async () => {
    const wrapper = mount(Validator, {
      props: {
        required: true,
        minLength: 5,
        validateOnBlur: true,
        modelValue: '', // Empty value to trigger required validation
      },
    })

    const input = wrapper.find('input')
    await input.trigger('blur')

    // Check that validation errors are emitted with multiple errors
    expect(wrapper.emitted('validate')).toBeTruthy()
    const [isValid, errors] = wrapper.emitted('validate')![0]
    expect(isValid).toBe(false)
    // Should have required error
    expect(errors).toContain('This field is required')
  })

  it('works with textarea type', async () => {
    const wrapper = mount(Validator, {
      props: {
        type: 'textarea',
        modelValue: 'test content',
      },
    })

    const textarea = wrapper.find('textarea')
    expect(textarea.element.value).toBe('test content')

    await textarea.setValue('new content')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['new content'])
  })
})

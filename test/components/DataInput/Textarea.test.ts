import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import Textarea from '../../../src/runtime/components/DataInput/Textarea.vue'

describe('Textarea', () => {
  it('renders correctly with basic props', () => {
    const wrapper = mount(Textarea, {
      props: {
        label: 'Test Textarea',
        placeholder: 'Enter text',
      },
    })

    expect(wrapper.find('label').text()).toContain('Test Textarea')
    expect(wrapper.find('textarea').attributes('placeholder')).toBe('Enter text')
  })

  it('uses v-model with defineModel correctly', async () => {
    const wrapper = mount(Textarea, {
      props: {
        modelValue: 'initial value',
      },
    })

    const textarea = wrapper.find('textarea')
    expect(textarea.element.value).toBe('initial value')

    await textarea.setValue('new value')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['new value'])
  })

  it('applies correct size classes', () => {
    const sizes = ['xs', 'sm', 'md', 'lg'] as const

    sizes.forEach((size) => {
      const wrapper = mount(Textarea, {
        props: { size },
      })

      const textarea = wrapper.find('textarea')
      if (size !== 'md') {
        expect(textarea.classes()).toContain(`textarea-${size}`)
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
      const wrapper = mount(Textarea, {
        props: { variant },
      })

      const textarea = wrapper.find('textarea')
      expect(textarea.classes()).toContain(`textarea-${variant}`)
    })
  })

  it('shows required indicator when required is true', () => {
    const wrapper = mount(Textarea, {
      props: {
        label: 'Required Field',
        required: true,
      },
    })

    const requiredIndicator = wrapper.find('.text-error')
    expect(requiredIndicator.text()).toBe('*')
  })

  it('shows help text when provided', () => {
    const wrapper = mount(Textarea, {
      props: {
        helpText: 'This is help text',
      },
    })

    expect(wrapper.text()).toContain('This is help text')
  })

  it('shows error message when provided', () => {
    const wrapper = mount(Textarea, {
      props: {
        errorMessage: 'This field has an error',
      },
    })

    const errorElement = wrapper.find('[role="alert"]')
    expect(errorElement.text()).toBe('This field has an error')
    expect(errorElement.classes()).toContain('text-error')
  })

  it('applies error styling when error message is present', () => {
    const wrapper = mount(Textarea, {
      props: {
        errorMessage: 'Error message',
      },
    })

    const textarea = wrapper.find('textarea')
    expect(textarea.classes()).toContain('textarea-error')
  })

  it('shows character count when showCharCount and maxlength are provided', () => {
    const wrapper = mount(Textarea, {
      props: {
        showCharCount: true,
        maxlength: 100,
        modelValue: 'Hello',
      },
    })

    expect(wrapper.text()).toContain('5/100')
  })

  it('updates character count when value changes', async () => {
    const wrapper = mount(Textarea, {
      props: {
        showCharCount: true,
        maxlength: 100,
        modelValue: 'Hello',
      },
    })

    expect(wrapper.text()).toContain('5/100')

    await wrapper.setProps({ modelValue: 'Hello World' })
    expect(wrapper.text()).toContain('11/100')
  })

  it('sets correct attributes on textarea', () => {
    const wrapper = mount(Textarea, {
      props: {
        disabled: true,
        readonly: true,
        required: true,
        rows: 5,
        maxlength: 200,
      },
    })

    const textarea = wrapper.find('textarea')
    expect(textarea.attributes('disabled')).toBeDefined()
    expect(textarea.attributes('readonly')).toBeDefined()
    expect(textarea.attributes('required')).toBeDefined()
    expect(textarea.attributes('rows')).toBe('5')
    expect(textarea.attributes('maxlength')).toBe('200')
  })

  it('emits input event when textarea value changes', async () => {
    const wrapper = mount(Textarea)

    const textarea = wrapper.find('textarea')
    await textarea.trigger('input')

    expect(wrapper.emitted('input')).toBeTruthy()
  })

  it('emits change event when textarea loses focus', async () => {
    const wrapper = mount(Textarea)

    const textarea = wrapper.find('textarea')
    await textarea.trigger('change')

    expect(wrapper.emitted('change')).toBeTruthy()
  })

  it('emits focus event when textarea gains focus', async () => {
    const wrapper = mount(Textarea)

    const textarea = wrapper.find('textarea')
    await textarea.trigger('focus')

    expect(wrapper.emitted('focus')).toBeTruthy()
  })

  it('emits blur event when textarea loses focus', async () => {
    const wrapper = mount(Textarea)

    const textarea = wrapper.find('textarea')
    await textarea.trigger('blur')

    expect(wrapper.emitted('blur')).toBeTruthy()
  })

  it('generates unique IDs for multiple textareas', () => {
    const wrapper1 = mount(Textarea)
    const wrapper2 = mount(Textarea)

    const id1 = wrapper1.find('textarea').attributes('id')
    const id2 = wrapper2.find('textarea').attributes('id')

    expect(id1).toBeDefined()
    expect(id2).toBeDefined()
    // Since the counter is shared, we expect sequential IDs
    expect(id1).toMatch(/^textarea-\d+-\d+-[a-z0-9]+$/)
    expect(id2).toMatch(/^textarea-\d+-\d+-[a-z0-9]+$/)
    expect(id1).not.toBe(id2)
  })

  it('sets aria-describedby correctly', () => {
    const wrapper = mount(Textarea, {
      props: {
        helpText: 'Help text',
        errorMessage: 'Error message',
        ariaDescribedby: 'custom-id',
      },
    })

    const textarea = wrapper.find('textarea')
    const describedBy = textarea.attributes('aria-describedby')

    expect(describedBy).toContain('custom-id')
    expect(describedBy).toContain('-help')
    expect(describedBy).toContain('-error')
  })

  it('works with v-model in parent component', async () => {
    const TestComponent = {
      components: { Textarea },
      template: '<Textarea v-model="value" />',
      setup() {
        const value = ref('initial')
        return { value }
      },
    }

    const wrapper = mount(TestComponent)
    const textarea = wrapper.find('textarea')

    expect(textarea.element.value).toBe('initial')

    await textarea.setValue('updated')
    expect(wrapper.vm.value).toBe('updated')
  })

  it('handles empty value correctly', () => {
    const wrapper = mount(Textarea, {
      props: {
        showCharCount: true,
        maxlength: 100,
      },
    })

    expect(wrapper.text()).toContain('0/100')
  })

  it('applies wrapper classes correctly', () => {
    const wrapper = mount(Textarea)
    const wrapperDiv = wrapper.find('.form-control')

    expect(wrapperDiv.classes()).toContain('form-control')
    expect(wrapperDiv.classes()).toContain('w-full')
  })

  it('does not show label when not provided', () => {
    const wrapper = mount(Textarea)
    expect(wrapper.find('label').exists()).toBe(false)
  })

  it('does not show character count when showCharCount is false', () => {
    const wrapper = mount(Textarea, {
      props: {
        maxlength: 100,
        showCharCount: false,
      },
    })

    expect(wrapper.text()).not.toContain('/100')
  })

  it('does not show character count when maxlength is not provided', () => {
    const wrapper = mount(Textarea, {
      props: {
        showCharCount: true,
      },
    })

    expect(wrapper.text()).not.toContain('/')
  })
})

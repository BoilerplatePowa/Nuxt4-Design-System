import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { Form, Field } from 'vee-validate'
import * as yup from 'yup'
import Input from '../../../src/runtime/components/DataInput/Input.vue'

// Mock VeeValidate components
vi.mock('vee-validate', () => ({
  Form: {
    name: 'Form',
    template: '<form><slot /></form>',
    props: ['validationSchema'],
  },
  Field: {
    name: 'Field',
    template:
      '<div><slot :field="{ value: modelValue, onChange: handleChange }" :errorMessage="errorMessage" :meta="{ touched: true, valid: !errorMessage }" /></div>',
    props: ['name', 'value'],
    setup(props: any) {
      const errorMessage = props.value === 'invalid' ? 'This field is invalid' : ''
      return { errorMessage }
    },
  },
}))

describe('Input', () => {
  it('renders correctly with basic props', () => {
    const wrapper = mount(Input, {
      props: {
        label: 'Test Input',
        placeholder: 'Enter text',
        modelValue: '',
      },
    })

    expect(wrapper.find('label').text()).toContain('Test Input')
    expect(wrapper.find('input').attributes('placeholder')).toBe('Enter text')
  })

  it('emits update:modelValue when input changes', async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: '',
      },
    })

    const input = wrapper.find('input')
    await input.setValue('test value')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['test value'])
  })

  it('applies correct size classes', () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const

    sizes.forEach((size) => {
      const wrapper = mount(Input, {
        props: { size },
      })

      const input = wrapper.find('input')
      if (size !== 'md') {
        expect(input.classes()).toContain(`input-${size}`)
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
      'neutral',
    ] as const

    variants.forEach((variant) => {
      const wrapper = mount(Input, {
        props: { variant },
      })

      const input = wrapper.find('input')
      expect(input.classes()).toContain(`input-${variant}`)
    })
  })

  it('renders left icon when provided', () => {
    const wrapper = mount(Input, {
      props: {
        leftIcon: 'search',
      },
    })

    expect(wrapper.findComponent({ name: 'Icon' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'Icon' }).props('name')).toBe('search')
  })

  it('renders right icon when provided', () => {
    const wrapper = mount(Input, {
      props: {
        rightIcon: 'eye',
      },
    })

    const icons = wrapper.findAllComponents({ name: 'Icon' })
    expect(icons.length).toBeGreaterThan(0)

    // Find the right icon by checking if it has the right positioning class
    const rightIcon = icons.find((icon) => icon.classes().includes('right-3'))
    expect(rightIcon).toBeDefined()
    expect(rightIcon?.props('name')).toBe('eye')
  })

  it('applies icon padding classes when icons are present', () => {
    const wrapper = mount(Input, {
      props: {
        leftIcon: 'search',
        rightIcon: 'eye',
      },
    })

    const input = wrapper.find('input')
    expect(input.classes()).toContain('pl-10')
    expect(input.classes()).toContain('pr-10')
  })

  it('shows character count when enabled', () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: 'test',
        maxlength: 10,
        showCharCount: true,
      },
    })

    expect(wrapper.text()).toContain('4/10')
  })

  it('shows help text when provided', () => {
    const wrapper = mount(Input, {
      props: {
        helpText: 'This is help text',
      },
    })

    expect(wrapper.text()).toContain('This is help text')
  })

  it('shows required indicator when required', () => {
    const wrapper = mount(Input, {
      props: {
        label: 'Test',
        required: true,
      },
    })

    expect(wrapper.find('.text-error').exists()).toBe(true)
  })

  it('applies disabled state correctly', () => {
    const wrapper = mount(Input, {
      props: {
        disabled: true,
      },
    })

    const input = wrapper.find('input')
    expect(input.attributes('disabled')).toBeDefined()
  })

  it('applies readonly state correctly', () => {
    const wrapper = mount(Input, {
      props: {
        readonly: true,
      },
    })

    const input = wrapper.find('input')
    expect(input.attributes('readonly')).toBeDefined()
  })

  it('emits focus and blur events', async () => {
    const wrapper = mount(Input)

    const input = wrapper.find('input')

    await input.trigger('focus')
    expect(wrapper.emitted('focus')).toBeTruthy()

    await input.trigger('blur')
    expect(wrapper.emitted('blur')).toBeTruthy()
  })

  it('emits change event', async () => {
    const wrapper = mount(Input)

    const input = wrapper.find('input')
    await input.trigger('change')

    expect(wrapper.emitted('change')).toBeTruthy()
  })

  it('generates unique IDs for multiple instances', () => {
    const wrapper1 = mount(Input)
    const wrapper2 = mount(Input)

    const id1 = wrapper1.find('input').attributes('id')
    const id2 = wrapper2.find('input').attributes('id')

    expect(id1).not.toBe(id2)
  })

  it('applies correct input type', () => {
    const types = ['text', 'email', 'password', 'url', 'tel', 'number', 'search'] as const

    types.forEach((type) => {
      const wrapper = mount(Input, {
        props: { type },
      })

      const input = wrapper.find('input')
      expect(input.attributes('type')).toBe(type)
    })
  })

  it('applies maxlength attribute when provided', () => {
    const wrapper = mount(Input, {
      props: {
        maxlength: 50,
      },
    })

    const input = wrapper.find('input')
    expect(input.attributes('maxlength')).toBe('50')
  })

  it('applies aria-describedby when help text is present', () => {
    const wrapper = mount(Input, {
      props: {
        helpText: 'Help text',
      },
    })

    const input = wrapper.find('input')
    const describedBy = input.attributes('aria-describedby')
    expect(describedBy).toMatch(/input-\d+-[a-z0-9]+-help/)
  })

  it('applies aria-invalid when validation fails', () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: 'invalid',
        name: 'test',
      },
    })

    const input = wrapper.find('input')
    expect(input.attributes('aria-invalid')).toBe('true')
  })

  it('works with VeeValidate Form and Field', async () => {
    const schema = yup.object({
      email: yup.string().email('Invalid email').required('Required'),
    })

    const wrapper = mount({
      components: { Input, Form, Field },
      template: `
        <Form :validation-schema="schema" v-slot="{ handleSubmit }">
          <form @submit="handleSubmit">
            <Input name="email" label="Email" type="email" />
          </form>
        </Form>
      `,
      setup() {
        return { schema }
      },
    })

    expect(wrapper.findComponent(Form).exists()).toBe(true)
    expect(wrapper.findComponent(Field).exists()).toBe(true)
  })

  it('passes rules prop to Field component', () => {
    const rules = yup.string().required('This field is required')

    const wrapper = mount(Input, {
      props: {
        name: 'test',
        rules,
      },
    })

    // Check that the Field component exists and the Input component receives rules
    const field = wrapper.findComponent(Field)
    expect(field.exists()).toBe(true)
    expect(wrapper.props('rules')).toStrictEqual(rules)
  })

  it('works with inline validation rules', () => {
    const emailRules = yup.string().email('Invalid email').required('Required')

    const wrapper = mount(Input, {
      props: {
        name: 'email',
        type: 'email',
        rules: emailRules,
      },
    })

    // Check that the Field component exists and the Input component receives rules
    const field = wrapper.findComponent(Field)
    expect(field.exists()).toBe(true)
    expect(wrapper.props('rules')).toStrictEqual(emailRules)
  })

  it('handles different icon sizes correctly', () => {
    const sizeMap = {
      xs: 'xs',
      sm: 'sm',
      md: 'md',
      lg: 'lg',
      xl: 'xl',
    }

    Object.entries(sizeMap).forEach(([inputSize, iconSize]) => {
      const wrapper = mount(Input, {
        props: {
          size: inputSize as any,
          leftIcon: 'search',
        },
      })

      const icon = wrapper.findComponent({ name: 'Icon' })
      expect(icon.props('size')).toBe(iconSize)
    })
  })

  it('updates character count when modelValue changes', async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: 'initial',
        maxlength: 10,
        showCharCount: true,
      },
    })

    expect(wrapper.text()).toContain('7/10')

    await wrapper.setProps({ modelValue: 'updated' })
    expect(wrapper.text()).toContain('7/10')
  })
})

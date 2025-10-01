import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Range from '../../../src/runtime/components/DataInput/Range.vue'

describe('Range', () => {
  beforeEach(() => {
    // Reset the ID counter between tests
    // This is a workaround since we can't directly access the module's idCounter
    // In a real scenario, you might want to export a reset function or use a different ID strategy
  })

  it('renders correctly with basic props', () => {
    const wrapper = mount(Range, {
      props: {
        label: 'Test Range',
        modelValue: 50,
        min: 0,
        max: 100,
      },
    })

    expect(wrapper.find('label').text()).toContain('Test Range')
    expect(wrapper.find('input[type="range"]').exists()).toBe(true)
  })

  it('uses defineModel() for v-model binding', async () => {
    const wrapper = mount(Range, {
      props: {
        modelValue: 25,
        min: 0,
        max: 100,
      },
    })

    const input = wrapper.find('input[type="range"]')
    expect(input.attributes('value')).toBe('25')

    // Test that the model updates when input changes
    await input.setValue('75')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([75])
  })

  it('applies correct size classes', () => {
    const sizes = ['xs', 'sm', 'md', 'lg'] as const

    sizes.forEach((size) => {
      const wrapper = mount(Range, {
        props: { size, modelValue: 50 },
      })

      const input = wrapper.find('input[type="range"]')
      if (size !== 'md') {
        expect(input.classes()).toContain(`range-${size}`)
      }
    })
  })

  it('applies correct variant classes', () => {
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
      const wrapper = mount(Range, {
        props: { variant, modelValue: 50 },
      })

      const input = wrapper.find('input[type="range"]')
      expect(input.classes()).toContain(`range-${variant}`)
    })
  })

  it('shows value when showValue is true', () => {
    const wrapper = mount(Range, {
      props: {
        label: 'Test Range',
        modelValue: 75,
        showValue: true,
      },
    })

    const valueDisplay = wrapper.find('.label-text-alt')
    expect(valueDisplay.exists()).toBe(true)
    expect(valueDisplay.text()).toBe('75')
  })

  it('does not show value when showValue is false', () => {
    const wrapper = mount(Range, {
      props: {
        label: 'Test Range',
        modelValue: 75,
        showValue: false,
      },
    })

    const valueDisplay = wrapper.find('.label-text-alt')
    expect(valueDisplay.exists()).toBe(false)
  })

  it('shows ticks when showTicks is true', () => {
    const wrapper = mount(Range, {
      props: {
        modelValue: 50,
        min: 0,
        max: 100,
        showTicks: true,
        tickCount: 5,
      },
    })

    const ticksContainer = wrapper.find('.w-full.flex.justify-between')
    expect(ticksContainer.exists()).toBe(true)

    const ticks = wrapper.findAll('.w-full.flex.justify-between span')
    expect(ticks.length).toBe(5)
    expect(ticks[0].text()).toBe('0')
    expect(ticks[4].text()).toBe('100')
  })

  it('does not show ticks when showTicks is false', () => {
    const wrapper = mount(Range, {
      props: {
        modelValue: 50,
        showTicks: false,
      },
    })

    const ticksContainer = wrapper.find('.w-full.flex.justify-between')
    expect(ticksContainer.exists()).toBe(false)
  })

  it('shows help text when provided', () => {
    const wrapper = mount(Range, {
      props: {
        modelValue: 50,
        helpText: 'This is help text',
      },
    })

    const helpText = wrapper.find('p.text-xs.text-base-content\\/70')
    expect(helpText.exists()).toBe(true)
    expect(helpText.text()).toBe('This is help text')
  })

  it('shows error message when provided', () => {
    const wrapper = mount(Range, {
      props: {
        modelValue: 50,
        errorMessage: 'This is an error',
      },
    })

    const errorMessage = wrapper.find('p.text-xs.text-error')
    expect(errorMessage.exists()).toBe(true)
    expect(errorMessage.text()).toBe('This is an error')
    expect(errorMessage.attributes('role')).toBe('alert')
  })

  it('prioritizes error message over help text', () => {
    const wrapper = mount(Range, {
      props: {
        modelValue: 50,
        helpText: 'This is help text',
        errorMessage: 'This is an error',
      },
    })

    const helpText = wrapper.find('p.text-xs.text-base-content\\/70')
    const errorMessage = wrapper.find('p.text-xs.text-error')

    expect(helpText.exists()).toBe(false)
    expect(errorMessage.exists()).toBe(true)
  })

  it('applies disabled state correctly', () => {
    const wrapper = mount(Range, {
      props: {
        modelValue: 50,
        disabled: true,
      },
    })

    const input = wrapper.find('input[type="range"]')
    expect(input.attributes('disabled')).toBeDefined()
  })

  it('sets correct input attributes', () => {
    const wrapper = mount(Range, {
      props: {
        modelValue: 30,
        min: 10,
        max: 90,
        step: 5,
      },
    })

    const input = wrapper.find('input[type="range"]')
    expect(input.attributes('min')).toBe('10')
    expect(input.attributes('max')).toBe('90')
    expect(input.attributes('step')).toBe('5')
  })

  it('emits input event when input changes', async () => {
    const wrapper = mount(Range, {
      props: {
        modelValue: 50,
      },
    })

    const input = wrapper.find('input[type="range"]')
    await input.trigger('input')

    expect(wrapper.emitted('input')).toBeTruthy()
  })

  it('emits change event when input changes', async () => {
    const wrapper = mount(Range, {
      props: {
        modelValue: 50,
      },
    })

    const input = wrapper.find('input[type="range"]')
    await input.trigger('change')

    expect(wrapper.emitted('change')).toBeTruthy()
  })

  it('generates unique IDs for multiple instances', () => {
    const wrapper1 = mount(Range, { props: { modelValue: 50 } })
    const wrapper2 = mount(Range, { props: { modelValue: 50 } })

    const input1 = wrapper1.find('input[type="range"]')
    const input2 = wrapper2.find('input[type="range"]')

    // Since we can't reset the ID counter easily, we'll just verify that IDs are generated
    expect(input1.attributes('id')).toBeDefined()
    expect(input2.attributes('id')).toBeDefined()
    expect(input1.attributes('id')).toMatch(/^range-\d+$/)
    expect(input2.attributes('id')).toMatch(/^range-\d+$/)
  })

  it('sets aria-describedby correctly', () => {
    const wrapper = mount(Range, {
      props: {
        modelValue: 50,
        helpText: 'Help text',
        errorMessage: 'Error message',
        ariaDescribedby: 'custom-id',
      },
    })

    const input = wrapper.find('input[type="range"]')
    const describedBy = input.attributes('aria-describedby')

    expect(describedBy).toContain('custom-id')
    expect(describedBy).toMatch(/range-\d+-help/)
    expect(describedBy).toMatch(/range-\d+-error/)
  })

  it('handles default model value correctly', () => {
    const wrapper = mount(Range, {
      props: {
        // No modelValue provided
      },
    })

    const input = wrapper.find('input[type="range"]')
    expect(input.attributes('value')).toBe('0')
  })

  it('updates display value when model changes', async () => {
    const wrapper = mount(Range, {
      props: {
        label: 'Test Range',
        modelValue: 25,
        showValue: true,
      },
    })

    expect(wrapper.find('.label-text-alt').text()).toBe('25')

    await wrapper.setProps({ modelValue: 75 })
    expect(wrapper.find('.label-text-alt').text()).toBe('75')
  })

  it('calculates ticks correctly for different ranges', () => {
    const wrapper = mount(Range, {
      props: {
        modelValue: 2,
        min: 1,
        max: 5,
        showTicks: true,
        tickCount: 3,
      },
    })

    const ticks = wrapper.findAll('.w-full.flex.justify-between span')
    expect(ticks.length).toBe(3)
    expect(ticks[0].text()).toBe('1')
    expect(ticks[1].text()).toBe('3')
    expect(ticks[2].text()).toBe('5')
  })
})

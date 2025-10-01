import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Accordion from '../../../src/runtime/components/DataDisplay/Accordion.vue'

describe('Accordion', () => {
  const sampleItems = [
    {
      value: '1',
      title: 'First Item',
      content: 'First item content',
    },
    {
      value: '2',
      title: 'Second Item',
      content: 'Second item content',
    },
    {
      value: '3',
      title: 'Third Item',
      content: 'Third item content',
    },
  ]

  describe('Basic Rendering', () => {
    it('renders accordion with items', () => {
      const wrapper = mount(Accordion, {
        props: {
          items: sampleItems,
        },
      })

      expect(wrapper.find('.collapse').exists()).toBe(true)
      expect(wrapper.findAll('.collapse')).toHaveLength(3)
      expect(wrapper.text()).toContain('First Item')
      expect(wrapper.text()).toContain('Second Item')
      expect(wrapper.text()).toContain('Third Item')
    })

    it('renders without items when using slots', () => {
      const wrapper = mount(Accordion, {
        slots: {
          default: `
            <div class="collapse collapse-arrow">
              <input type="radio" class="collapse-checkbox" />
              <label class="collapse-title">Custom Item</label>
              <div class="collapse-content">Custom content</div>
            </div>
          `,
        },
      })

      expect(wrapper.find('.collapse').exists()).toBe(true)
      expect(wrapper.text()).toContain('Custom Item')
      expect(wrapper.text()).toContain('Custom content')
    })
  })

  describe('v-model Integration', () => {
    it('supports v-model binding', async () => {
      const wrapper = mount(Accordion, {
        props: {
          items: sampleItems,
          modelValue: '2',
        },
      })

      // Check that the second item is checked
      const inputs = wrapper.findAll('input[type="radio"]')
      expect((inputs[1].element as HTMLInputElement).checked).toBe(true)
      expect((inputs[0].element as HTMLInputElement).checked).toBe(false)
      expect((inputs[2].element as HTMLInputElement).checked).toBe(false)
    })

    it('handles null openItem correctly', async () => {
      const wrapper = mount(Accordion, {
        props: {
          items: sampleItems,
          modelValue: null,
        },
      })

      const inputs = wrapper.findAll('input[type="radio"]')
      inputs.forEach((input) => {
        expect((input.element as HTMLInputElement).checked).toBe(false)
      })
    })

    it('emits item-toggle event when item is clicked', async () => {
      const wrapper = mount(Accordion, {
        props: {
          items: sampleItems,
        },
      })

      const firstInput = wrapper.find('input[type="radio"]')
      await firstInput.trigger('change')

      expect(wrapper.emitted('item-toggle')).toBeTruthy()
      const emittedEvent = wrapper.emitted('item-toggle')?.[0]
      expect(emittedEvent).toBeTruthy()
      expect(emittedEvent?.[0]).toEqual(sampleItems[0])
      expect(emittedEvent?.[1]).toBe(0)
      // The third parameter should be the actual state after the change
      expect(typeof emittedEvent?.[2]).toBe('boolean')
    })
  })

  describe('Multiple Mode', () => {
    it('uses checkboxes when multiple is true', () => {
      const wrapper = mount(Accordion, {
        props: {
          items: sampleItems,
          multiple: true,
        },
      })

      const checkboxes = wrapper.findAll('input[type="checkbox"]')
      const radios = wrapper.findAll('input[type="radio"]')

      expect(checkboxes).toHaveLength(3)
      expect(radios).toHaveLength(0)
    })

    it('emits events for multiple items', async () => {
      const wrapper = mount(Accordion, {
        props: {
          items: sampleItems,
          multiple: true,
        },
      })

      const inputs = wrapper.findAll('input[type="checkbox"]')

      // Click first item
      await inputs[0].trigger('change')
      expect(wrapper.emitted('item-toggle')).toBeTruthy()

      // Click second item
      await inputs[1].trigger('change')
      expect(wrapper.emitted('item-toggle')).toHaveLength(2)
    })
  })

  describe('Variants and Styling', () => {
    it('applies default variant classes', () => {
      const wrapper = mount(Accordion, {
        props: {
          items: sampleItems,
          variant: 'default',
        },
      })

      const accordion = wrapper.find('.space-y-2')
      expect(accordion.exists()).toBe(true)
    })

    it('applies bordered variant classes', () => {
      const wrapper = mount(Accordion, {
        props: {
          items: sampleItems,
          variant: 'bordered',
        },
      })

      const accordion = wrapper.find('.border.border-base-300.rounded-box')
      expect(accordion.exists()).toBe(true)
    })

    it('applies compact variant classes', () => {
      const wrapper = mount(Accordion, {
        props: {
          items: sampleItems,
          variant: 'compact',
        },
      })

      const accordion = wrapper.find('.space-y-1')
      expect(accordion.exists()).toBe(true)
    })
  })

  describe('Disabled State', () => {
    it('applies disabled styling', () => {
      const disabledItems = [{ ...sampleItems[0], disabled: true }, sampleItems[1]]

      const wrapper = mount(Accordion, {
        props: {
          items: disabledItems,
        },
      })

      const disabledLabel = wrapper.find('.opacity-50.cursor-not-allowed')
      expect(disabledLabel.exists()).toBe(true)
    })

    it('prevents interaction when disabled', async () => {
      const wrapper = mount(Accordion, {
        props: {
          items: sampleItems,
          disabled: true,
        },
      })

      const firstInput = wrapper.find('input[type="radio"]')
      await firstInput.trigger('change')

      // Should not emit events when disabled
      expect(wrapper.emitted('item-toggle')).toBeFalsy()
    })
  })

  describe('Item Values and Keys', () => {
    it('uses item value when available', () => {
      const itemsWithValues = [
        { value: 'custom-1', title: 'First', content: 'Content' },
        { value: 'custom-2', title: 'Second', content: 'Content' },
      ]

      const wrapper = mount(Accordion, {
        props: {
          items: itemsWithValues,
          modelValue: 'custom-1',
        },
      })

      const inputs = wrapper.findAll('input[type="radio"]')
      expect((inputs[0].element as HTMLInputElement).checked).toBe(true)
    })

    it('falls back to title when value is not provided', () => {
      const itemsWithoutValues = [
        { title: 'First Title', content: 'Content' },
        { title: 'Second Title', content: 'Content' },
      ]

      const wrapper = mount(Accordion, {
        props: {
          items: itemsWithoutValues,
          modelValue: 'First Title',
        },
      })

      const inputs = wrapper.findAll('input[type="radio"]')
      expect((inputs[0].element as HTMLInputElement).checked).toBe(true)
    })
  })

  describe('Default Open Items', () => {
    it('opens items with defaultOpen property', () => {
      const itemsWithDefault = [
        { ...sampleItems[0], defaultOpen: true },
        sampleItems[1],
        { ...sampleItems[2], defaultOpen: true },
      ]

      const wrapper = mount(Accordion, {
        props: {
          items: itemsWithDefault,
        },
      })

      const inputs = wrapper.findAll('input[type="radio"]')
      expect((inputs[0].element as HTMLInputElement).checked).toBe(true)
      expect((inputs[2].element as HTMLInputElement).checked).toBe(true)
    })

    it('prioritizes openItem over defaultOpen', () => {
      const itemsWithDefault = [
        { ...sampleItems[0], defaultOpen: true },
        sampleItems[1],
        { ...sampleItems[2], defaultOpen: true },
      ]

      const wrapper = mount(Accordion, {
        props: {
          items: itemsWithDefault,
          modelValue: '2',
        },
      })

      const inputs = wrapper.findAll('input[type="radio"]')
      expect((inputs[0].element as HTMLInputElement).checked).toBe(false)
      expect((inputs[1].element as HTMLInputElement).checked).toBe(true)
      expect((inputs[2].element as HTMLInputElement).checked).toBe(false)
    })
  })

  describe('Accessibility', () => {
    it('generates unique IDs for radio inputs', () => {
      const wrapper = mount(Accordion, {
        props: {
          items: sampleItems,
        },
      })

      const inputs = wrapper.findAll('input[type="radio"]')
      const labels = wrapper.findAll('label')

      inputs.forEach((input, index) => {
        const inputId = input.attributes('id')
        const labelFor = labels[index].attributes('for')
        expect(inputId).toBe(labelFor)
        expect(inputId).toMatch(/^accordion-.*-\d+$/)
      })
    })

    it('uses custom ID when provided', () => {
      const wrapper = mount(Accordion, {
        props: {
          items: sampleItems,
          id: 'custom-accordion',
        },
      })

      const inputs = wrapper.findAll('input[type="radio"]')
      inputs.forEach((input, index) => {
        const inputId = input.attributes('id')
        expect(inputId).toBe(`accordion-custom-accordion-${index}`)
      })
    })
  })

  describe('Content Rendering', () => {
    it('renders HTML content when provided', () => {
      const itemsWithHtml = [
        {
          value: '1',
          title: 'HTML Content',
          content: '<strong>Bold text</strong> and <em>italic text</em>',
        },
      ]

      const wrapper = mount(Accordion, {
        props: {
          items: itemsWithHtml,
        },
      })

      expect(wrapper.html()).toContain('<strong>Bold text</strong>')
      expect(wrapper.html()).toContain('<em>italic text</em>')
    })

    it('uses slots when content is not provided', () => {
      const wrapper = mount(Accordion, {
        props: {
          items: [{ value: '1', title: 'Slot Item' }],
        },
        slots: {
          'item-0': '<div class="slot-content">Custom slot content</div>',
        },
      })

      expect(wrapper.find('.slot-content').exists()).toBe(true)
      expect(wrapper.text()).toContain('Custom slot content')
    })
  })
})

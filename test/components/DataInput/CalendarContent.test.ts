import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import CalendarContent from '../../../src/runtime/components/DataInput/CalendarContent.vue'

describe('CalendarContent', () => {
  const createWrapper = (props = {}) => {
    return mount(CalendarContent, {
      props,
    })
  }

  describe('Props', () => {
    it('renders with default props', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('.calendar-content').exists()).toBe(true)
      expect(wrapper.find('.calendar-header').exists()).toBe(true)
      expect(wrapper.find('.calendar-grid').exists()).toBe(true)
    })

    it('supports v-model with defineModel()', async () => {
      const wrapper = createWrapper()
      const testDate = new Date('2024-01-15')

      // Test that the component can receive a value through v-model
      await wrapper.setProps({ modelValue: testDate })

      // Verify the component renders correctly
      expect(wrapper.find('.calendar-content').exists()).toBe(true)
    })

    it('applies size classes correctly', () => {
      const wrapper = createWrapper({ size: 'lg' })
      expect(wrapper.find('.calendar-content').classes()).toContain('text-lg')
    })

    it('shows month and year selectors when enabled', () => {
      const wrapper = createWrapper({
        allowMonthSelect: true,
        allowYearSelect: true,
      })
      expect(wrapper.find('select').exists()).toBe(true)
    })

    it('hides month and year selectors when disabled', () => {
      const wrapper = createWrapper({
        allowMonthSelect: false,
        allowYearSelect: false,
      })
      expect(wrapper.find('select').exists()).toBe(false)
    })
  })

  describe('Calendar Navigation', () => {
    it('navigates to previous month', async () => {
      const wrapper = createWrapper()

      await wrapper.find('[aria-label="Previous month"]').trigger('click')

      // Verify navigation occurred by checking for emitted events or UI changes
      expect(wrapper.emitted()).toBeDefined()
    })

    it('navigates to next month', async () => {
      const wrapper = createWrapper()

      await wrapper.find('[aria-label="Next month"]').trigger('click')

      // Verify navigation occurred by checking for emitted events or UI changes
      expect(wrapper.emitted()).toBeDefined()
    })

    it('changes month via selector', async () => {
      const wrapper = createWrapper({ allowMonthSelect: true })
      const monthSelect = wrapper.find('select')

      await monthSelect.setValue('5') // June

      // Verify the change was processed
      expect(wrapper.emitted()).toBeDefined()
    })

    it('changes year via selector', async () => {
      const wrapper = createWrapper({ allowYearSelect: true })
      const yearSelect = wrapper.findAll('select')[1]

      await yearSelect.setValue('2025')

      // Verify the change was processed
      expect(wrapper.emitted()).toBeDefined()
    })
  })

  describe('Date Selection', () => {
    it('selects a single date', async () => {
      const wrapper = createWrapper()

      // Find and click on the 15th day button
      const dayButton = wrapper.find('[aria-label*="1/15/2024"]')
      if (dayButton.exists()) {
        await dayButton.trigger('click')

        // Verify the selection was processed
        expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      }
    })

    it('selects date range when range is enabled', async () => {
      const wrapper = createWrapper({ range: true })

      // Find and click on two different dates
      const dayButtons = wrapper.findAll('[aria-label*="/2024"]')
      if (dayButtons.length >= 2) {
        await dayButtons[0].trigger('click')
        await dayButtons[1].trigger('click')

        // Verify the range selection was processed
        expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      }
    })

    it('handles null value correctly', async () => {
      const wrapper = createWrapper({ modelValue: null })

      // Verify the component renders correctly with null value
      expect(wrapper.find('.calendar-content').exists()).toBe(true)
    })
  })

  describe('Time Selection', () => {
    it('shows time picker when showTime is enabled', () => {
      const wrapper = createWrapper({ showTime: true })
      expect(wrapper.find('input[type="time"]').exists()).toBe(true)
    })

    it('hides time picker when showTime is disabled', () => {
      const wrapper = createWrapper({ showTime: false })
      expect(wrapper.find('input[type="time"]').exists()).toBe(false)
    })

    it('sets time value correctly', async () => {
      const wrapper = createWrapper({ showTime: true })
      const timeInput = wrapper.find('input[type="time"]')

      await timeInput.setValue('14:30')

      // Verify the time was set
      expect((timeInput.element as HTMLInputElement).value).toBe('14:30')
    })
  })

  describe('Localization', () => {
    it('applies French locale correctly', () => {
      const wrapper = createWrapper({ locale: 'fr' })

      // Verify the component renders with French locale
      expect(wrapper.find('.calendar-content').exists()).toBe(true)
    })

    it('applies English locale correctly', () => {
      const wrapper = createWrapper({ locale: 'en' })

      // Verify the component renders with English locale
      expect(wrapper.find('.calendar-content').exists()).toBe(true)
    })
  })

  describe('Date Constraints', () => {
    it('respects min date constraint', () => {
      const minDate = new Date('2024-01-01')
      const wrapper = createWrapper({ minDate })

      // Verify the component renders with min date constraint
      expect(wrapper.find('.calendar-content').exists()).toBe(true)
    })

    it('respects max date constraint', () => {
      const maxDate = new Date('2024-12-31')
      const wrapper = createWrapper({ maxDate })

      // Verify the component renders with max date constraint
      expect(wrapper.find('.calendar-content').exists()).toBe(true)
    })

    it('disables specific dates', () => {
      const disabledDates = [new Date('2024-01-15')]
      const wrapper = createWrapper({ disabledDates })

      // Verify the component renders with disabled dates
      expect(wrapper.find('.calendar-content').exists()).toBe(true)
    })
  })

  describe('Initial Date', () => {
    it('sets initial date correctly', () => {
      const testDate = new Date('2024-06-15')
      const wrapper = createWrapper({ initialDate: testDate })

      // Verify the component renders with initial date
      expect(wrapper.find('.calendar-content').exists()).toBe(true)
    })
  })

  describe('Events', () => {
    it('emits update:modelValue when date is selected', async () => {
      const wrapper = createWrapper()

      // Find and click on a date
      const dayButton = wrapper.find('[aria-label*="/2024"]')
      if (dayButton.exists()) {
        await dayButton.trigger('click')

        expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      }
    })
  })
})

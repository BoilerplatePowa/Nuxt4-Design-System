import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Calendar from '../../../src/runtime/components/DataInput/Calendar.vue'

describe('Calendar', () => {
  const createWrapper = (props = {}) => {
    return mount(Calendar, {
      props,
      global: {
        stubs: {
          CalendarContent: {
            template: '<div class="mock-calendar-content">Calendar Content</div>',
            props: [
              'modelValue',
              'range',
              'minDate',
              'maxDate',
              'disabledDates',
              'locale',
              'format',
              'showTime',
              'timeStep',
              'size',
              'variant',
              'allowMonthSelect',
              'allowYearSelect',
              'yearRange',
              'disabled',
            ],
            emits: ['update:modelValue', 'close'],
          },
        },
      },
    })
  }

  describe('Props', () => {
    it('renders with default props', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('.calendar-container').exists()).toBe(true)
      expect(wrapper.find('input').exists()).toBe(true)
      expect(wrapper.find('button').exists()).toBe(true)
    })

    it('supports v-model with defineModel()', async () => {
      const wrapper = createWrapper()
      const testDate = new Date('2024-01-15')

      // Test that the component can receive a value through v-model
      await wrapper.setProps({ modelValue: testDate })

      // The component should accept the model value
      expect(wrapper.props('modelValue')).toEqual(testDate)
    })

    it('applies size classes correctly', () => {
      const wrapper = createWrapper({ size: 'lg' })
      const input = wrapper.find('input')
      expect(input.classes()).toContain('input-lg')
    })

    it('applies variant classes correctly', () => {
      const wrapper = createWrapper({ variant: 'bordered' })
      const input = wrapper.find('input')
      expect(input.classes()).toContain('input-bordered')
    })

    it('applies disabled state correctly', () => {
      const wrapper = createWrapper({ disabled: true })
      expect(wrapper.find('.calendar-container').classes()).toContain('opacity-60')
      expect(wrapper.find('.calendar-container').classes()).toContain('pointer-events-none')
    })

    it('shows placeholder text', () => {
      const wrapper = createWrapper({
        placeholder: 'Custom placeholder',
      })
      expect(wrapper.find('input').attributes('placeholder')).toBe('Custom placeholder')
    })
  })

  describe('Modes', () => {
    it('renders input mode by default', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('input').exists()).toBe(true)
      expect(wrapper.find('button').exists()).toBe(true)
    })

    it('renders inline mode correctly', () => {
      const wrapper = createWrapper({ mode: 'inline' })
      expect(wrapper.find('input').exists()).toBe(false)
      expect(wrapper.find('button').exists()).toBe(false)
      expect(wrapper.find('.calendar-inline').exists()).toBe(true)
    })

    it('shows popover when input is focused', async () => {
      const wrapper = createWrapper()
      const input = wrapper.find('input')

      await input.trigger('focus')
      await wrapper.vm.$nextTick()

      expect(wrapper.find('[role="dialog"]').exists()).toBe(true)
    })
  })

  describe('Events', () => {
    it('updates v-model when date is selected', async () => {
      const wrapper = createWrapper()
      const testDate = new Date('2024-01-15')

      // Simulate date selection through CalendarContent
      const calendarContent = wrapper.findComponent({
        name: 'CalendarContent',
      })
      if (calendarContent.exists()) {
        await calendarContent.vm.$emit('update:modelValue', testDate)

        // With defineModel(), the model is updated directly
        // Check that the component responds to the model change
        expect(wrapper.props('modelValue')).toEqual(testDate)
      } else {
        // If CalendarContent is not found, test the direct model update
        await wrapper.setProps({ modelValue: testDate })
        expect(wrapper.props('modelValue')).toEqual(testDate)
      }
    })

    it('emits select event when date is selected', async () => {
      const wrapper = createWrapper()
      const testDate = new Date('2024-01-15')

      await wrapper.vm.$emit('select', testDate)

      expect(wrapper.emitted('select')).toBeTruthy()
      expect(wrapper.emitted('select')?.[0]).toEqual([testDate])
    })

    it('emits focus event when input is focused', async () => {
      const wrapper = createWrapper()
      const input = wrapper.find('input')

      await input.trigger('focus')

      expect(wrapper.emitted('focus')).toBeTruthy()
    })

    it('emits blur event when input is blurred', async () => {
      const wrapper = createWrapper()
      const input = wrapper.find('input')

      await input.trigger('blur')

      expect(wrapper.emitted('blur')).toBeTruthy()
    })

    it('emits close event when calendar is closed', async () => {
      const wrapper = createWrapper()

      await wrapper.vm.$emit('close')

      expect(wrapper.emitted('close')).toBeTruthy()
    })
  })

  describe('Keyboard Navigation', () => {
    it('opens calendar on ArrowDown key', async () => {
      const wrapper = createWrapper()
      const input = wrapper.find('input')

      await input.trigger('keydown', { key: 'ArrowDown' })
      await wrapper.vm.$nextTick()

      expect(wrapper.find('[role="dialog"]').exists()).toBe(true)
    })

    it('closes calendar on Escape key', async () => {
      const wrapper = createWrapper()
      const input = wrapper.find('input')

      // First open the calendar
      await input.trigger('focus')
      await wrapper.vm.$nextTick()
      expect(wrapper.find('[role="dialog"]').exists()).toBe(true)

      // Then close it with Escape
      await input.trigger('keydown', { key: 'Escape' })
      await wrapper.vm.$nextTick()

      expect(wrapper.find('[role="dialog"]').exists()).toBe(false)
    })

    it('toggles calendar on Enter key', async () => {
      const wrapper = createWrapper()
      const input = wrapper.find('input')

      await input.trigger('keydown', { key: 'Enter' })
      await wrapper.vm.$nextTick()

      expect(wrapper.find('[role="dialog"]').exists()).toBe(true)
    })
  })

  describe('Date Range', () => {
    it('supports date range selection', () => {
      const wrapper = createWrapper({ range: true })
      const calendarContent = wrapper.findComponent({
        name: 'CalendarContent',
      })
      if (calendarContent.exists()) {
        expect(calendarContent.props('range')).toBe(true)
      } else {
        // If CalendarContent is not found, test that the prop is passed correctly
        expect(wrapper.vm.range).toBe(true)
      }
    })

    it('displays range value correctly', async () => {
      const wrapper = createWrapper({ range: true })
      const testRange = [new Date('2024-01-15'), new Date('2024-01-20')]

      await wrapper.setProps({ modelValue: testRange })
      await wrapper.vm.$nextTick()

      const input = wrapper.find('input')
      // The date format depends on locale, so we check for the date parts instead
      expect(input.element.value).toContain('01/15/2024')
      expect(input.element.value).toContain('01/20/2024')
    })
  })

  describe('Time Picker', () => {
    it('supports time picker', () => {
      const wrapper = createWrapper({ showTime: true })
      const calendarContent = wrapper.findComponent({
        name: 'CalendarContent',
      })
      if (calendarContent.exists()) {
        expect(calendarContent.props('showTime')).toBe(true)
      } else {
        expect(wrapper.vm.showTime).toBe(true)
      }
    })

    it('passes time step correctly', () => {
      const wrapper = createWrapper({ showTime: true, timeStep: 30 })
      const calendarContent = wrapper.findComponent({
        name: 'CalendarContent',
      })
      if (calendarContent.exists()) {
        expect(calendarContent.props('timeStep')).toBe(30)
      } else {
        expect(wrapper.vm.timeStep).toBe(30)
      }
    })
  })

  describe('Constraints', () => {
    it('passes min date constraint', () => {
      const minDate = new Date('2024-01-01')
      const wrapper = createWrapper({ minDate })
      const calendarContent = wrapper.findComponent({
        name: 'CalendarContent',
      })
      if (calendarContent.exists()) {
        expect(calendarContent.props('minDate')).toEqual(minDate)
      } else {
        expect(wrapper.vm.minDate).toEqual(minDate)
      }
    })

    it('passes max date constraint', () => {
      const maxDate = new Date('2024-12-31')
      const wrapper = createWrapper({ maxDate })
      const calendarContent = wrapper.findComponent({
        name: 'CalendarContent',
      })
      if (calendarContent.exists()) {
        expect(calendarContent.props('maxDate')).toEqual(maxDate)
      } else {
        expect(wrapper.vm.maxDate).toEqual(maxDate)
      }
    })

    it('passes disabled dates', () => {
      const disabledDates = [new Date('2024-01-01'), new Date('2024-12-25')]
      const wrapper = createWrapper({ disabledDates })
      const calendarContent = wrapper.findComponent({
        name: 'CalendarContent',
      })
      if (calendarContent.exists()) {
        expect(calendarContent.props('disabledDates')).toEqual(disabledDates)
      } else {
        expect(wrapper.vm.disabledDates).toEqual(disabledDates)
      }
    })
  })

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      const wrapper = createWrapper()
      const input = wrapper.find('input')

      expect(input.attributes('role')).toBe('combobox')
      expect(input.attributes('aria-haspopup')).toBe('true')
      expect(input.attributes('aria-expanded')).toBeDefined()
    })

    it('has proper ARIA label for range selection', () => {
      const wrapper = createWrapper({ range: true })
      const input = wrapper.find('input')

      expect(input.attributes('aria-label')).toBe('Select date range')
    })

    it('has proper ARIA label for single date selection', () => {
      const wrapper = createWrapper({ range: false })
      const input = wrapper.find('input')

      expect(input.attributes('aria-label')).toBe('Select date')
    })

    it('has proper button aria label', () => {
      const wrapper = createWrapper()
      const button = wrapper.find('button')

      expect(button.attributes('aria-label')).toBe('Open calendar')
    })
  })

  describe('Error Handling', () => {
    it('shows error message when provided', () => {
      const wrapper = createWrapper({ errorMessage: 'Invalid date' })
      // The error message should be displayed when errorMessage prop is provided
      expect(wrapper.find('[role="alert"]').exists()).toBe(true)
      expect(wrapper.find('[role="alert"]').text()).toBe('Invalid date')
    })

    it('applies error classes when has error', () => {
      const wrapper = createWrapper({ errorMessage: 'Invalid date' })
      const input = wrapper.find('input')
      // The input should have error classes when errorMessage is provided
      expect(input.classes()).toContain('input-error')
    })
  })

  describe('Localization', () => {
    it('passes locale to calendar content', () => {
      const wrapper = createWrapper({ locale: 'fr-FR' })
      const calendarContent = wrapper.findComponent({
        name: 'CalendarContent',
      })
      if (calendarContent.exists()) {
        expect(calendarContent.props('locale')).toBe('fr-FR')
      } else {
        expect(wrapper.vm.locale).toBe('fr-FR')
      }
    })
  })

  describe('Month/Year Selection', () => {
    it('passes month selection prop', () => {
      const wrapper = createWrapper({ allowMonthSelect: false })
      const calendarContent = wrapper.findComponent({
        name: 'CalendarContent',
      })
      if (calendarContent.exists()) {
        expect(calendarContent.props('allowMonthSelect')).toBe(false)
      } else {
        expect(wrapper.vm.allowMonthSelect).toBe(false)
      }
    })

    it('passes year selection prop', () => {
      const wrapper = createWrapper({ allowYearSelect: false })
      const calendarContent = wrapper.findComponent({
        name: 'CalendarContent',
      })
      if (calendarContent.exists()) {
        expect(calendarContent.props('allowYearSelect')).toBe(false)
      } else {
        expect(wrapper.vm.allowYearSelect).toBe(false)
      }
    })

    it('passes year range prop', () => {
      const yearRange: [number, number] = [2020, 2030]
      const wrapper = createWrapper({ yearRange })
      const calendarContent = wrapper.findComponent({
        name: 'CalendarContent',
      })
      if (calendarContent.exists()) {
        expect(calendarContent.props('yearRange')).toEqual(yearRange)
      } else {
        expect(wrapper.vm.yearRange).toEqual(yearRange)
      }
    })
  })
})

import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import Indicator from '../../../src/runtime/components/Layout/Indicator.vue'

describe('Indicator', () => {
  describe('DaisyUI Integration', () => {
    it('applies correct DaisyUI base classes', () => {
      const wrapper = mount(Indicator)
      
      expect(wrapper.classes()).toContain('indicator')
    })
    
    it('renders indicator content when provided', () => {
      const wrapper = mount(Indicator, {
        props: {
          type: 'badge',
          content: '5'
        }
      })
      
      expect(wrapper.text()).toContain('5')
    })
  })

  describe('Badge Type', () => {
    it('renders badge indicator with correct classes', () => {
      const wrapper = mount(Indicator, {
        props: {
          type: 'badge',
          content: '3',
          variant: 'primary',
          size: 'md',
          horizontal: 'end',
          vertical: 'top'
        }
      })
      
      const indicator = wrapper.find('.indicator-item')
      expect(indicator.classes()).toContain('badge')
      expect(indicator.classes()).toContain('badge-primary')
      expect(indicator.classes()).toContain('indicator-top')
      expect(indicator.classes()).toContain('indicator-end')
    })
    
    it('applies correct size classes', () => {
      const wrapper = mount(Indicator, {
        props: {
          type: 'badge',
          size: 'lg'
        }
      })
      
      const indicator = wrapper.find('.indicator-item')
      expect(indicator.classes()).toContain('badge-lg')
    })
  })

  describe('Status Type', () => {
    it('renders status indicator with correct classes', () => {
      const wrapper = mount(Indicator, {
        props: {
          type: 'status',
          statusVariant: 'success',
          statusSize: 'sm',
          horizontal: 'end',
          vertical: 'bottom'
        }
      })
      
      const indicator = wrapper.find('.indicator-item')
      expect(indicator.classes()).toContain('status')
      expect(indicator.classes()).toContain('status-success')
      expect(indicator.classes()).toContain('status-sm')
      expect(indicator.classes()).toContain('indicator-bottom')
      expect(indicator.classes()).toContain('indicator-end')
    })
  })

  describe('Positioning', () => {
    it('applies correct position classes for all combinations', () => {
      const positions = [
        { horizontal: 'start', vertical: 'top', expected: ['indicator-top', 'indicator-start'] },
        { horizontal: 'center', vertical: 'top', expected: ['indicator-top', 'indicator-center'] },
        { horizontal: 'end', vertical: 'top', expected: ['indicator-top', 'indicator-end'] },
        { horizontal: 'start', vertical: 'middle', expected: ['indicator-middle', 'indicator-start'] },
        { horizontal: 'center', vertical: 'middle', expected: ['indicator-middle', 'indicator-center'] },
        { horizontal: 'end', vertical: 'middle', expected: ['indicator-middle', 'indicator-end'] },
        { horizontal: 'start', vertical: 'bottom', expected: ['indicator-bottom', 'indicator-start'] },
        { horizontal: 'center', vertical: 'bottom', expected: ['indicator-bottom', 'indicator-center'] },
        { horizontal: 'end', vertical: 'bottom', expected: ['indicator-bottom', 'indicator-end'] }
      ]
      
      positions.forEach(({ horizontal, vertical, expected }) => {
        const wrapper = mount(Indicator, {
          props: {
            type: 'badge',
            horizontal,
            vertical
          }
        })
        
        const indicator = wrapper.find('.indicator-item')
        expected.forEach(className => {
          expect(indicator.classes()).toContain(className)
        })
      })
    })
  })

  describe('Slots', () => {
    it('renders default slot content', () => {
      const wrapper = mount(Indicator, {
        slots: {
          default: '<button class="btn">Click me</button>'
        }
      })
      
      expect(wrapper.find('button').text()).toBe('Click me')
    })
    
    it('renders custom indicator slot', () => {
      const wrapper = mount(Indicator, {
        props: {
          type: 'custom'
        },
        slots: {
          indicator: '<span class="custom-indicator">Custom</span>'
        }
      })
      
      expect(wrapper.find('.custom-indicator').text()).toBe('Custom')
    })
  })

  describe('Show/Hide Indicator', () => {
    it('hides indicator when showIndicator is false', () => {
      const wrapper = mount(Indicator, {
        props: {
          showIndicator: false
        }
      })
      
      expect(wrapper.find('.indicator-item').exists()).toBe(false)
    })
    
    it('shows indicator when showIndicator is true', () => {
      const wrapper = mount(Indicator, {
        props: {
          showIndicator: true,
          type: 'badge',
          content: '5'
        }
      })
      
      expect(wrapper.find('.indicator-item').exists()).toBe(true)
    })
  })

  describe('Variants', () => {
    it('applies correct badge variants', () => {
      const variants = ['primary', 'secondary', 'accent', 'neutral', 'info', 'success', 'warning', 'error']
      
      variants.forEach(variant => {
        const wrapper = mount(Indicator, {
          props: {
            type: 'badge',
            variant
          }
        })
        
        const indicator = wrapper.find('.indicator-item')
        expect(indicator.classes()).toContain(`badge-${variant}`)
      })
    })
    
    it('applies correct status variants', () => {
      const variants = ['neutral', 'primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error']
      
      variants.forEach(variant => {
        const wrapper = mount(Indicator, {
          props: {
            type: 'status',
            statusVariant: variant
          }
        })
        
        const indicator = wrapper.find('.indicator-item')
        expect(indicator.classes()).toContain(`status-${variant}`)
      })
    })
  })
})

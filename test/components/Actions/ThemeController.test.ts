import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ThemeController from '../../../src/runtime/components/Actions/ThemeController.vue'

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: query.includes('dark'),
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

describe('ThemeController', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorageMock.getItem.mockReturnValue(null)
  })

  it('renders correctly with default props', () => {
    const wrapper = mount(ThemeController)

    expect(wrapper.classes()).toContain('theme-controller')
    expect(wrapper.find('button').exists()).toBe(true)
    expect(wrapper.find('button').classes()).toContain('btn')
  })

  it('applies variant classes correctly', () => {
    const variants = ['button', 'toggle', 'dropdown', 'radio'] as const

    variants.forEach((variant) => {
      const wrapper = mount(ThemeController, {
        props: { variant },
      })

      if (variant === 'button') {
        expect(wrapper.find('button').exists()).toBe(true)
      } else if (variant === 'toggle') {
        expect(wrapper.find('input[type="checkbox"]').exists()).toBe(true)
        expect(wrapper.find('input[type="checkbox"]').classes()).toContain('toggle')
      } else if (variant === 'dropdown') {
        expect(wrapper.find('select').exists()).toBe(true)
        expect(wrapper.find('select').classes()).toContain('select')
      } else if (variant === 'radio') {
        expect(wrapper.findAll('input[type="radio"]').length).toBeGreaterThan(0)
      }
    })
  })

  it('applies size classes correctly', () => {
    const sizes = ['xs', 'sm', 'lg'] as const

    sizes.forEach((size) => {
      const wrapper = mount(ThemeController, {
        props: { size, variant: 'button' },
      })

      expect(wrapper.find('button').classes()).toContain(`btn-${size}`)
    })

    // Test that medium (default) doesn't add a size class
    const mediumWrapper = mount(ThemeController, {
      props: { size: 'md', variant: 'button' },
    })
    expect(mediumWrapper.find('button').classes()).not.toContain('btn-md')
  })

  it('shows label when showLabel is true', () => {
    const wrapper = mount(ThemeController, {
      props: {
        variant: 'button',
        showLabel: true,
      },
    })

    expect(wrapper.text()).toContain('light') // Default theme
  })

  it('emits themeChange event when button is clicked', async () => {
    const wrapper = mount(ThemeController, {
      props: { variant: 'button' },
    })

    const initialEmissions = wrapper.emitted('themeChange')?.length || 0

    await wrapper.find('button').trigger('click')

    expect(wrapper.emitted('themeChange')).toBeTruthy()
    // Should have one more emission after clicking
    expect(wrapper.emitted('themeChange')?.length).toBeGreaterThan(initialEmissions)
  })

  it('emits themeChange event when toggle is changed', async () => {
    const wrapper = mount(ThemeController, {
      props: { variant: 'toggle' },
    })

    const initialEmissions = wrapper.emitted('themeChange')?.length || 0

    await wrapper.find('input[type="checkbox"]').trigger('change')

    expect(wrapper.emitted('themeChange')).toBeTruthy()
    // Should have one more emission after toggling
    expect(wrapper.emitted('themeChange')?.length).toBeGreaterThan(initialEmissions)
  })

  it('handles dropdown theme selection', async () => {
    const customThemes = [
      { value: 'light', label: 'Light' },
      { value: 'dark', label: 'Dark' },
      { value: 'cupcake', label: 'Cupcake' },
    ]

    const wrapper = mount(ThemeController, {
      props: {
        variant: 'dropdown',
        themes: customThemes,
      },
    })

    const select = wrapper.find('select')
    await select.setValue('cupcake')

    expect(wrapper.emitted('themeChange')).toBeTruthy()
    expect(wrapper.emitted('themeChange')?.[0]).toEqual(['cupcake'])
  })

  it('handles radio theme selection', async () => {
    const customThemes = [
      { value: 'light', label: 'Light' },
      { value: 'dark', label: 'Dark' },
    ]

    const wrapper = mount(ThemeController, {
      props: {
        variant: 'radio',
        themes: customThemes,
      },
    })

    const radioInputs = wrapper.findAll('input[type="radio"]')
    await radioInputs[1].trigger('change') // Select dark theme

    expect(wrapper.emitted('themeChange')).toBeTruthy()
    expect(wrapper.emitted('themeChange')?.[0]).toEqual(['dark'])
  })

  it('uses custom themes when provided', () => {
    const customThemes = [
      { value: 'custom1', label: 'Custom Theme 1' },
      { value: 'custom2', label: 'Custom Theme 2' },
    ]

    const wrapper = mount(ThemeController, {
      props: {
        variant: 'dropdown',
        themes: customThemes,
      },
    })

    const options = wrapper.findAll('option')
    expect(options).toHaveLength(2)
    expect(options[0].text()).toBe('Custom Theme 1')
    expect(options[1].text()).toBe('Custom Theme 2')
  })

  it('uses custom aria label', () => {
    const wrapper = mount(ThemeController, {
      props: {
        variant: 'button',
        ariaLabel: 'Switch theme mode',
      },
    })

    expect(wrapper.find('button').attributes('aria-label')).toBe('Switch theme mode')
  })

  it('renders custom icon slot content', () => {
    const wrapper = mount(ThemeController, {
      props: { variant: 'button' },
      slots: {
        icon: '<span class="custom-icon">🌙</span>',
      },
    })

    expect(wrapper.find('.custom-icon').exists()).toBe(true)
    expect(wrapper.text()).toContain('🌙')
  })
})

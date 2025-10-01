import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import StatusBox from '../../../src/runtime/components/DataDisplay/StatusBox.vue'

describe('StatusBox', () => {
  it('renders correctly with default props', () => {
    const wrapper = mount(StatusBox, {
      props: {
        title: 'Test Status',
        message: 'Test message',
      },
    })

    expect(wrapper.classes()).toContain('statusbox')
    expect(wrapper.text()).toContain('Test Status')
    expect(wrapper.text()).toContain('Test message')
  })

  it('applies variant classes correctly', () => {
    const variants = ['success', 'error', 'warning', 'info', 'pending', 'neutral'] as const

    variants.forEach((variant) => {
      const wrapper = mount(StatusBox, {
        props: {
          title: 'Test',
          variant,
        },
      })

      if (variant === 'success') {
        expect(wrapper.classes()).toContain('bg-success/10')
        expect(wrapper.classes()).toContain('border-success/20')
      } else if (variant === 'error') {
        expect(wrapper.classes()).toContain('bg-error/10')
        expect(wrapper.classes()).toContain('border-error/20')
      } else if (variant === 'warning') {
        expect(wrapper.classes()).toContain('bg-warning/10')
        expect(wrapper.classes()).toContain('border-warning/20')
      } else if (variant === 'info') {
        expect(wrapper.classes()).toContain('bg-info/10')
        expect(wrapper.classes()).toContain('border-info/20')
      } else if (variant === 'pending') {
        expect(wrapper.classes()).toContain('bg-base-200')
        expect(wrapper.classes()).toContain('border-base-300')
      } else {
        expect(wrapper.classes()).toContain('bg-base-100')
        expect(wrapper.classes()).toContain('border-base-300')
      }
    })
  })

  it('applies size classes correctly', () => {
    const sizes = ['sm', 'lg'] as const

    sizes.forEach((size) => {
      const wrapper = mount(StatusBox, {
        props: {
          title: 'Test',
          size,
        },
      })

      if (size === 'sm') {
        expect(wrapper.classes()).toContain('text-sm')
        expect(wrapper.classes()).toContain('p-3')
      } else if (size === 'lg') {
        expect(wrapper.classes()).toContain('text-lg')
        expect(wrapper.classes()).toContain('p-6')
      }
    })

    // Test that medium (default) uses different padding
    const mediumWrapper = mount(StatusBox, {
      props: {
        title: 'Test',
        size: 'md',
      },
    })
    expect(mediumWrapper.classes()).toContain('p-4')
  })

  it('shows indicator by default', () => {
    const wrapper = mount(StatusBox, {
      props: {
        title: 'Test',
        variant: 'success',
      },
    })

    const indicator = wrapper.findComponent({ name: 'Status' })
    expect(indicator.exists()).toBe(true)
    expect(indicator.props('variant')).toBe('success')
  })

  it('hides indicator when showIndicator is false', () => {
    const wrapper = mount(StatusBox, {
      props: {
        title: 'Test',
        variant: 'success',
        showIndicator: false,
      },
    })

    const indicator = wrapper.find('.w-2.h-2.bg-success.rounded-full')
    expect(indicator.exists()).toBe(false)
  })

  it('renders actions when provided', () => {
    const actions = [
      { label: 'Action 1', variant: 'primary' as const },
      { label: 'Action 2', variant: 'secondary' as const },
    ]

    const wrapper = mount(StatusBox, {
      props: {
        title: 'Test',
        actions,
      },
    })

    const buttons = wrapper.findAll('button')
    // Should have 2 action buttons (no dismiss button)
    expect(buttons.filter((b) => b.text().includes('Action')).length).toBe(2)
    expect(buttons[0].text()).toBe('Action 1')
    expect(buttons[1].text()).toBe('Action 2')
    expect(buttons[0].classes()).toContain('btn-primary')
    expect(buttons[1].classes()).toContain('btn-secondary')
  })

  it('renders dismiss button when dismissible is true', () => {
    const wrapper = mount(StatusBox, {
      props: {
        title: 'Test',
        dismissible: true,
      },
    })

    const dismissButton = wrapper.find('button[aria-label="Dismiss"]')
    expect(dismissButton.exists()).toBe(true)
  })

  it('emits dismiss event when dismiss button is clicked', async () => {
    const wrapper = mount(StatusBox, {
      props: {
        title: 'Test',
        dismissible: true,
      },
    })

    const dismissButton = wrapper.find('button[aria-label="Dismiss"]')
    await dismissButton.trigger('click')

    expect(wrapper.emitted('dismiss')).toBeTruthy()
  })

  it('emits actionClick event when action is clicked', async () => {
    const actions = [{ label: 'Test Action', variant: 'primary' as const }]

    const wrapper = mount(StatusBox, {
      props: {
        title: 'Test',
        actions,
      },
    })

    const actionButton = wrapper.find('button')
    await actionButton.trigger('click')

    expect(wrapper.emitted('actionClick')).toBeTruthy()
    expect(wrapper.emitted('actionClick')?.[0]).toEqual([actions[0], expect.any(Event)])
  })

  it('formats timestamp correctly', () => {
    const now = new Date()
    const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000)

    const wrapper = mount(StatusBox, {
      props: {
        title: 'Test',
        timestamp: fiveMinutesAgo,
      },
    })

    expect(wrapper.text()).toContain('5m ago')
  })

  it('renders custom title slot', () => {
    const wrapper = mount(StatusBox, {
      props: { message: 'Test message' },
      slots: {
        title: '<span class="custom-title">Custom Title</span>',
      },
    })

    expect(wrapper.find('.custom-title').exists()).toBe(true)
    expect(wrapper.text()).toContain('Custom Title')
  })

  it('renders custom indicator slot', () => {
    const wrapper = mount(StatusBox, {
      props: { title: 'Test' },
      slots: {
        indicator: '<div class="custom-indicator">🔔</div>',
      },
    })

    expect(wrapper.find('.custom-indicator').exists()).toBe(true)
    expect(wrapper.text()).toContain('🔔')
  })

  it('renders custom actions slot', () => {
    const wrapper = mount(StatusBox, {
      props: { title: 'Test' },
      slots: {
        actions: '<button class="custom-action">Custom Action</button>',
      },
    })

    expect(wrapper.find('.custom-action').exists()).toBe(true)
    expect(wrapper.text()).toContain('Custom Action')
  })

  it('does not emit action click for disabled actions', async () => {
    const actions = [{ label: 'Disabled Action', disabled: true }]

    const wrapper = mount(StatusBox, {
      props: {
        title: 'Test',
        actions,
      },
    })

    const actionButton = wrapper.find('button')
    await actionButton.trigger('click')

    expect(wrapper.emitted('actionClick')).toBeFalsy()
  })

  it('shows pending animation for pending variant', () => {
    const wrapper = mount(StatusBox, {
      props: {
        title: 'Test',
        variant: 'pending',
      },
    })

    const indicator = wrapper.findComponent({ name: 'Status' })
    expect(indicator.exists()).toBe(true)
    expect(indicator.props('animation')).toBe('pulse')
  })
})

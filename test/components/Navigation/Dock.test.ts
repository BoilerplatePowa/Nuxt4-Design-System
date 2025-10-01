import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Dock from '../../../src/runtime/components/Navigation/Dock.vue'

describe('Dock', () => {
  const sampleItems = [
    {
      id: 1,
      label: 'Item 1',
      icon: '📁',
    },
    {
      id: 2,
      label: 'Item 2',
      icon: '🌐',
      badge: '3',
    },
  ]

  it('renders correctly with default props', () => {
    const wrapper = mount(Dock, {
      props: { items: sampleItems },
    })

    expect(wrapper.classes()).toContain('dock')
    expect(wrapper.findAll('.dock-item')).toHaveLength(2)
  })

  it('applies position classes correctly', () => {
    const positions = ['bottom', 'top', 'left', 'right'] as const

    positions.forEach((position) => {
      const wrapper = mount(Dock, {
        props: {
          items: sampleItems,
          position,
        },
      })

      if (position === 'bottom') {
        expect(wrapper.classes()).toContain('bottom-4')
      } else if (position === 'top') {
        expect(wrapper.classes()).toContain('top-4')
      } else if (position === 'left') {
        expect(wrapper.classes()).toContain('left-4')
      } else if (position === 'right') {
        expect(wrapper.classes()).toContain('right-4')
      }
    })
  })

  it('applies variant classes correctly', () => {
    const variants = ['default', 'floating', 'glass'] as const

    variants.forEach((variant) => {
      const wrapper = mount(Dock, {
        props: {
          items: sampleItems,
          variant,
        },
      })

      const container = wrapper.find('.dock-container')

      if (variant === 'floating') {
        expect(container.classes()).toContain('bg-base-100')
        expect(container.classes()).toContain('shadow-lg')
        expect(container.classes()).toContain('border')
      } else if (variant === 'glass') {
        expect(container.classes()).toContain('bg-base-100/80')
        expect(container.classes()).toContain('backdrop-blur-md')
      } else {
        expect(container.classes()).toContain('bg-base-200')
      }
    })
  })

  it('applies size classes correctly', () => {
    const sizes = ['sm', 'lg'] as const

    sizes.forEach((size) => {
      const wrapper = mount(Dock, {
        props: {
          items: sampleItems,
          size,
        },
      })

      const iconElements = wrapper.findAll('.dock-item .relative.flex.items-center.justify-center')

      if (size === 'sm') {
        expect(iconElements[0].classes()).toContain('w-8')
        expect(iconElements[0].classes()).toContain('h-8')
      } else if (size === 'lg') {
        expect(iconElements[0].classes()).toContain('w-16')
        expect(iconElements[0].classes()).toContain('h-16')
      }
    })

    // Test that medium (default) uses w-12 h-12
    const mediumWrapper = mount(Dock, {
      props: {
        items: sampleItems,
        size: 'md',
      },
    })
    const iconElement = mediumWrapper.find('.dock-item .relative.flex.items-center.justify-center')
    expect(iconElement.classes()).toContain('w-12')
    expect(iconElement.classes()).toContain('h-12')
  })

  it('renders badges when provided', () => {
    const itemsWithBadges = [
      {
        id: 1,
        label: 'Item with badge',
        icon: '📧',
        badge: '5',
      },
    ]

    const wrapper = mount(Dock, {
      props: { items: itemsWithBadges },
    })

    const badge = wrapper.find('.badge')
    expect(badge.exists()).toBe(true)
    expect(badge.text()).toBe('5')
  })

  it('shows tooltips by default', () => {
    const wrapper = mount(Dock, {
      props: {
        items: sampleItems,
        showTooltips: true,
      },
    })

    const tooltips = wrapper.findAll('.absolute.z-10')
    expect(tooltips.length).toBeGreaterThan(0)
    expect(tooltips[0].text()).toBe('Item 1')
  })

  it('hides tooltips when showTooltips is false', () => {
    const wrapper = mount(Dock, {
      props: {
        items: sampleItems,
        showTooltips: false,
      },
    })

    const tooltips = wrapper.findAll('.absolute.z-10')
    expect(tooltips.length).toBe(0)
  })

  it('emits itemClick event when item is clicked', async () => {
    const wrapper = mount(Dock, {
      props: { items: sampleItems },
    })

    await wrapper.find('.dock-item').trigger('click')

    expect(wrapper.emitted('itemClick')).toBeTruthy()
    expect(wrapper.emitted('itemClick')?.[0]).toEqual([sampleItems[0], 0, expect.any(Event)])
  })

  it('emits itemHover event on mouse enter', async () => {
    const wrapper = mount(Dock, {
      props: { items: sampleItems },
    })

    await wrapper.find('.dock-item').trigger('mouseenter')

    expect(wrapper.emitted('itemHover')).toBeTruthy()
    expect(wrapper.emitted('itemHover')?.[0]).toEqual([sampleItems[0], 0])
  })

  it('emits itemLeave event on mouse leave', async () => {
    const wrapper = mount(Dock, {
      props: { items: sampleItems },
    })

    await wrapper.find('.dock-item').trigger('mouseleave')

    expect(wrapper.emitted('itemLeave')).toBeTruthy()
    expect(wrapper.emitted('itemLeave')?.[0]).toEqual([sampleItems[0], 0])
  })

  it('applies active state correctly', () => {
    const itemsWithActive = [
      {
        id: 1,
        label: 'Active Item',
        icon: '📁',
        active: true,
      },
      {
        id: 2,
        label: 'Inactive Item',
        icon: '🌐',
        active: false,
      },
    ]

    const wrapper = mount(Dock, {
      props: { items: itemsWithActive },
    })

    const dockItems = wrapper.findAll('.dock-item')
    expect(dockItems[0].classes()).toContain('bg-primary')
    expect(dockItems[1].classes()).not.toContain('bg-primary')
  })

  it('applies active state based on activeItem prop', () => {
    const wrapper = mount(Dock, {
      props: {
        items: sampleItems,
        activeItem: 2,
      },
    })

    const dockItems = wrapper.findAll('.dock-item')
    expect(dockItems[0].classes()).not.toContain('bg-primary')
    expect(dockItems[1].classes()).toContain('bg-primary')
  })

  it('applies disabled state correctly', () => {
    const itemsWithDisabled = [
      {
        id: 1,
        label: 'Disabled Item',
        icon: '📁',
        disabled: true,
      },
    ]

    const wrapper = mount(Dock, {
      props: { items: itemsWithDisabled },
    })

    const dockItem = wrapper.find('.dock-item')
    expect(dockItem.classes()).toContain('opacity-50')
    expect(dockItem.classes()).toContain('cursor-not-allowed')
  })

  it('does not emit events for disabled items', async () => {
    const itemsWithDisabled = [
      {
        id: 1,
        label: 'Disabled Item',
        icon: '📁',
        disabled: true,
      },
    ]

    const wrapper = mount(Dock, {
      props: { items: itemsWithDisabled },
    })

    await wrapper.find('.dock-item').trigger('click')
    await wrapper.find('.dock-item').trigger('mouseenter')
    await wrapper.find('.dock-item').trigger('mouseleave')

    expect(wrapper.emitted('itemClick')).toBeFalsy()
    expect(wrapper.emitted('itemHover')).toBeFalsy()
    expect(wrapper.emitted('itemLeave')).toBeFalsy()
  })

  it('applies animation classes when animated is true', () => {
    const wrapper = mount(Dock, {
      props: {
        items: sampleItems,
        animated: true,
      },
    })

    const dockItem = wrapper.find('.dock-item')
    expect(dockItem.classes()).toContain('transition-all')
    expect(dockItem.classes()).toContain('duration-200')
  })

  it('applies vertical layout for left and right positions', () => {
    const leftWrapper = mount(Dock, {
      props: {
        items: sampleItems,
        position: 'left',
      },
    })

    const rightWrapper = mount(Dock, {
      props: {
        items: sampleItems,
        position: 'right',
      },
    })

    expect(leftWrapper.find('.dock-container').classes()).toContain('flex-col')
    expect(rightWrapper.find('.dock-container').classes()).toContain('flex-col')
  })

  it('renders custom item slot content', () => {
    const wrapper = mount(Dock, {
      props: { items: sampleItems },
      slots: {
        item: '<div class="custom-item">Custom Item</div>',
      },
    })

    expect(wrapper.find('.custom-item').exists()).toBe(true)
    expect(wrapper.text()).toContain('Custom Item')
  })
})

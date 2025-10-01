import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import List from '../../../src/runtime/components/DataDisplay/List.vue'

describe('List', () => {
  const sampleItems = [
    {
      id: 1,
      title: 'Item 1',
      subtitle: 'Subtitle 1',
      description: 'Description 1',
    },
    {
      id: 2,
      title: 'Item 2',
      subtitle: 'Subtitle 2',
      description: 'Description 2',
    },
  ]

  it('renders correctly with default props', () => {
    const wrapper = mount(List, {
      props: { items: sampleItems },
    })

    expect(wrapper.classes()).toContain('list')
    expect(wrapper.findAll('.list-item')).toHaveLength(2)
  })

  it('applies variant classes correctly', () => {
    const variants = ['bordered', 'hover', 'zebra'] as const

    variants.forEach((variant) => {
      const wrapper = mount(List, {
        props: {
          items: sampleItems,
          variant,
        },
      })

      expect(wrapper.classes()).toContain(`list-${variant}`)
    })
  })

  it('applies size classes correctly', () => {
    const sizes = ['sm', 'lg'] as const

    sizes.forEach((size) => {
      const wrapper = mount(List, {
        props: {
          items: sampleItems,
          size,
        },
      })

      expect(wrapper.classes()).toContain(`list-${size}`)
    })

    // Test that medium (default) doesn't add a size class
    const mediumWrapper = mount(List, {
      props: {
        items: sampleItems,
        size: 'md',
      },
    })
    expect(mediumWrapper.classes()).not.toContain('list-md')
  })

  it('renders item content correctly', () => {
    const itemsWithContent = [
      {
        id: 1,
        title: 'Test Title',
        subtitle: 'Test Subtitle',
        description: 'Test Description',
        badge: 'Test Badge',
        meta: 'Test Meta',
      },
    ]

    const wrapper = mount(List, {
      props: { items: itemsWithContent },
    })

    expect(wrapper.text()).toContain('Test Title')
    expect(wrapper.text()).toContain('Test Subtitle')
    expect(wrapper.text()).toContain('Test Description')
    expect(wrapper.text()).toContain('Test Badge')
    expect(wrapper.text()).toContain('Test Meta')
  })

  it('renders avatar when provided', () => {
    const itemsWithAvatar = [
      {
        id: 1,
        title: 'Test Item',
        avatar: 'https://example.com/avatar.jpg',
        avatarAlt: 'Test Avatar',
      },
    ]

    const wrapper = mount(List, {
      props: { items: itemsWithAvatar },
    })

    const img = wrapper.find('img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe('https://example.com/avatar.jpg')
    expect(img.attributes('alt')).toBe('Test Avatar')
  })

  it('renders actions when provided', () => {
    const itemsWithActions = [
      {
        id: 1,
        title: 'Test Item',
        actions: [
          { label: 'Action 1', variant: 'primary' as const },
          { label: 'Action 2', variant: 'secondary' as const },
        ],
      },
    ]

    const wrapper = mount(List, {
      props: { items: itemsWithActions },
    })

    const buttons = wrapper.findAll('button')
    expect(buttons).toHaveLength(2)
    expect(buttons[0].text()).toBe('Action 1')
    expect(buttons[1].text()).toBe('Action 2')
    expect(buttons[0].classes()).toContain('btn-primary')
    expect(buttons[1].classes()).toContain('btn-secondary')
  })

  it('emits itemClick event when item is clicked', async () => {
    const wrapper = mount(List, {
      props: {
        items: sampleItems,
        clickable: true,
      },
    })

    await wrapper.find('.list-item').trigger('click')

    expect(wrapper.emitted('itemClick')).toBeTruthy()
    expect(wrapper.emitted('itemClick')?.[0]).toEqual([sampleItems[0], 0, expect.any(Event)])
  })

  it('emits actionClick event when action is clicked', async () => {
    const itemsWithActions = [
      {
        id: 1,
        title: 'Test Item',
        actions: [{ label: 'Test Action', variant: 'primary' as const }],
      },
    ]

    const wrapper = mount(List, {
      props: { items: itemsWithActions },
    })

    await wrapper.find('button').trigger('click')

    expect(wrapper.emitted('actionClick')).toBeTruthy()
    expect(wrapper.emitted('actionClick')?.[0]).toEqual([
      itemsWithActions[0].actions[0],
      itemsWithActions[0],
      0,
      expect.any(Event),
    ])
  })

  it('shows empty state when no items', () => {
    const wrapper = mount(List, {
      props: {
        items: [],
        showEmpty: true,
      },
    })

    expect(wrapper.text()).toContain('No items found')
  })

  it('hides empty state when showEmpty is false', () => {
    const wrapper = mount(List, {
      props: {
        items: [],
        showEmpty: false,
      },
    })

    expect(wrapper.text()).not.toContain('No items found')
  })

  it('renders custom empty state slot', () => {
    const wrapper = mount(List, {
      props: {
        items: [],
        showEmpty: true,
      },
      slots: {
        empty: '<div class="custom-empty">Custom empty message</div>',
      },
    })

    expect(wrapper.find('.custom-empty').exists()).toBe(true)
    expect(wrapper.text()).toContain('Custom empty message')
  })

  it('applies selected state correctly', () => {
    const selectedItems = [
      {
        id: 1,
        title: 'Selected Item',
        selected: true,
      },
      {
        id: 2,
        title: 'Unselected Item',
        selected: false,
      },
    ]

    const wrapper = mount(List, {
      props: { items: selectedItems },
    })

    const listItems = wrapper.findAll('.list-item')
    expect(listItems[0].classes()).toContain('bg-primary')
    expect(listItems[1].classes()).not.toContain('bg-primary')
  })

  it('applies disabled state correctly', () => {
    const disabledItems = [
      {
        id: 1,
        title: 'Disabled Item',
        disabled: true,
      },
    ]

    const wrapper = mount(List, {
      props: { items: disabledItems },
    })

    const listItem = wrapper.find('.list-item')
    expect(listItem.classes()).toContain('opacity-50')
    expect(listItem.classes()).toContain('cursor-not-allowed')
  })

  it('does not emit click events for disabled items', async () => {
    const disabledItems = [
      {
        id: 1,
        title: 'Disabled Item',
        disabled: true,
      },
    ]

    const wrapper = mount(List, {
      props: {
        items: disabledItems,
        clickable: true,
      },
    })

    await wrapper.find('.list-item').trigger('click')

    expect(wrapper.emitted('itemClick')).toBeFalsy()
  })
})

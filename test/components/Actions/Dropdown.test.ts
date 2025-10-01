import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Dropdown from '../../../src/runtime/components/Actions/Dropdown.vue'

describe('Dropdown', () => {
  it('renders correctly with default props', () => {
    const wrapper = mount(Dropdown, {
      slots: {
        trigger: '<button>Trigger</button>',
        default: '<li><a>Item 1</a></li>',
      },
    })

    expect(wrapper.find('button').text()).toBe('Trigger')
    expect(wrapper.classes()).toContain('dropdown')
  })

  it('applies position classes correctly', () => {
    const positions = ['top', 'left', 'right'] as const

    positions.forEach((position) => {
      const wrapper = mount(Dropdown, {
        props: { position },
        slots: {
          trigger: '<button>Trigger</button>',
          default: '<li><a>Item</a></li>',
        },
      })

      expect(wrapper.classes()).toContain(`dropdown-${position}`)
    })

    // Test that bottom (default) doesn't add a class
    const bottomWrapper = mount(Dropdown, {
      props: { position: 'bottom' },
      slots: {
        trigger: '<button>Trigger</button>',
        default: '<li><a>Item</a></li>',
      },
    })
    expect(bottomWrapper.classes()).not.toContain('dropdown-bottom')
  })

  it('applies align classes correctly', () => {
    const aligns = ['start', 'end'] as const

    aligns.forEach((align) => {
      const wrapper = mount(Dropdown, {
        props: { align },
        slots: {
          trigger: '<button>Trigger</button>',
          default: '<li><a>Item</a></li>',
        },
      })

      if (align === 'end') {
        expect(wrapper.classes()).toContain('dropdown-end')
      }
    })
  })

  it('applies hover class when hover prop is true', () => {
    const wrapper = mount(Dropdown, {
      props: { hover: true },
      slots: {
        trigger: '<button>Trigger</button>',
        default: '<li><a>Item</a></li>',
      },
    })

    expect(wrapper.classes()).toContain('dropdown-hover')
  })

  it('applies open class when forceOpen prop is true', () => {
    const wrapper = mount(Dropdown, {
      props: { forceOpen: true },
      slots: {
        trigger: '<button>Trigger</button>',
        default: '<li><a>Item</a></li>',
      },
    })

    expect(wrapper.classes()).toContain('dropdown-open')
  })

  it('renders menu items correctly', () => {
    const wrapper = mount(Dropdown, {
      slots: {
        trigger: '<button>Menu</button>',
        default: `
          <li><a href="#">Item 1</a></li>
          <li><a href="#">Item 2</a></li>
          <li><a href="#">Item 3</a></li>
        `,
      },
    })

    const menuItems = wrapper.findAll('li')
    expect(menuItems).toHaveLength(3)
    expect(menuItems[0].text()).toBe('Item 1')
    expect(menuItems[1].text()).toBe('Item 2')
    expect(menuItems[2].text()).toBe('Item 3')
  })

  it('renders trigger slot content', () => {
    const wrapper = mount(Dropdown, {
      slots: {
        trigger: '<button class="custom-trigger">Custom Trigger</button>',
        default: '<li><a>Item</a></li>',
      },
    })

    expect(wrapper.find('.custom-trigger').exists()).toBe(true)
    expect(wrapper.find('.custom-trigger').text()).toBe('Custom Trigger')
  })

  it('renders dropdown content slot', () => {
    const wrapper = mount(Dropdown, {
      slots: {
        trigger: '<button>Trigger</button>',
        default: '<li><a class="custom-item">Custom Item</a></li>',
      },
    })

    expect(wrapper.find('.custom-item').exists()).toBe(true)
    expect(wrapper.find('.custom-item').text()).toBe('Custom Item')
  })
})

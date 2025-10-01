import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Kbd from '../../../src/runtime/components/DataDisplay/Kbd.vue'

describe('Kbd', () => {
  it('renders with keyText prop', () => {
    const wrapper = mount(Kbd, {
      props: {
        keyText: 'Enter',
      },
    })

    expect(wrapper.find('kbd').exists()).toBe(true)
    expect(wrapper.text()).toContain('Enter')
  })

  it('renders with slot content', () => {
    const wrapper = mount(Kbd, {
      slots: {
        default: 'Custom Key',
      },
    })

    expect(wrapper.text()).toContain('Custom Key')
  })

  it('applies correct size classes', () => {
    const wrapper = mount(Kbd, {
      props: {
        keyText: 'Ctrl',
        size: 'lg',
      },
    })

    expect(wrapper.find('kbd').classes()).toContain('kbd-lg')
  })

  it('applies correct variant classes', () => {
    const wrapper = mount(Kbd, {
      props: {
        keyText: 'Shift',
        variant: 'primary',
      },
    })

    expect(wrapper.find('kbd').classes()).toContain('btn-primary')
  })

  it('renders with default props', () => {
    const wrapper = mount(Kbd, {
      props: {
        keyText: 'Space',
      },
    })

    expect(wrapper.find('kbd').classes()).toContain('kbd')
    expect(wrapper.text()).toContain('Space')
  })

  it('prioritizes slot content over keyText prop', () => {
    const wrapper = mount(Kbd, {
      props: {
        keyText: 'Enter',
      },
      slots: {
        default: 'Custom Text',
      },
    })

    expect(wrapper.text()).toContain('Custom Text')
    expect(wrapper.text()).not.toContain('Enter')
  })

  it('displays keyText correctly with variants (Game Controls scenario)', () => {
    const wrapper = mount(Kbd, {
      props: {
        keyText: 'W',
        size: 'sm',
        variant: 'primary',
      },
    })

    expect(wrapper.find('kbd').classes()).toContain('btn-primary')
    expect(wrapper.find('kbd').classes()).toContain('kbd-sm')
    expect(wrapper.text()).toContain('W')
  })

  it('displays multiple keyText values correctly', () => {
    const wrapper = mount(Kbd, {
      props: {
        keyText: 'Space',
        size: 'sm',
        variant: 'accent',
      },
    })

    expect(wrapper.find('kbd').classes()).toContain('btn-accent')
    expect(wrapper.find('kbd').classes()).toContain('kbd-sm')
    expect(wrapper.text()).toContain('Space')
  })
})

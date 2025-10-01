import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Label from '../../../src/runtime/components/DataInput/Label.vue'

describe('Label', () => {
  it('renders correctly with default props', () => {
    const wrapper = mount(Label, {
      props: { text: 'Test Label' },
    })

    expect(wrapper.classes()).toContain('label')
    expect(wrapper.find('.label-text').text()).toBe('Test Label')
  })

  it('renders as different HTML tags', () => {
    const tags = ['label', 'div', 'span'] as const

    tags.forEach((tag) => {
      const wrapper = mount(Label, {
        props: { tag, text: 'Test' },
      })

      expect(wrapper.element.tagName.toLowerCase()).toBe(tag)
    })
  })

  it('applies htmlFor attribute to label tag', () => {
    const wrapper = mount(Label, {
      props: {
        text: 'Test Label',
        htmlFor: 'test-input',
      },
    })

    expect(wrapper.attributes('for')).toBe('test-input')
  })

  it('displays alt text when provided', () => {
    const wrapper = mount(Label, {
      props: {
        text: 'Main Text',
        altText: 'Alt Text',
      },
    })

    expect(wrapper.find('.label-text').text()).toBe('Main Text')
    expect(wrapper.find('.label-text-alt').text()).toBe('Alt Text')
  })

  it('applies cursor classes correctly', () => {
    const cursors = ['pointer', 'not-allowed'] as const

    cursors.forEach((cursor) => {
      const wrapper = mount(Label, {
        props: { cursor, text: 'Test' },
      })

      expect(wrapper.classes()).toContain(`cursor-${cursor}`)
    })

    // Test default cursor doesn't add class
    const defaultWrapper = mount(Label, {
      props: { cursor: 'default', text: 'Test' },
    })
    expect(defaultWrapper.classes()).not.toContain('cursor-default')
  })

  it('applies size classes correctly', () => {
    const sizes = ['sm', 'lg'] as const

    sizes.forEach((size) => {
      const wrapper = mount(Label, {
        props: { size, text: 'Test' },
      })

      expect(wrapper.classes()).toContain(`text-${size}`)
    })

    // Test medium (default) doesn't add class
    const mediumWrapper = mount(Label, {
      props: { size: 'md', text: 'Test' },
    })
    expect(mediumWrapper.classes()).not.toContain('text-md')
  })

  it('renders slot content', () => {
    const wrapper = mount(Label, {
      slots: {
        default: '<span class="custom-content">Custom label content</span>',
      },
    })

    expect(wrapper.find('.custom-content').exists()).toBe(true)
    expect(wrapper.text()).toContain('Custom label content')
  })

  it('renders start and end slots', () => {
    const wrapper = mount(Label, {
      props: { text: 'Main Label' },
      slots: {
        start: '<span class="start-slot">Start</span>',
        end: '<span class="end-slot">End</span>',
      },
    })

    expect(wrapper.find('.start-slot').exists()).toBe(true)
    expect(wrapper.find('.end-slot').exists()).toBe(true)
    expect(wrapper.text()).toContain('Start')
    expect(wrapper.text()).toContain('Main Label')
    expect(wrapper.text()).toContain('End')
  })
})

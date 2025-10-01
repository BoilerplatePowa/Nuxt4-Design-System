import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Join from '../../../src/runtime/components/Layout/Join.vue'

describe('Join', () => {
    it('renders correctly with default props', () => {
        const wrapper = mount(Join, {
            slots: {
                default: '<button class="btn join-item">Test</button>',
            },
        })

        expect(wrapper.classes()).toContain('join')
        expect(wrapper.find('.join-item').exists()).toBe(true)
    })

    it('applies vertical orientation class', () => {
        const wrapper = mount(Join, {
            props: { orientation: 'vertical' },
            slots: {
                default: '<button class="btn join-item">Test</button>',
            },
        })

        expect(wrapper.classes()).toContain('join-vertical')
    })

    it('does not apply orientation class for horizontal', () => {
        const wrapper = mount(Join, {
            props: { orientation: 'horizontal' },
            slots: {
                default: '<button class="btn join-item">Test</button>',
            },
        })

        expect(wrapper.classes()).not.toContain('join-horizontal')
        expect(wrapper.classes()).toContain('join')
    })

    it('applies rounded variant class', () => {
        const wrapper = mount(Join, {
            props: { variant: 'rounded' },
            slots: {
                default: '<button class="btn join-item">Test</button>',
            },
        })

        expect(wrapper.classes()).toContain('join-rounded')
    })

    it('renders multiple join items', () => {
        const wrapper = mount(Join, {
            slots: {
                default: `
          <button class="btn join-item">Button 1</button>
          <button class="btn join-item">Button 2</button>
          <button class="btn join-item">Button 3</button>
        `,
            },
        })

        const joinItems = wrapper.findAll('.join-item')
        expect(joinItems).toHaveLength(3)
        expect(joinItems[0].text()).toBe('Button 1')
        expect(joinItems[1].text()).toBe('Button 2')
        expect(joinItems[2].text()).toBe('Button 3')
    })
})

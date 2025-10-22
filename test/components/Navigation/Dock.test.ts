import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Dock from '../../../src/runtime/components/Navigation/Dock.vue'

describe('Dock', () => {
    const sampleItems = [
        {
            id: 'home',
            label: 'Home',
            svg: '<svg class="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="currentColor" stroke-linejoin="miter" stroke-linecap="butt"><polyline points="1 11 12 2 23 11" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"></polyline><path d="m5,13v7c0,1.105.895,2,2,2h10c1.105,0,2-.895,2-2v-7" fill="none" stroke="currentColor" stroke-linecap="square" stroke-miterlimit="10" stroke-width="2"></path><line x1="12" y1="22" x2="12" y2="18" fill="none" stroke="currentColor" stroke-linecap="square" stroke-miterlimit="10" stroke-width="2"></line></g></svg>',
        },
        {
            id: 'inbox',
            label: 'Inbox',
            svg: '<svg class="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="currentColor" stroke-linejoin="miter" stroke-linecap="butt"><polyline points="3 14 9 14 9 17 15 17 15 14 21 14" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"></polyline><rect x="3" y="3" width="18" height="18" rx="2" ry="2" fill="none" stroke="currentColor" stroke-linecap="square" stroke-miterlimit="10" stroke-width="2"></rect></g></svg>',
        },
    ]

    it('renders correctly with default props', () => {
        const wrapper = mount(Dock, {
            props: { items: sampleItems },
        })

        expect(wrapper.classes()).toContain('dock')
        expect(wrapper.findAll('button')).toHaveLength(2)
    })

    it('applies size classes correctly', () => {
        const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const

        sizes.forEach((size) => {
            const wrapper = mount(Dock, {
                props: {
                    items: sampleItems,
                    size,
                },
            })

            expect(wrapper.classes()).toContain(`dock-${size}`)
        })
    })

    it('renders labels correctly', () => {
        const wrapper = mount(Dock, {
            props: { items: sampleItems },
        })

        const labels = wrapper.findAll('.dock-label')
        expect(labels).toHaveLength(2)
        expect(labels[0].text()).toBe('Home')
        expect(labels[1].text()).toBe('Inbox')
    })

    it('emits itemClick event when item is clicked', async () => {
        const wrapper = mount(Dock, {
            props: { items: sampleItems },
        })

        await wrapper.find('button').trigger('click')

        expect(wrapper.emitted('itemClick')).toBeTruthy()
        expect(wrapper.emitted('itemClick')?.[0]).toEqual([sampleItems[0], 0, expect.any(Event)])
    })

    it('applies active state correctly', () => {
        const itemsWithActive = [
            {
                id: 'home',
                label: 'Home',
                svg: '<svg></svg>',
                active: true,
            },
            {
                id: 'inbox',
                label: 'Inbox',
                svg: '<svg></svg>',
                active: false,
            },
        ]

        const wrapper = mount(Dock, {
            props: { items: itemsWithActive },
        })

        const buttons = wrapper.findAll('button')
        expect(buttons[0].classes()).toContain('dock-active')
        expect(buttons[1].classes()).not.toContain('dock-active')
    })

    it('applies active state based on activeItem prop', () => {
        const wrapper = mount(Dock, {
            props: {
                items: sampleItems,
                activeItem: 'inbox',
            },
        })

        const buttons = wrapper.findAll('button')
        expect(buttons[0].classes()).not.toContain('dock-active')
        expect(buttons[1].classes()).toContain('dock-active')
    })

    it('applies disabled state correctly', () => {
        const itemsWithDisabled = [
            {
                id: 'disabled',
                label: 'Disabled Item',
                svg: '<svg></svg>',
                disabled: true,
            },
        ]

        const wrapper = mount(Dock, {
            props: { items: itemsWithDisabled },
        })

        const button = wrapper.find('button')
        expect(button.attributes('disabled')).toBeDefined()
    })

    it('does not emit events for disabled items', async () => {
        const itemsWithDisabled = [
            {
                id: 'disabled',
                label: 'Disabled Item',
                svg: '<svg></svg>',
                disabled: true,
            },
        ]

        const wrapper = mount(Dock, {
            props: { items: itemsWithDisabled },
        })

        await wrapper.find('button').trigger('click')

        expect(wrapper.emitted('itemClick')).toBeFalsy()
    })

    it('renders SVG content correctly', () => {
        const wrapper = mount(Dock, {
            props: { items: sampleItems },
        })

        const svgElements = wrapper.findAll('svg')
        expect(svgElements).toHaveLength(2)
    })
})

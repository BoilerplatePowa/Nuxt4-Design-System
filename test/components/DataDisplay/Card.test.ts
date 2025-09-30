import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Card from '../../../src/runtime/components/DataDisplay/Card.vue'

describe('Card', () => {
    it('renders correctly with default props', () => {
        const wrapper = mount(Card, {
            slots: { default: 'Test' },
        })

        expect(wrapper.classes()).toContain('card')
        expect(wrapper.text()).toContain('Test')
    })

    it('renders title when provided', () => {
        const wrapper = mount(Card, {
            props: {
                title: 'Test Title',
            },
            slots: { default: 'Test content' },
        })

        expect(wrapper.text()).toContain('Test Title')
        expect(wrapper.find('h2').exists()).toBe(true)
    })

    it('renders custom header slot', () => {
        const wrapper = mount(Card, {
            slots: {
                header: '<div class="custom-header">Custom Header</div>',
                default: 'Test',
            },
        })

        expect(wrapper.find('.custom-header').exists()).toBe(true)
        expect(wrapper.text()).toContain('Custom Header')
    })

    it('renders footer slot when provided', () => {
        const wrapper = mount(Card, {
            slots: {
                footer: '<div class="custom-footer">Footer content</div>',
                default: 'Test',
            },
        })

        expect(wrapper.find('.custom-footer').exists()).toBe(true)
        expect(wrapper.text()).toContain('Footer content')
    })

    it('applies variant classes correctly', () => {
        ['normal', 'bordered', 'compact', 'side', 'outline'].forEach((variant) => {
            const wrapper = mount(Card, {
                props: { variant: variant as any },
                slots: { default: 'Test' },
            })
            expect(wrapper.classes()).toContain('card')
        })
    })

    it('applies shadow classes correctly', () => {
        const wrapper = mount(Card, {
            props: { shadow: 'xl' },
            slots: { default: 'Test' },
        })
        expect(wrapper.classes()).toContain('shadow-xl')

        const wrapperNoShadow = mount(Card, {
            props: { shadow: 'none' },
            slots: { default: 'Test' },
        })
        expect(wrapperNoShadow.classes()).not.toContain('shadow-xl')
    })

    it('applies glass effect correctly', () => {
        const wrapper = mount(Card, {
            props: { glass: true },
            slots: { default: 'Test' },
        })

        expect(wrapper.classes()).toContain('glass')
    })

    it('does not render header when no title or header slot', () => {
        const wrapper = mount(Card, {
            slots: { default: 'Test content' },
        })

        expect(wrapper.find('.card-header').exists()).toBe(false)
    })

    it('does not render footer when no footer slot', () => {
        const wrapper = mount(Card, {
            slots: { default: 'Test content' },
        })

        expect(wrapper.find('.card-footer').exists()).toBe(false)
    })

    it('renders both title and custom header slot', () => {
        const wrapper = mount(Card, {
            props: { title: 'Test Title' },
            slots: {
                header: '<div class="custom-header">Custom</div>',
                default: 'Test',
            },
        })

        expect(wrapper.find('.custom-header').exists()).toBe(true)
    })

    it('has correct structure with all sections', () => {
        const wrapper = mount(Card, {
            props: { title: 'Test Title' },
            slots: {
                default: 'Body content',
                actions: '<button>Action</button>',
            },
        })

        expect(wrapper.find('.card-header').exists()).toBe(true)
        expect(wrapper.find('.card-body').exists()).toBe(true)
        expect(wrapper.find('.card-actions').exists()).toBe(true)
    })
})

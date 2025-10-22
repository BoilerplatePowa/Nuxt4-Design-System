import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import Stack from '../../../src/runtime/components/Layout/Stack.vue'

describe('Stack', () => {
    describe('DaisyUI Integration', () => {
        it('applies correct DaisyUI base classes', () => {
            const wrapper = mount(Stack)

            expect(wrapper.classes()).toContain('stack')
            expect(wrapper.classes()).toContain('stack-bottom')
        })

        it('applies custom modifier class', () => {
            const wrapper = mount(Stack, {
                props: { modifier: 'stack-top' }
            })

            expect(wrapper.classes()).toContain('stack')
            expect(wrapper.classes()).toContain('stack-top')
        })

        it('applies custom class', () => {
            const wrapper = mount(Stack, {
                props: { class: 'h-20 w-32' }
            })

            expect(wrapper.classes()).toContain('stack')
            expect(wrapper.classes()).toContain('stack-bottom')
            expect(wrapper.classes()).toContain('h-20')
            expect(wrapper.classes()).toContain('w-32')
        })
    })

    describe('rendering', () => {
        it('renders slot content', () => {
            const wrapper = mount(Stack, {
                slots: { default: 'Stack content' }
            })
            expect(wrapper.text()).toBe('Stack content')
        })

        it('renders multiple children', () => {
            const wrapper = mount(Stack, {
                slots: {
                    default: [
                        '<div>Item 1</div>',
                        '<div>Item 2</div>',
                        '<div>Item 3</div>'
                    ]
                }
            })
            
            expect(wrapper.findAll('div')).toHaveLength(4) // 3 slot divs + wrapper div
        })
    })

    describe('props', () => {
        it('accepts valid modifier values', () => {
            const validModifiers = ['stack-top', 'stack-bottom', 'stack-start', 'stack-end']
            
            validModifiers.forEach(modifier => {
                const wrapper = mount(Stack, {
                    props: { modifier }
                })
                expect(wrapper.classes()).toContain(modifier)
            })
        })

        it('uses default modifier when not provided', () => {
            const wrapper = mount(Stack)
            expect(wrapper.classes()).toContain('stack-bottom')
        })
    })

    describe('accessibility', () => {
        it('renders as a div element', () => {
            const wrapper = mount(Stack)
            expect(wrapper.element.tagName).toBe('DIV')
        })

        it('preserves custom attributes', () => {
            const wrapper = mount(Stack, {
                attrs: {
                    'data-testid': 'stack-component',
                    'aria-label': 'Stack container'
                }
            })

            expect(wrapper.attributes('data-testid')).toBe('stack-component')
            expect(wrapper.attributes('aria-label')).toBe('Stack container')
        })
    })
})

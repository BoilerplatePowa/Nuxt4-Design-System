import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import Mask from '../../../src/runtime/components/Layout/Mask.vue'

describe('Mask', () => {
    beforeEach(() => {
        // Clear any previous test state
    })

    describe('DaisyUI Integration', () => {
        it('applies correct DaisyUI base classes', () => {
            const wrapper = mount(Mask)

            expect(wrapper.classes()).toContain('mask')
            expect(wrapper.classes()).toContain('mask-squircle')
        })

        it('applies correct variant classes', () => {
            const variants = [
                'squircle',
                'heart',
                'hexagon',
                'hexagon-2',
                'decagon',
                'pentagon',
                'diamond',
                'square',
                'circle',
                'star',
                'star-2',
                'triangle',
                'triangle-2',
                'triangle-3',
                'triangle-4',
            ]

            variants.forEach((variant) => {
                const wrapper = mount(Mask, {
                    props: { variant },
                })

                expect(wrapper.classes()).toContain('mask')
                expect(wrapper.classes()).toContain(`mask-${variant}`)
            })
        })

        it('applies half mask modifiers correctly', () => {
            const wrapper1 = mount(Mask, {
                props: { isHalf1: true },
            })
            expect(wrapper1.classes()).toContain('mask-half-1')

            const wrapper2 = mount(Mask, {
                props: { isHalf2: true },
            })
            expect(wrapper2.classes()).toContain('mask-half-2')

            const wrapper3 = mount(Mask, {
                props: { isHalf1: true, isHalf2: true },
            })
            expect(wrapper3.classes()).toContain('mask-half-1')
            expect(wrapper3.classes()).toContain('mask-half-2')
        })
    })

    describe('Size variants', () => {
        it('applies correct size classes', () => {
            const sizeMap = {
                xs: ['w-12', 'h-12'],
                sm: ['w-16', 'h-16'],
                md: ['w-20', 'h-20'],
                lg: ['w-24', 'h-24'],
                xl: ['w-32', 'h-32'],
            }

            Object.entries(sizeMap).forEach(([size, expectedClasses]) => {
                const wrapper = mount(Mask, {
                    props: { size: size as any },
                })

                expectedClasses.forEach((className) => {
                    expect(wrapper.classes()).toContain(className)
                })
            })
        })
    })

    describe('Custom classes', () => {
        it('applies custom classes', () => {
            const wrapper = mount(Mask, {
                props: { class: 'custom-class' },
            })

            expect(wrapper.classes()).toContain('custom-class')
        })

        it('combines custom classes with DaisyUI classes', () => {
            const wrapper = mount(Mask, {
                props: {
                    variant: 'circle',
                    size: 'lg',
                    class: 'custom-class',
                },
            })

            expect(wrapper.classes()).toContain('mask')
            expect(wrapper.classes()).toContain('mask-circle')
            expect(wrapper.classes()).toContain('w-24')
            expect(wrapper.classes()).toContain('h-24')
            expect(wrapper.classes()).toContain('custom-class')
        })
    })

    describe('Slot content', () => {
        it('renders slot content', () => {
            const wrapper = mount(Mask, {
                slots: {
                    default: '<img src="test.jpg" alt="Test" />',
                },
            })

            expect(wrapper.find('img').exists()).toBe(true)
            expect(wrapper.find('img').attributes('src')).toBe('test.jpg')
            expect(wrapper.find('img').attributes('alt')).toBe('Test')
        })

        it('renders complex slot content', () => {
            const wrapper = mount(Mask, {
                slots: {
                    default: `
                        <div class="content">
                            <img src="avatar.jpg" alt="Avatar" />
                            <span class="overlay">Overlay</span>
                        </div>
                    `,
                },
            })

            expect(wrapper.find('.content').exists()).toBe(true)
            expect(wrapper.find('img').exists()).toBe(true)
            expect(wrapper.find('.overlay').exists()).toBe(true)
        })
    })

    describe('Props validation', () => {
        it('uses default props when not provided', () => {
            const wrapper = mount(Mask)

            expect(wrapper.classes()).toContain('mask-squircle')
            expect(wrapper.classes()).toContain('w-20')
            expect(wrapper.classes()).toContain('h-20')
        })

        it('handles all valid variants', () => {
            const validVariants = [
                'squircle',
                'heart',
                'hexagon',
                'hexagon-2',
                'decagon',
                'pentagon',
                'diamond',
                'square',
                'circle',
                'star',
                'star-2',
                'triangle',
                'triangle-2',
                'triangle-3',
                'triangle-4',
            ]

            validVariants.forEach((variant) => {
                const wrapper = mount(Mask, {
                    props: { variant },
                })

                expect(wrapper.classes()).toContain(`mask-${variant}`)
            })
        })

        it('handles all valid sizes', () => {
            const validSizes = ['xs', 'sm', 'md', 'lg', 'xl']

            validSizes.forEach((size) => {
                const wrapper = mount(Mask, {
                    props: { size },
                })

                expect(wrapper.classes()).toContain('mask')
            })
        })
    })

    describe('Accessibility', () => {
        it('preserves accessibility attributes on slot content', () => {
            const wrapper = mount(Mask, {
                slots: {
                    default: '<img src="test.jpg" alt="Test image" role="img" />',
                },
            })

            const img = wrapper.find('img')
            expect(img.attributes('alt')).toBe('Test image')
            expect(img.attributes('role')).toBe('img')
        })

        it('maintains semantic structure', () => {
            const wrapper = mount(Mask, {
                slots: {
                    default: '<div role="img" aria-label="Masked content">Content</div>',
                },
            })

            const content = wrapper.find('[role="img"]')
            expect(content.exists()).toBe(true)
            expect(content.attributes('aria-label')).toBe('Masked content')
        })
    })

    describe('Edge cases', () => {
        it('handles empty slot content', () => {
            const wrapper = mount(Mask, {
                slots: { default: '' },
            })

            expect(wrapper.classes()).toContain('mask')
            expect(wrapper.html()).toContain('<div')
        })

        it('handles multiple half modifiers', () => {
            const wrapper = mount(Mask, {
                props: {
                    isHalf1: true,
                    isHalf2: true,
                },
            })

            expect(wrapper.classes()).toContain('mask-half-1')
            expect(wrapper.classes()).toContain('mask-half-2')
        })

        it('handles undefined variant gracefully', () => {
            const wrapper = mount(Mask, {
                props: { variant: undefined },
            })

            expect(wrapper.classes()).toContain('mask')
            expect(wrapper.classes()).toContain('mask-squircle') // default
        })
    })

    describe('Performance', () => {
        it('renders efficiently with many props', () => {
            const startTime = performance.now()

            mount(Mask, {
                props: {
                    variant: 'circle',
                    size: 'lg',
                    isHalf1: true,
                    class: 'custom-class',
                },
                slots: {
                    default: '<img src="test.jpg" alt="Test" />',
                },
            })

            const endTime = performance.now()
            const renderTime = endTime - startTime

            // Should render in under 16ms (60fps)
            expect(renderTime).toBeLessThan(16)
        })
    })
})

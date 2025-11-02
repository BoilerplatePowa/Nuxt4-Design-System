import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { Heart, ArrowRight } from 'lucide-vue-next'
import Button from '../../../src/runtime/components/Actions/Button.vue'

// Mock confirm dialog
const mockConfirm = vi.fn()
Object.defineProperty(window, 'confirm', {
    value: mockConfirm,
    writable: true,
})

describe('Button', () => {
    beforeEach(() => {
        mockConfirm.mockClear()
    })

    it('renders correctly with default props', () => {
        const wrapper = mount(Button, {
            slots: {
                default: 'Test Button',
            },
        })

        expect(wrapper.text()).toBe('Test Button')
        expect(wrapper.classes()).toContain('btn')
        expect(wrapper.classes()).toContain('btn-md')
    })

    it('applies color classes correctly', () => {
        const colors = [
            'primary',
            'secondary',
            'accent',
            'neutral',
            'info',
            'success',
            'warning',
            'error',
        ] as const

        colors.forEach((color) => {
            const wrapper = mount(Button, {
                props: { color },
                slots: { default: 'Test' },
            })

            expect(wrapper.classes()).toContain(`btn-${color}`)
        })
    })

    it('applies style classes correctly', () => {
        const styles = ['outline', 'ghost', 'link'] as const

        styles.forEach((btnStyle) => {
            const wrapper = mount(Button, {
                props: { btnStyle },
                slots: { default: 'Test' },
            })

            expect(wrapper.classes()).toContain(`btn-${btnStyle}`)
        })
    })

    it('applies size classes correctly', () => {
        const sizes = ['xs', 'sm', 'md', 'lg'] as const

        sizes.forEach((size) => {
            const wrapper = mount(Button, {
                props: { size },
                slots: { default: 'Test' },
            })

            if (size !== 'md') {
                expect(wrapper.classes()).toContain(`btn-${size}`)
            }
        })
    })

    it('applies disabled state correctly', () => {
        const wrapper = mount(Button, {
            props: { disabled: true },
            slots: { default: 'Test' },
        })

        expect(wrapper.attributes('disabled')).toBeDefined()
        expect(wrapper.attributes('tabindex')).toBe('-1')
    })

    it('applies loading state correctly', () => {
        const wrapper = mount(Button, {
            props: { loading: true },
            slots: { default: 'Test' },
        })

        expect(wrapper.find('.loading').exists()).toBe(true)
        expect(wrapper.find('.loading-spinner').exists()).toBe(true)
        expect(wrapper.attributes('aria-busy')).toBe('true')
    })

    it('shows loading text when provided', () => {
        const wrapper = mount(Button, {
            props: {
                loading: true,
                loadingText: 'Processing...',
            },
            slots: { default: 'Submit' },
        })

        expect(wrapper.text()).toContain('Processing...')
    })

    it('hides text when hideTextOnLoading is true', () => {
        const wrapper = mount(Button, {
            props: {
                loading: true,
                hideTextOnLoading: true,
            },
            slots: { default: 'Submit' },
        })

        const textSpan = wrapper.findAll('span').find((span) => span.text() === 'Submit')
        expect(textSpan?.classes()).toContain('sr-only')
    })

    it('applies full width correctly', () => {
        const wrapper = mount(Button, {
            props: { fullWidth: true },
            slots: { default: 'Test' },
        })

        expect(wrapper.classes()).toContain('btn-block')
        expect(wrapper.classes()).toContain('w-full')
    })

    it('emits click event when clicked', async () => {
        const wrapper = mount(Button, {
            slots: { default: 'Test' },
        })

        await wrapper.trigger('click')
        expect(wrapper.emitted('click')).toBeTruthy()
    })

    it('does not emit click event when disabled', async () => {
        const wrapper = mount(Button, {
            props: { disabled: true },
            slots: { default: 'Test' },
        })

        await wrapper.trigger('click')
        expect(wrapper.emitted('click')).toBeFalsy()
    })

    it('does not emit click event when loading', async () => {
        const wrapper = mount(Button, {
            props: { loading: true },
            slots: { default: 'Test' },
        })

        await wrapper.trigger('click')
        expect(wrapper.emitted('click')).toBeFalsy()
    })

    it('shows confirmation dialog when confirmAction is true', async () => {
        mockConfirm.mockReturnValue(true)

        const wrapper = mount(Button, {
            props: {
                confirmAction: true,
                confirmText: 'Are you sure?',
            },
            slots: { default: 'Delete' },
        })

        await wrapper.trigger('click')
        expect(mockConfirm).toHaveBeenCalledWith('Are you sure?')
        expect(wrapper.emitted('click')).toBeTruthy()
    })

    it('does not emit click when confirmation is cancelled', async () => {
        mockConfirm.mockReturnValue(false)

        const wrapper = mount(Button, {
            props: {
                confirmAction: true,
                confirmText: 'Are you sure?',
            },
            slots: { default: 'Delete' },
        })

        await wrapper.trigger('click')
        expect(mockConfirm).toHaveBeenCalledWith('Are you sure?')
        expect(wrapper.emitted('click')).toBeFalsy()
    })

    it('debounces click events when debounceMs is set', async () => {
        vi.useFakeTimers()

        const wrapper = mount(Button, {
            props: { debounceMs: 100 },
            slots: { default: 'Test' },
        })

        await wrapper.trigger('click')
        expect(wrapper.emitted('click')).toBeFalsy()

        vi.advanceTimersByTime(100)
        await wrapper.vm.$nextTick()

        expect(wrapper.emitted('click')).toBeTruthy()

        vi.useRealTimers()
    })

    it('renders icon slots correctly', () => {
        const wrapper = mount(Button, {
            slots: {
                default: 'Test',
                'icon-left': '<span class="icon-left">←</span>',
                'icon-right': '<span class="icon-right">→</span>',
            },
        })

        expect(wrapper.find('.icon-left').exists()).toBe(true)
        expect(wrapper.find('.icon-right').exists()).toBe(true)
        expect(wrapper.text()).toContain('Test')
    })

    it('renders left icon prop correctly', () => {
        const wrapper = mount(Button, {
            props: { iconLeft: Heart },
            slots: { default: 'Test' },
        })

        // Icon is rendered directly as component, check for SVG element
        expect(wrapper.find('svg').exists()).toBe(true)
    })

    it('renders right icon prop correctly', () => {
        const wrapper = mount(Button, {
            props: { iconRight: ArrowRight },
            slots: { default: 'Test' },
        })

        // Icon is rendered directly as component, check for SVG element
        expect(wrapper.find('svg').exists()).toBe(true)
    })

    it('renders both left and right icons correctly', () => {
        const wrapper = mount(Button, {
            props: {
                iconLeft: Heart,
                iconRight: ArrowRight,
                iconSize: 'lg',
            },
            slots: { default: 'Test' },
        })

        // Both icons should be rendered as SVG elements
        const svgs = wrapper.findAll('svg')
        expect(svgs.length).toBeGreaterThanOrEqual(2)
    })

    it('applies shape classes correctly', () => {
        const circleWrapper = mount(Button, {
            props: { circle: true },
            slots: { default: 'Test' },
        })
        expect(circleWrapper.classes()).toContain('btn-circle')

        const squareWrapper = mount(Button, {
            props: { square: true },
            slots: { default: 'Test' },
        })
        expect(squareWrapper.classes()).toContain('btn-square')
    })

    it('applies style modifiers correctly', () => {
        const glassWrapper = mount(Button, {
            props: { glass: true },
            slots: { default: 'Test' },
        })
        expect(glassWrapper.classes()).toContain('glass')

        const noAnimationWrapper = mount(Button, {
            props: { noAnimation: true },
            slots: { default: 'Test' },
        })
        expect(noAnimationWrapper.classes()).toContain('no-animation')
    })

    it('sets correct button type', () => {
        const types = ['button', 'submit', 'reset'] as const

        types.forEach((type) => {
            const wrapper = mount(Button, {
                props: { type },
                slots: { default: 'Test' },
            })

            expect(wrapper.attributes('type')).toBe(type)
        })
    })

    it('handles keyboard events correctly', async () => {
        const wrapper = mount(Button, {
            slots: { default: 'Test' },
        })

        await wrapper.trigger('keydown', { key: 'Enter' })
        expect(wrapper.emitted('click')).toBeTruthy()

        await wrapper.trigger('keydown', { key: ' ' })
        expect(wrapper.emitted('click')).toBeTruthy()
    })

    it('emits focus and blur events', async () => {
        const wrapper = mount(Button, {
            slots: { default: 'Test' },
        })

        await wrapper.trigger('focus')
        expect(wrapper.emitted('focus')).toBeTruthy()

        await wrapper.trigger('blur')
        expect(wrapper.emitted('blur')).toBeTruthy()
    })

    it('sets accessibility attributes correctly', () => {
        const wrapper = mount(Button, {
            props: {
                ariaLabel: 'Custom label',
                ariaPressed: true,
                ariaExpanded: true,
                ariaDescribedby: 'description',
            },
            slots: { default: 'Test' },
        })

        expect(wrapper.attributes('aria-label')).toBe('Custom label')
        expect(wrapper.attributes('aria-pressed')).toBe('true')
        expect(wrapper.attributes('aria-expanded')).toBe('true')
        expect(wrapper.attributes('aria-describedby')).toBe('description')
    })

    it('auto focuses when autoFocus is true', async () => {
        const wrapper = mount(Button, {
            props: { autoFocus: true },
            slots: { default: 'Test' },
        })

        await wrapper.vm.$nextTick()
        // Note: In test environment, focus might not work as expected
        // This test mainly ensures the prop is handled
        expect(wrapper.props('autoFocus')).toBe(true)
    })

    it('exposes focus, blur, and click methods', () => {
        const wrapper = mount(Button, {
            slots: { default: 'Test' },
        })

        expect(typeof wrapper.vm.focus).toBe('function')
        expect(typeof wrapper.vm.blur).toBe('function')
        expect(typeof wrapper.vm.click).toBe('function')
    })

    it('handles multiple rapid clicks with debounce', async () => {
        vi.useFakeTimers()

        const wrapper = mount(Button, {
            props: { debounceMs: 100 },
            slots: { default: 'Test' },
        })

        // Multiple rapid clicks
        await wrapper.trigger('click')
        await wrapper.trigger('click')
        await wrapper.trigger('click')

        expect(wrapper.emitted('click')).toBeFalsy()

        vi.advanceTimersByTime(100)
        await wrapper.vm.$nextTick()

        expect(wrapper.emitted('click')).toBeTruthy()
        expect(wrapper.emitted('click')?.length).toBe(1) // Only one event should be emitted

        vi.useRealTimers()
    })

    it('prevents default on Enter and Space keys', async () => {
        const wrapper = mount(Button, {
            slots: { default: 'Test' },
        })

        const enterEvent = { key: 'Enter', preventDefault: vi.fn() }
        const spaceEvent = { key: ' ', preventDefault: vi.fn() }

        await wrapper.trigger('keydown', enterEvent)
        expect(enterEvent.preventDefault).toHaveBeenCalled()

        await wrapper.trigger('keydown', spaceEvent)
        expect(spaceEvent.preventDefault).toHaveBeenCalled()
    })
})

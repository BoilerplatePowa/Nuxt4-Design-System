import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import ThemeController from '../../../src/runtime/components/Actions/ThemeController.vue'

// Mock the useNuxtApp composable
const mockTheme = ref<string>('light')
const mockSetTheme = vi.fn((theme: string) => {
    mockTheme.value = theme
})
const mockToggleTheme = vi.fn((lightTheme = 'light', darkTheme = 'dark') => {
    const isDark = mockTheme.value === darkTheme
    mockTheme.value = isDark ? lightTheme : darkTheme
})

vi.mock('nuxt/app', () => ({
    useNuxtApp: () => ({
        $theme: mockTheme,
        $setTheme: mockSetTheme,
        $toggleTheme: mockToggleTheme,
    }),
}))

// Mock lucide-vue-next icons
vi.mock('lucide-vue-next', () => ({
    Sun: {
        name: 'Sun',
        template: '<svg class="sun-icon" />',
    },
    Moon: {
        name: 'Moon',
        template: '<svg class="moon-icon" />',
    },
}))

describe('ThemeController', () => {
    beforeEach(() => {
        vi.clearAllMocks()
        mockTheme.value = 'light'
        mockSetTheme.mockClear()
        mockToggleTheme.mockClear()
    })

    it('renders correctly with default props', () => {
        const wrapper = mount(ThemeController)

        // Check that the component renders
        expect(wrapper.exists()).toBe(true)
        // Check that the root div has the theme-controller class
        expect(wrapper.find('.theme-controller').exists()).toBe(true)
        // Check that button variant is rendered by default
        expect(wrapper.find('button').exists()).toBe(true)
        expect(wrapper.find('button').classes()).toContain('btn')
    })

    it('applies variant classes correctly', () => {
        const variants = ['button', 'toggle', 'switch', 'dropdown', 'radio'] as const

        variants.forEach((variant) => {
            const wrapper = mount(ThemeController, {
                props: { variant },
            })

            if (variant === 'button') {
                expect(wrapper.find('button').exists()).toBe(true)
                expect(wrapper.find('button').classes()).toContain('btn')
            } else if (variant === 'toggle') {
                expect(wrapper.find('input[type="checkbox"]').exists()).toBe(true)
                expect(wrapper.find('input[type="checkbox"]').classes()).toContain('toggle')
            } else if (variant === 'switch') {
                expect(wrapper.find('input[type="checkbox"]').exists()).toBe(true)
                expect(wrapper.find('input[type="checkbox"]').classes()).toContain('toggle')
                expect(wrapper.find('input[type="checkbox"]').classes()).toContain('toggle-primary')
            } else if (variant === 'dropdown') {
                expect(wrapper.find('select').exists()).toBe(true)
                expect(wrapper.find('select').classes()).toContain('select')
            } else if (variant === 'radio') {
                expect(wrapper.findAll('input[type="radio"]').length).toBeGreaterThan(0)
            }
        })
    })

    it('applies size classes correctly', () => {
        const sizes = ['xs', 'sm', 'lg'] as const

        sizes.forEach((size) => {
            const wrapper = mount(ThemeController, {
                props: { size, variant: 'button' },
            })

            expect(wrapper.find('button').classes()).toContain(`btn-${size}`)
        })

        // Test that medium (default) doesn't add a size class
        const mediumWrapper = mount(ThemeController, {
            props: { size: 'md', variant: 'button' },
        })
        expect(mediumWrapper.find('button').classes()).not.toContain('btn-md')
    })

    it('shows label when showLabel is true', () => {
        const wrapper = mount(ThemeController, {
            props: {
                variant: 'button',
                showLabel: true,
            },
        })

        expect(wrapper.find('button').text()).toContain('light') // Current theme
    })

    it('shows moon icon when theme is dark', async () => {
        mockTheme.value = 'dark'
        const wrapper = mount(ThemeController, {
            props: {
                variant: 'button',
            },
        })

        await wrapper.vm.$nextTick()
        expect(wrapper.find('.moon-icon').exists()).toBe(true)
        expect(wrapper.find('.sun-icon').exists()).toBe(false)
    })

    it('shows sun icon when theme is light', () => {
        mockTheme.value = 'light'
        const wrapper = mount(ThemeController, {
            props: {
                variant: 'button',
            },
        })

        expect(wrapper.find('.sun-icon').exists()).toBe(true)
        expect(wrapper.find('.moon-icon').exists()).toBe(false)
    })

    it('emits themeChange event when button is clicked', async () => {
        mockTheme.value = 'light'
        const wrapper = mount(ThemeController, {
            props: {
                variant: 'button',
                lightTheme: 'light',
                darkTheme: 'dark',
            },
        })

        await wrapper.vm.$nextTick()
        const initialEmissions = wrapper.emitted('themeChange')?.length || 0

        await wrapper.find('button').trigger('click')
        await wrapper.vm.$nextTick()

        expect(wrapper.emitted('themeChange')).toBeTruthy()
        expect(wrapper.emitted('themeChange')?.length).toBeGreaterThan(initialEmissions)
        expect(mockSetTheme).toHaveBeenCalledWith('dark')
    })

    it('emits themeChange event when toggle is changed', async () => {
        mockTheme.value = 'light'
        const wrapper = mount(ThemeController, {
            props: {
                variant: 'toggle',
                lightTheme: 'light',
                darkTheme: 'dark',
            },
        })

        await wrapper.vm.$nextTick()
        const initialEmissions = wrapper.emitted('themeChange')?.length || 0

        await wrapper.find('input[type="checkbox"]').trigger('change')
        await wrapper.vm.$nextTick()

        expect(wrapper.emitted('themeChange')).toBeTruthy()
        expect(wrapper.emitted('themeChange')?.length).toBeGreaterThan(initialEmissions)
        expect(mockSetTheme).toHaveBeenCalledWith('dark')
    })

    it('emits themeChange event when switch is changed', async () => {
        mockTheme.value = 'light'
        const wrapper = mount(ThemeController, {
            props: {
                variant: 'switch',
                lightTheme: 'light',
                darkTheme: 'dark',
            },
        })

        await wrapper.vm.$nextTick()
        const initialEmissions = wrapper.emitted('themeChange')?.length || 0

        await wrapper.find('input[type="checkbox"]').trigger('change')
        await wrapper.vm.$nextTick()

        expect(wrapper.emitted('themeChange')).toBeTruthy()
        expect(wrapper.emitted('themeChange')?.length).toBeGreaterThan(initialEmissions)
        expect(mockSetTheme).toHaveBeenCalledWith('dark')
    })

    it('handles dropdown theme selection', async () => {
        const customThemes = [
            { value: 'light', label: 'Light' },
            { value: 'dark', label: 'Dark' },
            { value: 'cupcake', label: 'Cupcake' },
        ]

        mockTheme.value = 'light'
        const wrapper = mount(ThemeController, {
            props: {
                variant: 'dropdown',
                themes: customThemes,
            },
        })

        await wrapper.vm.$nextTick()
        const select = wrapper.find('select')
        await select.setValue('cupcake')
        await wrapper.vm.$nextTick()

        expect(wrapper.emitted('themeChange')).toBeTruthy()
        expect(mockSetTheme).toHaveBeenCalledWith('cupcake')
        expect(mockTheme.value).toBe('cupcake')
    })

    it('handles radio theme selection', async () => {
        const customThemes = [
            { value: 'light', label: 'Light' },
            { value: 'dark', label: 'Dark' },
        ]

        mockTheme.value = 'light'
        const wrapper = mount(ThemeController, {
            props: {
                variant: 'radio',
                themes: customThemes,
                radioName: 'test-theme',
            },
        })

        await wrapper.vm.$nextTick()
        const radioInputs = wrapper.findAll('input[type="radio"]')
        expect(radioInputs).toHaveLength(2)

        // Verify radio inputs have correct attributes
        expect(radioInputs[0].attributes('value')).toBe('light')
        expect(radioInputs[1].attributes('value')).toBe('dark')
        expect(radioInputs[0].attributes('name')).toBe('test-theme')
        expect(radioInputs[1].attributes('name')).toBe('test-theme')

        // Select dark theme
        await radioInputs[1].trigger('change')
        await wrapper.vm.$nextTick()

        expect(wrapper.emitted('themeChange')).toBeTruthy()
        expect(mockSetTheme).toHaveBeenCalledWith('dark')
    })

    it('uses custom themes when provided', () => {
        const customThemes = [
            { value: 'custom1', label: 'Custom Theme 1' },
            { value: 'custom2', label: 'Custom Theme 2' },
        ]

        mockTheme.value = 'custom1'
        const wrapper = mount(ThemeController, {
            props: {
                variant: 'dropdown',
                themes: customThemes,
            },
        })

        const options = wrapper.findAll('option')
        expect(options).toHaveLength(2)
        expect(options[0].text()).toBe('Custom Theme 1')
        expect(options[1].text()).toBe('Custom Theme 2')

        // Verify select value matches current theme
        const select = wrapper.find('select')
        expect(select.element.value).toBe('custom1')
    })

    it('uses custom aria label', () => {
        const wrapper = mount(ThemeController, {
            props: {
                variant: 'button',
                ariaLabel: 'Switch theme mode',
            },
        })

        expect(wrapper.find('button').attributes('aria-label')).toBe('Switch theme mode')
    })

    it('uses custom aria label for all variants', () => {
        const variants = ['button', 'toggle', 'switch', 'dropdown', 'radio'] as const
        const customAriaLabel = 'Custom theme controller'

        variants.forEach((variant) => {
            const wrapper = mount(ThemeController, {
                props: {
                    variant,
                    ariaLabel: customAriaLabel,
                },
            })

            if (variant === 'button') {
                expect(wrapper.find('button').attributes('aria-label')).toBe(customAriaLabel)
            } else if (variant === 'toggle' || variant === 'switch') {
                expect(wrapper.find('input[type="checkbox"]').attributes('aria-label')).toBe(
                    customAriaLabel
                )
            } else if (variant === 'dropdown') {
                expect(wrapper.find('select').attributes('aria-label')).toBe(customAriaLabel)
            }
            // Radio variant doesn't have aria-label on individual inputs
        })
    })

    it('renders custom icon slot content', () => {
        const wrapper = mount(ThemeController, {
            props: { variant: 'button' },
            slots: {
                icon: '<span class="custom-icon">🌙</span>',
            },
        })

        expect(wrapper.find('.custom-icon').exists()).toBe(true)
        expect(wrapper.text()).toContain('🌙')
        // Custom icon should replace default icon
        expect(wrapper.find('.sun-icon').exists()).toBe(false)
        expect(wrapper.find('.moon-icon').exists()).toBe(false)
    })

    it('applies correct size classes for all variants', () => {
        const sizes = ['xs', 'sm', 'md', 'lg'] as const
        const variants = ['button', 'toggle', 'switch', 'dropdown', 'radio'] as const

        variants.forEach((variant) => {
            sizes.forEach((size) => {
                const wrapper = mount(ThemeController, {
                    props: { variant, size },
                })

                if (variant === 'button') {
                    if (size !== 'md') {
                        expect(wrapper.find('button').classes()).toContain(`btn-${size}`)
                    }
                } else if (variant === 'toggle' || variant === 'switch') {
                    if (size !== 'md') {
                        expect(wrapper.find('input[type="checkbox"]').classes()).toContain(
                            `toggle-${size}`
                        )
                    }
                } else if (variant === 'dropdown') {
                    if (size !== 'md') {
                        expect(wrapper.find('select').classes()).toContain(`select-${size}`)
                    }
                } else if (variant === 'radio') {
                    if (size !== 'md') {
                        const radioInputs = wrapper.findAll('input[type="radio"]')
                        radioInputs.forEach((radio) => {
                            expect(radio.classes()).toContain(`radio-${size}`)
                        })
                    }
                }
            })
        })
    })

    it('watches theme changes and emits events', async () => {
        mockTheme.value = 'light'
        const wrapper = mount(ThemeController, {
            props: { variant: 'button' },
        })

        await wrapper.vm.$nextTick()

        // Change theme externally
        mockTheme.value = 'dark'
        await wrapper.vm.$nextTick()

        expect(wrapper.emitted('themeChange')).toBeTruthy()
    })

    it('toggles between light and dark themes correctly', async () => {
        mockTheme.value = 'light'
        const wrapper = mount(ThemeController, {
            props: {
                variant: 'button',
                lightTheme: 'light',
                darkTheme: 'dark',
            },
        })

        await wrapper.vm.$nextTick()

        // Click to toggle to dark
        await wrapper.find('button').trigger('click')
        await wrapper.vm.$nextTick()
        expect(mockSetTheme).toHaveBeenCalledWith('dark')

        // Change theme to dark
        mockTheme.value = 'dark'
        await wrapper.vm.$nextTick()

        // Click to toggle to light
        await wrapper.find('button').trigger('click')
        await wrapper.vm.$nextTick()
        expect(mockSetTheme).toHaveBeenCalledWith('light')
    })

    it('handles custom darkTheme and lightTheme props', async () => {
        mockTheme.value = 'corporate'
        const wrapper = mount(ThemeController, {
            props: {
                variant: 'button',
                lightTheme: 'corporate',
                darkTheme: 'synthwave',
            },
        })

        await wrapper.vm.$nextTick()

        // Should show dark icon since corporate is not synthwave
        expect(wrapper.find('.sun-icon').exists()).toBe(true)

        // Toggle should switch to synthwave
        await wrapper.find('button').trigger('click')
        await wrapper.vm.$nextTick()
        expect(mockSetTheme).toHaveBeenCalledWith('synthwave')
    })
})

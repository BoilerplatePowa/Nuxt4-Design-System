import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import Drawer from '../../../src/runtime/components/Layout/Drawer.vue'

describe('Drawer', () => {
    let wrapper: any

    beforeEach(() => {
        // Mock window.addEventListener for keyboard events
        global.window = {
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
        } as any
    })

    describe('v-model functionality', () => {
        it('should use defineModel for v-model binding', async () => {
            const isOpen = ref(false)
            wrapper = mount(Drawer, {
                props: {
                    modelValue: isOpen.value,
                    'onUpdate:modelValue': (value: boolean) => {
                        isOpen.value = value
                    },
                },
                global: { stubs: { Menu: true, Icon: true } },
            })

            // Check initial state
            expect(wrapper.vm.isOpen).toBe(false)

            // Simulate opening the drawer via v-model
            await wrapper.setProps({ modelValue: true })
            expect(wrapper.vm.isOpen).toBe(true)
        })

        it('checkbox reflects local open state', async () => {
            wrapper = mount(Drawer, {
                global: { stubs: { Menu: true, Icon: true } },
            })

            const checkbox = wrapper.find('.drawer-toggle')
            expect(checkbox.exists()).toBe(true)
            expect((checkbox.element as HTMLInputElement).checked).toBe(false)

            // Toggle the local open ref and expect checkbox to reflect it
            wrapper.vm.open = true
            await wrapper.vm.$nextTick()
            expect((checkbox.element as HTMLInputElement).checked).toBe(true)
        })

        it('should have default model value false', () => {
            wrapper = mount(Drawer, { global: { stubs: { Menu: true, Icon: true } } })
            expect(wrapper.vm.isOpen).toBe(false)
        })
    })

    describe('props', () => {
        it('should accept position prop', () => {
            wrapper = mount(Drawer, {
                props: { position: 'right' },
                global: { stubs: { Menu: true, Icon: true } },
            })
            expect(wrapper.props('position')).toBe('right')
        })

        it('should accept persistent prop', () => {
            wrapper = mount(Drawer, {
                props: { persistent: true },
                global: { stubs: { Menu: true, Icon: true } },
            })
            expect(wrapper.props('persistent')).toBe(true)
        })

        it('should accept backdrop prop', () => {
            wrapper = mount(Drawer, {
                props: { backdrop: false },
                global: { stubs: { Menu: true, Icon: true } },
            })
            expect(wrapper.props('backdrop')).toBe(false)
        })

        it('should accept id prop', () => {
            wrapper = mount(Drawer, {
                props: { id: 'custom-drawer-id' },
                global: { stubs: { Menu: true, Icon: true } },
            })
            expect(wrapper.props('id')).toBe('custom-drawer-id')
        })

        it('should generate unique id when not provided', () => {
            wrapper = mount(Drawer, { global: { stubs: { Menu: true, Icon: true } } })
            expect(wrapper.vm.drawerId).toMatch(/^drawer-/)
        })
    })

    describe('computed properties', () => {
        it('should compute drawer classes correctly for left position', () => {
            wrapper = mount(Drawer, {
                props: { position: 'left' },
                global: { stubs: { Menu: true, Icon: true } },
            })
            expect(wrapper.vm.drawerClasses).toBe('')
        })

        it('should compute drawer classes correctly for right position', () => {
            wrapper = mount(Drawer, {
                props: { position: 'right' },
                global: { stubs: { Menu: true, Icon: true } },
            })
            expect(wrapper.vm.drawerClasses).toBe('drawer-end')
        })

        it('includes drawer-open when forceOpen is true', () => {
            wrapper = mount(Drawer, {
                props: { forceOpen: true },
                global: { stubs: { Menu: true, Icon: true } },
            })
            expect(wrapper.vm.drawerClasses).toContain('drawer-open')
        })

        it('includes drawer-open when mode is sidebar', () => {
            wrapper = mount(Drawer, {
                props: { mode: 'sidebar' },
                global: { stubs: { Menu: true, Icon: true } },
            })
            expect(wrapper.vm.drawerClasses).toContain('drawer-open')
            expect(wrapper.find('.drawer-side').classes().join(' ')).toContain('drawer-open')
        })
    })
    // Methods/events are not exposed in current component; removed corresponding tests

    describe('keyboard handling', () => {
        it('should add keyboard event listener on mount', () => {
            mount(Drawer, { global: { stubs: { Menu: true, Icon: true } } })
            expect(global.window.addEventListener).toHaveBeenCalledWith(
                'keydown',
                expect.any(Function)
            )
        })
    })

    describe('slots', () => {
        it('should render content slot', () => {
            wrapper = mount(Drawer, {
                slots: {
                    content: '<div class="test-content">Content</div>',
                },
                global: { stubs: { Menu: true, Icon: true } },
            })
            expect(wrapper.find('.test-content').exists()).toBe(true)
        })

        it('should render top and bottom slots', () => {
            wrapper = mount(Drawer, {
                slots: {
                    top: '<div class="slot-top">Top</div>',
                    bottom: '<div class="slot-bottom">Bottom</div>',
                },
                global: { stubs: { Menu: true, Icon: true } },
            })
            expect(wrapper.find('.slot-top').exists()).toBe(true)
            expect(wrapper.find('.slot-bottom').exists()).toBe(true)
        })
    })

    describe('template structure', () => {
        it('should render with correct structure', () => {
            wrapper = mount(Drawer, { global: { stubs: { Menu: true, Icon: true } } })

            expect(wrapper.find('.drawer').exists()).toBe(true)
            expect(wrapper.find('.drawer-toggle').exists()).toBe(true)
            expect(wrapper.find('.drawer-content').exists()).toBe(true)
            expect(wrapper.find('.drawer-side').exists()).toBe(true)
            expect(wrapper.find('.drawer-overlay').exists()).toBe(true)
        })

        it('should bind checkbox to isOpen state', async () => {
            wrapper = mount(Drawer, { global: { stubs: { Menu: true, Icon: true } } })
            const checkbox = wrapper.find('.drawer-toggle')

            expect(checkbox.attributes('type')).toBe('checkbox')
            expect(checkbox.element.checked).toBe(false)

            // updating local open ref should reflect on checkbox
            wrapper.vm.open = true
            await wrapper.vm.$nextTick()
            expect((checkbox.element as HTMLInputElement).checked).toBe(true)
        })
    })

    describe('default content', () => {
        it('should render default content when no slots provided', () => {
            wrapper = mount(Drawer, { global: { stubs: { Menu: true, Icon: true } } })

            // Check for default content slot content
            expect(wrapper.text()).toContain('Open drawer')
        })

        it('should not render default open label in sidebar mode', () => {
            wrapper = mount(Drawer, {
                props: { mode: 'sidebar' },
                global: { stubs: { Menu: true, Icon: true } },
            })
            expect(wrapper.text()).not.toContain('Open drawer')
        })
    })
})

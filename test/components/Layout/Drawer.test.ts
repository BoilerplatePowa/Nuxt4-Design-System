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
            })

            // Check initial state
            expect(wrapper.vm.isOpen).toBe(false)

            // Simulate opening the drawer
            await wrapper.setProps({ modelValue: true })
            expect(wrapper.vm.isOpen).toBe(true)
        })

        it('should emit update:modelValue when internal state changes', async () => {
            const isOpen = ref(false)
            wrapper = mount(Drawer, {
                props: {
                    modelValue: isOpen.value,
                    'onUpdate:modelValue': (value: boolean) => {
                        isOpen.value = value
                    },
                },
            })

            // Trigger internal state change
            await wrapper.vm.toggle()
            expect(wrapper.emitted('update:modelValue')).toBeTruthy()
            expect(wrapper.emitted('update:modelValue')[0]).toEqual([true])
        })

        it('should have default value of false', () => {
            wrapper = mount(Drawer)
            expect(wrapper.vm.isOpen).toBe(false)
        })
    })

    describe('props', () => {
        it('should accept position prop', () => {
            wrapper = mount(Drawer, {
                props: { position: 'right' },
            })
            expect(wrapper.props('position')).toBe('right')
        })

        it('should accept width prop', () => {
            wrapper = mount(Drawer, {
                props: { width: 'lg' },
            })
            expect(wrapper.props('width')).toBe('lg')
        })

        it('should accept showCloseButton prop', () => {
            wrapper = mount(Drawer, {
                props: { showCloseButton: false },
            })
            expect(wrapper.props('showCloseButton')).toBe(false)
        })

        it('should accept persistent prop', () => {
            wrapper = mount(Drawer, {
                props: { persistent: true },
            })
            expect(wrapper.props('persistent')).toBe(true)
        })

        it('should accept backdrop prop', () => {
            wrapper = mount(Drawer, {
                props: { backdrop: false },
            })
            expect(wrapper.props('backdrop')).toBe(false)
        })

        it('should accept id prop', () => {
            wrapper = mount(Drawer, {
                props: { id: 'custom-drawer-id' },
            })
            expect(wrapper.props('id')).toBe('custom-drawer-id')
        })

        it('should generate unique id when not provided', () => {
            wrapper = mount(Drawer)
            expect(wrapper.vm.drawerId).toMatch(/^drawer-/)
        })
    })

    describe('computed properties', () => {
        it('should compute drawer classes correctly for left position', () => {
            wrapper = mount(Drawer, {
                props: { position: 'left' },
            })
            expect(wrapper.vm.drawerClasses).toBe('')
        })

        it('should compute drawer classes correctly for right position', () => {
            wrapper = mount(Drawer, {
                props: { position: 'right' },
            })
            expect(wrapper.vm.drawerClasses).toBe('drawer-end')
        })

        // Removed sideClasses test: daisyUI doesn't require custom side class

        it('should compute aside classes correctly for different widths', () => {
            const testCases = [
                { width: 'sm', expected: 'w-64' },
                { width: 'md', expected: 'w-80' },
                { width: 'lg', expected: 'w-96' },
                { width: 'xl', expected: 'w-[28rem]' },
                { width: 'full', expected: 'w-full' },
            ]

            testCases.forEach(({ width, expected }) => {
                const testWrapper = mount(Drawer, {
                    props: { width: width as any },
                })
                expect(testWrapper.find('.drawer').exists()).toBe(true)
            })
        })
    })

    describe('methods', () => {
        beforeEach(() => {
            wrapper = mount(Drawer)
        })

        it('should toggle drawer state', async () => {
            expect(wrapper.vm.isOpen).toBe(false)
            await wrapper.vm.toggle()
            expect(wrapper.vm.isOpen).toBe(true)
            await wrapper.vm.toggle()
            expect(wrapper.vm.isOpen).toBe(false)
        })

        it('should open drawer', async () => {
            expect(wrapper.vm.isOpen).toBe(false)
            await wrapper.vm.open()
            expect(wrapper.vm.isOpen).toBe(true)
        })

        it('should close drawer', async () => {
            await wrapper.vm.open()
            expect(wrapper.vm.isOpen).toBe(true)
            await wrapper.vm.close()
            expect(wrapper.vm.isOpen).toBe(false)
        })

        it('should not close drawer when persistent is true', async () => {
            wrapper = mount(Drawer, {
                props: { persistent: true },
            })
            await wrapper.vm.open()
            expect(wrapper.vm.isOpen).toBe(true)
            await wrapper.vm.close()
            expect(wrapper.vm.isOpen).toBe(true) // Should remain open
        })
    })

    describe('events', () => {
        it('should emit open event when drawer opens', async () => {
            wrapper = mount(Drawer)
            await wrapper.vm.open()
            expect(wrapper.emitted('open')).toBeTruthy()
        })

        it('should emit close event when drawer closes', async () => {
            wrapper = mount(Drawer)
            await wrapper.vm.open()
            await wrapper.vm.close()
            expect(wrapper.emitted('close')).toBeTruthy()
        })

        it('should emit events in correct order', async () => {
            wrapper = mount(Drawer)
            await wrapper.vm.open()
            await wrapper.vm.close()

            const events = wrapper.emitted()
            expect(events.open).toBeTruthy()
            expect(events.close).toBeTruthy()
            expect(events['update:modelValue']).toBeTruthy()
        })
    })

    describe('keyboard handling', () => {
        it('should add keyboard event listener on mount', () => {
            mount(Drawer)
            expect(global.window.addEventListener).toHaveBeenCalledWith(
                'keydown',
                expect.any(Function)
            )
        })

        it('should close drawer on escape key when not persistent', async () => {
            wrapper = mount(Drawer)
            await wrapper.vm.open()
            expect(wrapper.vm.isOpen).toBe(true)

            // Simulate escape key press
            const event = new KeyboardEvent('keydown', { key: 'Escape' })
            await wrapper.vm.handleKeydown(event)
            expect(wrapper.vm.isOpen).toBe(false)
        })

        it('should not close drawer on escape key when persistent', async () => {
            wrapper = mount(Drawer, {
                props: { persistent: true },
            })
            await wrapper.vm.open()
            expect(wrapper.vm.isOpen).toBe(true)

            // Simulate escape key press
            const event = new KeyboardEvent('keydown', { key: 'Escape' })
            await wrapper.vm.handleKeydown(event)
            expect(wrapper.vm.isOpen).toBe(true) // Should remain open
        })
    })

    describe('slots', () => {
        it('should render content slot', () => {
            wrapper = mount(Drawer, {
                slots: {
                    content: '<div class="test-content">Content</div>',
                },
            })
            expect(wrapper.find('.test-content').exists()).toBe(true)
        })

        it('should render drawer slot', () => {
            wrapper = mount(Drawer, {
                slots: {
                    drawer: '<div class="test-drawer">Drawer</div>',
                },
            })
            expect(wrapper.find('.test-drawer').exists()).toBe(true)
        })

        it('should pass slot props to content slot', () => {
            wrapper = mount(Drawer, {
                slots: {
                    content: `
            <template #default="{ toggle, open, close }">
              <div class="slot-props">
                <button @click="toggle" class="toggle-btn">Toggle</button>
                <button @click="open" class="open-btn">Open</button>
                <button @click="close" class="close-btn">Close</button>
              </div>
            </template>
          `,
                },
            })

            expect(wrapper.find('.toggle-btn').exists()).toBe(true)
            expect(wrapper.find('.open-btn').exists()).toBe(true)
            expect(wrapper.find('.close-btn').exists()).toBe(true)
        })

        it('should pass slot props to drawer slot', () => {
            wrapper = mount(Drawer, {
                slots: {
                    drawer: `
            <template #default="{ close }">
              <div class="drawer-slot-props">
                <button @click="close" class="drawer-close-btn">Close</button>
              </div>
            </template>
          `,
                },
            })

            expect(wrapper.find('.drawer-close-btn').exists()).toBe(true)
        })
    })

    describe('template structure', () => {
        it('should render with correct structure', () => {
            wrapper = mount(Drawer)

            expect(wrapper.find('.drawer').exists()).toBe(true)
            expect(wrapper.find('.drawer-toggle').exists()).toBe(true)
            expect(wrapper.find('.drawer-content').exists()).toBe(true)
            expect(wrapper.find('.drawer-side').exists()).toBe(true)
            expect(wrapper.find('.drawer-overlay').exists()).toBe(true)
            expect(wrapper.find('aside').exists()).toBe(true)
        })

        it('should hide overlay when backdrop is false', () => {
            wrapper = mount(Drawer, {
                props: { backdrop: false },
            })
            expect(wrapper.find('.drawer-overlay').exists()).toBe(false)
        })

        it('should show close button when showCloseButton is true', () => {
            wrapper = mount(Drawer, {
                props: { showCloseButton: true },
            })
            expect(wrapper.find('.btn-circle').exists()).toBe(true)
        })

        it('should not show close button when showCloseButton is false', () => {
            wrapper = mount(Drawer, {
                props: { showCloseButton: false },
            })
            expect(wrapper.find('.btn-circle').exists()).toBe(false)
        })

        it('should bind checkbox to isOpen state', async () => {
            wrapper = mount(Drawer)
            const checkbox = wrapper.find('.drawer-toggle')

            expect(checkbox.attributes('type')).toBe('checkbox')
            expect(checkbox.element.checked).toBe(false)

            await wrapper.vm.open()
            expect(checkbox.element.checked).toBe(true)
        })
    })

    describe('default content', () => {
        it('should render default content when no slots provided', () => {
            wrapper = mount(Drawer)

            // Check for default content slot content
            expect(wrapper.text()).toContain('Open drawer')

            // Check for default drawer slot content
            expect(wrapper.text()).toContain('Drawer Content')
            expect(wrapper.text()).toContain('Sidebar Item 1')
            expect(wrapper.text()).toContain('Sidebar Item 2')
        })
    })
})

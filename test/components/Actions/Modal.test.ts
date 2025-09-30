import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Modal from '../../../src/runtime/components/Actions/Modal.vue'

describe('Modal', () => {
    it('mounts without crashing', () => {
        const wrapper = mount(Modal, {
            props: {
                modelValue: false,
            },
        })

        expect(wrapper.exists()).toBe(true)
    })

    it('emits update:modelValue when closed', async () => {
        const wrapper = mount(Modal, {
            props: {
                modelValue: true,
                closable: true,
                title: 'Modal',
            },
            slots: {
                default: 'Content',
            },
        })

        // Call the close method directly since DOM interaction with Teleport is complex
        await wrapper.vm.close()

        expect(wrapper.emitted('update:modelValue')).toBeTruthy()
        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
    })

    it('has correct props interface', () => {
        const wrapper = mount(Modal, {
            props: {
                modelValue: true,
                title: 'Test Title',
                size: 'lg',
                closable: true,
                closeOnBackdrop: true,
                closeOnEscape: true,
                persistent: false,
            },
            slots: {
                default: 'Modal content',
            },
        })

        expect(wrapper.props('modelValue')).toBe(true)
        expect(wrapper.props('title')).toBe('Test Title')
        expect(wrapper.props('size')).toBe('lg')
    })

    it('emits events correctly', async () => {
        const wrapper = mount(Modal, {
            props: {
                modelValue: false,
            },
        })

        await wrapper.vm.open()
        expect(wrapper.emitted('update:modelValue')).toBeTruthy()
        expect(wrapper.emitted('open')).toBeTruthy()

        await wrapper.vm.close()
        expect(wrapper.emitted('close')).toBeTruthy()
    })
})

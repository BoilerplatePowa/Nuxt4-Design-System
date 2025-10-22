import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import CodeMockup from '../../src/runtime/components/Mockup/CodeMockup.vue'

describe('CodeMockup', () => {
    describe('Basic rendering', () => {
        it('renders with default props', () => {
            const wrapper = mount(CodeMockup)

            expect(wrapper.classes()).toContain('mockup-code')
            expect(wrapper.classes()).toContain('w-full')
            expect(wrapper.text()).toBe('console.log("Hello, World!");')
        })

        it('renders custom code string', () => {
            const wrapper = mount(CodeMockup, {
                props: {
                    code: 'npm i daisyui',
                },
            })

            expect(wrapper.text()).toBe('npm i daisyui')
        })

        it('renders code with line numbers', () => {
            const wrapper = mount(CodeMockup, {
                props: {
                    code: 'line 1\nline 2\nline 3',
                    showLineNumbers: true,
                },
            })

            const preElements = wrapper.findAll('pre')
            expect(preElements).toHaveLength(3)
            expect(preElements[0].attributes('data-prefix')).toBe('1')
            expect(preElements[1].attributes('data-prefix')).toBe('2')
            expect(preElements[2].attributes('data-prefix')).toBe('3')
        })
    })

    describe('CodeLine array support', () => {
        it('renders CodeLine array with prefixes', () => {
            const codeLines = [
                { content: 'npm i daisyui', prefix: '$' },
                { content: 'installing...', prefix: '>', color: 'warning' },
                { content: 'Done!', prefix: '>', color: 'success' },
            ]

            const wrapper = mount(CodeMockup, {
                props: { code: codeLines },
            })

            const preElements = wrapper.findAll('pre')
            expect(preElements).toHaveLength(3)

            expect(preElements[0].attributes('data-prefix')).toBe('$')
            expect(preElements[0].text()).toBe('npm i daisyui')

            expect(preElements[1].attributes('data-prefix')).toBe('>')
            expect(preElements[1].text()).toBe('installing...')
            expect(preElements[1].classes()).toContain('text-warning')

            expect(preElements[2].attributes('data-prefix')).toBe('>')
            expect(preElements[2].text()).toBe('Done!')
            expect(preElements[2].classes()).toContain('text-success')
        })

        it('renders highlighted lines', () => {
            const codeLines = [
                { content: 'npm i daisyui', prefix: '1' },
                { content: 'Error!', prefix: '2', highlight: true, color: 'warning' },
            ]

            const wrapper = mount(CodeMockup, {
                props: { code: codeLines },
            })

            const preElements = wrapper.findAll('pre')
            expect(preElements[1].classes()).toContain('bg-warning')
            expect(preElements[1].classes()).toContain('text-warning-content')
        })
    })

    describe('Variants', () => {
        it('applies primary variant classes', () => {
            const wrapper = mount(CodeMockup, {
                props: {
                    code: 'test',
                    variant: 'primary',
                },
            })

            expect(wrapper.classes()).toContain('bg-primary')
            expect(wrapper.classes()).toContain('text-primary-content')
        })

        it('applies success variant classes', () => {
            const wrapper = mount(CodeMockup, {
                props: {
                    code: 'test',
                    variant: 'success',
                },
            })

            expect(wrapper.classes()).toContain('bg-success')
            expect(wrapper.classes()).toContain('text-success-content')
        })

        it('applies custom classes', () => {
            const wrapper = mount(CodeMockup, {
                props: {
                    code: 'test',
                    class: 'custom-class',
                },
            })

            expect(wrapper.classes()).toContain('custom-class')
        })
    })

    describe('Accessibility', () => {
        it('has proper structure for screen readers', () => {
            const wrapper = mount(CodeMockup, {
                props: {
                    code: 'npm i daisyui',
                },
            })

            const preElement = wrapper.find('pre')
            const codeElement = wrapper.find('code')

            expect(preElement.exists()).toBe(true)
            expect(codeElement.exists()).toBe(true)
        })
    })
})

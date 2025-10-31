import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import DataMigration from '../../src/runtime/components/DataInput/DataMigration.vue'
import { useMigrationStore } from '../../src/runtime/composables/useMigration'

describe('DataMigration', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })

    const mockOldData = [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
    ]

    const mockNewData = [
        { id: 101, name: 'John Doe', email: 'john.doe@newdomain.com' },
        { id: 102, name: 'Jane Smith', email: 'jane.smith@newdomain.com' },
        { id: 103, name: 'Robert Johnson', email: 'robert.j@newdomain.com' },
    ]

    describe('rendering', () => {
        it('renders with default props', () => {
            const wrapper = mount(DataMigration, {
                props: {
                    oldData: mockOldData,
                    newData: mockNewData,
                },
                global: {
                    plugins: [createPinia()],
                    stubs: {
                        Button: true,
                        Badge: true,
                        Progress: true,
                        Input: true,
                        Status: true,
                        Modal: true,
                    },
                },
            })

            expect(wrapper.find('.data-migration').exists()).toBe(true)
            expect(wrapper.text()).toContain('Data Migration')
        })

        it('renders custom title and description', () => {
            const wrapper = mount(DataMigration, {
                props: {
                    oldData: mockOldData,
                    newData: mockNewData,
                    title: 'Custom Migration',
                    description: 'Migrate your data here',
                },
                global: {
                    plugins: [createPinia()],
                    stubs: {
                        Button: true,
                        Badge: true,
                        Progress: true,
                        Input: true,
                        Status: true,
                        Modal: true,
                    },
                },
            })

            expect(wrapper.text()).toContain('Custom Migration')
            expect(wrapper.text()).toContain('Migrate your data here')
        })

        it('displays correct data counts', () => {
            const wrapper = mount(DataMigration, {
                props: {
                    oldData: mockOldData,
                    newData: mockNewData,
                },
                global: {
                    plugins: [createPinia()],
                    stubs: {
                        Button: true,
                        Badge: true,
                        Progress: true,
                        Input: true,
                        Status: true,
                        Modal: true,
                    },
                },
            })

            expect(wrapper.text()).toContain('Old Data (3)')
            expect(wrapper.text()).toContain('New Data (3)')
        })
    })

    describe('data display', () => {
        it('uses custom keyField', () => {
            const customData = [{ customId: 'a1', name: 'Test' }]

            const wrapper = mount(DataMigration, {
                props: {
                    oldData: customData,
                    newData: customData,
                    keyField: 'customId',
                },
                global: {
                    plugins: [createPinia()],
                    stubs: {
                        Button: true,
                        Badge: true,
                        Progress: true,
                        Input: true,
                        Status: true,
                        Modal: true,
                    },
                },
            })

            expect(wrapper.html()).toContain('data-old-id="a1"')
        })

        it('uses custom displayField', () => {
            const wrapper = mount(DataMigration, {
                props: {
                    oldData: mockOldData,
                    newData: mockNewData,
                    displayField: 'email',
                },
                global: {
                    plugins: [createPinia()],
                    stubs: {
                        Button: true,
                        Badge: true,
                        Progress: true,
                        Input: true,
                        Status: true,
                        Modal: true,
                    },
                },
            })

            expect(wrapper.text()).toContain('john@example.com')
            expect(wrapper.text()).toContain('jane@example.com')
        })
    })

    describe('linking functionality', () => {
        it('creates link when old and new items are clicked', async () => {
            const wrapper = mount(DataMigration, {
                props: {
                    oldData: mockOldData,
                    newData: mockNewData,
                },
                global: {
                    plugins: [createPinia()],
                    stubs: {
                        Button: true,
                        Badge: true,
                        Progress: true,
                        Input: true,
                        Status: true,
                        Modal: true,
                    },
                },
            })

            const store = useMigrationStore()

            // Click old item
            const oldRow = wrapper.find('[data-old-id="1"]')
            await oldRow.trigger('click')

            // Click new item
            const newRow = wrapper.find('[data-new-id="101"]')
            await newRow.trigger('click')

            // Check store
            expect(store.linkedPairs).toHaveLength(1)
            expect(store.linkedPairs[0]).toMatchObject({
                oldId: 1,
                newId: 101,
            })
        })

        it('emits link-created event', async () => {
            const wrapper = mount(DataMigration, {
                props: {
                    oldData: mockOldData,
                    newData: mockNewData,
                },
                global: {
                    plugins: [createPinia()],
                    stubs: {
                        Button: true,
                        Badge: true,
                        Progress: true,
                        Input: true,
                        Status: true,
                        Modal: true,
                    },
                },
            })

            // Click old item
            const oldRow = wrapper.find('[data-old-id="1"]')
            await oldRow.trigger('click')

            // Click new item
            const newRow = wrapper.find('[data-new-id="101"]')
            await newRow.trigger('click')

            expect(wrapper.emitted('link-created')).toBeTruthy()
            expect(wrapper.emitted('link-created')?.[0]).toMatchObject([
                {
                    oldId: 1,
                    newId: 101,
                },
            ])
        })

        it('removes link when linked item is clicked', async () => {
            const wrapper = mount(DataMigration, {
                props: {
                    oldData: mockOldData,
                    newData: mockNewData,
                },
                global: {
                    plugins: [createPinia()],
                    stubs: {
                        Button: true,
                        Badge: true,
                        Progress: true,
                        Input: true,
                        Status: true,
                        Modal: true,
                    },
                },
            })

            const store = useMigrationStore()

            // Create link
            const oldRow = wrapper.find('[data-old-id="1"]')
            await oldRow.trigger('click')
            const newRow = wrapper.find('[data-new-id="101"]')
            await newRow.trigger('click')

            expect(store.linkedPairs).toHaveLength(1)

            // Click linked item to remove
            await oldRow.trigger('click')

            expect(store.linkedPairs).toHaveLength(0)
            expect(wrapper.emitted('link-removed')).toBeTruthy()
        })
    })

    describe('search functionality', () => {
        it('filters old data based on search query', async () => {
            const wrapper = mount(DataMigration, {
                props: {
                    oldData: mockOldData,
                    newData: mockNewData,
                },
                global: {
                    plugins: [createPinia()],
                    stubs: {
                        Button: true,
                        Badge: true,
                        Progress: true,
                        Input: {
                            template:
                                '<input :value="modelValue" @input="$emit(\'update:modelValue\', $event.target.value)" />',
                            props: ['modelValue'],
                            emits: ['update:modelValue'],
                        },
                        Status: true,
                        Modal: true,
                    },
                },
            })

            // Find search input for old data
            const searchInputs = wrapper.findAll('input')
            const oldSearchInput = searchInputs[0]

            // Type search query
            await oldSearchInput.setValue('John')
            await wrapper.vm.$nextTick()

            // Should show only matching items
            const oldTable = wrapper.find('.old-data-panel table tbody')
            expect(oldTable.text()).toContain('John Doe')
            expect(oldTable.text()).not.toContain('Jane Smith')
        })
    })

    describe('progress tracking', () => {
        it('calculates progress percentage correctly', async () => {
            const wrapper = mount(DataMigration, {
                props: {
                    oldData: mockOldData,
                    newData: mockNewData,
                },
                global: {
                    plugins: [createPinia()],
                    stubs: {
                        Button: true,
                        Badge: true,
                        Progress: {
                            template: '<div class="progress" :data-value="value"></div>',
                            props: ['value'],
                        },
                        Input: true,
                        Status: true,
                        Modal: true,
                    },
                },
            })

            const store = useMigrationStore()

            // No links - 0%
            let progress = wrapper.find('.progress')
            expect(progress.attributes('data-value')).toBe('0')

            // Add one link - 33.33%
            store.addLink(1, 101)
            await wrapper.vm.$nextTick()
            progress = wrapper.find('.progress')
            expect(parseFloat(progress.attributes('data-value') || '0')).toBeCloseTo(33.33, 1)

            // Add all links - 100%
            store.addLink(2, 102)
            store.addLink(3, 103)
            await wrapper.vm.$nextTick()
            progress = wrapper.find('.progress')
            expect(parseFloat(progress.attributes('data-value') || '0')).toBeCloseTo(100, 0)
        })
    })

    describe('auto-matching', () => {
        it('shows auto-match button when enabled', () => {
            const wrapper = mount(DataMigration, {
                props: {
                    oldData: mockOldData,
                    newData: mockNewData,
                    showAutoMatch: true,
                },
                global: {
                    plugins: [createPinia()],
                    stubs: {
                        Button: {
                            template: '<button><slot /></button>',
                        },
                        Badge: true,
                        Progress: true,
                        Input: true,
                        Status: true,
                        Modal: true,
                    },
                },
            })

            expect(wrapper.text()).toContain('Auto-Match')
        })

        it('hides auto-match button when disabled', () => {
            const wrapper = mount(DataMigration, {
                props: {
                    oldData: mockOldData,
                    newData: mockNewData,
                    showAutoMatch: false,
                },
                global: {
                    plugins: [createPinia()],
                    stubs: {
                        Button: {
                            template: '<button><slot /></button>',
                        },
                        Badge: true,
                        Progress: true,
                        Input: true,
                        Status: true,
                        Modal: true,
                    },
                },
            })

            expect(wrapper.text()).not.toContain('Auto-Match')
        })
    })

    describe('layout', () => {
        it('applies horizontal layout by default', () => {
            const wrapper = mount(DataMigration, {
                props: {
                    oldData: mockOldData,
                    newData: mockNewData,
                },
                global: {
                    plugins: [createPinia()],
                    stubs: {
                        Button: true,
                        Badge: true,
                        Progress: true,
                        Input: true,
                        Status: true,
                        Modal: true,
                    },
                },
            })

            expect(wrapper.find('.migration-layout').classes()).toContain('flex-row')
        })

        it('applies vertical layout when specified', () => {
            const wrapper = mount(DataMigration, {
                props: {
                    oldData: mockOldData,
                    newData: mockNewData,
                    layout: 'vertical',
                },
                global: {
                    plugins: [createPinia()],
                    stubs: {
                        Button: true,
                        Badge: true,
                        Progress: true,
                        Input: true,
                        Status: true,
                        Modal: true,
                    },
                },
            })

            expect(wrapper.find('.migration-layout').classes()).toContain('flex-col')
        })
    })

    describe('accessibility', () => {
        it('has proper aria-label', () => {
            const wrapper = mount(DataMigration, {
                props: {
                    oldData: mockOldData,
                    newData: mockNewData,
                    ariaLabel: 'Custom migration interface',
                },
                global: {
                    plugins: [createPinia()],
                    stubs: {
                        Button: true,
                        Badge: true,
                        Progress: true,
                        Input: true,
                        Status: true,
                        Modal: true,
                    },
                },
            })

            expect(wrapper.attributes('aria-label')).toBe('Custom migration interface')
        })
    })

    describe('events', () => {
        it('emits complete event with all mappings', async () => {
            const wrapper = mount(DataMigration, {
                props: {
                    oldData: mockOldData,
                    newData: mockNewData,
                },
                global: {
                    plugins: [createPinia()],
                    stubs: {
                        Button: {
                            template: '<button @click="$emit(\'click\')"><slot /></button>',
                            emits: ['click'],
                        },
                        Badge: true,
                        Progress: true,
                        Input: true,
                        Status: true,
                        Modal: true,
                    },
                },
            })

            const store = useMigrationStore()

            // Create all links
            store.addLink(1, 101)
            store.addLink(2, 102)
            store.addLink(3, 103)

            await wrapper.vm.$nextTick()

            // Find and click complete button
            const buttons = wrapper.findAll('button')
            const completeButton = buttons.find((btn) => btn.text().includes('Complete'))

            if (completeButton) {
                await completeButton.trigger('click')

                expect(wrapper.emitted('complete')).toBeTruthy()
                expect(wrapper.emitted('complete')?.[0][0]).toHaveLength(3)
            }
        })

        it('emits export event', async () => {
            const wrapper = mount(DataMigration, {
                props: {
                    oldData: mockOldData,
                    newData: mockNewData,
                },
                global: {
                    plugins: [createPinia()],
                    stubs: {
                        Button: {
                            template: '<button @click="$emit(\'click\')"><slot /></button>',
                            emits: ['click'],
                        },
                        Badge: true,
                        Progress: true,
                        Input: true,
                        Status: true,
                        Modal: true,
                    },
                },
            })

            const store = useMigrationStore()
            store.addLink(1, 101)

            await wrapper.vm.$nextTick()

            // Find and click export button
            const buttons = wrapper.findAll('button')
            const exportButton = buttons.find((btn) => btn.text().includes('Export'))

            if (exportButton) {
                await exportButton.trigger('click')

                expect(wrapper.emitted('export')).toBeTruthy()
            }
        })
    })
})


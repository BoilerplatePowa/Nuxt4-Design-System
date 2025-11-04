import { describe, it, expect, beforeEach } from 'vitest'
import { useBreadcrumbs } from '../../src/runtime/composables/useBreadcrumbs'

describe('useBreadcrumbs', () => {
    let breadcrumbs: ReturnType<typeof useBreadcrumbs>

    beforeEach(() => {
        breadcrumbs = useBreadcrumbs()
        breadcrumbs.clearBreadcrumbs()
    })

    describe('setBreadcrumbs', () => {
        it('should set breadcrumbs with replace option', () => {
            const items = [
                { label: 'Home', href: '/', value: 'home' },
                { label: 'Products', href: '/products', value: 'products' },
                { label: 'Laptop', value: 'laptop' },
            ]

            breadcrumbs.setBreadcrumbs(items)

            expect(breadcrumbs.breadcrumbs.value).toHaveLength(3)
            expect(breadcrumbs.breadcrumbs.value[0].label).toBe('Home')
            expect(breadcrumbs.breadcrumbs.value[2].active).toBe(true)
        })

        it('should add home breadcrumb when autoHome is true', () => {
            const items = [{ label: 'Products', href: '/products', value: 'products' }]

            breadcrumbs.setBreadcrumbs(items, { autoHome: true })

            expect(breadcrumbs.breadcrumbs.value).toHaveLength(2)
            expect(breadcrumbs.breadcrumbs.value[0].label).toBe('Home')
            expect(breadcrumbs.breadcrumbs.value[0].href).toBe('/')
        })

        it('should limit breadcrumbs when maxItems is set', () => {
            const items = [
                { label: 'Home', value: 'home' },
                { label: 'Category 1', value: 'cat1' },
                { label: 'Category 2', value: 'cat2' },
                { label: 'Category 3', value: 'cat3' },
                { label: 'Product', value: 'product' },
            ]

            breadcrumbs.setBreadcrumbs(items, { maxItems: 3 })

            expect(breadcrumbs.breadcrumbs.value).toHaveLength(3)
            expect(breadcrumbs.breadcrumbs.value[1].label).toBe('...')
        })
    })

    describe('addBreadcrumb', () => {
        it('should add a single breadcrumb', () => {
            breadcrumbs.setBreadcrumbs([{ label: 'Home', value: 'home' }])

            breadcrumbs.addBreadcrumb({ label: 'Products', value: 'products' })

            expect(breadcrumbs.breadcrumbs.value).toHaveLength(2)
            expect(breadcrumbs.breadcrumbs.value[1].active).toBe(true)
            expect(breadcrumbs.breadcrumbs.value[0].active).toBe(false)
        })
    })

    describe('removeBreadcrumb', () => {
        it('should remove breadcrumb by value', () => {
            breadcrumbs.setBreadcrumbs([
                { label: 'Home', value: 'home' },
                { label: 'Products', value: 'products' },
                { label: 'Laptop', value: 'laptop' },
            ])

            breadcrumbs.removeBreadcrumb('products')

            expect(breadcrumbs.breadcrumbs.value).toHaveLength(2)
            expect(breadcrumbs.breadcrumbs.value[1].active).toBe(true)
        })
    })

    describe('goBack', () => {
        it('should go back specified number of steps', () => {
            breadcrumbs.setBreadcrumbs([
                { label: 'Home', value: 'home' },
                { label: 'Products', value: 'products' },
                { label: 'Laptop', value: 'laptop' },
            ])

            breadcrumbs.goBack(2)

            expect(breadcrumbs.breadcrumbs.value).toHaveLength(1)
            expect(breadcrumbs.breadcrumbs.value[0].active).toBe(true)
        })
    })

    describe('convenience methods', () => {
        it('should set page breadcrumbs with auto home', () => {
            breadcrumbs.setPageBreadcrumbs('Products')

            expect(breadcrumbs.breadcrumbs.value).toHaveLength(2)
            expect(breadcrumbs.breadcrumbs.value[0].label).toBe('Home')
            expect(breadcrumbs.breadcrumbs.value[1].label).toBe('Products')
        })

        it('should set section breadcrumbs', () => {
            breadcrumbs.setSectionBreadcrumbs('Products', 'Laptops')

            expect(breadcrumbs.breadcrumbs.value).toHaveLength(3)
            expect(breadcrumbs.breadcrumbs.value[0].label).toBe('Home')
            expect(breadcrumbs.breadcrumbs.value[1].label).toBe('Products')
            expect(breadcrumbs.breadcrumbs.value[2].label).toBe('Laptops')
        })

        it('should set nested breadcrumbs', () => {
            breadcrumbs.setNestedBreadcrumbs(['Products', 'Electronics', 'Laptops'])

            expect(breadcrumbs.breadcrumbs.value).toHaveLength(4)
            expect(breadcrumbs.breadcrumbs.value[0].label).toBe('Home')
            expect(breadcrumbs.breadcrumbs.value[1].label).toBe('Products')
            expect(breadcrumbs.breadcrumbs.value[2].label).toBe('Electronics')
            expect(breadcrumbs.breadcrumbs.value[3].label).toBe('Laptops')
        })
    })

    describe('utility methods', () => {
        it('should get current path', () => {
            breadcrumbs.setBreadcrumbs([
                { label: 'Home', value: 'home' },
                { label: 'Products', value: 'products' },
                { label: 'Laptop', value: 'laptop' },
            ])

            expect(breadcrumbs.getCurrentPath()).toBe('Home / Products / Laptop')
        })

        it('should get current item', () => {
            breadcrumbs.setBreadcrumbs([
                { label: 'Home', value: 'home' },
                { label: 'Products', value: 'products' },
            ])

            const current = breadcrumbs.getCurrentItem()
            expect(current?.label).toBe('Products')
            expect(current?.active).toBe(true)
        })
    })

    describe('clearBreadcrumbs', () => {
        it('should clear all breadcrumbs', () => {
            breadcrumbs.setBreadcrumbs([
                { label: 'Home', value: 'home' },
                { label: 'Products', value: 'products' },
            ])

            breadcrumbs.clearBreadcrumbs()

            expect(breadcrumbs.breadcrumbs.value).toHaveLength(0)
        })
    })
})

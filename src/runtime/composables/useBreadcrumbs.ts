import { ref, readonly } from 'vue'

// Global breadcrumbs state
const breadcrumbs = ref<BreadcrumbItem[]>([])

export interface BreadcrumbItem {
    label: string
    href?: string
    icon?: string
    value?: string | number
    disabled?: boolean
    active?: boolean
}

export interface BreadcrumbOptions {
    replace?: boolean // Replace all breadcrumbs or add to existing
    maxItems?: number // Maximum number of breadcrumbs to show
    autoHome?: boolean // Automatically add home breadcrumb
    homeLabel?: string // Label for home breadcrumb
    homeHref?: string // Href for home breadcrumb
    homeIcon?: string // Icon for home breadcrumb
}

export function useBreadcrumbs() {
    const setBreadcrumbs = (items: BreadcrumbItem[], options: BreadcrumbOptions = {}) => {
        const {
            replace = true,
            maxItems,
            autoHome = false,
            homeLabel = 'Home',
            homeHref = '/',
            homeIcon = 'home'
        } = options

        let newBreadcrumbs = [...items]

        // Add home breadcrumb if requested
        if (autoHome && (replace || breadcrumbs.value.length === 0)) {
            const homeItem: BreadcrumbItem = {
                label: homeLabel,
                href: homeHref,
                icon: homeIcon,
                value: 'home'
            }
            newBreadcrumbs = [homeItem, ...newBreadcrumbs]
        }

        // Apply max items limit
        if (maxItems && newBreadcrumbs.length > maxItems) {
            const firstItem = newBreadcrumbs[0]
            const lastItems = newBreadcrumbs.slice(-(maxItems - 2))
            const ellipsis: BreadcrumbItem = { 
                label: '...', 
                disabled: true,
                value: 'ellipsis'
            }
            newBreadcrumbs = [firstItem, ellipsis, ...lastItems]
        }

        // Mark the last item as active
        if (newBreadcrumbs.length > 0) {
            newBreadcrumbs.forEach((item, index) => {
                item.active = index === newBreadcrumbs.length - 1
            })
        }

        if (replace) {
            breadcrumbs.value = newBreadcrumbs
        } else {
            breadcrumbs.value = [...breadcrumbs.value, ...newBreadcrumbs]
        }

        return newBreadcrumbs
    }

    const addBreadcrumb = (item: BreadcrumbItem) => {
        // Mark all existing items as not active
        breadcrumbs.value.forEach(breadcrumb => {
            breadcrumb.active = false
        })

        // Mark new item as active
        item.active = true

        breadcrumbs.value.push(item)
        return item
    }

    const removeBreadcrumb = (value: string | number) => {
        const index = breadcrumbs.value.findIndex(item => item.value === value)
        if (index > -1) {
            breadcrumbs.value.splice(index, 1)
            
            // Mark the last item as active
            if (breadcrumbs.value.length > 0) {
                breadcrumbs.value.forEach((item, idx) => {
                    item.active = idx === breadcrumbs.value.length - 1
                })
            }
        }
    }

    const clearBreadcrumbs = () => {
        breadcrumbs.value = []
    }

    const goBack = (steps: number = 1) => {
        if (breadcrumbs.value.length > steps) {
            breadcrumbs.value.splice(-steps)
            
            // Mark the last item as active
            if (breadcrumbs.value.length > 0) {
                breadcrumbs.value.forEach((item, index) => {
                    item.active = index === breadcrumbs.value.length - 1
                })
            }
        }
    }

    const getCurrentPath = () => {
        return breadcrumbs.value.map(item => item.label).join(' / ')
    }

    const getCurrentItem = () => {
        return breadcrumbs.value.find(item => item.active) || breadcrumbs.value[breadcrumbs.value.length - 1]
    }

    // Convenience methods for common breadcrumb patterns
    const setPageBreadcrumbs = (pageName: string, options: BreadcrumbOptions = {}) => {
        const items: BreadcrumbItem[] = [
            {
                label: pageName,
                value: pageName.toLowerCase().replace(/\s+/g, '-')
            }
        ]
        return setBreadcrumbs(items, { autoHome: true, ...options })
    }

    const setSectionBreadcrumbs = (section: string, page: string, options: BreadcrumbOptions = {}) => {
        const items: BreadcrumbItem[] = [
            {
                label: section,
                href: `/${section.toLowerCase()}`,
                value: section.toLowerCase()
            },
            {
                label: page,
                value: page.toLowerCase().replace(/\s+/g, '-')
            }
        ]
        return setBreadcrumbs(items, { autoHome: true, ...options })
    }

    const setNestedBreadcrumbs = (path: string[], options: BreadcrumbOptions = {}) => {
        const items: BreadcrumbItem[] = path.map((segment, index) => ({
            label: segment,
            href: index < path.length - 1 ? `/${path.slice(0, index + 1).join('/')}` : undefined,
            value: segment.toLowerCase().replace(/\s+/g, '-')
        }))
        return setBreadcrumbs(items, { autoHome: true, ...options })
    }

    return {
        breadcrumbs: readonly(breadcrumbs),
        setBreadcrumbs,
        addBreadcrumb,
        removeBreadcrumb,
        clearBreadcrumbs,
        goBack,
        getCurrentPath,
        getCurrentItem,
        setPageBreadcrumbs,
        setSectionBreadcrumbs,
        setNestedBreadcrumbs,
    }
}

// Export the composable for global access
export default useBreadcrumbs

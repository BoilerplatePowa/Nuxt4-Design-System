// Tabs Component Maps
// Based on DaisyUI documentation: https://daisyui.com/components/tabs/

export const tabsPartMap = {
    tab: 'tab',
    'tab-content': 'tab-content',
} as const

export const tabsStyleMap = {
    box: 'tabs-box',
    border: 'tabs-border',
    lift: 'tabs-lift',
} as const

export const tabsModifierMap = {
    active: 'tab-active',
    disabled: 'tab-disabled',
} as const

export const tabsPlacementMap = {
    top: 'tabs-top',
    bottom: 'tabs-bottom',
} as const

export const tabsSizeMap = {
    xs: 'tabs-xs',
    sm: 'tabs-sm',
    md: 'tabs-md',
    lg: 'tabs-lg',
    xl: 'tabs-xl',
} as const

export const tabsBaseClass = 'tabs' as const

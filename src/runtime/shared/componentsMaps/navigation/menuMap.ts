// Menu Component Maps
// Based on DaisyUI documentation: https://daisyui.com/components/menu/

export const menuPartMap = {
  title: 'menu-title',
  dropdown: 'menu-dropdown',
  'dropdown-toggle': 'menu-dropdown-toggle',
} as const

export const menuModifierMap = {
  disabled: 'menu-disabled',
  active: 'menu-active',
  focus: 'menu-focus',
  'dropdown-show': 'menu-dropdown-show',
} as const

export const menuSizeMap = {
  xs: 'menu-xs',
  sm: 'menu-sm',
  md: 'menu-md',
  lg: 'menu-lg',
  xl: 'menu-xl',
} as const

export const menuDirectionMap = {
  vertical: 'menu-vertical',
  horizontal: 'menu-horizontal',
} as const

export const menuBaseClass = 'menu' as const

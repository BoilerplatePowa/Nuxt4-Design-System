// Dock Component Maps
// Based on DaisyUI documentation: https://daisyui.com/components/dock/

export const dockPartMap = {
    label: 'dock-label'
} as const;

export const dockModifierMap = {
    active: 'dock-active'
} as const;

export const dockSizeMap = {
    xs: 'dock-xs',
    sm: 'dock-sm',
    md: 'dock-md',
    lg: 'dock-lg',
    xl: 'dock-xl'
} as const;

export const dockBaseClass = 'dock' as const;

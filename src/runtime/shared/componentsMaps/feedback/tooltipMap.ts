// Tooltip Component Maps
// Based on DaisyUI documentation: https://daisyui.com/components/tooltip/

export const tooltipPartMap = {
    content: 'tooltip-content'
} as const;

export const tooltipPlacementMap = {
    top: 'tooltip-top',
    bottom: 'tooltip-bottom',
    left: 'tooltip-left',
    right: 'tooltip-right'
} as const;

export const tooltipModifierMap = {
    open: 'tooltip-open'
} as const;

export const tooltipColorMap = {
    neutral: 'tooltip-neutral',
    primary: 'tooltip-primary',
    secondary: 'tooltip-secondary',
    accent: 'tooltip-accent',
    info: 'tooltip-info',
    success: 'tooltip-success',
    warning: 'tooltip-warning',
    error: 'tooltip-error'
} as const;

export const tooltipBaseClass = 'tooltip' as const;

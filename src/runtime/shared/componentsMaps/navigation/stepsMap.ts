// Steps Component Maps
// Based on DaisyUI documentation: https://daisyui.com/components/steps/

export const stepsPartMap = {
    step: 'step',
    'step-icon': 'step-icon'
} as const;

export const stepsColorMap = {
    neutral: 'step-neutral',
    primary: 'step-primary',
    secondary: 'step-secondary',
    accent: 'step-accent',
    info: 'step-info',
    success: 'step-success',
    warning: 'step-warning',
    error: 'step-error'
} as const;

export const stepsDirectionMap = {
    vertical: 'steps-vertical',
    horizontal: 'steps-horizontal'
} as const;

export const stepsBaseClass = 'steps' as const;

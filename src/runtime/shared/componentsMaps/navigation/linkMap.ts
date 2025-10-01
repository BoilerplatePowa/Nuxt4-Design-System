// Link Component Maps
// Based on DaisyUI documentation: https://daisyui.com/components/link/

export const linkStyleMap = {
  hover: 'link-hover',
} as const

export const linkColorMap = {
  neutral: 'link-neutral',
  primary: 'link-primary',
  secondary: 'link-secondary',
  accent: 'link-accent',
  success: 'link-success',
  info: 'link-info',
  warning: 'link-warning',
  error: 'link-error',
} as const

export const linkBaseClass = 'link' as const

export const chatPartMap = {
  image: 'chat-image',
  header: 'chat-header',
  footer: 'chat-footer',
  bubble: 'chat-bubble',
} as const

export const chatPlacementMap = {
  start: 'chat-start',
  end: 'chat-end',
} as const

export const chatBubbleColorMap = {
  neutral: 'chat-bubble-neutral',
  primary: 'chat-bubble-primary',
  secondary: 'chat-bubble-secondary',
  accent: 'chat-bubble-accent',
  info: 'chat-bubble-info',
  success: 'chat-bubble-success',
  warning: 'chat-bubble-warning',
  error: 'chat-bubble-error',
} as const

export const chatBaseClass = 'chat' as const

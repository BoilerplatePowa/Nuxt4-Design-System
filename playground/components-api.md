# Component API Reference

This document provides detailed API information for all components available in the Nuxt Design System.

## 🎯 Actions Category

### Button Component (`BpButton`)

The primary button component with extensive customization options.

#### Props

| Prop                | Type                              | Default           | Description                      |
| ------------------- | --------------------------------- | ----------------- | -------------------------------- |
| `color`             | `BtnColor`                        | `'primary'`       | Button color variant             |
| `style`             | `BtnStyle`                        | `undefined`       | Button style variant             |
| `size`              | `BtnSize`                         | `'md'`            | Button size                      |
| `active`            | `boolean`                         | `false`           | Active state                     |
| `wide`              | `boolean`                         | `false`           | Wide button modifier             |
| `block`             | `boolean`                         | `false`           | Block button modifier            |
| `square`            | `boolean`                         | `false`           | Square button modifier           |
| `circle`            | `boolean`                         | `false`           | Circle button modifier           |
| `disabled`          | `boolean`                         | `false`           | Disabled state                   |
| `loading`           | `boolean`                         | `false`           | Loading state                    |
| `loadingText`       | `string`                          | `''`              | Text shown during loading        |
| `hideTextOnLoading` | `boolean`                         | `false`           | Hide text during loading         |
| `type`              | `'button' \| 'submit' \| 'reset'` | `'button'`        | Button type                      |
| `fullWidth`         | `boolean`                         | `false`           | Full width (legacy)              |
| `glass`             | `boolean`                         | `false`           | Glass effect                     |
| `noAnimation`       | `boolean`                         | `false`           | Disable animations               |
| `confirmAction`     | `boolean`                         | `false`           | Show confirmation dialog         |
| `confirmText`       | `string`                          | `'Are you sure?'` | Confirmation text                |
| `debounceMs`        | `number`                          | `0`               | Click debounce delay             |
| `autoFocus`         | `boolean`                         | `false`           | Auto focus on mount              |
| `ariaLabel`         | `string`                          | `undefined`       | Accessibility label              |
| `ariaPressed`       | `boolean`                         | `undefined`       | Pressed state for accessibility  |
| `ariaExpanded`      | `boolean`                         | `undefined`       | Expanded state for accessibility |
| `ariaDescribedby`   | `string`                          | `undefined`       | Element ID that describes button |
| `iconLeft`          | `Component`                       | `undefined`       | Left icon component              |
| `iconRight`         | `Component`                       | `undefined`       | Right icon component             |
| `iconSize`          | `Size \| number`                  | `24`              | Icon size                        |

#### Events

| Event     | Payload         | Description                   |
| --------- | --------------- | ----------------------------- |
| `click`   | `MouseEvent`    | Fired when button is clicked  |
| `keydown` | `KeyboardEvent` | Fired on key press            |
| `focus`   | `FocusEvent`    | Fired when button gains focus |
| `blur`    | `FocusEvent`    | Fired when button loses focus |

#### Slots

| Slot         | Description               |
| ------------ | ------------------------- |
| `default`    | Button content            |
| `icon-left`  | Custom left icon content  |
| `icon-right` | Custom right icon content |

#### Examples

```vue
<!-- Basic usage -->
<BpButton color="primary">Click me</BpButton>

<!-- With variants -->
<BpButton color="success" style="outline" size="lg" :loading="isSubmitting">
  Submit Form
</BpButton>

<!-- With icons -->
<script setup lang="ts">
import { Heart, ArrowRight, Settings } from 'lucide-vue-next'
</script>

<BpButton :icon-left="Heart" :icon-right="ArrowRight" color="accent">
  Like & Continue
</BpButton>

<!-- Circle button -->
<BpButton circle :icon-left="Settings" color="neutral" />
```

#### Color Variants (`BtnColor`)

```typescript
type BtnColor =
    | 'neutral' // btn-neutral
    | 'primary' // btn-primary
    | 'secondary' // btn-secondary
    | 'accent' // btn-accent
    | 'info' // btn-info
    | 'success' // btn-success
    | 'warning' // btn-warning
    | 'error' // btn-error
```

#### Style Variants (`BtnStyle`)

```typescript
type BtnStyle =
    | 'outline' // btn-outline
    | 'dash' // btn-dash
    | 'soft' // btn-soft
    | 'ghost' // btn-ghost
    | 'link' // btn-link
```

#### Size Variants (`BtnSize`)

```typescript
type BtnSize =
    | 'xs' // btn-xs
    | 'sm' // btn-sm
    | 'md' // btn-md
    | 'lg' // btn-lg
    | 'xl' // btn-xl
```

---

## 🎨 Icons Usage

### Direct Icon Component Integration

Icons are now passed as components directly instead of using a centralized Icon component. This allows for better tree-shaking and flexibility.

#### Basic Usage

```vue
<script setup lang="ts">
import { Heart, Star, Settings } from 'lucide-vue-next'
</script>

<template>
  <!-- Direct component rendering -->
  <component :is="Heart" class="w-6 h-6 text-red-500" />
  <component :is="Star" class="w-8 h-8 text-yellow-500" />
  <component :is="Settings" class="w-5 h-5 text-blue-500" />
</template>
```

#### With Button Component

```vue
<script setup lang="ts">
import { Save, ArrowRight } from 'lucide-vue-next'
</script>

<template>
  <BpButton :icon-left="Save" :icon-right="ArrowRight" color="primary">
    Save & Continue
  </BpButton>
</template>
```

#### Available Icons

The design system supports all icons from Lucide Vue Next. Import only the icons you need:

```typescript
import {
    Heart, Star, Settings, User, Home, Search,
    Mail, Phone, Calendar, Download, Upload,
    Edit, Trash2, Plus, Minus, Check, X,
    ArrowLeft, ArrowRight, ArrowUp, ArrowDown,
    Menu, Info, AlertCircle, CheckCircle, XCircle,
    HelpCircle, Eye, EyeOff, Lock, Unlock
    // ... and many more
} from 'lucide-vue-next'
```

**See [Icon Migration Guide](../ICON-MIGRATION-GUIDE.md) for complete migration instructions.**

---

## 🔧 Component Mapping System

The design system uses a sophisticated mapping system to ensure consistency and maintainability.

### Button Mapping

```typescript
// Color mapping
export const btnColorMap = {
    neutral: 'btn-neutral',
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    accent: 'btn-accent',
    info: 'btn-info',
    success: 'btn-success',
    warning: 'btn-warning',
    error: 'btn-error',
} as const

// Style mapping
export const btnStyleMap = {
    outline: 'btn-outline',
    dash: 'btn-dash',
    soft: 'btn-soft',
    ghost: 'btn-ghost',
    link: 'btn-link',
} as const

// Size mapping
export const btnSizeMap = {
    xs: 'btn-xs',
    sm: 'btn-sm',
    md: 'btn-md',
    lg: 'btn-lg',
    xl: 'btn-xl',
} as const

// Behavior mapping
export const btnBehaviorMap = {
    active: 'btn-active',
    disabled: 'btn-disabled',
} as const

// Modifier mapping
export const btnModifierMap = {
    wide: 'btn-wide',
    block: 'btn-block',
    square: 'btn-square',
    circle: 'btn-circle',
} as const
```

### Icon Size Utilities

```typescript
// Icon size mapping for consistent sizing
export const iconSizeMap = {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 32,
    xl: 40,
    '2xl': 48,
} as const

// Usage with Lucide icons
import { Settings } from 'lucide-vue-next'

// Pass size as prop
<component :is="Settings" :size="iconSizeMap.lg" />
```

---

## 🎨 Theme Integration

### Available Themes

The design system supports multiple DaisyUI themes:

```typescript
const themes = [
    'light',
    'dark',
    'cupcake',
    'corporate',
    'synthwave',
    'retro',
    'cyberpunk',
    'valentine',
    'halloween',
    'garden',
    'forest',
    'aqua',
    'lofi',
    'pastel',
    'fantasy',
    'wireframe',
    'black',
    'luxury',
    'dracula',
    'cmyk',
]
```

### Theme Switching

```typescript
function setTheme(theme: string) {
    if (process.client) {
        document.documentElement.setAttribute('data-theme', theme)
        localStorage.setItem('@nuxt-design-system/theme', theme)
    }
}

// Initialize theme
onMounted(() => {
    const savedTheme = localStorage.getItem('@nuxt-design-system/theme') || 'light'
    setTheme(savedTheme)
})
```

---

## ♿ Accessibility Features

### ARIA Support

All components include proper ARIA attributes:

```vue
<!-- Button with ARIA -->
<BpButton
    :aria-label="buttonLabel"
    :aria-pressed="isPressed"
    :aria-expanded="isExpanded"
    :aria-describedby="descriptionId"
>
  Button Text
</BpButton>

<!-- Icon with accessibility -->
<Icon name="info" :ariaLabel="iconDescription" :ariaHidden="false" />
```

### Keyboard Navigation

- **Tab**: Navigate between interactive elements
- **Enter/Space**: Activate buttons and links
- **Arrow keys**: Navigate within components
- **Escape**: Close modals and dropdowns

### Screen Reader Support

- Proper semantic HTML structure
- ARIA labels and descriptions
- Loading state announcements
- Error message announcements

---

## 🚀 Performance Optimizations

### Bundle Size

- Tree-shaking support for unused components
- Lazy loading for heavy components
- Optimized icon imports
- Minimal CSS footprint

### Rendering Performance

- Efficient class computation
- Minimal re-renders
- Optimized event handling
- Memory leak prevention

### Best Practices

```vue
<!-- Use computed for expensive operations -->
<script setup>
const buttonClasses = computed(() => [
    'btn',
    `btn-${props.color}`,
    `btn-${props.size}`,
    { loading: props.loading },
])
</script>

<!-- Avoid inline functions -->
<template>
    <BpButton @click="handleClick">Click</BpButton>
</template>

<script setup>
const handleClick = (event: MouseEvent) => {
  // Handle click logic
}
</script>
```

---

## 🔍 Troubleshooting

### Common Issues

1. **Component not found**: Ensure module is properly installed and configured
2. **Styles not loading**: Check TailwindCSS and DaisyUI configuration
3. **Type errors**: Verify TypeScript configuration and type imports
4. **Build failures**: Check for missing dependencies or configuration issues

### Debug Mode

Enable debug mode for development:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
    nuxtDesignSystem: {
        debug: true, // Enable debug logging
    },
})
```

### Support

For additional help:

- Check the [GitHub repository](https://github.com/BoilerplatePowa/Nuxt4-Design-System)
- Open an [issue](https://github.com/BoilerplatePowa/Nuxt4-Design-System/issues)
- Review the [documentation](https://github.com/BoilerplatePowa/Nuxt4-Design-System)

---

_This API reference is part of the Nuxt Design System documentation. For the most up-to-date information, always refer to the source code and latest releases._

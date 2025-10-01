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
| `iconLeft`          | `IconName`                        | `undefined`       | Left icon name                   |
| `iconRight`         | `IconName`                        | `undefined`       | Right icon name                  |
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
<BpButton iconLeft="heart" iconRight="arrow-right" color="accent">
  Like & Continue
</BpButton>

<!-- Circle button -->
<BpButton circle iconLeft="settings" color="neutral" />
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

## 🎨 Icons Category

### Icon Component (`Icon`)

A flexible icon component using Lucide Vue Next icons.

#### Props

| Prop          | Type                   | Default      | Description              |
| ------------- | ---------------------- | ------------ | ------------------------ |
| `name`        | `IconName`             | **required** | Icon name from icon map  |
| `size`        | `Size \| number`       | `24`         | Icon size                |
| `strokeWidth` | `number`               | `2`          | Stroke width             |
| `color`       | `ThemeColor \| string` | `undefined`  | Icon color               |
| `class`       | `string`               | `undefined`  | Additional CSS classes   |
| `ariaLabel`   | `string`               | `undefined`  | Accessibility label      |
| `ariaHidden`  | `boolean`              | `true`       | Hide from screen readers |

#### Examples

```vue
<!-- Basic usage -->
<Icon name="heart" />

<!-- With size and color -->
<Icon name="star" size="lg" color="warning" />

<!-- Custom size -->
<Icon name="settings" :size="32" class="text-primary" />

<!-- With accessibility -->
<Icon name="info" ariaLabel="Information" :ariaHidden="false" />
```

#### Available Icons

The component supports all icons from Lucide Vue Next:

```typescript
// Common icons
;('heart',
    'star',
    'settings',
    'user',
    'home',
    'search',
    'mail',
    'phone',
    'calendar',
    'download',
    'upload',
    'edit',
    'delete',
    'plus',
    'minus',
    'check',
    'x',
    'arrow-left',
    'arrow-right',
    'arrow-up',
    'arrow-down',
    'menu',
    'info',
    'alert-circle',
    'check-circle',
    'x-circle',
    'help-circle',
    'eye',
    'eye-off',
    'lock',
    'unlock',
    'zap',
    'chevron-down',
    'chevron-up',
    'chevron-left',
    'chevron-right',
    'filter',
    'sort-asc',
    'sort-desc',
    'refresh-cw',
    'rotate-ccw',
    'rotate-cw',
    'zoom-in',
    'zoom-out',
    'maximize',
    'minimize',
    'external-link',
    'link',
    'copy',
    'share',
    'bookmark',
    'flag',
    'thumbs-up',
    'thumbs-down',
    'message-circle',
    'message-square',
    'bell',
    'shield',
    'award',
    'gift',
    'shopping-cart',
    'credit-card',
    'dollar-sign',
    'percent',
    'trending-up',
    'trending-down',
    'activity',
    'bar-chart',
    'pie-chart',
    'line-chart',
    'database',
    'server',
    'monitor',
    'smartphone',
    'tablet',
    'laptop',
    'printer',
    'camera',
    'video',
    'music',
    'file',
    'folder',
    'archive',
    'trash-2',
    'save',
    'download-cloud',
    'upload-cloud',
    'cloud',
    'wifi',
    'bluetooth',
    'battery',
    'power',
    'volume',
    'volume1',
    'volume2',
    'volume-x',
    'mic',
    'mic-off',
    'headphones',
    'speaker',
    'radio',
    'tv',
    'gamepad-2',
    'mouse',
    'keyboard',
    'hard-drive',
    'cpu',
    'thermometer',
    'droplets',
    'sun',
    'moon',
    'cloud-rain',
    'cloud-snow',
    'wind',
    'umbrella',
    'snowflake',
    'flame',
    'sparkles',
    'ice-cream',
    'heart-off',
    'star-off',
    'settings-2',
    'users',
    'building',
    'map',
    'navigation',
    'globe',
    'mail-open',
    'phone-call',
    'phone-incoming',
    'phone-outgoing',
    'calendar-days',
    'calendar-range',
    'clock-1',
    'clock-2',
    'clock-3',
    'clock-4',
    'clock-5',
    'clock-6',
    'clock-7',
    'clock-8',
    'clock-9',
    'clock-10',
    'clock-11',
    'clock-12',
    'map-pin-off',
    'navigation-2',
    'navigation-off',
    'edit-2',
    'edit-3',
    'trash',
    'plus-circle',
    'minus-circle',
    'x-square',
    'alert-triangle',
    'alert-octagon')
```

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

### Icon Mapping

```typescript
// Icon component mapping
export const iconMap = {
    heart: Heart,
    star: Star,
    settings: Settings,
    user: User,
    home: Home,
    search: Search,
    // ... more icons
} as const

// Size mapping
export const sizeMap = {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 32,
    xl: 40,
    '2xl': 48,
} as const
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

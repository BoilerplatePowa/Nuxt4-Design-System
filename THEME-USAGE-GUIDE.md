# Theme Usage Guide

## Quick Start

### 1. Using the ThemeController Component

The easiest way to add theme switching to your app:

```vue
<template>
    <ThemeController variant="button" />
</template>
```

### 2. Using the useTheme Composable

For programmatic theme control:

```vue
<script setup>
import { useTheme } from '@boilerplatepowa/nuxt4-design-system/composables/useTheme'

const { currentTheme, setTheme, toggleTheme, isDark } = useTheme()
</script>

<template>
    <div>
        <p>Current theme: {{ currentTheme }}</p>
        <button @click="toggleTheme()">Toggle Theme</button>
        <button @click="setTheme('cupcake')">Set Cupcake Theme</button>
    </div>
</template>
```

## ThemeController Variants

### Button Variant

```vue
<ThemeController variant="button" size="md" :show-label="true" />
```

### Toggle Variant

```vue
<ThemeController variant="toggle" size="lg" />
```

### Switch Variant

```vue
<ThemeController variant="switch" size="md" />
```

### Dropdown Variant

```vue
<ThemeController
    variant="dropdown"
    :themes="[
        { value: 'light', label: 'Light Mode' },
        { value: 'dark', label: 'Dark Mode' },
        { value: 'cupcake', label: 'Cupcake' },
        { value: 'corporate', label: 'Corporate' },
    ]"
/>
```

### Radio Variant

```vue
<ThemeController
    variant="radio"
    :themes="[
        { value: 'light', label: 'Light' },
        { value: 'dark', label: 'Dark' },
        { value: 'synthwave', label: 'Synthwave' },
    ]"
    radio-name="theme-selector"
/>
```

## Props Reference

| Prop           | Type                                                        | Default                                                       | Description                       |
| -------------- | ----------------------------------------------------------- | ------------------------------------------------------------- | --------------------------------- |
| `variant`      | `'button' \| 'toggle' \| 'switch' \| 'dropdown' \| 'radio'` | `'button'`                                                    | UI variant                        |
| `themes`       | `ThemeOption[]`                                             | `[{value:'light',label:'Light'},{value:'dark',label:'Dark'}]` | Available themes                  |
| `defaultTheme` | `string`                                                    | `'light'`                                                     | Default theme                     |
| `darkTheme`    | `string`                                                    | `'dark'`                                                      | Dark theme identifier             |
| `lightTheme`   | `string`                                                    | `'light'`                                                     | Light theme identifier            |
| `showLabel`    | `boolean`                                                   | `false`                                                       | Show theme label (button variant) |
| `size`         | `'xs' \| 'sm' \| 'md' \| 'lg'`                              | `'md'`                                                        | Component size                    |
| `radioName`    | `string`                                                    | `'theme'`                                                     | Radio input name                  |
| `ariaLabel`    | `string`                                                    | `'Toggle theme'`                                              | Accessibility label               |

## Events

### themeChange

Emitted when theme changes:

```vue
<ThemeController @theme-change="handleThemeChange" />

<script setup>
const handleThemeChange = (theme: string) => {
  console.log('Theme changed to:', theme)
}
</script>
```

## useTheme Composable API

### Returns

```typescript
{
  currentTheme: Readonly<Ref<string>>,  // Current theme name
  setTheme: (theme: string) => void,    // Set theme
  toggleTheme: (light?: string, dark?: string) => void, // Toggle theme
  isDark: Readonly<ComputedRef<boolean>> // Is current theme dark?
}
```

### Examples

#### Check Current Theme

```vue
<script setup>
const { currentTheme } = useTheme()
</script>

<template>
    <div :class="currentTheme">Theme: {{ currentTheme }}</div>
</template>
```

#### Change Theme

```vue
<script setup>
const { setTheme } = useTheme()

const applyTheme = (theme: string) => {
  setTheme(theme)
}
</script>
```

#### Toggle Theme

```vue
<script setup>
const { toggleTheme } = useTheme()

// Toggle between default light/dark
const toggle = () => toggleTheme()

// Toggle between custom themes
const toggleCustom = () => toggleTheme('cupcake', 'synthwave')
</script>
```

#### Check if Dark Theme

```vue
<script setup>
const { isDark } = useTheme()
</script>

<template>
    <div>
        <Icon v-if="isDark" name="moon" />
        <Icon v-else name="sun" />
    </div>
</template>
```

## Available DaisyUI Themes

### Light Themes

- `light` - Default light theme
- `cupcake` - Soft pastel colors
- `bumblebee` - Yellow accent
- `emerald` - Green accent
- `corporate` - Professional blue
- `retro` - Vintage style
- `cyberpunk` - Neon colors
- `valentine` - Pink/red theme
- `garden` - Natural green
- `aqua` - Blue/cyan theme
- `lofi` - Minimal grayscale
- `pastel` - Soft colors
- `fantasy` - Purple theme
- `wireframe` - Black and white
- `cmyk` - Print colors
- `autumn` - Warm colors
- `acid` - Bright neon
- `lemonade` - Yellow theme
- `winter` - Cool blue

### Dark Themes

- `dark` - Default dark theme
- `synthwave` - Retro neon
- `halloween` - Orange/purple
- `forest` - Dark green
- `black` - Pure black
- `luxury` - Gold accent
- `dracula` - Purple/pink
- `business` - Professional dark
- `night` - Deep blue
- `coffee` - Brown theme

## Custom Slots

### Icon Slot (Button Variant)

```vue
<ThemeController variant="button">
  <template #icon>
    <Icon name="palette" />
  </template>
</ThemeController>
```

## Styling

### Custom Classes

```vue
<ThemeController variant="button" class="!bg-primary !text-primary-content" />
```

### Size Classes

The component automatically applies DaisyUI size classes:

- `xs`: Extra small
- `sm`: Small
- `md`: Medium (default)
- `lg`: Large

## Best Practices

1. **Place ThemeController in Layout**: Add it to your main layout for site-wide access
2. **Use Composable for Logic**: Use `useTheme()` for programmatic theme changes
3. **Respect User Preference**: The plugin automatically detects system theme preference
4. **Provide Multiple Options**: Use dropdown variant for apps with many themes
5. **Accessibility**: Always provide proper `ariaLabel` for screen readers

## Common Patterns

### Navbar Theme Switcher

```vue
<template>
    <nav class="navbar bg-base-100">
        <div class="navbar-start">
            <a class="btn btn-ghost text-xl">MyApp</a>
        </div>
        <div class="navbar-end">
            <ThemeController variant="button" size="sm" />
        </div>
    </nav>
</template>
```

### Settings Page

```vue
<template>
    <div class="card bg-base-200">
        <div class="card-body">
            <h2 class="card-title">Theme Settings</h2>
            <ThemeController variant="radio" :themes="allThemes" />
        </div>
    </div>
</template>

<script setup>
const allThemes = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { value: 'cupcake', label: 'Cupcake' },
    { value: 'synthwave', label: 'Synthwave' },
]
</script>
```

### Conditional Rendering Based on Theme

```vue
<script setup>
const { isDark, currentTheme } = useTheme()
</script>

<template>
    <div>
        <!-- Show different content for dark themes -->
        <div v-if="isDark" class="dark-content">Dark mode content</div>

        <!-- Show different content for specific theme -->
        <div v-if="currentTheme === 'synthwave'" class="synthwave-special">
            Special synthwave content
        </div>
    </div>
</template>
```

## Troubleshooting

### Theme Not Persisting

- Check that localStorage is available
- Verify no conflicting theme management code
- Clear localStorage and try again: `localStorage.removeItem('theme')`

### Theme Flash on Load

- This should be fixed with the plugin approach
- If still occurring, check that the plugin is loaded before components

### Custom Theme Not Working

- Ensure theme name matches DaisyUI theme exactly
- Check that theme is included in your Tailwind config
- Verify theme is in the `themes` prop array

## TypeScript Support

All theme functions are fully typed:

```typescript
import type { Ref, ComputedRef } from 'vue'

interface UseThemeReturn {
    currentTheme: Readonly<Ref<string>>
    setTheme: (theme: string) => void
    toggleTheme: (lightTheme?: string, darkTheme?: string) => void
    isDark: Readonly<ComputedRef<boolean>>
}

interface ThemeOption {
    value: string
    label: string
}
```

# Theme Plugin Migration

## Overview

Migrated theme initialization from the `ThemeController` component to a Nuxt plugin to prevent theme flash on page load.

## Problem

Previously, the theme was initialized in the `ThemeController` component's `onMounted` hook, which caused a visible flash when the page loaded with the default theme before switching to the saved theme.

## Solution

Created a Nuxt plugin that initializes the theme **before** the app mounts, ensuring the correct theme is applied immediately without any visual flash.

## Changes Made

### 1. Enhanced Plugin (`src/runtime/plugin.ts`)

- Initializes theme on both client and server
- Reads theme from localStorage or system preference
- Applies theme immediately to DOM before app renders
- Provides reactive theme state and management functions via `provide`

**Key Features:**

- `$theme`: Reactive ref containing current theme
- `$setTheme(theme)`: Function to change theme
- `$toggleTheme(lightTheme, darkTheme)`: Function to toggle between themes

### 2. New Composable (`src/runtime/composables/useTheme.ts`)

Created a convenient composable for accessing theme functionality:

```typescript
const { currentTheme, setTheme, toggleTheme, isDark } = useTheme()
```

**Returns:**

- `currentTheme`: Readonly ref of current theme
- `setTheme`: Function to set theme
- `toggleTheme`: Function to toggle theme
- `isDark`: Computed boolean indicating if current theme is dark

### 3. Updated ThemeController Component

- Removed `onMounted` initialization logic
- Removed local theme state management
- Now uses `useTheme()` composable
- Simplified to only handle UI interactions
- No more theme flash!

## Usage

### In Components

```vue
<script setup>
import { useTheme } from '@boilerplatepowa/nuxt4-design-system/composables/useTheme'

const { currentTheme, setTheme, toggleTheme, isDark } = useTheme()

// Change theme
setTheme('dark')

// Toggle theme
toggleTheme('light', 'dark')

// Check if dark
console.log(isDark.value) // true/false
</script>
```

### With ThemeController

```vue
<template>
    <!-- Button variant -->
    <ThemeController variant="button" />

    <!-- Toggle variant -->
    <ThemeController variant="toggle" />

    <!-- Dropdown variant -->
    <ThemeController
        variant="dropdown"
        :themes="[
            { value: 'light', label: 'Light' },
            { value: 'dark', label: 'Dark' },
            { value: 'cupcake', label: 'Cupcake' },
        ]"
    />
</template>
```

## Benefits

1. **No Theme Flash**: Theme is applied before page renders
2. **Better Performance**: Theme initialization happens once in plugin, not per component
3. **Cleaner Architecture**: Separation of concerns - plugin handles state, component handles UI
4. **Type Safety**: Full TypeScript support with proper types
5. **Reusability**: `useTheme()` composable can be used anywhere in the app
6. **SSR Compatible**: Works correctly with server-side rendering

## Migration Guide

If you were using the ThemeController component before, no changes are needed! The component API remains the same, it just works better now.

If you were manually managing theme state, you can now use the `useTheme()` composable:

**Before:**

```vue
<script setup>
const theme = ref('light')

const setTheme = (newTheme) => {
    theme.value = newTheme
    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme', newTheme)
}
</script>
```

**After:**

```vue
<script setup>
import { useTheme } from '@boilerplatepowa/nuxt4-design-system/composables/useTheme'

const { currentTheme, setTheme } = useTheme()
</script>
```

## Technical Details

### Plugin Execution Order

The plugin runs early in the Nuxt lifecycle, before components mount, ensuring theme is set before first paint.

### Storage Strategy

- Theme preference is stored in `localStorage` with key `'theme'`
- Falls back to system preference (`prefers-color-scheme: dark`)
- Defaults to `'light'` if no preference is found

### DOM Updates

The plugin applies theme to both:

- `document.documentElement` (for DaisyUI)
- `document.body` (for compatibility)

### Type Safety

All provided functions are properly typed:

```typescript
$theme: Ref<string>
$setTheme: (theme: string) => void
$toggleTheme: (lightTheme?: string, darkTheme?: string) => void
```

## Testing

The theme initialization can be tested by:

1. Setting a theme preference
2. Refreshing the page
3. Verifying no flash occurs
4. Checking that the correct theme is applied immediately

## Future Enhancements

- [ ] Add theme validation against available themes
- [ ] Support for custom theme transitions
- [ ] Theme change animations
- [ ] System theme change listener
- [ ] Theme preloading for faster switching

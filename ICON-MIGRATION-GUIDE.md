# Icon Component Migration Guide

## Overview

The design system has been updated to allow clients to pass their own icon components directly instead of using pre-loaded icon names. This change eliminates the need for the Icon component and reduces bundle size by allowing tree-shaking of unused icons.

## What Changed

### Before (Old Pattern)
```vue
<template>
  <Menu :items="menuItems" />
</template>

<script setup>
const menuItems = [
  { label: 'Home', icon: 'home', href: '/' },
  { label: 'Settings', icon: 'settings', href: '/settings' }
]
</script>
```

### After (New Pattern)
```vue
<template>
  <Menu :items="menuItems" />
</template>

<script setup>
import { Home, Settings } from 'lucide-vue-next'

const menuItems = [
  { label: 'Home', icon: Home, href: '/' },
  { label: 'Settings', icon: Settings, href: '/settings' }
]
</script>
```

## Benefits

1. **No Icon Preloading**: Only icons you actually use are included in your bundle
2. **Tree Shaking**: Unused icons are automatically removed during build
3. **Flexibility**: Use any icon library (Lucide, Heroicons, Font Awesome, custom SVGs, etc.)
4. **Type Safety**: Direct component references provide better TypeScript support
5. **Smaller Bundle Size**: Significant reduction in JavaScript payload

## Migration Steps

### 1. Update Icon Props in Components

All components that previously accepted icon string names now accept Vue components:

#### Button Component
```vue
<!-- Before -->
<Button icon-left="chevron-left" icon-right="chevron-right">
  Click me
</Button>

<!-- After -->
<script setup>
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
</script>

<Button :icon-left="ChevronLeft" :icon-right="ChevronRight">
  Click me
</Button>
```

#### Menu Component
```vue
<!-- Before -->
<script setup>
const items = [
  { label: 'Dashboard', icon: 'home' },
  { label: 'Profile', icon: 'user' }
]
</script>

<!-- After -->
<script setup>
import { Home, User } from 'lucide-vue-next'

const items = [
  { label: 'Dashboard', icon: Home },
  { label: 'Profile', icon: User }
]
</script>
```

#### Steps Component
```vue
<!-- Before -->
<script setup>
const steps = [
  { title: 'Step 1', icon: 'check' },
  { title: 'Step 2', icon: 'arrow-right' }
]
</script>

<!-- After -->
<script setup>
import { Check, ArrowRight } from 'lucide-vue-next'

const steps = [
  { title: 'Step 1', icon: Check },
  { title: 'Step 2', icon: ArrowRight }
]
</script>
```

#### Dock Component
```vue
<!-- Before -->
<script setup>
const dockItems = [
  { label: 'Home', icon: 'home' },
  { label: 'Search', icon: 'search' }
]
</script>

<!-- After -->
<script setup>
import { Home, Search } from 'lucide-vue-next'

const dockItems = [
  { label: 'Home', icon: Home },
  { label: 'Search', icon: Search }
]
</script>
```

#### Avatar Component
```vue
<!-- Before -->
<Avatar fallback-icon="user" />

<!-- After -->
<script setup>
import { User } from 'lucide-vue-next'
</script>

<Avatar :fallback-icon="User" />
```

#### Input Component
```vue
<!-- Before -->
<Input left-icon="mail" right-icon="check" />

<!-- After -->
<script setup>
import { Mail, Check } from 'lucide-vue-next'
</script>

<Input :left-icon="Mail" :right-icon="Check" />
```

### 2. Update Dropdown Component

The Dropdown component now uses Lucide icons directly for chevrons:

```vue
<!-- Before -->
<Dropdown trigger-icon-right="chevron-down" />

<!-- After -->
<script setup>
import { ChevronDown } from 'lucide-vue-next'
</script>

<Dropdown :trigger-icon-right="ChevronDown" />
```

**Note**: If you don't specify `trigger-icon-right`, the Dropdown will automatically use ChevronUp/ChevronDown based on open state when `toggle-chevron` is true (default).

### 3. Update FormWizard Component

The FormWizard component now requires icon components in step definitions:

```vue
<!-- Before -->
<script setup>
const steps = [
  { title: 'Personal Info', icon: 'user' },
  { title: 'Address', icon: 'map-pin' },
  { title: 'Confirmation', icon: 'check' }
]
</script>

<!-- After -->
<script setup>
import { User, MapPin, Check } from 'lucide-vue-next'

const steps = [
  { title: 'Personal Info', icon: User },
  { title: 'Address', icon: MapPin },
  { title: 'Confirmation', icon: Check }
]
</script>
```

## Using Custom Icons

You can now use any Vue component as an icon, not just Lucide:

### Custom SVG Component
```vue
<script setup>
import { defineComponent, h } from 'vue'

const CustomIcon = defineComponent({
  props: ['size'],
  setup(props) {
    return () => h('svg', {
      width: props.size || 24,
      height: props.size || 24,
      viewBox: '0 0 24 24',
      fill: 'currentColor'
    }, [
      h('path', { d: 'M12 2L2 7v10l10 5 10-5V7L12 2z' })
    ])
  }
})

const menuItems = [
  { label: 'Custom', icon: CustomIcon }
]
</script>
```

### Using Other Icon Libraries

#### Heroicons
```vue
<script setup>
import { HomeIcon, UserIcon } from '@heroicons/vue/24/outline'

const items = [
  { label: 'Home', icon: HomeIcon },
  { label: 'Profile', icon: UserIcon }
]
</script>
```

#### Font Awesome (with vue-fontawesome)
```vue
<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHome, faUser } from '@fortawesome/free-solid-svg-icons'
import { defineComponent, h } from 'vue'

// Wrap Font Awesome icons in a component
const HomeIcon = defineComponent({
  setup() {
    return () => h(FontAwesomeIcon, { icon: faHome })
  }
})

const items = [
  { label: 'Home', icon: HomeIcon }
]
</script>
```

## Components Updated

The following components have been updated to accept icon components:

- ✅ **Button** - `iconLeft`, `iconRight` props
- ✅ **Menu** - `icon` in `MenuItem` interface
- ✅ **Drawer** - Uses Menu component (inherits icon support)
- ✅ **Steps** - `icon` in step objects
- ✅ **Dock** - `icon` in dock items
- ✅ **Avatar** - `fallbackIcon` prop
- ✅ **Input** - `leftIcon`, `rightIcon` props
- ✅ **Dropdown** - `triggerIconLeft`, `triggerIconRight` props
- ✅ **Modal** - Uses icon components internally
- ✅ **FormWizard** - `icon` in wizard steps

## Type Definitions

Icon props now accept Vue's `Component` type for proper type safety:

```typescript
import type { Component } from 'vue'

interface MenuItem {
  label?: string
  value?: string | number
  href?: string
  icon?: Component // Vue component (e.g., Lucide icon component)
  badge?: string | number
  disabled?: boolean
  active?: boolean
  title?: string
  children?: MenuItem[]
}
```

This provides better type safety than using `any` while still supporting any Vue component.

## Breaking Changes

⚠️ **This is a breaking change**. You must update all icon prop values from strings to component references.

### Quick Migration Checklist

- [ ] Replace all icon string names with imported components
- [ ] Update Menu items with icon components
- [ ] Update Button icon props with components
- [ ] Update Steps with icon components
- [ ] Update Dock items with icon components
- [ ] Update Avatar fallback icon with component
- [ ] Update Input icon props with components
- [ ] Update FormWizard steps with icon components
- [ ] Test all components with icons
- [ ] Verify bundle size reduction

## Common Lucide Icons

Here are commonly used Lucide icons for quick reference:

```typescript
import {
  Home,
  User,
  Settings,
  Search,
  Mail,
  Phone,
  Calendar,
  Clock,
  MapPin,
  Download,
  Upload,
  Edit,
  Delete,
  Plus,
  Minus,
  Check,
  X,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Bell,
  Heart,
  Star,
  Menu,
  Info,
  AlertCircle,
  CheckCircle,
  XCircle,
  HelpCircle
} from 'lucide-vue-next'
```

## Troubleshooting

### Icons Not Displaying

**Problem**: Icons are not showing up after migration.

**Solution**: Make sure you're passing the component reference, not calling it:

```vue
<!-- ❌ Wrong -->
<Button :icon-left="Home()" />

<!-- ✅ Correct -->
<Button :icon-left="Home" />
```

### TypeScript Errors

**Problem**: TypeScript complains about icon prop types.

**Solution**: The icon props now accept Vue's `Component` type. Make sure you're importing the type:

```typescript
import type { Component } from 'vue'
import { Home } from 'lucide-vue-next'

// This should work automatically
const items = [
  { label: 'Home', icon: Home }
]

// Or explicitly type if needed
const icon: Component = Home
```

### Bundle Size Not Reducing

**Problem**: Bundle size hasn't decreased after migration.

**Solution**: 
1. Make sure you're only importing icons you use
2. Check that your build tool supports tree-shaking (Vite does by default)
3. Remove any unused icon imports
4. Run a production build to see actual bundle size

## Support

If you encounter issues during migration, please:

1. Check this guide thoroughly
2. Review the component examples in the playground
3. Check the Storybook documentation
4. Open an issue on GitHub with a reproduction

## Additional Resources

- [Lucide Vue Next Documentation](https://lucide.dev/guide/packages/lucide-vue-next)
- [Component Playground Examples](/playground)
- [Storybook Stories](/storybook)


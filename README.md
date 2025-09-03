<!--
Get your module up and running quickly.

Find and replace all on all files (CMD+SHIFT+F):
- Name: My Module
- Package name: my-module
- Description: My new Nuxt module
-->

# Nuxt4-Design-System

A production-ready Nuxt module providing a comprehensive design system based on DaisyUI 5.0.54.

## Quick Start

### Installation
```bash
npm install @nuxt-design-system/core @nuxt-design-system/tokens
```

### Basic Setup
```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxt-design-system/core'],
  designSystem: {
    theme: 'light',
    components: true,
    prefix: 'DS'
  }
})
```

### Usage
```vue
<template>
  <div>
    <DSButtonPrimary variant="primary" @click="handleClick">
      Click me
    </DSButtonPrimary>
    
    <DSCardContent title="Welcome">
      <p>Content goes here</p>
      
      <template #actions>
        <DSButtonPrimary variant="accent">Action</DSButtonPrimary>
      </template>
    </DSCardContent>
  </div>
</template>
```

## Button Component with btnMap Integration

The Button component has been updated to use the `btnMap` structure for consistent DaisyUI class mapping and better TypeScript support.

### New Props Structure

#### Color Variants (btnColorMap)
```vue
<template>
  <!-- Color variants from btnColorMap -->
  <BpButton color="primary">Primary</BpButton>
  <BpButton color="secondary">Secondary</BpButton>
  <BpButton color="accent">Accent</BpButton>
  <BpButton color="neutral">Neutral</BpButton>
  <BpButton color="info">Info</BpButton>
  <BpButton color="success">Success</BpButton>
  <BpButton color="warning">Warning</BpButton>
  <BpButton color="error">Error</BpButton>
</template>
```

#### Style Variants (btnStyleMap)
```vue
<template>
  <!-- Style variants from btnStyleMap -->
  <BpButton style="outline">Outline</BpButton>
  <BpButton style="dash">Dash</BpButton>
  <BpButton style="soft">Soft</BpButton>
  <BpButton style="ghost">Ghost</BpButton>
  <BpButton style="link">Link</BpButton>
</template>
```

#### Combined Color + Style
```vue
<template>
  <!-- Combine color and style for rich variants -->
  <BpButton color="primary" style="outline">Primary Outline</BpButton>
  <BpButton color="secondary" style="ghost">Secondary Ghost</BpButton>
  <BpButton color="accent" style="soft">Accent Soft</BpButton>
  <BpButton color="success" style="link">Success Link</BpButton>
</template>
```

#### Size Variants (btnSizeMap)
```vue
<template>
  <!-- Size variants from btnSizeMap -->
  <BpButton size="xs">Extra Small</BpButton>
  <BpButton size="sm">Small</BpButton>
  <BpButton size="md">Medium</BpButton>
  <BpButton size="lg">Large</BpButton>
  <BpButton size="xl">Extra Large</BpButton>
</template>
```

#### Modifiers (btnModifierMap)
```vue
<template>
  <!-- Modifiers from btnModifierMap -->
  <BpButton wide>Wide Button</BpButton>
  <BpButton block>Block Button</BpButton>
  <BpButton square>Square</BpButton>
  <BpButton circle>Circle</BpButton>
</template>
```

#### Behavior States (btnBehaviorMap)
```vue
<template>
  <!-- Behavior states from btnBehaviorMap -->
  <BpButton active>Active Button</BpButton>
  <BpButton disabled>Disabled Button</BpButton>
</template>
```

### Backward Compatibility

The old `variant` prop still works for backward compatibility:

```vue
<template>
  <!-- Legacy variant prop still works -->
  <BpButton variant="primary">Primary (legacy)</BpButton>
  <BpButton variant="ghost">Ghost (legacy)</BpButton>
  <BpButton variant="outline">Outline (legacy)</BpButton>
</template>
```

### Complete Example

```vue
<template>
  <div class="space-y-4">
    <!-- Basic usage with new props -->
    <BpButton 
      color="primary" 
      size="lg" 
      :loading="isLoading"
      @click="handleSubmit"
    >
      Submit Form
    </BpButton>
    
    <!-- Combined variants -->
    <BpButton 
      color="success" 
      style="outline" 
      size="md"
      wide
      iconLeft="check"
    >
      Success Action
    </BpButton>
    
    <!-- Icon buttons -->
    <BpButton 
      circle 
      color="accent" 
      iconLeft="heart"
      :active="isLiked"
    />
    
    <!-- Block button -->
    <BpButton 
      color="secondary" 
      block 
      iconLeft="download"
    >
      Download All Files
    </BpButton>
  </div>
</template>

<script setup>
const isLoading = ref(false)
const isLiked = ref(false)

const handleSubmit = async () => {
  isLoading.value = true
  // ... submit logic
  isLoading.value = false
}
</script>
```

### TypeScript Support

The component provides full TypeScript support with proper types based on the btnMap:

```typescript
import type { BtnColor, BtnStyle, BtnSize, BtnModifier } from '@nuxt-design-system/core'

interface ButtonProps {
  color?: BtnColor        // 'primary' | 'secondary' | 'accent' | 'neutral' | 'info' | 'success' | 'warning' | 'error'
  style?: BtnStyle        // 'outline' | 'dash' | 'soft' | 'ghost' | 'link'
  size?: BtnSize          // 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  wide?: boolean          // btn-wide modifier
  block?: boolean         // btn-block modifier
  square?: boolean        // btn-square modifier
  circle?: boolean        // btn-circle modifier
  active?: boolean        // btn-active behavior
  // ... other props
}
```

## Configuration

### Module Options
| Option | Type | Default | Description |
|-----|---|---|----|
| `theme` | `DaisyUITheme \| boolean` | `'light'` | Theme configuration |
| `components` | `boolean` | `true` | Enable component auto-imports |
| `prefix` | `string` | `'DS'` | Component prefix for auto-imports |
| `validation` | `boolean` | `true` | Enable runtime prop validation |

### Theme Configuration
```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  designSystem: {
    theme: {
      default: 'corporate',
      available: ['light', 'dark', 'corporate'],
      persistence: true
    }
  }
})
```

## Components

### Available Categories
- **Actions**: ButtonPrimary, DropdownMenu, ModalDialog
- **Data Display**: AlertMessage, CardContent, BadgeLabel  
- **Data Input**: InputText, CheckboxInput, SelectDropdown
- **Feedback**: LoadingSpinner, ProgressBar, ToastMessage
- **Layout**: DividerLine, NavbarHeader, FooterContent
- **Navigation**: BreadcrumbTrail, LinkButton, MenuList

### Component Props
All components follow DaisyUI conventions and support:
- Theme-aware variants
- Standard size scales (xs, sm, md, lg, xl)
- Loading and disabled states
- Custom CSS class override
- Full TypeScript support

## Composables

### useTheme()
```typescript
const { currentTheme, setTheme, availableThemes } = useTheme()
```

### useDesignTokens()
```typescript
const tokens = useDesignTokens()
// Access: tokens.colors.primary, tokens.spacing.md, etc.
```

## Migration Guide

### From DaisyUI Direct Usage
```vue
<!-- Before -->
<button class="btn btn-primary btn-lg">Click</button>

<!-- After -->
<BpButton color="primary" size="lg">Click</BpButton>
```

### From Old Button Component
```vue
<!-- Before (old variant prop) -->
<BpButton variant="primary" size="lg">Click</BpButton>

<!-- After (new color prop) -->
<BpButton color="primary" size="lg">Click</BpButton>

<!-- Or combine with style -->
<BpButton color="primary" style="outline" size="lg">Click</BpButton>
```

## Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/new-component`
3. Follow conventional commits: `feat: add ButtonSecondary component`
4. Add tests and documentation
5. Submit pull request

## License

MIT License - see LICENSE file for details

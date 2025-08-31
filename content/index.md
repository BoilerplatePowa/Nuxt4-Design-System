---
title: "Nuxt4-Design-System"
description: "A production-ready Nuxt 4 module providing a comprehensive design system based on DaisyUI 5.0.54"
hero:
  title: "Nuxt4-Design-System"
  tagline: "Build beautiful, accessible, and consistent UIs with DaisyUI and Tailwind CSS"
  actions:
    - theme: brand
      text: Get Started
      link: /docs/installation
    - theme: alt
      text: View Components
      link: /docs/components
features:
  - icon: 🎨
    title: DaisyUI Integration
    details: Full DaisyUI 5.0.54 support with all components, variants, and themes
  - icon: ⚡
    title: Nuxt 4 Optimized
    details: Built specifically for Nuxt 4 with auto-imports, SSR support, and performance optimizations
  - icon: 🎯
    title: TypeScript First
    details: Complete TypeScript support with strict typing and runtime validation
  - icon: ♿
    title: Accessibility Ready
    details: WCAG 2.1 AA compliant components with proper ARIA attributes
  - icon: 🎪
    title: Theme System
    details: Dynamic theme switching with 30+ built-in DaisyUI themes
  - icon: 📦
    title: Tree Shakeable
    details: Optimized bundle size with tree shaking and code splitting
---

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

## Features

### 🎨 Complete DaisyUI Integration

Our module provides full DaisyUI 5.0.54 integration with:

- **All DaisyUI Components**: Button, Card, Modal, Dropdown, and 40+ more
- **Theme Support**: 30+ built-in themes with dynamic switching
- **Variant System**: Primary, secondary, accent, ghost, and more
- **Size Scales**: xs, sm, md, lg with consistent spacing
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints

### ⚡ Nuxt 4 Optimizations

Built specifically for Nuxt 4 with:

- **Auto-Imports**: Components automatically imported with DS prefix
- **SSR Support**: Server-side rendering for all components
- **Performance**: Optimized bundle size and lazy loading
- **Hot Reload**: Instant updates during development
- **TypeScript**: Full type safety and IntelliSense support

### 🎯 TypeScript First

Complete TypeScript integration:

- **Strict Typing**: All props and events are fully typed
- **Runtime Validation**: Yup schemas for prop validation
- **IntelliSense**: Full autocomplete and error detection
- **Type Safety**: Compile-time error checking

### ♿ Accessibility Ready

WCAG 2.1 AA compliant:

- **ARIA Attributes**: Proper labeling and descriptions
- **Keyboard Navigation**: Full keyboard support
- **Screen Readers**: Semantic HTML and announcements
- **Focus Management**: Proper focus trapping and indicators
- **Color Contrast**: Meets accessibility standards

## Component Categories

### Actions
Interactive components for user actions:

- **ButtonPrimary**: Primary action buttons with variants
- **DropdownMenu**: Dropdown menus and selectors
- **ModalDialog**: Modal dialogs and overlays
- **SwapToggle**: Toggle switches and checkboxes

### Data Display
Components for displaying information:

- **AlertMessage**: Status messages and notifications
- **CardContent**: Content cards and containers
- **BadgeLabel**: Status badges and labels
- **AvatarImage**: User avatars and profile images

### Data Input
Form and input components:

- **InputText**: Text inputs with validation
- **CheckboxInput**: Checkbox inputs and groups
- **SelectDropdown**: Dropdown selectors
- **RadioGroup**: Radio button groups

### Feedback
User feedback and status components:

- **LoadingSpinner**: Loading indicators and spinners
- **ProgressBar**: Progress bars and indicators
- **ToastMessage**: Toast notifications
- **SkeletonLoader**: Content placeholders

### Layout
Structural layout components:

- **DividerLine**: Content dividers and separators
- **NavbarHeader**: Navigation headers
- **FooterContent**: Page footers
- **SidebarMenu**: Sidebar navigation

### Navigation
Navigation and routing components:

- **BreadcrumbTrail**: Breadcrumb navigation
- **LinkButton**: Navigation links
- **MenuList**: Menu lists and navigation
- **PaginationNav**: Pagination controls

## Theme System

### Built-in Themes

Our module includes 30+ DaisyUI themes:

```typescript
const themes = [
  'light', 'dark', 'cupcake', 'corporate', 'synthwave',
  'retro', 'cyberpunk', 'valentine', 'halloween', 'garden',
  'forest', 'aqua', 'lofi', 'pastel', 'fantasy',
  'wireframe', 'black', 'luxury', 'dracula', 'cmyk'
]
```

### Dynamic Theme Switching

```vue
<script setup>
const { currentTheme, setTheme, availableThemes } = useTheme()

// Switch themes dynamically
function switchToDark() {
  setTheme('dark')
}
</script>

<template>
  <div class="theme-switcher">
    <select v-model="currentTheme" @change="setTheme($event.target.value)">
      <option v-for="theme in availableThemes" :key="theme" :value="theme">
        {{ theme }}
      </option>
    </select>
  </div>
</template>
```

### Custom Theme Creation

```typescript
// Create custom themes
const customTheme = {
  'custom-theme': {
    'primary': '#570df8',
    'secondary': '#f000b8',
    'accent': '#37cdbe',
    'neutral': '#3d4451',
    'base-100': '#ffffff',
    'info': '#3abff8',
    'success': '#36d399',
    'warning': '#fbbd23',
    'error': '#f87272'
  }
}
```

## Performance Features

### Bundle Optimization

- **Tree Shaking**: Only import components you use
- **Code Splitting**: Automatic route-based splitting
- **Lazy Loading**: Components loaded on demand
- **PurgeCSS**: Unused CSS automatically removed

### Performance Monitoring

```typescript
// Built-in performance tracking
const { trackComponentRender, trackInteraction } = usePerformance()

// Track component usage
trackComponentRender('ButtonPrimary')

// Track user interactions
trackInteraction('button-click', duration)
```

## Development Tools

### Storybook Integration

```bash
npm run storybook
```

Browse all components with interactive examples and documentation.

### Development Server

```bash
npm run dev
```

Hot reload development server with instant feedback.

### Type Checking

```bash
npm run type-check
```

Full TypeScript type checking and validation.

### Testing Suite

```bash
npm run test
```

Comprehensive test suite with Vitest and Vue Test Utils.

## Migration Guide

### From DaisyUI Direct Usage

```vue
<!-- Before -->
<button class="btn btn-primary btn-lg">Click</button>

<!-- After -->
<DSButtonPrimary variant="primary" size="lg">Click</DSButtonPrimary>
```

### From Other Design Systems

```vue
<!-- Before (Vuetify) -->
<v-btn color="primary" size="large">Click</v-btn>

<!-- After -->
<DSButtonPrimary variant="primary" size="lg">Click</DSButtonPrimary>
```

## Contributing

We welcome contributions! Please see our [Contributing Guide](/docs/contributing) for details.

### Development Setup

```bash
# Clone the repository
git clone https://github.com/your-org/nuxt4-design-system.git

# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm run test

# Build for production
npm run build
```

## License

MIT License - see [LICENSE](https://github.com/your-org/nuxt4-design-system/blob/main/LICENSE) file for details.

## Support

- **Documentation**: [docs.nuxt-design-system.com](https://docs.nuxt-design-system.com)
- **Issues**: [GitHub Issues](https://github.com/your-org/nuxt4-design-system/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-org/nuxt4-design-system/discussions)
- **Discord**: [Join our Discord](https://discord.gg/nuxt-design-system)

---

**Built with ❤️ for the Nuxt community**

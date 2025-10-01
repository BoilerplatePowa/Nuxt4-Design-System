<!--
Get your module up and running quickly.

Find and replace all on all files (CMD+SHIFT+F):
- Name: My Module
- Package name: my-module
- Description: My new Nuxt module
-->

# Nuxt4-Design-System

A comprehensive Nuxt 4 module providing a complete design system based on DaisyUI 5.1.5 with TypeScript support, Storybook documentation, and extensive component library.

## Quick Start

### Installation

```bash
npm install @boilerplatepowa/nuxt4-design-system
```

### Basic Setup

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@boilerplatepowa/nuxt4-design-system'],
  nuxtDesignSystem: {
    prefix: 'Bp',
    components: true,
    css: true,
    composables: true,
    tailwind: true,
  },
})
```

### Usage

```vue
<template>
  <div>
    <BpButton color="primary" size="lg" @click="handleClick"> Click me </BpButton>

    <BpCard>
      <div class="card-body">
        <h2 class="card-title">Welcome</h2>
        <p>Content goes here</p>

        <div class="card-actions justify-end">
          <BpButton color="accent">Action</BpButton>
        </div>
      </div>
    </BpCard>
  </div>
</template>
```

## Features

### 🎨 **Comprehensive Component Library**

- **60+ Components** across 6 categories (Actions, DataDisplay, DataInput, Feedback, Layout, Navigation)
- **Full DaisyUI 5.1.5 Integration** with proper class mapping
- **TypeScript Support** with strict typing and IntelliSense
- **Accessibility First** with WCAG 2.1 AA compliance

### 🧩 **Advanced Component System**

- **Smart Class Generation** using component maps for consistent styling
- **Flexible Props API** with color, style, size, and modifier combinations
- **Icon Integration** with Lucide Vue Next icons
- **Loading States** and interactive feedback
- **Form Validation** with VeeValidate and Yup schemas

### 📚 **Developer Experience**

- **Storybook Documentation** with interactive examples
- **Auto-import Support** with configurable component prefix
- **Hot Reload** in development
- **Comprehensive Testing** with Vitest and Vue Test Utils

## Component Categories

### Actions (5 components)

- **Button** - Advanced button with color/style/size variants, loading states, icons
- **Dropdown** - Flexible dropdown menus with placement options
- **Modal** - Accessible modal dialogs with backdrop and positioning
- **Swap** - Toggle between two elements with smooth transitions
- **ThemeController** - Theme switching with persistence

### Data Display (17 components)

- **Accordion** - Collapsible content sections
- **Avatar** - User profile images with status indicators
- **Badge** - Status indicators and labels
- **Card** - Content containers with headers, bodies, and actions
- **Carousel** - Image/content carousels with navigation
- **ChatBubble** - Chat message components
- **Collapse** - Expandable content areas
- **Countdown** - Animated countdown timers
- **Kbd** - Keyboard shortcut displays
- **List** - Structured data lists
- **Stat** - Statistical data displays
- **Status** - Status indicators
- **Table** - Data tables with sorting and styling
- **Tabs** - Tabbed content navigation
- **TextDiff** - Side-by-side text comparison
- **Timeline** - Event timeline displays

### Data Input (17 components)

- **Calendar** - Date picker with range selection
- **Checkbox** - Form checkboxes with validation
- **Fieldset** - Form field grouping
- **FileInput** - File upload with drag & drop
- **Filter** - Data filtering controls
- **FormWizard** - Multi-step form navigation
- **Input** - Text inputs with validation
- **Label** - Form labels with floating support
- **PhoneInput** - International phone number input
- **Radio** - Radio button groups
- **Range** - Slider input controls
- **Rating** - Star rating components
- **Select** - Dropdown select inputs
- **Textarea** - Multi-line text inputs
- **Toggle** - Switch toggle controls
- **Validator** - Form validation feedback

### Feedback (8 components)

- **Alert** - Notification messages
- **Loading** - Loading spinners and indicators
- **Progress** - Progress bars
- **RadialProgress** - Circular progress indicators
- **Skeleton** - Content loading placeholders
- **Toast** - Toast notifications
- **ToastContainer** - Toast management
- **Tooltip** - Contextual help tooltips

### Layout (8 components)

- **Divider** - Content separators
- **Drawer** - Side navigation drawers
- **Footer** - Page footers
- **Hero** - Hero sections
- **Indicator** - Position indicators
- **Join** - Connected form elements
- **Mask** - Image shape masks
- **Stack** - Layered content

### Navigation (7 components)

- **Breadcrumbs** - Navigation breadcrumbs
- **Dock** - Bottom navigation dock
- **Link** - Styled navigation links
- **Menu** - Navigation menus
- **Navbar** - Top navigation bars
- **Pagination** - Page navigation
- **Steps** - Step-by-step navigation

## Button Component Examples

### Color Variants

```vue
<template>
  <div class="flex gap-2">
    <BpButton color="primary">Primary</BpButton>
    <BpButton color="secondary">Secondary</BpButton>
    <BpButton color="accent">Accent</BpButton>
    <BpButton color="neutral">Neutral</BpButton>
    <BpButton color="info">Info</BpButton>
    <BpButton color="success">Success</BpButton>
    <BpButton color="warning">Warning</BpButton>
    <BpButton color="error">Error</BpButton>
  </div>
</template>
```

### Style Variants

```vue
<template>
  <div class="flex gap-2">
    <BpButton btn-style="outline">Outline</BpButton>
    <BpButton btn-style="dash">Dash</BpButton>
    <BpButton btn-style="soft">Soft</BpButton>
    <BpButton btn-style="ghost">Ghost</BpButton>
    <BpButton btn-style="link">Link</BpButton>
  </div>
</template>
```

### Size Variants

```vue
<template>
  <div class="flex gap-2 items-center">
    <BpButton size="xs">Extra Small</BpButton>
    <BpButton size="sm">Small</BpButton>
    <BpButton size="md">Medium</BpButton>
    <BpButton size="lg">Large</BpButton>
    <BpButton size="xl">Extra Large</BpButton>
  </div>
</template>
```

### Advanced Features

```vue
<template>
  <div class="space-y-4">
    <!-- Loading state -->
    <BpButton :loading="isLoading" color="primary"> Submit Form </BpButton>

    <!-- With icons -->
    <BpButton icon-left="heart" icon-right="arrow-right" color="accent"> Like & Continue </BpButton>

    <!-- Shape modifiers -->
    <BpButton circle icon-left="settings" color="neutral" />
    <BpButton square icon-left="plus" color="success" />
    <BpButton wide color="info">Wide Button</BpButton>
    <BpButton block color="warning">Block Button</BpButton>

    <!-- Confirmation dialog -->
    <BpButton confirm-action confirm-text="Are you sure?" color="error"> Delete Item </BpButton>
  </div>
</template>
```

## Configuration

### Module Options

| Option        | Type      | Default | Description                       |
| ------------- | --------- | ------- | --------------------------------- |
| `prefix`      | `string`  | `'Bp'`  | Component prefix for auto-imports |
| `components`  | `boolean` | `true`  | Enable component auto-imports     |
| `css`         | `boolean` | `true`  | Include default CSS styles        |
| `composables` | `boolean` | `true`  | Enable composable auto-imports    |
| `tailwind`    | `boolean` | `true`  | Enable Tailwind CSS integration   |

### Advanced Configuration

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@boilerplatepowa/nuxt4-design-system'],
  nuxtDesignSystem: {
    prefix: 'Bp',
    components: true,
    css: true,
    composables: true,
    tailwind: true,
  },
})
```

## Development

### Storybook

```bash
npm run storybook
```

Interactive component documentation with live examples and controls.

### Testing

```bash
npm run test
npm run test:watch
```

Comprehensive test suite with Vitest and Vue Test Utils.

### Development Server

```bash
npm run dev
```

Hot reload development server with playground.

## TypeScript Support

### Component Props

All components include full TypeScript definitions:

```typescript
import type { BtnColor, BtnStyle, BtnSize } from '@boilerplatepowa/nuxt4-design-system'

interface ButtonProps {
  color?: BtnColor // 'primary' | 'secondary' | 'accent' | 'neutral' | 'info' | 'success' | 'warning' | 'error'
  btnStyle?: BtnStyle // 'outline' | 'dash' | 'soft' | 'ghost' | 'link'
  size?: BtnSize // 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  wide?: boolean // btn-wide modifier
  block?: boolean // btn-block modifier
  square?: boolean // btn-square modifier
  circle?: boolean // btn-circle modifier
  active?: boolean // btn-active behavior
  disabled?: boolean // disabled state
  loading?: boolean // loading state
  // ... more props
}
```

### Class Generation

Smart class generation using component maps:

```typescript
import { generateBtnClasses } from '@boilerplatepowa/nuxt4-design-system'

const classes = generateBtnClasses({
  color: 'primary',
  style: 'outline',
  size: 'lg',
  modifiers: ['wide'],
})
// Returns: 'btn btn-primary btn-outline btn-lg btn-wide'
```

## Migration Guide

### From DaisyUI Direct Usage

```vue
<!-- Before -->
<button class="btn btn-primary btn-lg">Click</button>

<!-- After -->
<BpButton color="primary" size="lg">Click</BpButton>
```

### From Other Design Systems

```vue
<!-- Material UI -->
<Button variant="contained" size="large">Click</Button>

<!-- Ant Design -->
<a-button type="primary" size="large">Click</a-button>

<!-- Our System -->
<BpButton color="primary" size="lg">Click</BpButton>
```

## Project Status

### ✅ **Completed Features**

- 60+ Vue components with full DaisyUI integration
- Comprehensive TypeScript support
- Storybook documentation with interactive examples
- Vitest testing suite with 400+ test cases
- Smart class generation system
- Auto-import support with configurable prefix
- Form validation with VeeValidate and Yup
- Icon integration with Lucide Vue Next
- Accessibility features (WCAG 2.1 AA)

### 🚧 **In Development**

- Theme management system
- Advanced composables
- Performance monitoring
- Bundle optimization
- Internationalization support

### 📋 **Roadmap**

- [ ] Theme switching with persistence
- [ ] Advanced form validation
- [ ] Performance monitoring
- [ ] Bundle size optimization
- [ ] Internationalization (i18n)
- [ ] Advanced animations
- [ ] Mobile-first responsive utilities
- [ ] Dark mode enhancements

## Contributing

We welcome contributions! Please follow these guidelines:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Follow conventional commits**: `feat: add amazing feature`
4. **Add tests**: Ensure 100% test coverage for new features
5. **Update documentation**: Add Storybook stories and README updates
6. **Submit a pull request**

### Development Setup

```bash
# Clone the repository
git clone https://github.com/BoilerplatePowa/Nuxt4-Design-System.git
cd Nuxt4-Design-System

# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm run test

# Start Storybook
npm run storybook
```

### Code Style

- Use TypeScript for all new code
- Follow Vue 3 Composition API patterns
- Use DaisyUI class naming conventions
- Write comprehensive tests
- Document all public APIs

## License

MIT License - see [LICENSE](LICENSE) file for details

## Support

- 📖 **Documentation**: [Storybook](http://localhost:6006) (run `npm run storybook`)
- 🐛 **Issues**: [GitHub Issues](https://github.com/BoilerplatePowa/Nuxt4-Design-System/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/BoilerplatePowa/Nuxt4-Design-System/discussions)
- 📧 **Contact**: [Your Email/Contact Info]

---

**Built with ❤️ using Nuxt 4, DaisyUI 5.1.5, and TypeScript**

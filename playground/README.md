# Nuxt Design System - Documentation Website

This is the playground and documentation website for the **Nuxt Design System** module. It showcases all available components, provides installation instructions, and serves as a living example of the design system in action.

## 🚀 Quick Start

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Access

- **Development**: http://localhost:3000
- **Production**: Built files in `.output/` directory

## 📚 What's Included

### 1. Landing Page

- Hero section with project overview
- Key features and benefits
- Quick start buttons

### 2. Installation Guide

- Step-by-step installation instructions
- Configuration examples
- Requirements and dependencies

### 3. Component Library

- **Actions**: Button, Dropdown, Modal, Swap, FAB
- **Data Display**: Avatar, Badge, Card, Table, Timeline
- **Data Input**: Input, Checkbox, Select, Radio, Textarea
- **Feedback**: Alert, Loading, Progress, Toast, Tooltip
- **Navigation**: Navbar, Menu, Tabs, Steps, Breadcrumbs
- **Layout**: Divider, Drawer, Footer, Hero, Mask

### 4. Live Examples

- Interactive component demonstrations
- All variants and states
- Real-time theme switching

### 5. GitHub Integration

- Repository information
- Contributing guidelines
- Open source details

## 🎨 Features

### Theme Support

- Multiple DaisyUI themes
- Light/Dark mode switching
- Theme persistence
- Custom theme support

### Responsive Design

- Mobile-first approach
- Responsive navigation
- Adaptive layouts
- Touch-friendly interactions

### Accessibility

- WCAG 2.1 AA compliance
- Screen reader support
- Keyboard navigation
- ARIA attributes

### Performance

- Optimized bundle size
- Lazy loading
- Efficient rendering
- Minimal dependencies

## 🛠️ Technical Stack

- **Framework**: Nuxt 4.0.3
- **UI Library**: DaisyUI 5.1.5
- **Styling**: TailwindCSS 4.1.12
- **Icons**: Lucide Vue Next
- **TypeScript**: Full type support
- **Build**: Vite + Nitro

## 📱 Component Examples

### Button Component

```vue
<template>
    <!-- Color variants -->
    <BpButton color="primary">Primary</BpButton>
    <BpButton color="secondary">Secondary</BpButton>

    <!-- Style variants -->
    <BpButton style="outline">Outline</BpButton>
    <BpButton style="ghost">Ghost</BpButton>

    <!-- Size variants -->
    <BpButton size="sm">Small</BpButton>
    <BpButton size="lg">Large</BpButton>

    <!-- States -->
    <BpButton loading>Loading</BpButton>
    <BpButton disabled>Disabled</BpButton>
</template>
```

### Icon Component

```vue
<template>
    <Icon name="heart" class="w-6 h-6 text-red-500" />
    <Icon name="star" class="w-8 h-8 text-yellow-500" />
    <Icon name="settings" class="w-5 h-5 text-blue-500" />
</template>
```

## 🎯 Usage Patterns

### Component Mapping

The design system uses a sophisticated component mapping system:

```typescript
// Button color mapping
const btnColorMap = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    accent: 'btn-accent',
    // ... more colors
}

// Button style mapping
const btnStyleMap = {
    outline: 'btn-outline',
    ghost: 'btn-ghost',
    soft: 'btn-soft',
    // ... more styles
}
```

### Theme Integration

```typescript
// Theme switching
function setTheme(theme: string) {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('@nuxt-design-system/theme', theme)
}

// Available themes
const themes = ['light', 'dark', 'corporate', 'synthwave']
```

## 🔧 Configuration

### Module Configuration

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
    modules: ['@boilerplatepowa/nuxt4-design-system'],
    nuxtDesignSystem: {
        // Your configuration here
        theme: 'light',
        components: true,
        prefix: 'Bp',
    },
})
```

### TailwindCSS Configuration

```typescript
// tailwind.config.js
export default {
    content: ['./src/**/*.{vue,ts}', './playground/**/*.{vue,ts}'],
    plugins: ['daisyui'],
    daisyui: {
        themes: ['light', 'dark', 'corporate', 'synthwave'],
    },
}
```

## 📖 Documentation Structure

```
playground/
├── app.vue                 # Main documentation page
├── README.md              # This file
├── nuxt.config.ts         # Nuxt configuration
├── package.json           # Dependencies
└── .nuxt/                 # Build output
```

## 🎨 Customization

### Adding New Components

1. Create component in `src/runtime/components/`
2. Add component map in `src/runtime/shared/componentsMaps/`
3. Update types in `src/runtime/shared/types.d.ts`
4. Add to documentation in `playground/app.vue`

### Custom Themes

1. Define theme in DaisyUI configuration
2. Add theme option to theme switcher
3. Update theme persistence logic

### Component Variants

1. Extend component maps
2. Update TypeScript types
3. Add examples to documentation

## 🚀 Deployment

### Static Site Generation

```bash
# Build for static hosting
npm run generate

# Deploy to platforms like:
# - Netlify
# - Vercel
# - GitHub Pages
# - AWS S3
```

### Server-Side Rendering

```bash
# Build for SSR
npm run build

# Deploy to:
# - Node.js servers
# - Docker containers
# - Cloud platforms
```

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Report Bugs**: Open an issue with detailed information
2. **Suggest Features**: Share your ideas for new components
3. **Submit Code**: Fork the repo and create a pull request
4. **Improve Docs**: Help make the documentation better

### Development Workflow

```bash
# Fork and clone
git clone https://github.com/your-username/Nuxt4-Design-System.git

# Install dependencies
npm install

# Start development
npm run dev

# Make changes and test
# Submit pull request
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

## 🙏 Acknowledgments

- **DaisyUI** for the beautiful component library
- **TailwindCSS** for the utility-first CSS framework
- **Nuxt Team** for the amazing framework
- **Vue.js Community** for the reactive framework

## 📞 Support

- **GitHub Issues**: [Report bugs and request features](https://github.com/BoilerplatePowa/Nuxt4-Design-System/issues)
- **Discussions**: [Join the community](https://github.com/BoilerplatePowa/Nuxt4-Design-System/discussions)
- **Documentation**: [Full documentation](https://github.com/BoilerplatePowa/Nuxt4-Design-System)

---

**Built with ❤️ by [BoilerplatePowa](https://github.com/BoilerplatePowa)**

_This documentation website is part of the Nuxt Design System project and serves as both a showcase and a reference for developers._

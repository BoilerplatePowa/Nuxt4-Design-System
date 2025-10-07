# Installation Guide

This guide explains how to properly install and configure the Design System module in your Nuxt 4 application.

## Prerequisites

- Nuxt 4.0.3 or higher
- Node.js 18+
- npm, pnpm, or yarn

## Step 1: Install the Module

### For GitHub Packages (Private Registry)

First, configure npm to use GitHub Packages for `@boilerplatepowa` scope:

```bash
# Create or edit .npmrc in your project root
echo "@boilerplatepowa:registry=https://npm.pkg.github.com" >> .npmrc
echo "//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}" >> .npmrc
```

Then install the module:

```bash
npm install @boilerplatepowa/nuxt4-design-system
```

### Install Peer Dependencies

The module requires Tailwind CSS v4 and DaisyUI. Install them:

```bash
npm install -D tailwindcss@^4.1.12 @tailwindcss/vite@^4.1.12 daisyui@^5.1.5
```

## Step 2: Configure Nuxt

Add the module to your `nuxt.config.ts`:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    '@boilerplatepowa/nuxt4-design-system'
  ],
  
  // Optional: Customize module options
  nuxtDesignSystem: {
    prefix: 'Bp',        // Component prefix (default: 'Bp')
    components: true,    // Auto-import components (default: true)
    css: true,          // Include module CSS (default: true)
    composables: true,   // Auto-import composables (default: true)
    tailwind: true      // Enable Tailwind CSS integration (default: true)
  }
})
```

## Step 3: Verify Installation

Create a test page to verify the installation:

```vue
<!-- pages/test.vue -->
<template>
  <div class="container mx-auto p-8">
    <h1 class="text-4xl font-bold mb-4">Design System Test</h1>
    
    <!-- Test Button component -->
    <BpButton variant="primary" size="md">
      Test Button
    </BpButton>
    
    <!-- Test Card component -->
    <BpCard title="Test Card" class="mt-4">
      <p>If you can see styled components, the installation is successful!</p>
    </BpCard>
  </div>
</template>
```

## Troubleshooting

### Styles Not Loading

If DaisyUI and Tailwind CSS styles are not loading:

1. **Clear Nuxt cache:**
   ```bash
   rm -rf .nuxt node_modules/.vite
   npm install
   npm run dev
   ```

2. **Verify peer dependencies are installed:**
   ```bash
   npm ls tailwindcss @tailwindcss/vite daisyui
   ```

3. **Check that module options include `tailwind: true` and `css: true`**

### Component Auto-Import Not Working

If components are not auto-importing:

1. **Restart your dev server**
2. **Check TypeScript recognition:**
   ```bash
   npm run dev:prepare  # In the module directory
   ```
3. **Manually import if needed:**
   ```vue
   <script setup>
   import { Button } from '@boilerplatepowa/nuxt4-design-system/components'
   </script>
   ```

### TypeScript Errors

If you see TypeScript errors:

1. **Ensure `.nuxt/types` is generated:**
   ```bash
   npm run dev  # Start dev server to generate types
   ```

2. **Add to `tsconfig.json`:**
   ```json
   {
     "extends": "./.nuxt/tsconfig.json",
     "compilerOptions": {
       "types": ["@boilerplatepowa/nuxt4-design-system"]
     }
   }
   ```

### Build Errors

If you encounter build errors:

1. **Ensure transpilation is configured** (the module does this automatically, but verify):
   ```typescript
   // nuxt.config.ts
   export default defineNuxtConfig({
     build: {
       transpile: ['@boilerplatepowa/nuxt4-design-system']
     }
   })
   ```

2. **Check for version conflicts:**
   ```bash
   npm ls tailwindcss
   npm ls daisyui
   ```

## Advanced Configuration

### Custom Tailwind Configuration

To extend the default Tailwind configuration:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@boilerplatepowa/nuxt4-design-system'],
  
  vite: {
    css: {
      postcss: {
        plugins: [
          // Your custom PostCSS plugins
        ]
      }
    }
  }
})
```

### Selective Component Import

To reduce bundle size, import only specific components:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  nuxtDesignSystem: {
    components: false  // Disable auto-import
  }
})
```

Then manually import:

```vue
<script setup>
import { Button, Card } from '@boilerplatepowa/nuxt4-design-system/components'
</script>
```

### Using with Existing Tailwind Setup

If your app already has Tailwind CSS:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  nuxtDesignSystem: {
    tailwind: false,  // Disable module's Tailwind setup
    css: true         // Keep DaisyUI styles
  }
})
```

## Production Build

Before deploying:

1. **Test production build:**
   ```bash
   npm run build
   npm run preview
   ```

2. **Verify CSS is included:**
   ```bash
   # Check .output/public for CSS files
   ls -la .output/public/_nuxt/*.css
   ```

3. **Check bundle size:**
   ```bash
   npm run build -- --analyze
   ```

## Environment-Specific Configuration

For different environments:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  nuxtDesignSystem: {
    // Development: full features
    ...(process.env.NODE_ENV === 'development' && {
      components: true,
      composables: true
    }),
    
    // Production: optimized
    ...(process.env.NODE_ENV === 'production' && {
      components: true,
      composables: false  // If not needed
    })
  }
})
```

## Next Steps

- Check the [Component Documentation](./playground/components-api.md) for available components
- Explore [Storybook](https://boilerplatepowa.github.io/Nuxt4-Design-System/) for component examples
- Read [Best Practices](./README.md#best-practices) for optimal usage

## Support

If you encounter issues:

1. Check [GitHub Issues](https://github.com/BoilerplatePowa/Nuxt4-Design-System/issues)
2. Review the [Troubleshooting Guide](#troubleshooting)
3. Open a new issue with your configuration and error details


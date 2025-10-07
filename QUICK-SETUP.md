# Quick Setup Reference

A quick reference card for setting up the Design System module in your Nuxt 4 app.

## Prerequisites Checklist

- [ ] Nuxt 4.0.3 or higher
- [ ] Node.js 18+
- [ ] Clean `.nuxt` cache

## Installation (3 steps)

### 1. Install Module + Peer Dependencies

```bash
npm install @boilerplatepowa/nuxt4-design-system
npm install -D tailwindcss@^4.1.12 @tailwindcss/vite@^4.1.12 daisyui@^5.1.5
```

### 2. Configure Nuxt

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@boilerplatepowa/nuxt4-design-system']
})
```

### 3. Test

```vue
<!-- app.vue -->
<template>
  <BpButton>Test</BpButton>
</template>
```

## Common Issues & Solutions

### ❌ Styles Not Loading

**Symptoms**: Components render but have no styling

**Solutions**:
1. Clear cache: `rm -rf .nuxt node_modules/.vite && npm install`
2. Verify peer deps: `npm ls tailwindcss daisyui`
3. Check module config: Ensure `css: true` and `tailwind: true`
4. Restart dev server

### ❌ Components Not Auto-Importing

**Symptoms**: `BpButton is not defined`

**Solutions**:
1. Restart dev server
2. Check config: Ensure `components: true`
3. Verify prefix: Default is `Bp`, customize with `prefix: 'YourPrefix'`
4. Manual import fallback:
   ```typescript
   import { Button } from '@boilerplatepowa/nuxt4-design-system/components'
   ```

### ❌ TypeScript Errors

**Symptoms**: Type errors in IDE

**Solutions**:
1. Generate types: Run `npm run dev` once
2. Check `.nuxt/types` exists
3. Add to `tsconfig.json`:
   ```json
   {
     "extends": "./.nuxt/tsconfig.json"
   }
   ```

### ❌ Build Errors

**Symptoms**: Build fails with Vite/PostCSS errors

**Solutions**:
1. Module auto-configures transpilation - no action needed
2. If issues persist, explicitly add:
   ```typescript
   // nuxt.config.ts
   export default defineNuxtConfig({
     build: {
       transpile: ['@boilerplatepowa/nuxt4-design-system']
     }
   })
   ```

## Module Options Reference

```typescript
nuxtDesignSystem: {
  prefix: 'Bp',        // Component prefix (e.g., BpButton)
  components: true,    // Enable auto-import
  css: true,          // Include module CSS
  composables: true,   // Auto-import composables  
  tailwind: true      // Enable Tailwind integration
}
```

## Component Usage Pattern

```vue
<template>
  <!-- Basic usage -->
  <BpButton>Click me</BpButton>
  
  <!-- With props -->
  <BpButton color="primary" size="lg">
    Large Primary Button
  </BpButton>
  
  <!-- With icons -->
  <BpButton icon-left="heart" color="accent">
    Like
  </BpButton>
  
  <!-- Loading state -->
  <BpButton :loading="isSubmitting">
    Submit
  </BpButton>
</template>

<script setup lang="ts">
const isSubmitting = ref(false)
</script>
```

## Verification Steps

After installation, verify:

1. **Dev server starts**: `npm run dev` - no errors
2. **Components load**: `BpButton` renders
3. **Styles apply**: Button has DaisyUI styling
4. **TypeScript works**: IntelliSense shows props
5. **Build works**: `npm run build` succeeds

## Need More Help?

- 📖 [Complete Installation Guide](./INSTALLATION.md)
- 📚 [Component Documentation](./playground/components-api.md)
- 🎨 [Storybook Examples](https://boilerplatepowa.github.io/Nuxt4-Design-System/)
- 🐛 [Report Issue](https://github.com/BoilerplatePowa/Nuxt4-Design-System/issues)

## Quick Commands

```bash
# Clear cache and reinstall
rm -rf .nuxt node_modules/.vite && npm install

# Check peer dependencies
npm ls tailwindcss @tailwindcss/vite daisyui

# Verify module installation
npm ls @boilerplatepowa/nuxt4-design-system

# Test build
npm run build
npm run preview
```

---

**Still having issues?** See the [full troubleshooting guide](./INSTALLATION.md#troubleshooting) or [open an issue](https://github.com/BoilerplatePowa/Nuxt4-Design-System/issues).


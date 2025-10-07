# ⚠️ CRITICAL: Why Styles Aren't Loading

## The Root Cause

**Tailwind CSS v4 requires a CSS entry point in the consuming application.**

Unlike Tailwind CSS v3, version 4 uses `@import 'tailwindcss'` which **must be in a CSS file in the consuming app**, not just in the module.

## What's Happening

1. ✅ Module is loaded correctly
2. ✅ Components auto-import works
3. ❌ **CSS is not being processed** because the consuming app doesn't have a Tailwind CSS entry point

## The Solution (2 Steps)

### Step 1: Create CSS File in Your App

**Create this file in your consuming application:**

```bash
# In your app (NOT the module)
mkdir -p assets/css
```

```css
/* assets/css/main.css */
@import 'tailwindcss';
```

That's it! Just one line.

### Step 2: Add CSS to nuxt.config.ts

```typescript
// nuxt.config.ts (in your consuming app)
export default defineNuxtConfig({
  modules: ['@boilerplatepowa/nuxt4-design-system'],
  
  // ADD THIS LINE:
  css: ['~/assets/css/main.css'],
  
  // Module configuration (optional)
  nuxtDesignSystem: {
    css: true,      // Keep this as true
    tailwind: true  // Keep this as true
  }
})
```

## Why This Happens

**Tailwind CSS v4 Architecture:**
- The module's CSS has `@import 'tailwindcss'` 
- This directive needs to be processed by the Tailwind Vite plugin
- The plugin only processes CSS from the consuming app's entry points
- Module CSS alone isn't enough - the app needs its own Tailwind entry

**In simple terms:**
- Module provides: DaisyUI styles and components
- Your app must provide: Tailwind CSS entry point
- Together they work: Tailwind + DaisyUI = Styled components

## Complete Working Example

```bash
# Your app structure
your-app/
├── assets/
│   └── css/
│       └── main.css          # ← CREATE THIS
├── pages/
│   └── index.vue
├── nuxt.config.ts            # ← UPDATE THIS
└── package.json
```

**assets/css/main.css:**
```css
@import 'tailwindcss';
```

**nuxt.config.ts:**
```typescript
export default defineNuxtConfig({
  modules: ['@boilerplatepowa/nuxt4-design-system'],
  css: ['~/assets/css/main.css']
})
```

**pages/index.vue:**
```vue
<template>
  <div class="p-8">
    <BpButton color="primary">
      It Works! 🎉
    </BpButton>
  </div>
</template>
```

## Verification

After adding the CSS file:

1. **Restart dev server:**
   ```bash
   npm run dev
   ```

2. **Check browser:**
   - Open DevTools → Elements
   - Inspect a button
   - Should see DaisyUI classes with actual styles

3. **Common checks:**
   ```bash
   # Verify peer dependencies
   npm ls tailwindcss @tailwindcss/vite daisyui
   
   # Should show v4.1.12 for tailwindcss
   ```

## Still Not Working?

### Quick Fixes

1. **Clear all caches:**
   ```bash
   rm -rf .nuxt node_modules/.vite
   npm install
   npm run dev
   ```

2. **Verify file locations:**
   - CSS file: `assets/css/main.css` ✓
   - In nuxt.config: `css: ['~/assets/css/main.css']` ✓

3. **Check console for errors:**
   - Open browser DevTools
   - Look for CSS import errors
   - Look for missing file errors

### If STILL not working:

See [CONSUMING-APP-SETUP.md](./CONSUMING-APP-SETUP.md) for detailed troubleshooting.

## Why Can't the Module Do This Automatically?

**Technical limitation:**
- Tailwind CSS v4's Vite plugin requires CSS files from the app's source
- Module CSS in `node_modules` isn't automatically processed
- The `@import 'tailwindcss'` directive must be in the app's CSS
- This is a Tailwind v4 design decision, not a module limitation

## The Bottom Line

**You need ONE file with ONE line:**

```css
/* assets/css/main.css */
@import 'tailwindcss';
```

**And ONE line in config:**

```typescript
css: ['~/assets/css/main.css']
```

That's all it takes to make styles work! 🚀

---

**Documentation:**
- Full guide: [CONSUMING-APP-SETUP.md](./CONSUMING-APP-SETUP.md)
- Quick reference: [QUICK-SETUP.md](./QUICK-SETUP.md)
- Installation: [INSTALLATION.md](./INSTALLATION.md)


# Setup Guide for Consuming Applications

This guide provides step-by-step instructions for properly setting up the Design System module in your Nuxt 4 application.

## Important: Tailwind CSS v4 Requirements

Tailwind CSS v4 works differently than v3. The consuming application **must** have proper CSS setup for styles to work.

## Step-by-Step Setup

### 1. Install Dependencies

```bash
# Install the design system module
npm install @boilerplatepowa/nuxt4-design-system

# Install REQUIRED peer dependencies
npm install -D tailwindcss@^4.1.12 @tailwindcss/vite@^4.1.12 daisyui@^5.1.5
```

### 2. Create CSS Entry Point

**CRITICAL:** Create a CSS file in your project root or assets folder:

```css
/* assets/css/main.css or app.css */
@import 'tailwindcss';

/* DaisyUI will be loaded automatically by the module */
```

This CSS file is **required** for Tailwind CSS v4 to work.

### 3. Configure Nuxt

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@boilerplatepowa/nuxt4-design-system'],
  
  // Add your CSS entry point
  css: [
    '~/assets/css/main.css'  // Your CSS file with @import 'tailwindcss'
  ],
  
  // Module options (all optional)
  nuxtDesignSystem: {
    prefix: 'Bp',        // Component prefix
    components: true,    // Auto-import components
    css: true,          // Include DaisyUI styles (IMPORTANT)
    composables: true,   // Auto-import composables
    tailwind: true      // Enable Tailwind CSS integration (IMPORTANT)
  }
})
```

### 4. Verify Setup

Create a test page:

```vue
<!-- pages/test.vue -->
<template>
  <div class="container mx-auto p-8">
    <h1 class="text-4xl font-bold mb-4">Design System Test</h1>
    
    <!-- Test Tailwind CSS -->
    <div class="bg-blue-500 text-white p-4 rounded mb-4">
      Tailwind CSS is working ✅
    </div>
    
    <!-- Test DaisyUI -->
    <button class="btn btn-primary mb-4">
      Raw DaisyUI Button
    </button>
    
    <!-- Test Design System Component -->
    <BpButton color="primary" size="lg">
      Design System Button
    </BpButton>
  </div>
</template>
```

## Troubleshooting

### Problem: No Styles Appear

**Checklist:**

1. ✅ Created CSS file with `@import 'tailwindcss'`
2. ✅ Added CSS file to `nuxt.config.ts` css array
3. ✅ Installed all peer dependencies
4. ✅ Module configured with `css: true` and `tailwind: true`
5. ✅ Cleared cache: `rm -rf .nuxt node_modules/.vite`

**If styles still don't appear:**

```bash
# 1. Stop dev server

# 2. Clear all caches
rm -rf .nuxt node_modules/.vite node_modules/.cache

# 3. Verify peer dependencies
npm ls tailwindcss @tailwindcss/vite daisyui

# 4. Reinstall if needed
npm install

# 5. Restart dev server
npm run dev
```

### Problem: "Cannot find module 'tailwindcss'"

**Solution:**

Ensure Tailwind CSS is installed:

```bash
npm install -D tailwindcss@^4.1.12 @tailwindcss/vite@^4.1.12
```

### Problem: DaisyUI Classes Don't Work

**Check these:**

1. Module option `css: true` is set
2. Peer dependency `daisyui` is installed
3. Your CSS file doesn't override DaisyUI imports

### Problem: Components Work But No Styling

**This means:**
- ✅ Module is loaded (components auto-import works)
- ❌ CSS is not being processed

**Fix:**

1. Ensure you have a CSS entry point with `@import 'tailwindcss'`
2. Add it to `nuxt.config.ts`:
   ```typescript
   css: ['~/assets/css/main.css']
   ```

## Alternative Setup: Manual CSS Import

If automatic CSS doesn't work, try manual import:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@boilerplatepowa/nuxt4-design-system'],
  
  nuxtDesignSystem: {
    css: false,  // Disable automatic CSS
    tailwind: true
  },
  
  css: [
    // Import module styles manually
    '@boilerplatepowa/nuxt4-design-system/styles',
    // Or create your own
    '~/assets/css/main.css'
  ]
})
```

Then in `assets/css/main.css`:

```css
@import 'tailwindcss';
@plugin 'daisyui' {
    themes: all;
}
```

## Verification Commands

### Check Peer Dependencies

```bash
npm ls tailwindcss @tailwindcss/vite daisyui
```

Expected output:
```
your-app@1.0.0
├── @tailwindcss/vite@4.1.12
├── daisyui@5.1.5
└── tailwindcss@4.1.12
```

### Check Module Loading

```bash
npm run dev
```

Look for in console:
```
✔ Nuxt module @boilerplatepowa/nuxt-design-system loaded
```

### Test in Browser

Open browser console and check:
1. No 404 errors for CSS files
2. Elements have DaisyUI classes applied
3. Run: `getComputedStyle(document.querySelector('.btn')).display`
   - Should return styles, not empty

## Working Example

Minimal working setup:

**Directory structure:**
```
your-app/
├── assets/
│   └── css/
│       └── main.css          # @import 'tailwindcss'
├── pages/
│   └── index.vue            # Your pages
├── nuxt.config.ts           # Config below
└── package.json
```

**nuxt.config.ts:**
```typescript
export default defineNuxtConfig({
  modules: ['@boilerplatepowa/nuxt4-design-system'],
  css: ['~/assets/css/main.css']
})
```

**assets/css/main.css:**
```css
@import 'tailwindcss';
```

**pages/index.vue:**
```vue
<template>
  <BpButton>Hello</BpButton>
</template>
```

## Common Mistakes

### ❌ No CSS Entry Point

```typescript
// This won't work - missing CSS file
export default defineNuxtConfig({
  modules: ['@boilerplatepowa/nuxt4-design-system']
  // css: [] - WRONG! Need CSS file with @import 'tailwindcss'
})
```

### ❌ Wrong Tailwind Version

```json
// package.json - WRONG VERSION
{
  "devDependencies": {
    "tailwindcss": "^3.0.0"  // ❌ Need v4.1.12+
  }
}
```

### ❌ Missing Peer Dependencies

```bash
# This will fail
npm install @boilerplatepowa/nuxt4-design-system
# Missing: tailwindcss, @tailwindcss/vite, daisyui
```

## Need Help?

1. Check this guide again
2. Review [INSTALLATION.md](./INSTALLATION.md)
3. See [QUICK-SETUP.md](./QUICK-SETUP.md)
4. Open an issue with:
   - Your `package.json`
   - Your `nuxt.config.ts`
   - Your CSS file contents
   - Browser console errors
   - Screenshot showing the issue

## Success Indicators

When properly set up, you should see:

✅ Dev server starts without errors
✅ Browser shows styled components
✅ No 404 errors in console
✅ DaisyUI classes apply (inspect element shows styles)
✅ Build succeeds: `npm run build`

---

**Remember:** Tailwind CSS v4 requires a CSS entry point with `@import 'tailwindcss'` in the consuming application!


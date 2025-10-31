# 📦 Dependency Strategy for Design System Package

## Overview

As a **design system package** that will be published and consumed by other projects, we follow a strategic approach to dependencies to minimize bundle size and avoid version conflicts.

## Dependency Categories

### 1. **dependencies** (Bundled with Package)

These are **internal implementation details** that consumers don't need to know about:

```json
{
  "@nuxt/kit": "^4.1.2",           // Build-time utilities
  "@vitejs/plugin-vue": "^6.0.1",  // Build-time Vue plugin
  "imask": "^7.6.1",                // Phone input masking
  "lucide-vue-next": "^0.542.0",   // Icon components
  "vee-validate": "^4.15.1",       // Form validation
  "yup": "^1.7.0"                   // Validation schemas
}
```

**Why bundled?**
- These are tightly coupled to component implementation
- Consumers don't interact with them directly
- Version consistency is critical for component behavior

### 2. **peerDependencies** (Required by Consumer)

These are libraries that:
- The consumer likely already has installed
- Should have a single version across the entire app
- Are part of the public API or commonly used

#### Required Peer Dependencies
```json
{
  "@tailwindcss/vite": "^4.1.12",  // Required for styling
  "daisyui": "^5.2.0",              // Required for components
  "tailwindcss": "^4.1.12"          // Required for styling
}
```

#### Optional Peer Dependencies
```json
{
  "@tanstack/vue-table": "^8.0.0",  // Only for DataMigration component
  "fuse.js": "^7.0.0",              // Only for DataMigration component
  "pinia": "^2.2.0 || ^2.3.0"       // Only for DataMigration component
}
```

**Why peer dependencies?**
- Avoids duplicate installations
- Prevents version conflicts
- Reduces total bundle size
- Consumer controls the version

### 3. **devDependencies** (Development Only)

These are only needed during development, testing, and documentation:

```json
{
  "@pinia/nuxt": "^0.9.0",          // For testing Pinia integration
  "fuse.js": "^7.0.0",              // For testing DataMigration
  "pinia": "^2.3.0",                // For testing DataMigration
  "@nuxt/test-utils": "^3.19.2",   // Testing utilities
  "@storybook/*": "^9.1.4",         // Documentation
  "vitest": "^3.2.4",               // Testing framework
  // ... other dev tools
}
```

## DataMigration Component Strategy

The DataMigration component uses **optional peer dependencies**:

### Why Optional?

1. **Not all consumers need it**: Most users won't use DataMigration
2. **Reduces barrier to entry**: Users don't need to install extra deps just to use other components
3. **Clear opt-in**: Users explicitly install what they need

### Installation Flow

**For users NOT using DataMigration:**
```bash
npm install @boilerplatepowa/nuxt4-design-system
# No additional dependencies needed!
```

**For users using DataMigration:**
```bash
npm install @boilerplatepowa/nuxt4-design-system
npm install @tanstack/vue-table fuse.js pinia  # Only install when needed
```

### Warning System

When a user tries to use DataMigration without the dependencies, they'll see:

```
⚠️ DataMigration component requires peer dependencies:
  - @tanstack/vue-table ^8.0.0
  - fuse.js ^7.0.0
  - pinia ^2.2.0 || ^2.3.0

Install them with: npm install @tanstack/vue-table fuse.js pinia
```

## Benefits of This Strategy

### ✅ For Package Consumers

1. **Smaller Initial Bundle**: Don't pay for features you don't use
2. **Version Control**: Use the Pinia/Fuse.js version you prefer
3. **No Conflicts**: Single version of Pinia across entire app
4. **Clear Dependencies**: Know exactly what's required

### ✅ For Package Maintainers

1. **Flexibility**: Can support multiple Pinia versions
2. **Less Maintenance**: Don't need to update for every Pinia release
3. **Clear Boundaries**: Explicit about what's bundled vs external
4. **Better Testing**: Test against multiple peer dependency versions

### ✅ For Bundle Size

**Without DataMigration:**
- Design System: ~150KB
- Total: ~150KB

**With DataMigration:**
- Design System: ~150KB
- TanStack Vue Table: ~35KB
- Fuse.js: ~25KB
- Pinia: ~20KB (if not already installed)
- Total: ~230KB (or ~210KB if Pinia already present)

## Comparison: Before vs After

### ❌ Before (All in dependencies)

```json
{
  "dependencies": {
    "fuse.js": "^7.0.0",
    "pinia": "^2.3.0",
    // ... other deps
  }
}
```

**Problems:**
- All users install Fuse.js even if they never use DataMigration
- Potential version conflict if user already has Pinia
- Larger package size
- Unnecessary dependencies

### ✅ After (Optional peer dependencies)

```json
{
  "peerDependencies": {
    "@tanstack/vue-table": "^8.0.0",
    "fuse.js": "^7.0.0",
    "pinia": "^2.2.0 || ^2.3.0"
  },
  "peerDependenciesMeta": {
    "@tanstack/vue-table": { "optional": true },
    "fuse.js": { "optional": true },
    "pinia": { "optional": true }
  }
}
```

**Benefits:**
- Users only install what they need
- No version conflicts
- Smaller package for most users
- Clear opt-in model

## Best Practices

### When to Use dependencies
- Library is internal implementation detail
- You need a specific version
- Library is small and tightly coupled
- Consumers don't interact with it directly

### When to Use peerDependencies
- Library is commonly used (React, Vue, Nuxt, etc.)
- You want to avoid version conflicts
- Library is part of your public API
- Consumers likely already have it installed

### When to Use optional peerDependencies
- Feature is optional
- Not all users need the dependency
- Want to reduce barrier to entry
- Library is only used by specific components

## Migration Guide for Consumers

If you were using an older version with bundled dependencies:

### Before
```bash
npm install @boilerplatepowa/nuxt4-design-system
# Everything bundled, larger package
```

### After
```bash
npm install @boilerplatepowa/nuxt4-design-system

# Only if using DataMigration:
npm install @tanstack/vue-table fuse.js pinia
```

## Testing Strategy

We test against multiple peer dependency versions:

```json
{
  "@tanstack/vue-table": ["^8.0.0"],
  "pinia": ["^2.2.0", "^2.3.0"],
  "fuse.js": ["^7.0.0"]
}
```

This ensures compatibility across versions.

## Summary

✅ **dependencies**: Internal implementation (bundled)  
✅ **peerDependencies**: Required by all consumers  
✅ **optional peerDependencies**: Required by specific features  
✅ **devDependencies**: Development and testing only  

This strategy provides the best balance of:
- **Performance**: Smaller bundles
- **Flexibility**: Version control
- **Compatibility**: No conflicts
- **Developer Experience**: Clear requirements

---

**Last Updated**: October 30, 2025  
**Package Version**: 1.0.13+


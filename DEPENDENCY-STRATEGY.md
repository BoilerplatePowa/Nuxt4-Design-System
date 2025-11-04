# 📦 Dependency Strategy for Design System Package

## Overview

As a **design system package** that will be published and consumed by other projects, we follow a strategic approach to dependencies to minimize bundle size and avoid version conflicts.

## Dependency Categories

### 1. **dependencies** (Bundled with Package)

These are **internal implementation details** that consumers don't need to know about:

```json
{
    "@nuxt/kit": "^4.1.2", // Build-time utilities
    "@vitejs/plugin-vue": "^6.0.1", // Build-time Vue plugin
    "imask": "^7.6.1", // Phone input masking
    "lucide-vue-next": "^0.542.0", // Icon components
    "vee-validate": "^4.15.1", // Form validation
    "yup": "^1.7.0" // Validation schemas
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
    "@tailwindcss/vite": "^4.1.12", // Required for styling
    "daisyui": "^5.2.0", // Required for components
    "tailwindcss": "^4.1.12" // Required for styling
}
```

#### Optional Peer Dependencies

```json
{
    // No optional peer dependencies currently
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
    "@pinia/nuxt": "^0.9.0", // For testing Pinia integration
    "@nuxt/test-utils": "^3.19.2", // Testing utilities
    "@storybook/*": "^9.1.4", // Documentation
    "vitest": "^3.2.4" // Testing framework
    // ... other dev tools
}
```

## Benefits of This Strategy

### ✅ For Package Consumers

1. **Smaller Bundle Size**: Only necessary dependencies are bundled
2. **Version Control**: Use compatible versions of peer dependencies
3. **No Conflicts**: Single version of peer dependencies across entire app
4. **Clear Dependencies**: Know exactly what's required

### ✅ For Package Maintainers

1. **Flexibility**: Can support multiple versions of peer dependencies
2. **Less Maintenance**: Don't need to update for every peer dependency release
3. **Clear Boundaries**: Explicit about what's bundled vs external
4. **Better Testing**: Test against multiple peer dependency versions

### ✅ For Bundle Size

- Design System: ~150KB
- Total: ~150KB

## Comparison: Before vs After

### ❌ Before (All in dependencies)

```json
{
    "dependencies": {
        "fuse.js": "^7.0.0",
        "pinia": "^2.3.0"
        // ... other deps
    }
}
```

**Problems:**

- Potential version conflicts
- Larger package size
- Unnecessary dependencies

### ✅ After (Clean dependencies)

All dependencies are properly categorized:

- Required dependencies are bundled
- Required peer dependencies are clearly listed
- Optional peer dependencies are used only when needed

**Benefits:**

- No version conflicts
- Smaller package size
- Clear dependency structure

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

## Testing Strategy

We test against all required peer dependency versions to ensure compatibility across different project setups.

## Summary

✅ **dependencies**: Internal implementation (bundled)  
✅ **peerDependencies**: Required by all consumers  
✅ **devDependencies**: Development and testing only

This strategy provides the best balance of:

- **Performance**: Smaller bundles
- **Flexibility**: Version control
- **Compatibility**: No conflicts
- **Developer Experience**: Clear requirements

---

**Last Updated**: October 30, 2025  
**Package Version**: 1.0.13+

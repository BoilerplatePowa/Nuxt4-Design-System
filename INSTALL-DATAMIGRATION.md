# 🚀 DataMigration Component - Installation & Setup

## Quick Installation

### Step 1: Install Peer Dependencies

The DataMigration component requires three optional peer dependencies:

```bash
npm install @tanstack/vue-table@^8.0.0 fuse.js@^7.0.0 pinia@^2.3.0
```

> **Note**: These are marked as optional peer dependencies, so they're only needed if you use the DataMigration component.

### Step 2: Configure Nuxt

If you haven't already configured Pinia, add it to your `nuxt.config.ts`:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
    modules: [
        '@boilerplatepowa/nuxt4-design-system',
        '@pinia/nuxt', // Add this if not already present
    ],
})
```

### Step 3: Use the Component

```vue
<template>
    <DataMigration
        :old-data="oldUsers"
        :new-data="newUsers"
        @complete="handleComplete"
    />
</template>

<script setup lang="ts">
const oldUsers = [
    { id: 1, name: 'John Doe', email: 'john@old.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@old.com' },
]

const newUsers = [
    { id: 101, name: 'John Doe', email: 'john@new.com' },
    { id: 102, name: 'Jane Smith', email: 'jane@new.com' },
]

const handleComplete = (mappings) => {
    console.log('Migration complete:', mappings)
    // Process your mappings here
}
</script>
```

## Verification

### Test in Storybook

```bash
npm run dev:storybook
```

Navigate to: **DataInput → DataMigration**

### Test in Playground

```bash
npm run dev
```

Navigate to: **/components/data-input/data-migration**

### Run Tests

```bash
npm test
```

## What's Included

✅ **Component**: `DataMigration.vue`  
✅ **Store**: `useMigrationStore()`  
✅ **Tests**: 47 test cases  
✅ **Stories**: 11 Storybook stories  
✅ **Documentation**: Complete guides  

## Next Steps

1. Read the full guide: `DATA-MIGRATION-GUIDE.md`
2. Explore examples in Storybook
3. Check the playground demo
4. Review the API reference

## Need Help?

- 📚 **Documentation**: `DATA-MIGRATION-GUIDE.md`
- 🎨 **Examples**: Storybook stories
- 🧪 **Tests**: `test/components/DataMigration.test.ts`
- 🎮 **Demo**: `playground/pages/components/data-input/data-migration.vue`

---

**Ready to migrate your data!** 🎉


# DataMigration Component Guide

## 📋 Overview

The `DataMigration` component provides a comprehensive visual interface for migrating data from an old system to a new system. It features intelligent auto-matching using Fuse.js, manual linking capabilities, visual connection lines, and full state management via Pinia.

## 🎯 Key Features

- **Visual Linking Interface**: Click-to-link interface with SVG connection lines
- **Intelligent Auto-Matching**: Fuzzy matching using Fuse.js with configurable confidence thresholds
- **Real-time Search**: Filter both old and new data sets simultaneously
- **Progress Tracking**: Visual progress bar and statistics
- **Undo/Redo Support**: Full history management via Pinia store
- **Responsive Layouts**: Horizontal and vertical layout options
- **Match Confidence Scores**: Visual indicators of match quality
- **Accessibility**: Full keyboard navigation and ARIA support
- **TypeScript**: Full type safety throughout

## 🚀 Quick Start

### Installation

The component is included in the `@boilerplatepowa/nuxt4-design-system` package. Make sure you have the required dependencies:

```bash
npm install fuse.js pinia
```

### Basic Usage

```vue
<template>
  <DataMigration
    :old-data="oldUsers"
    :new-data="newUsers"
    key-field="id"
    display-field="name"
    @complete="handleMigrationComplete"
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

const handleMigrationComplete = (mappings) => {
  console.log('Migration complete:', mappings)
  // Process the mappings...
}
</script>
```

## 📖 Props

### Data Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `oldData` | `Array<any>` | **Required** | Array of old data items to migrate from |
| `newData` | `Array<any>` | **Required** | Array of new data items to migrate to |
| `keyField` | `string` | `'id'` | Field to use as unique identifier |
| `displayField` | `string` | `'name'` | Field to display in the tables |

### Display Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `'Data Migration'` | Title for the migration interface |
| `description` | `string` | `'Link old data...'` | Description text |
| `layout` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout orientation |
| `showAutoMatch` | `boolean` | `true` | Show auto-match button |
| `showMatchScore` | `boolean` | `true` | Show match confidence scores |
| `showConnectionDots` | `boolean` | `true` | Show connection dots on lines |

### Behavior Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `confidenceThreshold` | `number` | `0.6` | Minimum confidence for auto-matching (0-1) |
| `allowMultipleLinks` | `boolean` | `false` | Allow multiple new items to link to same old item |
| `ariaLabel` | `string` | `'Data migration interface'` | Accessibility label |

## 🎪 Events

### `link-created`

Emitted when a link is created between old and new items.

```typescript
interface LinkedPair {
  oldId: string | number
  newId: string | number
  confidence?: number
}

@link-created="(pair: LinkedPair) => { ... }"
```

### `link-removed`

Emitted when a link is removed.

```typescript
@link-removed="(pair: LinkedPair) => { ... }"
```

### `auto-match-complete`

Emitted when auto-matching completes.

```typescript
@auto-match-complete="(pairs: LinkedPair[]) => { ... }"
```

### `complete`

Emitted when the user clicks "Complete Migration" (all items must be linked).

```typescript
@complete="(mappings: LinkedPair[]) => { ... }"
```

### `export`

Emitted when the user clicks "Export Mappings".

```typescript
@export="(mappings: LinkedPair[]) => { ... }"
```

## 💾 Pinia Store

The component uses a Pinia store (`useMigrationStore`) for state management.

### Store API

```typescript
import { useMigrationStore } from '@boilerplatepowa/nuxt4-design-system'

const migrationStore = useMigrationStore()

// State
migrationStore.linkedPairs // Array of linked pairs
migrationStore.totalLinks // Number of links
migrationStore.averageConfidence // Average confidence score

// Actions
migrationStore.addLink(oldId, newId, confidence)
migrationStore.removeLink(oldId, newId)
migrationStore.clearLinks()
migrationStore.undo()
migrationStore.redo()
migrationStore.exportLinks() // Returns JSON string
migrationStore.importLinks(json) // Import from JSON
```

## 🎨 Styling

The component uses DaisyUI classes and can be styled using Tailwind CSS utilities:

```vue
<DataMigration
  :old-data="data"
  :new-data="data"
  class="shadow-2xl rounded-box"
/>
```

### Custom Themes

The component automatically adapts to your DaisyUI theme:

```css
/* Your theme configuration */
@plugin "daisyui" {
  themes: light, dark, corporate;
}
```

## 🔧 Advanced Usage

### Custom Key and Display Fields

```vue
<DataMigration
  :old-data="products"
  :new-data="products"
  key-field="sku"
  display-field="productName"
/>
```

### Vertical Layout for Mobile

```vue
<DataMigration
  :old-data="data"
  :new-data="data"
  :layout="isMobile ? 'vertical' : 'horizontal'"
/>
```

### High Confidence Matching

```vue
<DataMigration
  :old-data="data"
  :new-data="data"
  :confidence-threshold="0.9"
  title="High Precision Migration"
  description="Only auto-match items with 90%+ confidence"
/>
```

### Many-to-One Linking

```vue
<DataMigration
  :old-data="oldAccounts"
  :new-data="mergedAccounts"
  :allow-multiple-links="true"
  title="Account Consolidation"
  description="Multiple old accounts can link to the same new account"
/>
```

### Programmatic Control

```vue
<script setup lang="ts">
import { useMigrationStore } from '@boilerplatepowa/nuxt4-design-system'

const migrationStore = useMigrationStore()

// Pre-populate links
onMounted(() => {
  migrationStore.addLink(1, 101, 0.95)
  migrationStore.addLink(2, 102, 0.88)
})

// Export mappings
const exportMappings = () => {
  const json = migrationStore.exportLinks()
  downloadFile(json, 'migration-mappings.json')
}

// Import mappings
const importMappings = (json: string) => {
  migrationStore.importLinks(json)
}
</script>
```

## 🎯 Use Cases

### 1. User Account Migration

```vue
<DataMigration
  :old-data="legacyUsers"
  :new-data="modernUsers"
  key-field="userId"
  display-field="username"
  title="User Account Migration"
  description="Link legacy user accounts to new user accounts"
/>
```

### 2. Product Catalog Update

```vue
<DataMigration
  :old-data="oldProducts"
  :new-data="newProducts"
  key-field="sku"
  display-field="productName"
  title="Product Catalog Migration"
  description="Map old product SKUs to new product SKUs"
/>
```

### 3. Database Schema Migration

```vue
<DataMigration
  :old-data="oldRecords"
  :new-data="newRecords"
  key-field="recordId"
  display-field="recordName"
  title="Database Migration"
  description="Migrate records from old schema to new schema"
/>
```

### 4. Contact List Consolidation

```vue
<DataMigration
  :old-data="duplicateContacts"
  :new-data="uniqueContacts"
  :allow-multiple-links="true"
  key-field="contactId"
  display-field="fullName"
  title="Contact Deduplication"
  description="Merge duplicate contacts into unique entries"
/>
```

## 🧪 Testing

### Unit Tests

```typescript
import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import DataMigration from '@boilerplatepowa/nuxt4-design-system'

describe('DataMigration', () => {
  it('creates link when items are clicked', async () => {
    const wrapper = mount(DataMigration, {
      props: {
        oldData: [{ id: 1, name: 'Test' }],
        newData: [{ id: 2, name: 'Test' }],
      },
      global: {
        plugins: [createPinia()],
      },
    })

    // Click old item
    await wrapper.find('[data-old-id="1"]').trigger('click')
    
    // Click new item
    await wrapper.find('[data-new-id="2"]').trigger('click')

    expect(wrapper.emitted('link-created')).toBeTruthy()
  })
})
```

## 🔍 Troubleshooting

### Issue: Auto-match not working

**Solution**: Ensure your data has the correct `displayField` and that Fuse.js is installed:

```bash
npm install fuse.js
```

### Issue: Connection lines not showing

**Solution**: Make sure the component has sufficient height and the tables are visible:

```vue
<DataMigration
  :old-data="data"
  :new-data="data"
  class="min-h-[600px]"
/>
```

### Issue: Store state not persisting

**Solution**: Initialize the store before using the component:

```typescript
import { useMigrationStore } from '@boilerplatepowa/nuxt4-design-system'

const migrationStore = useMigrationStore()
migrationStore.initialize()
```

## 📚 API Reference

### Types

```typescript
interface MigrationItem {
  [key: string]: unknown
}

interface LinkedPair {
  oldId: string | number
  newId: string | number
  confidence?: number
  createdAt?: string
}

interface MigrationProps {
  oldData: MigrationItem[]
  newData: MigrationItem[]
  keyField?: string
  displayField?: string
  title?: string
  description?: string
  showAutoMatch?: boolean
  showMatchScore?: boolean
  showConnectionDots?: boolean
  confidenceThreshold?: number
  layout?: 'horizontal' | 'vertical'
  allowMultipleLinks?: boolean
  ariaLabel?: string
}
```

## 🎓 Best Practices

1. **Use Unique Keys**: Ensure your `keyField` contains unique values
2. **Meaningful Display**: Choose a `displayField` that helps users identify items
3. **Appropriate Thresholds**: Adjust `confidenceThreshold` based on your data quality
4. **Handle Events**: Always handle the `complete` event to process mappings
5. **Provide Feedback**: Use the event log pattern to show users what's happening
6. **Test Thoroughly**: Test with various data sizes and edge cases
7. **Accessibility**: Ensure keyboard navigation works for your use case

## 🤝 Contributing

Found a bug or have a feature request? Please open an issue on our [GitHub repository](https://github.com/BoilerplatePowa/Nuxt4-Design-System).

## 📄 License

MIT License - see LICENSE file for details.


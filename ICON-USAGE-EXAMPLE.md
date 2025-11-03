# Icon Usage Examples

## Quick Start

### Basic Button with Icons

```vue
<script setup lang="ts">
import { Settings, Save, ArrowRight } from 'lucide-vue-next'
</script>

<template>
  <!-- Button with left icon -->
  <Button :icon-left="Settings">
    Settings
  </Button>

  <!-- Button with both icons -->
  <Button :icon-left="Save" :icon-right="ArrowRight">
    Save and Continue
  </Button>

  <!-- Button with custom icon size -->
  <Button :icon-left="Settings" icon-size="lg">
    Large Icon
  </Button>
</template>
```

### Menu with Icons

```vue
<script setup lang="ts">
import { Home, Settings, User, LogOut } from 'lucide-vue-next'

const menuItems = [
  { label: 'Home', icon: Home, href: '/' },
  { label: 'Settings', icon: Settings, href: '/settings' },
  { label: 'Profile', icon: User, href: '/profile' },
  { label: 'Logout', icon: LogOut, href: '/logout' }
]
</script>

<template>
  <Menu :items="menuItems" />
</template>
```

### Steps with Icons

```vue
<script setup lang="ts">
import { User, CreditCard, Check } from 'lucide-vue-next'

const steps = [
  { title: 'Account', icon: User },
  { title: 'Payment', icon: CreditCard },
  { title: 'Confirmation', icon: Check }
]
</script>

<template>
  <Steps :steps="steps" :current-step="1" />
</template>
```

### Dock with Icons

```vue
<script setup lang="ts">
import { Home, Search, Bell, User } from 'lucide-vue-next'

const dockItems = [
  { id: 'home', icon: Home, label: 'Home' },
  { id: 'search', icon: Search, label: 'Search' },
  { id: 'notifications', icon: Bell, label: 'Notifications' },
  { id: 'profile', icon: User, label: 'Profile' }
]
</script>

<template>
  <Dock :items="dockItems" size="lg" />
</template>
```

### Input with Icons

```vue
<script setup lang="ts">
import { Search, X } from 'lucide-vue-next'
</script>

<template>
  <!-- Search input with icons -->
  <Input 
    :left-icon="Search" 
    :right-icon="X"
    placeholder="Search..."
  />

  <!-- Password input with custom icons -->
  <Input type="password">
    <template #password-show-icon>
      <Eye :size="20" />
    </template>
    <template #password-hide-icon>
      <EyeOff :size="20" />
    </template>
  </Input>
</template>
```

### Avatar with Fallback Icon

```vue
<script setup lang="ts">
import { User } from 'lucide-vue-next'
</script>

<template>
  <!-- Avatar with custom fallback icon -->
  <Avatar 
    :fallback-icon="User"
    name="John Doe"
  />

  <!-- Avatar with image (fallback icon used if image fails) -->
  <Avatar 
    src="/avatar.jpg"
    :fallback-icon="User"
    alt="User avatar"
  />
</template>
```

### Modal with Custom Close Icon

```vue
<script setup lang="ts">
import { X } from 'lucide-vue-next'
</script>

<template>
  <Modal>
    <template #close-icon>
      <X :size="20" />
    </template>
    
    <h2>Modal Title</h2>
    <p>Modal content here...</p>
  </Modal>
</template>
```

### FormWizard with Custom Icons

```vue
<script setup lang="ts">
import { ChevronLeft, CheckCircle, Check, Edit } from 'lucide-vue-next'

const steps = [
  { title: 'Personal Info', schema: personalSchema },
  { title: 'Address', schema: addressSchema },
  { title: 'Review', schema: reviewSchema }
]
</script>

<template>
  <FormWizard :steps="steps">
    <!-- Custom previous button icon -->
    <template #previous-icon>
      <ChevronLeft :size="20" />
    </template>
    
    <!-- Custom summary icon -->
    <template #summary-icon>
      <CheckCircle :size="20" />
    </template>
    
    <!-- Custom check icon -->
    <template #check-icon>
      <Check :size="16" />
    </template>
    
    <!-- Custom edit icon -->
    <template #edit-icon>
      <Edit :size="16" />
    </template>
    
    <!-- Step content -->
    <template #step-0>
      <Input name="name" label="Name" />
      <Input name="email" label="Email" />
    </template>
    
    <template #step-1>
      <Input name="address" label="Address" />
      <Input name="city" label="City" />
    </template>
    
    <template #step-2>
      <p>Review your information...</p>
    </template>
  </FormWizard>
</template>
```

## Using Different Icon Libraries

### Heroicons

```vue
<script setup lang="ts">
import { 
  HomeIcon, 
  Cog6ToothIcon,
  UserIcon 
} from '@heroicons/vue/24/outline'

const menuItems = [
  { label: 'Home', icon: HomeIcon },
  { label: 'Settings', icon: Cog6ToothIcon },
  { label: 'Profile', icon: UserIcon }
]
</script>

<template>
  <Menu :items="menuItems" />
</template>
```

### Font Awesome (Vue Component)

```vue
<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHome, faCog, faUser } from '@fortawesome/free-solid-svg-icons'

// Create wrapper components
const HomeIcon = () => h(FontAwesomeIcon, { icon: faHome })
const CogIcon = () => h(FontAwesomeIcon, { icon: faCog })
const UserIcon = () => h(FontAwesomeIcon, { icon: faUser })

const menuItems = [
  { label: 'Home', icon: HomeIcon },
  { label: 'Settings', icon: CogIcon },
  { label: 'Profile', icon: UserIcon }
]
</script>

<template>
  <Menu :items="menuItems" />
</template>
```

### Custom SVG Components

```vue
<script setup lang="ts">
import CustomHomeIcon from './icons/CustomHomeIcon.vue'
import CustomSettingsIcon from './icons/CustomSettingsIcon.vue'

const menuItems = [
  { label: 'Home', icon: CustomHomeIcon },
  { label: 'Settings', icon: CustomSettingsIcon }
]
</script>

<template>
  <Menu :items="menuItems" />
</template>
```

### Inline SVG

```vue
<template>
  <Button>
    <template #icon-left>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 3.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM2 10a8 8 0 1116 0 8 8 0 01-16 0z"/>
      </svg>
    </template>
    Custom Icon
  </Button>
</template>
```

## Advanced Examples

### Dynamic Icons

```vue
<script setup lang="ts">
import { Home, Settings, User } from 'lucide-vue-next'
import type { Component } from 'vue'

const icons: Record<string, Component> = {
  home: Home,
  settings: Settings,
  user: User
}

const currentPage = ref('home')
const currentIcon = computed(() => icons[currentPage.value])
</script>

<template>
  <Button :icon-left="currentIcon">
    {{ currentPage }}
  </Button>
</template>
```

### Icon with Animation

```vue
<script setup lang="ts">
import { RefreshCw } from 'lucide-vue-next'

const isRefreshing = ref(false)

const refresh = () => {
  isRefreshing.value = true
  // Perform refresh...
  setTimeout(() => {
    isRefreshing.value = false
  }, 2000)
}
</script>

<template>
  <Button @click="refresh">
    <template #icon-left>
      <RefreshCw 
        :size="20" 
        :class="{ 'animate-spin': isRefreshing }"
      />
    </template>
    Refresh
  </Button>
</template>
```

### Conditional Icons

```vue
<script setup lang="ts">
import { Check, X } from 'lucide-vue-next'

const isValid = ref(false)
</script>

<template>
  <Button :icon-left="isValid ? Check : X">
    {{ isValid ? 'Valid' : 'Invalid' }}
  </Button>
</template>
```

### Icon with Tooltip

```vue
<script setup lang="ts">
import { Info } from 'lucide-vue-next'
</script>

<template>
  <div class="tooltip" data-tip="More information">
    <Button :icon-left="Info" btn-style="ghost" circle />
  </div>
</template>
```

## Best Practices

### 1. Import Only What You Need
```vue
<!-- ✅ Good: Import specific icons -->
<script setup>
import { Home, Settings } from 'lucide-vue-next'
</script>

<!-- ❌ Bad: Import entire library -->
<script setup>
import * as Icons from 'lucide-vue-next'
</script>
```

### 2. Create Icon Constants for Reusability
```vue
<script setup>
import { Home, Settings, User } from 'lucide-vue-next'

// Define once, use everywhere
const ICONS = {
  HOME: Home,
  SETTINGS: Settings,
  USER: User
}

const menuItems = [
  { label: 'Home', icon: ICONS.HOME },
  { label: 'Settings', icon: ICONS.SETTINGS }
]
</script>
```

### 3. Use Slots for Complex Customization
```vue
<template>
  <Button>
    <template #icon-left>
      <div class="relative">
        <Bell :size="20" />
        <span class="absolute -top-1 -right-1 badge badge-xs badge-error">
          3
        </span>
      </div>
    </template>
    Notifications
  </Button>
</template>
```

### 4. Consistent Icon Sizing
```vue
<script setup>
// Define standard sizes
const ICON_SIZES = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 32,
  xl: 40
}
</script>

<template>
  <Button :icon-left="Settings" :icon-size="ICON_SIZES.md">
    Settings
  </Button>
</template>
```

## Troubleshooting

### Icons Not Rendering?
```vue
<!-- ❌ Wrong: Passing string -->
<Button icon-left="Settings">

<!-- ✅ Correct: Passing component -->
<script setup>
import { Settings } from 'lucide-vue-next'
</script>
<Button :icon-left="Settings">
```

### Icons Too Large/Small?
```vue
<!-- Use icon-size prop -->
<Button :icon-left="Settings" icon-size="lg">

<!-- Or use icon's size prop in slot -->
<Button>
  <template #icon-left>
    <Settings :size="32" />
  </template>
</Button>
```

### TypeScript Errors?
```typescript
import type { Component } from 'vue'
import { Settings } from 'lucide-vue-next'

// Explicitly type if needed
const iconComponent: Component = Settings
```

---

**Last Updated**: October 30, 2025


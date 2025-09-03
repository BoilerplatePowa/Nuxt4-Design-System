<template>
  <div :class="controllerClasses">
    <!-- Button variant -->
    <button
      v-if="variant === 'button'"
      :class="buttonClasses"
      @click="toggleTheme"
      :aria-label="ariaLabel"
    >
      <slot name="icon">
        <!-- Default theme toggle icon -->
        <svg v-if="!isDark" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            d="M10 2L13.09 8.26L20 9L14 14.74L15.18 21.02L10 17.77L4.82 21.02L6 14.74L0 9L6.91 8.26L10 2Z"
          />
        </svg>
        <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z"
            clip-rule="evenodd"
          />
        </svg>
      </slot>
      <span v-if="showLabel" class="ml-2">{{ currentTheme }}</span>
    </button>

    <!-- Toggle variant -->
    <input
      v-else-if="variant === 'toggle'"
      type="checkbox"
      :class="toggleClasses"
      :checked="isDark"
      @change="toggleTheme"
      :aria-label="ariaLabel"
    />

    <!-- Switch variant -->
    <input
      v-else-if="variant === 'switch'"
      type="checkbox"
      :class="switchClasses"
      :checked="isDark"
      @change="toggleTheme"
      :aria-label="ariaLabel"
    />

    <!-- Dropdown variant -->
    <select
      v-else-if="variant === 'dropdown'"
      :class="selectClasses"
      :value="currentTheme"
      @change="handleThemeChange"
      :aria-label="ariaLabel"
    >
      <option v-for="theme in availableThemes" :key="theme.value" :value="theme.value">
        {{ theme.label }}
      </option>
    </select>

    <!-- Radio variant -->
    <div v-else-if="variant === 'radio'" class="space-y-2">
      <label
        v-for="theme in availableThemes"
        :key="theme.value"
        class="flex items-center space-x-2 cursor-pointer"
      >
        <input
          type="radio"
          :class="radioClasses"
          :value="theme.value"
          :checked="currentTheme === theme.value"
          @change="handleThemeChange"
          :name="radioName"
        />
        <span>{{ theme.label }}</span>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, watch } from 'vue';

interface ThemeOption {
  value: string;
  label: string;
}

interface Props {
  variant?: 'button' | 'toggle' | 'switch' | 'dropdown' | 'radio';
  themes?: ThemeOption[];
  defaultTheme?: string;
  darkTheme?: string;
  lightTheme?: string;
  showLabel?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  radioName?: string;
  ariaLabel?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'button',
  themes: () => [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
  ],
  defaultTheme: 'light',
  darkTheme: 'dark',
  lightTheme: 'light',
  showLabel: false,
  size: 'md',
  radioName: 'theme',
  ariaLabel: 'Toggle theme',
});

const currentTheme = ref(props.defaultTheme);

const availableThemes = computed(() => props.themes);

const isDark = computed(() => currentTheme.value === props.darkTheme);

const controllerClasses = computed(() => {
  const baseClasses = ['theme-controller'];
  return baseClasses.join(' ');
});

const buttonClasses = computed(() => {
  const baseClasses = ['btn'];

  // Size classes
  if (props.size === 'xs') {
    baseClasses.push('btn-xs');
  } else if (props.size === 'sm') {
    baseClasses.push('btn-sm');
  } else if (props.size === 'lg') {
    baseClasses.push('btn-lg');
  }

  return baseClasses.join(' ');
});

const toggleClasses = computed(() => {
  const baseClasses = ['toggle'];

  // Size classes
  if (props.size === 'xs') {
    baseClasses.push('toggle-xs');
  } else if (props.size === 'sm') {
    baseClasses.push('toggle-sm');
  } else if (props.size === 'lg') {
    baseClasses.push('toggle-lg');
  }

  return baseClasses.join(' ');
});

const switchClasses = computed(() => {
  const baseClasses = ['toggle', 'toggle-primary'];

  // Size classes
  if (props.size === 'xs') {
    baseClasses.push('toggle-xs');
  } else if (props.size === 'sm') {
    baseClasses.push('toggle-sm');
  } else if (props.size === 'lg') {
    baseClasses.push('toggle-lg');
  }

  return baseClasses.join(' ');
});

const selectClasses = computed(() => {
  const baseClasses = ['select', 'select-bordered'];

  // Size classes
  if (props.size === 'xs') {
    baseClasses.push('select-xs');
  } else if (props.size === 'sm') {
    baseClasses.push('select-sm');
  } else if (props.size === 'lg') {
    baseClasses.push('select-lg');
  }

  return baseClasses.join(' ');
});

const radioClasses = computed(() => {
  const baseClasses = ['radio'];

  // Size classes
  if (props.size === 'xs') {
    baseClasses.push('radio-xs');
  } else if (props.size === 'sm') {
    baseClasses.push('radio-sm');
  } else if (props.size === 'lg') {
    baseClasses.push('radio-lg');
  }

  return baseClasses.join(' ');
});

const emit = defineEmits<{
  themeChange: [theme: string];
}>();

const toggleTheme = () => {
  if (props.variant === 'toggle' || props.variant === 'switch' || props.variant === 'button') {
    const newTheme = isDark.value ? props.lightTheme : props.darkTheme;
    currentTheme.value = newTheme;
    emit('themeChange', newTheme);
  }
};

const handleThemeChange = (event: Event) => {
  const target = event.target as HTMLSelectElement | HTMLInputElement;
  currentTheme.value = target.value;
  emit('themeChange', target.value);
};

// Apply theme to document
const applyTheme = (theme: string) => {
  if (typeof document !== 'undefined') {
    // Apply to html element for DaisyUI themes
    document.documentElement.setAttribute('data-theme', theme);

    // Also apply to body for compatibility
    document.body.setAttribute('data-theme', theme);

    // Update CSS custom properties for theme colors
    const root = document.documentElement;
    root.style.setProperty('--theme', theme);
  }
};

// Watch for theme changes
watch(currentTheme, newTheme => {
  applyTheme(newTheme);
});

// Initialize theme on mount
onMounted(() => {
  // Try to get theme from localStorage or system preference
  if (typeof window !== 'undefined') {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && props.themes.some(t => t.value === savedTheme)) {
      currentTheme.value = savedTheme;
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      currentTheme.value = props.darkTheme;
    }

    // Save theme changes to localStorage
    watch(currentTheme, newTheme => {
      localStorage.setItem('theme', newTheme);
    });
  }

  applyTheme(currentTheme.value);
});
</script>

<style scoped lang="postcss">
/* Theme controller specific styles */
.theme-controller {
  @apply inline-flex items-center;
}
</style>

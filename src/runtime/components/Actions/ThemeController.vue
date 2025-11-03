<template>
    <div :class="controllerClasses">
        <!-- Button variant -->
        <button
            v-if="variant === 'button'"
            :class="buttonClasses"
            :aria-label="ariaLabel"
            @click="toggleTheme"
        >
            <slot name="icon">
                <!-- Default theme toggle icon -->
                <Sun v-if="!isDark" class="w-6 h-6" />
                <Moon v-else class="w-5 h-5" />
            </slot>
            <span v-if="showLabel" class="ml-2">{{ currentTheme }}</span>
        </button>

        <!-- Toggle variant -->
        <input
            v-else-if="variant === 'toggle'"
            type="checkbox"
            :class="toggleClasses"
            :checked="isDark"
            :aria-label="ariaLabel"
            @change="toggleTheme"
        />

        <!-- Switch variant -->
        <input
            v-else-if="variant === 'switch'"
            type="checkbox"
            :class="switchClasses"
            :checked="isDark"
            :aria-label="ariaLabel"
            @change="toggleTheme"
        />

        <!-- Dropdown variant -->
        <select
            v-else-if="variant === 'dropdown'"
            :class="selectClasses"
            :value="currentTheme"
            :aria-label="ariaLabel"
            @change="handleThemeChange"
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
                    :name="radioName"
                    @change="handleThemeChange"
                />
                <span>{{ theme.label }}</span>
            </label>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, watch } from 'vue'
import { Sun, Moon } from 'lucide-vue-next'

interface ThemeOption {
    value: string
    label: string
}

interface Props {
    variant?: 'button' | 'toggle' | 'switch' | 'dropdown' | 'radio'
    themes?: ThemeOption[]
    defaultTheme?: string
    darkTheme?: string
    lightTheme?: string
    showLabel?: boolean
    size?: 'xs' | 'sm' | 'md' | 'lg'
    radioName?: string
    ariaLabel?: string
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
})

const currentTheme = ref(props.defaultTheme)

const availableThemes = computed(() => props.themes)

const isDark = computed(() => currentTheme.value === props.darkTheme)

const controllerClasses = computed(() => {
    const baseClasses = ['theme-controller']
    return baseClasses.join(' ')
})

const buttonClasses = computed(() => {
    const baseClasses = ['btn', 'btn-ghost', 'btn-square']

    // Size classes
    if (props.size === 'xs') {
        baseClasses.push('btn-xs')
    } else if (props.size === 'sm') {
        baseClasses.push('btn-sm')
    } else if (props.size === 'lg') {
        baseClasses.push('btn-lg')
    }

    return baseClasses.join(' ')
})

const toggleClasses = computed(() => {
    const baseClasses = ['toggle']

    // Size classes
    if (props.size === 'xs') {
        baseClasses.push('toggle-xs')
    } else if (props.size === 'sm') {
        baseClasses.push('toggle-sm')
    } else if (props.size === 'lg') {
        baseClasses.push('toggle-lg')
    }

    return baseClasses.join(' ')
})

const switchClasses = computed(() => {
    const baseClasses = ['toggle', 'toggle-primary']

    // Size classes
    if (props.size === 'xs') {
        baseClasses.push('toggle-xs')
    } else if (props.size === 'sm') {
        baseClasses.push('toggle-sm')
    } else if (props.size === 'lg') {
        baseClasses.push('toggle-lg')
    }

    return baseClasses.join(' ')
})

const selectClasses = computed(() => {
    const baseClasses = ['select', 'select-bordered']

    // Size classes
    if (props.size === 'xs') {
        baseClasses.push('select-xs')
    } else if (props.size === 'sm') {
        baseClasses.push('select-sm')
    } else if (props.size === 'lg') {
        baseClasses.push('select-lg')
    }

    return baseClasses.join(' ')
})

const radioClasses = computed(() => {
    const baseClasses = ['radio']

    // Size classes
    if (props.size === 'xs') {
        baseClasses.push('radio-xs')
    } else if (props.size === 'sm') {
        baseClasses.push('radio-sm')
    } else if (props.size === 'lg') {
        baseClasses.push('radio-lg')
    }

    return baseClasses.join(' ')
})

const emit = defineEmits<{
    themeChange: [theme: string]
}>()

const toggleTheme = () => {
    if (props.variant === 'toggle' || props.variant === 'switch' || props.variant === 'button') {
        const newTheme = isDark.value ? props.lightTheme : props.darkTheme
        currentTheme.value = newTheme
        emit('themeChange', newTheme)
    }
}

const handleThemeChange = (event: Event) => {
    const target = event.target as HTMLSelectElement | HTMLInputElement
    currentTheme.value = target.value
    emit('themeChange', target.value)
}

// Apply theme to document
const applyTheme = (theme: string) => {
    if (typeof document !== 'undefined') {
        // Apply to html element for DaisyUI themes
        document.documentElement.setAttribute('data-theme', theme)

        // Also apply to body for compatibility
        document.body.setAttribute('data-theme', theme)

        // Update CSS custom properties for theme colors
        const root = document.documentElement
        root.style.setProperty('--theme', theme)
    }
}

// Watch for theme changes
watch(currentTheme, (newTheme) => {
    applyTheme(newTheme)
})

// Initialize theme on mount
onMounted(() => {
    // Try to get theme from localStorage or system preference
    if (typeof window !== 'undefined') {
        const savedTheme = localStorage.getItem('theme')
        if (savedTheme && props.themes.some((t) => t.value === savedTheme)) {
            currentTheme.value = savedTheme
        } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            currentTheme.value = props.darkTheme
        }

        // Save theme changes to localStorage
        watch(currentTheme, (newTheme) => {
            localStorage.setItem('theme', newTheme)
        })
    }

    applyTheme(currentTheme.value)
})
</script>

<style scoped lang="postcss">
/* Theme controller specific styles */
.theme-controller {
    @apply inline-flex items-center;
}
</style>

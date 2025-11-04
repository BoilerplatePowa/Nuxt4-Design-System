<template> since css is not manager dynamically, see to update it to be more static, with less customization needed
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
import { computed, watch } from 'vue'
import { Sun, Moon } from 'lucide-vue-next'
import { useTheme } from '../../composables/useTheme'

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

// Use the theme composable
const { currentTheme, setTheme } = useTheme()

const availableThemes = computed(() => props.themes)

const isDark = computed(() => currentTheme.value === props.darkTheme)

const controllerClasses = computed(() => {
    const baseClasses = ['theme-controller']
    return baseClasses.join(' ')
})

const buttonClasses = computed(() => {
    const baseClasses = ['btn', 'btn-ghost', 'btn-square', '!border-0', '!shadow-none', '!p-0']

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
        setTheme(newTheme)
        emit('themeChange', newTheme)
    }
}

const handleThemeChange = (event: Event) => {
    const target = event.target as HTMLSelectElement | HTMLInputElement
    setTheme(target.value)
    emit('themeChange', target.value)
}

// Watch for theme changes to emit events
watch(currentTheme, (newTheme) => {
    emit('themeChange', newTheme)
})
</script>

<style scoped lang="postcss">
/* Theme controller specific styles */
.theme-controller {
    @apply inline-flex items-center;
}
</style>

import { useNuxtApp } from 'nuxt/app'
import type { Ref } from 'vue'

/**
 * Composable for managing theme state
 *
 * @example
 * ```vue
 * <script setup>
 * const { currentTheme, setTheme, toggleTheme, isDark } = useTheme()
 * </script>
 * ```
 */
export function useTheme() {
    const { $theme, $setTheme, $toggleTheme } = useNuxtApp()

    const currentTheme = $theme as Ref<string>
    const setTheme = $setTheme as (theme: string) => void
    const toggleTheme = $toggleTheme as (lightTheme?: string, darkTheme?: string) => void

    const isDark = computed(() => {
        const darkThemes = [
            'dark',
            'synthwave',
            'halloween',
            'forest',
            'black',
            'luxury',
            'dracula',
            'night',
            'coffee',
        ]
        return darkThemes.includes(currentTheme.value)
    })

    return {
        currentTheme: readonly(currentTheme),
        setTheme,
        toggleTheme,
        isDark: readonly(isDark),
    }
}

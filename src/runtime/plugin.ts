import { defineNuxtPlugin } from 'nuxt/app'
import { ref } from 'vue'

export default defineNuxtPlugin(() => {
    // Initialize theme before app mounts to prevent flash
    const currentTheme = ref<string>('light')

    // This runs on both client and server
    if (import.meta.client) {
        // Get theme from localStorage or system preference
        const savedTheme = localStorage.getItem('theme')
        const prefersDark =
            window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches

        // Determine initial theme
        const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light')
        currentTheme.value = initialTheme

        // Apply theme immediately to prevent flash
        document.documentElement.setAttribute('data-theme', initialTheme)
        document.body.setAttribute('data-theme', initialTheme)
    }

    // Provide theme management functions
    const setTheme = (theme: string) => {
        currentTheme.value = theme

        if (import.meta.client) {
            // Apply theme to DOM
            document.documentElement.setAttribute('data-theme', theme)
            document.body.setAttribute('data-theme', theme)

            // Save to localStorage
            localStorage.setItem('theme', theme)
        }
    }

    const toggleTheme = (lightTheme = 'light', darkTheme = 'dark') => {
        const isDark = currentTheme.value === darkTheme
        const newTheme = isDark ? lightTheme : darkTheme
        setTheme(newTheme)
    }

    // Provide to the app
    return {
        provide: {
            theme: currentTheme,
            setTheme,
            toggleTheme,
        },
    }
})

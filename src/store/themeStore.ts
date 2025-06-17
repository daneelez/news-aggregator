import {create} from 'zustand'
import {persist} from 'zustand/middleware'

interface ThemeState {
    theme: 'light' | 'dark'
    setTheme: (theme: 'light' | 'dark') => void
    toggleTheme: () => void
}

export const useThemeStore = create<ThemeState>()(
    persist(
        (set, get) => ({
            theme: 'dark',
            setTheme: (theme) => {
                set({theme})
                document.documentElement.classList.toggle('dark', theme === 'dark')
            },
            toggleTheme: () => {
                const newTheme = get().theme === 'dark' ? 'light' : 'dark'
                set({theme: newTheme})
                document.documentElement.classList.toggle('dark', newTheme === 'dark')
            },
        }),
        {
            name: 'theme-store',
            onRehydrateStorage: () => (state) => {
                if (state) {
                    document.documentElement.classList.toggle('dark', state.theme === 'dark')
                }
            },
        }
    )
)

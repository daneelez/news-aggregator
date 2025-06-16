import {create} from 'zustand'
import {persist} from "zustand/middleware";

interface UserPreferencesState {
    tickers: string[]
    updateTickers: (tickers: string[]) => void
}

export const useUserPreferencesStore = create<UserPreferencesState>()(
    persist(
        (set) => ({
            tickers: ['SBER', 'GAZP'],
            updateTickers: (tickers) => set({tickers}),
        }),
        {
            name: 'preferences-store',
        }
    )
);
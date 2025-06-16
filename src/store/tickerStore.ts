import {create} from 'zustand'
import {persist} from 'zustand/middleware'

interface TickerState {
    selectedTicker: string | null
    setTicker: (ticker: string) => void
}

export const useTickerStore = create<TickerState>()(
    persist(
        (set) => ({
            selectedTicker: null,
            setTicker: (ticker) => set({selectedTicker: ticker}),
        }),
        {
            name: 'selected-ticker-storage',
        }
    )
)

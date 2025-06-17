import {create} from 'zustand'
import {persist} from 'zustand/middleware'
import type {ITicker} from "../constants/interfaces.ts";
import tickers from './res/tickers.json'

interface TickerState {
    tickers: ITicker[]
    selectedTicker: string | null
    setTicker: (ticker: string) => void
}

export const useTickerStore = create<TickerState>()(
    persist(
        (set) => ({
            tickers: tickers,
            selectedTicker: null,
            setTicker: (ticker) => set({selectedTicker: ticker}),
        }),
        {
            name: 'selected-ticker-storage',
        }
    )
)

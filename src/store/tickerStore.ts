import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import type {ITicker} from '../constants/interfaces.ts';
import tickers from './res/tickers.json'

interface TickerState {
    tickers: ITicker[];
    selectedTicker: string | null;
    setTicker: (ticker: string) => void;
    addTicker: (newTicker: ITicker) => void;
}

export const useTickerStore = create<TickerState>()(
    persist(
        (set, get) => ({
            tickers: tickers,
            selectedTicker: null,

            setTicker: (ticker) => {
                if (get().selectedTicker === ticker) {
                    set({selectedTicker: null});
                } else {
                    set({selectedTicker: ticker});
                }
            },

            addTicker: (newTicker) => {
                const {tickers} = get();

                const exists = tickers.some(
                    (ticker) => ticker.name.toLowerCase() === newTicker.name.toLowerCase()
                );

                if (!exists) {
                    set({
                        tickers: [...tickers, newTicker],
                    });
                }
            },
        }),
        {
            name: 'tickers-store',
        }
    )
);
import {create} from 'zustand';
import type {PredictFilter} from "../constants/types.ts";

interface FilterState {
    sources: string[];
    predict: PredictFilter;
    toggleSource: (source: string) => void;
    setPredict: (predict: PredictFilter) => void;
    resetFilters: () => void;
}

export const useFilterStore = create<FilterState>((set, get) => ({
    sources: [],
    predict: 'all',
    toggleSource: (source) =>
        set((state) => ({
            sources: state.sources.includes(source)
                ? state.sources.filter((s) => s !== source)
                : [...state.sources, source],
        })),
    setPredict: (newPredict) => {
        const current = get().predict;
        if (current === newPredict) {
            set({predict: 'all'});
        } else set({predict: newPredict});
    },
    resetFilters: () => set({sources: [], predict: 'all'}),
}));

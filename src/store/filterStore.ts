import {create} from 'zustand';
import type {PredictFilter, TimeRange} from "../constants/types.ts";

interface FilterState {
    sources: string[];
    predict: PredictFilter;
    timeRange: TimeRange;

    toggleSource: (source: string) => void;
    setPredict: (predict: PredictFilter) => void;
    setTimeRange: (range: TimeRange) => void;
    resetFilters: () => void;
}

export const useFilterStore = create<FilterState>((set, get) => ({
    sources: [],
    predict: 'all',
    timeRange: '1m',
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
    setTimeRange: (range) => set({timeRange: range}),
    resetFilters: () => set({sources: [], predict: 'all'}),
}));

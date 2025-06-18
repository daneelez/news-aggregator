import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import type {INews} from '../constants/interfaces.ts';
import {CHUNK_SIZE} from "../constants/values.ts";

interface NewsState {
    news: INews[];
    visibleCount: number;
    error: string | null;
    loading: boolean;

    setNews: (news: INews[]) => void;
    loadMore: () => void;
    resetVisibleCount: () => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
}

export const useNewsStore = create<NewsState>()(
    persist(
        (set, get) => ({
            news: [],
            visibleCount: CHUNK_SIZE,
            error: null,
            loading: false,

            setNews: (news) => {
                set({news, visibleCount: CHUNK_SIZE});
            },

            loadMore: () => {
                const {visibleCount, news} = get();
                const newCount = Math.min(visibleCount + CHUNK_SIZE, news.length);
                set({visibleCount: newCount});
            },

            resetVisibleCount: () => set({visibleCount: CHUNK_SIZE}),

            setLoading: (loading) => set({loading}),

            setError: (error) => {
                set({error})
            },
        }),
        {
            name: 'news-store',
        }
    )
);
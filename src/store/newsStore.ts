import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { INews } from '../constants/interfaces.ts';
import { CHUNK_SIZE } from "../constants/values.ts";
import axios from "axios";

interface NewsState {
    news: INews[];
    visibleCount: number;
    error: string | null;
    loading: boolean;

    fetchNews: () => Promise<void>;
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

            fetchNews: async () => {
                try {
                    set({ loading: true, error: null });
                    
                    const response = await axios.get(`http://localhost:8000/get_all_news/`);

                    const newsData: INews[] = await response.data;
                    set({ news: newsData, visibleCount: CHUNK_SIZE });
                } catch (error) {
                    set({ error: error instanceof Error ? error.message : 'Неизвестная ошибка' });
                } finally {
                    set({ loading: false });
                }
            },

            loadMore: () => {
                const { visibleCount, news } = get();
                const newCount = Math.min(visibleCount + CHUNK_SIZE, news.length);
                set({ visibleCount: newCount });
            },

            resetVisibleCount: () => set({ visibleCount: CHUNK_SIZE }),

            setLoading: (loading) => set({ loading }),

            setError: (error) => set({ error }),
        }),
        {
            name: 'news-store',
        }
    )
);
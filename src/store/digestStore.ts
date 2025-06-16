import {create} from 'zustand'
import {persist} from 'zustand/middleware'
import type {IArticle} from "../constants/interfaces.ts";

interface DigestState {
    content: IArticle[]
    updatedAt: string | null
    setDigest: (content: IArticle[]) => void
    clearDigest: () => void
}

export const useDigestStore = create<DigestState>()(
    persist(
        (set) => ({
            content: [],
            updatedAt: null,
            setDigest: (content) =>
                set({content, updatedAt: new Date().toISOString()}),
            clearDigest: () => set({content: [], updatedAt: null}),
        }),
        {
            name: 'daily-digest-store',
        },
    )
)

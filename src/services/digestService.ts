import axios from 'axios'
import {useDigestStore} from '../store/digestStore'
import type {IArticle} from "../constants/interfaces.ts";

const API_KEY = '711aa176be0081fdea8b68ad5b4edfb3'

export const fetchDigestFromTestAPI = async (): Promise<IArticle[]> => {
    try {
        const response = await axios.get('https://gnews.io/api/v4/top-headlines', {
            params: {
                token: API_KEY,
                lang: 'ru',
                max: 5,
            },
        })

        const articles: IArticle[] = response.data?.articles
        if (!articles || articles.length === 0) {
            throw new Error('Пустой список статей')
        }

        return articles

    } catch (err) {
        console.error('Ошибка при получении тестового дайджеста:', err)
        throw err
    }
}

export async function fetchAndCacheTestDigest() {
    const content = await fetchDigestFromTestAPI()
    useDigestStore.getState().setDigest(content)
}

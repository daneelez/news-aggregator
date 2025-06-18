import type {INews} from '../constants/interfaces.ts';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export async function fetchNews(ticker?: string, skip = 0, limit = 100): Promise<INews[]> {
    if (ticker) {
        const res = await axios.get(`${API_URL}/get_all_news/${ticker}`, {
            params: {skip, limit}
        });
        return res.data as INews[];
    } else {
        const res = await axios.get(`${API_URL}/get_all_news`);
        return res.data as INews[];
    }
}

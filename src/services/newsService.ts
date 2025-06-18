import type {INews} from '../constants/interfaces.ts';
import axios from "axios";

export async function fetchAllNews(
    selectedTicker: string | null,
): Promise<INews[]> {
    const res = await axios.get('http://localhost:8000/get_all_news', { 'ticker': selectedTicker });
    return res.data as INews[];
}

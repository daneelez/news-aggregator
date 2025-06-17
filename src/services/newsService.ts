import api from './axios.ts';
import type {INews} from '../constants/interfaces.ts';

export async function fetchAllNews(): Promise<INews[]> {
    const res = await api.get('/news');
    return res.data as INews[];
}

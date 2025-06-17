import api from "./axios.ts";

export async function fetchNewsByTicker(ticker: string, page: number) {
    try {
        const res = await api.get("https://gnews.io/api/v4/search", {
            params: {
                q: ticker,
                lang: "ru",
                max: 5,
                page,
            },
        })

        return res.data.articles || []
    } catch {
        return []
    }
}

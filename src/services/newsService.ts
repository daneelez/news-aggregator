import axios from "axios"

export async function fetchNewsByTicker(ticker: string, page: number) {
    const res = await axios.get("https://gnews.io/api/v4/search", {
        params: {
            q: ticker,
            token: "711aa176be0081fdea8b68ad5b4edfb3",
            lang: "ru",
            max: 5,
            page,
        },
    })
    return res.data.articles || []
}

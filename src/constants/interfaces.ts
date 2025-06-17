export interface INews {
    ticker: string
    source: string
    summary_text: string
    price_difference: string
    is_green: boolean
    description: string
    timestamp: string
}

export interface IIcon {
    className?: string
}

export interface IUser {
    login: string
    email: string
    tickers: ITicker[]
}

export interface ITicker {
    name: string
    description: string
    icon_url: string | null
}
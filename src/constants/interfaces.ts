export interface IArticle {
    title: string
    description: string
    url: string
}

export interface IIcon {
    className?: string
}

export interface IUser {
    login: string
    email: string
    tickers: string[]
}

export interface ITicker {
    name: string
    description: string
    icon_url: string | null
}
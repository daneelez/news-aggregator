import {useTickerStore} from "../../store/tickerStore"
import {useEffect, useRef, useState} from "react"
import {fetchNewsByTicker} from "../../services/newsService"
import type {IArticle} from "../../constants/interfaces.ts";
import {useTranslation} from "react-i18next";
import FilterSection from './FilterSection.tsx'

const NewsSection = () => {
    const {selectedTicker} = useTickerStore()
    const [news, setNews] = useState<IArticle[]>([])
    const [page, setPage] = useState(1)
    const loader = useRef(null)

    const {t} = useTranslation('translations')

    useEffect(() => {
        if (!selectedTicker) return;

        fetchNewsByTicker(selectedTicker, page).then(newArticles => {
            if (page === 1) {
                setNews(newArticles)
            } else {
                setNews(prev => [...prev, ...newArticles])
            }
        })
    }, [selectedTicker, page])

    useEffect(() => {
        setPage(1)
    }, [selectedTicker])

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting) setPage(p => p + 1)
            },
            {threshold: 1}
        )

        if (loader.current) observer.observe(loader.current)
        return () => observer.disconnect()
    }, [])

    return (
        <div className="w-1/2 p-4 overflow-y-auto bg-neutral-800 rounded-tl-xl">
            <div className="flex justify-between items-center mb-4 p-8">
                <h2 className="text-4xl font-bold text-white">{t('news')}</h2>
                <div className="cursor-pointer text-white"></div>
            </div>
            <FilterSection/>

            {news.map((n, i) => (
                <div key={i} className="bg-black/40 p-3 mb-2 rounded-md text-white">
                    <h3 className="font-bold">{n.title}</h3>
                    <p>{n.description}</p>
                    <a className="text-green-400" href={n.url} target="_blank">{t("read")} →</a>
                </div>
            ))}
            <div ref={loader} className="h-10"/>
        </div>
    )
}

export default NewsSection

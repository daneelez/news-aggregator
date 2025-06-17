import {useTranslation} from "react-i18next";
import TickerNews from "../ui/NewsItem.tsx";
import FilterSection from "./FilterSection.tsx";
import {useFilterStore} from "../../store/filterStore.ts";
import {parseDomain} from "../../utils/parseDomain.ts";
import {useTickerStore} from "../../store/tickerStore.ts";
import {useCallback, useEffect, useRef} from "react";
import {fetchAllNews} from "../../services/newsService.ts";
import {useNewsStore} from "../../store/newsStore.ts";

const NewsSection = () => {
    const {
        news,
        visibleCount,
        loading,
        error,
        setNews,
        loadMore,
        setLoading,
        setError,
        resetVisibleCount,
    } = useNewsStore();

    const {t} = useTranslation('translations');

    const {selectedTicker} = useTickerStore();
    const {sources, predict} = useFilterStore();

    useEffect(() => {
        async function load() {
            try {
                setLoading(true);
                const allNews = await fetchAllNews();
                setNews(allNews);
                setError(null);
            } catch (e) {
                if (e instanceof Error) {
                    setError(e.message);
                } else {
                    setError('Failed to fetch all news');
                }
            } finally {
                setLoading(false);
            }
        }

        load();
    }, [setLoading, setNews, setError]);

    useEffect(() => {
        resetVisibleCount();
    }, [selectedTicker, sources, predict, resetVisibleCount]);

    const filteredNews = news.filter((n) => {
        if (selectedTicker && selectedTicker !== n.ticker) return false;
        const domain = parseDomain(n.source);
        if (sources.length > 0 && !sources.includes(domain)) return false;
        if (predict === 'positive' && !n.is_green) return false;
        return !(predict === 'negative' && n.is_green);

    });

    const visibleNews = filteredNews.slice(0, visibleCount);

    const loaderRef = useRef<HTMLDivElement | null>(null);

    const handleObserver = useCallback(
        (entries: IntersectionObserverEntry[]) => {
            const target = entries[0];
            if (target.isIntersecting) {
                loadMore();
            }
        },
        [loadMore]
    );

    useEffect(() => {
        const currentLoader = loaderRef.current;

        const option = {
            root: null,
            rootMargin: '20px',
            threshold: 1.0,
        };

        const observer = new IntersectionObserver(handleObserver, option);

        if (currentLoader) {
            observer.observe(currentLoader);
        }

        return () => {
            if (currentLoader) {
                observer.unobserve(currentLoader);
            }
        };
    }, [handleObserver]);

    return (
        <div
            className="w-1/2 w-md:w-full min-h-full w-md:min-h-[30%] text-text p-4 ml-2 w-md:ml-0 w-md:mb-5 overflow-y-auto bg-bg-nd-light dark:bg-bg-nd-dark rounded-tl-xl w-md:rounded-none">
            <div className="flex mb-4 py-8">
                <h2 className="text-4xl font-bold">{t("news")}</h2>
            </div>
            <div className="flex items-center justify-between gap-2">
                <FilterSection/>
                {error && <p className="text-red-500 flex-center border p-2 rounded-lg mb-4 font-bold">{error}</p>}
            </div>


            <div className="flex flex-col  overflow-y-auto py-4">
                {visibleNews.map((newsItem, idx) => (
                    <TickerNews key={idx} {...newsItem} />
                ))}

                {loading && <p>Loading...</p>}

                <div ref={loaderRef}/>

                {!loading && visibleCount >= filteredNews.length && (
                    <p className="opacity-50 text-center mt-4">{t('noMoreNews')}</p>
                )}
            </div>
        </div>
    );
};

export default NewsSection

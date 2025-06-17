import {useTranslation} from "react-i18next";
import TickerNews from "../ui/NewsItem.tsx";
import type {INews} from "../../constants/interfaces.ts";
import FilterSection from "./FilterSection.tsx";
import {useFilterStore} from "../../store/filterStore.ts";
import {parseDomain} from "../../utils/parseDomain.ts";
import {useTickerStore} from "../../store/tickerStore.ts";

const NewsSection = () => {
    const {t} = useTranslation('translations')
    const {sources, predict} = useFilterStore();

    const {selectedTicker} = useTickerStore();

    const mockNews: INews[] = [
        {
            ticker: "SBER",
            source: "https://example.com/news/sber",
            summary_text:
                "Сильнее всего за неделю ставки по рыночной ипотеке снизились на строительство дома — на 2,2 п.п.",
            price_difference: "+4%",
            is_green: true,
            description:
                "Полное описание прогноза нейросети по рынку ипотеки и строительству домов...",
            timestamp: "2025-06-17T09:45:00Z",
        },
        {
            ticker: "GAZP",
            source: "https://example.com/news/gazp",
            summary_text: "Газпром сообщил об увеличении экспорта на 5% за первый квартал.",
            price_difference: "-2.5%",
            is_green: false,
            description: "Подробности по увеличению экспорта и рыночной реакции на событие...",
            timestamp: "2025-06-16T14:20:00Z",
        },
    ];

    const filteredNews = mockNews.filter((n) => {
        if (selectedTicker && selectedTicker !== n.ticker) return false;
        const domain = parseDomain(n.source);
        if (sources.length > 0 && !sources.includes(domain)) return false;
        if (predict === 'positive' && !n.is_green) return false;
        return !(predict === 'negative' && n.is_green);

    });

    return (
        <div
            className="w-1/2 w-md:w-full min-h-full w-md:min-h-[30%] text-text p-4 ml-2 w-md:ml-0 w-md:mb-5 overflow-y-auto bg-bg-nd-light dark:bg-bg-nd-dark rounded-tl-xl w-md:rounded-none">
            <div className="flex mb-4 py-8">
                <h2 className="text-4xl font-bold">{t("news")}</h2>
            </div>
            <FilterSection/>

            {filteredNews.map((news, idx) => (
                <TickerNews key={idx} {...news} />
            ))}
            {filteredNews.length === 0 && <p className="text-text opacity-30">{t('noMatchingNews')}</p>}
        </div>
    );
};

export default NewsSection

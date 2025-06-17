import {useAuthStore} from "../../store/authStore.ts";
import {useTickerStore} from "../../store/tickerStore.ts";
import TickerItem from "../ui/TickerItem.tsx";
import {useTranslation} from "react-i18next";

const TickerSection = () => {
    const {user} = useAuthStore();
    const {tickers, setTicker, selectedTicker} = useTickerStore();

    const {t} = useTranslation('translations');

    return (
        <div className="min-h-full text-text">
            <div className="mb-10">
                <h2 className="text-3xl font-bold mb-4">{t('favoriteTickers')}</h2>
                <div className="flex flex-wrap gap-3">
                    {user && user.tickers.length > 0 ? (
                        user.tickers.map((ticker) => (
                            <TickerItem
                                key={ticker.name}
                                ticker={ticker}
                                isSelected={selectedTicker === ticker.name}
                                isFavorite={true}
                                onClick={() => {
                                    setTicker(ticker.name)
                                }}
                            />
                        ))
                    ) : (
                        <p className="text-gray-400 text-l">{t('noFavorite')}</p>
                    )}
                </div>
            </div>

            <div>
                <h2 className="text-3xl font-bold mb-4">{t('tickers')}</h2>
                <div className="flex flex-wrap gap-3">
                    {tickers.filter((t) => !user?.tickers.map(item => item.name).includes(t.name)).map((ticker) => {
                        return (
                            <TickerItem
                                key={ticker.name}
                                ticker={ticker}
                                isSelected={selectedTicker === ticker.name}
                                isFavorite={false}
                                onClick={() => {
                                    setTicker(ticker.name)
                                }}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default TickerSection;

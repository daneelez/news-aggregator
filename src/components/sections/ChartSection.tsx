import {useTickerStore} from '../../store/tickerStore';
import LightweightChart from "../ui/LightweightChart.tsx";

const tickers = ["GAZP", "SBER", "T"]

const ChartSection = () => {
    const {selectedTicker, setTicker} = useTickerStore();

    if (!selectedTicker) {
        return <div className="text-center py-10 text-gray-400">Select a ticker to display the chart</div>;
    }

    return (
        <div className="w-1/2 p-6">
            <LightweightChart symbol={selectedTicker}/>
            <div className="flex gap-3 mb-4">
                {tickers.map((ticker) => (
                    <button
                        key={ticker}
                        onClick={() => setTicker(ticker)}
                        className={`px-4 py-2 rounded-lg border-2 ${
                            selectedTicker === ticker ? 'bg-primary-500 border-primary-400' : 'border-gray-600'
                        }`}
                    >
                        {ticker}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ChartSection;

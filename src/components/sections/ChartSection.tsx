import TickerSection from "./TickerSection.tsx";
import LightweightChart from "../ui/LightweightChart.tsx";
import {useTickerStore} from "../../store/tickerStore.ts";

const ChartSection = () => {
    const {selectedTicker} = useTickerStore();
    return (
        <div className="w-1/2 w-md:w-full p-4 overflow-y-auto bg-bg w-md:min-h-[60%] border-b">
            <LightweightChart symbol={selectedTicker}/>
            <TickerSection/>
        </div>
    );
};

export default ChartSection;

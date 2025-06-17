import type {TimeRange} from "../../constants/types.ts";
import {useFilterStore} from "../../store/filterStore.ts";

const ranges: TimeRange[] = ['1w', '1m', '3m', '6m', '1y', 'all'];

const TimeRangeSelector = () => {
    const timeRange = useFilterStore((s) => s.timeRange);
    const setTimeRange = useFilterStore((s) => s.setTimeRange);

    return (
        <div className="flex gap-2 mb-4">
            {ranges.map((range) => (
                <button
                    key={range}
                    className={`px-3 py-1 rounded ${timeRange === range ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'}`}
                    onClick={() => setTimeRange(range)}
                >
                    {range.toUpperCase()}
                </button>
            ))}
        </div>
    );
};

export default TimeRangeSelector;
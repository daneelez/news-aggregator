import {useEffect, useRef} from 'react';
import {
    createChart,
    type IChartApi,
    type ISeriesApi,
    LineSeries,
    type LineData,
    type UTCTimestamp
} from 'lightweight-charts';
import {useTranslation} from 'react-i18next';
import IconGraph from '../icons/IconGraph.tsx';
import TimeRangeSelector from './TimeRangeSelector.tsx';
import {useFilterStore} from '../../store/filterStore.ts';

interface LightweightChartProps {
    symbol: string | null;
}

const now = Math.floor(Date.now() / 1000);
const oneDay = 86400;

const mockData: LineData<UTCTimestamp>[] = Array.from({length: 30}, (_, i) => {
    const time = (now - (29 - i) * oneDay) as UTCTimestamp;
    const value = 150 + Math.sin(i / 5) * 10 + Math.random() * 5;
    return {time, value};
});

const timeRangeToDays: Record<string, number> = {
    '1w': 7,
    '1m': 30,
    '3m': 90,
    '6m': 180,
    '1y': 365,
    'all': Infinity
};

const LightweightChart = ({symbol}: LightweightChartProps) => {
    const {t} = useTranslation('translations');
    const chartContainerRef = useRef<HTMLDivElement | null>(null);
    const chartRef = useRef<IChartApi | null>(null);
    const lineSeriesRef = useRef<ISeriesApi<'Line'> | null>(null);

    const {timeRange} = useFilterStore();

    const filteredData = (() => {
        if (timeRange === 'all') return mockData;

        const now = Math.floor(Date.now() / 1000);
        const days = timeRangeToDays[timeRange];
        const cutoff = now - days * 86400;
        return mockData.filter(point => point.time >= cutoff);
    })();

    useEffect(() => {
        const container = chartContainerRef.current;
        if (!container) return;

        if (chartRef.current) {
            chartRef.current.remove();
            chartRef.current = null;
            lineSeriesRef.current = null;
        }

        const chart = createChart(container, {
            width: container.clientWidth,
            height: 300,
            layout: {
                background: {color: '#0a0a0a'},
                textColor: '#d1d4dc',
            },
            grid: {
                vertLines: {color: '#2B2B43'},
                horzLines: {color: '#2B2B43'},
            },
            crosshair: {
                mode: 1,
            },
            rightPriceScale: {
                borderColor: '#71649C',
            },
            timeScale: {
                borderColor: '#71649C',
            },
        });

        const lineSeries = chart.addSeries(LineSeries, {
            color: '#2962FF',
            lineWidth: 2,
        });

        chartRef.current = chart;
        lineSeriesRef.current = lineSeries;

        lineSeries.setData(filteredData);

        const handleResize = () => {
            if (chartRef.current && chartContainerRef.current) {
                chartRef.current.applyOptions({width: chartContainerRef.current.clientWidth});
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (chartRef.current) {
                chartRef.current.remove();
                chartRef.current = null;
                lineSeriesRef.current = null;
            }
        };
    }, [symbol, timeRange]);

    return (
        <div className="flex flex-col w-[80%] rounded-lg">
            <div className="flex items-center mb-4 py-8 gap-4">
                <IconGraph className="w-12 h-12 text-text"/>
                <h2 className="text-4xl font-bold">
                    {t('tickerChart')}
                </h2>
            </div>

            <TimeRangeSelector/>

            <div ref={chartContainerRef} className="w-full h-full mb-6"/>
        </div>
    );
};

export default LightweightChart;

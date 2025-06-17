import {useEffect, useRef, useState} from 'react';
import {
    createChart,
    type IChartApi,
    type ISeriesApi,
    LineSeries,
    type LineData,
    type UTCTimestamp,
} from 'lightweight-charts';
import {useTranslation} from "react-i18next";
import IconGraph from "../icons/IconGraph.tsx";
import TimeRangeSelector from "./TimeRangeSelector.tsx";

interface LightweightChartProps {
    symbol: string | null;
}

const mockData: LineData<UTCTimestamp>[] = [
    {time: 1718006400 as UTCTimestamp, value: 155.23},
    {time: 1718092800 as UTCTimestamp, value: 157.42},
    {time: 1718179200 as UTCTimestamp, value: 154.18},
    {time: 1718265600 as UTCTimestamp, value: 158.75},
    {time: 1718352000 as UTCTimestamp, value: 160.10},
    {time: 1718438400 as UTCTimestamp, value: 159.22},
    {time: 1718524800 as UTCTimestamp, value: 162.88},
];

const LightweightChart = ({symbol}: LightweightChartProps) => {
    const {t} = useTranslation('translations');
    const chartContainerRef = useRef<HTMLDivElement | null>(null);
    const chartRef = useRef<IChartApi | null>(null);
    const lineSeriesRef = useRef<ISeriesApi<'Line'> | null>(null);
    const [daysRange] = useState<number>(7);

    const filteredData = mockData.slice(-daysRange);

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

        chartRef.current = chart;

        const lineSeries = chart.addSeries(LineSeries, {
            color: '#2962FF',
            lineWidth: 2,
        });
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
    }, [symbol, daysRange]);

    return (
        <div className="flex flex-col w-[80%] rounded-lg">
            <div className="flex items-center mb-4 py-8 gap-4">
                <IconGraph className='w-12 h-12 text-text'/>
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

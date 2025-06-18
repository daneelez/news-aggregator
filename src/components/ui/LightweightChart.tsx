import {useEffect, useRef, useState} from 'react';
import {
    createChart,
    type IChartApi,
    type ISeriesApi,
    LineSeries,
    type UTCTimestamp,
    type LineData,
} from 'lightweight-charts';
import {useTranslation} from "react-i18next";
import IconGraph from "../icons/IconGraph.tsx";
import TimeRangeSelector from "./TimeRangeSelector.tsx";
import axios from "axios";

interface LightweightChartProps {
    symbol: string | null;
}

function formatTime(timestamp: UTCTimestamp): string {
    const date = new Date(timestamp * 1000);
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    return `${day}.${month}`;
}

const isoToUnixTimestamp = (isoString: string): UTCTimestamp => {
    return Math.floor(new Date(isoString).getTime() / 1000) as UTCTimestamp;
};

const LightweightChart = ({symbol}: LightweightChartProps) => {
    const {t} = useTranslation('translations');
    const chartContainerRef = useRef<HTMLDivElement | null>(null);
    const chartRef = useRef<IChartApi | null>(null);
    const lineSeriesRef = useRef<ISeriesApi<'Line'> | null>(null);
    const [daysRange] = useState<number>(7);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [chartData, setChartData] = useState<LineData<UTCTimestamp>[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            if (!symbol) return;

            setLoading(true);
            setError(null);

            try {
                const response = await axios.get(`http://localhost:8000/price/${symbol}`);

                const transformedData = response.data.map((item: { time: string, value: number }) => ({
                    time: isoToUnixTimestamp(item.time),
                    value: item.value
                }));

                setChartData(transformedData);
            } catch (err) {
                console.error("Error fetching chart data:", err);
                setError(t('chartDataError'));
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [symbol, t]);

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
            height: 350,
            layout: {
                background: {color: '#212024'},
                textColor: '#d1d4dc',
                fontFamily: "'Roboto', sans-serif",
                fontSize: 14,
            },
            rightPriceScale: {
                visible: true,
                borderVisible: true,
                autoScale: true,
                scaleMargins: {
                    top: 0.1,
                    bottom: 0.1,
                },
            },
            grid: {
                vertLines: {color: '#2B2B43'},
                horzLines: {color: '#2B2B43'},
            },
            crosshair: {
                mode: 1,
            },
            timeScale: {
                tickMarkFormatter: formatTime,
            },
        });

        chartRef.current = chart;

        const lineSeries = chart.addSeries(LineSeries, {
            color: 'rgba(97, 93, 250, 0.85)',
            lineWidth: 4,
            priceLineVisible: true,
            lastValueVisible: true,
            priceLineColor: 'rgba(97, 93, 250, 0.6)',
        });
        lineSeriesRef.current = lineSeries;

        const filteredData = chartData.slice(-daysRange);
        if (filteredData.length > 0) {
            lineSeries.setData(filteredData);
        }

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
    }, [symbol, daysRange, chartData]);

    return (
        <div className="flex flex-col w-full max-w-[1200px] rounded-lg mx-auto">
            <div className="flex items-center mb-4 py-8 gap-4">
                <IconGraph className='w-12 h-12 text-text'/>
                <h2 className="text-4xl font-bold">
                    {t('tickerChart')}
                </h2>
            </div>
            <TimeRangeSelector/>
            <div
                ref={chartContainerRef}
                className="w-full h-[350px] mb-6 rounded-lg shadow-lg bg-[#121212] transition-all duration-500"
            />
            {loading && <div className="text-center py-4">{t('loading')}</div>}
            {error && <div className="text-center text-red-500 py-4">{error}</div>}
        </div>
    );
};

export default LightweightChart;
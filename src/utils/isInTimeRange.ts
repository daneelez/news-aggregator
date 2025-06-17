import {useFilterStore} from "../store/filterStore.ts";

export const isInTimeRange = (dateStr: string): boolean => {
    const timeRange = useFilterStore.getState().timeRange;

    if (timeRange === 'all') return true;

    const now = new Date();
    const newsDate = new Date(dateStr);

    const diffInMs = now.getTime() - newsDate.getTime();
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    switch (timeRange) {
        case '1w':
            return diffInDays <= 7;
        case '1m':
            return diffInDays <= 30;
        case '3m':
            return diffInDays <= 90;
        case '6m':
            return diffInDays <= 180;
        case '1y':
            return diffInDays <= 365;
        default:
            return true;
    }
};

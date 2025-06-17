export const parseDomain = (url: string) => {
    try {
        const d = new URL(url).hostname;
        return d.includes('telegram') ? 'telegram' : d.replace(/^www\./, '');
    } catch {
        return url;
    }
};
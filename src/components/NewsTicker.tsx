type Sentiment = 'positive' | 'negative';

interface TickerNewsProps {
  sentiment: Sentiment;
}

const TickerNews = ({ sentiment }: TickerNewsProps) => {
  const selectedTicker = 'SBER';
  const title =
    'Сильнее всего за неделю ставки по рыночной ипотеке снизились на строительство дома — на 2,2 п.п. Несмотря на общее уменьшение ставок, пока они все равно остаются высокими — от 25%';
  const link = 'https://example.com/news/rbsm';

  const sentimentClass =
    sentiment === 'positive'
      ? 'bg-[#06FF5B] text-black'
      : 'bg-red-600 text-white';

  return (
    <div className="mt-5 relative p-6 rounded-lg bg-[#1E1F22] text-white shadow-lg max-h-[400px] overflow-auto">
      <div className={`absolute top-4 right-4 px-3 py-1 rounded-full ${sentimentClass}`}>
        <span className="text-sm font-bold">{selectedTicker}</span>
      </div>

      <h2 className="text-lg font-semibold mb-2">
        В России снизились средние ставки <br />по рыночной ипотеке
      </h2>

      <p className="text-sm text-gray-400 mb-4">{title}</p>

      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-400 underline text-sm hover:text-blue-300 transition"
      >
        Читать полностью →
      </a>
    </div>
  );
};

export default TickerNews;

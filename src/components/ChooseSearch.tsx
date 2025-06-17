import { useState } from 'react';

const SourceSelector = () => {
  const [activeTab, setActiveTab] = useState<'source' | 'predict' | null>(null);
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const sources = ['РБК', 'Телеграмм', 'Пульс'];

  const toggleSource = (source: string) => {
    setSelectedSources(prev =>
      prev.includes(source)
        ? prev.filter(s => s !== source)
        : [...prev, source]
    );
  };

  return (
    <div className="mt-13 rounded-lg">
      <div className="flex gap-5 mb-4">
        <button
          className={`px-12 py-3 rounded-full border-3 font-bold text-l transition-all
            ${
              activeTab === 'source'
                ? 'bg-white text-black border-white'
                : 'bg-[#2C2D30] text-white border-white'
            }`}
          onClick={() => {
            setActiveTab('source');
            setIsDropdownOpen(true);
          }}
        >
          По источнику
        </button>

        <button
          className={`px-12 text-l py-1 rounded-full border-3 font-bold transition-all
            ${
              activeTab === 'predict'
                ? 'bg-white text-black border-white'
                : 'bg-[#2C2D30] text-white border-white'
            }`}
          onClick={() => {
            setActiveTab('predict');
            setIsDropdownOpen(false);
          }}
        >
          По предикту
        </button>
      </div>

      {activeTab === 'source' && isDropdownOpen && (
        <div className="ml-1 mt-1 bg-[#FFFFFF] rounded-3xl p-2 max-w-1/3">
          {sources.map(source => (
            <div
              key={source}
              className="flex items-center py-2 px-3 cursor-pointer hover:bg-[#3E3F42] rounded"
              onClick={() => toggleSource(source)}
            >
              <div className={`w-5 h-5 border-2 rounded mr-3 flex items-center justify-center
                ${
                  selectedSources.includes(source)
                    ? 'bg-black border-black'
                    : 'border-black'
                }`}>
                {selectedSources.includes(source) && (
                  <span className="text-black text-xs">✓</span>
                )}
              </div>
              <span className="text-black">{source}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SourceSelector;
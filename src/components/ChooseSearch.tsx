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
    <div className="p-6 rounded-lg">
      <div className="flex gap-4 mb-4">
        <button
          className={`px-6 py-3 rounded-full border-3 font-bold text-sm transition-all
            ${
              activeTab === 'source'
                ? 'bg-white text-black border-white'
                : 'bg-black text-white border-white'
            }`}
          onClick={() => {
            setActiveTab('source');
            setIsDropdownOpen(true);
          }}
        >
          По источнику
        </button>

        <button
          className={`px-6 py-3 rounded-full border-2 font-bold text-sm transition-all
            ${
              activeTab === 'predict'
                ? 'bg-white text-black border-white'
                : 'bg-black text-white border-white'
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
        <div className="mt-2 bg-[#2C2D30] rounded-lg p-4">
          {sources.map(source => (
            <div
              key={source}
              className="flex items-center py-2 px-3 cursor-pointer hover:bg-[#3E3F42] rounded"
              onClick={() => toggleSource(source)}
            >
              <div className={`w-5 h-5 border-2 rounded mr-3 flex items-center justify-center
                ${
                  selectedSources.includes(source)
                    ? 'bg-white border-white'
                    : 'border-white'
                }`}>
                {selectedSources.includes(source) && (
                  <span className="text-black text-xs">✓</span>
                )}
              </div>
              <span className="text-white">{source}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SourceSelector;
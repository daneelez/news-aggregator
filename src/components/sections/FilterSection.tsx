import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RbkIcon } from '../icons/IconRbk.tsx';
import { TelegramIcon } from '../icons/IconTelegram.tsx';
import {useTranslation} from "react-i18next";

const SourceSelector = () => {
  const [activeTab, setActiveTab] = useState<'source' | 'predict' | null>(null);
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const {t} = useTranslation('translations')
  const sources = [
    { name: t('РБК'), icon: <RbkIcon className="w-5 h-5" /> },
    { name: t('Телеграм'), icon: <TelegramIcon className="w-5 h-5" /> }
  ];

  const toggleSource = (sourceName: string) => {
    setSelectedSources(prev =>
      prev.includes(sourceName)
        ? prev.filter(s => s !== sourceName)
        : [...prev, sourceName]
    );
  };
  return (
    <div className="mt-6 md:mt-13 rounded-lg">
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 mb-4">
        <button
          className={`px-6 sm:px-12 py-2 sm:py-3 rounded-full border-2 sm:border-3 font-bold text-sm sm:text-base transition-all
            ${
              activeTab === 'source'
                ? 'bg-white text-black border-white'
                : 'bg-[#2C2D30] text-white border-white'
            }`}
          onClick={() => {
            setActiveTab('source');
            setIsDropdownOpen(prev => !prev);
          }}
        >
          По источнику
        </button>

        <button
          className={`px-6 sm:px-12 py-2 sm:py-3 rounded-full border-2 sm:border-3 font-bold text-sm sm:text-base transition-all
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
            {t('По предикту')}
        </button>
      </div>

      <AnimatePresence>
        {activeTab === 'source' && isDropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="ml-1 mt-1 bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-4 w-full sm:max-w-md space-y-2 sm:space-y-3 shadow-lg"
          >
            {sources.map(({name, icon}) => (
              <motion.div
                key={name}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-between py-2 px-3 cursor-pointer hover:bg-gray-100 rounded-lg"
                onClick={() => toggleSource(name)}
              >
                <div className="flex items-center">
                  <span className="mr-2 sm:mr-3">{icon}</span>
                  <span className="text-black font-medium text-sm sm:text-base">{t(name)}</span>
                </div>

                {selectedSources.includes(name) && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-black text-base sm:text-lg"
                  >
                    ✓
                  </motion.span>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SourceSelector;
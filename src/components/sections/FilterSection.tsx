import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RbkIcon } from '../icons/IconRbk.tsx';
import { TelegramIcon } from '../icons/IconTelegram.tsx';
import { useTranslation } from "react-i18next";

const SourceSelector = () => {
    const [activeTab, setActiveTab] = useState<'source' | 'predict' | null>(null);
    const [selectedSources, setSelectedSources] = useState<string[]>([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { t } = useTranslation('translations');
    const sources = [
        { name: t('Rbk'), icon: <RbkIcon className="w-5 h-5" /> },
        { name: t('telegram'), icon: <TelegramIcon className="w-5 h-5" /> }
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
                    className={`px-4 sm:px-8 py-2 sm:py-3 rounded-full border-3 font-bold text-sm sm:text-base transition-all select-none
                        ${
                        activeTab === 'source'
                            ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white'
                            : 'bg-white dark:bg-[#2C2D30] text-black dark:text-white border-black dark:border-white'
                    }`}
                    onClick={() => {
                        setActiveTab('source');
                        setIsDropdownOpen(prev => !prev);
                    }}
                >
                    {t('source')}
                </button>

                <button
                    className={`px-4 sm:px-8 py-2 sm:py-3 rounded-full border-3 font-bold text-sm sm:text-base transition-all select-none
                        ${
                        activeTab === 'predict'
                            ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white'
                            : 'bg-white dark:bg-[#2C2D30] text-black dark:text-white border-black dark:border-white'
                    }`}
                    onClick={() => {
                        setActiveTab('predict');
                        setIsDropdownOpen(false);
                    }}
                >
                    {t('predict')}
                </button>
            </div>

            <AnimatePresence>
                {activeTab === 'source' && isDropdownOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="ml-1 mt-1 bg-black dark:bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-4 w-full max-w-xs space-y-2 sm:space-y-3 shadow-lg select-none"
                    >
                        {sources.map(({name, icon}) => (
                            <motion.div
                                key={name}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex items-center justify-between py-2 px-3 rounded-lg"
                                onClick={() => toggleSource(name)}
                            >
                                <div className="flex items-center">
                                    <span className="mr-2 sm:mr-3">{icon}</span>
                                    <span className="text-white dark:text-black font-medium text-sm sm:text-base select-none">{t(name)}</span>
                                </div>

                                {selectedSources.includes(name) && (
                                    <motion.span
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="text-white dark:text-black text-base sm:text-lg select-none"
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
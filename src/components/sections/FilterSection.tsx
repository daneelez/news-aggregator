import {useEffect, useRef, useState} from 'react'
import {RbkIcon} from '../icons/IconRbk'
import {TelegramIcon} from '../icons/IconTelegram'
import {useTranslation} from 'react-i18next'
import {useFilterStore} from '../../store/filterStore'
import type {PredictFilter} from '../../constants/types'
import FilterItem from "../ui/FilterItem.tsx";
import FilterOption from "../ui/FilterOption.tsx";

const FilterSection = () => {
    const {t} = useTranslation('translations')
    const [activeTab, setActiveTab] = useState<'source' | 'predict' | null>(null)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    const {sources, toggleSource, predict, setPredict} = useFilterStore()

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false)
                setActiveTab(null)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const sourceOptions = [
        {key: 'rbk.ru', label: t('Rbk'), icon: <RbkIcon className="w-5 h-5"/>},
        {key: 'telegram', label: t('telegram'), icon: <TelegramIcon className="w-5 h-5"/>},
    ]

    const predictOptions = [
        {key: 'positive', label: t('positive')},
        {key: 'negative', label: t('negative')},
    ]

    const toggleTab = (tab: 'source' | 'predict') => {
        setIsDropdownOpen(prev => activeTab !== tab || !prev)
        setActiveTab(prev => (prev === tab ? null : tab))
    }

    const renderSourceItems = () => sourceOptions.map(({key, label, icon}) => (
        <FilterItem
            key={key}
            label={label}
            icon={icon}
            checked={sources.includes(key)}
            onClick={() =>
                toggleSource(key)
            }
        />
    ))

    const renderPredictItems = () => predictOptions.map(({key, label}) => (
        <FilterItem
            key={key}
            label={label}
            checked={predict === key}
            onClick={() =>
                setPredict(key as PredictFilter)
            }
        />
    ))

    return (
        <div className="flex w-md:flex-col flex-row gap-3 mb-4">
            <FilterOption
                title={t('source')}
                isActive={activeTab === 'source' && isDropdownOpen}
                onClick={() => toggleTab('source')}
            >
                {renderSourceItems()}
            </FilterOption>

            <FilterOption
                title={t('predict')}
                isActive={activeTab === 'predict' && isDropdownOpen}
                onClick={() => toggleTab('predict')}
            >
                {renderPredictItems()}
            </FilterOption>
        </div>
    )
}

export default FilterSection;

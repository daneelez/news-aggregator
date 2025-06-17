import {useTranslation} from 'react-i18next'
import {useThemeStore} from '../../store/themeStore.ts'
import Dropdown from "../ui/Dropdown.tsx";
import {motion} from 'framer-motion';
import SettingsSection from "../sections/SettingSection.tsx";

const SettingsPage = () => {
    const {t, i18n} = useTranslation('translations');
    const {theme, setTheme} = useThemeStore()

    const handleLanguageChange = (lang: string) => {
        i18n.changeLanguage(lang)
        localStorage.setItem('i18nextLng', lang)
    }

    const handleThemeChange = (newTheme: string) => {
        if (newTheme === 'dark' || newTheme === 'light') {
            setTheme(newTheme)
        }
    }

    return (
        <div className="h-screen flex-center bg-bg p-12 overflow-y-auto">
            <motion.div
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.4}}
                className="h-minimal:mt-auto w-md max-w-6xl bg-bg-nd-light dark:bg-bg-nd-dark rounded-2xl shadow-2xl p-6 h-mobile:gap-2 text-text h-mobile:p-4 flex flex-col gap-6"
            >
                <h1 className="text-center text-3xl font-bold">{t('settings')}</h1>

                <SettingsSection
                    label={t('language')}
                    value={i18n.language}
                    onChange={handleLanguageChange}
                >
                    <option value="en">English</option>
                    <option value="ru">Русский</option>
                </SettingsSection>

                <SettingsSection
                    label={t('theme')}
                    value={theme}
                    onChange={handleThemeChange}
                >
                    <option value="dark">{t('dark')}</option>
                    <option value="light">{t('light')}</option>
                </SettingsSection>
            </motion.div>
            <Dropdown/>
        </div>
    )
}

export default SettingsPage

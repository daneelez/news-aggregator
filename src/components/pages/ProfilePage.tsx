import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {motion} from 'framer-motion'
import {useAuthStore} from '../../store/authStore'
import {useTickerStore} from '../../store/tickerStore'
import IconX from '../icons/IconX'
import {useTranslation} from 'react-i18next'
import TickerDropdown from '../ui/TickerDropdown'
import Dropdown from "../ui/Dropdown.tsx";
import type {ITicker} from "../../constants/interfaces.ts";

const ProfilePage = () => {
    const {user, logout, isAuthenticated} = useAuthStore()
    const {tickers} = useTickerStore()
    const navigate = useNavigate()
    const {t} = useTranslation('translations')

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login')
        }
    }, [isAuthenticated, navigate])

    if (!user) return <h2 className="flex-center text-center text-6xl font-bold">{t('login')}</h2>

    const handleLogout = () => {
        logout()
        navigate('/')
    }

    const handleChangePassword = async () => {
        try {
            // TODO норм обработку
            alert(t('passwordChangedSuccess'));
            setCurrentPassword('');
            setNewPassword('');
        } catch {
            alert(t('passwordChangeFailed'));
        }
    };

    const handleAddTicker = (ticker: ITicker) => {
        useAuthStore.setState((state) => ({
            user: {
                ...state.user!,
                tickers: [...state.user!.tickers, ticker],
            },
        }))
    }

    const handleRemoveTicker = (ticker: ITicker) => {
        useAuthStore.setState((state) => ({
            user: {
                ...state.user!,
                tickers: state.user!.tickers.filter((t) => t.name !== ticker.name),
            },
        }))
    }

    const availableTickers = tickers.filter((t) => !user.tickers.map(item => item.name).includes(t.name))

    return (
        <div className="h-screen bg-bg flex-center p-12 overflow-y-auto">
            <motion.div
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.4}}
                className="w-full max-w-6xl bg-bg-nd-light dark:bg-bg-nd-dark h-mobile:mt-auto rounded-2xl shadow-2xl p-6 text-text flex flex-col md:flex-row gap-6"
            >

                <div className="md:w-1/2 w-full flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                        <div
                            className="w-20 h-20 rounded-full border-2 border-[#4CAF50] bg-active-light dark:bg-active-dark flex-center text-3xl font-bold">
                            {user.login[0].toUpperCase()}
                        </div>
                        <div>
                            <h1 className="text-xl font-semibold">{user.login}</h1>
                            <p className="text-sm text-text opacity-45">{user.email}</p>
                        </div>
                    </div>

                    <div className="mt-4 space-y-3">
                        <label className="block text-sm">{t('currentPassword')}</label>
                        <input
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="w-full bg-alt-light dark:bg-alt-dark border border-[#555] rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-[#4CAF50]"
                        />

                        <label className="block text-sm">{t('newPassword')}</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full bg-alt-light dark:bg-alt-dark border border-[#555] rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-[#4CAF50]"
                        />

                        <button
                            onClick={handleChangePassword}
                            disabled={!currentPassword || !newPassword}
                            className="w-full bg-[#4CAF50] hover:bg-green-600 transition-colors duration-300 text-text py-2 rounded-md font-medium mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {t('changePassword')}
                        </button>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="mt-4 w-full bg-red-600 hover:bg-red-700 transition-colors duration-300 text-text py-2 rounded-md font-medium"
                    >
                        {t('logout')}
                    </button>
                </div>

                <div className="md:w-1/2 w-full flex flex-col gap-4">
                    <h2 className="text-lg font-medium">{t('favoriteTickers')}</h2>

                    {user.tickers.length === 0 ? (
                        <p className="text-sm text-text opacity-45">{t('noFavorite')}</p>
                    ) : (
                        <ul className="flex flex-wrap gap-2">
                            {user.tickers.map((ticker) => (
                                <li
                                    key={ticker.name}
                                    className="flex items-center gap-1 bg-[#4CAF50] text-text px-3 py-1 rounded-full text-sm"
                                >
                                    {ticker.name}
                                    <button
                                        onClick={() => handleRemoveTicker(ticker)}
                                        className="ml-1"
                                    >
                                        <IconX className="w-4 h-4 text-white"/>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}

                    <TickerDropdown
                        tickers={availableTickers}
                        onSelect={(ticker) => handleAddTicker(ticker)}
                    />
                </div>
            </motion.div>
            <Dropdown/>
        </div>
    )
}

export default ProfilePage
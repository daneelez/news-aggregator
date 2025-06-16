import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {motion} from 'framer-motion'
import {useAuthStore} from '../../store/authStore'
import {useTickerStore} from '../../store/tickerStore'
import IconX from '../icons/IconX'
import {useTranslation} from 'react-i18next'
import TickerDropdown from '../ui/TickerDropdown'
import Dropdown from "../ui/Dropdown.tsx";

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

    if (!user) return null

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

    const handleAddTicker = (tickerName: string) => {
        useAuthStore.setState((state) => ({
            user: {
                ...state.user!,
                tickers: [...state.user!.tickers, tickerName],
            },
        }))
    }

    const handleRemoveTicker = (tickerToRemove: string) => {
        useAuthStore.setState((state) => ({
            user: {
                ...state.user!,
                tickers: state.user!.tickers.filter((t) => t !== tickerToRemove),
            },
        }))
    }

    const availableTickers = tickers.filter((t) => !user.tickers.includes(t.name))

    return (
        <div className="h-screen bg-[#2C2D30] flex-center p-6 overflow-y-auto">
            <motion.div
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.4}}
                className="w-full max-w-6xl bg-[#3A3B3E] rounded-2xl shadow-2xl p-6 text-white flex flex-col md:flex-row gap-6"
            >

                <div className="md:w-1/2 w-full flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                        <div
                            className="w-20 h-20 rounded-full border-2 border-[#4CAF50] bg-[#444] flex-center text-3xl font-bold">
                            {user.login[0].toUpperCase()}
                        </div>
                        <div>
                            <h1 className="text-xl font-semibold">{user.login}</h1>
                            <p className="text-sm text-gray-400">{user.email}</p>
                        </div>
                    </div>

                    <div className="mt-4 space-y-3">
                        <label className="block text-sm">{t('currentPassword')}</label>
                        <input
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="w-full bg-[#2C2D30] border border-[#555] rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-[#4CAF50]"
                        />

                        <label className="block text-sm">{t('newPassword')}</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full bg-[#2C2D30] border border-[#555] rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-[#4CAF50]"
                        />

                        <button
                            onClick={handleChangePassword}
                            disabled={!currentPassword || !newPassword}
                            className="w-full bg-[#4CAF50] hover:bg-green-600 transition-colors duration-300 text-white py-2 rounded-md font-medium mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {t('changePassword')}
                        </button>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="mt-4 w-full bg-red-600 hover:bg-red-700 transition-colors duration-300 text-white py-2 rounded-md font-medium"
                    >
                        {t('logout')}
                    </button>
                </div>

                <div className="md:w-1/2 w-full flex flex-col gap-4">
                    <h2 className="text-lg font-medium">{t('favoriteTickers')}</h2>

                    {user.tickers.length === 0 ? (
                        <p className="text-sm text-gray-400">{t('noFavorite')}</p>
                    ) : (
                        <ul className="flex flex-wrap gap-2">
                            {user.tickers.map((ticker) => (
                                <li
                                    key={ticker}
                                    className="flex items-center gap-1 bg-[#4CAF50] text-white px-3 py-1 rounded-full text-sm"
                                >
                                    {ticker}
                                    <button
                                        onClick={() => handleRemoveTicker(ticker)}
                                        className="ml-1 text-white hover:text-gray-200"
                                        title={t('delete')}
                                    >
                                        <IconX className="w-4 h-4"/>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}

                    <TickerDropdown
                        tickers={availableTickers}
                        onSelect={(ticker) => handleAddTicker(ticker.name)}
                    />
                </div>
            </motion.div>
            <Dropdown/>
        </div>
    )
}

export default ProfilePage
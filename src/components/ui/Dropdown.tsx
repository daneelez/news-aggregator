import {useEffect, useRef, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useAuthStore} from '../../store/authStore'
import {logout} from '../../services/authService'
import {useTranslation} from 'react-i18next'
import {motion, AnimatePresence} from 'framer-motion'
import DropDownItem from '../ui/DropDownItem'

import IconMenu from '../icons/IconMenu'
import IconHome from '../icons/IconHome'
import IconProfile from '../icons/IconProfile'
import IconLogin from '../icons/IconLogin'
import IconRegister from '../icons/IconRegister'
import IconSettings from '../icons/IconSettings'
import IconLogout from '../icons/IconLogout'

const Dropdown = () => {
    const [open, setOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)
    const {isAuthenticated} = useAuthStore()
    const {t} = useTranslation('translations')
    const navigate = useNavigate()

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const menuVariants = {
        hidden: {opacity: 0, y: -10, scale: 0.95},
        visible: {opacity: 1, y: 0, scale: 1},
        exit: {opacity: 0, y: -10, scale: 0.95},
    }

    const handleLogout = () => {
        logout()
        setOpen(false)
        navigate('/')
    }

    const close = () => setOpen(false)

    return (
        <div ref={menuRef} className="fixed top-5 right-5 z-[1000] inline-block">
            <button
                onClick={() => setOpen(prev => !prev)}
                className="border-none bg-transparent cursor-pointer focus:outline-none"
            >
                <IconMenu className="w-8 h-8 text-text"/>
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={menuVariants}
                        transition={{duration: 0.15}}
                        className="absolute top-full right-0 mt-2 min-w-[200px] rounded-2xl bg-bg-nd-light dark:bg-bg-nd-dark shadow-xl overflow-hidden origin-top-right ring-1 ring-black/20"
                    >
                        <div className="flex flex-col text-text text-sm divide-y divide-[#444]">
                            <DropDownItem to="/" onClick={close} icon={<IconHome className="w-5 h-5 text-text"/>}>
                                {t('home')}
                            </DropDownItem>

                            {isAuthenticated && (
                                <DropDownItem to="/profile" onClick={close}
                                              icon={<IconProfile className="w-5 h-5 text-text"/>}>
                                    {t('profile')}
                                </DropDownItem>
                            )}

                            <DropDownItem to="/settings" onClick={close}
                                          icon={<IconSettings className="w-5 h-5 text-text"/>}>
                                {t('settings')}
                            </DropDownItem>

                            {!isAuthenticated && (
                                <>
                                    <DropDownItem to="/login" onClick={close}
                                                  icon={<IconLogin className="w-5 h-5 text-text"/>}>
                                        {t('login')}
                                    </DropDownItem>

                                    <DropDownItem to="/register" onClick={close}
                                                  icon={<IconRegister className="w-5 h-5 text-text"/>}>
                                        {t('register')}
                                    </DropDownItem>
                                </>
                            )}

                            {isAuthenticated && (
                                <DropDownItem to="/login" onClick={() => {
                                    close();
                                    handleLogout();
                                }}
                                              icon={<IconLogout className="w-5 h-5 text-text"/>}>
                                    {t('logout')}
                                </DropDownItem>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default Dropdown;
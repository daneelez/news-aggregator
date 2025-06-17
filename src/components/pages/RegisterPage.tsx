import {type FormEvent, useState} from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import {register} from '../../services/authService.ts'
import {useNavigate} from 'react-router-dom'
import {motion} from 'framer-motion'
import Dropdown from "../ui/Dropdown.tsx";
import {useTranslation} from "react-i18next";

const RECAPTCHA_SITE_KEY = '6Ld8g2IrAAAAAGWH_2KnqY6d4hBOuXHdy_OWB6ih'

const RegisterPage = () => {
    const [loginName, setLoginName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [captchaToken, setCaptchaToken] = useState<string | null>(null)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const {t} = useTranslation('translations')

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        if (!captchaToken) {
            setError(t('captcha_required'))
            return
        }

        try {
            await register(loginName, email, password, captchaToken)
            setError('')
            navigate('/')
        } catch {
            setError(t('registerFail'))
        }
    }

    return (
        <div className="h-screen flex-center bg-bg p-12 overflow-y-auto">
            <motion.form
                initial={{opacity: 0, y: -20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 1, ease: 'easeInOut'}}
                onSubmit={handleSubmit}
                className="h-mobile:mt-auto w-full max-w-md bg-bg-nd-light dark:bg-bg-nd-dark p-8 rounded-2xl shadow-2xl flex flex-col gap-5 h-mobile:gap-2 text-text h-mobile:p-4"
                autoComplete="off"
            >
                <h2 className="text-center text-2xl font-bold mb-2">{t('register')}</h2>

                <input
                    type="text"
                    placeholder={t('loginName')}
                    value={loginName}
                    onChange={(e) => setLoginName(e.target.value)}
                    required
                    className="px-4 py-3 h-minimal:py-1 rounded-lg bg-alt-light dark:bg-alt-dark border border-[#555] text-text focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="px-4 py-3 h-minimal:py-1 rounded-lg bg-alt-light dark:bg-alt-dark border border-[#555] text-text focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                />

                <input
                    type="password"
                    placeholder={t('password')}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="px-4 py-3 rounded-lg bg-alt-light dark:bg-alt-dark border border-[#555] text-text focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                />

                <div className="flex-center w-mobile:scale-60">
                    <ReCAPTCHA
                        sitekey={RECAPTCHA_SITE_KEY}
                        onChange={(token) => setCaptchaToken(token)}
                        onExpired={() => setCaptchaToken(null)}
                    />
                </div>

                <button
                    type="submit"
                    className="mt-4 px-4 py-3 bg-green-600 hover:bg-green-700 text-text rounded-lg transition duration-300 font-semibold text-lg"
                >
                    {t('registerField')}
                </button>

                {error && (
                    <p className="text-red-400 text-center mt-2">{error}</p>
                )}
            </motion.form>
            <Dropdown/>
        </div>
    )
}

export default RegisterPage

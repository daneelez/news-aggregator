import {type FormEvent, useState} from 'react'
import {useNavigate, Link} from 'react-router-dom'
import ReCAPTCHA from 'react-google-recaptcha'
import {login} from '../../services/authService.ts'
import {motion} from 'framer-motion'
import Dropdown from "../ui/Dropdown.tsx"
import {useTranslation} from "react-i18next";

const RECAPTCHA_SITE_KEY = '6Ld8g2IrAAAAAGWH_2KnqY6d4hBOuXHdy_OWB6ih'

const LoginPage = () => {
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
            await login(email, password)
            setError('')
            navigate('/')
        } catch {
            setError(t("invalid_credentials"))
        }
    }

    return (
        <div className="min-h-screen flex-center bg-[#2C2D30] px-4">
            <motion.form
                initial={{opacity: 0, y: -20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 1, ease: 'easeInOut'}}
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-[#3A3B3E] p-8 rounded-2xl shadow-2xl flex flex-col gap-5 text-white"
                autoComplete="off"
            >
                <h2 className="text-center text-3xl font-bold">{t('login')}</h2>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="px-4 py-3 rounded-lg bg-[#2C2D30] border border-[#555] text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                />

                <input
                    type="password"
                    placeholder={t("password")}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="px-4 py-3 rounded-lg bg-[#2C2D30] border border-[#555] text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                />

                <div className="flex-center">
                    <ReCAPTCHA
                        sitekey={RECAPTCHA_SITE_KEY}
                        onChange={(token) => setCaptchaToken(token)}
                        onExpired={() => setCaptchaToken(null)}
                    />
                </div>

                <button
                    type="submit"
                    className="mt-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition duration-300 font-semibold text-lg"
                >
                    {t('login_to_account')}
                </button>

                <Link
                    to="/register"
                    className="text-center text-sm text-gray-300 hover:text-green-400 transition underline"
                >
                    {t('no_account_register')}
                </Link>

                {error && (
                    <p className="text-red-400 text-center mt-2">{error}</p>
                )}
            </motion.form>

            <Dropdown/>
        </div>
    )
}

export default LoginPage
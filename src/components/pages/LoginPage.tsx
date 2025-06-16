import {type FormEvent, useState} from 'react'
import {login, logout} from '../../services/authService.ts'

const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        try {
            await login(email, password)
        } catch {
            setError('Неверный логин или пароль')
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="p-4">
                <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"/>
                <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Пароль"
                       type="password"/>
                <button type="submit">Войти</button>
                {error && <div className="text-red-500">{error}</div>}
            </form>
            <button onClick={logout}>Выйти</button>
        </div>
    )
}

export default LoginPage;
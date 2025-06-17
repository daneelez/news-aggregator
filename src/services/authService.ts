import {useAuthStore} from '../store/authStore'
import axios from 'axios'

export async function login(email: string, password: string,captchaToken: string) {
    const res = await axios.post('/auth/login', {email, password,captchaToken})
    const {token, refreshToken, user} = res.data
    useAuthStore.getState().login(token, refreshToken, user)
}

export async function register(loginName: string, email: string, password: string, captchaToken: string) {
    const res = await axios.post('/auth/register', {
        login: loginName,
        email,
        password,
        captchaToken,
    })
    const {token, refreshToken, user} = res.data
    useAuthStore.getState().login(token, refreshToken, user)
}

export function logout() {
    useAuthStore.getState().logout()
}
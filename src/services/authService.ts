import {useAuthStore} from '../store/authStore'
import api from "./axios.ts";

export async function login(email: string, password: string) {
    const res = await api.post('/auth/login', {email, password})
    const {token, refreshToken, user} = res.data
    useAuthStore.getState().login(token, refreshToken, user)
}

export async function register(loginName: string, email: string, password: string, captchaToken: string) {
    const res = await api.post('/auth/register', {
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
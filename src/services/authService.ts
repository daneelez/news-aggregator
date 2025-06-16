import axios from 'axios'
import {useAuthStore} from '../store/authStore.ts'

const BASE = 'https://your-api.com/auth'

export async function login(email: string, password: string) {
    const res = await axios.post(`${BASE}/login`, {email, password})
    const {token, refreshToken, user} = res.data
    useAuthStore.getState().setAuth(token, refreshToken, user)
}

export async function register(email: string, password: string) {
    await axios.post(`${BASE}/register`, {email, password})
}

export function logout() {
    useAuthStore.getState().logout()
}

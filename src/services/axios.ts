import axios from 'axios'
import {useAuthStore} from '../store/authStore.ts'

const api = axios.create({
    baseURL: 'https://your-api.com',
    withCredentials: true,
})

api.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

let isRefreshing = false
let subscribers: ((token: string) => void)[] = []

function onRefreshed(token: string) {
    subscribers.forEach((cb) => cb(token))
    subscribers = []
}

api.interceptors.response.use(
    (res) => res,
    async (error) => {
        const originalRequest = error.config
        const refreshToken = useAuthStore.getState().refreshToken

        if (error.response?.status === 401 && refreshToken && !isRefreshing) {
            isRefreshing = true
            try {
                const response = await axios.post('https://your-api.com/auth/refresh', {refreshToken})
                const {token: newToken} = response.data

                useAuthStore.getState().setAuth(newToken, refreshToken, useAuthStore.getState().user!)
                onRefreshed(newToken)

                isRefreshing = false
                return api(originalRequest)
            } catch {
                useAuthStore.getState().logout()
                isRefreshing = false
            }
        }

        return Promise.reject(error)
    }
)

export default api

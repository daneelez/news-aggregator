import axios from 'axios'
import {useAuthStore} from '../store/authStore'

const api = axios.create({
    baseURL: 'https://localhost:8080',
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

        if (error.response?.status === 401 && refreshToken && !originalRequest._retry) {
            if (!isRefreshing) {
                isRefreshing = true
                try {
                    const response = await axios.post('https://localhost:8080/auth/refresh', {refreshToken})
                    const {token: newToken} = response.data
                    useAuthStore.getState().login(newToken, refreshToken, useAuthStore.getState().user!)
                    onRefreshed(newToken)
                    isRefreshing = false
                } catch {
                    useAuthStore.getState().logout()
                    isRefreshing = false
                    return Promise.reject(error)
                }
            }

            return new Promise((resolve) => {
                subscribers.push((token: string) => {
                    originalRequest.headers.Authorization = `Bearer ${token}`
                    originalRequest._retry = true
                    resolve(api(originalRequest))
                })
            })
        }

        return Promise.reject(error)
    }
)

export default api


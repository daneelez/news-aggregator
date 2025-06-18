import { useAuthStore } from '../store/authStore';
import axios from "axios";

export async function login(email: string, password: string, captchaToken: string) {
    try {
        const res = await axios.post('http://localhost:8000/auth/login', { email, password, captchaToken });
        const { token, refreshToken, user } = res.data;
        useAuthStore.getState().login(token, refreshToken, user);
    } catch (error) {
        console.error('Login failed:', error);
        throw error;
    }
}

export async function register(loginName: string, email: string, password: string, captchaToken: string) {
    try {
        const res = await axios.post('http://localhost:8000/auth/register', { login: loginName, email, password, captchaToken });
        const { token, refreshToken, user } = res.data;
        useAuthStore.getState().login(token, refreshToken, user);
    } catch (error) {
        console.error('Registration failed:', error);
        throw error;
    }
}

export function logout() {
    try {
        useAuthStore.getState().logout();
    } catch (error) {
        console.error('Logout failed:', error);
        throw error;
    }
}

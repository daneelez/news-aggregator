import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import type {IUser} from "../constants/interfaces.ts";

interface AuthState {
    token: string | null;
    refreshToken: string | null;
    user: IUser | null;
    login: (token: string, refreshToken: string, user: IUser) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            token: null,
            refreshToken: null,
            user: null,

            login: (token, refreshToken, user) => {
                set({token, refreshToken, user});
            },

            logout: () => {
                set({token: null, refreshToken: null, user: null});
            },

            get isAuthenticated() {
                return !!get().token;
            },
        }),
        {
            name: 'auth-storage',
        }
    )
);

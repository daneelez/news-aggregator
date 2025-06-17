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
        (set) => ({
            token: null,
            refreshToken: null,
            user: null,
            isAuthenticated: false,

            login: (token, refreshToken, user) => {
                set({token, refreshToken, user, isAuthenticated: true});
            },

            logout: () => {
                set({token: null, refreshToken: null, user: null, isAuthenticated: false});
            },
        }),
        {
            name: 'auth-store',
        }
    )
);

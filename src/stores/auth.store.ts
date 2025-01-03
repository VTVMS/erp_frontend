import { defineStore } from 'pinia';
import {
    ACCESS_TOKEN_LOCAL,
    EXPIRED_ACCESS_TOKEN_LOCAL,
    REFRESH_TOKEN_LOCAL
} from "../common/const.ts";
import {LoginByEmailRequest, TokenResponse} from "../model/auth.model.ts";
import {authService} from "../services/auth.service.ts";
import {userService} from "../services/user.service.ts";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        isLoggedIn: checkIsTokenIsValid(),
        refreshTokenTimeout: null,
    }),
    actions: {
        async loginByEmail(payload: LoginByEmailRequest) {
            try {
                const [error, result] = await authService.loginByEmail(payload);
                if (error) {
                    // Show toast error here
                    console.error(error);
                    this.isLoggedIn = false;
                    this.stopRefreshTokenTimer();
                    return;
                }
                // Show toast notify here
                setAuthToLocalStorage(result);
                this.isLoggedIn = true;
                this.startRefreshTokenTimer();
            } catch (err) {
                // Show toast error here
                console.error(err);
                this.isLoggedIn = false;
                this.stopRefreshTokenTimer();
            }
        },
        async refreshToken() {
            try {
                const [error, result] = await authService.refreshToken();
                if (error) {
                    // Show toast error here
                    console.error(error);
                    this.stopRefreshTokenTimer();
                    return;
                }
                setAuthToLocalStorage(result);
                this.isLoggedIn = true;
                this.startRefreshTokenTimer();
            } catch (err) {
                // Show toast error here
                console.error(err);
                this.stopRefreshTokenTimer();
            }
        },
        startRefreshTokenTimer() {
            try {
                const expiredAt = new Date(localStorage.getItem(EXPIRED_ACCESS_TOKEN_LOCAL));
                const timeout = expiredAt.getTime() - Date.now() - (60 * 1000);
                this.refreshTokenTimeout = setTimeout(this.refreshToken, timeout);
            } catch (err) {
                console.error(err);
            }
        },
        stopRefreshTokenTimer() {
            clearTimeout(this.refreshTokenTimeout);
        },
        async logout() {
            try {
                const [error, result] = await userService.logout();
                if (error) {
                    // Show toast error here
                    console.error(error);
                    return;
                }
                console.log(result);
                // Show toast notify here
                clearAuthFromLocalStorage();
                this.stopRefreshTokenTimer();
                this.isLoggedIn = false;
            } catch (err) {
                console.error(err);
            }
        }
    },
});

const checkIsTokenIsValid = (): boolean => {
    try {
        const accessToken = localStorage.getItem(ACCESS_TOKEN_LOCAL);
        const expiredAt = new Date(localStorage.getItem(EXPIRED_ACCESS_TOKEN_LOCAL));
        return !!accessToken && expiredAt <= new Date();
    } catch (err) {
        console.error(err);
        return false;
    }
}

const setAuthToLocalStorage = (token: TokenResponse) => {
    const expiredAt = new Date(token.expire_in * 1000);
    localStorage.setItem(ACCESS_TOKEN_LOCAL, token.access_token);
    localStorage.setItem(REFRESH_TOKEN_LOCAL, token.refresh_token);
    localStorage.setItem(EXPIRED_ACCESS_TOKEN_LOCAL, expiredAt.toISOString());
}

const clearAuthFromLocalStorage = () => {
    localStorage.removeItem(ACCESS_TOKEN_LOCAL);
    localStorage.removeItem(REFRESH_TOKEN_LOCAL);
    localStorage.removeItem(EXPIRED_ACCESS_TOKEN_LOCAL);
}

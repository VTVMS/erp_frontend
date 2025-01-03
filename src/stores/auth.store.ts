import moment from "moment";
import { defineStore } from 'pinia';
import {
    ACCESS_TOKEN_LOCAL,
    EXPIRED_ACCESS_TOKEN_LOCAL,
    REFRESH_TOKEN_LOCAL
} from "../common/const.ts";
import {LoginByEmailRequest, TokenResponse} from "../model/auth.model.ts";
import {authService} from "../services/auth.service.ts";
import {userService} from "../services/user.service.ts";
import router from "../router";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        isLoggedIn: false,
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
                    // this.stopRefreshTokenTimer();
                    return;
                }
                // Show toast notify here
                setAuthToLocalStorage(result);
                // this.startRefreshTokenTimer();
                await router.push('/profile');
                this.isLoggedIn = true;
            } catch (err) {
                // Show toast error here
                console.error(err);
                // this.stopRefreshTokenTimer();
                this.isLoggedIn = false;
            }
        },
        async refreshToken() {
            try {
                const [error, result] = await authService.refreshToken();
                if (error) {
                    // Show toast error here
                    console.error(error);
                    // this.stopRefreshTokenTimer();
                    return;
                }
                setAuthToLocalStorage(result);
                // this.startRefreshTokenTimer();
                this.isLoggedIn = true;
            } catch (err) {
                // Show toast error here
                console.error(err);
                clearAuthFromLocalStorage();
                // this.stopRefreshTokenTimer();
                this.isLoggedIn = false;
                await router.push('/login');
            }
        },
        // startRefreshTokenTimer() {
        //     try {
        //         const expiredAt = new Date(localStorage.getItem(EXPIRED_ACCESS_TOKEN_LOCAL));
        //         const timeout = expiredAt.getTime() - Date.now() - (60 * 1000);
        //         this.refreshTokenTimeout = setTimeout(this.refreshToken, timeout);
        //     } catch (err) {
        //         console.error(err);
        //     }
        // },
        // stopRefreshTokenTimer() {
        //     clearTimeout(this.refreshTokenTimeout);
        // },
        async logout() {
            try {
                const [error, _] = await userService.logout();
                if (error) {
                    // Show toast error here
                    console.error(error);
                    return;
                }
                // Show toast notify here
                clearAuthFromLocalStorage();
                // this.stopRefreshTokenTimer();
                this.isLoggedIn = false;
                await router.push('/login');
            } catch (err) {
                console.error(err);
            }
        },
        checkIsTokenIsValid() {
            try {
                const accessToken = localStorage.getItem(ACCESS_TOKEN_LOCAL);
                const expiredAt = moment.utc(localStorage.getItem(EXPIRED_ACCESS_TOKEN_LOCAL));
                const dateNow = moment().utc();
                const isExpiredTime = expiredAt.diff(dateNow, 'seconds');
                this.isLoggedIn = !!accessToken && isExpiredTime > 0;
            } catch (err) {
                console.error(err);
                clearAuthFromLocalStorage();
                this.isLoggedIn = false;
            }
        }
    },
});

const setAuthToLocalStorage = (token: TokenResponse) => {
    const expiredAt = moment().add(token.expire_in, 'seconds').format("DD-MM-YYYY HH:mm:ss");
    localStorage.setItem(ACCESS_TOKEN_LOCAL, token.access_token);
    localStorage.setItem(REFRESH_TOKEN_LOCAL, token.refresh_token);
    localStorage.setItem(EXPIRED_ACCESS_TOKEN_LOCAL, expiredAt);
}

const clearAuthFromLocalStorage = () => {
    localStorage.removeItem(ACCESS_TOKEN_LOCAL);
    localStorage.removeItem(REFRESH_TOKEN_LOCAL);
    localStorage.removeItem(EXPIRED_ACCESS_TOKEN_LOCAL);
}

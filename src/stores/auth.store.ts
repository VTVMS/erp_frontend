import { format, add, isBefore, formatISO } from 'date-fns';
import { defineStore } from 'pinia';
import { ACCESS_TOKEN_LOCAL, EXPIRED_ACCESS_TOKEN_LOCAL, REFRESH_TOKEN_LOCAL } from '../common/const.ts';
import { LoginByEmailRequest, TokenResponse } from '../model/auth.model.ts';
import { authService } from '../services/auth.service.ts';
import { userService } from '../services/user.service.ts';
import router from '../router';
import { useToast } from 'vue-toastification';
export const useAuthStore = defineStore('auth', {
    state: () => ({
        isLoggedIn: false,
        refreshTokenTimeout: null,
    }),
    actions: {
        async loginByEmail(payload: LoginByEmailRequest) {
            const toast = useToast();
            try {
                const [error, result] = await authService.loginByEmail(payload);
                if (error) {
                    if (error.status === 400) {
                        toast.error('Thông tin đăng nhập không đúng. Vui lòng kiểm tra lại!');
                    } else {
                        toast.error(`Đã xảy ra lỗi hệ thống`);
                    }
                    this.isLoggedIn = false;
                    return;
                }
                toast.success('Đăng nhập thành công!');
                setAuthToLocalStorage(result);
                // this.startRefreshTokenTimer();
                await router.push('/dashboards');
                this.isLoggedIn = true;
            } catch (err) {
                // Show toast error here
                toast.error(`Đã xảy ra lỗi hệ thông`);
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
                const expiredAt = formatISO(format(new Date(localStorage.getItem(EXPIRED_ACCESS_TOKEN_LOCAL)), 'dd/MM/yyyy HH:mm:ss'));
                const dateNow = formatISO(format(new Date(), 'dd/MM/yyyy HH:mm:ss'));
                const isExpiredTime = isBefore(expiredAt, dateNow);
                this.isLoggedIn = !!accessToken && isExpiredTime;
            } catch (err) {
                console.error(err);
                clearAuthFromLocalStorage();
                this.isLoggedIn = false;
            }
        },
    },
});

const setAuthToLocalStorage = (token: TokenResponse) => {
    const expiredAt = formatISO(format(add(new Date(), { seconds: token.expire_in }), 'dd/MM/yyyy HH:mm:ss'));
    localStorage.setItem(ACCESS_TOKEN_LOCAL, token.access_token);
    localStorage.setItem(REFRESH_TOKEN_LOCAL, token.refresh_token);
    localStorage.setItem(EXPIRED_ACCESS_TOKEN_LOCAL, expiredAt);
};

const clearAuthFromLocalStorage = () => {
    localStorage.removeItem(ACCESS_TOKEN_LOCAL);
    localStorage.removeItem(REFRESH_TOKEN_LOCAL);
    localStorage.removeItem(EXPIRED_ACCESS_TOKEN_LOCAL);
};

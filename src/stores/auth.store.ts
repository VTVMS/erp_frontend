import { DateTime } from "luxon";
import { defineStore } from 'pinia';
import { ACCESS_TOKEN_LOCAL, EXPIRED_ACCESS_TOKEN_LOCAL } from '../common/const.ts';
import { LoginByEmailRequest } from '../model/auth.model.ts';
import { authService } from '../services/auth.service.ts';
import { userService } from '../services/user.service.ts';
import router from '../router';
import { useToast } from 'vue-toastification';
import {clearAuthFromLocalStorage, setAuthToLocalStorage} from "../common/config.ts";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        isLoggedIn: false,
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
                        toast.error('Đã xảy ra lỗi hệ thống!');
                    }
                    this.isLoggedIn = false;
                    return;
                }
                toast.success('Đăng nhập thành công!');
                setAuthToLocalStorage(result);
                await router.push('/dashboards');
                this.isLoggedIn = true;
            } catch (err) {
                toast.error('Đã xảy ra lỗi hệ thống!');
                console.error(err);
                this.isLoggedIn = false;
            }
        },
        async refreshToken() {
            try {
                const [error, result] = await authService.refreshToken();
                if (error) {
                    // Show toast error here
                    console.error(error);
                    clearAuthFromLocalStorage();
                    this.isLoggedIn = false;
                    await router.push('/login');
                    return;
                }
                setAuthToLocalStorage(result);
                this.isLoggedIn = true;
            } catch (err) {
                // Show toast error here
                console.error(err);
                clearAuthFromLocalStorage();
                this.isLoggedIn = false;
                await router.push('/login');
            }
        },
        async logout() {
            try {
                const [error, _] = await userService.logout();
                if (error) {
                    // Show toast error here
                    console.error(error);
                    return;
                }
                clearAuthFromLocalStorage();
                this.isLoggedIn = false;
                await router.push('/login');
            } catch (err) {
                console.error(err);
            }
        },
        async checkIsTokenIsValid() {
            try {
                const accessToken = localStorage.getItem(ACCESS_TOKEN_LOCAL);
                const expiredLocalStorageTime = localStorage.getItem(EXPIRED_ACCESS_TOKEN_LOCAL);
                const dateNow = DateTime.now();
                const expiredAt = expiredLocalStorageTime ? DateTime.fromISO(expiredLocalStorageTime) : dateNow;
                const isValidToken = expiredAt > dateNow;

                if (!!accessToken && isValidToken) {
                    this.isLoggedIn = true;
                    return;
                }

                if (!!accessToken && !isValidToken) {
                    await this.refreshToken();
                    return;
                }

                this.isLoggedIn = false;
            } catch (err) {
                console.error(err);
                clearAuthFromLocalStorage();
                this.isLoggedIn = false;
            }
        },
    },
});

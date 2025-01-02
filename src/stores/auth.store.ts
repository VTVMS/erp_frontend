import { defineStore } from 'pinia';
import {EXPIRED_ACCESS_TOKEN_LOCAL} from "../common/const.ts";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        isLoggedIn: checkTokenIsValid(),
    }),
    actions: {
        async login() {
            this.isLoggedIn = true;
            localStorage.setItem('isLoggedIn', 'true');
        },
        logout() {
            this.isLoggedIn = false;
            localStorage.removeItem('isLoggedIn');
        },
        checkLogin() {
            this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        },
    },
});

const checkTokenIsValid = () => {
    const expire_time = localStorage.getItem(EXPIRED_ACCESS_TOKEN_LOCAL);

    return true;
}

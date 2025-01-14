import {ACCESS_TOKEN_LOCAL, EXPIRED_ACCESS_TOKEN_LOCAL, REFRESH_TOKEN_LOCAL} from "./const.ts";
import axios from "axios";
import {TokenResponse} from "../model/auth.model.ts";
import {DateTime} from "luxon";
import {authService} from "../services/auth.service.ts";

export const env = process.env.NODE_ENV;
export const is_env_dev = env !== 'staging' && env !== 'production';
export const BASE_URL = env === 'development' ? 'https://api-dev.uptoperp.vn/v1' : env === 'staging' ? '' : '';

export const axiosInstance = axios.create({
    baseURL: BASE_URL
});

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem(ACCESS_TOKEN_LOCAL);
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use((response) => {
    return response
}, async function (error) {
    const originalRequest = error.config;
    try {
        if (error.response.status === 401 && error.response.data.message === "TokenExpiredError" && !originalRequest._retry) {
            originalRequest._retry = true;
            const [error, newTokens] = await authService.refreshToken();
            if (error) {
                clearAuthFromLocalStorage();
                return Promise.reject(error);
            }

            axios.defaults.headers.common['Authorization'] = 'Bearer ' + newTokens.access_token;
            setAuthToLocalStorage(newTokens);
            return axiosInstance(originalRequest);
        }
    } catch (refreshError) {
        clearAuthFromLocalStorage();
        return Promise.reject(refreshError);
    }

    return Promise.reject(error);
});

export const setAuthToLocalStorage = (token: TokenResponse) => {
    const expiredAt = DateTime.now().set({second: token.expire_in});
    localStorage.setItem(ACCESS_TOKEN_LOCAL, token.access_token);
    localStorage.setItem(REFRESH_TOKEN_LOCAL, token.refresh_token);
    localStorage.setItem(EXPIRED_ACCESS_TOKEN_LOCAL, expiredAt.toISO());
};

export const clearAuthFromLocalStorage = () => {
    localStorage.removeItem(ACCESS_TOKEN_LOCAL);
    localStorage.removeItem(REFRESH_TOKEN_LOCAL);
    localStorage.removeItem(EXPIRED_ACCESS_TOKEN_LOCAL);
};

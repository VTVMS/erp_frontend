import { AxiosInstance } from 'axios';
import { LoginByEmailRequest, TokenResponse } from '../model/auth.model.ts';
import { REFRESH_TOKEN_LOCAL } from '../common/const.ts';
import { axiosInstance } from '../common/config.ts';

class AuthService {
    constructor(private httpClient: AxiosInstance) {}

    async loginByEmail(payload: LoginByEmailRequest): Promise<[null, TokenResponse] | [Error]> {
        try {
            const { data } = await this.httpClient.post<TokenResponse>(`/login_by_email`, { ...payload });
            return [null, data];
        } catch (error) {
            return [error];
        }
    }

    async refreshToken(): Promise<[null, TokenResponse] | [Error]> {
        try {
            const { data } = await this.httpClient.post<TokenResponse>(`/refresh_token`, { token: localStorage.getItem(REFRESH_TOKEN_LOCAL) });
            return [null, data];
        } catch (error) {
            return [error];
        }
    }
}

export const authService = new AuthService(axiosInstance);

import {AxiosInstance} from 'axios';
import {LoginByEmailRequest, TokenResponse} from "../model/auth.ts";
import {REFRESH_TOKEN_LOCAL} from "../common/const.ts";

export default class AuthService {
    constructor(private httpClient: AxiosInstance) {}

    async login_by_email({email, password}: LoginByEmailRequest): Promise<[null, TokenResponse] | [Error]> {
        try {
            const { data } = await this.httpClient.post<TokenResponse>(
                `/login_by_email`,
                { email, password },
            );
            return [null, data];
        } catch (error) {
            return [error];
        }
    }

    async refresh_token(): Promise<[null, TokenResponse] | [Error]> {
        try {
            const { data } = await this.httpClient.post<TokenResponse>(
                `/refresh_token`,
                { token: localStorage.getItem(REFRESH_TOKEN_LOCAL) },
            );
            return [null, data];
        } catch (error) {
            return [error];
        }
    }
}
export interface LoginByEmailRequest {
    email: string;
    password: string;
}

export interface TokenResponse {
    access_token: string;
    refresh_token: string;
    expire_in: number;
    type: string;
    token_type: string;
}

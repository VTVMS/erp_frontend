import {ACCESS_TOKEN_LOCAL} from "./const.ts";
import axios from "axios";

export const env = process.env.NODE_ENV;
export const is_env_dev = env !== 'staging' && env !== 'production';
export const BASE_URL = env === 'development' ? 'http://192.168.1.215:3000/v1' : env === 'staging' ? '' : '';

export const axios_instance = axios.create({
    baseURL: BASE_URL
});

export const auth_header = () => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_LOCAL);
    return {
        Authorization: `Bearer ${accessToken}`,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    };
}

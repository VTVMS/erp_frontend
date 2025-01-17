import { AxiosInstance } from 'axios';
import {
    AdminCreateNewUserRequest,
    AdminUpdateUserRequest,
    UpdateUserRequest,
    UserModel
} from '../model/user.model.ts';
import { axiosInstance } from '../common/config.ts';
import { MessageResponseModel } from '../model/msg_res.model.ts';

class UserService {
    constructor(private httpClient: AxiosInstance) {}

    async admin_create_new_user(payload: AdminCreateNewUserRequest): Promise<[null, UserModel] | [Error]> {
        try {
            const { data } = await this.httpClient.post<UserModel>(`/user/create`, { ...payload });
            return [null, data];
        } catch (error) {
            return [error];
        }
    }

    async admin_get_list_users(): Promise<[null, UserModel[]] | [Error]> {
        try {
            const { data } = await this.httpClient.get<UserModel[]>(`/user/list?page_num=0&page_size=20`);
            return [null, data];
        } catch (error) {
            return [error];
        }
    }

    async admin_update_user(user_uuid: string, payload: AdminUpdateUserRequest): Promise<[null, UserModel] | [Error]> {
        try {
            const { data } = await this.httpClient.put<UserModel>(`/user/update/${user_uuid}`, { ...payload });
            return [null, data];
        } catch (error) {
            return [error];
        }
    }

    async admin_delete_user(user_uuid: string): Promise<[null, MessageResponseModel] | [Error]> {
        try {
            const { data } = await this.httpClient.delete<MessageResponseModel>(`/user/delete/${user_uuid}`);
            return [null, data];
        } catch (error) {
            return [error];
        }
    }

    async get_profile(): Promise<[null, UserModel] | [Error]> {
        try {
            const { data } = await this.httpClient.get<UserModel>(`/me`);
            return [null, data];
        } catch (error) {
            return [error];
        }
    }

    async update_profile(updatedData: UpdateUserRequest): Promise<[null, UserModel] | [Error]> {
        try {
            const { data } = await this.httpClient.put<UserModel>(`/me`, updatedData);
            return [null, data];
        } catch (error) {
            return [error];
        }
    }

    async logout(): Promise<[null, MessageResponseModel] | [Error]> {
        try {
            const { data } = await this.httpClient.post<MessageResponseModel>(`/logout`, {});
            return [null, data];
        } catch (error) {
            return [error];
        }
    }
}

export const userService = new UserService(axiosInstance);

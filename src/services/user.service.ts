import { AxiosInstance } from 'axios';
import { AdminCreateNewUserRequest, UserModel } from '../model/user.model.ts';
import { axiosHeader, axiosInstance } from '../common/config.ts';
import { MessageResponseModel } from '../model/msg_res.model.ts';

class UserService {
    constructor(private httpClient: AxiosInstance) {}

    async admin_create_new_user(payload: AdminCreateNewUserRequest): Promise<[null, UserModel] | [Error]> {
        try {
            const { data } = await this.httpClient.post<UserModel>(`/admin/create_user`, { ...payload }, { headers: axiosHeader() });
            return [null, data];
        } catch (error) {
            return [error];
        }
    }

    async admin_get_list_users(): Promise<[null, UserModel[]] | [Error]> {
        try {
            const { data } = await this.httpClient.get<UserModel[]>(`/admin/list_users?page_num=0&page_size=20`, { headers: axiosHeader() });            
            return [null, data];
        } catch (error) {
            return [error];
        }
    }

    // async update_user(userId: string, payload: Partial<UserModel>): Promise<[null, UserModel] | [Error]> {
    //     try {
    //         const { data } = await this.httpClient.put<UserModel>(`/admin/edit/${userId}`, { ...payload }, { headers: axiosHeader() });
    //         return [null, data];
    //     } catch (error) {
    //         return [error];
    //     }
    // }
    
    // async delete_user(userId: string): Promise<[null, UserModel] | [Error]> {
    //     try {
    //         const { data } = await this.httpClient.delete<UserModel>(`/admin/delete/${userId}`, { headers: axiosHeader() });
    //         return [null, data];
    //     } catch (error) {
    //         return [error];
    //     }
    // }

    async get_profile(): Promise<[null, UserModel] | [Error]> {
        try {
            const { data } = await this.httpClient.get<UserModel>(`/me`, { headers: axiosHeader() });
            return [null, data];
        } catch (error) {
            return [error];
        }
    }

    async update_profile() {}

    async logout(): Promise<[null, MessageResponseModel] | [Error]> {
        try {
            const { data } = await this.httpClient.post<MessageResponseModel>(`/logout`, {}, { headers: axiosHeader() });
            return [null, data];
        } catch (error) {
            return [error];
        }
    }
}

export const userService = new UserService(axiosInstance);

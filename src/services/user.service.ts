import { AxiosInstance } from "axios";
import { AdminCreateNewUserRequest, UserModel } from "../model/user.model.ts";
import { axiosHeader, axiosInstance } from "../common/config.ts";
import { MessageResponseModel } from "../model/msg_res.model.ts";

class UserService {
    constructor(private httpClient: AxiosInstance) {}

    async admin_create_new_user(payload: AdminCreateNewUserRequest): Promise<[null, UserModel] | [Error]> {
        try {
            const { data } = await this.httpClient.post<UserModel>(
                `/admin/create`,
                { ...payload },
                { headers: axiosHeader() },
            );
            return [null, data];
        } catch (error) {
            return [error]
        }
    }

    async admin_get_list_users() {}

    async get_profile(): Promise<[null, UserModel] | [Error]> {
        try {
            const { data } = await this.httpClient.get<UserModel>(
                `/me`,
                { headers: axiosHeader() },
            );
            return [null, data];
        } catch (error) {
            return [error];
        }
    }

    // TODO: implement service update profile
    async update_profile() {}

    async logout(): Promise<[null, MessageResponseModel] | [Error]> {
        try {
            const { data } = await this.httpClient.get<MessageResponseModel>(
                `/logout`,
                { headers: axiosHeader() },
            );
            return [null, data];
        } catch (error) {
            return [error];
        }
    }
}

export const userService = new UserService(axiosInstance);

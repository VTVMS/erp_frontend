import {AxiosInstance} from "axios";
import {axiosInstance} from "../common/config.ts";
import {AdminCreateNewRoleRequest, RoleModel} from "../model/role.model.ts";

class RoleService {
    constructor(private httpClient: AxiosInstance) {}

    async admin_create_new_role(payload: AdminCreateNewRoleRequest): Promise<[null, RoleModel] | [Error]> {
        try {
            const { data } = await this.httpClient.post<RoleModel>(`/role/create`, { ...payload });
            return [null, data];
        } catch (error) {
            return [error];
        }
    }

    async admin_get_list_roles(): Promise<[null, RoleModel[]] | [Error]> {
        try {
            const { data } = await this.httpClient.get<RoleModel[]>(`/role/list?page_num=0&page_size=20`);
            return [null, data];
        } catch (error) {
            return [error];
        }
    }
}

export const roleService = new RoleService(axiosInstance);

import { AxiosInstance } from 'axios';
import { DepartmentModel, CreateNewDepartmantRequest, UpdateDepartmantRequest } from '../model/departmant.model.ts';
import { axiosInstance } from '../common/config.ts';
import { MessageResponseModel } from '../model/msg_res.model.ts';

class DepartmantService {
    constructor(private httpClient: AxiosInstance) {}

    async get_list_departmant(): Promise<[null, DepartmentModel[]] | [Error]> {
        try {
            const { data } = await this.httpClient.get<DepartmentModel[]>(`/department/list?page_num=0&page_size=20`);
            return [null, data];
        } catch (error) {
            return [error];
        }
    }

    async create_new_department(payload: CreateNewDepartmantRequest): Promise<[null, DepartmentModel] | [Error]> {
        try {
            const { data } = await this.httpClient.post<DepartmentModel>(`/department/create`, { ...payload });
            console.log(data);

            return [null, data];
        } catch (error) {
            return [error];
        }
    }
    async update_department(department_uuid: string, payload: UpdateDepartmantRequest): Promise<[null, DepartmentModel] | [Error]> {
        try {
            const { data } = await this.httpClient.put<DepartmentModel>(`/department/update/${department_uuid}`, { ...payload });            
            return [null, data];
        } catch (error) {
            return [error];
        }
    }

    async delete_department(department_uuid: string): Promise<[null, DepartmentModel] | [Error]> {
        try {
            const { data } = await this.httpClient.put<DepartmentModel>(`/department/delete/${department_uuid}`);
            return [null, data];
        } catch (error) {
            return [error];
        }
    }
}

export const departmantService = new DepartmantService(axiosInstance);

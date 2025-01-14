import { AxiosInstance } from 'axios';
import { DepartmentModel } from '../model/departmant.model.ts';
import { axiosHeader, axiosInstance } from '../common/config.ts';

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
}

export const departmantService = new DepartmantService(axiosInstance);

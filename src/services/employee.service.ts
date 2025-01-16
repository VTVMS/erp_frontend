import {AxiosInstance} from "axios";
import {axiosInstance} from "../common/config.ts";
import {EmployeeModel} from "../model/employee.model.ts";

class EmployeeService {
    constructor(private httpClient: AxiosInstance) {}

    async create_new_employee(): Promise<[null, EmployeeModel] | [Error]> {
        try {
            const { data } = await this.httpClient.post<EmployeeModel>(`/employee/create`);
            return [null, data];
        } catch (error) {
            return [error];
        }
    }

    async get_list_employees(): Promise<[null, EmployeeModel[]] | [Error]> {
        try {
            const { data } = await this.httpClient.get<EmployeeModel[]>(`/employee/list`);
            return [null, data];
        } catch (error) {
            return [error];
        }
    }

    async update_employee(): Promise<[null, EmployeeModel] | [Error]> {
        try {
            const { data } = await this.httpClient.post<EmployeeModel>(`/employee/update`);
            return [null, data];
        } catch (error) {
            return [error];
        }
    }

    async delete_employee(): Promise<[null, EmployeeModel] | [Error]> {
        try {
            const { data } = await this.httpClient.post<EmployeeModel>(`/employee/delete`);
            return [null, data];
        } catch (error) {
            return [error];
        }
    }
}

export const employeeService = new EmployeeService(axiosInstance);

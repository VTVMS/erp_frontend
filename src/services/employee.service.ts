import {AxiosInstance} from "axios";
import {axiosInstance} from "../common/config.ts";
import {CreateNewEmployeeRequest, EmployeeModel, UpdateEmployeetRequest} from "../model/employee.model.ts";

class EmployeeService {
    constructor(private httpClient: AxiosInstance) {}

    async create_new_employee(payload: CreateNewEmployeeRequest): Promise<[null, EmployeeModel] | [Error]> {
        try {
            const { data } = await this.httpClient.post<EmployeeModel>(`/employee/new`, { ...payload });
            return [null, data];
        } catch (error) {
            return [error];
        }
    }

    async get_list_employees(pay ): Promise<[null, EmployeeModel[]] | [Error]> {
        try {
            const { data } = await this.httpClient.get<EmployeeModel[]>(`/employee/list`);
            return [null, data];
        } catch (error) {
            return [error];
        }
    }

    async update_employee(): Promise<[null, UpdateEmployeetRequest] | [Error]> {
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

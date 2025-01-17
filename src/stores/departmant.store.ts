import { defineStore } from 'pinia';
import { useToast } from 'vue-toastification';
import { departmantService } from '../services/department.service.ts';
import {CreateNewDepartmantRequest, DepartmentModel} from '../model/departmant.model.ts';

export const useDepartmentStore = defineStore('department', {
    state: () => ({
        departmentList: [] as DepartmentModel[],
        error: null as string | null,
        isLoading: false,
    }),
    actions: {
        // list of users
        async listDepartments() {
            this.isLoading = true;
            this.error = null;

            try {
                const [error, result] = await departmantService.get_list_departmant();
                if (error) {
                    this.error = 'Failed to user list';
                    this.isLoading = false;
                    console.error(error);
                    return;
                }
                this.departmentList = result.data.reverse();
                console.log( this.departmentList);
                
                this.error = null;
                this.isLoading = false;
            } catch (err) {
                this.error = 'An unexpected error occurred';
                console.error(err);
            } finally {
                this.isLoading = false;
                this.error = null;
            }
        },
        async createDepartment(payload: CreateNewDepartmantRequest) {
            const toast = useToast();
            this.isLoading = true;
            this.error = null;
            try {
                const [error, result] = await departmantService.create_new_department(payload);
                if (error) {
                    this.error = 'Failed to create user';
                    console.error(error);
                    toast.error('Thông tin tài khoản không đúng. Vui lòng kiểm tra lại!');
                } else {
                    this.departmentList.unshift(result.data);
                    this.error = null;
                    this.isLoading = false;
                }
            } finally {
                this.isLoading = false;
                this.error = null;
            }
        },
    },
});

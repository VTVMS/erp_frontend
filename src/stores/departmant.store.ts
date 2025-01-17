import { defineStore } from 'pinia';
import { useToast } from 'vue-toastification';
import { departmentService } from '../services/department.service.ts';
import { CreateNewDepartmentRequest } from '../model/departmant.model.ts';

export const departmantStore = defineStore('department', {
    state: () => ({
        departmentList: [] as [],
        error: null as string | null,
        isLoading: false,
    }),
    actions: {
        // list of users
        async listDepartment() {
            this.isLoading = true;
            this.error = null;

            try {
                const [error, result] = await departmentService.get_list_departmant();
                if (error) {
                    this.error = 'Failed to user list';
                    this.isLoading = false;
                    console.error(error);
                    return;
                }
                this.departmentList = result.data.reverse();
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
        async createDepartment(payload: CreateNewDepartmentRequest) {
            const toast = useToast();
            this.isLoading = true;
            this.error = null;
            try {
                const [error, result] = await departmentService.create_new_department(payload);
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
        async deleteDepartment(uuid: string) {
            const toast = useToast();
            this.isLoading = true;
            this.error = null;

            try {
                const [error] = await departmentService.delete_department(uuid);
                if (error) {
                    this.error = 'Không thể xóa phòng ban.';
                    console.error(error);
                    toast.error('Không thể xóa phòng ban. Vui lòng thử lại!');
                    return;
                }
                this.departmentList = this.departmentList.filter(
                    (department) => department.uuid !== uuid
                );
                toast.success('Xóa phòng ban thành công!');
            } catch (err) {
                this.error = 'Đã xảy ra lỗi khi xóa phòng ban.';
                console.error(err);
                toast.error(this.error);
            } finally {
                this.isLoading = false;
            }
        },
    },
});

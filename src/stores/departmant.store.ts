import { defineStore } from 'pinia';
import { useToast } from 'vue-toastification';
import { departmantService } from '../services/department.service.ts';

export const departmantStore = defineStore('department', {
    state: () => ({
        departmentList: [] as [],
        error: null as string | null,
        isLoading: false,
    }),
    actions: {
        // list of users
        async listUsers() {
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
                this.userList = result.data.reverse();
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
    },
});

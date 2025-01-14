import {defineStore} from "pinia";
import {RoleModel} from "../model/role.model.ts";
import {roleService} from "../services/role.service.ts";

export const useRoleStore = defineStore('role', {
    state: () => ({
        roles: [] as RoleModel[],
        error: null as string | null,
        isLoading: false,
    }),
    actions: {
        async listRoles() {
            if(this.isLoading) return;
            this.isLoading = true;
            this.error = null;
            try {
                const [error, result] = await roleService.admin_get_list_roles();
                if (error) {
                    this.error = 'Failed to get role list';
                    this.isLoading = false;
                    console.error(error);
                    return;
                }
                this.roles = result.data.reverse();
                this.error = null;
                this.isLoading = false;
            } finally {
                this.isLoading = false;
                this.error = null;
            }
        },
    },
});

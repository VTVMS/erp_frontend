import { defineStore } from 'pinia';
import { userService } from '../services/user.service.ts';
import { UserModel, AdminCreateNewUserRequest } from '../model/user.model.ts';
import { object } from '@amcharts/amcharts5';

export const useUserStore = defineStore('user', {
    state: () => ({
        userList: [] as UserModel[],
        error: null as string | null,
        isLoading: false,
    }),
    actions: {
        // list of users
        async listUsers() {
            this.isLoading = true;
            this.error = null;
            try {
                const [error, result] = await userService.admin_get_list_users();
                if (error) {
                    this.error = 'Failed to user list';
                    console.error(error);
                } else {
                    console.log(result.data);

                    this.userList = result.data;
                    this.userList.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                    this.error = null;
                    this.isLoading = false;
                }
            } finally {
                this.isLoading = false;
                this.error = null;
            }
        },

        async createUser(payload: AdminCreateNewUserRequest) {
            this.isLoading = true;
            this.error = null;
            try {
                const [error, result] = await userService.admin_create_new_user(payload);
                if (error) {
                    this.error = 'Failed to create user';
                    console.error(error);
                } else {
                    this.userList.unshift(result);
                    this.error = null;
                    this.isLoading = false;
                }
            } finally {
                this.isLoading = false;
                this.error = null;
            }
        },
        async deleteUser(user_uuid: string) {
            this.isLoading = true;
            this.error = null;
            try {
                const [error, result] = await userService.admin_delete_user(user_uuid);
                console.log(result,'result');
                
                if (error) {
                    this.error = 'Failed to delete user';
                    console.error(error);
                } else {
                    // this.userList = this.userList.filter((user) => user.user_uuid !== user_uuid);
                    this.userList = this.userList.map((user) => {
                        if (user.user_uuid === user_uuid) {
                            return Object.assign({},result);
                        }
                        
                        return Object.assign({},user);;
                    });
                    console.log(this.userList);
                    this.error = null;
                }
            } catch (err) {
                this.error = 'An unexpected error occurred';
                console.error(err);
            } finally {
                this.isLoading = false;
            }
        },
    },
});
// map -> if user.uuid === user_uuid -> return result else user 
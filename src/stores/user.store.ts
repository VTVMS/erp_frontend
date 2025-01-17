import { defineStore } from 'pinia';
import { userService } from '../services/user.service.ts';
import {UserModel, AdminCreateNewUserRequest, AdminUpdateUserRequest} from '../model/user.model.ts';
import { useToast } from 'vue-toastification';

export const useUserStore = defineStore('user', {
    state: () => ({
        userList: [] as UserModel[],
        error: null as string | null,
        isLoading: false,
    }),
    actions: {
        async listUsers() {
            this.isLoading = true;
            this.error = null;

            try {
                const [error, result] = await userService.admin_get_list_users();
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
        async createUser(payload: AdminCreateNewUserRequest) {
            const toast = useToast();
            this.isLoading = true;
            this.error = null;
            try {
                const [error, result] = await userService.admin_create_new_user(payload);
                if (error) {
                    this.error = 'Failed to create user';
                    console.error(error);
                    toast.error('Thông tin tài khoản không đúng. Vui lòng kiểm tra lại!');
                } else {
                    this.userList.unshift(result.data);
                    this.error = null;
                    this.isLoading = false;
                }
            } finally {
                this.isLoading = false;
                this.error = null;
            }
        },
        async updateUser(user_uuid: string, payload: AdminUpdateUserRequest) {
            const toast = useToast();
            this.isLoading = true;
            this.error = null;
            try {
                const [error, result] = await userService.admin_update_user(user_uuid, payload);
                if (error) {
                    this.error = 'Failed to update user';
                    console.error(error);
                    toast.error('Thông tin tài khoản không đúng. Vui lòng kiểm tra lại!');
                } else {
                    this.userList = this.userList.map((user) => {
                        if (user.user_uuid === user_uuid) {
                            return Object.assign({}, result.data);
                        }

                        return Object.assign({}, user);
                    });
                    this.error = null;
                    this.isLoading = false;
                }
            } finally {
                this.isLoading = false;
                this.error = null;
            }
        },
        async handleStatusAccountOfUser(user_uuid: string, payload: AdminUpdateUserRequest) {
            const toast = useToast();
            this.isLoading = true;
            this.error = null;
            try {
                const [error, result] = await userService.admin_update_user(user_uuid, payload);
                if (error) {
                    this.error = 'Failed to update status of user';
                    console.error(error);
                    toast.error('Thông tin tài khoản không đúng. Vui lòng kiểm tra lại!');
                } else {
                    this.userList = this.userList.map((user) => {
                        if (user.user_uuid === user_uuid) {
                            return Object.assign({}, result.data);
                        }

                        return Object.assign({}, user);
                    });
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
                if (error) {
                    this.error = 'Failed to delete user';
                    console.error(error);
                } else {
                    this.userList = this.userList.map((user) => {
                        if (user.user_uuid === user_uuid) {
                            return Object.assign({}, result);
                        }

                        return Object.assign({}, user);
                    });
                    this.error = null;
                    this.isLoading = false;
                }
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

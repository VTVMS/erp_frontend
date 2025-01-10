import { defineStore } from 'pinia';
import { userService } from '../services/user.service.ts';
import { UserModel } from '../model/user.model.ts';
import { useToast } from 'vue-toastification';

export const useProfileStore = defineStore('profile', {
    state: () => ({
        profile: {} as UserModel[],
        error: null as string | null,
        isLoading: false,
    }),
    actions: {
        async profileUsers() {
            this.isLoading = true;
            this.error = null;
            try {
                const [error, result] = await userService.get_profile();
                if (error) {
                    this.error = 'Failed to user list';
                    this.isLoading = false;
                    console.error(error);
                    return;
                }
                this.profile = result;
                this.error = null;
                this.isLoading = false;
            } finally {
                this.isLoading = false;
                this.error = null;
            }
        },
        async updateUser(updatedData: UserModel) {
            const toast = useToast();
            this.isLoading = true;
            this.error = null;
            try {
                const [error] = await userService.update_profile(updatedData);
                if (error) {
                    this.error = 'Failed to update user profile';
                    toast.error('Thông tin cập nhật không đúng định dạng. Vui lòng kiểm tra lại!');
                    console.error(error);
                } else {
                    toast.success('Cập nhật thông tin thành công!');
                    await this.profileUsers();
                    this.error = null;
                    this.isLoading = false;
                }
            } catch (err) {
                this.error = 'An unexpected error occurred while updating profile';
                console.error(err);
            } finally {
                this.isLoading = false;
                this.error = null;
            }
        },
    },
});

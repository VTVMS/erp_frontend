import { defineStore } from 'pinia';
import { useToast } from 'vue-toastification';
import { ChannelModel, CreateNewChannelRequest } from '../model/channel.model.ts';
import { channelService } from '../services/channel.service.ts';

export const ChannelStore = defineStore('department', {
    state: () => ({
        channelList: [] as ChannelModel[],
        error: null as string | null,
        isLoading: false,
    }),
    actions: {
        // list of users
        async listChannel() {
            this.isLoading = true;
            this.error = null;

            try {
                const [error, result] = await channelService.get_list_channel();
                if (error) {
                    this.error = 'Failed to user list';
                    this.isLoading = false;
                    console.error(error);
                    return;
                }
                console.log(this.channelList);
                
                this.channelList = result.data.reverse();
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
        async createChannel(payload: CreateNewChannelRequest) {
            const toast = useToast();
            this.isLoading = true;
            this.error = null;
            try {
                const [error, result] = await channelService.create_new_channel(payload);
                if (error) {
                    this.error = 'Failed to create user';
                    console.error(error);
                    toast.error('Thông tin tài khoản không đúng. Vui lòng kiểm tra lại!');
                } else {
                    this.channelList.unshift(result.data);
                    this.error = null;
                    this.isLoading = false;
                }
            } finally {
                this.isLoading = false;
                this.error = null;
            }
        },
        // async updateDepartment(department_uuid: string, payload: UpdateDepartmantRequest) {
        //     const toast = useToast();
        //     this.isLoading = true;
        //     this.error = null;

        //     // Kiểm tra dữ liệu đầu vào (payload)
        //     console.log('Updating department with payload:', payload);

        //     try {
        //         const [error, result] = await departmantService.update_department(department_uuid, payload);

        //         // Kiểm tra đầu ra của API response
        //         console.log('API Response Data:', result);

        //         if (error) {
        //             this.error = 'Failed to update user';
        //             console.error(error);
        //             toast.error('Thông tin tài khoản không đúng. Vui lòng kiểm tra lại!');
        //         } else {
        //             this.departmentList = this.departmentList.map((department) => {
        //                 if (department.department_uuid === department_uuid) {
        //                     console.log('Updating department:', department);
        //                     department = { ...department, ...result.data };
        //                 }
        //                 return department;
        //             });
        //             this.error = null;
        //             this.isLoading = false;
        //         }
        //     } catch (e) {
        //         console.error('Error occurred during update:', e);
        //         toast.error('Có lỗi xảy ra trong quá trình cập nhật!');
        //     } finally {
        //         this.isLoading = false;
        //         this.error = null;
        //     }
        // },
        // async deleteDepartment(department_uuid: string) {
        //     this.isLoading = true;
        //     this.error = null;
        //     try {
        //         const [error, result] = await departmantService.delete_department(department_uuid);
        //         if (error) {
        //             this.error = 'Failed to delete user';
        //             console.error(error);
        //         } else {
        //             this.departmentList = this.departmentList.map((department) => {
        //                 if (department.department_uuid === department_uuid) {
        //                     return Object.assign({}, result);
        //                 }
        //                 return Object.assign({}, department);
        //             });
        //             this.error = null;
        //             this.isLoading = false;
        //         }
        //     } catch (err) {
        //         this.error = 'An unexpected error occurred';
        //         console.error(err);
        //     } finally {
        //         this.isLoading = false;
        //         this.error = null;
        //     }
        // },
    },
});

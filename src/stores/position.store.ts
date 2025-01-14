import { defineStore } from 'pinia';
import { useToast } from 'vue-toastification';
import { positionService } from '../services/position.service';

export const positionStore = defineStore('user', {
    state: () => ({
        positionList: [] as [],
        error: null as string | null,
        isLoading: false,
    }),
    actions: {
        // list of users
        async listPosition() {
            this.isLoading = true;
            this.error = null;

            try {
                const [error, result] = await positionService.get_list_position();
                if (error) {
                    this.error = 'Failed to user list';
                    this.isLoading = false;
                    console.error(error);
                    return;
                }
                this.positionList = result.data.reverse();
                console.log(this.positionList);
                
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

import { defineStore } from 'pinia';
import { positionService } from '../services/position.service';
import {
    CreateNewPositionRequest,
    PositionModel,
    UpdatePositionRequest
} from "../model/position.model.ts";

export const usePositionStore = defineStore('position', {
    state: () => ({
        positionList: [] as PositionModel[],
        error: null as string | null,
        isLoading: false,
    }),
    actions: {
        async listPositions() {
            this.isLoading = true;
            this.error = null;
            try {
                const [error, result] = await positionService.get_list_positions();
                if (error) {
                    this.error = 'Failed to position list';
                    this.isLoading = false;
                    console.error(error);
                    return;
                }
                this.positionList = result.data.reverse();
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
        async createPosition(payload: CreateNewPositionRequest) {
            this.isLoading = true;
            this.error = null;
            try {
                console.log(payload);
                const [error, result] = await positionService.create_new_position(payload);
                if (error) {
                    this.error = 'Failed to create new position';
                    console.error(error);
                } else {
                    this.positionList.unshift(result.data);
                    this.error = null;
                    this.isLoading = false;
                }
            } finally {
                this.isLoading = false;
                this.error = null;
            }
        },
        async updatePosition(position_uuid: string, payload: UpdatePositionRequest) {
            this.isLoading = true;
            this.error = null;
            try {
                const [error, result] = await positionService.update_position(position_uuid, payload);
                if (error) {
                    this.error = 'Failed to update position';
                    console.error(error);
                } else {
                    this.positionList = this.positionList.map((item) => {
                        if (item.position_uuid === position_uuid) {
                            return Object.assign({}, result.data);
                        }

                        return Object.assign({}, item);
                    });
                    this.error = null;
                    this.isLoading = false;
                }
            } finally {
                this.isLoading = false;
                this.error = null;
            }
        },
        async deletePosition(position_uuid: string) {
            this.isLoading = true;
            this.error = null;
            try {
                const [error, _] = await positionService.delete_position(position_uuid);
                if (error) {
                    this.error = 'Failed to delete position';
                    console.error(error);
                } else {
                    this.positionList = this.positionList.map((item) => {
                        if (item.position_uuid === position_uuid) {
                            return;
                        }

                        return Object.assign({}, item);
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

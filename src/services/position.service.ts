import { AxiosInstance } from 'axios';
import { axiosInstance } from '../common/config.ts';
import {
    CreateNewPositionRequest,
    PositionModel,
    UpdatePositionRequest
} from '../model/position.model.ts';

class PositionService {
    constructor(private httpClient: AxiosInstance) {}

    async create_new_position(payload: CreateNewPositionRequest): Promise<[null, PositionModel] | [Error]> {
        try {
            const { data } = await this.httpClient.post<PositionModel>(`/position/create`, { ...payload });
            return [null, data];
        } catch (error) {
            return [error];
        }
    }

    async get_list_positions(): Promise<[null, PositionModel[]] | [Error]> {
        try {
            const { data } = await this.httpClient.get<PositionModel[]>(`/position/list?page_num=0&page_size=20`);            
            return [null, data];
        } catch (error) {
            return [error];
        }
    }

    async update_position(position_uuid: string, payload: UpdatePositionRequest): Promise<[null, PositionModel] | [Error]> {
        try {
            const { data } = await this.httpClient.put<PositionModel>(`/position/update/${position_uuid}`, { ...payload });
            return [null, data];
        } catch (error) {
            return [error];
        }
    }

    async delete_position(position_uuid: string): Promise<[null, PositionModel] | [Error]> {
        try {
            const { data } = await this.httpClient.put<PositionModel>(`/position/delete/${position_uuid}`);
            return [null, data];
        } catch (error) {
            return [error];
        }
    }
}

export const positionService = new PositionService(axiosInstance);

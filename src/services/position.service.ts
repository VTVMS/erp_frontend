import { AxiosInstance } from 'axios';
import { axiosHeader, axiosInstance } from '../common/config.ts';
import { PositionModel } from '../model/position.model.ts';

class PositiontService {
    constructor(private httpClient: AxiosInstance) {}

    async get_list_position(): Promise<[null, PositionModel[]] | [Error]> {
        try {
            const { data } = await this.httpClient.get<PositionModel[]>(`/position/list?page_num=0&page_size=20`);            
            return [null, data];
        } catch (error) {
            return [error];
        }
    }
}

export const positionService = new PositiontService(axiosInstance);

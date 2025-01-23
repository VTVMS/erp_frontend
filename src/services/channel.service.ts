import { AxiosInstance } from 'axios';
import { axiosInstance } from '../common/config.ts';
import { ChannelModel, CreateNewChannelRequest, UpdateChannelRequest } from '../model/channel.model.ts';

class ChannelService {
    constructor(private httpClient: AxiosInstance) {}

    async get_list_channel(): Promise<[null, ChannelModel[]] | [Error]> {
        try {
            const { data } = await this.httpClient.get<ChannelModel[]>(`/channel/list?page_num=0&page_size=20`);
            return [null, data];
        } catch (error) {
            return [error];
        }
    }

    async create_new_channel(payload: CreateNewChannelRequest): Promise<[null, ChannelModel] | [Error]> {
        try {
            const { data } = await this.httpClient.post<ChannelModel>(`/channel/new`, { ...payload });
            return [null, data];
        } catch (error) {
            return [error];
        }
    }
    async update_channel(channel_uuid: string, payload: UpdateChannelRequest): Promise<[null, ChannelModel] | [Error]> {
        try {
            const { data } = await this.httpClient.put<ChannelModel>(`/channel/update/${channel_uuid}`, { ...payload });
            return [null, data];
        } catch (error) {
            return [error];
        }
    }

    async delete_channel(channel_uuid: string): Promise<[null, ChannelModel] | [Error]> {
        try {
            const { data } = await this.httpClient.put<ChannelModel>(`/channel/delete/${channel_uuid}`);
            return [null, data];
        } catch (error) {
            return [error];
        }
    }
}

export const channelService = new ChannelService(axiosInstance);

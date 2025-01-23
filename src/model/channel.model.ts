export interface CreateNewChannelRequest {
    description?: string;
    name?: string;
}
export interface UpdateChannelRequest {
    description?: string;
    name?: string;
}

export class ChannelModel {
    create_at!: string;
    description?: string;
    channel_uuid!: string;
    name?: string;
    organization_name?: string;
    organization_uuid?: string;
    status!: number;
    updated_at!: string;
}

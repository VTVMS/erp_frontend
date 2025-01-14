export interface CreateNewPositionRequest {
    description: string;
    image_url: string;
    name: string;
    // organization_uuid: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}

export class PositionModel {
    create_at!: string;
    department_name?: string;
    department_uuid?: string;
    description?: string;
    name?: string;
    position_uuid?: string;
    updated_at!: string;
}

export interface CreateNewPositionRequest {
    department_uuid: string,
    name: string,
    position_code: string,
    description?: string,
}

export interface UpdatePositionRequest {
    description?: string,
    name?: string,
}

export class PositionModel {
    department_name!: string;
    department_uuid!: string;
    description?: string;
    name!: string;
    position_uuid!: string;
    position_code!: string;
    updated_at!: string;
}

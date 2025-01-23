export interface CreateNewDepartmantRequest {
    department_code: string;
    description: string;
    image_url: string;
    name: string;
    organization_uuid: string;
}
export interface UpdateDepartmantRequest {
    department_code?: string;
    description?: string;
    name?: string;
}

export class DepartmentModel {
    create_at!: string;
    department_code?: string;
    department_uuid!: string;
    description?: string;
    image_url?: string;
    name?: string;
    quantity!: number;
    updated_at!: string;
}

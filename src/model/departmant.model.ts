export interface CreateNewDepartmantRequest {
    description: string;
    image_url: string;
    name: string;
    // organization_uuid: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
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


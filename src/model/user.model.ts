export interface AdminCreateNewUserRequest {
    email: string,
    password: string,
    full_name: string,
    picture?: string,
    gender?: string,
    phone_number?: string,
    address?: string,
    language?: string,
    status?: number,
    role_id: string,
    is_create_new_employee: boolean,
}

export class UserModel {
    user_id!: string;
    email!: string;
    full_name!: string;
    gender?: string;
    phone_number?: string;
    address?: string;
    language?: string;
    status!: number;
    role_id!: number;
    last_login?: string;
    created_at!: string;
    updated_at!: string;
    deleted_at!: string;
}


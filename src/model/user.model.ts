import {RoleModel} from "./role.model.ts";

export interface AdminCreateNewUserRequest {
    email: string;
    password: string;
    full_name: string;
    picture?: string;
    gender?: string;
    phone_number?: string;
    address?: string;
    language?: string;
    status?: number;
    role_uuid: string;
}

export interface AdminUpdateUserRequest {
    full_name?: string;
    password?: string;
    picture?: string;
    gender?: string;
    phone_number?: string;
    address?: string;
    language?: string;
    status?: number;
    role_uuid?: string;
}

export interface UpdateUserRequest {
    full_name?: string;
    picture?: string;
    gender?: string;
    phone_number?: string;
    address?: string;
    language?: string;
}

export class UserModel {
    user_uuid!: string;
    email!: string;
    full_name!: string;
    gender?: string;
    phone_number?: string;
    address?: string;
    language?: string;
    status!: number;
    role?: RoleModel;
    last_login?: string;
    created_at!: string;
    updated_at!: string;
    deleted_at!: string;
}

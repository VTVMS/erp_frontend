import {BaseClass} from "./base_class.ts";

export class UserModel extends BaseClass {
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

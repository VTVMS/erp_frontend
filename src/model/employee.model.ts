export class DepartmentOfEmployeeModel {
    department_uuid!: string;
    department_name!: string;
}

export class PositionOfEmployeeModel {
    position_uuid!: string;
    position_name!: string;
}

export class EmployeeModel {
    user_uuid!: string;
    full_name!: string;
    gender?: string;
    phone_number?: string;
    address?: string;
    department!: DepartmentOfEmployeeModel;
    position!: PositionOfEmployeeModel;
    created_at!: string;
    updated_at!: string;
}

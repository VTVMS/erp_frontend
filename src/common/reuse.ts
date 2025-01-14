
export const roleName = {
    "super_admin": "Super Admin",
    "admin": "Admin",
    "manager": "Manager",
    "member": "Member",
};

export const getKeyByValue = (object, value) => {
    return Object.keys(object).find(key => object[key] === value);
}

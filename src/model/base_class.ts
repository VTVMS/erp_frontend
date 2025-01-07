import { plainToInstance } from 'class-transformer';

export class BaseClass {
    static create<T>(this: new () => T, plainObject: Partial<T>) {
        return plainToInstance(this, plainObject) as T;
    }
}

function isEmpty(obj: object) {
    for (const prop in obj) {
        if (Object.hasOwn(obj, prop)) {
            return false;
        }
    }

    return true;
}

export function isEmptyObject(value: any) {
    if (value == null) {
        return true;
    }

    if (typeof value !== 'object') {
        return true;
    }

    // consider `Object.create(null)`, commonly used as a safe map
    // before `Map` support, an empty object as well as `{}`
    const proto = Object.getPrototypeOf(value);
    if (proto !== null && proto !== Object.prototype) {
        return true;
    }

    return isEmpty(value);
}

export function swap(arr: any[], from: number, to: any) {
    arr.splice(from, 1, arr.splice(to, 1, arr[from])[0]);
}

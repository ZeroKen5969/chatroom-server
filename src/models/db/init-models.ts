import { User as _User } from "./user";

export function initModels() {
    const User = _User.initModel();

    return {
        User,
    };
}
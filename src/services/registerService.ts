import httpStatus from "http-status";
import { models } from "../models/models";
import { ILonginUser } from "../models/viewModel/user";
import { ApiError } from "../utils/error";
import { hash } from "bcryptjs";

const passwordSalt = 8;

class RegisterService {

    async signUp(data: ILonginUser) {
        const str = await hash(data.password, passwordSalt);

        const user = new models.User({
            name: data.name,
            hash: str
        });

        try {
            await user.save();
        } catch(e) {
            throw new ApiError(httpStatus.BAD_REQUEST, "user or password error", e);
        }
    }
}

export const registerService = new RegisterService();
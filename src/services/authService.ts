import { compare } from "bcryptjs";
import { models } from "../models/models";
import { ILonginUser } from "../models/viewModel/user";
import { tokenService } from "./tokenService";
import { ApiError } from "../utils/error";
import httpStatus from "http-status";

class AuthService {
    async login(data: ILonginUser) {
        const user = await models.User.findOne({
            name: data.name
        });

        if (!user || !await compare(data.password, user.hash)) {
            throw new ApiError(httpStatus.BAD_REQUEST, "user or password error");
        }

        const tokenObj = tokenService.generateAuthTokens({
            name: user.name,
        });

        return tokenObj.token;
    }
}

export const authService = new AuthService();
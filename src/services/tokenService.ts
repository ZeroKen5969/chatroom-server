import moment from "moment";
import httpStatus from "http-status";
import { sign, verify } from "jsonwebtoken";
import { IUser } from "../models/viewModel/user";
import { ApiError } from "../utils/error";

class TokenService {
    verifyToken(token: string, secret = process.env.JWT_SECRET) {
        try {
            verify(token, secret);
        } catch (e) {
            throw new ApiError(httpStatus.UNAUTHORIZED, (e as Error).message, e);
        }
    }
    
    generateToken(user: IUser, expires: moment.Moment, secret = process.env.JWT_SECRET) {
        const payload = {
            sub: user,
            iat: moment().unix(),
            exp: expires.unix(),
            type: "access",
        };
        return sign(payload, secret);
    }

    generateAuthTokens(user: IUser) {
        const expires = moment().add(process.env.JWT_ACCESS_EXPIRATION_MINUTES, "minutes");
        const token = this.generateToken(user, expires);

        return {
            token,
            expires
        };
    }
}

export const tokenService = new TokenService();

import { Request } from "express";
import { tokenService } from "../services/tokenService";
import { ApiError } from "../utils/error";
import httpStatus from "http-status";
import { Socket } from "socket.io";

export async function expressAuthentication(req: Request, securityName: string, scopes?: string[]) {
    if (securityName === "jwt") {
        const token = req.headers.authorization;
        console.log(token);
        return tokenService.verifyToken(token.split(' ')[1]);
    }

    throw new ApiError(httpStatus.UNAUTHORIZED, "Not supported authentication type");
}

export async function socketAuthentication(socket: Socket, next: (err?: Error) => void) {
    const token = socket.handshake.auth.token;
    tokenService.verifyToken(token);
    next();
}

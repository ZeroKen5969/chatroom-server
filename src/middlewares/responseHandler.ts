import httpStatus from "http-status";
import { NextFunction, Request, Response } from "express";
import { ValidateError } from "tsoa";
import { ServiceResponse } from "../utils/response";
import { ApiError } from "../utils/error";


export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    if (err) {
        const ret = new ServiceResponse();

        err.message = err.message || "validate error";

        if (err instanceof ValidateError) {
            ret.code = httpStatus.BAD_REQUEST;
            ret.msg = err.message;
        } else if (err instanceof ApiError) {
            ret.code = err.code;
            ret.msg = err.message;
        } else {
            ret.code = httpStatus.INTERNAL_SERVER_ERROR;
        }

        console.error(err);
        
        res.send(ret);
    } else {
        res.send(httpStatus.OK);
    }

    // next();
}

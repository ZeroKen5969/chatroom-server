import { ResCode } from "../models/enum/resCode";

export class ServiceResponse {
    code: number;
    data: any;
    msg: string;

    constructor(data: any = null, code = ResCode.success, msg = "") {
        this.code = code;
        this.data = data;
        this.msg = msg;
    }
}

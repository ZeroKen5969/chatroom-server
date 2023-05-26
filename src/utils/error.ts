export class ApiError extends Error {
    readonly code: number;
    readonly trackback: string;

    constructor(code: number, message: string, trackback: string = "") {
        super(message);
        this.code = code;
        this.trackback = trackback;

        Error.captureStackTrace(this, this.constructor);
    }
}

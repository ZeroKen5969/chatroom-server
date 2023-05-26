import { Body, Controller, Post, Route, Tags } from "tsoa";
import { ILonginUser } from "../models/viewModel/user";
import { ServiceResponse } from "../utils/response";
import { authService } from "../services/authService";

@Route("auth")
@Tags("auth")
export class AuthController extends Controller {
    @Post("/")
    async login(@Body() user: ILonginUser) {
        return new ServiceResponse(await authService.login(user));
    }
}
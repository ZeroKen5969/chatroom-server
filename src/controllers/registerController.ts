import { Body, Controller, Post, Route, Tags } from "tsoa";
import { ILonginUser } from "../models/viewModel/user";
import { ServiceResponse } from "../utils/response";
import { registerService } from "../services/registerService";

@Route("register")
@Tags("register")
export class RegisterController extends Controller {
    @Post("/")
    async signUp(@Body() user: ILonginUser) {
        return new ServiceResponse(await registerService.signUp(user));
    }
}
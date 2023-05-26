import { Body, Controller, Post, Route, Security, Tags } from "tsoa";
import { ILonginUser } from "../models/viewModel/user";
import { ServiceResponse } from "../utils/response";
import { authService } from "../services/authService";

@Route("ping")
@Tags("ping")
@Security("jwt")
export class PingController extends Controller {
    @Post("/")
    async ping() {
        return new ServiceResponse();
    }
}
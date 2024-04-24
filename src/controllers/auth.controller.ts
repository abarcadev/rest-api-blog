import { Request, Response } from "express";
import { AuthService } from "../services/typeorm";
import { resError } from "../utils/response-errors";
import { BodyLoginI } from "../interfaces/auth.interface";
import { hash256Adapter, tokenAdapter } from "../config/plugins";
import { CustomError } from "../config/custom-error";
import { LOGIN_FAILED } from "../utils/messages";
import { StatusCodeEnum } from "../enums/status-code.enum";

export class AuthController {

    constructor(
        private readonly authService: AuthService,
    ) {}

    async login(req: Request, res: Response) {
        try {
            const { username, password } = req.body as BodyLoginI;

            const passHash = hash256Adapter(password);

            const [ data ] = await this.authService.login(username, passHash);

            if (!data)
                throw CustomError.unauthorized(LOGIN_FAILED);

            const {
                id,
                username: user,
                email
            } = data;
                
            const token = tokenAdapter.generate(
                {
                    id,
                    username: user,
                    email
                }
            );

            return res.status(StatusCodeEnum.Ok).json({
                ...data,
                token
            });
        } catch (error) {
            resError(error, res);
        }
    }

}
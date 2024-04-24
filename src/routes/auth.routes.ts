import { 
    Request, 
    Response, 
    Router 
} from "express";
import { AuthController } from "../controllers/auth.controller";
import { AuthService } from "../services/typeorm";
import { validationMiddleware } from "../middlewares/validation-joi.middleware";
import { authSchema } from "../schemas/data-validator-joi/auth.schema";
import { ReqPropertyEnum } from "../enums/req-property.enum";

export const createAuthRoutes = () => {
    const router = Router();

    const controller = new AuthController(
        new AuthService()
    );

    router.post(
        '/',
        validationMiddleware(authSchema.login, ReqPropertyEnum.Body),
        (req: Request, res: Response) => controller.login(req, res)
    );

    return router;
};
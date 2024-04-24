import { 
    Request, 
    Response, 
    Router 
} from "express";
import { UserController } from "../controllers/user.controller";
import { UserService } from "../services/typeorm";
import { tokenMiddleware } from "../middlewares/token.middleware";
import { validationMiddleware } from "../middlewares/validation-joi.middleware";
import { userSchema } from "../schemas/data-validator-joi/user.schema";
import { ReqPropertyEnum } from "../enums/req-property.enum";

export const createUserRoutes = () => {
    const router = Router();

    const controller = new UserController(
        new UserService(),
    );

    router.get(
        '/',
        tokenMiddleware,
        validationMiddleware(userSchema.getAll, ReqPropertyEnum.Query),
        (req: Request, res: Response) => controller.getAll(req, res)
    );

    router.post(
        '/',
        tokenMiddleware,
        validationMiddleware(userSchema.insert, ReqPropertyEnum.Body),
        (req: Request, res: Response) => controller.insert(req, res)
    );

    return router;
};
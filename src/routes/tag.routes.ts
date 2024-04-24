import { 
    Request, 
    Response, 
    Router 
} from "express"
import { TagController } from "../controllers/tag.controller";
import { TagService } from "../services/typeorm";
import { tokenMiddleware } from "../middlewares/token.middleware";
import { validationMiddleware } from "../middlewares/validation-joi.middleware";
import { tagSchema } from "../schemas/data-validator-joi/tag.schema";
import { ReqPropertyEnum } from "../enums/req-property.enum";

export const createTagRoutes = () => {
    const router = Router();

    const controller = new TagController(
        new TagService(),
    );

    router.get(
        '/',
        tokenMiddleware,
        validationMiddleware(tagSchema.getAll, ReqPropertyEnum.Query),
        (req: Request, res: Response) => controller.getAll(req, res) 
    );

    router.post(
        '/',
        tokenMiddleware,
        validationMiddleware(tagSchema.insert, ReqPropertyEnum.Body),
        (req: Request, res: Response) => controller.insert(req, res) 
    );

    return router;
}
import { 
    Request,
    Response,
    Router 
} from "express";
import { CategoryController } from "../controllers/category.controller";
import { CategoryService } from "../services/typeorm";
import { tokenMiddleware } from "../middlewares/token.middleware";
import { validationMiddleware } from "../middlewares/validation-joi.middleware";
import { categorySchema } from "../schemas/data-validator-joi/category.schema";
import { ReqPropertyEnum } from "../enums/req-property.enum";

export const createCategoryRoutes = () => {
    const router = Router();

    const controller = new CategoryController(
        new CategoryService(),
    );

    router.get(
        '/',
        tokenMiddleware,
        validationMiddleware(categorySchema.getAll, ReqPropertyEnum.Query),
        (req: Request, res: Response) => controller.getAll(req, res)
    );

    router.post(
        '/',
        tokenMiddleware,
        validationMiddleware(categorySchema.insert, ReqPropertyEnum.Body),
        (req: Request, res: Response) => controller.insert(req, res)
    );

    return router;

};
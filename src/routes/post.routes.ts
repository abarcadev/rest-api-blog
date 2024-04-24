import { 
    Request, 
    Response, 
    Router 
} from "express";
import { PostController } from "../controllers/post.controller";
import { 
    CategoryService,
    PostCategoryService,
    PostService, 
    PostTagService, 
    TagService, 
    UserService
} from "../services/typeorm";
import { tokenMiddleware } from "../middlewares/token.middleware";
import { validationMiddleware } from "../middlewares/validation-joi.middleware";
import { ReqPropertyEnum } from "../enums/req-property.enum";
import { postSchema } from "../schemas/data-validator-joi/post.schema";

export const createPostRouter = () => {
    const router = Router();

    const controller = new PostController(
        new PostService(),
        new UserService(),
        new CategoryService(),
        new PostCategoryService(),
        new TagService(),
        new PostTagService(),
    );

    router.get(
        '/',
        tokenMiddleware,
        validationMiddleware(postSchema.getAll, ReqPropertyEnum.Query),
        (req: Request, res: Response) => controller.getAll(req, res)
    );

    router.get(
        '/:id',
        tokenMiddleware,
        validationMiddleware(postSchema.getById, ReqPropertyEnum.Params),
        (req: Request, res: Response) => controller.getById(req, res)
    );

    router.post(
        '/',
        tokenMiddleware,
        validationMiddleware(postSchema.insert, ReqPropertyEnum.Body),
        (req: Request, res: Response) => controller.insert(req, res)
    );

    router.patch(
        '/:id',
        tokenMiddleware,
        validationMiddleware(postSchema.getById, ReqPropertyEnum.Params),
        validationMiddleware(postSchema.update, ReqPropertyEnum.Body),
        (req: Request, res: Response) => controller.update(req, res)
    );

    router.delete(
        '/:id',
        tokenMiddleware,
        validationMiddleware(postSchema.getById, ReqPropertyEnum.Params),
        (req: Request, res: Response) => controller.delete(req, res)
    );

    return router;
};
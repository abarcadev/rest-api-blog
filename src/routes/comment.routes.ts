import {
    Request,
    Response, 
    Router 
} from "express";
import { CommentController } from "../controllers/comment.controller";
import { 
    CommentService, 
    PostService, 
    UserService 
} from "../services/typeorm";
import { tokenMiddleware } from "../middlewares/token.middleware";
import { validationMiddleware } from "../middlewares/validation-joi.middleware";
import { commentSchema } from "../schemas/data-validator-joi/comment.schema";
import { ReqPropertyEnum } from "../enums/req-property.enum";

export const createCommentRoutes = () => {
    const router = Router();

    const controller = new CommentController(
        new CommentService(),
        new PostService(),
        new UserService(),
    );

    router.get(
        '/',
        tokenMiddleware,
        validationMiddleware(commentSchema.getAll, ReqPropertyEnum.Query),
        (req: Request, res: Response) => controller.getAll(req, res)
    );

    router.get(
        '/:id',
        tokenMiddleware,
        validationMiddleware(commentSchema.getById, ReqPropertyEnum.Params),
        (req: Request, res: Response) => controller.getById(req, res)
    );

    router.post(
        '/',
        tokenMiddleware,
        validationMiddleware(commentSchema.insert, ReqPropertyEnum.Body),
        (req: Request, res: Response) => controller.insert(req, res)
    );

    router.patch(
        '/:id',
        tokenMiddleware,
        validationMiddleware(commentSchema.getById, ReqPropertyEnum.Params),
        validationMiddleware(commentSchema.update, ReqPropertyEnum.Body),
        (req: Request, res: Response) => controller.update(req, res)
    );

    router.delete(
        '/:id',
        tokenMiddleware,
        validationMiddleware(commentSchema.getById, ReqPropertyEnum.Params),
        (req: Request, res: Response) => controller.delete(req, res)
    );

    return router;
};
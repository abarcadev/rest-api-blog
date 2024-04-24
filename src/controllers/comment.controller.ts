import { Request, Response } from "express";
import { 
    CommentService, 
    PostService, 
    UserService 
} from "../services/typeorm";
import { resError } from "../utils/response-errors";
import { 
    BodySaveCommentI, 
    ParamsGetAllCommentsI, 
    ResponseGetAllCommentsI 
} from "../interfaces/comment.interface";
import { CustomError } from "../config/custom-error";
import { REG_DELETED, REG_NOT_FOUND } from "../utils/messages";
import { CommentEntity } from "../entities/typeorm";
import { binaryUuidAdapter } from "../config/plugins";
import { StatusCodeEnum } from "../enums/status-code.enum";

export class CommentController {

    constructor(
        private readonly commentService: CommentService,
        private readonly postService: PostService,
        private readonly userService: UserService,
    ) {}

    async getAll(req: Request, res: Response) {
        try {
            const query = req.query as unknown as ParamsGetAllCommentsI;

            const commentsData = await this.commentService.getAll(query);

            let data: ResponseGetAllCommentsI[] = [];

            if (commentsData.length > 0)
                data = commentsData;

            const [ quantity ] = await this.commentService.getAllCount(query);

            return res.status(StatusCodeEnum.Ok).json({
                data,
                total: Number(quantity.regs)
            });
        } catch (error) {
            resError(error, res);
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);

            let [ data ] = await this.commentService.getById(id);

            if (!data)
                throw CustomError.notFound(REG_NOT_FOUND(`Comment id '${ id }'`));

            return res.status(StatusCodeEnum.Ok).json(data);
        } catch (error) {
            resError(error, res);
        }
    }

    async insert(req: Request, res: Response) {
        try {
            const payload = req.body as BodySaveCommentI;

            const {
                content,
                postId, 
                userId 
            } = payload;

            const [ postData ] = await this.postService.getById(postId);

            if (!postData)
                throw CustomError.notFound(REG_NOT_FOUND(`Post id '${ postId }'`));

            const [ userData ] = await this.userService.getById(userId);

            if (!userData)
                throw CustomError.notFound(REG_NOT_FOUND(`User id '${ userId }'`));

            const comment   = new CommentEntity();
            comment.content = content;
            comment.postId  = binaryUuidAdapter(postId);
            comment.userId  = binaryUuidAdapter(userId);

            const { id } = await this.commentService.insert(comment);

            return res.status(StatusCodeEnum.Created).json({ id });
        } catch (error) {
            resError(error, res);
        }
    }

    async update(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);

            const { content } = req.body as BodySaveCommentI;

            const [ commentData ] = await this.commentService.getById(id);

            if (!commentData)
                throw CustomError.notFound(REG_NOT_FOUND(`Comment id '${ id }'`));

            const comment   = new CommentEntity();
            comment.content = content;

            await this.commentService.update(id, comment);            
            
            return res.status(StatusCodeEnum.Ok).json({ id });
        } catch (error) {
            resError(error, res);
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);

            const [ commentData ] = await this.commentService.getById(id);

            if (!commentData)
                throw CustomError.notFound(REG_NOT_FOUND(`Comment id '${ id }'`));

            await this.commentService.delete(id);            
            
            return res.status(StatusCodeEnum.Ok).json({ message: REG_DELETED });
        } catch (error) {
            resError(error, res);
        }
    }

}
import { 
    DeleteResult, 
    Like, 
    UpdateResult 
} from "typeorm";
import { dbConnection } from "../../database/typeorm.connection";
import { CommentEntity } from "../../entities/typeorm";
import { ParamsGetAllCommentsI } from "../../interfaces/comment.interface";

export class CommentService {

    private readonly commentRepository = dbConnection.getRepository(CommentEntity);

    getAll(params: ParamsGetAllCommentsI): Promise<CommentEntity[]> {
        return this.commentRepository.find({
            select: {
                id: true,
                content: true,
                createdAt: true,
                updatedAt: true,
                user: {
                    username: true,
                },
                post: {
                    title: true
                }
            },
            relations: {
                user: true,
                post: true
            },
            where: {
                content: Like(`%${ params.content }%`),
                createdAt: Like(`${ params.createdAt }%`),
                user: {
                    username: Like(`%${ params.username }%`)
                },
                post: {
                    title: Like(`%${ params.postTitle }%`)
                }
            },
            order: {
                id: 'ASC'
            },
            skip: params.skip,
            take: params.limit
        });
    }

    getAllCount(params: ParamsGetAllCommentsI): Promise<number> {
        return this.commentRepository.countBy({
            content: Like(`%${ params.content }%`),
            createdAt: Like(`${ params.createdAt }%`),
            user: {
                username: Like(`%${ params.username }%`)
            },
            post: {
                title: Like(`%${ params.postTitle }%`)
            }
        });
    }

    getById(id: number): Promise<CommentEntity | null> {
        return this.commentRepository.findOne({
            select: { 
                id: true,
                content: true,
                createdAt: true,
                updatedAt: true,
                user: {
                    username: true
                },
                post: {
                    title: true
                }
            },
            relations: {
                user: true,
                post: true
            },
            where: { id }
        });
    }

    insert(comment: CommentEntity): Promise<CommentEntity> {
        return this.commentRepository.save(comment);
    }

    update(id: number, comment: CommentEntity): Promise<UpdateResult> {
        return this.commentRepository.update({ id }, comment);
    }

    delete(id: number): Promise<DeleteResult> {
        return this.commentRepository.delete({ id });
    }
    
}
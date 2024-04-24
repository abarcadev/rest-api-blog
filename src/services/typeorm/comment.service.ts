import { DeleteResult, UpdateResult } from "typeorm";
import { dbConnection } from "../../database/typeorm.connection";
import { CommentEntity } from "../../entities/typeorm";
import { ResponseGetByIdPostI } from "../../interfaces/post.interface";
import { ParamsGetAllCommentsI, ResponseGetAllCommentsI } from "../../interfaces/comment.interface";

export class CommentService {

    private readonly commentRepository = dbConnection.getRepository(CommentEntity);

    getAll(params: ParamsGetAllCommentsI): Promise<ResponseGetAllCommentsI[]> {
        return this.commentRepository.query(
            `
            SELECT
                comments.id,
                comments.content,
                users.username,
                posts.title AS postTitle,
                DATE_FORMAT(comments.created_at, '%Y-%m-%d %H:%i:%s') AS createdAt,
                DATE_FORMAT(comments.updated_at, '%Y-%m-%d %H:%i:%s') AS updatedAt
            FROM
                comments
            INNER JOIN users ON comments.user_id = users.id
            INNER JOIN posts ON comments.post_id = posts.id
            WHERE
                comments.content LIKE ?
            AND users.username LIKE ?
            AND posts.title LIKE ?
            AND comments.created_at LIKE ?
            ORDER BY comments.id
            LIMIT ${ params.limit } OFFSET ${ params.skip };
            `,
            [
                `%${ params.content }%`,
                `%${ params.username }%`,
                `%${ params.postTitle }%`,
                `%${ params.createdAt }%`,
            ]
        );
    }

    getAllCount(params: ParamsGetAllCommentsI): Promise<any[]> {
        return this.commentRepository.query(
            `
            SELECT
                COUNT(*) AS regs
            FROM
                comments
            INNER JOIN users ON comments.user_id = users.id
            INNER JOIN posts ON comments.post_id = posts.id
            WHERE
                comments.content LIKE ?
            AND users.username LIKE ?
            AND posts.title LIKE ?
            AND comments.created_at LIKE ?;
            `,
            [
                `%${ params.content }%`,
                `%${ params.username }%`,
                `%${ params.postTitle }%`,
                `%${ params.createdAt }%`,
            ]
        );
    }

    getById(id: number): Promise<ResponseGetByIdPostI[]> {
        return this.commentRepository.query(
            `
            SELECT
                comments.id,
                comments.content,
                users.username,
                posts.title AS postTitle,
                DATE_FORMAT(comments.created_at, '%Y-%m-%d %H:%i:%s') AS createdAt,
                DATE_FORMAT(comments.updated_at, '%Y-%m-%d %H:%i:%s') AS updatedAt
            FROM
                comments
            INNER JOIN users ON comments.user_id = users.id
            INNER JOIN posts ON comments.post_id = posts.id
            WHERE
                comments.id = ?;
            `,
            [ id ]
        );
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
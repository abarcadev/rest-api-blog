import { 
    DeleteResult, 
    EntityManager, 
    UpdateResult 
} from "typeorm";
import { dbConnection } from "../../database/typeorm.connection";
import { PostEntity } from "../../entities/typeorm";
import { ParamsGetAllPostsI, ResponseGetByIdPostI } from "../../interfaces/post.interface";

export class PostService {

    private readonly postRepository = dbConnection.getRepository(PostEntity);

    getAll(params: ParamsGetAllPostsI, optionalParams: string): Promise<any[]> {
        return this.postRepository.query(
            `
            SELECT
                BIN_TO_UUID(posts.id) AS id,
                posts.title,
                posts.content,
                BIN_TO_UUID(posts.user_id) AS userId,
                users.username,
                categories.id AS categoryId,
                categories.name AS categoryName,
                tags.id AS tagId,
                tags.name AS tagName,
                DATE_FORMAT(posts.created_at, '%Y-%m-%d %H:%i:%s') AS createdAt,
                DATE_FORMAT(posts.updated_at, '%Y-%m-%d %H:%i:%s') AS updatedAt
            FROM
                posts
            INNER JOIN users ON posts.user_id = users.id
            LEFT JOIN posts_categories ON posts.id = posts_categories.post_id
            LEFT JOIN categories ON posts_categories.category_id = categories.id
            LEFT JOIN posts_tags ON posts.id = posts_tags.post_id
            LEFT JOIN tags ON posts_tags.tag_id = tags.id
            WHERE
                posts.title LIKE ?
            AND users.username LIKE ?
            AND posts.created_at LIKE ? ${ optionalParams }
            ORDER BY posts.created_at
            LIMIT ${ params.limit } OFFSET ${ params.skip };
            `,
            [
                `%${ params.title }%`,
                `%${ params.username }%`,
                `%${ params.createdAt }%`
            ]
        );
    }

    getAllById(id: string): Promise<any[]> {
        return this.postRepository.query(
            `
            SELECT
                BIN_TO_UUID(posts.id) AS id,
                posts.title,
                posts.content,
                BIN_TO_UUID(posts.user_id) AS userId,
                users.username,
                categories.id AS categoryId,
                categories.name AS categoryName,
                tags.id AS tagId,
                tags.name AS tagName,
                DATE_FORMAT(posts.created_at, '%Y-%m-%d %H:%i:%s') AS createdAt,
                DATE_FORMAT(posts.updated_at, '%Y-%m-%d %H:%i:%s') AS updatedAt
            FROM
                posts
            INNER JOIN users ON posts.user_id = users.id
            LEFT JOIN posts_categories ON posts.id = posts_categories.post_id
            LEFT JOIN categories ON posts_categories.category_id = categories.id
            LEFT JOIN posts_tags ON posts.id = posts_tags.post_id
            LEFT JOIN tags ON posts_tags.tag_id = tags.id
            WHERE
                posts.id = UUID_TO_BIN(?);
            `,
            [ id ]
        );
    }

    getById(id: string): Promise<ResponseGetByIdPostI[]> {
        return this.postRepository.query(
            `
            SELECT
                BIN_TO_UUID(id) AS id,
                title
            FROM
                posts
            WHERE
                id = UUID_TO_BIN(?);
            `,
            [ id ]
        );
    }

    insert(cnx: EntityManager, post: PostEntity): Promise<PostEntity> {
        return cnx.save(post);
    }

    update(
        cnx: EntityManager,
        id: Buffer,
        post: PostEntity
    ): Promise<UpdateResult> {
        return cnx.update(
            PostEntity,
            { id },
            post
        );
    }

    delete(cnx: EntityManager, id: Buffer): Promise<DeleteResult> {
        return cnx.delete(PostEntity, { id });
    }

}
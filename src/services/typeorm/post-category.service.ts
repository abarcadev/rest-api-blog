import { DeleteResult, EntityManager } from "typeorm";
import { PostCategoryEntity } from "../../entities/typeorm";

export class PostCategoryService {

    insert(cnx: EntityManager, postCategory: PostCategoryEntity): Promise<PostCategoryEntity> {
        return cnx.save(postCategory);
    }

    delete(cnx: EntityManager, postCategory: PostCategoryEntity): Promise<DeleteResult> {
        return cnx.delete(PostCategoryEntity, postCategory);
    }

    deleteByPostId(cnx: EntityManager, postId: Buffer): Promise<DeleteResult> {
        return cnx.delete(PostCategoryEntity, { postId });
    }

}
import { DeleteResult, EntityManager } from "typeorm";
import { PostTagEntity } from "../../entities/typeorm";

export class PostTagService {

    insert(cnx: EntityManager, postTag: PostTagEntity): Promise<PostTagEntity> {
        return cnx.save(postTag);
    }

    delete(cnx: EntityManager, postTag: PostTagEntity): Promise<DeleteResult> {
        return cnx.delete(PostTagEntity, postTag);
    }

    deleteByPostId(cnx: EntityManager, postId: Buffer): Promise<DeleteResult> {
        return cnx.delete(PostTagEntity, { postId });
    }

}
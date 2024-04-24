import { Entity, PrimaryColumn } from "typeorm";

@Entity("posts_tags")
export class PostTagEntity {
    @PrimaryColumn({
        type: "binary",
        name: "post_id",
        length: 16
    })
    postId: Buffer;

    @PrimaryColumn({
        type: "int",
        name: "tag_id"
    })
    tagId: number;
}
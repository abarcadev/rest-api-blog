import { Entity, PrimaryColumn } from "typeorm";

@Entity("posts_categories")
export class PostCategoryEntity {
    @PrimaryColumn({
        type: "binary",
        name: "post_id",
        length: 16
    })
    postId: Buffer;

    @PrimaryColumn({
        type: "int",
        name: "category_id"
    })
    categoryId: number;
}
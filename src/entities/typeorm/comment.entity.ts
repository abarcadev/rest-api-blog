import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    CreateDateColumn, 
    UpdateDateColumn, 
    ManyToOne,
    JoinColumn
} from "typeorm";
import { PostEntity } from "./post.entity";
import { UserEntity } from "./user.entity";

@Entity("comments")
export class CommentEntity {
    @PrimaryGeneratedColumn({
        type: "int",
        name: "id"
    })
    id: number;

    @Column({
        type: "text",
        name: "content",
        nullable: false
    })
    content: string;    

    @Column({
        type: "binary",
        name: "post_id",
        length: 16
    })
    postId: Buffer;

    @Column({
        type: "binary",
        name: "user_id",
        length: 16
    })
    userId: Buffer;

    @CreateDateColumn({
        type: "timestamp",
        name: "created_at",
    })
    createdAt: Date | string;

    @UpdateDateColumn({
        type: "timestamp",
        name: "updated_at"
    })
    updatedAt: Date;

    @ManyToOne(() => PostEntity, (post) => post.comments)
    @JoinColumn([
        { name: "post_id", referencedColumnName: "id" }
    ])
    post: PostEntity;

    @ManyToOne(() => UserEntity, (user) => user.comments)
    @JoinColumn([
        { name: "user_id", referencedColumnName: "id" }
    ])
    user: UserEntity;
}
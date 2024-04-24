import { 
    Entity, 
    PrimaryColumn, 
    Column, 
    CreateDateColumn, 
    UpdateDateColumn, 
    ManyToOne,
    JoinColumn,
    OneToMany
} from "typeorm";
import { UserEntity } from "./user.entity";
import { CommentEntity } from "./comment.entity";

@Entity("posts")
export class PostEntity {
    @PrimaryColumn({
        type: "binary",
        name: "id",
        length: 16
    })
    id: Buffer;

    @Column({
        type: "varchar",
        name: "title",
        length: 200,
        nullable: false
    })
    title: string;

    @Column({
        type: "text",
        name: "content",
        nullable: false
    })
    content: string;    

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
    createdAt: Date;

    @UpdateDateColumn({
        type: "timestamp",
        name: "updated_at"
    })
    updatedAt: Date;

    @ManyToOne(() => UserEntity, (user) => user.posts)
    @JoinColumn([
        { name: "user_id", referencedColumnName: "id" }
    ])
    user: UserEntity;

    @OneToMany(() => CommentEntity, (comment) => comment.post)
    comments: CommentEntity[];
}
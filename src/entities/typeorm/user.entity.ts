import { 
    Entity, 
    PrimaryColumn, 
    Column, 
    CreateDateColumn, 
    UpdateDateColumn, 
    OneToMany
} from "typeorm";
import { PostEntity } from "./post.entity";
import { CommentEntity } from "./comment.entity";

@Entity("users")
export class UserEntity {
    @PrimaryColumn({
        type: "binary",
        name: "id",
        length: 16
    })
    id: Buffer;

    @Column({
        type: "varchar",
        name: "first_name",
        length: 255,
        nullable: false
    })
    firstName: string;

    @Column({
        type: "varchar",
        name: "last_name",
        length: 255,
        nullable: false
    })
    lastName: string;

    @Column({
        type: "varchar",
        name: "username",
        length: 50,
        nullable: false,
        unique: true
    })
    username: string;

    @Column({
        type: "varchar",
        name: "password",
        length: 64,
        nullable: false,
    })
    password: string;

    @Column({
        type: "varchar",
        name: "email",
        length: 100,
        nullable: false,
        unique: true
    })
    email: string;
    
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

    @OneToMany(() => PostEntity, (post) => post.user)
    posts: PostEntity[];

    @OneToMany(() => CommentEntity, (comment) => comment.user)
    comments: CommentEntity[];
}
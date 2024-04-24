import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    CreateDateColumn, 
    UpdateDateColumn 
} from "typeorm";

@Entity("tags")
export class TagEntity {
    @PrimaryGeneratedColumn({
        type: "int",
        name: "id"
    })
    id: number;

    @Column({
        type: "varchar",
        name: "name",
        length: 50,
        nullable: false,
        unique: true
    })
    name: string;

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
}
import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    CreateDateColumn, 
    UpdateDateColumn 
} from "typeorm";

@Entity("categories")
export class CategoryEntity {
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
    createdAt: Date | string;

    @UpdateDateColumn({
        type: "timestamp",
        name: "updated_at"
    })
    updatedAt: Date;
}
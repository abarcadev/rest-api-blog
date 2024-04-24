import "reflect-metadata";
import { DataSource } from "typeorm";
import { env } from "../config/environment";
import { 
    CategoryEntity, 
    CommentEntity, 
    PostCategoryEntity, 
    PostEntity,
    PostTagEntity, 
    TagEntity, 
    UserEntity 
} from "../entities/typeorm";

const dbConnection = new DataSource({
    type       : "mysql",
    host       : env.DB_HOST,
    port       : env.DB_PORT,
    username   : env.DB_USER,
    password   : env.DB_PASSWORD,
    database   : env.DB_NAME,
    synchronize: false,
    logging    : true,
    entities   : [ 
        UserEntity,
        CategoryEntity,
        TagEntity,
        PostEntity,
        PostCategoryEntity,
        PostTagEntity,
        CommentEntity,
    ],
    migrations : [],
    subscribers: [],
});

const startDbConnection = async (dbConnection: DataSource): Promise<void> => {
    try {
        await dbConnection.initialize();
        console.log('Start db connection');
    } catch (error) {
        console.log('Error db connection', error);
        throw error;
    }
};

export {
    dbConnection,
    startDbConnection,
};
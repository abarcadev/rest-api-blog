import { dbConnection } from "../../database/typeorm.connection";
import { UserEntity } from "../../entities/typeorm";
import { 
    ParamsGetAllUsersI, 
    ResponseGetAllUsersI, 
    ResponseGetByIdUserI 
} from "../../interfaces/user.interface";

export class UserService {

    private readonly userRepository = dbConnection.getRepository(UserEntity);

    getAll(params: ParamsGetAllUsersI): Promise<ResponseGetAllUsersI[]> {
        return this.userRepository.query(
            `
            SELECT
                BIN_TO_UUID(id) AS id,
                CONCAT(first_name, ' ', last_name) AS name,
                username,
                email
            FROM
                users
            WHERE
                CONCAT(first_name, ' ', last_name) LIKE ?
            AND username LIKE ?
            AND created_at LIKE ?
            ORDER BY created_at
            LIMIT ${ params.limit } OFFSET ${ params.skip };
            `,
            [
                `%${ params.name }%`,
                `%${ params.username }%`,
                `%${ params.createdAt }%`,
            ]
        );
    }

    getAllCount(params: ParamsGetAllUsersI): Promise<any[]> {
        return this.userRepository.query(
            `
            SELECT
                COUNT(*) AS regs
            FROM
                users
            WHERE
                CONCAT(first_name, ' ', last_name) LIKE ?
            AND username LIKE ?
            AND created_at LIKE ?;
            `,
            [
                `%${ params.name }%`,
                `%${ params.username }%`,
                `%${ params.createdAt }%`,
            ]
        );
    }

    getById(id: string): Promise<ResponseGetByIdUserI[]> {
        return this.userRepository.query(
            `
            SELECT
                BIN_TO_UUID(id) AS id,
                CONCAT(first_name, ' ', last_name) AS name,
                username,
                email
            FROM
                users
            WHERE
                id = UUID_TO_BIN(?);
            `,
            [ id ]
        );
    }

    getByUsername(username: string): Promise<ResponseGetByIdUserI[]> {
        return this.userRepository.query(
            `
            SELECT
                BIN_TO_UUID(id) AS id,
                CONCAT(first_name, ' ', last_name) AS name,
                username,
                email
            FROM
                users
            WHERE
                username = ?;
            `,
            [ username ]
        );
    }

    getByEmail(email: string): Promise<ResponseGetByIdUserI[]> {
        return this.userRepository.query(
            `
            SELECT
                BIN_TO_UUID(id) AS id,
                CONCAT(first_name, ' ', last_name) AS name,
                username,
                email
            FROM
                users
            WHERE
                email = ?;
            `,
            [ email ]
        );
    }

    insert(user: UserEntity): Promise<UserEntity> {
        return this.userRepository.save(user);
    }

}
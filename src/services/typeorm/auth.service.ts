import { dbConnection } from "../../database/typeorm.connection";
import { UserEntity } from "../../entities/typeorm";
import { ResponseGetLoginI } from "../../interfaces/auth.interface";

export class AuthService {

    private readonly authRepository = dbConnection.getRepository(UserEntity);

    login(username: string, password: string): Promise<ResponseGetLoginI[]> {
        return this.authRepository.query(
            `
            SELECT 
                BIN_TO_UUID(id) AS id,
                first_name AS firstName,
                last_name AS lastName,
                username,
                email
            FROM 
                users
            WHERE
                username = ?
            AND password = ?;
            `,
            [ username, password ]
        );
    }

}
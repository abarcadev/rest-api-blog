import jwt from  "jsonwebtoken";
import { env } from "../environment";
import { CustomError } from "../custom-error";
import { INVALID_TOKEN } from "../../utils/messages";

const generate = (payload: any, duration: string = env.TOKEN_EXPIRES) => {
    try {
        return jwt.sign(
            payload,
            env.TOKEN_SECRET_KEY,
            {
                expiresIn: duration
            }
        );
    } catch (error) {
        throw error;
    }
};

const validate = (token: string) => {
    try {
        return jwt.verify(token, env.TOKEN_SECRET_KEY);
    } catch (error) {
        throw CustomError.unauthorized(INVALID_TOKEN);
    }
};

export const tokenAdapter = {
    generate,
    validate
};
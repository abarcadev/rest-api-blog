import { 
    NextFunction,
    Request,
    Response 
} from "express";
import { INVALID_TOKEN } from "../utils/messages";
import { CustomError } from "../config/custom-error";
import { resError } from "../utils/response-errors";
import { tokenAdapter } from "../config/plugins";

export const tokenMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        let token = req.header('Authorization');

        if (!token)
            throw CustomError.unauthorized(INVALID_TOKEN);

        token = token.split(' ')[1];
                        
        tokenAdapter.validate(token);
        
        next();
    } catch (error) {
        resError(error, res);
    }
};
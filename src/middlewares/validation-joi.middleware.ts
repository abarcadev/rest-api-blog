import { 
    NextFunction, 
    Request, 
    Response 
} from "express";
import { ObjectSchema } from "joi";
import { StatusCodeEnum } from "../enums/status-code.enum";
import { ReqPropertyEnum } from "../enums/req-property.enum";

export const validationMiddleware = (schema: ObjectSchema, property: ReqPropertyEnum) => { 
    return async (
        req: Request, 
        res: Response, 
        next: NextFunction
    ) => {
            const { error } = schema.validate(req[property], { abortEarly: false });

            if (error) {
                return res.status(StatusCodeEnum.BadRequest).json({ message: error.details })    
            }

            next();
    };
};
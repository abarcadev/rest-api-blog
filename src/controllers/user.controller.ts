import { Request, Response } from "express";
import { UserService } from "../services/typeorm";
import { resError } from "../utils/response-errors";
import { 
    BodySaveUserI, 
    ParamsGetAllUsersI, 
    ResponseGetAllUsersI 
} from "../interfaces/user.interface";
import { StatusCodeEnum } from "../enums/status-code.enum";
import { UserEntity } from "../entities/typeorm";
import { 
    binaryUuidAdapter, 
    hash256Adapter, 
    uuidAdapter 
} from "../config/plugins";
import { CustomError } from "../config/custom-error";
import { DATA_ALREADY_EXIST } from "../utils/messages";

export class UserController {

    constructor(
        private readonly userService: UserService,
    ) {}

    async getAll(req: Request, res: Response) {
        try {
            const query = req.query as unknown as ParamsGetAllUsersI;

            const usersData = await this.userService.getAll(query);

            let data: ResponseGetAllUsersI[] = [];

            if (usersData.length > 0)
                data = usersData;

            const [ quantity ] = await this.userService.getAllCount(query);

            return res.status(StatusCodeEnum.Ok).json({
                data,
                total: Number(quantity.regs)
            });
        } catch (error) {
            resError(error, res);
        }
    }

    async insert(req: Request, res: Response) {
        try {
            const payload = req.body as BodySaveUserI;

            const { 
                password, 
                username, 
                email 
            } = payload;

            const [ usernameData ] = await this.userService.getByUsername(username);

            if (usernameData)
                throw CustomError.badRequest(DATA_ALREADY_EXIST(`username '${ username }'`));
            
            const [ emailData ] = await this.userService.getByEmail(email);

            if (emailData)
                throw CustomError.badRequest(DATA_ALREADY_EXIST(`email '${ email }'`));

            payload.password = hash256Adapter(password);

            const user = payload as UserEntity;

            const id       = uuidAdapter();
            const idBinary = binaryUuidAdapter(id);
            user.id        = idBinary;

            await this.userService.insert(user);

            return res.status(StatusCodeEnum.Created).json({ id });
        } catch (error) {
            resError(error, res);
        }
    }

}
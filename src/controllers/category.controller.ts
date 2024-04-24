import { Request, Response } from "express";
import { CategoryService } from "../services/typeorm";
import { resError } from "../utils/response-errors";
import { 
    BodySaveCategoryI, 
    ParamsGetAllCategoriesI, 
    ResponseGetAllCategoriesI 
} from "../interfaces/category.interface";
import { StatusCodeEnum } from "../enums/status-code.enum";
import { CategoryEntity } from "../entities/typeorm";
import { CustomError } from "../config/custom-error";
import { DATA_ALREADY_EXIST } from "../utils/messages";

export class CategoryController {

    constructor(
        private readonly categoryService: CategoryService,
    ) {}

    async getAll(req: Request, res: Response) {
        try {
            const query = req.query as unknown as ParamsGetAllCategoriesI;

            const categoriesData = await this.categoryService.getAll(query);

            let data: ResponseGetAllCategoriesI[] = [];

            if (categoriesData.length > 0)
                data = categoriesData;

            const [ quantity ] = await this.categoryService.getAllCount(query);

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
            const payload = req.body as BodySaveCategoryI;

            const { name } = payload;

            const [ nameData ] = await this.categoryService.getByName(name);

            if (nameData)
                throw CustomError.badRequest(DATA_ALREADY_EXIST(`name '${ name }'`));

            const category = payload as CategoryEntity;

            const { id } = await this.categoryService.insert(category);
            
            return res.status(StatusCodeEnum.Created).json({ id });
        } catch (error) {
            resError(error, res);
        }
    }

}
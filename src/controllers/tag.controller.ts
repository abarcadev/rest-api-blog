import { Request, Response } from "express";
import { TagService } from "../services/typeorm";
import { resError } from "../utils/response-errors";
import { BodySaveTagsI, ParamsGetAllTagsI } from "../interfaces/tag.interface";
import { StatusCodeEnum } from "../enums/status-code.enum";
import { TagEntity } from "../entities/typeorm";
import { CustomError } from "../config/custom-error";
import { DATA_ALREADY_EXIST } from "../utils/messages";

export class TagController {

    constructor(
        private readonly tagService: TagService,
    ) {}

    async getAll(req: Request, res: Response) {
        try {
            const query = req.query as unknown as ParamsGetAllTagsI;

            const data  = await this.tagService.getAll(query);
            const total = await this.tagService.getAllCount(query);

            return res.status(StatusCodeEnum.Ok).json({
                data,
                total
            });
        } catch (error) {
            resError(error, res);
        }
    }

    async insert(req: Request, res: Response) {
        try {
            const payload = req.body as BodySaveTagsI;

            const { name } = payload;

            const nameData = await this.tagService.getByName(name);

            if (nameData)
                throw CustomError.badRequest(DATA_ALREADY_EXIST(`name '${ name }'`));

            const tag = payload as TagEntity;

            const { id } = await this.tagService.insert(tag);

            return res.status(StatusCodeEnum.Created).json({ id });
        } catch (error) {
            resError(error, res);
        }
    }

}
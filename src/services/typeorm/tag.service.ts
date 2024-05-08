import { Like } from "typeorm";
import { dbConnection } from "../../database/typeorm.connection";
import { TagEntity } from "../../entities/typeorm";
import { ParamsGetAllTagsI } from "../../interfaces/tag.interface";

export class TagService {

    private readonly tagRepository = dbConnection.getRepository(TagEntity);
    
    getAll(params: ParamsGetAllTagsI): Promise<TagEntity[]> {
        return this.tagRepository.find({
            select: {
                id: true,
                name: true
            },
            where: {
                name: Like(`%${ params.name }%`),
                createdAt: Like(`${ params.createdAt }%`)
            },
            order: {
                createdAt: 'ASC'
            },
            skip: params.skip,
            take: params.limit
        });
    }

    getAllCount(params: ParamsGetAllTagsI): Promise<number> {
        return this.tagRepository.countBy({
            name: Like(`%${ params.name }%`),
            createdAt: Like(`${ params.createdAt }%`)
        });
    }

    getById(id: number): Promise<TagEntity | null> {
        return this.tagRepository.findOne({
            select: {
                id: true,
                name: true
            },
            where: { id }
        });
    }

    getByName(name: string): Promise<TagEntity | null> {
        return this.tagRepository.findOne({
            select: {
                id: true,
                name: true
            },
            where: { name }
        });
    }

    insert(tag: TagEntity): Promise<TagEntity> {
        return this.tagRepository.save(tag);
    }

}
import { dbConnection } from "../../database/typeorm.connection";
import { TagEntity } from "../../entities/typeorm";
import { 
    ParamsGetAllTagsI, 
    ResponseGetAllTagsI, 
    ResponseGetByIdTagI 
} from "../../interfaces/tag.interface";

export class TagService {

    private readonly tagRepository = dbConnection.getRepository(TagEntity);
    
    getAll(params: ParamsGetAllTagsI): Promise<ResponseGetAllTagsI[]> {
        return this.tagRepository.query(
            `
            SELECT
                id,
                name
            FROM
                tags
            WHERE
                name LIKE ?
            AND created_at LIKE ?
            ORDER BY created_at
            LIMIT ${ params.limit } OFFSET ${ params.skip };
            `,
            [
                `%${ params.name }%`,
                `%${ params.createdAt }%`
            ]
        )
    }

    getAllCount(params: ParamsGetAllTagsI): Promise<any[]> {
        return this.tagRepository.query(
            `
            SELECT
                COUNT(*) AS regs
            FROM
                tags
            WHERE
                name LIKE ?
            AND created_at LIKE ?;
            `,
            [
                `%${ params.name }%`,
                `%${ params.createdAt }%`
            ]
        );
    }

    getById(id: number): Promise<ResponseGetByIdTagI[]> {
        return this.tagRepository.query(
            `
            SELECT
                id,
                name
            FROM
                tags
            WHERE
                id = ?;
            `,
            [ id ]
        );
    }

    getByName(name: string): Promise<ResponseGetByIdTagI[]> {
        return this.tagRepository.query(
            `
            SELECT
                id,
                name
            FROM
                tags
            WHERE
                name = ?;
            `,
            [ name ]
        );
    }

    insert(tag: TagEntity): Promise<TagEntity> {
        return this.tagRepository.save(tag);
    }

}
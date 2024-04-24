import { dbConnection } from "../../database/typeorm.connection";
import { CategoryEntity } from "../../entities/typeorm";
import { 
    ParamsGetAllCategoriesI, 
    ResponseGetAllCategoriesI, 
    ResponseGetByIdCategoryI 
} from "../../interfaces/category.interface";

export class CategoryService {

    private readonly categoryRepository = dbConnection.getRepository(CategoryEntity);

    getAll(params: ParamsGetAllCategoriesI): Promise<ResponseGetAllCategoriesI[]> {
        return this.categoryRepository.query(
            `
            SELECT
                id,
                name
            FROM
                categories
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
        );
    }

    getAllCount(params: ParamsGetAllCategoriesI): Promise<any[]> {
        return this.categoryRepository.query(
            `
            SELECT
                COUNT(*) AS regs
            FROM
                categories
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

    getById(id: number): Promise<ResponseGetByIdCategoryI[]> {
        return this.categoryRepository.query(
            `
            SELECT
                id,
                name
            FROM
                categories
            WHERE
                id = ?;
            `,
            [ id ]
        );
    }

    getByName(name: string): Promise<ResponseGetByIdCategoryI[]> {
        return this.categoryRepository.query(
            `
            SELECT
                id,
                name
            FROM
                categories
            WHERE
                name = ?;
            `,
            [ name ]
        );
    }

    insert(category: CategoryEntity): Promise<CategoryEntity> {
        return this.categoryRepository.save(category);
    }

}
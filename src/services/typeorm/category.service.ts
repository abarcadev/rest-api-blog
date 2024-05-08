import { Like } from "typeorm";
import { dbConnection } from "../../database/typeorm.connection";
import { CategoryEntity } from "../../entities/typeorm";
import { ParamsGetAllCategoriesI } from "../../interfaces/category.interface";

export class CategoryService {

    private readonly categoryRepository = dbConnection.getRepository(CategoryEntity);

    getAll(params: ParamsGetAllCategoriesI): Promise<CategoryEntity[]> {
        return this.categoryRepository.find({
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

    getAllCount(params: ParamsGetAllCategoriesI): Promise<number> {
        return this.categoryRepository.countBy({
            name: Like(`%${ params.name }%`),
            createdAt: Like(`${ params.createdAt }%`)
        });
    }

    getById(id: number): Promise<CategoryEntity | null> {
        return this.categoryRepository.findOne({
            select: {
                id: true,
                name: true
            },
            where: { id }
        });
    }

    getByName(name: string): Promise<CategoryEntity | null> {
        return this.categoryRepository.findOne({
            select: {
                id: true,
                name: true
            },
            where: { name }
        });
    }

    insert(category: CategoryEntity): Promise<CategoryEntity> {
        return this.categoryRepository.save(category);
    }

}
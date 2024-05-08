import { Request, Response } from "express";
import { 
    CategoryService, 
    PostCategoryService,
    PostService, 
    TagService,
    PostTagService,
    UserService
} from "../services/typeorm";
import { EntityManager } from "typeorm";
import { 
    BodyInsertPostI, 
    BodySavePostI, 
    BodyUpdatePostI, 
    ParamsGetAllPostsI,
    ResponseGetAllPostsI
} from "../interfaces/post.interface";
import { REG_DELETED, REG_NOT_FOUND } from "../utils/messages";
import { binaryUuidAdapter, uuidAdapter } from "../config/plugins";
import { 
    PostCategoryEntity, 
    PostEntity, 
    PostTagEntity 
} from "../entities/typeorm";
import { resError } from "../utils/response-errors";
import { dbConnection } from "../database/typeorm.connection";
import { StatusCodeEnum } from "../enums/status-code.enum";
import { CustomError } from "../config/custom-error";

export class PostController {

    constructor(
        private readonly postService: PostService,
        private readonly userService: UserService,
        private readonly categoryService: CategoryService,
        private readonly postCategoryService: PostCategoryService,
        private readonly tagService: TagService,
        private readonly postTagService: PostTagService,
    ) {}

    async getAll(req: Request, res: Response) {
        try {
            const query = req.query as unknown as ParamsGetAllPostsI;

            const { categoriesId, tagsId } = query;
            let optionalParams = '';

            if (categoriesId) {
                const arrStrCtg       = categoriesId.split(',');
                query.arrCategoriesId = arrStrCtg.map((id) => Number(id));
                optionalParams += `AND categories.id IN (${ query.arrCategoriesId })`;
            }
            
            if (tagsId) {
                const arrStrTag = tagsId.split(',');
                query.arrTagsId = arrStrTag.map((id) => Number(id));
                optionalParams += ` AND tags.id IN (${ query.arrTagsId })`
            }

            const postsData = await this.postService.getAll(query, optionalParams);

            let data: ResponseGetAllPostsI[] = [];

            if (postsData.length > 0) {
                data = this.buildResGetPosts(postsData);
            }

            return res.status(StatusCodeEnum.Ok).json({
                data, 
                total: data.length
            });
        } catch (error) {
            resError(error, res);
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const id = req.params.id;

            let postData = await this.postService.getAllById(id);

            if (postData.length === 0)
                throw CustomError.notFound(REG_NOT_FOUND(`Post id '${ id }'`));

            let [ data ] = this.buildResGetPosts(postData);

            return res.status(StatusCodeEnum.Ok).json(data);
        } catch (error) {
            resError(error, res);
        }
    }

    async insert(req: Request, res: Response) {
        try {
            return await dbConnection.transaction(async (cnxTran: EntityManager) => {
                const { 
                    categoriesId, 
                    tagsId, 
                    ...post 
                } = req.body as BodyInsertPostI;

                const [ userData ] = await this.userService.getById(post.userId);

                if (!userData)
                    throw CustomError.notFound(REG_NOT_FOUND(`User id '${ post.userId }'`));

                const postId = await this.insertPost(cnxTran, post);

                await this.insertPostCategory(
                    cnxTran,
                    postId,
                    categoriesId
                );

                await this.insertPostTag(
                    cnxTran, 
                    postId,
                    tagsId
                );

                return res.status(StatusCodeEnum.Created).json({ id: postId });
            });
        } catch (error) {
            resError(error, res);
        }
    }

    async update(req: Request, res: Response) {
        try {
            return await dbConnection.transaction(async (cnxTran: EntityManager) => {
                const id = req.params.id;
                
                const { 
                     deleteCategoriesId,
                     addCategoriesId,
                     deleteTagsId,
                     addTagsId,
                    ...post 
                } = req.body as BodyUpdatePostI;

                const [ postData ] = await this.postService.getById(id);

                if (!postData)
                    throw CustomError.notFound(REG_NOT_FOUND(`Post id '${ id }'`));

                const [ userData ] = await this.userService.getById(post.userId);

                if (!userData)
                    throw CustomError.notFound(REG_NOT_FOUND(`User id '${ post.userId }'`));
                
                await this.updatePost(
                    cnxTran, 
                    id,
                    post
                );

                await this.deletePostCategory(
                    cnxTran,
                    id,
                    deleteCategoriesId
                );

                await this.insertPostCategory(
                    cnxTran,
                    id,
                    addCategoriesId
                );

                await this.deletePostTag(
                    cnxTran,
                    id,
                    deleteTagsId
                );

                await this.insertPostTag(
                    cnxTran, 
                    id,
                    addTagsId
                );

                return res.status(StatusCodeEnum.Ok).json({ id });
            });
        } catch (error) {
            resError(error, res);
        }
    }

    async delete(req: Request, res: Response) {
        try {
            return await dbConnection.transaction(async (cnxTran: EntityManager) => {
                const id     = req.params.id;
                const postId = binaryUuidAdapter(id);

                const [ postData ] = await this.postService.getById(id);

                if (!postData)
                    throw CustomError.notFound(REG_NOT_FOUND(`Post id '${ id }'`));
                
                await this.postCategoryService.deleteByPostId(cnxTran, postId);
                await this.postTagService.deleteByPostId(cnxTran, postId);
                await this.postService.delete(cnxTran, postId);

                return res.status(StatusCodeEnum.Ok).json({ message: REG_DELETED });
            });
        } catch (error) {
            resError(error, res);
        }
    }

    private buildResGetPosts(data: any[]): ResponseGetAllPostsI[] {
        const arrRes: any[] = data.reduce((acum: ResponseGetAllPostsI[], cur) => {
            const postFound = acum.find((elem) => elem.id === cur.id);

            const {
                categoryId,
                categoryName,
                tagId,
                tagName,
                ...post
            } = cur;

            if (!postFound) {
                acum.push({
                    ...post,
                    categories: [{
                        id  : categoryId,
                        name: categoryName
                    }],
                    tags: [{
                        id  : tagId,
                        name: tagName
                    }]
                });
            } else {
                const categoryFound = postFound.categories.find((elem) => elem.id === categoryId);
                const tagFound      = postFound.tags.find((elem) => elem.id === tagId);

                if (!categoryFound) {
                    postFound.categories.push({
                        id  : categoryId,
                        name: categoryName
                    });
                }
                if (!tagFound) {
                    postFound.tags.push({
                        id  : tagId,
                        name: tagName
                    });
                }
            }

            return acum;
        }, []);

        return arrRes;
    }

    private async insertPost(cnxTran: EntityManager, payload: BodySavePostI) {
        try {
            const {
                title,
                content,
                userId
            } = payload;

            const id       = uuidAdapter();
            const idBinary = binaryUuidAdapter(id);
            
            const post   = new PostEntity();
            post.id      = idBinary;
            post.title   = title;
            post.content = content;
            post.userId  = binaryUuidAdapter(userId);

            await this.postService.insert(cnxTran, post);

            return id;
        } catch (error) {
            throw error;
        }
    }

    private async updatePost(
        cnxTran: EntityManager,
        id: string, 
        payload: BodySavePostI
    ) {
        try {
            const idBinary = binaryUuidAdapter(id);

            const {
                title,
                content,
                userId
            } = payload;

            const post   = new PostEntity();
            post.title   = title;
            post.content = content;
            post.userId  = binaryUuidAdapter(userId);

            await this.postService.update(
                cnxTran, 
                idBinary,
                post
            );

            return id;
        } catch (error) {
            throw error;
        }
    }    

    private async insertPostCategory(
        cnxTran: EntityManager,
        postId: string,
        categoriesId: number[]
    ) {
        try {
            const postIdBinary = binaryUuidAdapter(postId);
            
            for (const categoryId of categoriesId) {
                const categoryData = await this.categoryService.getById(categoryId);

                if (!categoryData)
                    throw CustomError.notFound(REG_NOT_FOUND(`Category id '${ categoryId }'`));

                const postCategory      = new PostCategoryEntity();
                postCategory.postId     = postIdBinary;
                postCategory.categoryId = categoryId;

                await this.postCategoryService.insert(cnxTran, postCategory);
            }

            return true;
        } catch (error) {
            throw error;
        }
    }

    private async deletePostCategory(
        cnxTran: EntityManager,
        postId: string,
        categoriesId: number[]
    ) {
        try {
            const postIdBinary = binaryUuidAdapter(postId);
            
            for (const categoryId of categoriesId) {
                const categoryData = await this.categoryService.getById(categoryId);

                if (!categoryData)
                    throw CustomError.notFound(REG_NOT_FOUND(`Category id '${ categoryId }'`));

                const postCategory      = new PostCategoryEntity();
                postCategory.postId     = postIdBinary;
                postCategory.categoryId = categoryId;

                const deleteRes = await this.postCategoryService.delete(cnxTran, postCategory);

                if (deleteRes.affected === 0)
                    throw CustomError.notFound(REG_NOT_FOUND(`Category id '${ categoriesId }'`));
            }

            return true;
        } catch (error) {
            throw error;
        }
    }

    private async insertPostTag(
        cnxTran: EntityManager, 
        postId: string,
        tagsId: number[]
    ) {
        try {
            const postIdBinary = binaryUuidAdapter(postId);

            for (const tagId of tagsId) {
                const tagData = await this.tagService.getById(tagId);

                if (!tagData)
                    throw CustomError.notFound(REG_NOT_FOUND(`Tag id '${ tagId }'`));

                const postTag  = new PostTagEntity();
                postTag.postId = postIdBinary;
                postTag.tagId  = tagId;

                await this.postTagService.insert(cnxTran, postTag);
            }

            return true;
        } catch (error) {
            throw error;     
        }
    }

    private async deletePostTag(
        cnxTran: EntityManager,
        postId: string,
        tagsId: number[]
    ) {
        try {
            const postIdBinary = binaryUuidAdapter(postId);

            for (const tagId of tagsId) {
                const tagData = await this.tagService.getById(tagId);

                if (!tagData)
                    throw CustomError.notFound(REG_NOT_FOUND(`Tag id '${ tagId }'`));

                const postTag  = new PostTagEntity();
                postTag.postId = postIdBinary;
                postTag.tagId  = tagId;

                const deleteRes = await this.postTagService.delete(cnxTran, postTag);

                if (deleteRes.affected === 0)
                    throw CustomError.notFound(REG_NOT_FOUND(`Tag id '${ tagId }'`));
            }

            return true;
        } catch (error) {
            throw error;
        }
    }

}
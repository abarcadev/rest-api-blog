import { ResponseGetAllCategoriesI } from "./category.interface";
import { ResponseGetAllTagsI } from "./tag.interface";

interface ParamsGetAllPostsI {
    title          : string;
    username       : string;
    categoriesId   : string;
    tagsId         : string;
    createdAt      : string;
    limit          : number;
    skip           : number;
    arrCategoriesId: number[];
    arrTagsId      : number[];
}

interface ResponseGetAllPostsI {
    id        : string;
    title     : string;
    username  : string;
    categories: ResponseGetAllCategoriesI[];
    tags      : ResponseGetAllTagsI[];
    createdAt : string;
    updatedAt : string;
}

interface ResponseGetByIdPostI {
    id   : string;
    title: string;
}

interface BodyInsertPostI {
    title       : string;
    content     : string;
    userId      : string;
    categoriesId: number[];
    tagsId      : number[];
}

interface BodySavePostI {
    title  : string;
    content: string;
    userId : string;
}

interface BodyUpdatePostI {
    title             : string;
    content           : string;
    userId            : string;
    deleteCategoriesId: number[];
    addCategoriesId   : number[];
    deleteTagsId      : number[];
    addTagsId         : number[];
}

export {
    ParamsGetAllPostsI,
    ResponseGetAllPostsI,
    ResponseGetByIdPostI,
    BodyInsertPostI,
    BodySavePostI,
    BodyUpdatePostI,
};
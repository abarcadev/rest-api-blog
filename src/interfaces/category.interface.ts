interface ParamsGetAllCategoriesI {
    name     : string;
    createdAt: string;
    limit    : number;
    skip     : number;
}

interface ResponseGetAllCategoriesI {
    id  : number;
    name: string;
}

interface ResponseGetByIdCategoryI extends ResponseGetAllCategoriesI {}

interface BodySaveCategoryI {
    name: string;
}

export {
    ParamsGetAllCategoriesI,
    ResponseGetAllCategoriesI,
    ResponseGetByIdCategoryI,
    BodySaveCategoryI,
};
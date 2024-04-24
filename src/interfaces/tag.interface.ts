interface ParamsGetAllTagsI {
    name     : string;
    createdAt: string;
    limit    : number;
    skip     : number;
}

interface ResponseGetAllTagsI {
    id  : number;
    name: string;
}

interface ResponseGetByIdTagI extends ResponseGetAllTagsI {}

interface BodySaveTagsI {
    name: string;
}

export {
    ParamsGetAllTagsI,
    ResponseGetAllTagsI,
    ResponseGetByIdTagI,
    BodySaveTagsI,
};
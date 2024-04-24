import { 
    createSchema, 
    validArray, 
    validEmptyDate, 
    validEmptyText, 
    validNumberMinMax, 
    validNumberMinMaxNotReq, 
    validTextMinMax 
} from "data-validator-joi";
import { regExp } from "../../utils/valid-regexp";

const getAll = createSchema({
    title       : validEmptyText(regExp.paragraph, 50),
    username    : validEmptyText(regExp.username, 50),
    categoriesId: validEmptyText(regExp.idList, 20),
    tagsId      : validEmptyText(regExp.idList, 20),
    createdAt   : validEmptyDate(),
    limit       : validNumberMinMax(1, 9999),
    skip        : validNumberMinMax(0, 9999),
});

const getById = createSchema({
    id: validTextMinMax(
        regExp.id,
        36,
        36
    )
});

const post = {
    title: validTextMinMax(
        regExp.paragraph,
        2,
        200
    ),
    content: validTextMinMax(
        regExp.paragraph,
        2,
        9999
    ),
    userId: validTextMinMax(
        regExp.id,
        36,
        36
    ),
};

const insert = createSchema({
    ...post,    
    categoriesId: validArray(
        validNumberMinMaxNotReq(1, 9999), 
        1
    ),
    tagsId: validArray(
        validNumberMinMaxNotReq(1, 9999), 
        1
    ),
});

const update = createSchema({
    ...post,
    deleteCategoriesId: validArray(
        validNumberMinMaxNotReq(1, 9999), 
        0
    ),
    addCategoriesId: validArray(
        validNumberMinMaxNotReq(1, 9999), 
        0
    ),
    deleteTagsId: validArray(
        validNumberMinMaxNotReq(1, 9999), 
        0
    ),
    addTagsId: validArray(
        validNumberMinMaxNotReq(1, 9999), 
        0
    ),
});

export const postSchema = {
    getAll,
    getById,
    insert,
    update,
};
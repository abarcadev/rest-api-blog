import { 
    createSchema, 
    validEmptyDate, 
    validEmptyText, 
    validNumberMinMax, 
    validTextMinMax 
} from "data-validator-joi";
import { regExp } from "../../utils/valid-regexp";

const getAll = createSchema({
    content   : validEmptyText(regExp.paragraph, 50),
    username  : validEmptyText(regExp.username, 50),
    postTitle : validEmptyText(regExp.paragraph, 50),
    createdAt : validEmptyDate(),
    limit     : validNumberMinMax(1, 9999),
    skip      : validNumberMinMax(0, 9999),
});

const getById = createSchema({
    id: validNumberMinMax(1, 9999)
});

const insert = createSchema({
    content: validTextMinMax(
        regExp.paragraph,
        2,
        9999
    ),
    postId: validTextMinMax(
        regExp.id,
        36,
        36
    ),
    userId: validTextMinMax(
        regExp.id,
        36,
        36
    ),
});

const update = createSchema({
    content: validTextMinMax(
        regExp.paragraph,
        2,
        9999
    ),
});

export const commentSchema = {
    getAll,
    getById,
    insert,
    update,
}
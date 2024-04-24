import { 
    createSchema, 
    validEmptyDate, 
    validEmptyText, 
    validNumberMinMax, 
    validTextMinMax
} from "data-validator-joi";
import { regExp } from "../../utils/valid-regexp";

const getAll = createSchema({
    name     : validEmptyText(regExp.name, 50),
    createdAt: validEmptyDate(),
    limit    : validNumberMinMax(1, 9999),
    skip     : validNumberMinMax(0, 9999),
});

const insert = createSchema({
    name: validTextMinMax(
        regExp.name,
        2,
        50
    ),
});

export const tagSchema = {
    getAll,
    insert,
};
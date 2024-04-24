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
    username : validEmptyText(regExp.username, 50),
    createdAt: validEmptyDate(),
    limit    : validNumberMinMax(1, 9999),
    skip     : validNumberMinMax(0, 9999),
});

const insert = createSchema({
    firstName: validTextMinMax(
        regExp.name,
        3,
        255
    ),
    lastName: validTextMinMax(
        regExp.name,
        3,
        255
    ),
    username: validTextMinMax(
        regExp.username,
        3,
        50
    ),
    password: validTextMinMax(
        regExp.password,
        8,
        20
    ),
    email: validTextMinMax(
        regExp.email,
        7,
        100
    ),
});

export const userSchema = {
    getAll,
    insert,
};
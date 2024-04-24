import { createSchema, validTextMinMax } from "data-validator-joi";
import { regExp } from "../../utils/valid-regexp";

const login = createSchema({
    username: validTextMinMax(
        regExp.username,
        3,
        50
    ),
    password: validTextMinMax(
        regExp.password,
        8,
        20
    )
});

export const authSchema = {
    login
};
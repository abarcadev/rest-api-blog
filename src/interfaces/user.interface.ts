interface ParamsGetAllUsersI {
    name     : string;
    username : string;
    createdAt: string;
    limit    : number;
    skip     : number;
}

interface ResponseGetAllUsersI {
    id      : string;
    name    : string;
    username: string;
    email   : string;   
}

interface ResponseGetByIdUserI extends ResponseGetAllUsersI {};

interface BodySaveUserI {
    firstName: string;
    lastName : string;
    username : string;
    password : string;
    email    : string;
}

export {
    ParamsGetAllUsersI,
    ResponseGetAllUsersI,
    ResponseGetByIdUserI,
    BodySaveUserI,
};
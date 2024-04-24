interface BodyLoginI {
    username: string;
    password: string;
}

interface ResponseGetLoginI {
    id       : string;
    firstName: string;
    lastName : string;
    username : string;
    email    : string;
}

export {
    BodyLoginI,
    ResponseGetLoginI,
};
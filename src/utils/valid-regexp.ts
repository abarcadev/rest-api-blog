const id        = /^[a-zA-Z0-9\-_]+$/;
const name      = /^([a-zA-Z]+[\s]*)+$/;
const email     = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
const username  = /^[a-z0-9]+$/;
const password  = /^[a-zA-Z0-9]+[\-_#]*$/;
const phrase    = /^([a-zA-Z0-9]+[\s-_#%]*)+$/;
const paragraph = /^([a-zA-Z0-9]+[\s-_#(),.%!]*)+$/;
const idList    = /^([0-9]+[,]*)+$/;

export const regExp = {
    id,
    name,
    email,
    username,
    password,
    phrase,
    paragraph,
    idList,
};
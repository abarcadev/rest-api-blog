interface ParamsGetAllCommentsI {
    content  : string;
    username : string;
    postTitle: string;
    createdAt: string;
    limit    : number;
    skip     : number;
}

interface ResponseGetAllCommentsI {
    id        : number;
    content   : string;
    username  : string;
    postTitle : string;
    createdAt : string;
    updatedAt : string;
}

interface ResponseGetByIdCommentI extends ResponseGetAllCommentsI {}

interface BodySaveCommentI {
    content: string;
    postId : string;
    userId : string;
}

export {
    ParamsGetAllCommentsI,
    ResponseGetAllCommentsI,
    ResponseGetByIdCommentI,
    BodySaveCommentI,
}
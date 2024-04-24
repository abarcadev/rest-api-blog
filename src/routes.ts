import { Application } from "express";
import { createAuthRoutes } from "./routes/auth.routes";
import { createUserRoutes } from "./routes/user.routes";
import { createCategoryRoutes } from "./routes/category.routes";
import { createTagRoutes } from "./routes/tag.routes";
import { createPostRouter } from "./routes/post.routes";
import { createCommentRoutes } from "./routes/comment.routes";

export const registerRoutes = (app: Application) => {
    app.use('/api/login', createAuthRoutes());
    app.use('/api/users', createUserRoutes());
    app.use('/api/categories', createCategoryRoutes());
    app.use('/api/tags', createTagRoutes());
    app.use('/api/posts', createPostRouter());
    app.use('/api/comments', createCommentRoutes());
};
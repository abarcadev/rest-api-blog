import "dotenv/config";
import { get } from "env-var";

export const env = {
    
    HOST: get('HOST').required().asString(),
    PORT: get('PORT').required().asPortNumber(),

    DB_TYPE    : get('DB_TYPE').required().asString(),
    DB_HOST    : get('DB_HOST').required().asString(),
    DB_PORT    : get('DB_PORT').required().asPortNumber(),
    DB_USER    : get('DB_USER').required().asString(),
    DB_PASSWORD: get('DB_PASSWORD').required().asString(),
    DB_NAME    : get('DB_NAME').required().asString(),

    TOKEN_SECRET_KEY: get('TOKEN_SECRET_KEY').required().asString(),
    TOKEN_EXPIRES   : get('TOKEN_EXPIRES').required().asString(),
    
    TIME_ZONE: get('TIME_ZONE').required().asString(),
      
};
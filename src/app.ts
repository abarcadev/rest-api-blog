import { dbConnection, startDbConnection } from "./database/typeorm.connection";
import Server from "./server";

const server = new Server({
    async startDbConnection() {
        return startDbConnection(dbConnection)
    }
});

server.start();
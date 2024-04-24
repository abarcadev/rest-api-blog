import express, { Request, Response } from "express";
import { env } from "./config/environment";
import { registerRoutes } from "./routes";
import { StatusCodeEnum } from "./enums/status-code.enum";
import { ROUTE_NOT_FOUND } from "./utils/messages";
import { ServerI } from "./interfaces/config.interface";

export default class Server {

    public readonly app        = express();
    private _host             : string;
    private _port             : number;
    private _startDbConnection: any;
    private _serverListener  ?: any;

    constructor({ startDbConnection }: ServerI ) {
        this._host              = env.HOST;
        this._port              = env.PORT;
        this._startDbConnection = startDbConnection;
        this.middlewares();
        this.routes();
        this.routeNotFound();
    }

    private middlewares(): void {
        this.app.disable('x-powered-by');
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    private routes(): void {
        registerRoutes(this.app);
    }

    private routeNotFound(): void {
        this.app.use((req: Request, res: Response) => {
            res.status(StatusCodeEnum.NotFound).json({ message: ROUTE_NOT_FOUND })
        });
    }

    async start(): Promise<void> {
        process.env.TZ = env.TIME_ZONE;

        await this._startDbConnection();

        this._serverListener = this.app.listen(this._port, this._host, () => {
            console.log(`Server running at http://${ this._host }:${ this._port }`);
        });        
    }

    async close(): Promise<void> {
        await this._serverListener?.close();
    }

}
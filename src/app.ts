import express, { Application } from "express";
import * as bodyParser from "body-parser";
import cors, { CorsOptions } from "cors";
import Routes from "./routes";
import Database from "./utils/database";
import { ErrorHandler } from "./utils/error-handler";

export default class NewApp {
    constructor(app: Application) {
       
        new Database();
        this.init(app);
    }

    private init(app: Application): void {
        const corsOptions: CorsOptions = {
            origin: "http://localhost:8100"
        }
        app.use(cors(corsOptions));
        app.use(express.json());
        app.use(express.urlencoded({ extended: true}));
        app.use(bodyParser.json());
        new Routes(app);
        ErrorHandler(app);
    }
}
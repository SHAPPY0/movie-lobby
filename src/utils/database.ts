import mongoose, { ConnectOptions } from "mongoose";
import { config } from "./config";

export default class Database {
    
    conn_uri = ""

    constructor() {
        this.conn_uri = `mongodb://${config.db.host}:${config.db.port}/${config.db.name}`;
        this.connect();
    }

    private connect(): void {
        const options = {
            autoIndex         : true,
            connectTimeoutMS  : 10000,
            socketTimeoutMS   : 45000,
        };

        mongoose.connect(this.conn_uri, options as ConnectOptions)
        mongoose.connection.on("connected", () => {
            console.log("Database connected!!!")
        });

        mongoose.connection.on('error', (err) => {
            console.log('DB connection error: ' + err);
        });
  
        mongoose.connection.on('disconnected', () => {
            console.log('DB connection disconnected');
        });

        // process.on('SIGINT', () => {
        //     mongoose.connection.close(() => {
        //         console.log('Mongoose default connection disconnected through app termination');
        //         process.exit(0);
        //     });
        // });
    }
}
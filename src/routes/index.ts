import { Application } from "express";
import UserRoutes from "./users.routes";
import MoviesRoutes from "./movies.routes";

export default class Routes {
    constructor(app: Application) {
        app.use("/api/user", UserRoutes);
        app.use("/api", MoviesRoutes);
    }
}
import { Router, Request, Response, NextFunction } from "express";
import UsersController from "../controllers/users.controllers";
import { ErrorMapper } from "../utils/error-handler";

class UserRoutes {
    router = Router();
    controller = new UsersController();
    constructor() {
        this.router.post("/login", this.controller.login, ErrorMapper)
    }
}

export default new UserRoutes().router;
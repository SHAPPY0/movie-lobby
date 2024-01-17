import { NextFunction, Request, Response } from "express";
import { config } from "../utils/config";
import { singJWT } from "../utils/jwt";

export default class UsersController {
    async login(req: Request, res: Response, next: NextFunction) {
        try {
            let reqBody = req.body;
            if (!reqBody || !reqBody.username || !reqBody.password) {
                return next({"status": 400, "message": "Bad Request"});
            }
            if (reqBody.username === config.user.username && reqBody.password  === config.user.password) {
                return res.status(201).json({"success": true, "token": singJWT(config.user)});
            } else {
                return next({"status": 401, "message": "Invalid credentails"});
            }
        } catch(ex) {
            return next({"status": 500, "message": "Internal server error!"});
        }
    }
}
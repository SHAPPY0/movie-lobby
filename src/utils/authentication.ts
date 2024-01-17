import { NextFunction, Request, Response } from "express";
import { verifyJWT } from "./jwt";

interface IRequest extends Request {
    userName:   string;
    role:   string;
}

export function authenticate(req: Request, res: Response, next: NextFunction) {
    const token = req.header("Authorization");
    if (!token) return next({"status": 403, "message": "Access Denied"});
    try {
        let _token = token.split("Bearer ");
        if (!_token) return next({"status": 403, "message": "Invalid token"});
        let decoded = verifyJWT(_token[1]);
        if (decoded) {
            const _req: IRequest = req as any as IRequest;
            if (decoded.role === "admin") {
                _req.userName = decoded.username;
                _req.role = decoded.role;
                next();
            } else return next({"status": 403, "message": "Access Denied"});
            
        } else return next({"status": 403, "message": "Access Denied"});
    } catch(ex) {
        return next({"status": 403, "message": "Invalid token"});
    }
}
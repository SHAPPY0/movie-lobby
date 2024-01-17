import * as jwt from 'jsonwebtoken';
import { config } from "../utils/config";

interface ITokenUser {
    username:   string;
    password:   string;
    role:   string;
}

export function singJWT(data: any) {
    return jwt.sign(data, config.jwt_secret, {"expiresIn": "1h"});
}

export function verifyJWT(token: string) {
    return jwt.verify(token, config.jwt_secret) as ITokenUser;
}
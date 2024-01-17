import * as dotenv from  "dotenv";

dotenv.config({path: ".env"})

export const config = {
    "env":  process.env.APP_ENV || "dev",
    "port": process.env.PORT || 8100,
    "db":   {
        "user": process.env.DB_USER || "root",
        "password": process.env.DB_PASSWORD || "password",
        "host": process.env.DB_HOST || "localhost",
        "name": process.env.DB_NAME || "movie_lobby",
        "port": process.env.DB_PORT || "27017"
    },
    "user": {
        "username": process.env.ADMIN_USERNAME || "admin",
        "password": process.env.ADMIN_PASSWORD || "password",
        "role": "admin"
    },
    "jwt_secret": "qwertyuiop[]\';lkjhgfdsazxcvbnm,./1234567890-="
}
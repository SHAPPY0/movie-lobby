import { NextFunction, Request, Response } from "express";
import IMoviesModel, { Movies } from "../models/movies.models";
import Cache from "../utils/cache";

export default class UsersController {

    async addMovie(req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.body || !Object.keys(req.body).length) return next({"status":401 ,"success": false, "message": "Bad Request"});
            //TODO: check admin id in database then proceed further.
            req.body.title = req.body?.title.toLowerCase(); 
            const NewMovie = new Movies(req.body);
            return NewMovie.save().then((data) => {
                return res.json({"success": true, "data": {"movie_id": data._id}, "message": "Movie added successfully"});
            }).catch(next)
        } catch(ex) {
            console.log("asdasd", ex);
            return next({"status": 500, "message": (ex as Error).message ||  "Internal server error!"});
        }
    }

    async findAllMovies(req: Request, res: Response, next: NextFunction) {
        try{
            const movies: Array<IMoviesModel> = await Movies.find();
            return res.json({"success": true, "data":  movies});
        } catch(ex) {
            return next({"status": 500, "message": (ex as Error).message ||  "Internal server error!"});
        }
    }

    async updateMovie(req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.params.id) return next({"status": 401, "message": "Bad Request"});
            let updatedData = req.body;
            const movies: IMoviesModel | null = await Movies.findById(req.params.id);
            if (!movies) return res.json({"success": false, "message": "Invalid movie id"});

            if (updatedData.title) movies.title = updatedData.title.toLowerCase();
            if (updatedData.thumbnail) movies.thumbnail = updatedData.name;
            if (updatedData.streamLink) movies.streamLink = updatedData.streamLink;
            if (updatedData.genre) movies.genre = updatedData.genre;
            if (updatedData.rating) movies.rating = updatedData.rating;
            if (updatedData.releaseDate) movies.releaseDate = updatedData.releaseDate;
            movies.updatedAt = new Date();
            let result = await movies.save();
            if (result) return res.json({"success": true, "message": "Movie updated successfully"});
            else return next({"status": 500, "message": "Internal Server Error"});
        } catch(ex) {
            return next({"status": 500, "message": (ex as Error).message ||  "Internal server error!"});
        }
    }

    async deleteMovie(req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.params.id) return next({"status": 401, "message": "Bad Request"});

            const movies: IMoviesModel | null = await Movies.findById(req.params.id);
            if (!movies) return res.json({"success": false, "message": "Invalid movie id"});

            let result = await movies.deleteOne({"_id": req.params.id});
            if (result && result.deletedCount) return res.json({"success": true, "message": "Movie deleted successfully"});
            else return next({"status": 500, "message": "Internal Server Error"});
        } catch(ex) {
            return next({"status": 500, "message": (ex as Error).message ||  "Internal server error!"});
        }
    }

    async searchMovies(req: Request, res: Response, next: NextFunction) {
        try {
            let query = req.query;
            let result: Array<IMoviesModel> = [];
            if (!query || !query.q) return next({"status": 401, "message": "Invalid search criteria"});
            query.q = (query.q as string).toLowerCase();
            let cacheValue = Cache.get(query.q);
            if (!cacheValue) {
                let moviesByTitle = await Movies.find({"title": query.q});
                if (!moviesByTitle || !moviesByTitle.length) {
                    let moviesByGenre = await Movies.find({"genre": query.q});
                    result = [...result, ...moviesByGenre];
                } else result = [...result, ...moviesByTitle];
            } else {
                result = [...result, ...cacheValue];
            }
            if (result.length) Cache.put(query.q, result);
            return res.json({"success": true, "data": result});
        } catch(ex) {
            return next({"status": 500, "message": (ex as Error).message ||  "Internal server error!"});
        }
    }
}
import { Router } from "express";
import MoviesController from "../controllers/movies.controllers";
import { ErrorMapper } from "../utils/error-handler";
import { authenticate} from "../utils/authentication";

class UserRoutes {
    router = Router();
    controller = new MoviesController();

    constructor() {
        this.router.get("/movies", this.controller.findAllMovies, ErrorMapper)
        this.router.post("/movies", authenticate,  this.controller.addMovie, ErrorMapper)
        this.router.put("/movies/:id", authenticate, this.controller.updateMovie, ErrorMapper)
        this.router.delete("/movies/:id", authenticate, this.controller.deleteMovie, ErrorMapper)
        this.router.get("/search",  this.controller.searchMovies, ErrorMapper)
    
    }
}

export default new UserRoutes().router;
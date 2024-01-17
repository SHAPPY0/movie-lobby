import { Application, NextFunction, Request, Response } from "express";

export function ErrorHandler(app: Application) {
    app.use((req, res, next) => {
        interface CustomError extends Error {
            status?: number;
            path?: string;
        }
        const err: CustomError = new Error("Not Found");
        err.status = 404;
        err.path = req.url || "";
        next(err);
    });

    app.use((err: any, req: Request, res: Response, next: any) => {
        res.status(err.status || 500);
        res.json({
            "error": {
                "message": err.message,
                "error": err
            }
        })
    })
}

export function ErrorMapper(err: any, req: Request, res: Response, next: NextFunction) { 
    if(!err) return next();
    var code = err.status || 500;
      var response = {"success": false, "status": code, "message": err.message || err, "data": {} };
  
    if(err.data) response["data"] = err.data;
    if(code > 500) console.log(err.stack);
    
    res.status(code).json(response);
};
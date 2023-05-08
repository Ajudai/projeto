import { Request, Response} from "express";

class FirstController{
    
    public home(req: Request, res: Response){
       res.json({
        message: "Hello world!",
       });
    }
}

export const firstController = new FirstController();
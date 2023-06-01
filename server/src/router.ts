import { Router, Response, Request } from "express";

const router: Router = Router();

router.get("/", (req: Request, res: Response) => {
    res.json({ message: "Hello world" });
  });

export { router };
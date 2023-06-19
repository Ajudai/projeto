import { Router } from "express";
import SessionController from "../controllers/session/SessionController";
import { verifyToken } from "../middlewares/verifyToken";
const router = Router();


router.post("/login", SessionController.login);

export default router;
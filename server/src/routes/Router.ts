import { Router } from "express";
import SessionController from "../controllers/session/SessionController";
import registerController from "../controllers/register/RegisterController";
import { verifyToken } from "../middlewares/verifyToken";
const router = Router();


router.post("/login", SessionController.login);
router.post("/register", registerController.register)
export default router;
import { Router } from "express";
import SessionController from "../controllers/session/SessionController";
import registerController from "../controllers/register/RegisterController";
import { verifyToken } from "../middlewares/verifyToken";
import isCPFValid from "../middlewares/CPFValidation";
import passwordValidator from "../middlewares/PasswordValidation";
import userNameValidation from "../middlewares/UserNameValidation";
import emailValidator from "../middlewares/emailValidation";
import PedidoController from "../controllers/pedido/PedidoController";
import UserController from "../controllers/user/UserController";
const router = Router();

router.post("/login", SessionController.login);
router.post(
  "/register",
  userNameValidation,
  emailValidator,
  isCPFValid,
  passwordValidator,
  registerController.register
);
// USUÁRIOS
router.get("/user/:_id", UserController.buscarUserPorId);
router.put("/address/:_id", UserController.editarEnderecoUsuario);
router.put('/editarDados/:_id', userNameValidation, emailValidator, UserController.editarDadosUsuario)
// PEDIDOS 
router.get("/pedidos", PedidoController.buscarTodosOsPedidos);
router.get("/pedidos/:_id", PedidoController.buscarPedidoPorId);
router.post("/ajuda/:userId", PedidoController.novoPedido);

export default router;

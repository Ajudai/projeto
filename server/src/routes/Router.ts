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
import { uploadImage } from "../services/firebase";
import multer, { memoryStorage } from "multer";
import transformPhoneNumber from "../middlewares/phoneNumberParser";

const router = Router();
const Multer = multer({
  storage: memoryStorage(),
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

router.post("/login", SessionController.login);
router.post(
  "/register",
  userNameValidation,
  emailValidator,
  isCPFValid,
  transformPhoneNumber,
  passwordValidator,
  registerController.register
);

// USUÁRIOS
router.get("/user/:_id", UserController.buscarUserPorId);
router.put("/address/:_id", UserController.editarEnderecoUsuario);
router.put(
  "/editarDados/:_id",
  userNameValidation,
  emailValidator,
  transformPhoneNumber,
  passwordValidator,
  Multer.single("fotos"),
  uploadImage,
  UserController.editarDadosUsuario
);

// PEDIDOS
router.get("/pedidos", PedidoController.buscarTodosOsPedidos);
router.get("/pedidos/:_id", PedidoController.buscarPedidoPorId);
router.post(
  "/ajuda/:userId",
  Multer.single("fotos"),
  uploadImage,
  PedidoController.novoPedido
);
router.post("/validarAjuda/:_id", PedidoController.validarPedido);
router.put(
  "/editarAjuda/:_id",
  Multer.single("fotos"),
  uploadImage,
  PedidoController.editarPedido
);
router.delete("/deletarPedido/:_id", PedidoController.deletarPedido);

export default router;

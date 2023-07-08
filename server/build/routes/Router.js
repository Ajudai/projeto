"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const SessionController_1 = __importDefault(require("../controllers/session/SessionController"));
const RegisterController_1 = __importDefault(require("../controllers/register/RegisterController"));
const CPFValidation_1 = __importDefault(require("../middlewares/CPFValidation"));
const PasswordValidation_1 = __importDefault(require("../middlewares/PasswordValidation"));
const UserNameValidation_1 = __importDefault(require("../middlewares/UserNameValidation"));
const emailValidation_1 = __importDefault(require("../middlewares/emailValidation"));
const PedidoController_1 = __importDefault(require("../controllers/pedido/PedidoController"));
const UserController_1 = __importDefault(require("../controllers/user/UserController"));
const firebase_1 = require("../services/firebase");
const multer_1 = __importStar(require("multer"));
const router = (0, express_1.Router)();
const Multer = (0, multer_1.default)({
    storage: (0, multer_1.memoryStorage)(),
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
});
router.post("/login", SessionController_1.default.login);
router.post("/register", UserNameValidation_1.default, emailValidation_1.default, CPFValidation_1.default, PasswordValidation_1.default, RegisterController_1.default.register);
// USUÁRIOS
router.get("/user/:_id", UserController_1.default.buscarUserPorId);
router.put("/address/:_id", UserController_1.default.editarEnderecoUsuario);
router.put("/editarDados/:_id", UserNameValidation_1.default, emailValidation_1.default, UserController_1.default.editarDadosUsuario);
// PEDIDOS
router.get("/pedidos", PedidoController_1.default.buscarTodosOsPedidos);
router.get("/pedidos/:_id", PedidoController_1.default.buscarPedidoPorId);
router.post("/ajuda/:userId", Multer.single("fotos"), firebase_1.uploadImage, PedidoController_1.default.novoPedido);
router.post("/validarAjuda/:_id", PedidoController_1.default.validarPedido);
router.put("/editarAjuda/:_id", Multer.single("fotos"), firebase_1.uploadImage, PedidoController_1.default.editarPedido);
router.delete("/deletarPedido/:_id", PedidoController_1.default.deletarPedido);
exports.default = router;

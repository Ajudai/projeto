"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Pedido_1 = __importDefault(require("../../models/pedido/Pedido"));
const User_1 = __importDefault(require("../../models/user/User"));
exports.default = {
    novoPedido(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { titulo, descricao, contato, categoria } = req.body;
                const { userId } = req.params;
                const { fireBaseUrl } = req.file ? req.file : "";
                console.log(fireBaseUrl);
                if (!titulo && !descricao && !contato && !categoria) {
                    return res.status(400).send({ message: "Insira informações válidas" });
                }
                yield User_1.default.findById(userId)
                    .then((user) => __awaiter(this, void 0, void 0, function* () {
                    const pedidoDeAjuda = new Pedido_1.default({
                        titulo,
                        fotos: fireBaseUrl,
                        descricao,
                        contato,
                        categoria,
                        validado: true,
                        userId: userId,
                        endereco: user === null || user === void 0 ? void 0 : user.endereco[0],
                        createdAt: new Date(),
                    });
                    yield pedidoDeAjuda.save().then(() => {
                        user === null || user === void 0 ? void 0 : user.meusPedidos.push(pedidoDeAjuda);
                        user === null || user === void 0 ? void 0 : user.save();
                    });
                    return res.status(200).send({ message: "Ajuda solicitada!" });
                }))
                    .catch((error) => {
                    return res
                        .status(400)
                        .send({ message: "Erro ao pedir ajuda", error });
                });
            }
            catch (error) {
                return res.status(500).send({ message: "Internal server error" });
            }
        });
    },
    buscarTodosOsPedidos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Pedido_1.default.find()
                    .then((response) => {
                    return res.status(200).send(response);
                })
                    .catch((error) => {
                    return res
                        .status(400)
                        .send({ message: "Erro ao buscar os pedidos", error });
                });
            }
            catch (error) {
                return res.status(500).send({ message: "Internal server error", error });
            }
        });
    },
    buscarPedidoPorId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id } = req.params;
                yield Pedido_1.default.findById(_id)
                    .then((pedido) => {
                    return res.status(200).send([pedido]);
                })
                    .catch((error) => {
                    return res
                        .status(400)
                        .send({ message: "Erro ao buscar pedido", error });
                });
            }
            catch (error) {
                return res.status(500).send({ message: "Internal server error", error });
            }
        });
    },
    editarPedido(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id } = req.params;
                const { titulo, fotos, descricao, categoria, contato } = req.body;
                yield Pedido_1.default.findByIdAndUpdate(_id, {
                    titulo,
                    fotos,
                    descricao,
                    categoria,
                    contato,
                })
                    .then((pedido) => {
                    return res.status(200).send([pedido]);
                })
                    .catch((error) => {
                    return res
                        .status(400)
                        .send({ message: "Erro ao atualizar pedido", error });
                });
            }
            catch (error) {
                return res.status(500).send({ message: "Internal server error", error });
            }
        });
    },
    deletarPedido(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id } = req.params;
                yield Pedido_1.default.findByIdAndDelete(_id)
                    .then(() => {
                    return res.status(200).send({ message: "Pedido de ajuda excluído!" });
                })
                    .catch((error) => {
                    return res
                        .status(401)
                        .send({ message: "Erro ao excluir pedido!", error });
                });
            }
            catch (error) {
                return res.status(500).send({ message: "Internal server error", error });
            }
        });
    },
    validarPedido(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id } = req.params;
                const { validado } = req.body;
                yield Pedido_1.default.findByIdAndUpdate(_id, {
                    validado,
                })
                    .then(() => {
                    return res.status(200).send({ message: "Pedido atualizado!" });
                })
                    .catch((error) => {
                    return res
                        .status(400)
                        .send({ message: "Erro ao atualizar pedido", error });
                });
            }
            catch (error) {
                return res.status(500).send({ message: "Internal server error", error });
            }
        });
    },
};

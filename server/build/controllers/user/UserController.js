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
const User_1 = __importDefault(require("../../models/user/User"));
const Endereco_1 = __importDefault(require("../../models/endereco/Endereco"));
exports.default = {
    editarDadosUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id } = req.params;
                const { userName, userEmail, userPhoneNumber } = req.body;
                yield User_1.default.findById(_id)
                    .then((user) => {
                    if (user) {
                        user.userName = userName !== null && userName !== void 0 ? userName : user.userName;
                        user.userEmail = userEmail !== null && userEmail !== void 0 ? userEmail : user.userEmail;
                        user.userPhoneNumber = userPhoneNumber !== null && userPhoneNumber !== void 0 ? userPhoneNumber : user.userPhoneNumber;
                        return user.save();
                    }
                }).catch((error) => {
                    return res.status(401).send({ message: "Erro ao atualizar dados", error });
                });
                res.status(200).send({ message: "Dados atualizados com sucesso" });
            }
            catch (error) {
                return res.status(500).send({ message: "Internal server error" });
            }
        });
    },
    editarEnderecoUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { rua, bairro, cidade, complemento, numero, estado, cep } = req.body;
                const { _id } = req.params;
                yield User_1.default.findById(_id).then((user) => __awaiter(this, void 0, void 0, function* () {
                    const criarNovoEndereco = new Endereco_1.default({
                        rua,
                        bairro,
                        cidade,
                        complemento,
                        numero,
                        estado,
                        cep,
                        userId: _id,
                    });
                    yield criarNovoEndereco.save().then(() => {
                        user === null || user === void 0 ? void 0 : user.endereco.push(criarNovoEndereco);
                        user === null || user === void 0 ? void 0 : user.save();
                    });
                    return res.status(200).send({ message: "Enderço atualizado" });
                }));
            }
            catch (error) {
                return res.status(500).send({ message: "Internal server error" });
            }
        });
    },
    buscarUserPorId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id } = req.params;
                yield User_1.default.findById(_id)
                    .then((user) => {
                    return res.status(200).send(user);
                })
                    .catch((error) => {
                    return res
                        .status(404)
                        .send({ message: "Usuário não encontrado!", error });
                });
            }
            catch (error) {
                return res.status(500).send({ message: "Internal server error", error });
            }
        });
    },
};

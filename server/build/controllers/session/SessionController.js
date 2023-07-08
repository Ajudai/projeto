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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: "./src/.env" });
exports.default = {
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userEmail, userPassword } = req.body;
                if (!userEmail || !userPassword) {
                    return res.status(400).send({ message: "Preencha os campos corretamente" });
                }
                const userAlreadyExists = yield User_1.default.findOne({ userEmail });
                if (userEmail !== (userAlreadyExists === null || userAlreadyExists === void 0 ? void 0 : userAlreadyExists.userEmail)) {
                    return res.status(401).send({ message: "Email ou senha incorretos!" });
                }
                if (!userAlreadyExists) {
                    return res.status(400).send({ message: "Usuário não encontrado" });
                }
                const validPassword = yield bcrypt_1.default.compare(userPassword, userAlreadyExists === null || userAlreadyExists === void 0 ? void 0 : userAlreadyExists.userPassword);
                if (!validPassword) {
                    return res.status(400).send({ message: "Email ou senha incorretos!" });
                }
                const token = jsonwebtoken_1.default.sign({
                    email: userAlreadyExists,
                }, process.env.JWT_KEY, {
                    expiresIn: "48h",
                });
                return res.send({
                    userEmail: userAlreadyExists === null || userAlreadyExists === void 0 ? void 0 : userAlreadyExists.userEmail,
                    _id: userAlreadyExists === null || userAlreadyExists === void 0 ? void 0 : userAlreadyExists._id,
                    userName: userAlreadyExists === null || userAlreadyExists === void 0 ? void 0 : userAlreadyExists.userName,
                    token: token,
                });
            }
            catch (error) {
                return res.status(500).send({ message: "Internal server error", error });
            }
        });
    },
};

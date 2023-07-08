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
const hashPassword = (userPassword) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const salt = yield bcrypt_1.default.genSalt(10);
        const encryptedPassword = yield bcrypt_1.default.hash(userPassword, salt);
        return encryptedPassword;
    }
    catch (err) {
        console.error(err);
        throw err;
    }
});
exports.default = {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userName, userEmail, userPhoneNumber, userCpf, userPassword, createdAt } = req.body;
                if (!userEmail && !userName && !userPassword && !userPhoneNumber) {
                    return res.status(400).send({ message: 'Preencha os campos' });
                }
                ;
                if (!userPhoneNumber) {
                    return res.status(404).send({ message: 'Insira um número de telefone' });
                }
                let userPhoneNumberNoCarachter = userPhoneNumber.replace(/\(.*?\)|\-/g, '');
                let password = userPassword.replace(/\s/g, "");
                const searchEmail = yield User_1.default.findOne({ userEmail });
                if (searchEmail) {
                    return res.status(400).send({ message: "Email em uso!" });
                }
                ;
                const hashedPassword = yield hashPassword(password);
                const newUser = new User_1.default({
                    userName,
                    userEmail,
                    userPhoneNumber: userPhoneNumberNoCarachter,
                    userCpf,
                    userPassword: hashedPassword,
                    createdAt
                });
                yield newUser.save();
                return res.status(200).send({ message: "Registrado(a) com sucesso!" });
            }
            catch (error) {
                console.error(error);
                return res.status(500).send({ message: "Internal server error" });
            }
        });
    },
};

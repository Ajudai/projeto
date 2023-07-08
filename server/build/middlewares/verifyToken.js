"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: "./src/.env" });
const verifyToken = (req, res, next) => {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        const decode = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
        req.user = decode;
        next();
    }
    catch (error) {
        return res.status(401).send({ message: "Falha na autenticação" });
    }
};
exports.verifyToken = verifyToken;

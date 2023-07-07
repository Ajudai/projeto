"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserModelSchema = new mongoose_1.default.Schema({
    userName: {
        type: String,
        required: true,
        minlength: 2,
    },
    userEmail: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    userPhoneNumber: {
        type: String,
        required: true,
    },
    userCpf: {
        type: String,
        required: true,
    },
    meusPedidos: [
        {
            titulo: String,
            descricao: String,
            contato: String,
            categoria: String,
            validado: Boolean,
            userId: String,
            fotos: String,
        },
    ],
    endereco: [
        {
            _id: String,
            rua: String,
            bairro: String,
            cidade: String,
            complemento: String,
            numero: Number,
            estado: String,
            cep: String,
        },
    ],
    userPassword: {
        type: String,
        required: true,
        minlength: 8,
    },
    createdAt: { type: Date },
});
const User = mongoose_1.default.model("User", UserModelSchema);
exports.default = User;

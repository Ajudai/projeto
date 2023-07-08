"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const PedidoModel = new mongoose_1.default.Schema({
    titulo: {
        type: String,
        required: true,
        minlength: 2,
    },
    descricao: {
        type: String,
        required: true,
        minlength: 8,
    },
    contato: {
        type: String,
        required: true,
    },
    categoria: {
        type: String,
        required: true,
    },
    validado: {
        type: Boolean,
        required: true,
    },
    fotos: { type: String },
    endereco: [],
    userId: {
        type: String,
        required: true,
    },
    createdAt: { type: Date },
});
const Pedido = mongoose_1.default.model("Pedido", PedidoModel);
exports.default = Pedido;

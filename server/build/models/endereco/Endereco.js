"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const EnderecoModelSchema = new mongoose_1.default.Schema({
    rua: { type: String, required: true },
    bairro: { type: String, required: true },
    cidade: { type: String, required: true },
    complemento: { type: String, required: true },
    numero: { type: Number, required: true },
    estado: { type: String, required: true },
    cep: { type: String, required: true },
    userId: String,
});
const Endereco = mongoose_1.default.model("Endereco", EnderecoModelSchema);
exports.default = Endereco;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const port = 5000;
const index_1 = __importDefault(require("./index"));
const http_1 = __importDefault(require("http"));
const db_1 = __importDefault(require("./db"));
const server = http_1.default.createServer(index_1.default);
(0, db_1.default)().then(() => {
    server.listen(port, () => {
        console.log(`Server running`);
    });
}).catch((error) => console.error("Erro ao se conectar ao DB", error));

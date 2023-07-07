"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Regex_1 = require("../util/Regex");
function emailValidator(req, res, next) {
    const { userEmail } = req.body;
    if (!userEmail) {
        return res.status(400).send({ message: "Por favor, preencha o email." });
    }
    if (!Regex_1.emailRegex.test(userEmail)) {
        return res.status(400).send({ message: 'O email fornecido é inválido.' });
    }
    next();
}
exports.default = emailValidator;

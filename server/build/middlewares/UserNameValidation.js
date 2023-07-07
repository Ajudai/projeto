"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function userNameValidation(req, res, next) {
    const { userName } = req.body;
    if (!userName) {
        return res.status(400).json({ message: "Seu nome não pode ser vazio." });
    }
    const specialCharsRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
    if (specialCharsRegex.test(userName)) {
        return res.status(400).json({ message: "Seu nome não pode conter caracteres especiais." });
    }
    const numberRegex = /\d/;
    if (numberRegex.test(userName)) {
        return res.status(400).json({ message: "Seu nome não pode conter números." });
    }
    next();
}
exports.default = userNameValidation;

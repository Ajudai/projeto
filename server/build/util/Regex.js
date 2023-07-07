"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.specialCharactersRegex = exports.emailRegex = exports.telefoneRegex = void 0;
exports.telefoneRegex = /\(.*?\)|\-/g;
exports.emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
exports.specialCharactersRegex = /[!@#$%^&*(),.?":{}|<>]/;

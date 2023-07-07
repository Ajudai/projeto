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
exports.uploadImage = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
var serviceAccount = require("../config/FIREBASE_CONFIG_KEY.json");
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(serviceAccount),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});
const bucket = firebase_admin_1.default.storage().bucket();
const uploadImage = (req, res, next) => {
    if (!req.file)
        return next();
    const image = req.file;
    const name = Date.now() + "." + image.originalname.split(".").pop();
    const file = bucket.file(name);
    const stream = file.createWriteStream({
        metadata: {
            contentType: image.mimetype,
        },
    });
    stream.on("error", (err) => {
        console.error(err);
    });
    stream.on("finish", () => __awaiter(void 0, void 0, void 0, function* () {
        yield file.makePublic();
        if (req && req.file) {
            req.file.fireBaseUrl = `https://storage.googleapis.com/${bucket.name}/${name}`;
        }
        next();
    }));
    stream.end(image.buffer);
};
exports.uploadImage = uploadImage;

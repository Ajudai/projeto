import { NextFunction, Request, Response } from "express";
import admin from "firebase-admin";
var serviceAccount = require("../config/FIREBASE_CONFIG_KEY.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});

const bucket = admin.storage().bucket();

export const uploadImage = (req: any, res: Response, next: NextFunction) => {
  if (!req.file) return next();

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

  stream.on("finish", async () => {
    await file.makePublic();
    if (req && req.file) {
      req.file.fireBaseUrl = `https://storage.googleapis.com/${bucket.name}/${name}`;
    }
    next();
  });

  stream.end(image.buffer);
};

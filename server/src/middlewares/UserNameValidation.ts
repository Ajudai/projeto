import { NextFunction, Request, Response } from 'express';

function userNameValidation(req: Request, res: Response, next: NextFunction) {
  const { userName } = req.body;

  if (!userName) {
    return res.status(400).json({ message: "Seu nome não pode ser vazio." });
  }

  const specialCharsRegex: RegExp = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
  if (specialCharsRegex.test(userName)) {
    return res.status(400).json({ message: "Seu nome não pode conter caracteres especiais." });
  }

  const numberRegex: RegExp = /\d/;
  if (numberRegex.test(userName)) {
    return res.status(400).json({ message: "Seu nome não pode conter números." });
  }

  next();
}

export default userNameValidation;
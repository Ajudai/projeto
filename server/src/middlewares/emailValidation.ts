import { NextFunction, Request, Response } from 'express';
import { emailRegex } from '../util/Regex';
function emailValidator(req: Request, res: Response, next: NextFunction) {
  const { userEmail } = req.body;

  if (!userEmail) {
    return res.status(400).send({ message: "Por favor, preencha o email." });
  }

  if (!emailRegex.test(userEmail)) {
    return res.status(400).send({ message: 'O email fornecido é inválido.' });
  }

  next();
}

export default emailValidator;
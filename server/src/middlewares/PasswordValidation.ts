import { NextFunction, Request, Response } from 'express';

function passwordValidator(req: Request, res: Response, next: NextFunction) {
  const { userPassword } = req.body;

  if (!userPassword) {
    return res.status(400).send({ message: "Por favor preencha a senha" });
  }

  if (userPassword.length < 8) {
    return res.status(400).send({ message: 'A senha deve ter no mínimo 8 caracteres.' });
  }

  if (!/[a-z]/.test(userPassword) || !/[A-Z]/.test(userPassword)) {
    return res.status(400).send({ message: 'A senha deve conter letras maiúsculas e minúsculas.' });
  }

  if (!/[!@#$%^&*]/.test(userPassword)) {
    return res.status(400).send({ message: 'A senha deve conter um caractere especial.' });
  }

  next();
}

export default passwordValidator;
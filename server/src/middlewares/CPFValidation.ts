import { Request, Response, NextFunction } from "express";

interface IValidateCPF extends Request {
  userCpf: string;
}

function isCPFValid(req: Request, res: Response, next: NextFunction) {
  const { userCpf }: IValidateCPF = req.body;

  const cleanedCPF = userCpf.replace(/\D/g, "");

  if (cleanedCPF.length !== 11) {
    return res.status(403).send({ message: 'CPF menor que 11 caracteres' });
  }

  if (/^(\d)\1+$/.test(cleanedCPF)) {
    return res.status(403).send({ message: 'CPF inválido' });
  }

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanedCPF.charAt(i)) * (10 - i);
  }
  let remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }
  if (remainder !== parseInt(cleanedCPF.charAt(9))) {
    return res.status(403).send({ message: 'CPF inválido' });
  }

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleanedCPF.charAt(i)) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }
  if (remainder !== parseInt(cleanedCPF.charAt(10))) {
    return res.status(403).send({ message: 'CPF inválido' });
  }

  // Atualiza o valor do CPF no corpo da requisição para o CPF limpo
  req.body.userCpf = cleanedCPF;

  next();
}

export default isCPFValid;

import { NextFunction, Request, Response } from "express";

function transformPhoneNumber(req: Request, res: Response, next: NextFunction) {
  const { userPhoneNumber } = req.body;

  const parsedPhoneNumber = userPhoneNumber.replace(/\D/g, '');

  req.body.userPhoneNumber = parsedPhoneNumber;

  next();
}

export default transformPhoneNumber;
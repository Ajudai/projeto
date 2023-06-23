import User from "../../models/user/User";
import bCrypt from "bcrypt";
import { Request, Response } from "express";
import { IUserModel } from "../../@types/user";

const hashPassword = async (userPassword: string) => {
  try {
    const salt = await bCrypt.genSalt(10);
    const encryptedPassword = await bCrypt.hash(userPassword, salt);
    return encryptedPassword;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export default {
  async register(req: Request, res: Response) {
    try {
      const { userName, userEmail, userPhoneNumber, userCpf, userPassword, createdAt }: IUserModel = req.body;

      if (!userEmail && !userName && !userPassword && !userPhoneNumber) {
        return res.status(400).send({ message: 'Preencha os campos' })
      };

      if (!userPhoneNumber) {
        return res.status(404).send({ message: 'Insira um número de telefone' });
      }

      let userPhoneNumberNoCarachter = userPhoneNumber.replace(/\(.*?\)|\-/g, '');
      let password = userPassword.replace(/\s/g, "");

      const searchEmail = await User.findOne<Promise<IUserModel>>({ userEmail });

      if (searchEmail) {
        return res.status(400).send({ message: "Email em uso!" });
      };

      const hashedPassword = await hashPassword(password);

      const newUser = new User({
        userName,
        userEmail,
        userPhoneNumber: userPhoneNumberNoCarachter,
        userCpf,
        userPassword: hashedPassword,
        createdAt
      });

      await newUser.save();

      return res.status(200).send({ message: "Registrado(a) com sucesso!" });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: "Internal server error" });
    }
  },
};

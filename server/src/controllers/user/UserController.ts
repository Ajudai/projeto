import { Request, Response } from "express";
import User from "../../models/user/User";
import Endereco from "../../models/endereco/Endereco";

export default {
  async editarEnderecoUsuario(req: Request, res: Response) {
    try {
      const { rua, bairro, cidade, complemento, numero, estado, cep } =
        req.body;
      const { _id } = req.params;

      await User.findById(_id).then(async (user) => {
        const criarNovoEndereco = new Endereco({
          rua,
          bairro,
          cidade,
          complemento,
          numero,
          estado,
          cep,
          userId: _id,
        });
        await criarNovoEndereco.save().then(() => {
          user?.endereco.push(criarNovoEndereco);
          user?.save();
        });
        return res.status(200).send({ message: "Enderço atualizado" });
      });
    } catch (error) {
      return res.status(500).send({ message: "Internal server error" });
    }
  },

  async buscarUserPorId(req: Request, res: Response) {
    try {
      const { _id } = req.params;
      await User.findById(_id)
        .then((user) => {
          return res.status(200).send(user);
        })
        .catch((error) => {
          return res
            .status(404)
            .send({ message: "Usuário não encontrado!", error });
        });
    } catch (error) {
      return res.status(500).send({ message: "Internal server error", error });
    }
  },
};

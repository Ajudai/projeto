import { Request, Response } from "express";
import Pedido from "../../models/pedido/Pedido";
import { IPedidoModel } from "../../@types/pedidos";
import User from "../../models/user/User";

export default {
  async novoPedido(req: Request, res: Response) {
    try {
      const { titulo, fotos, descricao, contato, categoria }: IPedidoModel = req.body;
      const { userId } = req.params;

      if (!titulo && !fotos && !descricao && !contato && !categoria) {
        return res.status(400).send({ message: "Insira informações válidas" });
      };

      await User.findById(userId)
        .then(async (user) => {
          const pedidoDeAjuda = new Pedido({
            titulo,
            fotos,
            descricao,
            contato,
            categoria,
            validado: false,
            userId: userId,
            createdAt: new Date(),

          })
          await pedidoDeAjuda.save().then(() => {
            user?.meusPedidos.push(pedidoDeAjuda);
            user?.save();
          })
          return res.status(200).send({ message: "Ajuda solicitada!" });
        })
        .catch((error) => {
          return res.status(400).send({ message: "Erro ao pedir ajuda", error });
        })

    } catch (error) {
      return res.status(500).send({ message: "Internal server error" });
    }
  }
}
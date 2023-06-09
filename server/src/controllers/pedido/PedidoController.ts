import { Request, Response } from "express";
import Pedido from "../../models/pedido/Pedido";
import { IPedidoModel } from "../../@types/pedidos";
import User from "../../models/user/User";

export default {
  async novoPedido(req: Request, res: Response) {
    try {
      const { titulo, descricao, contato, categoria }: IPedidoModel = req.body;
      const { userId } = req.params;
      const { fireBaseUrl }: any = req.file ? req.file : "";
      console.log(fireBaseUrl);

      if (!titulo && !descricao && !contato && !categoria) {
        return res.status(400).send({ message: "Insira informações válidas" });
      }

      await User.findById(userId)
        .then(async (user) => {
          const pedidoDeAjuda = new Pedido({
            titulo,
            fotos: fireBaseUrl,
            descricao,
            contato,
            categoria,
            validado: true,
            userId: userId,
            endereco: user?.endereco[0],
            createdAt: new Date(),
          });
          await pedidoDeAjuda.save().then(() => {
            user?.meusPedidos.push(pedidoDeAjuda);
            user?.save();
          });
          return res.status(200).send({ message: "Ajuda solicitada!" });
        })
        .catch((error) => {
          return res
            .status(400)
            .send({ message: "Erro ao pedir ajuda", error });
        });
    } catch (error) {
      return res.status(500).send({ message: "Internal server error" });
    }
  },

  async buscarTodosOsPedidos(req: Request, res: Response) {
    try {
      await Pedido.find()
        .then((response) => {
          return res.status(200).send(response);
        })
        .catch((error) => {
          return res
            .status(400)
            .send({ message: "Erro ao buscar os pedidos", error });
        });
    } catch (error) {
      return res.status(500).send({ message: "Internal server error", error });
    }
  },

  async buscarPedidoPorId(req: Request, res: Response) {
    try {
      const { _id } = req.params;
      await Pedido.findById(_id)
        .then((pedido) => {
          return res.status(200).send([pedido]);
        })
        .catch((error) => {
          return res
            .status(400)
            .send({ message: "Erro ao buscar pedido", error });
        });
    } catch (error) {
      return res.status(500).send({ message: "Internal server error", error });
    }
  },

  async editarPedido(req: Request, res: Response) {
    try {
      const { _id } = req.params;
      const { titulo, fotos, descricao, categoria, contato }: IPedidoModel =
        req.body;

      await Pedido.findByIdAndUpdate(_id, {
        titulo,
        fotos,
        descricao,
        categoria,
        contato,
      })
        .then((pedido) => {
          return res.status(200).send([pedido]);
        })
        .catch((error) => {
          return res
            .status(400)
            .send({ message: "Erro ao atualizar pedido", error });
        });
    } catch (error) {
      return res.status(500).send({ message: "Internal server error", error });
    }
  },

  async deletarPedido(req: Request, res: Response) {
    try {
      const { _id } = req.params;

      await Pedido.findByIdAndDelete(_id)
        .then(() => {
          return res.status(200).send({ message: "Pedido de ajuda excluído!" });
        })
        .catch((error) => {
          return res
            .status(401)
            .send({ message: "Erro ao excluir pedido!", error });
        });
    } catch (error) {
      return res.status(500).send({ message: "Internal server error", error });
    }
  },

  async validarPedido(req: Request, res: Response) {
    try {
      const { _id } = req.params;
      const { validado }: IPedidoModel = req.body;

      await Pedido.findByIdAndUpdate(_id, {
        validado,
      })
        .then(() => {
          return res.status(200).send({ message: "Pedido atualizado!" });
        })
        .catch((error) => {
          return res
            .status(400)
            .send({ message: "Erro ao atualizar pedido", error });
        });
    } catch (error) {
      return res.status(500).send({ message: "Internal server error", error });
    }
  },
};

import mongoose from "mongoose";
import { IPedidoModel } from "../../@types/pedidos";

const PedidoModel = new mongoose.Schema<IPedidoModel>({
  nomeDoPedido: {
    type: String,
    required: true,
    minlength: 2,
  },

  tipoDeAjuda: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match:
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  },

  descricao: {
    type: String,
    required: true,
    minlength: 8,
  },

  fotosParaPedido: [
    {
      _id: {
        type: String,
      },
      url: { type: String }
    }
  ],

  _id: {
    type: String,
    required: true,
    unique: true,
  },

  createdAt: { type: Date }
});

const User = mongoose.model<IPedidoModel>("User", PedidoModel);
export default User;
import mongoose from "mongoose";
import { IPedidoModel } from "../../@types/pedidos";

const PedidoModel = new mongoose.Schema<IPedidoModel>({
  titulo: {
    type: String,
    required: true,
    minlength: 2,
  },

  descricao: {
    type: String,
    required: true,
    minlength: 8,
  },

  contato: {
    type: String,
    required: true,
  },

  categoria: {
    type: String,
    required: true,
  },

  validado: {
    type: Boolean,
    required: true,
  },

  fotos: [
    {
      _id: {
        type: String,
      },
      url: { type: String },
    },
  ],

  endereco: [],

  userId: {
    type: String,
    required: true,
  },

  createdAt: { type: Date },
});

const Pedido = mongoose.model<IPedidoModel>("Pedido", PedidoModel);
export default Pedido;

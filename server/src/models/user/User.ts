import mongoose from "mongoose";
import { IUserModel } from "../../@types/user";

const UserModelSchema = new mongoose.Schema<IUserModel>({
  userName: {
    type: String,
    required: true,
    minlength: 2,
  },

  userEmail: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },

  userPhoneNumber: {
    type: String,
    required: true,
  },

  userCpf: {
    type: String,
    required: true,
  },

  profilePicture: { type: String },

  meusPedidos: [
    {
      titulo: String,
      descricao: String,
      contato: String,
      categoria: String,
      validado: Boolean,
      userId: String,
      fotos: String,
    },
  ],

  endereco: [
    {
      _id: String,
      rua: String,
      bairro: String,
      cidade: String,
      complemento: String,
      numero: Number,
      estado: String,
      cep: String,
    },
  ],

  userPassword: {
    type: String,
    required: true,
    minlength: 8,
  },

  createdAt: { type: Date },
});

const User = mongoose.model<IUserModel>("User", UserModelSchema);
export default User;

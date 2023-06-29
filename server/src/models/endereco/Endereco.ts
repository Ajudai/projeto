import mongoose, { mongo } from "mongoose";
import { IEnderecoModel } from "../../@types/endereco";
const EnderecoModelSchema = new mongoose.Schema<IEnderecoModel>({
  rua: { type: String, required: true },
  bairro: { type: String, required: true },
  cidade: { type: String, required: true },
  complemento: { type: String, required: true },
  numero: { type: Number, required: true },
  estado: { type: String, required: true },
  cep: { type: String, required: true },
  userId: String,
});

const Endereco = mongoose.model<IEnderecoModel>(
  "Endereco",
  EnderecoModelSchema
);
export default Endereco;

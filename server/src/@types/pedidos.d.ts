import { IEnderecoModel } from "./endereco";

export interface IPedidoModel {
  titulo: string;
  descricao: string;
  contato: string;
  categoria: string;
  validado: boolean;
  userId: string;
  fotos: any;
  endereco: IEnderecoModel[];
  createdAt: any;
}

import { IPedidoModel } from "./pedidos";

export interface IUserModel {
  userName: string;
  userEmail: string;
  userPhoneNumber: string;
  userCpf: string;
  userPassword: string;
  meusPedidos: IPedidoModel[];
  createdAt: any;
  _id: string;
}


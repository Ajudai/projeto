import { IEndereco } from './endereco';
import { IPedidoModel } from './pedido';

export interface IUserData {
  profilePicture: string | undefined;
  userName: string;
  userEmail: string;
  fotos: string;
  userPhoneNumber: string;
  endereco?: IEndereco[];
  meusPedidos?: IPedidoModel[];
  _id?: string;
  token: string;
}

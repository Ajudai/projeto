export interface IPedidoModel {
  titulo: string;
  descricao: string;
  contato: string;
  categoria: string;
  validado: boolean;
  userId: string;
  fotos: { id: string; url: string }[];
  endereco: { id: string; estado: string; bairro: string; cep: string; numero: string; complemento: string }[];
  createdAt: any;
  _id: string;
}

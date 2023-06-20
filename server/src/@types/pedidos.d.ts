export interface IPedidoModel {
    nomeDoPedido: string;
    tipoDeAjuda: string;
    descricao: string;
    _id: string;
    fotosParaPedido: {id: string, url: string}[]
    createdAt: any;
}
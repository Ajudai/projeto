export interface IPedidoModel {
    titulo: string;
    descricao: string;
    contato: string;
    categoria: string;
    validado: boolean;
    userId: string;
    fotos: { id: string, url: string }[]
    createdAt: any;
}
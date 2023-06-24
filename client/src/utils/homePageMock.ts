import { IPedidoModel } from "../@types/pedido";

export const homePagePedidosMock: IPedidoModel[] = [
  {
    titulo: "Preciso de comida",
    descricao: "Estou passando necessidades e preciso de comida para poder me alimentar",
    contato: "(81)98683-8081",
    categoria: "Alimentação",
    validado: true,
    userId: "_idMock1",
    fotos: [
      { id: "1", url: "https://static.portaldacidade.com/unsafe/https://s3.amazonaws.com/umuarama.portaldacidade.com/img/news/2021-03/com-geladeira-vazia-mae-faz-apelo-para-conseguir-comida-e-leite-para-criancas-605c85330b7a0.jpeg" }
    ],
    endereco: [
      { id: "0", estado: "Pernambuco", bairro: "Cavaleiro", cep: "54250030", numero: "97", complemento: "Casa" }
    ],
    createdAt: "24 Junho 10:14"
  },
  {
    titulo: "Roupa para doação",
    descricao: "Tenho roupas em bom estado para doar. Variam de tamanhos P a M.",
    contato: "(81)98765-4321",
    categoria: "Vestuário",
    validado: false,
    userId: "_idMock2",
    fotos: [
      { id: "2", url: "https://img.olx.com.br/images/57/573391150869093.jpg" },
      { id: "3", url: "https://img.olx.com.br/images/10/106363298045390.jpg" }
    ],
    endereco: [
      {
        id: "1",
        estado: "Pernambuco",
        bairro: "Boa Viagem",
        cep: "51021010",
        numero: "123",
        complemento: "Apartamento 502"
      }],
    createdAt: "24 Junho 10:14"

  },
  {
    titulo: "Ajuda com transporte",
    descricao: "Preciso de ajuda para conseguir ir ao médico. Não tenho condições de pagar pelo transporte.",
    contato: "(81)98765-4321",
    categoria: "Transporte",
    validado: true,
    userId: "_idMock3",
    fotos: [],
    endereco: [
      {
        id: "2",
        estado: "Pernambuco",
        bairro: "Santo Amaro",
        cep: "50040230",
        numero: "789",
        complemento: "Sobrado"
      }],
    createdAt: "24 Junho 10:14"

  },
  {
    titulo: "Doação de móveis",
    descricao: "Estou doando uma mesa, duas cadeiras e um armário. Preciso que retirem no local.",
    contato: "(81)91234-5678",
    categoria: "Móveis",
    validado: true,
    userId: "_idMock4",
    fotos: [
      { id: "4", url: "https://img.olx.com.br/images/55/555331751374899.jpg" },
      { id: "5", url: "https://img.olx.com.br/images/47/475374028763544.jpg" }
    ],
    endereco: [
      {
        id: "3",
        estado: "Pernambuco",
        bairro: "Ibura",
        cep: "51270650",
        numero: "456",
        complemento: "Casa 2"
      }],
    createdAt: "24 Junho 10:14"

  },
  {
    titulo: "Preciso de medicamentos",
    descricao: "Tenho uma doença crônica e preciso de medicamentos específicos. Não tenho condições de comprar.",
    contato: "(81)91234-5678",
    categoria: "Saúde",
    validado: true,
    userId: "_idMock5",
    fotos: [],
    endereco: [
      {
        id: "4",
        estado: "Pernambuco",
        bairro: "Boa Vista",
        cep: "50060020",
        numero: "321",
        complemento: "Apartamento 801"
      }],
    createdAt: "24 Junho 10:14"

  },
  {
    titulo: "Aulas de reforço",
    descricao: "Ofereço aulas de reforço em matemática e física para alunos do ensino médio de maneira gratuita a título de experiência.",
    contato: "(81)98765-4321",
    categoria: "Educação",
    validado: true,
    userId: "_idMock6",
    fotos: [
      { id: "6", url: "https://www.rbsdirect.com.br/imagesrc/27448837.jpg?w=700" },
    ],
    endereco: [
      {
        id: "5",
        estado: "Pernambuco",
        bairro: "Candeias",
        cep: "54420000",
        numero: "55",
        complemento: "Casa"
      }],
    createdAt: "24 Junho 10:14"

  },
  {
    titulo: "Cesta básica para doação",
    descricao: "Estou arrecadando alimentos não perecíveis para montar cestas básicas e doar a famílias carentes.",
    contato: "(81)91234-5678",
    categoria: "Doações",
    validado: true,
    userId: "_idMock7",
    fotos: [{ id: "7", url: "https://megacestabasicarj.com.br/wp-content/uploads/2016/11/produto-cesta-basica-media-510x600.jpg" }],
    endereco: [
      {
        id: "6",
        estado: "Pernambuco",
        bairro: "Barro",
        cep: "54250600",
        numero: "789",
        complemento: "Casa"
      }],
    createdAt: "24 Junho 10:14"

  },
  {
    titulo: "Apoio jurídico gratuito",
    descricao: "Advogados oferecem apoio jurídico gratuito para pessoas que não têm condições de contratar um advogado.",
    contato: "(81)98765-4321",
    categoria: "Serviços",
    validado: true,
    userId: "_idMock10",
    fotos: [{ id: "8", url: "https://fmp.edu.br/wp-content/uploads/2021/02/qual-e-o-papel-do-advogado-corporativo-a-fmp-te-mostra.jpg" }],
    endereco: [
      {
        id: "7",
        estado: "Pernambuco",
        bairro: "Imbiribeira",
        cep: "51190130",
        numero: "12",
        complemento: "Apartamento 201"
      }],
    createdAt: "24 Junho 10:14"

  }

]
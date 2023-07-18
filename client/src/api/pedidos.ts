import { IPedidoModel } from '../@types/pedido';
import { api } from '../service/api';

interface IAjuda {
  _id: string;
}

export const pedirAjuda = async (formData: FormData, _id: IAjuda) => {
  try {
    const res = await api.post<IAjuda>(`/ajuda/${_id._id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return { data: res.data };
  } catch (error: any) {
    if (error.response.data.message) {
      return { error: error.response.data.message };
    }
    return { error: 'Erro desconhecido' };
  }
};

export const getAllPedidos = async (): Promise<{ data?: IPedidoModel[]; error?: string }> => {
  try {
    const res = await api.get<IPedidoModel[]>('/pedidos');
    return { data: res.data };
  } catch (error: any) {
    if (error.response.data.message) {
      return { error: error.response.data.message };
    }
    return { error: 'Erro desconhecido' };
  }
};

export const getPedidoById = async (_id: string): Promise<{ data?: IPedidoModel[]; error?: string }> => {
  try {
    const res = await api.get<IPedidoModel[]>(`/pedidos/${_id}`);
    return { data: res.data };
  } catch (error: any) {
    if (error.response.data.message) {
      return { error: error.response.data.message };
    }
    return { error: 'Erro desconhecido' };
  }
};

export const editarPedido = async (formData: FormData, _id: string) => {
  try {
    const res = await api.put<IPedidoModel[]>(`editarPedido/${_id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return { data: res.data };
  } catch (error: any) {
    if (error.response.data.message) {
      return { error: error.response.data.message };
    }
    return { error: 'Erro desconhecido' };
  }
};

export const deletarPedido = async (_id: string): Promise<{ data?: any; error?: string }> => {
  try {
    const res = await api.delete(`deletarPedido/${_id}`);
    return { data: res.data };
  } catch (error: any) {
    if (error.response.data.message) {
      return { error: error.response.data.message };
    }
    return { error: 'Erro desconhecido' };
  }
};

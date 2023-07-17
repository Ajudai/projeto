import { IUserData } from '../@types/user';
import { api } from '../service/api';
interface ILogin {
  userEmail: string;
  userPassword: string;
}

interface IUserDataUpdate {
  _id: string;
}

interface IEndereco {
  estado: string;
  cidade: string;
  cep: string;
  bairro: string;
  rua: string;
  numero: string;
  complemento: string;
}

export const userLogin = async ({ userEmail, userPassword }: ILogin) => {
  try {
    const res = await api.post<ILogin>('login', {
      userEmail,
      userPassword,
    });
    return { data: res.data };
  } catch (error: any) {
    if (error.response.data.message) {
      return { error: error.response.data.message };
    }
    return { error: 'Erro desconhecido' };
  }
};

export const editarUsuario = async (formData: FormData, _id: IUserDataUpdate) => {
  try {
    const res = await api.put<IUserDataUpdate>(`editarDados/${_id?._id}`, formData, {
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

export const editarEndereco = async (
  _id: string,
  { estado, cidade, cep, bairro, rua, numero, complemento }: IEndereco,
) => {
  try {
    const res = await api.put(`address/${_id}`, {
      estado,
      cidade,
      cep,
      bairro,
      rua,
      numero,
      complemento,
    });
    return { data: res.data };
  } catch (error: any) {
    if (error.response?.data?.message) {
      return { error: error.response.data.message };
    }
    return { error: 'Erro desconhecido' };
  }
};

export const getUserById = async (_id: string): Promise<{ data?: IUserData[]; error?: string }> => {
  try {
    const res = await api.get<IUserData[]>(`/user/${_id}`);
    return { data: res.data };
  } catch (error: any) {
    if (error.response.data.message) {
      return { error: error.response.data.message };
    }
    return { error: 'Erro desconhecido' };
  }
};

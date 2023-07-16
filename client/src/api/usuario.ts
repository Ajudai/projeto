import { IEndereco } from '../@types/endereco';
import { IUserData } from '../@types/user';
import { api } from '../service/api';
interface ILogin {
  userEmail: string;
  userPassword: string;
}

interface IUserDataUpdate {
  _id: string;
}

interface IEnderecoUpdate {
  _id: string;
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

export const editarEndereco = async (_id: IUserData, enderecoData: IEnderecoUpdate) => {
  try {
    console.log(enderecoData);
    const res = await api.put<IEnderecoUpdate>(`address/${_id}`, enderecoData);
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

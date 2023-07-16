import { IUserData } from '../@types/user';
import { api } from '../service/api';
interface ILogin {
  userEmail: string;
  userPassword: string;
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

/*export const editarUsuario = async ({ nome, email, telefone, _id }: IUserDataUpdate) => {
  try {
    const res = await api.put<IUserDataUpdate>(`editarDados/${_id}`, {
      userName: nome,
      userEmail: email,
      userPhoneNumber: telefone,
    });
    return { data: res.data };
  } catch (error: any) {
    if (error.response.data.message) {
      return { error: error.response.data.message };
    }
    return { error: 'Erro desconhecido' };
  }
};*/

export const editarUsuario = async (formData: FormData, _id: string) => {
  console.log(_id);
  try {
    const res = await api.put<IUserData>(`/editarDados/${_id}`, formData, {
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

export const editarEndereco = async (enderecoData: IEndereco, _id: string) => {
  try {
    const res = await api.put<IUserData>(`/editarEndereco/${_id}`, enderecoData);
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

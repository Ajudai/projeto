import { useNavigate } from 'react-router-dom';
import { api } from '../service/api';

interface IUserDataUpdate {
  nome: string;
  email: string;
  telefone: string;
  _id: string;
}

interface IUserLogin {
  userEmail: string;
  userPassword: string;
}

export const login = async ({ userEmail, userPassword }: IUserLogin) => {
  try {
    const res = await api
      .post<IUserDataUpdate>(`login`, {
        userEmail,
        userPassword,
      })
      .then(() => {
        localStorage.setItem('userData', JSON.stringify(res?.data));
      });
    return { data: res.data };
  } catch (error: any) {
    if (error.response.data.message) {
      return { error: error.response.data.message };
    }
  }
};

export const editarUsuario = async ({ nome, email, telefone, _id }: IUserDataUpdate) => {
  try {
    const res = await api.put<IUserDataUpdate>(`pedidos/${_id}`, {
      userName: nome,
      userEmail: email,
      userPhoneNumber: telefone,
    });
    return { data: res.data };
  } catch (error: any) {
    if (error.response.data.message) {
      return { error: error.response.data.message };
    }
  }
};

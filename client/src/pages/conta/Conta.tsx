import { useEffect, useState } from 'react';
import { editarUsuario } from '../../api/usuario';
import { IUserData } from '../../@types/user';

const Conta = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [userData, setUserData] = useState<IUserData>();
  const [resFromServer, setResFromServer] = useState({});

  useEffect(() => {
    const getUserDataFromStorage = () => {
      const getFromStorage = localStorage.getItem('userData');
      const parseUserData = getFromStorage && JSON.parse(getFromStorage);
      setUserData(parseUserData);
    };
    getUserDataFromStorage();
  }, [resFromServer]);

  const handleEditarUsuario = async () => {
    const { data, error } = await editarUsuario({ nome, email, telefone, _id: userData?._id! });
    try {
      setResFromServer(data!);
    } catch (err) {
      console.error(error);
    }
  };

  return <div>Conta</div>;
};

export default Conta;

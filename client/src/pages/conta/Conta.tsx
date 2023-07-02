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

  const HandleEditarUsuario = async () => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
    const { data, error } = await editarUsuario({ nome, email, telefone, _id: userData?._id! });
    try {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
      setResFromServer(data!);
    } catch (err) {
      console.error(error);
    }
  };

  return <div>Conta</div>;
};

export default Conta;

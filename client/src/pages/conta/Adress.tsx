import styles from './conta.module.scss';
import { useEffect, useState } from 'react';
import { IUserData } from '../../@types/user';
import Header from '../../components/header/Header';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';
import { editarEndereco } from '../../api/usuario';
import axios from 'axios';

const Address = () => {
  const [userData, setUserData] = useState<IUserData>();
  const [CEP, setCEP] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [resFromServer, setResFromServer] = useState({});
  const [endereco, setEndereco] = useState({
    cidade: '',
    estado: '',
    bairro: '',
    rua: '',
    cep: CEP,
    numero: numero,
    complemento: complemento,
  });

  useEffect(() => {
    const getUserDataFromStorage = () => {
      const getFromStorage = localStorage.getItem('userData');
      const parseUserData = getFromStorage && JSON.parse(getFromStorage);
      setCEP(parseUserData?.endereco?.CEP);
      setNumero(parseUserData?.endereco?.numero);
      setComplemento(parseUserData?.endereco?.complemento);
      setUserData(parseUserData);
      console.log(parseUserData);
    };
    getUserDataFromStorage();
  }, [resFromServer]);

  const consultarCEP = async (cep: string) => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      if (response.data.erro) {
        throw new Error('CEP não encontrado');
      }
      return response.data;
    } catch (error) {
      throw new Error('Erro ao consultar o CEP');
    }
  };

  const handleEditarEndereco = async () => {
    const enderecoData = {
      estado: endereco.estado,
      cidade: endereco.cidade,
      CEP: CEP,
      bairro: endereco.bairro,
      rua: endereco.rua,
      numero: numero,
      complemento: complemento,
    };
    console.log(CEP, numero, complemento);
    const { data, error } = await editarEndereco(userData?._id!, enderecoData);
    try {
      setResFromServer(data!);
      console.log(data);
    } catch (err) {
      console.error(error);
    }
  };

  const handleChangeCEP = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputCEP = event.target.value;
    let formattedCEP = inputCEP.replace(/\D/g, '');

    if (formattedCEP.length > 5) {
      formattedCEP = formattedCEP.replace(/(\d{5})(\d{0,3})/, '$1-$2');
    }

    setCEP(formattedCEP);

    if (formattedCEP.length === 9) {
      try {
        const data = await consultarCEP(formattedCEP);
        setEndereco({
          cidade: data.localidade,
          estado: data.uf,
          bairro: data.bairro,
          rua: data.logradouro,
          cep: data.cep,
          numero: data.numero,
          complemento: data.complemento,
        });
      } catch (error: any) {
        console.error(error.message);
      }
    }
  };

  return (
    <main className={styles.contaPageMain}>
      <Header />
      <div className={styles.contaPageData}>
        <Input value={CEP} label="CEP" type="text" onChange={handleChangeCEP} />
        <Input
          value={endereco.rua}
          label="Rua"
          type="text"
          onChange={(e) => setEndereco({ ...endereco, rua: e.target.value })}
        />
        <Input value={numero} label="Número" type="text" onChange={(e) => setNumero(e.target.value)} />
        <Input value={complemento} label="Complemento" type="text" onChange={(e) => setComplemento(e.target.value)} />
        <Input
          value={endereco.cidade}
          label="Cidade"
          type="text"
          onChange={(e) => setEndereco({ ...endereco, cidade: e.target.value })}
        />
        <Input
          value={endereco.bairro}
          label="Bairro"
          type="text"
          onChange={(e) => setEndereco({ ...endereco, bairro: e.target.value })}
        />
        <Input
          value={endereco.estado}
          label="Estado"
          type="text"
          onChange={(e) => setEndereco({ ...endereco, estado: e.target.value })}
        />
      </div>
      <div className={styles.contaPageButton}>
        <Button size="medium" rounded onClick={handleEditarEndereco} label="Salvar endereço" />
      </div>
    </main>
  );
};

export default Address;

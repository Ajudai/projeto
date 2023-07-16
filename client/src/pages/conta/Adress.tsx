import styles from './conta.module.scss';
import { useEffect, useState } from 'react';
import { IUserData } from '../../@types/user';
import { editarEndereco } from '../../api/usuario';
import Header from '../../components/header/Header';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';
import { handleCEPChange } from '../../utils/formatCep';

const Adress = () => {
  const [userData, setUserData] = useState<IUserData>();
  const [estado, setEstado] = useState('');
  const [cidade, setCidade] = useState('');
  const [CEP, setCEP] = useState('');
  const [bairro, setBairro] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [resFromServer, setResFromServer] = useState({});

  useEffect(() => {
    const getUserDataFromStorage = () => {
      const getFromStorage = localStorage.getItem('userData');
      const parseUserData = getFromStorage && JSON.parse(getFromStorage);
      setEstado(parseUserData?.endereco);
      setCidade(parseUserData?.endereco);
      setCEP(parseUserData?.endereco);
      setBairro(parseUserData?.endereco);
      setRua(parseUserData?.endereco);
      setNumero(parseUserData?.endereco);
      setComplemento(parseUserData?.endereco);
      setUserData(parseUserData);
      console.log(parseUserData);
    };
    getUserDataFromStorage();
  }, [resFromServer]);

  const handleEditarEndereco = async () => {
    const enderecoData = {
      estado,
      cidade,
      CEP,
      bairro,
      rua,
      numero,
      complemento,
    };

    const { data, error } = await editarEndereco(enderecoData, userData?._id!);
    try {
      setResFromServer(data!);
      console.log(data);
    } catch (err) {
      console.error(error);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleCEPChange(event, setCEP);
  };

  return (
    <main className={styles.contaPageMain}>
      <Header />
      <div className={styles.contaPageData}>
        <Input value={estado} label="Estado" type="text" onChange={(e) => setEstado(e.target.value)} />
        <Input value={cidade} label="Cidade" type="text" onChange={(e) => setCidade(e.target.value)} />
        <Input value={CEP} label="CEP" type="text" onChange={handleChange} />
        <Input value={bairro} label="Bairro" type="text" onChange={(e) => setBairro(e.target.value)} />
        <Input value={rua} label="Rua" type="text" onChange={(e) => setRua(e.target.value)} />
        <Input value={numero} label="Número" type="number" onChange={(e) => setNumero(e.target.value)} />
        <Input value={complemento} label="Complemento" type="text" onChange={(e) => setComplemento(e.target.value)} />
      </div>
      <div className={styles.contaPageButton}>
        <Button size="medium" rounded onClick={handleEditarEndereco} label="Salvar endereço" />
      </div>
    </main>
  );
};

export default Adress;

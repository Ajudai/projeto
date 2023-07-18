import styles from './conta.module.scss';
import { useEffect, useState } from 'react';
import { IUserData } from '../../@types/user';
import Header from '../../components/header/Header';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';
import { editarEndereco } from '../../api/usuario';
import axios from 'axios';
import { useDisclosure } from '@chakra-ui/react';
import ModalComponent from '../../components/modal/ModalComponent';

const Address = () => {
  const [userData, setUserData] = useState<IUserData[]>([]);
  console.log(userData?.[0]?._id);
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
  const { isOpen: isAddressOpen, onOpen: onAddressOpen, onClose: onAddressClose } = useDisclosure();

  useEffect(() => {
    const getUserDataFromStorage = () => {
      const getFromStorage = localStorage.getItem('user');
      const parseUserData = getFromStorage && JSON.parse(getFromStorage);
      const enderecos = parseUserData?.endereco;
      const ultimoEndereco = enderecos[enderecos.length - 1];
      setCEP(ultimoEndereco?.cep);
      setNumero(ultimoEndereco?.numero);
      setComplemento(ultimoEndereco?.complemento);
      setEndereco({
        cidade: ultimoEndereco?.cidade,
        estado: ultimoEndereco?.estado,
        bairro: ultimoEndereco?.bairro,
        rua: ultimoEndereco?.rua,
        cep: ultimoEndereco?.cep,
        numero: ultimoEndereco?.numero,
        complemento: ultimoEndereco?.complemento,
      });
      setUserData([parseUserData]);
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
    console.log(CEP, numero, complemento);
    const { data, error } = await editarEndereco(userData?.[0]?._id!, {
      estado: endereco.estado,
      cidade: endereco.cidade,
      cep: CEP,
      bairro: endereco.bairro,
      rua: endereco.rua,
      numero,
      complemento,
    });
    try {
      setResFromServer(data!);
      console.log(data);
      setResFromServer(data!);
      onAddressOpen();
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

  const handleModalClose = () => {
    onAddressClose();
    window.location.reload();
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
      <ModalComponent
          modalTitle="Endereço atualizado com sucesso!"
          modalBody="Você acabou de atualizar seu endereço :)"
          buttonSuccessLabel="Página inicial"
          isOpen={isAddressOpen}
          onClose={onAddressClose}
        />
    </main>
  );
};

export default Address;

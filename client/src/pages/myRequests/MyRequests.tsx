import HomeComponent from '../../components/homeComponent/HomeComponent';
import Header from '../../components/header/Header';
import styles from './myRequest.module.scss';
import { useEffect, useState } from 'react';
import { IUserData } from '../../@types/user';
import { Button, Select, useDisclosure } from '@chakra-ui/react';
import { editarPedido } from '../../api/pedidos';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
} from '@chakra-ui/react';
import { handlePhoneNumberChange } from '../../utils/formatPhoneNumber';

const MyRequests = () => {
  const [userData, setUserData] = useState<IUserData[]>();
  const [resFromServer, setResFromServer] = useState({});
  const [titulo, setTitulo] = useState('');
  const [contato, setContato] = useState('');
  const [descricao, setDescricao] = useState('');
  const [fotos, setFotos] = useState(null);
  const [categoria, setCategoria] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [pedidoId, setPedidoId] = useState('');

  useEffect(() => {
    const getUserDataFromStorage = () => {
      const getFromStorage = localStorage.getItem('user');
      const parseUserData = getFromStorage && JSON.parse(getFromStorage);
      setUserData([parseUserData]);
    };
    getUserDataFromStorage();
  }, []);

  const handleEditarPedido = async (_id: string) => {
    const formData = new FormData();
    const pedidoUpdate = { titulo, fotos, descricao, categoria, contato, userId: userData?.[0]?._id };

    Object.entries(pedidoUpdate).forEach(([key, value]) => {
      return formData.append(key, value!);
    });
    const { data, error } = await editarPedido(formData, _id);
    try {
      setResFromServer(data!);
    } catch (err) {
      console.error(error);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handlePhoneNumberChange(event, setContato);
  };

  const openModalSetId = (_id: string) => {
    try {
      onOpen();
      setPedidoId(_id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className={styles.myRequestMainContainer}>
      <Header />
      <div className={styles.myRequestHomeComponentDiv}>
        {userData?.[0]?.meusPedidos?.map((info) => (
          <div className={styles.myRequestCard}>
            <HomeComponent
              key={info?._id}
              _id={info?._id}
              titulo={info?.titulo}
              bairro={info?.endereco?.[0]?.bairro}
              categoria={info?.categoria}
              createdAt={info?.createdAt}
              url={info?.fotos}
              myRequest
              openMyRequest={() => openModalSetId(info?._id)}
            />
          </div>
        ))}
      </div>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input placeholder="Título" onChange={(e) => setTitulo(e.target.value)} />
            <Input placeholder="(DDD) 98765-4321" onChange={handleChange} value={contato} type="text" />
            <Input placeholder="Introduza uma breve descrição aqui..." onChange={(e) => setDescricao(e.target.value)} />
            <Select
              backgroundColor={'#d9d9d9'}
              placeholder="Escolha uma categoria"
              onChange={(e) => setCategoria(e.target.value)}
            >
              <option value="Comida">Comida</option>
              <option value="Roupas">Roupas</option>
              <option value="Educação">Educação</option>
              <option value="Brinquedos">Brinquedos</option>
              <option value="Outros">Outros</option>
            </Select>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Fechar
            </Button>
            <Button variant="ghost" onClick={() => handleEditarPedido(pedidoId)}>
              Editar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </main>
  );
};

export default MyRequests;

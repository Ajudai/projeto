import HomeComponent from '../../components/homeComponent/HomeComponent';
import Header from '../../components/header/Header';
import styles from './myRequest.module.scss';
import { useEffect, useRef, useState } from 'react';
import { IUserData } from '../../@types/user';
import { Button, Select, useDisclosure } from '@chakra-ui/react';
import { deletarPedido, editarPedido } from '../../api/pedidos';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  useToast,
} from '@chakra-ui/react';
import { handlePhoneNumberChange } from '../../utils/formatPhoneNumber';
import { PiMountainsFill } from 'react-icons/pi';
import { getUserById } from '../../api/usuario';
import { useParams } from 'react-router-dom';

const MyRequests = () => {
  const [userData, setUserData] = useState<IUserData[]>();
  const [getUserDataServer, setGetUserDataServer] = useState<any[]>([]);
  const [resFromServer, setResFromServer] = useState({});
  const [titulo, setTitulo] = useState('');
  const [contato, setContato] = useState('');
  const [descricao, setDescricao] = useState('');
  const [fotos, setFotos] = useState(null);
  const [categoria, setCategoria] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [pedidoId, setPedidoId] = useState('');
  const inputFile = useRef<HTMLInputElement>(null);
  const toast = useToast();
  const { _id } = useParams();

  useEffect(() => {
    const getUserDataFromStorage = () => {
      const getFromStorage = localStorage.getItem('user');
      const parseUserData = getFromStorage && JSON.parse(getFromStorage);
      setUserData([parseUserData]);
    };
    getUserDataFromStorage();

    const getUserData = async () => {
      const { data, error } = await getUserById(_id!);
      try {
        setGetUserDataServer([data!]);
      } catch (err) {
        console.error(error);
      }
    };
    getUserData();
  }, [resFromServer]);

  const handleEditarPedido = async (_id: string) => {
    const formData = new FormData();
    const pedidoUpdate = { titulo, fotos, descricao, categoria, contato, userId: userData?.[0]?._id };

    Object.entries(pedidoUpdate).forEach(([key, value]) => {
      return formData.append(key, value!);
    });
    const { data, error } = await editarPedido(formData, _id);
    try {
      setResFromServer(data!);
      toast({
        title: 'Atualizado!',
        description: 'Seu pedido de ajuda foi atualizado com sucesso!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      onClose();
    } catch (err) {
      toast({
        title: 'Erro!',
        description: 'Ocorreu um erro ao atualizar ajuda',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      console.error(error);
    }
  };

  const handleDelete = async (_id: string) => {
    try {
      const { data } = await deletarPedido(_id);
      toast({
        title: 'Deletado!',
        description: 'Seu pedido de ajuda foi deletado com sucesso!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      setResFromServer(data);
    } catch (error) {
      toast({
        title: 'Erro!',
        description: 'Ocorreu um erro ao deletar ajuda',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
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

  const selectImage = () => {
    inputFile.current?.click();
  };

  return (
    <main className={styles.myRequestMainContainer}>
      <Header />
      <div className={styles.myRequestHomeComponentDiv}>
        {getUserDataServer?.[0]?.meusPedidos?.map((info: any) => (
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
              deleteMyRequest={() => handleDelete(info?._id)}
            />
          </div>
        ))}
      </div>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody display={'flex'} flexDirection={'column'} gap={4}>
            <Input value={titulo} placeholder="Título" onChange={(e) => setTitulo(e.target.value)} />
            <Input placeholder="(DDD) 98765-4321" onChange={handleChange} value={contato} type="text" />
            <Input
              value={descricao}
              placeholder="Introduza uma breve descrição aqui..."
              onChange={(e) => setDescricao(e.target.value)}
            />
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

            <div className={styles.requestHelpHomeRequest}>
              <div className={styles.requestHelpHomeMenuBanner}>
                {fotos ? (
                  <div className={styles.requestHelpSelectedBanner}>
                    <input
                      type="file"
                      onClick={selectImage}
                      onChange={(e: any) => setFotos(e.target.files[0])}
                      className={styles.requestHelpHomeMenuBannerInput}
                    />
                    <img
                      aria-hidden
                      onClick={selectImage}
                      onChange={(e: any) => setFotos(e.target.files[0])}
                      className={styles.requestHelpSelectedBanner}
                      src={fotos ? URL.createObjectURL(fotos) : ''}
                      alt="Seleção de imagem"
                    />
                  </div>
                ) : (
                  <>
                    <input
                      type="file"
                      onClick={selectImage}
                      onChange={(e: any) => setFotos(e.target.files[0])}
                      className={styles.requestHelpHomeMenuBannerInput}
                    />
                    <PiMountainsFill color="#000" size={40} />
                    <p className={styles.requestHelpHomeMenuBannerP}>Insira uma foto para banner</p>
                  </>
                )}
              </div>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="gray" onClick={() => handleEditarPedido(pedidoId)}>
              Editar
            </Button>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Fechar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </main>
  );
};

export default MyRequests;

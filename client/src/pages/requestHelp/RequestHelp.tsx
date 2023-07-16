/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { useEffect, useRef, useState } from 'react';
import styles from './requestHelp.module.scss';
import { PiMountainsFill } from 'react-icons/pi';
import Button from '../../components/button/Button';
import Header from '../../components/header/Header';
import { Select, useDisclosure } from '@chakra-ui/react';
import { IUserData } from '../../@types/user';
import { pedirAjuda } from '../../api/pedidos';
import { handlePhoneNumberChange } from '../../utils/formatPhoneNumber';
import ModalComponent from '../../components/modal/ModalComponent';

const RequestHelp = () => {
  const [titulo, setTitulo] = useState('');
  const [contato, setContato] = useState('');
  const [descricao, setDescricao] = useState('');
  const [fotos, setFotos] = useState(null);
  const [userData, setUserData] = useState<IUserData>();
  const [categoria, setCategoria] = useState('');
  const [resFromServer, setResFromServer] = useState({});
  const inputFile = useRef<HTMLInputElement>(null);
  const { isOpen: isRequestOpen, onOpen: onRequestOpen, onClose: onRequestClose } = useDisclosure();

  useEffect(() => {
    const getUserDataFromStorage = () => {
      const getFromStorage = localStorage.getItem('userData');
      const parseUserData = getFromStorage && JSON.parse(getFromStorage);
      setUserData(parseUserData);
    };
    getUserDataFromStorage();
  }, [resFromServer]);

  const selectImage = () => {
    inputFile.current?.click();
  };

  const handlePedirAjuda = async () => {
    const formData = new FormData();

    const ajudaData = {
      titulo,
      fotos,
      contato,
      descricao,
      categoria,
    };
    Object.entries(ajudaData).forEach(([key, value]) => {
      return formData.append(key, value!);
    });
    const { data, error } = await pedirAjuda(formData, { _id: userData?._id! });
    try {
      onRequestOpen();
      setResFromServer(data!);
    } catch (err) {
      console.error(error);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handlePhoneNumberChange(event, setContato);
  };

  return (
    <main className={styles.requestHelpPageMain}>
      <Header />

      <div className={styles.requestHelpHomeRequest}>
        <h1 className={styles.requestHelpHomeMenuH1}>Peça uma Ajudaí</h1>
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

      <div className={styles.requestHelpHomeDescription}>
        <h3 className={styles.requestHelpHomeMenuH3}>Título</h3>
        <input className={styles.requestInput} placeholder="Título" onChange={(e) => setTitulo(e.target.value)} />
      </div>

      <div className={styles.requestHelpHomeDescription}>
        <h3 className={styles.requestHelpHomeMenuH3}>Contato</h3>
        <input
          className={styles.requestInput}
          placeholder="(DDD) 98765-4321"
          onChange={handleChange}
          value={contato}
          type="text"
        />
      </div>

      <div className={styles.requestHelpHomeDescription}>
        <h3 className={styles.requestHelpHomeMenuH3}>Descrição</h3>
        <textarea
          className={styles.requestHelpHomeTextArea}
          rows={4}
          placeholder="Introduza uma breve descrição aqui..."
          onChange={(e) => setDescricao(e.target.value)}
        />
      </div>

      <div className={styles.requestHelpHomeCategories}>
        <h2 className={styles.requestHelpHomeCategoriesH2}>Categoria</h2>
        <div className={styles.requestHelpHomeCategoriesContainer}>
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
        </div>
      </div>

      <div className={styles.requestHelpHomeButton}>
        <Button size="medium" rounded disabled={false} onClick={() => handlePedirAjuda()} label="Salvar" />
      </div>
      <ModalComponent
        modalTitle="Pedido realizado com sucesso!"
        modalBody="Você acabou de fazer um pedido :)"
        buttonSuccessLabel="Página inicial"
        buttonCloseLabel="Fazer outro pedido"
        isOpen={isRequestOpen}
        onClose={onRequestClose}
      />
    </main>
  );
};

export default RequestHelp;

import { useEffect, useState } from 'react';
import styles from './requestHelp.module.scss';
import { PiMountainsFill } from 'react-icons/pi';
import Button from '../../components/button/Button';
import Header from '../../components/header/Header';
import { Select } from '@chakra-ui/react';
import { IUserData } from '../../@types/user';
import { pedirAjuda } from '../../api/pedidos';

const RequestHelp = () => {
  const [titulo, setTitulo] = useState('');
  const [contato, setContato] = useState('');
  const [descricao, setDescricao] = useState('');
  const [userData, setUserData] = useState<IUserData>();
  const [categoria, setCategoria] = useState('');
  const [resFromServer, setResFromServer] = useState({});

  useEffect(() => {
    const getUserDataFromStorage = () => {
      const getFromStorage = localStorage.getItem('userData');
      const parseUserData = getFromStorage && JSON.parse(getFromStorage);
      setUserData(parseUserData);
    };
    getUserDataFromStorage();
  }, [resFromServer]);

  const handlePedirAjuda = async () => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
    const { data, error } = await pedirAjuda({ titulo, contato, descricao, categoria, _id: userData?._id! });
    try {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
      setResFromServer(data!);
    } catch (err) {
      console.error(error);
    }
  };

  return (
    <main className={styles.requestHelpPageMain}>
      <Header />

      <div className={styles.requestHelpHomeRequest}>
        <h1 className={styles.requestHelpHomeMenuH1}>Peça uma Ajudaí</h1>
        <div className={styles.requestHelpHomeMenuBanner}>
          <input type="file" className={styles.requestHelpHomeMenuBannerInput} />
          <PiMountainsFill color="#000" size={40} />
          <p className={styles.requestHelpHomeMenuBannerP}>Insira uma foto para banner</p>
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
          placeholder="(DDD)987654321"
          onChange={(e) => setContato(e.target.value)}
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
          <Select placeholder="Escolha uma categoria" onChange={(e) => setCategoria(e.target.value)}>
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
    </main>
  );
};

export default RequestHelp;

import styles from './conta.module.scss';
import { useEffect, useState } from 'react';
import { editarUsuario } from '../../api/usuario';
import { IUserData } from '../../@types/user';
import Header from '../../components/header/Header';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';

const Conta = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [userData, setUserData] = useState<IUserData>();
  const [resFromServer, setResFromServer] = useState({});
  const [error, setError] = useState(false);

  useEffect(() => {
    const getUserDataFromStorage = () => {
      const getFromStorage = localStorage.getItem('userData');
      const parseUserData = getFromStorage && JSON.parse(getFromStorage);
      setUserData(parseUserData);
    };
    getUserDataFromStorage();
  }, [resFromServer]);

  const handleEditarUsuario = async () => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
    const { data, error } = await editarUsuario({ nome, email, telefone, _id: userData?._id! });
    try {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
      setResFromServer(data!);
    } catch (err) {
      console.error(error);
      setError(true);
    }
  };

  return (
    <main className={styles.contaPageMain}>
      <Header />
      <div className={styles.contaPageProfile}>
        <div className={styles.contaPagePhoto}>
          <div className={styles.contaPagePhotoInput}></div>
        </div>
        <p className={styles.contaPageUserName}>User Name</p>
      </div>
      <div className={styles.contaPageData}>
        <Input value={nome} error={error} label="Name" type="text" onChange={(e) => setNome(e.target.value)} />
        <Input value={email} error={error} label="Email" type="text" onChange={(e) => setEmail(e.target.value)} />
        <Input
          value={telefone}
          error={error}
          label="Telefone"
          type="number"
          onChange={(e) => setTelefone(e.target.value)}
        />
        <div className={styles.contaPageButton}>
          <Button size="medium" disabled={false} rounded onClick={handleEditarUsuario} label="Salvar" />
        </div>
      </div>
    </main>
  );
};

export default Conta;

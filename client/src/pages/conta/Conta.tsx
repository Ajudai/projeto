import styles from './conta.module.scss';
import { useEffect, useState, useRef } from 'react';
import { editarUsuario } from '../../api/usuario';
import { IUserData } from '../../@types/user';
import Header from '../../components/header/Header';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';
import { BiSolidUser } from 'react-icons/bi';
import { BsCameraFill } from 'react-icons/bs';
import { StylesProvider } from '@chakra-ui/react';

const Conta = () => {
  const [userData, setUserData] = useState<IUserData>();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [foto, setFoto] = useState(null);
  const [resFromServer, setResFromServer] = useState({});
  const [error, setError] = useState(false);
  const inputFile = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const getUserDataFromStorage = () => {
      const getFromStorage = localStorage.getItem('userData');
      const parseUserData = getFromStorage && JSON.parse(getFromStorage);
      setNome(parseUserData?.userName);
      setEmail(parseUserData?.userEmail);
      setTelefone(parseUserData?.userPhoneNumber);
      setUserData(parseUserData);
      console.log(parseUserData);
    };
    getUserDataFromStorage();
  }, [resFromServer]);

  const selectImage = () => {
    inputFile.current?.click();
  };

  const handleEditarUsuario = async () => {
    const { data, error } = await editarUsuario({ nome, email, telefone, _id: userData?._id! });
    try {
      console.log(data);
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
          {foto ? (
            <div className={styles.contaPageSelectedPhoto}>
              <input
                type="file"
                onClick={selectImage}
                onChange={(e: any) => setFoto(e.target.files[0])}
                className={styles.contaPageInputPhoto}
              />
              <img
                aria-hidden
                onClick={selectImage}
                onChange={(e: any) => setFoto(e.target.files[0])}
                className={styles.contaPagePhotoWrapper}
                src={foto ? URL.createObjectURL(foto) : ''}
                alt="Seleção de imagem"
              />
              <BsCameraFill className={styles.contaPageChangePhoto} color="#f5f5f5" />
            </div>
          ) : (
            <>
              <input
                type="file"
                onClick={selectImage}
                onChange={(e: any) => setFoto(e.target.files[0])}
                className={styles.contaPageInputPhoto}
              />
              <BiSolidUser className={styles.contaPageUserIcon} color="#f5f5f5" />
              <BsCameraFill className={styles.contaPageChangePhoto} color="#f5f5f5" />
            </>
          )}
        </div>
        <p className={styles.contaPageUserData}>{userData?.userName}</p>
      </div>
      <div className={styles.contaPageData}>
        <Input value={nome} error={error} label="Nome" type="text" onChange={(e) => setNome(e.target.value)} />
        <Input value={email} error={error} label="Email" type="text" onChange={(e) => setEmail(e.target.value)} />
        <Input
          value={telefone}
          error={error}
          label="Telefone"
          type="text"
          onChange={(e) => setTelefone(e.target.value)}
        />
        <div className={styles.contaPageButton}>
          <Button
            size="medium"
            disabled={false}
            rounded
            onClick={() => console.log('Alterar endereço')}
            label="Editar endereço"
          />
          <Button size="medium" disabled={false} rounded onClick={handleEditarUsuario} label="Salvar" />
        </div>
      </div>
    </main>
  );
};

export default Conta;

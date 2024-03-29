/* eslint-disable @typescript-eslint/no-non-null-assertion */
import styles from './conta.module.scss';
import { useEffect, useState, useRef } from 'react';
import { editarUsuario, getUserById } from '../../api/usuario';
import Header from '../../components/header/Header';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';
import { BiSolidUser } from 'react-icons/bi';
import { BsCameraFill } from 'react-icons/bs';
import { handlePhoneNumberChange } from '../../utils/formatPhoneNumber';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import ModalComponent from '../../components/modal/ModalComponent';
import { useDisclosure } from '@chakra-ui/react';

const Conta = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [foto, setFoto] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<any>();
  const { setUser } = useAuth();
  const inputFile = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { isOpen: isContaOpen, onOpen: onContaOpen, onClose: onContaClose } = useDisclosure();
  const { _id } = useParams();

  useEffect(() => {
    const getUserData = async () => {
      const { data, error } = await getUserById(_id!);
      try {
        localStorage.setItem('user', JSON.stringify(data));
        setIsLoading(false);
      } catch (err) {
        console.error(error);
      }
    };
    getUserData();

    const getUserDataFromStorage = async () => {
      const getFromStorage = localStorage.getItem('user');
      const parseUserData = getFromStorage && JSON.parse(getFromStorage);
      const { data, error } = await getUserById(parseUserData?._id ? parseUserData._id : '');
      localStorage.setItem('user', JSON.stringify(data));
      setUser(data);
      setUserData(data);
      error && console.error(error);
      setNome(parseUserData?.userName);
      setEmail(parseUserData?.userEmail);
      setTelefone(parseUserData?.userPhoneNumber);
      setUserData(parseUserData);
    };
    getUserDataFromStorage();
  }, [isLoading]);

  const handleEditarUsuario = async () => {
    console.log(nome, email, telefone, foto);
    const formData = new FormData();
    const userUpdate = { userName: nome, userEmail: email, userPhoneNumber: telefone, profilePicture: foto };
    Object.entries(userUpdate).forEach(([key, value]) => {
      return formData.append(key, value!);
    });
    const { data, error } = await editarUsuario(formData, { _id: userData?._id! });
    try {
      console.log(data);
      onContaOpen();
    } catch (err) {
      console.error(error);
    }
  };

  const selectImage = () => {
    inputFile.current?.click();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handlePhoneNumberChange(event, setTelefone);
  };

  return (
    <main className={styles.contaPageMain}>
      <Header userData={userData} />
      <div className={styles.contaPageProfile}>
        <div className={styles.contaPagePhoto}>
          {foto || userData?.profilePicture ? (
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
                src={foto ? URL.createObjectURL(foto) : userData?.profilePicture}
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
        <Input value={nome} label="Nome" type="text" onChange={(e) => setNome(e.target.value)} />
        <Input value={email} label="Email" type="text" onChange={(e) => setEmail(e.target.value)} />
        <Input value={telefone} label="Telefone" type="text" onChange={handleChange} />
        <div className={styles.contaPageButton}>
          <Button
            size="medium"
            rounded
            onClick={() => navigate(`/editarEndereco/${userData?._id}`)}
            label="Editar endereço"
          />
          <Button size="medium" rounded onClick={handleEditarUsuario} label="Salvar dados" />
        </div>
      </div>
      <ModalComponent
        modalTitle="Seus dados foram atualizados com sucesso!"
        modalBody="Você acabou de atualizar seus dados :)"
        buttonSuccessLabel="Página inicial"
        isOpen={isContaOpen}
        onClose={onContaClose}
      />
    </main>
  );
};

export default Conta;

/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from './register.module.scss';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';
import logo from '../../assets/logo.svg';
import LoginRegisterHeader from '../../components/loginRegisterHeader/LoginRegisterHeader';
import ModalComponent from '../../components/modal/ModalComponent';
import { useDisclosure } from '@chakra-ui/react';

const Register = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCPF] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { isOpen: isRegisterOpen, onOpen: onRegisterOpen, onClose: onRegisterClose } = useDisclosure();
  const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure();

  const handleRegister = async () => {
    await axios
      .post('https://ajudai-api.onrender.com/register', {
        userName: name,
        userEmail: email,
        userPhoneNumber: phoneNumber,
        userCpf: cpf,
        userPassword: password,
        createdAt: new Date(),
      })
      .then(() => {
        setName('');
        setPhoneNumber('');
        setPassword('');
        setCPF('');
        onRegisterOpen();
      })
      .catch((errorMessage) => {
        const errorMessageFromServer = errorMessage.response.data.message;
        setError(!error);
        setErrorMessage(errorMessageFromServer);
      });
  };

  const handleOpenModal = () => {
    onModalOpen();
  };

  const handleCloseModal = () => {
    onModalClose();
  };

  return (
    <main className={styles.registerPageMain}>
      <LoginRegisterHeader>
        <img src={logo} alt="Ajudaí logo" className={styles.registerPageLogoImg} />
      </LoginRegisterHeader>

      <div className={styles.registerPageinputsBox}>
        <div className={styles.inputsBoxContainer}>
          <div className={styles.registerPageDesktopContentContainer}>
            <p className={styles.registerPageDesktopContentContainerP}>Criar conta</p>
            <span className={styles.registerPageDesktopContentContainerSpan}>
              <p className={styles.registerPageDesktopContentContainerSpanP}>Já tem conta?</p>
              <p className={styles.registerPageDesktopContentContainerSpanA}>
                <Link to={'/'}>Faça login</Link>
              </p>
            </span>
          </div>

          {error && <p className={styles.registerPageErrorP}>{errorMessage}</p>}
          <Input error={error} value={name} label="Nome" onChange={(e) => setName(e.target.value)} type={'text'} />
          <Input error={error} value={email} label="Email" onChange={(e) => setEmail(e.target.value)} type={'text'} />
          <Input
            error={error}
            value={phoneNumber}
            label="Telefone"
            onChange={(e) => setPhoneNumber(e.target.value)}
            type={'text'}
          />
          <Input error={error} value={cpf} label="CPF" onChange={(e) => setCPF(e.target.value)} type={'text'} />
          <Input
            value={password}
            error={error}
            type="password"
            label="Senha"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className={styles.registerCheckbox}>
            <input type="checkbox" id="registerCheckbox"></input>
            <label htmlFor="registerCheckbox">Concordo com os termos de uso</label>
          </div>
          <div className={styles.registerPageRegisterButton}>
            <Button size="medium" disabled={false} rounded onClick={() => handleRegister()} label="Criar conta" />
          </div>
          <p className={styles.registerPagePP} onClick={handleOpenModal}>
            Política de Privacidade
          </p>
        </div>
      </div>
      <ModalComponent
        modalTitle="Sobre política de privacidade"
        modalBody="Nós valorizamos sua privacidade e estamos comprometidos em proteger suas informações pessoais. Ao utilizar nosso aplicativo de caridade, coletamos as informações que você fornece durante o cadastro, como nome, e-mail, telefone e CPF. Utilizamos esses dados apenas para fornecer e melhorar nossos serviços, personalizando sua experiência e oferecendo recomendações com base em suas preferências. Suas informações são protegidas por medidas de segurança adequadas e não são compartilhadas com terceiros, exceto quando necessário para a prestação dos serviços ou por exigência legal. Ao concordar com nossa política de privacidade, você está ciente e concorda com nossas práticas de coleta e uso de dados. Mantemos o compromisso de proteger suas informações pessoais e respeitar sua privacidade."
        buttonCloseLabel="Fechar"
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
      <ModalComponent
        modalTitle="Cadastro realizado!"
        modalBody="Deseja fazer login agora?"
        buttonSuccessLabel="Logar"
        buttonCloseLabel="Mais tarde"
        isOpen={isRegisterOpen}
        onClose={onRegisterClose}
      />
    </main>
  );
};

export default Register;

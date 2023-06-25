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

  const handleRegister = async () => {
    await axios
      .post('http://localhost:5000/register', {
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
          <Input error={error} value={name} label="Nome" onChange={(e) => setName(e.target.value)} />
          <Input error={error} value={email} label="Email" onChange={(e) => setEmail(e.target.value)} />
          <Input error={error} value={phoneNumber} label="Telefone" onChange={(e) => setPhoneNumber(e.target.value)} />
          <Input error={error} value={cpf} label="CPF" onChange={(e) => setCPF(e.target.value)} />
          <Input value={password} error={error} password label="Senha" onChange={(e) => setPassword(e.target.value)} />
          <div className={styles.registerCheckbox}>
            <input type="checkbox" id="registerCheckbox"></input>
            <label htmlFor="registerCheckbox">Concordo com os termos de uso</label>
          </div>
          <div className={styles.registerPageRegisterButton}>
            <Button size="medium" disabled={false} rounded onClick={() => handleRegister()} label="Criar conta" />
          </div>
          <p className={styles.registerPagePP}>Política de Privacidade</p>
        </div>
      </div>
      <ModalComponent isOpen={isRegisterOpen} onClose={onRegisterClose} />
    </main>
  );
};

export default Register;

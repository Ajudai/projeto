import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './login.module.scss';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';
import axios from 'axios';
import logo from '../../assets/logo.svg';
import LoginRegisterHeader from '../../components/loginRegisterHeader/LoginRegisterHeader';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const login = async () => {
    await axios
      .post('http://localhost:5000/login', {
        userEmail: email,
        userPassword: password,
      })
      .then((res) => {
        localStorage.setItem('userData', JSON.stringify(res?.data));
        navigate('/home');
      })
      .catch((errorMessage) => {
        const errorMessageFromServer = errorMessage.response.data.message;
        console.error('Erro ao logar', errorMessageFromServer);
        setError(!error);
        setErrorMessage(errorMessageFromServer);
      });
  };

  return (
    <main className={styles.loginPageMain}>
      <LoginRegisterHeader>
        <img src={logo} alt="Ajudaí logo" className={styles.loginPageLogoImg} />
      </LoginRegisterHeader>

      <div className={styles.loginPageinputsBox}>
        <div className={styles.inputsBoxContainer}>
          <div className={styles.loginPageDesktopContentContainer}>
            <p className={styles.loginPageDesktopContentContainerP}>Bem vindo(a)</p>
            <span className={styles.loginPageDesktopContentContainerSpan}>
              <p className={styles.loginPageDesktopContentContainerSpanP}>Não tem uma conta?</p>
              <p className={styles.loginPageDesktopContentContainerSpanA}>
                <Link to={'/register'}>Abra uma</Link>
              </p>
            </span>
          </div>

          {error && <p className={styles.loginPageErrorP}>{errorMessage}</p>}
          <Input error={error} label="Email" onChange={(e) => setEmail(e.target.value)} />
          <Input error={error} password label="Senha" onChange={(e) => setPassword(e.target.value)} />
          <p className={styles.loginPageForgetPasswordP}>Esqueci minha senha</p>
          <div className={styles.loginPageLoginButton}>
            <Button size="medium" disabled={false} rounded onClick={() => login()} label="Login" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;

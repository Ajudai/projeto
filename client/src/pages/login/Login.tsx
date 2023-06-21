import { useState } from 'react';
import styles from './login.module.scss';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';
import axios from 'axios';
import logo from '../../assets/logo.svg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login = async () => {
    await axios
      .post('http://localhost:5000/login', {
        userEmail: email,
        userPassword: password,
      })
      .then((res) => {
        localStorage.setItem('userData', JSON.stringify(res?.data));
        console.log(res.data);
      })
      .catch((error) => {
        console.error('Erro ao logar', error.response.data.message);
      });
  };

  return (
    <main className={styles.loginPageMain}>
      <header className={styles.loginPageImg}>
        <p className={styles.loginPageMobileP}>
          Recife registra alta poluição <br /> no Rio Capibaribe
        </p>
        <img src={logo} alt="Ajudaí logo" className={styles.loginPageLogoImg} />
      </header>

      <div className={styles.loginPageinputsBox}>
        <div className={styles.inputsBoxContainer}>
          <div className={styles.loginPageDesktopContentContainer}>
            <p className={styles.loginPageDesktopContentContainerP}>Bem vindo(a)</p>
            <span className={styles.loginPageDesktopContentContainerSpan}>
              <p className={styles.loginPageDesktopContentContainerSpanP}>Não tem uma conta?</p>
              <p className={styles.loginPageDesktopContentContainerSpanA}>Abra uma</p>
            </span>
          </div>
          <Input label="Email" onChange={(e) => setEmail(e.target.value)} />
          <Input label="Senha" onChange={(e) => setPassword(e.target.value)} />
          <p className={styles.loginPageForgetPasswordP}>Esqueci minha senha</p>
          <div className={styles.loginPageLoginButton}>
            <Button size="medium" disabled={false} rounded onClick={login} label="Login" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;

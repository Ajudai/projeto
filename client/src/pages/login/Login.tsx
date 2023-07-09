import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './login.module.scss';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';
import logo from '../../assets/logo.svg';
import LoginRegisterHeader from '../../components/loginRegisterHeader/LoginRegisterHeader';
import { userLogin } from '../../api/usuario';
import useAuth from '../../hooks/useAuth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { login } = useAuth();

  const handleLogin = async () => {
    const { data, error } = await userLogin({ userEmail: email, userPassword: password });
    try {
      localStorage.setItem('userData', JSON.stringify(data));
      login(true);
    } catch (err) {
      console.log(error);
      setIsError(!isError);
      setErrorMessage('Erro ao logar');
    }
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

          {isError && <p className={styles.loginPageErrorP}>{errorMessage}</p>}
          <Input value={email} error={isError} label="Email" type="text" onChange={(e) => setEmail(e.target.value)} />
          <Input
            value={password}
            error={isError}
            type="password"
            label="Senha"
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className={styles.loginPageForgetPasswordP}>Esqueci minha senha</p>
          <div className={styles.loginPageLoginButton}>
            <Button size="medium" disabled={false} rounded onClick={() => handleLogin()} label="Login" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;

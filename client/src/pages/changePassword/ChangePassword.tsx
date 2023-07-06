import styles from './changePassword.module.scss';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';
import Header from '../../components/header/Header';
import { useState } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { FaEnvelope } from 'react-icons/fa';

const ChangePassword = () => {
  const [email, setEmail] = useState('');

  return (
    <main className={styles.changePasswordMain}>
      <Header />
      <div className={styles.changePasswordPage}>
        <div className={styles.changePasswordNav}>
          <BsArrowLeft className={styles.changePasswordNavIcon} color="000" />
          <p className={styles.changePasswordP}>Alteração de senha</p>
        </div>
        <div className={styles.changePasswordMail}>
          <FaEnvelope className={styles.changePasswordMailIcon} color="000" />
          <p className={styles.changePasswordMailP}>Insira seu e-mail</p>
        </div>
        <div className={styles.changePasswordForm}>
          <Input value={email} label="Email" type="text" onChange={(e) => setEmail(e.target.value)} />
          <div className={styles.changePasswordPageButton}>
            <Button
              size="medium"
              disabled
              rounded
              onClick={() => console.log('Você clicou no botão de ENVIAR')}
              label="Enviar"
            />
          </div>
        </div>
      </div>
    </main>
  );
};
export default ChangePassword;

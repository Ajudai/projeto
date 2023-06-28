import { useState } from 'react';
import styles from './forgetPassword.module.scss';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';
import { BsArrowLeft } from 'react-icons/bs';
import { FaEnvelope } from 'react-icons/fa';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');

  return (
    <main className={styles.forgetPasswordPageMain}>
      <header className={styles.forgetPasswordPageHeader}>
        <BsArrowLeft className={styles.forgetPasswordPageArrow} color="#fff" size={56} />
        <div className={styles.forgetPasswordPagePageMail}>
          <FaEnvelope className={styles.forgetPasswordPageEnvelope} color="#fff" size={100} />
          <h2 className={styles.forgetPasswordPageH2}>Informe seu email</h2>
        </div>
      </header>

      <div className={styles.forgetPasswordPageinputsBox}>
        <BsArrowLeft className={styles.forgetPasswordPageDesktopArrow} color="#000" size={56} />
        <div className={styles.inputsBoxContainer}>
          <span className={styles.forgetPasswordPageContent}>
            <h2 className={styles.forgetPasswordPageDesktopContentH2}>
              Esqueceu sua <br /> senha?
            </h2>
            <p className={styles.forgetPasswordPageDesktopContentP}>
              Tudo bem, podemos te ajudar! <br /> <strong>Primeiro, insira seu email</strong>
            </p>
          </span>
          <Input label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <div className={styles.forgetPasswordPageButton}>
            <Button
              size="medium"
              disabled
              rounded
              onClick={() => console.log('Você clicou no botão de esqueceu')}
              label="Enviar"
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ForgetPassword;

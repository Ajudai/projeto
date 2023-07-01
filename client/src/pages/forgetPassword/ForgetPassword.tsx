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
      <div className={styles.forgetPasswordPageImg}>
        <div className={styles.forgetPasswordPageReturnPage}>
          <BsArrowLeft className={styles.forgetPasswordPageArrow} color="#fff" size={48} />
        </div>
        <div className={styles.forgetPasswordPagePageMail}>
          <FaEnvelope className={styles.forgetPasswordPageEnvelope} color="#fff" size={120} />
          <h1 className={styles.forgetPasswordPageH1}>Informe seu email</h1>
        </div>
      </div>

      <div className={styles.forgetPasswordPageinputsBox}>
        <div className={styles.forgetPasswordPageDesktopHeader}>
          <div className={styles.forgetPasswordPageReturnPageDesktop}>
            <BsArrowLeft className={styles.forgetPasswordPageArrow} color="#000" size={48} />
          </div>
          <div className={styles.forgetPasswordPageDesktopContentContainer}>
            <p className={styles.forgetPasswordPageDesktopContentContainerP}>
              Esqueceu sua <br /> senha?
            </p>
            <span className={styles.forgetPasswordPageDesktopContentContainerSpan}>
              <p className={styles.forgetPasswordPageDesktopContentContainerSpanP}>Tudo bem, podemos te ajudar!</p>
              <p className={styles.forgetPasswordPageDesktopContentContainerSpanPP}>Primeiro, insira seu email</p>
            </span>
          </div>
        </div>

        <div className={styles.forgetPasswordPageFormContainer}>
          <div className={styles.forgetPasswordPageForm}>
            <Input value={email} label="Email" type="text" onChange={(e) => setEmail(e.target.value)} />
          </div>
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

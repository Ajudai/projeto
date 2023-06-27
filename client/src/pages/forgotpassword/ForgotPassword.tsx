import React, { useState } from 'react';
import axios from 'axios';
import styles from './forgot-password.module.scss';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';
import arrowLeftIcon from '../../assets/arrowLeftIcon.svg';
import arrowLeftIconBlack from '../../assets/arrowLeftIconBlack.svg';
import envelopeIcon from '../../assets/envelopeIcon.svg';

const ForgotPassword = async => {
  const [email, setEmail] = useState('');

  return (
    <main className={styles.forgotPasswordPageMain}>
      <div className={styles.forgotPasswordPageImg}>
        <div className={styles.forgotPasswordPageReturnPage}>
          <img src={arrowLeftIcon} alt="svg-icon-left" className={styles.forgotPasswordPageArrowLeft}></img>
        </div>
        <div className={styles.forgotPasswordPagePageMail}>
          <img src={envelopeIcon} alt="svg-icon-envelope" className={styles.forgotPasswordPageEnvelope}></img>
          <h1 className={styles.forgotPasswordPageH1}>Informe seu email</h1>
        </div>
      </div>

      <div className={styles.forgotPasswordPageinputsBox}>
        <img src={arrowLeftIconBlack} alt="svg-icon-left" className={styles.forgotPasswordPageDesktopArrowLeft}></img>
        <div className={styles.forgotPasswordPageDesktopContentContainer}>
          <p className={styles.forgotPasswordPageDesktopContentContainerP}>
            Esqueceu sua <br /> senha?
          </p>
          <span className={styles.forgotPasswordPageDesktopContentContainerSpan}>
            <p className={styles.forgotPasswordPageDesktopContentContainerSpanP}>Tudo bem, podemos te ajudar!</p>
            <p className={styles.forgotPasswordPageDesktopContentContainerSpanPP}>Primeiro, insira seu email</p>
          </span>
        </div>

        <div className={styles.forgotPasswordPageForm}>
          <Input label="Email" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className={styles.forgotPasswordPageButton}>
          <Button
            size="medium"
            disabled
            rounded
            onClick={() => console.log('Você clicou no botão de esqueceu')}
            label="Continuar"
          />
        </div>
      </div>
    </main>
  );
};

export default ForgotPassword;

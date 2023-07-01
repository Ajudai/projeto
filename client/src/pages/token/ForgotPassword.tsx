import { useState } from 'react';
import styles from './token.module.scss';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';
import envelopeIcon from '../../assets/envelopeIcon.svg';
import { BiLeftArrowAlt } from 'react-icons/bi';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  return (
    <main className={styles.registerTokenPageMain}>
      <div className={styles.registerTokenPageImg}>
        <div className={styles.registerTokenReturn}>
          <BiLeftArrowAlt />
        </div>
        <div className={styles.registerTokenPageMail}>
          <img src={envelopeIcon} alt="svg-icon-envelop" className={styles.registerTokenEnvelope} />
          <h1 className={styles.registerTokenH1}>Verifique seu email</h1>
        </div>
      </div>
      <div className={styles.registerTokenPageInput}>
        <Input value={email} label="Email" onChange={(e) => setEmail(e.target.value)} type={'text'} />
      </div>
      <div className={styles.registerTokenPageButton}>
        <Button
          size="medium"
          disabled
          rounded
          onClick={() => console.log('Você clicou no botão de esqueceu')}
          label="Continuar"
        />
      </div>
    </main>
  );
};

export default ForgotPassword;

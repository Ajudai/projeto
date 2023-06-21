import React, { useState } from 'react';
import axios from 'axios';
import styles from './register.module.scss';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';
import logo from '../../assets/logo.svg';

const Register = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const register = async () => {
    await axios
      .post('http://localhost:5000/login', {
        userName: name,
        userPhoneNumber: phoneNumber,
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
    <main className={styles.registerPageMain}>
      <header className={styles.registerPageImg}>
        <h1 className={styles.registerPageMobileH1}>
          Recife registra alta poluição <br /> no Rio Capibaribe
        </h1>
        <img src={logo} alt="Ajudaí logo" className={styles.registerPageLogoImg} />
      </header>

      <div className={styles.registerPageinputsBox}>
        <div className={styles.inputsBoxContainer}>
          <div className={styles.registerPageDesktopContentContainer}>
            <p className={styles.registerPageDesktopContentContainerP}>Criar conta</p>
            <span className={styles.registerPageDesktopContentContainerSpan}>
              <p className={styles.registerPageDesktopContentContainerSpanP}>Já tem conta?</p>
              <p className={styles.registerPageDesktopContentContainerSpanA}>Faça login</p>
            </span>
          </div>

          <Input label="Nome" onChange={(e) => setName(e.target.value)} />
          <Input label="Telefone" onChange={(e) => setPhoneNumber(e.target.value)} />
          <Input label="Email" onChange={(e) => setEmail(e.target.value)} />
          <Input label="Senha" onChange={(e) => setPassword(e.target.value)} />

          <div className={styles.registerCheckbox}>
            <input type="checkbox" id="registerCheckbox"></input>
            <label htmlFor="registerCheckbox">Concordo com os termos de uso</label>
          </div>
          <div className={styles.registerPageRegisterButton}>
            <Button size="medium" disabled rounded onClick={register} label="Criar conta" />
          </div>
          <p className={styles.registerPagePP}>Política de Privacidade</p>
        </div>
      </div>
    </main>
  );
};

export default Register;

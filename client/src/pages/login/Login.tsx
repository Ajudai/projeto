import React, { useState, useEffect } from "react";
import styles from "./login.module.scss";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <main className={styles.loginPageMain}>
      <div className={styles.loginPageImg}>
        <h1 className={styles.loginPageH1}>
          Recife registra alta poluição no Rio Capibaribe
        </h1>
      </div>
      <div>
        <Input label="Email" onChange={(e) => setEmail(e.target.value)} />
        <Input label="Senha" onChange={(e) => setPassword(e.target.value)} />
        <p className={styles.loginPageForgetPasswordP}>Esqueci minha senha</p>
        <div className={styles.loginPageLoginButton}>
          <Button
            size="medium"
            disabled
            rounded
            onClick={() => console.log("Logado")}
            label="Login"
          />
        </div>
      </div>
    </main>
  );
};

export default Login;

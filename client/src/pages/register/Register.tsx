import React, {useState} from "react";
import axios from "axios";
import styles from './register.module.scss';
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import facebookMedia from "../../assets/facebookMedia.svg";
import googleMedia from "../../assets/googleMedia.svg";
import logo from "../../assets/logo.svg";

const Register = () => {
    const [nome, setNome] = useState<string>();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const register = async () => {
        await axios.post('http://localhost:5000/register', {
          userName: nome,
          userEmail: email,
          userPassword: password
        })
          .then((res) => {
            localStorage.setItem("userData", JSON.stringify(res?.data));
            console.log(res.data)
          })
          .catch((error) => {
            console.error("Erro ao cadastrar", error.response.data.message)
          })
      }

    return (
        <main className={styles.registerPageMain}>
            <div className={styles.registerPageImg}>
                <h1 className={styles.registerPageH1}>Recife registra alta poluição no Rio Capibaribe</h1>
            </div>
            <img src={logo} alt="Ajudaí logo" className={styles.PageLogoImg} />
            <div>
                <Input label="Nome" onChange={(e) => setNome(e.target.value)} />
                <Input label="Telefone" onChange={(e) => setPassword(e.target.value)}/>
                <Input label="Email" onChange={(e) => setEmail(e.target.value)} />
                <Input label="Senha" onChange={(e) => setPassword(e.target.value)}/>
                <div className={styles.registerCheckbox}>
                <input type="checkbox" id="registerCheckbox"></input>
                <label htmlFor="registerCheckbox">Concordo com os termos de uso</label>
                </div>
                <div className={styles.registerPageRegisterButton}>
                    <Button
                    size="medium"
                    disabled
                    rounded
                    onClick={register}
                    label="Continuar"
                    />
                </div>
                <div className={styles.registerPageRegisterMedia}>
                    <div className={styles.registerPageRegisterBorder}></div>
                    <h3 className={styles.registerPageH3}>ou</h3>
                    <div className={styles.registerPageRegisterBorder}></div>
                </div>
                <nav className={styles.registerPageRegisterSocialMedia}>
                    <img src={googleMedia} className={styles.registerPageGoogleMedia}/>
                    <img src={facebookMedia} className={styles.registerPageFacebookMedia}/>
                </nav>
                <p className={styles.registerPageLogin}>Já tem uma conta? <a href="#Faça login">Faça login</a></p>
            </div>
        </main>
    );
};

export default Register;
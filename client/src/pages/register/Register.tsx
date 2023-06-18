import React, {useState, useEffect} from "react";
import axios from "axios";
import styles from './register.module.scss';
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import passwordIcon from "../../assets/passwordIcon.svg";
import facebookMedia from "../../assets/facebookMedia.svg";
import googleMedia from "../../assets/googleMedia.svg";

const Register = () => {
    const [nome, setNome] = useState<string>();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <main className={styles.registerPageMain}>
            <div className={styles.registerPageImg}>
                <h1 className={styles.registerPageH1}>Recife registra alta poluição no Rio Capibaribe</h1>
                <h2 className={styles.registerPageH2}>Fundação Recife</h2>
            </div>
            <div>
                <Input label="Nome" onChange={(e) => setNome(e.target.value)} />
                <Input label="Email" onChange={(e) => setEmail(e.target.value)} />
                <div className={styles.registerPagePassword}>
                    <Input label="Senha" onChange={(e) => setPassword(e.target.value)}/>
                    <div className={styles.registerPagePasswordIcon}>
                    <img src={passwordIcon} className={styles.registerPagePasswordIcon}/>
                    </div>
                </div>
                <div className={styles.registerCheckbox}>
                <input type="checkbox" id="registerCheckbox"></input>
                <label htmlFor="registerCheckbox">Concordo com os termos de uso</label>
                </div>
                <div className={styles.registerPageRegisterButton}>
                    <Button
                    size="medium"
                    disabled
                    rounded
                    onClick={() => {
                        console.log("Registrado");
                    }}
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
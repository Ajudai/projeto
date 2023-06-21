import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from './token.module.scss';
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import arrowLeftIcon from "../../assets/arrowLeftIcon.svg";
import envelopeIcon from "../../assets/envelopeIcon.svg";

const TokenConfirmation = () => {
    const [codigo, setCodigo] = useState("");

    return (
        <main className={styles.registerTokenPageMain}>
            <div className={styles.registerTokenPageImg}>
                <div className={styles.registerTokenReturn}>
                    <a href="#"><img src={arrowLeftIcon} className={styles.registerTokenArrowLeft}></img></a>
                </div>
                <div className={styles.registerTokenPageMail}>
                    <img src={envelopeIcon} className={styles.registerTokenEnvelope}></img>
                    <h1 className={styles.registerTokenH1}>Informe o código</h1>
                </div>

            </div>
            <div className={styles.registerTokenPageInput}>
                <Input label="Código" onChange={(e) => setCodigo(e.target.value)} />
            </div>
            <div className={styles.registerTokenPageButton}>
                <Button
                    size="medium"
                    disabled
                    rounded
                    onClick={() => { }}
                    label="Validar"
                />
            </div>
        </main>
    );
};

export default TokenConfirmation;
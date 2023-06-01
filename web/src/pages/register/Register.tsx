import React, {useState, useEffect} from "react";
import axios from "axios";
import styles from './register.module.scss'

const Register = () => {
    const [nome, setNome] = useState<string>();
    
    useEffect(() => {}, []);

    return (
        <main>
            <h1>Registre-se</h1>
        </main>
    )
}

export default Register;
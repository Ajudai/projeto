import React, { useEffect, useState } from 'react';
import styles from './homeComponent.module.scss';
import formatarData from '../../utils/formatDate';
import { useNavigate } from 'react-router-dom';
interface IHomeComponent {
  url?: string;
  titulo: string;
  categoria: string;
  bairro: string;
  createdAt: string;
  _id: string;
}

const HomeComponent: React.FC<IHomeComponent> = ({ url, titulo, categoria, bairro, createdAt, _id }) => {
  const [dataFormatada, setDataFormatada] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const formatarDataFunção = formatarData(createdAt);
      setDataFormatada(formatarDataFunção);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const redirectToAjudar = (_id: string) => {
    navigate(`/ajuda/${_id}`);
  };

  return (
    <div onClick={() => redirectToAjudar(_id)} aria-hidden="true" className={styles.homeComponentContainer}>
      <img src={url} alt={titulo} className={styles.homeComponentImg} />
      <div className={styles.homeComponentInfoContainer}>
        <h2 className={styles.homeComponentInfoContainerH2}>{titulo}</h2>
        <h3 className={styles.homeComponentInfoContainerH3}>{categoria}</h3>
        <h4 className={styles.homeComponentInfoContainerH4}>
          {dataFormatada}, {bairro}
        </h4>
      </div>
    </div>
  );
};

export default HomeComponent;

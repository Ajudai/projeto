import React, { useEffect, useState } from 'react';
import styles from './homeComponent.module.scss';
import formatarData from '../../utils/formatDate';
import { useNavigate } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
interface IHomeComponent {
  url?: string;
  titulo: string;
  categoria: string;
  bairro: string;
  createdAt: string;
  _id: string;
  myRequest?: boolean;
  openMyRequest?: (arg: any) => void;
}

const HomeComponent: React.FC<IHomeComponent> = ({
  url,
  titulo,
  categoria,
  bairro,
  createdAt,
  _id,
  myRequest,
  openMyRequest,
}) => {
  const [dataFormatada, setDataFormatada] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    try {
      const dateFormater = formatarData(createdAt);
      setDataFormatada(dateFormater);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const redirectToAjudar = (_id: string) => {
    navigate(`/ajuda/${_id}`);
  };

  return (
    <>
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
      {myRequest && (
        <div className={styles.myRequestHomeComponentButtons}>
          <Button>Deletar</Button>
          <Button onClick={openMyRequest}>editar</Button>
        </div>
      )}
    </>
  );
};

export default HomeComponent;

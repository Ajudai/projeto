import React from 'react';
import styles from './homeComponent.module.scss';
import logo from '../../assets/logo.svg';

interface IHomeComponent {
  url?: string;
  titulo: string;
  categoria: string;
  bairro: string;
  createdAt: any;
}

const HomeComponent: React.FC<IHomeComponent> = ({ url, titulo, categoria, bairro, createdAt }) => {
  return (
    <div className={styles.homeComponentContainer}>
      <img src={url} alt={titulo} className={styles.homeComponentImg} />
      <div className={styles.homeComponentInfoContainer}>
        <h2 className={styles.homeComponentInfoContainerH2}>{titulo}</h2>
        <h3 className={styles.homeComponentInfoContainerH3}>{categoria}</h3>
        <h4 className={styles.homeComponentInfoContainerH4}>
          {createdAt}, {bairro}
        </h4>
      </div>
    </div>
  );
};

export default HomeComponent;

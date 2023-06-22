import React from 'react';
import styles from './header.module.scss';

interface IHeader {
  children: React.ReactNode;
}

const Header = ({ children }: IHeader) => {
  return (
    <header className={styles.headerContainer}>
      <p className={styles.headerContainerP}>
        Recife registra alta poluição <br /> no Rio Capibaribe
      </p>
      {children}
    </header>
  );
};

export default Header;

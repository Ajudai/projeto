import HomeComponent from '../../components/homeComponent/HomeComponent';
import Header from '../../components/header/Header';
import styles from './myRequest.module.scss';
import { useEffect, useState } from 'react';
import { IUserData } from '../../@types/user';

const MyRequests = () => {
  const [userData, setUserData] = useState<IUserData[]>();

  useEffect(() => {
    const getUserDataFromStorage = () => {
      const getFromStorage = localStorage.getItem('user');
      const parseUserData = getFromStorage && JSON.parse(getFromStorage);
      setUserData([parseUserData]);
    };
    getUserDataFromStorage();
  }, []);

  return (
    <main className={styles.myRequestMainContainer}>
      <Header />
      <div className={styles.myRequestHomeComponentDiv}>
        {userData?.[0]?.meusPedidos?.map((info) => (
          <HomeComponent
            key={info?._id}
            _id={info?._id}
            titulo={info?.titulo}
            bairro={info?.endereco?.[0]?.bairro}
            categoria={info?.categoria}
            createdAt={info?.createdAt}
            url={info?.fotos}
          />
        ))}
      </div>
    </main>
  );
};

export default MyRequests;

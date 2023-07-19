import styles from './requestHelpDetails.module.scss';
import { useEffect, useState } from 'react';
import { getPedidoById } from '../../api/pedidos';
import { useParams } from 'react-router-dom';
import { IPedidoModel } from '../../@types/pedido';
import logo from '../../assets/logo.svg';
import Header from '../../components/header/Header';
import useAuth from '../../hooks/useAuth';
import { getUserById } from '../../api/usuario';

const Help = () => {
  const [data, setData] = useState<IPedidoModel[]>();
  const { _id } = useParams();
  const [userData, setUserData] = useState<any>();
  const { setUser } = useAuth();

  useEffect(() => {
    const getUserDataFromStorage = async () => {
      const getFromStorage = localStorage.getItem('userData');
      const parseUserData = getFromStorage && JSON.parse(getFromStorage);
      const { data, error } = await getUserById(parseUserData?._id ? parseUserData._id : '');
      localStorage.setItem('user', JSON.stringify(data));
      setUser(data);
      setUserData(data);
      error && console.error(error);
    };
    getUserDataFromStorage();
    const getPedidos = async () => {
      const { data, error } = await getPedidoById(_id!);
      try {
        setData(data);
      } catch (err) {
        console.error(error);
      }
    };
    getPedidos();
  }, []);

  return (
    <main className={styles.ajudaPageMain}>
      <Header userData={userData} />
      <div>
        {data?.map((pedido) => (
          <div key={pedido?._id}>
            <img
              style={{ width: '320px', height: '320px' }}
              src={pedido.fotos ? pedido.fotos : logo}
              alt={pedido.titulo}
            />
          </div>
        ))}
      </div>
    </main>
  );
};

export default Help;

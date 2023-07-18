import styles from './requestHelpDetails.module.scss';
import { useEffect, useState } from 'react';
import { getPedidoById } from '../../api/pedidos';
import { useParams } from 'react-router-dom';
import { IPedidoModel } from '../../@types/pedido';
import logo from '../../assets/logo.svg';
import Header from '../../components/header/Header';

const Help = () => {
  const [data, setData] = useState<IPedidoModel[]>();
  const { _id } = useParams();

  useEffect(() => {
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
      <Header />
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

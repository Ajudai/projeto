import styles from './home.module.scss';
import logo from '../../assets/logo.svg';
import HomeComponent from '../../components/homeComponent/HomeComponent';
import Header from '../../components/header/Header';
import { getAllPedidos } from '../../api/pedidos';
import { useEffect, useState } from 'react';
import { IPedidoModel } from '../../@types/pedido';

const Home = () => {
  const [data, setData] = useState<IPedidoModel[]>();

  useEffect(() => {
    const getPedidos = async () => {
      const { data, error } = await getAllPedidos();
      try {
        setData(data);
      } catch (err) {
        console.error(error);
      }
    };
    getPedidos();
  }, []);

  return (
    <main className={styles.mainHome}>
      <Header />
      {data?.map((pedido: IPedidoModel) => (
        <HomeComponent
          key={pedido._id}
          titulo={pedido.titulo}
          url={pedido.fotos?.[0]?.url ? pedido.fotos?.[0]?.url : logo}
          bairro={pedido.endereco[0].bairro}
          categoria={pedido.categoria}
          createdAt={pedido.createdAt}
          _id={pedido._id}
        />
      ))}
    </main>
  );
};

export default Home;

import { homePagePedidosMock } from '../../utils/homePageMock';
import styles from './home.module.scss';
import logo from '../../assets/logo.svg';
import HomeComponent from '../../components/homeComponent/HomeComponent';
import Header from '../../components/header/Header';

const Home = () => {
  return (
    <main className={styles.mainHome}>
      <Header />
      {homePagePedidosMock.map((pedido) => (
        <HomeComponent
          key={pedido.userId}
          titulo={pedido.titulo}
          url={pedido.fotos?.[0]?.url ? pedido.fotos?.[0]?.url : logo}
          bairro={pedido.endereco[0].bairro}
          categoria={pedido.categoria}
          createdAt={pedido.createdAt}
        />
      ))}
    </main>
  );
};

export default Home;

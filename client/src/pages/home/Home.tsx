import { useEffect, useState, useRef } from 'react';
import styles from './home.module.scss';
import logo from '../../assets/logo.svg';
import HomeComponent from '../../components/homeComponent/HomeComponent';
import Header from '../../components/header/Header';
import { getAllPedidos } from '../../api/pedidos';
import { IPedidoModel } from '../../@types/pedido';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
import { getUserById } from '../../api/usuario';
import { IUserData } from '../../@types/user';

const Home = () => {
  const [data, setData] = useState<IPedidoModel[]>();
  const [userData, setUserData] = useState<IUserData>();
  const scrollContainerRef: any = useRef(null);

  useEffect(() => {
    const getUserDataFromStorage = () => {
      const getFromStorage = localStorage.getItem('userData');
      const parseUserData = getFromStorage && JSON.parse(getFromStorage);
      setUserData(parseUserData);
    };
    getUserDataFromStorage();

    const getPedidos = async () => {
      const { data, error } = await getAllPedidos();
      try {
        setData(data);
      } catch (err) {
        console.error(error);
      }
    };
    getPedidos();

    const getUserData = async () => {
      const { data, error } = await getUserById(userData?._id ? userData._id : '');
      try {
        console.log(data);
      } catch (err) {
        console.error(error);
      }
    };
    getUserData();
  }, []);

  const scrollToLeft = () => {
    const scrollContainer = scrollContainerRef.current;
    const scrollAmount = 60;
    const scrollLeft = scrollContainer.scrollLeft;
    const destination = scrollLeft + scrollAmount;

    scrollContainer.scrollTo({
      left: destination,
      behavior: 'smooth',
    });
  };

  const scrollToRight = () => {
    const scrollContainer = scrollContainerRef.current;
    const scrollAmount = 60;
    const scrollRight = scrollContainer.scrollRight;
    const destination = scrollRight - scrollAmount;

    scrollContainer.scrollTo({
      left: destination,
      behavior: 'smooth',
    });
  };

  return (
    <main className={styles.mainHome}>
      <Header />

      <section className={styles.homeSectionContainer}>
        <div className={styles.homeItensContainer}>
          <h2 className={styles.homeItensContainerH2}>Comida</h2>
          <div className={styles.homeItensControlButtons}>
            <BiLeftArrowAlt onClick={scrollToRight} className={styles.BiLeftArrowAlt} />
            <BiRightArrowAlt onClick={scrollToLeft} className={styles.BiRightArrowAlt} />
          </div>

          <div className={styles.homeItensBox} ref={scrollContainerRef}>
            {data
              ?.filter((pedido) => pedido.categoria === 'Comida')
              .map((pedido: IPedidoModel) => (
                <HomeComponent
                  key={pedido._id}
                  titulo={pedido.titulo}
                  url={pedido.fotos ? pedido.fotos : logo}
                  bairro={pedido.endereco[0].bairro}
                  categoria={pedido.categoria}
                  createdAt={pedido.createdAt}
                  _id={pedido._id}
                />
              ))}
          </div>
        </div>

        <div className={styles.homeItensContainer}>
          <h2 className={styles.homeItensContainerH2}>Brinquedo</h2>

          <div className={styles.homeItensBox}>
            {data
              ?.filter((pedido) => pedido.categoria === 'Brinquedos')
              .map((pedido: IPedidoModel) => (
                <HomeComponent
                  key={pedido._id}
                  titulo={pedido.titulo}
                  url={pedido.fotos ? pedido.fotos : logo}
                  bairro={pedido.endereco[0].bairro}
                  categoria={pedido.categoria}
                  createdAt={pedido.createdAt}
                  _id={pedido._id}
                />
              ))
              .slice(0, 5)}
          </div>
        </div>

        <div className={styles.homeItensContainer}>
          <h2 className={styles.homeItensContainerH2}>Educação</h2>
          <div className={styles.homeItensControlButtons}></div>
          <div className={styles.homeItensBox}>
            <div className={styles.homeItensBox}>
              {data
                ?.filter((pedido) => pedido.categoria === 'Educação')
                .map((pedido: IPedidoModel) => (
                  <HomeComponent
                    key={pedido._id}
                    titulo={pedido.titulo}
                    url={pedido.fotos ? pedido.fotos : logo}
                    bairro={pedido.endereco[0].bairro}
                    categoria={pedido.categoria}
                    createdAt={pedido.createdAt}
                    _id={pedido._id}
                  />
                ))
                .slice(0, 5)}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;

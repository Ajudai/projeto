import styles from './ajuda.module.scss';
import { useEffect, useState } from 'react';
import { getPedidoById } from '../../api/pedidos';
import { useParams } from 'react-router-dom';
import { IPedidoModel } from '../../@types/pedido';
import logo from '../../assets/logo.svg';
import { StylesProvider } from '@chakra-ui/react';
import Header from '../../components/header/Header';
import { PiMountainsFill } from 'react-icons/pi';
import Button from '../../components/button/Button';
import { MdArrowBackIosNew } from 'react-icons/md';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';

const Ajuda = () => {
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
      <div className={styles.ajudaPageBanner}>
        <MdArrowBackIosNew className={styles.ajudaPageBannerArrow} color="#fff" size={40} />
        <PiMountainsFill className={styles.ajudaPageBannerIcon} color="#000" size={40} />
        <span className={styles.ajudaPageContentContainer}>
          <p className={styles.ajudaPageContainerTitle}>Lorem ipsum</p>
          <p className={styles.ajudaPageContainerLocal}>Recife</p>
        </span>
      </div>

      <section className={styles.ajudaPageDetails}>
        <span className={styles.ajudaPageDetailsContainer}>
          <p className={styles.ajudaPageDetailsCategoria}>Roupa</p>
          <p className={styles.ajudaPageDetailsDescription}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. In neque cumque, numquam minima doloribus, sint
            dolor porro error minus maxime laboriosam autem atque asperiores? Ducimus officiis aperiam exercitationem
            iusto vero. Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          </p>
        </span>
        <div className={styles.ajudaPageDetailsButtons}>
          <Button
            size="medium"
            disabled
            rounded
            onClick={() => console.log('Você clicou no botão de Quero Ajudar')}
            label="Quero ajudar"
          />
          <FaWhatsapp className={styles.ajudaPageDetailsWhatsapp} color="fff" size={44} />
          <FaInstagram className={styles.ajudaPageDetailsInstagram} color="#fff" size={44} />
        </div>
      </section>

      <div>
        {data?.map((pedido) => (
          <div key={pedido?._id}>
            <img
              style={{ width: '320px', height: '320px' }}
              src={pedido.fotos?.[0]?.url ? pedido.fotos?.[0]?.url : logo}
              alt={pedido.titulo}
            />
          </div>
        ))}
      </div>
    </main>
  );
};

export default Ajuda;

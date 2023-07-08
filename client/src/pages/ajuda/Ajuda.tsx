import styles from './ajuda.module.scss';
import { useEffect, useState } from 'react';
import { getPedidoById } from '../../api/pedidos';
import { useParams } from 'react-router-dom';
import { IPedidoModel } from '../../@types/pedido';
import { StylesProvider } from '@chakra-ui/react';
import Button from '../../components/button/Button';
import { MdArrowBackIosNew } from 'react-icons/md';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';
import Header from '../../components/header/Header';
import formatarData from '../../utils/formatDate';

const Ajuda = () => {
  const [data, setData] = useState<IPedidoModel[]>();
  const [dataFormatada, setDataFormatada] = useState('');
  const { _id } = useParams();

  useEffect(() => {
    const getPedido = async () => {
      const { data, error } = await getPedidoById(_id!);
      try {
        console.log(data);
        setData(data);
      } catch (err) {
        console.error(error);
      }
    };
    getPedido();
  }, []);

  useEffect(() => {
    try {
      const formatarDataFunção = formatarData(data?.[0]?.createdAt);
      setDataFormatada(formatarDataFunção);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <main className={styles.ajudaPageMain}>
      <Header />
      <div className={styles.ajudaPageBanner}>
        <img className={styles.ajudaPageBannerImage} src={data?.[0]?.fotos} alt="" />
        <div className={styles.ajudaPageContentContainer}>
          <MdArrowBackIosNew className={styles.ajudaPageArrow} color="#fff" size={40} />
          <span className={styles.ajudaPageContent}>
            <p className={styles.ajudaPageContainerTitle}>{data?.[0]?.titulo}</p>
            <p className={styles.ajudaPageContainerDate}>{dataFormatada}</p>
          </span>
        </div>
      </div>

      <section className={styles.ajudaPageDetails}>
        <span className={styles.ajudaPageDetailsContainer}>
          <p className={styles.ajudaPageDetailsCategoria}>{data?.[0]?.categoria}</p>
          <p className={styles.ajudaPageDetailsDescription}>{data?.[0]?.descricao}</p>
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
    </main>
  );
};

export default Ajuda;

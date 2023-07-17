import styles from './ajuda.module.scss';
import { useEffect, useState } from 'react';
import { getPedidoById } from '../../api/pedidos';
import { useNavigate, useParams } from 'react-router-dom';
import { IPedidoModel } from '../../@types/pedido';
import Button from '../../components/button/Button';
import { MdArrowBackIosNew } from 'react-icons/md';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';
import Header from '../../components/header/Header';
import formatarData from '../../utils/formatDate';

const Ajuda = () => {
  const [data, setData] = useState<IPedidoModel[]>();
  const [dataFormatada, setDataFormatada] = useState('');
  const { _id } = useParams();
  const dataUndefinedNan = 'undefined/NaN - NaN:NaN';

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
    const getUserDataFromStorage = () => {
      const getFromStorage = localStorage.getItem('user');
      const parseUserData = getFromStorage && JSON.parse(getFromStorage);
    };

    getUserDataFromStorage();
  }, []);

  useEffect(() => {
    const FormatDate = async () => {
      try {
        const dateFormater = formatarData(data?.[0]?.createdAt);
        setDataFormatada(dateFormater);
        console.log(dateFormater);
      } catch (error) {
        console.error(error);
      }
    };
    setTimeout(() => {
      FormatDate();
    }, 1000);
  }, [dataFormatada]);

  const handleContatoWhatsapp = () => {
    const contato = data?.[0]?.contato;
    if (contato) {
      const linkWhatsApp = `https://wa.me/55${contato.replace(/[^\d]+/g, '')}`;
      window.open(linkWhatsApp, '_blank');
    }
  };
  
  

  const navigate = useNavigate();

  return (
    <main className={styles.ajudaPageMain}>
      <Header />
      <div className={styles.ajudaPageBanner}>
        <img className={styles.ajudaPageBannerImage} src={data?.[0]?.fotos} alt="" />
        <div className={styles.ajudaPageContentContainer}>
          <MdArrowBackIosNew className={styles.ajudaPageArrow} color="#fff" size={40} onClick={() => navigate(-1)}/>
          <span className={styles.ajudaPageContent}>
            <p className={styles.ajudaPageContainerTitle}>{data?.[0]?.titulo}</p>
            {dataFormatada !== dataUndefinedNan && <p className={styles.ajudaPageContainerDate}>{dataFormatada}</p>}
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
          <FaWhatsapp
            className={styles.ajudaPageDetailsWhatsapp}
            onClick={handleContatoWhatsapp}
            color="fff"
            size={44}
          />
          <FaInstagram className={styles.ajudaPageDetailsInstagram} color="#fff" size={44} />
        </div>
      </section>
    </main>
  );
};

export default Ajuda;

import useUser from '../../hooks/useUser';
import HomeComponent from '../../components/homeComponent/HomeComponent';
import Header from '../../components/header/Header';
import styles from './myRequest.module.scss';

const MyRequests = () => {
  const { user } = useUser();
  console.log(user);
  return (
    <main className={styles.myRequestMainContainer}>
      <Header />
      <div className={styles.myRequestHomeComponentDiv}>
        {user?.[0]?.meusPedidos?.map((info) => (
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

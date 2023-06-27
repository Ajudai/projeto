import { useEffect, useState } from 'react';
import { getPedidoById } from '../../api/pedidos';
import { useParams } from 'react-router-dom';
import { IPedidoModel } from '../../@types/pedido';
import logo from '../../assets/logo.svg';

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
  );
};

export default Ajuda;

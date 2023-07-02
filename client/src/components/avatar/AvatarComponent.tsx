import React from 'react';
import { Avatar, Wrap, WrapItem } from '@chakra-ui/react';
import styles from './avatarComponent.module.scss';
import { useNavigate } from 'react-router-dom';
interface IAvatar {
  nome?: string;
  src?: string;
  size: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  _id?: string;
}

const AvatarComponent: React.FC<IAvatar> = ({ nome, src, size, _id }) => {
  const navigate = useNavigate();

  return (
    <Wrap padding={'4px'}>
      <WrapItem display={'flex'} justifyContent={'center'} alignItems={'center'}>
        <Avatar size={size ? size : 'md'} bg="teal.500" name={nome} src={src ? src : nome} />
        <div className={styles.avatarComponentInfoContainer}>
          <p className={styles.avatarComponentInfoContainerNome}>{nome}</p>
          <button onClick={() => navigate(`/myAccount/${_id}`)} className={styles.avatarComponentProfileRedirect}>
            Meu perfil
          </button>
        </div>
      </WrapItem>
    </Wrap>
  );
};

export default AvatarComponent;

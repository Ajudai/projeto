import React from 'react';
import { Avatar, Wrap, WrapItem } from '@chakra-ui/react';
import styles from './avatarComponent.module.scss';
interface IAvatar {
  nome: string;
  src?: string;
  size: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  email: string;
}

const AvatarComponent: React.FC<IAvatar> = ({ nome, src, size, email }) => {
  return (
    <Wrap padding={'4px'}>
      <WrapItem display={'flex'} justifyContent={'center'} alignItems={'center'}>
        <Avatar size={size ? size : 'md'} bg="teal.500" name={nome} src={src ? src : nome} />
        <div className={styles.avatarComponentInfoContainer}>
          <p className={styles.avatarComponentInfoContainerNome}>{nome}</p>
          <p className={styles.avatarComponentInfoContainerEmail}>{email}</p>
        </div>
      </WrapItem>
    </Wrap>
  );
};

export default AvatarComponent;

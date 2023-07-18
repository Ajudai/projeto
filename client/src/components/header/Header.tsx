import { useEffect, useState } from 'react';
import styles from './header.module.scss';
import logo from '../../assets/logo.svg';
import { MdMenu, MdClose } from 'react-icons/md';
import AvatarComponent from '../avatar/AvatarComponent';
import { IUserData } from '../../@types/user';
import { useNavigate } from 'react-router-dom';
import { MenuMockFunction } from '../../utils/menuMock';

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [userData, setUserData] = useState<IUserData>();
  const { menuMock } = MenuMockFunction();

  const navigate = useNavigate();
  useEffect(() => {
    if (openMenu) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [openMenu]);

  useEffect(() => {
    const getUserDataFromStorage = () => {
      const getFromStorage = localStorage.getItem('user');
      const parseUserData = getFromStorage && JSON.parse(getFromStorage);
      setUserData(parseUserData);
    };
    getUserDataFromStorage();
  }, []);

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContainerDiv}>
        <img
          src={logo}
          aria-hidden
          onClick={() => navigate('/home')}
          alt="Ajudaí logo"
          className={styles.headerContainerImg}
        />
        {!openMenu ? (
          <MdMenu className={styles.headerContainerMdMenu} onClick={() => setOpenMenu(!openMenu)} />
        ) : (
          <MdClose className={styles.headerContainerMdMenu} onClick={() => setOpenMenu(!openMenu)} />
        )}
      </div>

      <div className={openMenu ? styles.mobileHamburguerMenuOpened : styles.mobileHamburguerMenuClosed}>
        <div aria-hidden onClick={() => setOpenMenu(!openMenu)} className={styles.closeMenuOutside}></div>
        <nav className={openMenu ? styles.mobileHamburguerMenuNavOpened : styles.mobileHamburguerMenuNavClosed}>
          {openMenu ? (
            <AvatarComponent nome={userData?.userName} src={userData?.profilePicture} size="md" _id={userData?._id} />
          ) : (
            <></>
          )}
          <ul className={openMenu ? styles.mobileHamburguerMenuUlOpened : styles.mobileHamburguerMenuUlClosed}>
            {menuMock.map((item) => (
              <li
                className={styles.mobileHamburguerMenuLi}
                aria-hidden
                key={item?.id}
                onClick={() => item?.onClick(userData?._id ? userData?._id : '')}
              >
                {item?.title}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

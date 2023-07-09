import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export const MenuMockFunction = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const menuMock = [
    {
      title: 'Home',
      id: 0,
      onClick: () => navigate(`/home/`),
    },
    {
      title: 'Pedir ajuda',
      id: 1,
      onClick: (_id: string) => navigate(`/requestHelp/${_id}`),
    },
    {
      title: 'Meus pedidos',
      id: 2,
      onClick: (_id: string) => navigate(`/myRequests/${_id}`),
    },
    {
      title: 'Logout',
      id: 3,
      onClick: () => {
        logout()
      },
    },
  ];

  return {
    menuMock,
  };
};

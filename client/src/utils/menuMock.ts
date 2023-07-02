import { useNavigate } from 'react-router-dom';

export const MenuMockFunction = () => {
  const navigate = useNavigate();

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
  ];

  return {
    menuMock,
  };
};

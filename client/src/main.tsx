import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.scss';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Home from './pages/home/Home';
import ForgetPassword from './pages/forgetPassword/ForgetPassword';
import { ChakraProvider } from '@chakra-ui/react';
import RequestHelp from './pages/requestHelp/RequestHelp';
import Ajuda from './pages/ajuda/Ajuda';
import MyAccount from './pages/myAccount/MyAccount';
import ChangePassword from './pages/changePassword/ChangePassword';
import Conta from './pages/conta/Conta';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
    errorElement: <h1>Nada econtrado</h1>,
  },

  { path: '/register', element: <Register /> },
  { path: '/home', element: <Home /> },
  { path: '/forgetPassword/:_id', element: <ForgetPassword /> },
  { path: '/requestHelp/:_id', element: <RequestHelp /> },
  { path: '/ajuda/:_id', element: <Ajuda /> },
  { path: 'conta', element: <Conta /> }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ChakraProvider>
    <RouterProvider router={router} />
  </ChakraProvider>,
);

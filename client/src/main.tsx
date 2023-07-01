import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.scss';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Home from './pages/home/Home';
import ForgetPassword from './pages/forgetPassword/ForgetPassword';
import { ChakraProvider } from '@chakra-ui/react';
import RequestHelp from './pages/requestHelp/RequestHelp';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
    errorElement: <h1>Nada econtrado</h1>,
  },

  { path: '/register', element: <Register /> },
  { path: '/home', element: <Home /> },
  { path: '/forgetpassword', element: <ForgetPassword /> },
  { path: '/requesthelp', element: <RequestHelp /> },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ChakraProvider>
    <RouterProvider router={router} />
  </ChakraProvider>,
);

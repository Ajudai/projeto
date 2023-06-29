import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.scss';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Home from './pages/home/Home';
<<<<<<< HEAD
import HelpRequest from './pages/HelpRequest/HelpRequest';
import ForgetPassword from './pages/forgetPassword/ForgetPassword';
=======
import { ChakraProvider } from '@chakra-ui/react';
import Ajuda from './pages/ajuda/Ajuda';
>>>>>>> aadb530a24d4ddb2b61007826e5b6d6049808f64

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
    errorElement: <h1>Nada econtrado</h1>,
  },

  { path: '/register', element: <Register /> },
  { path: '/home', element: <Home /> },
<<<<<<< HEAD
  { path: '/forgetpassword', element: <ForgetPassword /> },
  { path: '/helprequest', element: <HelpRequest /> },
=======
  { path: '/ajuda/:_id', element: <Ajuda /> },
>>>>>>> aadb530a24d4ddb2b61007826e5b6d6049808f64
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ChakraProvider>
    <RouterProvider router={router} />
  </ChakraProvider>,
);

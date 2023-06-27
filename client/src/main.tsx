import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.scss';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Home from './pages/home/Home';
import ForgotPassword from './pages/forgotpassword/ForgotPassword';
import HelpRequest from './pages/helpRequest/HelpRequest';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
    errorElement: <h1>Nada econtrado</h1>,
  },

  { path: '/register', element: <Register /> },
  { path: '/home', element: <Home /> },
  { path: '/forgotpassword', element: <ForgotPassword /> },
  { path: '/helprequest', element: <HelpRequest /> },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<RouterProvider router={router} />);

import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';
import './App.scss';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Home from './pages/home/Home';
import ForgetPassword from './pages/forgetPassword/ForgetPassword';
import RequestHelp from './pages/requestHelp/RequestHelp';
import Ajuda from './pages/ajuda/Ajuda';
import useAuth from './hooks/useAuth';
import { AuthRedirect } from './components/AuthRedirect/AuthRedirect';

function App() {
  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Home /> : <Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/home"
          element={
            <AuthRedirect>
              <Home />
            </AuthRedirect>
          }
        />
        <Route
          path="/requestHelp/:_id"
          element={
            <AuthRedirect>
              <RequestHelp />
            </AuthRedirect>
          }
        />
        <Route
          path="/ajuda/:_id"
          element={
            <AuthRedirect>
              <Ajuda />
            </AuthRedirect>
          }
        />
        <Route
          path="/esqueciMinhaSenha/:_id"
          element={
            <AuthRedirect>
              <ForgetPassword />
            </AuthRedirect>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

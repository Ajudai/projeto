import { Route, BrowserRouter, Routes } from 'react-router-dom';
import './App.scss';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Home from './pages/home/Home';
import ForgetPassword from './pages/forgetPassword/ForgetPassword';
import RequestHelp from './pages/requestHelp/RequestHelp';
import Ajuda from './pages/ajuda/Ajuda';
import useAuth from './hooks/useAuth';
import { AuthRedirect } from './components/AuthRedirect/AuthRedirect';
import MyRequests from './pages/myRequests/MyRequests';
import Conta from './pages/conta/Conta';
import Address from './pages/conta/Address';

function App() {
  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <AuthRedirect>
                <Home />
              </AuthRedirect>
            ) : (
              <Login />
            )
          }
        />
        <Route path="/register" element={<Register />} />
        {/* <Route
          path="/"
          element={
            <AuthRedirect>
              <Home />
            </AuthRedirect>
          }
        /> */}
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
          path="/myRequests/:_id"
          element={
            <AuthRedirect>
              <MyRequests />
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
        <Route
          path="/editarDados/:_id"
          element={
            <AuthRedirect>
              <Conta />
            </AuthRedirect>
          }
        />
        <Route
          path="/editarEndereco/:_id"
          element={
            <AuthRedirect>
              <Address />
            </AuthRedirect>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

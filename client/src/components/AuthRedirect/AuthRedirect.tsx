import useAuth from '../../hooks/useAuth';
import Login from '../../pages/login/Login';

interface IAuth {
  children: React.ReactElement;
}

export const AuthRedirect: React.FC<IAuth> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Login />;
  }
  return children;
};

import { useState, useMemo, createContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface IProps {
  isAuthenticated: boolean;
  login: (value: boolean) => void;
  logout: () => void;
  persist: any;
  setPersist: any;
}

export const AuthContext = createContext<IProps>({
  isAuthenticated: false,
  login() {},
  logout() {},
  persist: {},
  setPersist() {},
});

interface IChildren {
  children: React.ReactNode;
}

export function AuthContextProvider({ children }: IChildren) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [persist, setPersist] = useState(JSON.parse(localStorage.getItem('userData')!));
  const [refreshLogout, setRefreshLogout] = useState(false);

  useEffect(() => {
    const getUserDataFromStorage = () => {
      const getFromStorage = localStorage.getItem('userData');
      const parseUserData = getFromStorage && JSON.parse(getFromStorage);
      setPersist(parseUserData);
    };
    getUserDataFromStorage();

    const changeStateIfAuthenticated = () => {
      if (persist !== null) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    };
    changeStateIfAuthenticated();
  }, [isAuthenticated]);

  const login = (value: boolean) => {
    setIsAuthenticated(value);
    window.location.assign('/home');
  };

  const logout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    setRefreshLogout(!refreshLogout);
    window.location.assign('/');
  };

  const value = useMemo(() => ({ isAuthenticated, login, logout, setPersist, persist }), [isAuthenticated]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const AuthConsumer = AuthContext.Consumer;

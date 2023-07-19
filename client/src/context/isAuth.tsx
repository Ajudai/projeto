import { useState, useMemo, createContext, useEffect } from 'react';

interface IProps {
  isAuthenticated: boolean;
  login: (value: boolean) => void;
  logout: () => void;
  persist: any;
  setPersist: any;
  user: any;
  setUser: any;
}

export const AuthContext = createContext<IProps>({
  isAuthenticated: false,
  login() {},
  logout() {},
  persist: {},
  setPersist() {},
  user: {},
  setUser() {},
});

interface IChildren {
  children: React.ReactNode;
}

export function AuthContextProvider({ children }: IChildren) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [persist, setPersist] = useState(JSON.parse(localStorage.getItem('userData')!));
  const [user, setUser] = useState<any>();
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
    window.location.assign('/');
  };

  const logout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    setRefreshLogout(!refreshLogout);
    window.location.assign('/');
  };

  const value = useMemo(
    () => ({ isAuthenticated, login, logout, setPersist, persist, user, setUser }),
    [isAuthenticated],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const AuthConsumer = AuthContext.Consumer;

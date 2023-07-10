import { useState, useMemo, createContext } from 'react';
import { IUserData } from '../@types/user';

interface IProps {
  user: IUserData[];
  setUser: any;
}

export const UserContext = createContext<IProps>({
  user: [],
  setUser() {},
});

interface IChildren {
  children: React.ReactNode;
}

export function UserContextProvider({ children }: IChildren) {
  const [user, setUser] = useState<IUserData[]>([]);

  const value = useMemo(() => ({ user, setUser }), [user]);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export const UserConsumer = UserContext.Consumer;

import * as ReactDOM from 'react-dom/client';
import './App.scss';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import { AuthContextProvider } from './context/isAuth';
import { UserContextProvider } from './context/user';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ChakraProvider>
    <AuthContextProvider>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </AuthContextProvider>
  </ChakraProvider>,
);

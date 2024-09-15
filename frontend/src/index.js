import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GlobalStyle } from './styles/GlobalStyles';
import { GlobalProvider } from './Context/globalContext';
import { AuthContextProvider } from './Context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
    <GlobalStyle />
    <GlobalProvider>
    <App />
    </GlobalProvider>
    </AuthContextProvider>
  </React.StrictMode>
);


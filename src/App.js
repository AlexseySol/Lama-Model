import React, { useState, useEffect } from 'react';
import ChatInterface from './components/ChatInterface';
import Registration from './components/Registration';
import { AppContainer, Title, Signature } from './styles/AppStyles';
import { GlobalStyle } from './styles/GlobalStyles';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }

    return () => {
      localStorage.removeItem('user');
    };
  }, []);

  const handleAuthentication = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <Title>ШІ Чат</Title>
        <Signature>By Олексій Соляной</Signature>
        {!isAuthenticated ? (
          <Registration onAuthentication={handleAuthentication} />
        ) : (
          <ChatInterface user={user} />
        )}
      </AppContainer>
    </>
  );
}

export default App;

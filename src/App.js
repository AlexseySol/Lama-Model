import React, { useState, useEffect } from 'react';
import ChatInterface from './components/ChatInterface';
import Registration from './components/Registration';
import { AppContainer, Title, BackgroundSymbol, Signature } from './styles/AppStyles';
import { GlobalStyle } from './styles/GlobalStyles';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check for user data in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }

    // Clear user data from localStorage when component unmounts
    return () => {
      localStorage.removeItem('user');
    };
  }, []);

  const handleAuthentication = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const aiSymbols = ['🧠', '🤖', '💡', '🔬', '📊', '🖥️', '🔍', '🎛️', '🔮', '⚙️'];

  return (
    <>
      <GlobalStyle />
      <AppContainer>
        {aiSymbols.map((symbol, index) => (
          <BackgroundSymbol
            key={index}
            left={`${Math.random() * 100}vw`}
            top={`${Math.random() * 100}vh`}
            size={`${Math.random() * 30 + 20}px`}
            duration={`${Math.random() * 15 + 5}s`}
          >
            {symbol}
          </BackgroundSymbol>
        ))}
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
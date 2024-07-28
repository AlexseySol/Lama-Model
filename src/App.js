import React, { useState } from 'react';
import ChatInterface from './components/ChatInterface';
import Registration from './components/Registration';
import { GlobalStyle, AppContainer, Title, BackgroundSymbol, Signature } from '../src/styles/AppStyles';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const handleAuthentication = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
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

import styled, { keyframes, createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
    background-color: #0F0F1A;
    color: #E0E0E0;
  }
`;

const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
  100% { transform: translateY(0px) rotate(360deg); }
`;

export const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: relative;
  overflow: hidden;
`;

export const Title = styled.h1`
  color: #8A2BE2;
  margin-bottom: 2rem;
  z-index: 1;
  font-size: 2.5rem;

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

export const BackgroundSymbol = styled.div`
  position: absolute;
  font-size: ${props => props.size || '20px'};
  color: rgba(138, 43, 226, 0.2);
  animation: ${float} ${props => props.duration || '10s'} infinite ease-in-out;
  left: ${props => props.left};
  top: ${props => props.top};
`;

export const Signature = styled.div`
  font-size: 1.2rem;
  color: #8A2BE2;
  text-align: center;
  margin-top: -1rem;
  z-index: 1;
`;

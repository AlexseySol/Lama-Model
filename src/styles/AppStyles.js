import styled, { keyframes, createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
    background-color: #0F0F1A;
    color: #E0E0E0;
    height: 100%; /* Ensure the html and body take full height */
    overflow: hidden; /* Prevent scrolling */
  }

  #root {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
`;

const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
  100% { transform: translateY(0px) rotate(360deg); }
`;

export const AppContainer = styled.div`
  flex: 1; /* Ensures the container takes the remaining height */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: relative;
  overflow: hidden; /* Prevent internal scrolling */
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
  color: rgba(138, 43, 226, 0.1); /* Transparency set to 10% */
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

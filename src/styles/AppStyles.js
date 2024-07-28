import styled, { keyframes } from 'styled-components';

export const AppContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: relative;
  overflow: hidden;
`;

export const Title = styled.h1`
  color: var(--primary-color);
  margin-bottom: 2rem;
  z-index: 1;
  font-size: 2.5rem;
  text-align: center;

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
  100% { transform: translateY(0px) rotate(360deg); }
`;

export const BackgroundSymbol = styled.div`
  position: absolute;
  font-size: ${props => props.size || '20px'};
  color: var(--primary-color);
  opacity: 0.1;
  animation: ${float} ${props => props.duration || '10s'} infinite ease-in-out;
  left: ${props => props.left};
  top: ${props => props.top};
`;

export const Signature = styled.div`
  font-size: 1.2rem;
  color: var(--primary-color);
  text-align: center;
  margin-top: -1rem;
  z-index: 1;
`;
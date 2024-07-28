import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Arial', sans-serif;
    background-color: #0F0F1A;
    color: #E0E0E0;
  }
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
`;

export const StyledForm = styled.form`
  background: rgba(30, 30, 45, 0.8);
  padding: 2rem;
  border-radius: 10px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
`;

export const StyledIcon = styled.span`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #8A2BE2;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.8rem 0.8rem 0.8rem 2.5rem;
  border: none;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.1);
  color: #E0E0E0;
  font-size: 1rem;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #8A2BE2;
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 0.8rem;
  border: none;
  border-radius: 5px;
  background: #8A2BE2;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #4B0082;
  }
`;

export const Message = styled.p`
  padding: 0.8rem;
  border-radius: 5px;
  margin-top: 1rem;
  font-size: 0.9rem;
`;

export const Title = styled.h2`
  text-align: center;
  color: #8A2BE2;
  margin-bottom: 1.5rem;
`;

export const BackgroundSymbol = styled.div`
  position: absolute;
  font-size: ${props => props.size || '20px'};
  color: rgba(138, 43, 226, 0.2);
  left: ${props => props.left};
  top: ${props => props.top};
`;

export const Tooltip = styled.span`
  position: absolute;
  bottom: -20px;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 12px;
  opacity: 0;
  transition: opacity 0.3s;
  pointer-events: none;
  z-index: 10;

  ${InputWrapper}:hover & {
    opacity: 1;
  }
`;
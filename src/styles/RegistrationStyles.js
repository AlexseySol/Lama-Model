import styled from 'styled-components';

export const Container = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: rgba(30, 30, 45, 0.8);
  border-radius: 10px;
  width: 100%;
  max-width: 400px;
`;

export const InputContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 1.5rem;
`;

export const StyledIcon = styled.span`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--primary-color);
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.8rem 0.8rem 0.8rem 2.5rem;
  border: none;
  border-radius: 5px;
  background: var(--input-background);
  color: var(--text-color);
  font-size: 1rem;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--primary-color);
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 0.8rem;
  border: none;
  border-radius: 5px;
  background: var(--primary-color);
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: var(--secondary-color);
  }
`;

export const Message = styled.p`
  padding: 0.8rem;
  border-radius: 5px;
  margin-top: 1rem;
  font-size: 0.9rem;
  width: 100%;
  text-align: center;
`;

export const Title = styled.h2`
  text-align: center;
  color: var(--primary-color);
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  
  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 80vh;
  width: 100%;
  max-width: 800px;
  background-color: rgba(30, 30, 45, 0.8);
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);

  @media (max-width: 600px) {
    height: 90vh;
    border-radius: 0;
  }
`;

export const MessagesContainer = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(138, 43, 226, 0.4);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-track {
    background-color: rgba(30, 30, 45, 0.2);
  }

  @media (max-width: 600px) {
    padding: 10px;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 15px;
  border: none;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.1);
  color: #E0E0E0;
  font-size: 16px;
  resize: none;
  min-height: 40px;
  max-height: 150px;
  overflow-y: auto;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--primary-color);
  }

  @media (max-width: 600px) {
    font-size: 14px;
    padding: 10px;
    border-radius: 15px;
  }
`;

export default {
  Container,
  InputContainer,
  StyledIcon,
  Input,
  Button,
  Message,
  Title,
  ChatContainer,
  MessagesContainer,
  TextArea
};
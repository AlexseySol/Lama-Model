import styled from 'styled-components';

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

export const InputContainer = styled.div`
  display: flex;
  padding: 15px;
  background-color: rgba(30, 30, 45, 0.9);
  align-items: flex-end;

  @media (max-width: 600px) {
    padding: 10px;
  }
`;

export const TextArea = styled.textarea`
  flex-grow: 1;
  padding: 12px 15px;
  border: none;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.1);
  color: #E0E0E0;
  font-size: 16px;
  resize: none;
  overflow-y: auto;
  min-height: 40px;
  max-height: 150px;
  line-height: 1.5;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #8A2BE2;
  }

  @media (max-width: 600px) {
    font-size: 14px;
    padding: 10px;
    border-radius: 15px;
  }
`;

export const Button = styled.button`
  padding: 10px 15px;
  margin-left: 10px;
  border: none;
  border-radius: 20px;
  background-color: #8A2BE2;
  color: white;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  flex-shrink: 0;
  align-self: flex-end;

  &:hover {
    background-color: #4B0082;
  }

  &:disabled {
    background-color: #666;
    cursor: not-allowed;
  }

  @media (max-width: 600px) {
    font-size: 12px;
    padding: 8px 10px;
    margin-left: 5px;
    border-radius: 15px;
  }
`;
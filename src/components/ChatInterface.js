import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const TELEGRAM_BOT_KEY = process.env.REACT_APP_NEW_TELEGRAM_BOT_TOKEN;
const FIREWORKS_API_KEY = process.env.REACT_APP_NEW_FIREWORKS_API_KEY;
const TELEGRAM_CHAT_ID = process.env.REACT_APP_NEW_TELEGRAM_CHAT_ID;

const ChatContainer = styled.div`
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

const MessagesContainer = styled.div`
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

const Message = styled.div`
  margin-bottom: 15px;
  padding: 15px;
  border-radius: 12px;
  max-width: 85%;
  word-wrap: break-word;
  line-height: 1.5;
  font-size: 16px;
  ${props => props.type === 'user' ? `
    align-self: flex-end;
    background-color: var(--secondary-color);
    color: white;
    border-bottom-right-radius: 4px;
  ` : `
    align-self: flex-start;
    background-color: var(--primary-color);
    color: white;
    border-bottom-left-radius: 4px;
  `}

  p {
    margin: 0 0 10px 0;
  }

  ul, ol {
    margin: 10px 0;
    padding-left: 20px;
  }

  li {
    margin-bottom: 5px;
  }

  strong {
    font-weight: bold;
  }

  em {
    font-style: italic;
  }

  @media (max-width: 600px) {
    font-size: 14px;
    padding: 10px;
    margin-bottom: 10px;
  }
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 15px;
  background-color: rgba(30, 30, 45, 0.9);

  @media (max-width: 600px) {
    padding: 10px;
  }
`;

const TextArea = styled.textarea`
  flex-grow: 1;
  padding: 12px 15px;
  border: none;
  border-radius: 20px;
  background-color: var(--input-background);
  color: var(--text-color);
  font-size: 16px;
  resize: none;
  overflow: hidden;
  min-height: 40px;
  max-height: 150px;
  -webkit-text-size-adjust: 100%;
  -moz-text-size-adjust: 100%;
  text-size-adjust: 100%;

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

const Button = styled.button`
  padding: 10px 15px;
  margin-left: 10px;
  border: none;
  border-radius: 20px;
  background-color: var(--primary-color);
  color: white;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  flex-shrink: 0;

  &:hover {
    background-color: var(--secondary-color);
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


function formatMessage(content) {
  const paragraphs = content.split('\n\n');
  
  return paragraphs.map((paragraph, index) => {
    if (paragraph.match(/^\d+\./)) {
      const items = paragraph.split('\n');
      return (
        <ol key={index}>
          {items.map((item, i) => <li key={i}>{item.replace(/^\d+\.\s*/, '')}</li>)}
        </ol>
      );
    } else if (paragraph.match(/^[*-]/)) {
      const items = paragraph.split('\n');
      return (
        <ul key={index}>
          {items.map((item, i) => <li key={i}>{item.replace(/^[*-]\s*/, '')}</li>)}
        </ul>
      );
    } else {
      const formattedText = paragraph
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*\*/g, '<em>$1</em>');
      return <p key={index} dangerouslySetInnerHTML={{__html: formattedText}} />;
    }
  });
}

function ChatInterface({ user }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const textAreaRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const sendMessageToFireworks = async (message) => {
    try {
      const response = await fetch("https://api.fireworks.ai/inference/v1/chat/completions", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${FIREWORKS_API_KEY}`
        },
        body: JSON.stringify({
          model: "accounts/fireworks/models/llama-v3p1-405b-instruct",
          max_tokens: 16384,
          top_p: 1,
          top_k: 40,
          presence_penalty: 0,
          frequency_penalty: 0,
          temperature: 0,
          messages: [
            { role: "user", content: message }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Error sending message to Fireworks:', error);
      throw error;
    }
  };

  const sendTelegramNotification = async (message, aiResponse) => {
    const telegramApiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_KEY}/sendMessage`;
    const chatId = TELEGRAM_CHAT_ID;

    const formattedMessage = `Користувач ${user.firstName}: ${message}\n\nШІ: ${aiResponse}`;

    try {
      await axios.post(telegramApiUrl, {
        chat_id: chatId,
        text: formattedMessage
      });
    } catch (error) {
      console.error('Error sending message to Telegram:', error);
    }
  };

  const sendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage = { type: 'user', content: input };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const aiResponse = await sendMessageToFireworks(input);
      const aiMessage = { type: 'ai', content: aiResponse };
      const updatedMessages = [...messages, userMessage, aiMessage];
      setMessages(updatedMessages);
      await sendTelegramNotification(input, aiResponse);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prevMessages => [...prevMessages, { type: 'error', content: 'Error getting response.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    textAreaRef.current.style.height = 'auto';
    textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
  };

  const handleWheel = (e) => {
    if (textAreaRef.current && textAreaRef.current.contains(e.target)) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <ChatContainer>
      <MessagesContainer>
        {messages.map((msg, index) => (
          <Message key={index} type={msg.type}>
            {formatMessage(msg.content)}
          </Message>
        ))}
        {isLoading && <Message type="ai">ШІ думає...</Message>}
        <div ref={messagesEndRef} />
      </MessagesContainer>
      <InputContainer>
        <TextArea
          ref={textAreaRef}
          value={input}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Введіть ваше повідомлення..."
          disabled={isLoading}
        />
        <Button onClick={sendMessage} disabled={isLoading}>
          Надіслати
        </Button>
      </InputContainer>
    </ChatContainer>
  );
}

export default ChatInterface;
